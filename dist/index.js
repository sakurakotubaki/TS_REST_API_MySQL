"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// MySQLの接続情報
const dbConfig = {
    user: 'root',
    host: 'localhost',
    password: '1234',
    database: 'MyData',
    port: 3306,
};
const db = mysql2_1.default.createConnection(dbConfig);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// データの追加
app.post('/shop', (req, res) => {
    const { name, address } = req.body;
    const query = 'INSERT INTO shop (name, address) VALUES (?, ?)';
    db.query(query, [name, address], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Error inserting data into database' });
        }
        else {
            res.status(200).json({ message: 'Value Inserted' });
        }
    });
});
// データの取得
app.get('/shop', (req, res) => {
    const query = 'SELECT * FROM shop';
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from database');
        }
        else {
            res.status(200).json(result);
        }
    });
});
// 特定のデータの取得
app.get('/shop/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM shop WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from database');
        }
        else {
            res.status(200).json(result);
        }
    });
});
// データの更新
app.put('/shop/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, address } = req.body;
    const query = 'UPDATE shop SET name = ?, address = ? WHERE id = ?';
    db.query(query, [name, address, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating data in database');
        }
        else {
            res.status(200).send('Value Updated');
        }
    });
});
// データの削除
app.delete('/shop/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM shop WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting data from database');
        }
        else {
            res.status(200).send('Value Deleted');
        }
    });
});
const port = 3001;
app.listen(port, () => {
    console.log(`Yey, your server is running on port ${port}`);
});
