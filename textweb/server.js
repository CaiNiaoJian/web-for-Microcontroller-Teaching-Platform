// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'manager'
});

// 连接到数据库
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// 使用 body-parser 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 注册路由
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('注册成功');
    });
});

// 获取点赞数据
app.get('/getLikes', (req, res) => {
    const sql = 'SELECT articleId, likes FROM likes';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        const likes = {};
        results.forEach(result => {
            likes[result.articleId] = result.likes;
        });
        res.json(likes);
    });
});

// 处理点赞请求
app.post('/like', (req, res) => {
    const { articleId } = req.body;

    const sql = 'INSERT INTO likes (articleId, likes) VALUES (?, 1) ON DUPLICATE KEY UPDATE likes = likes + 1';
    db.query(sql, [articleId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ likes: result.affectedRows ? result.affectedRows : 1 });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});