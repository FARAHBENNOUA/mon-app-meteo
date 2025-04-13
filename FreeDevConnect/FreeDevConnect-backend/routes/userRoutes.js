import express from 'express';
import mysql from '../config/mysql.js';
import { isAuth, isAdmin } from '../middleware/auth.js';
import { upload } from '../config/multer.js';
import { uploadImage } from '../utils/cloudinaryUtils.js';

const router = express.Router();

router.get('/users', isAuth, isAdmin, async (req, res, next) => {
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users');
        connection.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/user/:id', isAuth, async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'admin' && req.user.id != id) {
        return res.status(403).json({ 
            error: 'Accès refusé - Vous ne pouvez pas accéder au profil d\'un autre utilisateur' 
        });
    }
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT id, name, mail, age, imageUrl, role FROM users WHERE id = ?', [id]);
        connection.release();
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/user/:id', isAuth, async (req, res) => {
    const { id } = req.params;
    const { name, mail, age, role } = req.body;

    if (req.user.role !== 'admin' && req.user.id != id) {
        return res.status(403).json({ 
            error: 'Accès refusé - Vous ne pouvez pas modifier le profil d\'un autre utilisateur' 
        });
    }
    if (role !== undefined && req.user.role !== 'admin') {
        return res.status(403).json({ 
            error: 'Accès refusé - Vous ne pouvez pas modifier les rôles' 
        });
    }
    try {
        const connection = await mysql.getConnection();
        const [userExists] = await connection.execute('SELECT id FROM users WHERE id = ?', [id]);
        if (userExists.length === 0) {
            connection.release();
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await connection.execute('UPDATE users SET name = ?, mail = ?, age = ? WHERE id = ?', [name, mail, age, id]);
        const [updatedUser] = await connection.execute(
            'SELECT id, name, mail, age, imageUrl, role FROM users WHERE id = ?', 
            [id]
        );
        
        connection.release();
        res.json(updatedUser[0]);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.put('/user/profileImage/:id', isAuth, upload.single('profileImage'), async (req, res) => {
    const { id } = req.params;
    
    if (req.user.role !== 'admin' && req.user.id != id) {
        return res.status(403).json({ 
            error: 'Accès refusé - Vous ne pouvez pas modifier l\'image d\'un autre utilisateur' 
        });
    }
    
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucune image fournie' });
        }
        
        const connection = await mysql.getConnection();
        
        const [userExists] = await connection.execute('SELECT id FROM users WHERE id = ?', [id]);
        if (userExists.length === 0) {
            connection.release();
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        
        const result = await uploadImage(req.file.path, 'user-profiles');
        const imageUrl = result.secure_url;
        
        await connection.execute(
            'UPDATE users SET imageUrl = ? WHERE id = ?', 
            [imageUrl, id]
        );
        
        connection.release();
        res.json({ 
            id, 
            imageUrl 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/user/:id', isAuth, async (req, res) => {
    const { id } = req.params;
    
    if (req.user.role !== 'admin' && req.user.id != id) {
        return res.status(403).json({ 
            error: 'Accès refusé - Vous ne pouvez pas supprimer un autre utilisateur' 
        });
    }
    
    try {
        const connection = await mysql.getConnection();
        await connection.execute('DELETE FROM users WHERE id = ?', [id]);
        connection.release();
        res.json({ message: 'Utilisateur supprimé de la db' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;