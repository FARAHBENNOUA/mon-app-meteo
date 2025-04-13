import mysql from '../config/mysql.js';
import { uploadImage } from '../utils/cloudinaryUtils.js';

// Récupérer tous les ingrédients
export const getAllIngredients = async (req, res) => {
  try {
    const [ingredients] = await mysql.execute(
      'SELECT * FROM ingredients ORDER BY name'
    );

    res.status(200).json({
      status: 'success',
      results: ingredients.length,
      data: {
        ingredients
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

// Récupérer un ingrédient par son ID
export const getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [ingredients] = await mysql.execute(
      'SELECT * FROM ingredients WHERE id = ?',
      [id]
    );
    
    if (ingredients.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Ingrédient non trouvé'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        ingredient: ingredients[0]
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

// Créer un nouvel ingrédient
export const createIngredient = async (req, res) => {
  try {
    const { name, category, unit, stock, description } = req.body;
    
    // Upload de l'image si elle existe
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await uploadImage(req.file.path, 'ingredients');
      imageUrl = uploadResult.secure_url;
    }
    
    // Vérifier si l'ingrédient existe déjà
    const [existingIngredients] = await mysql.execute(
      'SELECT * FROM ingredients WHERE name = ?',
      [name]
    );
    
    if (existingIngredients.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Un ingrédient avec ce nom existe déjà'
      });
    }
    
    // Insertion de l'ingrédient dans la BDD
    const [result] = await mysql.execute(
      'INSERT INTO ingredients (name, category, unit, stock, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, unit, stock, description, imageUrl]
    );
    
    res.status(201).json({
      status: 'success',
      data: {
        ingredient: {
          id: result.insertId,
          name,
          category,
          unit,
          stock,
          description,
          imageUrl
        }
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

// Mettre à jour un ingrédient
export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, unit, stock, description } = req.body;
    
    // Vérifier si l'ingrédient existe
    const [ingredients] = await mysql.execute(
      'SELECT * FROM ingredients WHERE id = ?',
      [id]
    );
    
    if (ingredients.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Ingrédient non trouvé'
      });
    }
    
    // Upload de la nouvelle image si elle existe
    let imageUrl = ingredients[0].imageUrl;
    if (req.file) {
      const uploadResult = await uploadImage(req.file.path, 'ingredients');
      imageUrl = uploadResult.secure_url;
    }
    
    // Vérifier si le nouveau nom existe déjà (sauf si c'est le même ingrédient)
    if (name && name !== ingredients[0].name) {
      const [existingIngredients] = await mysql.execute(
        'SELECT * FROM ingredients WHERE name = ? AND id != ?',
        [name, id]
      );
      
      if (existingIngredients.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Un ingrédient avec ce nom existe déjà'
        });
      }
    }
    
    // Mise à jour de l'ingrédient
    await mysql.execute(
      'UPDATE ingredients SET name = ?, category = ?, unit = ?, stock = ?, description = ?, imageUrl = ? WHERE id = ?',
      [
        name || ingredients[0].name, 
        category || ingredients[0].category, 
        unit || ingredients[0].unit, 
        stock !== undefined ? stock : ingredients[0].stock, 
        description || ingredients[0].description, 
        imageUrl, 
        id
      ]
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        ingredient: {
          id: parseInt(id),
          name: name || ingredients[0].name,
          category: category || ingredients[0].category,
          unit: unit || ingredients[0].unit,
          stock: stock !== undefined ? stock : ingredients[0].stock,
          description: description || ingredients[0].description,
          imageUrl
        }
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

// Mettre à jour le stock d'un ingrédient
export const updateIngredientStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, operation } = req.body;
    
    // Vérifier si l'ingrédient existe
    const [ingredients] = await mysql.execute(
      'SELECT * FROM ingredients WHERE id = ?',
      [id]
    );
    
    if (ingredients.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Ingrédient non trouvé'
      });
    }
    
    let newStock = stock;
    
    // Si une opération est spécifiée (add/subtract), calculer le nouveau stock
    if (operation) {
      const currentStock = ingredients[0].stock;
      
      if (operation === 'add') {
        newStock = currentStock + Number(stock);
      } else if (operation === 'subtract') {
        newStock = currentStock - Number(stock);
        // Éviter les stocks négatifs
        if (newStock < 0) newStock = 0;
      }
    }
    
    // Mise à jour du stock
    await mysql.execute(
      'UPDATE ingredients SET stock = ? WHERE id = ?',
      [newStock, id]
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        ingredient: {
          id: parseInt(id),
          stock: newStock
        }
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

// Supprimer un ingrédient
export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si l'ingrédient existe
    const [ingredients] = await mysql.execute(
      'SELECT * FROM ingredients WHERE id = ?',
      [id]
    );
    
    if (ingredients.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Ingrédient non trouvé'
      });
    }
    
    // Vérifier si l'ingrédient est utilisé dans des plats
    const [usedInPlats] = await mysql.execute(
      'SELECT COUNT(*) as count FROM plat_ingredients WHERE ingredient_id = ?',
      [id]
    );
    
    if (usedInPlats[0].count > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Cet ingrédient est utilisé dans des plats et ne peut pas être supprimé'
      });
    }
    
    // Supprimer l'ingrédient
    await mysql.execute(
      'DELETE FROM ingredients WHERE id = ?',
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

// Obtenir les ingrédients par catégorie
export const getIngredientsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const [ingredients] = await mysql.execute(
      'SELECT * FROM ingredients WHERE category = ? ORDER BY name',
      [category]
    );
    
    res.status(200).json({
      status: 'success',
      results: ingredients.length,
      data: {
        ingredients
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