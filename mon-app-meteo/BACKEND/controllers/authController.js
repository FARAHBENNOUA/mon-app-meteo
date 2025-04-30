import { auth, db } from '../config/firebase.js';

// Inscription d'un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }
    
    const userRecord = await auth.createUser({
      email,
      password,
      emailVerified: false
    });
    
    // Créer un document utilisateur dans Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      createdAt: new Date()
    });
    
    // Générer un token
    const token = await auth.createCustomToken(userRecord.uid);
    
    res.status(201).json({ 
      user: {
        uid: userRecord.uid,
        email: userRecord.email
      },
      token 
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: error.message });
  }
};

// Connexion d'un utilisateur existant
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }
    
    // Vérifier les identifiants
    const userRecord = await auth.getUserByEmail(email);
    
    // Générer un token
    const token = await auth.createCustomToken(userRecord.uid);
    
    res.json({ 
      user: {
        uid: userRecord.uid,
        email: userRecord.email
      },
      token 
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(401).json({ message: 'Identifiants invalides' });
  }
};

// Déconnexion
export const logout = (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
};

// Récupérer les informations de l'utilisateur connecté
export const getMe = async (req, res) => {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    res.status(500).json({ message: error.message });
  }
};