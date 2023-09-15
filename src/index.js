"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql2_1 = require("mysql2");
var cors_1 = require("cors");
var app = (0, express_1.default)();
// MySQLの接続情報
var dbConfig = {
    user: 'root',
    host: 'localhost',
    password: '1234',
    database: 'MyData',
    port: 3306,
};
var db = mysql2_1.default.createConnection(dbConfig);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// データの追加
app.post('/shop', function (req, res) {
    var _a = req.body, name = _a.name, address = _a.address;
    var query = 'INSERT INTO shop (name, address) VALUES (?, ?)';
    db.query(query, [name, address], function (err, result) {
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
app.get('/shop', function (req, res) {
    var query = 'SELECT * FROM shop';
    db.query(query, function (err, result) {
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
app.get('/shop/:id', function (req, res) {
    var id = req.params.id;
    var query = 'SELECT * FROM shop WHERE id = ?';
    db.query(query, [id], function (err, result) {
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
app.put('/shop/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var _a = req.body, name = _a.name, address = _a.address;
    var query = 'UPDATE shop SET name = ?, address = ? WHERE id = ?';
    db.query(query, [name, address, id], function (err, result) {
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
app.delete('/shop/:id', function (req, res) {
    var id = req.params.id;
    var query = 'DELETE FROM shop WHERE id = ?';
    db.query(query, [id], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting data from database');
        }
        else {
            res.status(200).send('Value Deleted');
        }
    });
});
var port = 3001;
app.listen(port, function () {
    console.log("Yey, your server is running on port ".concat(port));
});
