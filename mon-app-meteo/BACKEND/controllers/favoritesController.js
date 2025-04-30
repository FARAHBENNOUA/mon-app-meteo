import { db } from '../config/firebase.js';

// Récupérer tous les favoris d'un utilisateur
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const snapshot = await db.collection('favorites')
      .where('userId', '==', userId)
      .get();
    
    if (snapshot.empty) {
      return res.json([]);
    }
    
    const favorites = [];
    snapshot.forEach(doc => {
      favorites.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(favorites);
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une ville aux favoris
export const addFavorite = async (req, res) => {
  try {
    const { city } = req.body;
    const userId = req.user.uid;
    
    if (!city) {
      return res.status(400).json({ message: 'Le nom de la ville est requis' });
    }
    
    // Vérifier si la ville existe déjà dans les favoris
    const snapshot = await db.collection('favorites')
      .where('userId', '==', userId)
      .where('city', '==', city)
      .get();
    
    if (!snapshot.empty) {
      return res.status(400).json({ message: 'Cette ville est déjà dans vos favoris' });
    }
    
    // Ajouter aux favoris
    const docRef = await db.collection('favorites').add({
      userId,
      city,
      addedAt: new Date()
    });
    
    const newFavorite = {
      id: docRef.id,
      userId,
      city,
      addedAt: new Date()
    };
    
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une ville des favoris
export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;
    
    // Vérifier si le favori existe et appartient à l'utilisateur
    const docRef = db.collection('favorites').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ message: 'Favori non trouvé' });
    }
    
    if (doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Accès interdit: ce favori ne vous appartient pas' });
    }
    
    // Supprimer le favori
    await docRef.delete();
    
    res.json({ message: 'Favori supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error);
    res.status(500).json({ message: error.message });
  }
};