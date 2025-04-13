import pool from '../config/mysql.js';
import { uploadImage } from '../utils/cloudinaryUtils.js';

// Récupérer tous les plats
export const getAllPlats = async (req, res) => {
  try {
    const [plats] = await pool.execute(
      'SELECT p.*, GROUP_CONCAT(i.name) as ingredients FROM plats p ' +
      'LEFT JOIN plat_ingredients pi ON p.id = pi.plat_id ' +
      'LEFT JOIN ingredients i ON pi.ingredient_id = i.id ' +
      'GROUP BY p.id'
    );

    res.status(200).json({
      status: 'success',
      results: plats.length,
      data: {
        plats
      }
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Récupérer un plat par son ID
export const getPlatById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [plats] = await pool.execute(
      'SELECT p.*, GROUP_CONCAT(i.name) as ingredients FROM plats p ' +
      'LEFT JOIN plat_ingredients pi ON p.id = pi.plat_id ' +
      'LEFT JOIN ingredients i ON pi.ingredient_id = i.id ' +
      'WHERE p.id = ? ' +
      'GROUP BY p.id',
      [id]
    );
    
    if (plats.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Plat non trouvé'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        plat: plats[0]
      }
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Créer un nouveau plat
export const createPlat = async (req, res) => {
  try {
    const { name, description, price, category, ingredients } = req.body;
    
    // Upload de l'image si elle existe
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await uploadImage(req.file.path, 'plats');
      imageUrl = uploadResult.secure_url;
    }
    
    // Insertion du plat dans la BDD
    const [result] = await pool.execute(
      'INSERT INTO plats (name, description, price, category, imageUrl) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category, imageUrl]
    );
    
    const platId = result.insertId;
    
    // Ajouter les ingrédients si fournis
    if (ingredients && ingredients.length > 0) {
      const ingredientsArray = typeof ingredients === 'string' 
        ? JSON.parse(ingredients) 
        : ingredients;
      
      for (const ingredientId of ingredientsArray) {
        await pool.execute(
          'INSERT INTO plat_ingredients (plat_id, ingredient_id) VALUES (?, ?)',
          [platId, ingredientId]
        );
      }
    }
    
    res.status(201).json({
      status: 'success',
      data: {
        id: platId,
        name,
        description,
        price,
        category,
        imageUrl,
        ingredients: ingredients || []
      }
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Mettre à jour un plat
export const updatePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, ingredients } = req.body;
    
    // Vérifier si le plat existe
    const [plats] = await pool.execute(
      'SELECT * FROM plats WHERE id = ?',
      [id]
    );
    
    if (plats.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Plat non trouvé'
      });
    }
    
    // Upload de la nouvelle image si elle existe
    let imageUrl = plats[0].imageUrl;
    if (req.file) {
      const uploadResult = await uploadImage(req.file.path, 'plats');
      imageUrl = uploadResult.secure_url;
    }
    
    // Mise à jour du plat
    await pool.execute(
      'UPDATE plats SET name = ?, description = ?, price = ?, category = ?, imageUrl = ? WHERE id = ?',
      [name, description, price, category, imageUrl, id]
    );
    
    // Mise à jour des ingrédients si fournis
    if (ingredients) {
      // Supprimer les associations existantes
      await pool.execute(
        'DELETE FROM plat_ingredients WHERE plat_id = ?',
        [id]
      );
      
      // Ajouter les nouvelles associations
      const ingredientsArray = typeof ingredients === 'string' 
        ? JSON.parse(ingredients) 
        : ingredients;
      
      for (const ingredientId of ingredientsArray) {
        await pool.execute(
          'INSERT INTO plat_ingredients (plat_id, ingredient_id) VALUES (?, ?)',
          [id, ingredientId]
        );
      }
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        id: parseInt(id),
        name,
        description,
        price,
        category,
        imageUrl,
        ingredients: ingredients || []
      }
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Supprimer un plat
export const deletePlat = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si le plat existe
    const [plats] = await pool.execute(
      'SELECT * FROM plats WHERE id = ?',
      [id]
    );
    
    if (plats.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Plat non trouvé'
      });
    }
    
    // Supprimer les associations avec les ingrédients
    await pool.execute(
      'DELETE FROM plat_ingredients WHERE plat_id = ?',
      [id]
    );
    
    // Supprimer le plat
    await pool.execute(
      'DELETE FROM plats WHERE id = ?',
      [id]
    );
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};