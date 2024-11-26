const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// 创建数据库连接
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'yourpassword',
	database: 'electronicparts'
});

// 连接到数据库
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('MySQL connected...');
});

// 设置静态文件目录
app.use(express.static('public'));

// 路由：获取所有元器件数据
app.get('/parts', (req, res) => {
	let sql = 'SELECT * FROM parts';
	db.query(sql, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

// 启动服务器
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});