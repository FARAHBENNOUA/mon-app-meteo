import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Toutes les routes nécessitent un token d'authentification
router.use(authenticateToken);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:id', removeFavorite);

export default router;