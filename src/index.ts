import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

// データベース接続情報のインターフェイス
interface DatabaseConfig {
  user: string;
  host: string;
  password: string;
  database: string;
  port: number;
}

// MySQLの接続情報
const dbConfig: DatabaseConfig = {
  user: 'root',
  host: 'localhost',
  password: '1234',
  database: 'MyData',
  port: 3306,
};

const db = mysql.createConnection(dbConfig);

app.use(cors());
app.use(express.json());

// POSTデータのインターフェイス
interface ShopData {
  name: string;
  address: string;
}

// データの追加
app.post('/shop', (req: Request, res: Response) => {
  const { name, address } = req.body as ShopData;

  const query = 'INSERT INTO shop (name, address) VALUES (?, ?)';
  db.query(query, [name, address], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Error inserting data into database' });
    } else {
      res.status(200).json({ message: 'Value Inserted' });
    }
  });
});

// データの取得
app.get('/shop', (req: Request, res: Response) => {
  const query = 'SELECT * FROM shop';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

// 特定のデータの取得
app.get('/shop/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const query = 'SELECT * FROM shop WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

// データの更新
app.put('/shop/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name, address } = req.body as ShopData;

  const query = 'UPDATE shop SET name = ?, address = ? WHERE id = ?';
  db.query(query, [name, address, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating data in database');
    } else {
      res.status(200).send('Value Updated');
    }
  });
});

// データの削除
app.delete('/shop/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const query = 'DELETE FROM shop WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting data from database');
    } else {
      res.status(200).send('Value Deleted');
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Yey, your server is running on port ${port}`);
});
