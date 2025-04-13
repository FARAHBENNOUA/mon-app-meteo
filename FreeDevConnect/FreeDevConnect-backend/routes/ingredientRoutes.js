import express from 'express';
import mysql from '../config/mysql.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.get('/ingredients', async (req, res) => {
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT * FROM ingredients ORDER BY name');
        connection.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/ingredient/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT * FROM ingredients WHERE id = ?', [id]);
        connection.release();
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Ingrédient non trouvé' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/ingredients/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM ingredients WHERE category = ? ORDER BY name', 
            [category]
        );
        connection.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/ingredient', upload.single('image'), async (req, res) => {
    const { name, category, unit, stock, description } = req.body;
    try {
        const connection = await mysql.getConnection();
        
        const [result] = await connection.execute(
            'INSERT INTO ingredients (name, category, unit, stock, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
            [name, category, unit, stock, description, req.file ? req.file.path : null]
        );
        
        connection.release();
        res.status(201).json({ 
            id: result.insertId, 
            name, 
            category, 
            unit, 
            stock, 
            description, 
            imageUrl: req.file ? req.file.path : null 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/ingredient/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, category, unit, stock, description } = req.body;
    try {
        const connection = await mysql.getConnection();
        
        await connection.execute(
            'UPDATE ingredients SET name = ?, category = ?, unit = ?, stock = ?, description = ?, imageUrl = COALESCE(?, imageUrl) WHERE id = ?',
            [name, category, unit, stock, description, req.file ? req.file.path : null, id]
        );
        
        connection.release();
        res.json({ 
            id, 
            name, 
            category, 
            unit, 
            stock, 
            description, 
            imageUrl: req.file ? req.file.path : 'non modifiée' 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/ingredient/:id/stock', async (req, res) => {
    const { id } = req.params;
    const { stock, operation } = req.body;
    try {
        const connection = await mysql.getConnection();
        
        const [ingredients] = await connection.execute('SELECT * FROM ingredients WHERE id = ?', [id]);
        
        if (ingredients.length === 0) {
            connection.release();
            return res.status(404).json({ error: 'Ingrédient non trouvé' });
        }
        
        let newStock = stock;
        
        if (operation) {
            const currentStock = ingredients[0].stock;
            if (operation === 'add') {
                newStock = currentStock + Number(stock);
            } else if (operation === 'subtract') {
                newStock = Math.max(0, currentStock - Number(stock));
            }
        }
        
        await connection.execute('UPDATE ingredients SET stock = ? WHERE id = ?', [newStock, id]);
        
        connection.release();
        res.json({ id, stock: newStock });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/ingredient/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        
        const [usedInPlats] = await connection.execute(
            'SELECT COUNT(*) as count FROM plat_ingredients WHERE ingredient_id = ?',
            [id]
        );
        
        if (usedInPlats[0].count > 0) {
            connection.release();
            return res.status(400).json({ 
                error: 'Cet ingrédient est utilisé dans des plats et ne peut pas être supprimé' 
            });
        }
        
        await connection.execute('DELETE FROM ingredients WHERE id = ?', [id]);
        
        connection.release();
        res.json({ message: 'Ingrédient supprimé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;