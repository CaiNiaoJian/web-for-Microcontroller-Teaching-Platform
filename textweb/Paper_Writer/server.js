const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'textweb')));

// 管理员登录接口
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 模拟管理员登录验证
    if (username === 'admin' && password === 'password') {
        res.json({ message: '管理员登录成功' });
    } else {
        res.status(401).json({ message: '管理员登录失败' });
    }
});

// 发布文章接口
app.post('/publish', (req, res) => {
    const { content } = req.body;
    // 模拟发布文章
    console.log('发布文章内容：', content);
    res.json({ message: '文章发布成功' });
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});