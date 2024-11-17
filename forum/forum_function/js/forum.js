document.addEventListener('DOMContentLoaded', function() {
	const postButton = document.getElementById('post-button');
	const postEditor = document.getElementById('post-editor');
	const postForm = document.getElementById('post-form');
	const forumPosts = document.getElementById('forum-posts');
	const closeButton = document.getElementById('close-button');

	// 加载本地存储的帖子
	loadPosts();

	// 点击加号按钮显示/隐藏编辑框
	postButton.addEventListener('click', function() {
		postEditor.classList.toggle('active');
	});

	// 点击关闭按钮隐藏编辑框
	closeButton.addEventListener('click', function() {
		postEditor.classList.remove('active');
	});

	// 提交帖子表单
	postForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const title = document.getElementById('post-title').value;
		const content = document.getElementById('post-content').value;
		const emoji = document.getElementById('post-emojis').value;
		const timestamp = new Date().toLocaleString();
		const userKey = generateUserKey();

		if (title && content) {
			const post = {
				title: title,
				content: content,
				emoji: emoji,
				timestamp: timestamp,
				userKey: userKey
			};

			savePost(post);
			addPostToUI(post);

			// 清空表单
			postForm.reset();
			postEditor.classList.remove('active');
		}
	});

	function savePost(post) {
		let posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
		posts.push(post);
		localStorage.setItem('forumPosts', JSON.stringify(posts));
	}

	function loadPosts() {
		let posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
		posts.forEach(post => {
			addPostToUI(post);
			if (post.replies) {
				post.replies.forEach(reply => addReplyToUI(post.timestamp, reply));
			}
		});
	}

	function addPostToUI(post) {
		const li = document.createElement('li');
		li.setAttribute('data-post-id', post.timestamp);
		li.setAttribute('data-user-key', post.userKey);
		li.innerHTML = `
            <h3>${post.title} ${post.emoji}</h3>
            <p>${post.content}</p>
            <span class="post-meta">${post.timestamp}</span>
            <button class="reply-button" data-post-id="${post.timestamp}">回复</button>
            <button class="delete-button" data-post-id="${post.timestamp}">删除</button>
        `;
		forumPosts.appendChild(li);
	}

	function addReplyToUI(postId, reply) {
		const postElement = document.querySelector(`.forum-posts li[data-post-id="${postId}"]`);
		const replyElement = document.createElement('div');
		replyElement.classList.add('reply');
		replyElement.setAttribute('data-user-key', reply.userKey);
		replyElement.innerHTML = `
            <p>${reply.content} ${reply.emoji}</p>
            <span class="post-meta">${reply.timestamp}</span>
            <button class="delete-reply-button" data-reply-id="${reply.timestamp}">删除</button>
        `;
		postElement.appendChild(replyElement);
	}

	function generateUserKey() {
		return Math.random().toString(36).substr(2, 9);
	}
});