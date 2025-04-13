import jwt from 'jsonwebtoken';
import pool from '../config/mysql.js'; // Assurez-vous que votre fichier mysql.js est bien configuré

// Middleware pour vérifier si l'utilisateur est connecté
export const isAuth = async (req, res, next) => {
    try {
        // Récupération du token dans les headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                message: 'Non autorisé - Token manquant',
            });
        }

        const token = authHeader.split(' ')[1];

        // Décodage et vérification du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = decoded;

        // Récupération des infos de l'utilisateur dans la base de données
        const connection = await pool.getConnection();
        const [users] = await connection.execute(
            'SELECT id, name, email, age, imageUrl, role FROM users WHERE id = ?',
            [userId]
        );
        connection.release();

        if (users.length === 0) {
            return res.status(401).json({
                status: 'error',
                message: 'Non autorisé - Utilisateur non trouvé',
            });
        }

        // Attacher l'utilisateur à la requête pour un usage futur
        req.user = users[0];
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 'error',
                message: 'Non autorisé - Token invalide',
            });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'error',
                message: 'Non autorisé - Token expiré',
            });
        }
        return res.status(500).json({
            status: 'error',
            message: 'Erreur serveur',
        });
    }
};

// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            message: 'Non autorisé',
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            status: 'error',
            message: 'Accès refusé - Droits administrateur requis',
        });
    }

    next();
};
export default isAuth;