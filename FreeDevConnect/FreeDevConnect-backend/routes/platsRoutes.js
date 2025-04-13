import express from 'express';
import mysql from '../config/mysql.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.get('/plats', async (req, res) => {
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute(
            'SELECT p.*, GROUP_CONCAT(i.name) as ingredients FROM plats p ' +
            'LEFT JOIN plat_ingredients pi ON p.id = pi.plat_id ' +
            'LEFT JOIN ingredients i ON pi.ingredient_id = i.id ' +
            'GROUP BY p.id'
        );
        connection.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/plat/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute(
            'SELECT p.*, GROUP_CONCAT(i.name) as ingredients FROM plats p ' +
            'LEFT JOIN plat_ingredients pi ON p.id = pi.plat_id ' +
            'LEFT JOIN ingredients i ON pi.ingredient_id = i.id ' +
            'WHERE p.id = ? GROUP BY p.id',
            [id]
        );
        connection.release();
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Plat non trouvé' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/plat', upload.single('image'), async (req, res) => {
    const { name, description, price, category } = req.body;
    try {
        const connection = await mysql.getConnection();
        
        const [result] = await connection.execute(
            'INSERT INTO plats (name, description, price, category, imageUrl) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, category, req.file ? req.file.path : null]
        );
        
        if (ingredients) {
            const ingredientsArray = typeof ingredients === 'string' 
                ? JSON.parse(ingredients) 
                : ingredients;
            
            for (const ingredientId of ingredientsArray) {
                await connection.execute(
                    'INSERT INTO plat_ingredients (plat_id, ingredient_id) VALUES (?, ?)',
                    [result.insertId, ingredientId]
                );
            }
        }
        
        connection.release();
        res.status(201).json({ 
            id: result.insertId, 
            name, 
            description, 
            price, 
            category, 
            imageUrl: req.file ? req.file.path : null 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/plat/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, ingredients } = req.body;
    try {
        const connection = await mysql.getConnection();
        
        await connection.execute(
            'UPDATE plats SET name = ?, description = ?, price = ?, category = ?, imageUrl = COALESCE(?, imageUrl) WHERE id = ?',
            [name, description, price, category, req.file ? req.file.path : null, id]
        );
        
        if (ingredients) {
            await connection.execute('DELETE FROM plat_ingredients WHERE plat_id = ?', [id]);
            
            const ingredientsArray = typeof ingredients === 'string' 
                ? JSON.parse(ingredients) 
                : ingredients;
            
            for (const ingredientId of ingredientsArray) {
                await connection.execute(
                    'INSERT INTO plat_ingredients (plat_id, ingredient_id) VALUES (?, ?)',
                    [id, ingredientId]
                );
            }
        }
        
        connection.release();
        res.json({ 
            id, 
            name, 
            description, 
            price, 
            category, 
            imageUrl: req.file ? req.file.path : 'non modifiée'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/plat/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        
        await connection.execute('DELETE FROM plat_ingredients WHERE plat_id = ?', [id]);
        await connection.execute('DELETE FROM plats WHERE id = ?', [id]);
        
        connection.release();
        res.json({ message: 'Plat supprimé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;