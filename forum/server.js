const express = require('express');
const bodyParser = require('body-parser');
const {
	MongoClient
} = require('mongodb');
const app = express();
const port = 3000;

// MongoDB 连接字符串
const uri =
	'mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority'; // 替换为你的 MongoDB 连接字符串
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// 使用 body-parser 中间件解析 JSON 请求体
app.use(bodyParser.json());

// 处理提交帖子请求
app.post('/submit-post', async (req, res) => {
	const {
		title,
		content,
		emoji,
		author
	} = req.body;

	try {
		await client.connect();
		const database = client.db('your-database-name'); // 替换为你的数据库名称
		const collection = database.collection('forum_posts');

		const result = await collection.insertOne({
			title,
			content,
			emoji,
			author,
			created_at: new Date()
		});

		res.json({
			success: true,
			insertedId: result.insertedId
		});
	} catch (error) {
		console.error('Error inserting post:', error);
		res.status(500).json({
			success: false
		});
	} finally {
		await client.close();
	}
});

// 处理获取帖子请求
app.get('/get-posts', async (req, res) => {
	try {
		await client.connect();
		const database = client.db('your-database-name'); // 替换为你的数据库名称
		const collection = database.collection('forum_posts');

		const posts = await collection.find().sort({
			created_at: -1
		}).toArray();

		res.json({
			success: true,
			posts
		});
	} catch (error) {
		console.error('Error fetching posts:', error);
		res.status(500).json({
			success: false
		});
	} finally {
		await client.close();
	}
});

// 启动服务器
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});