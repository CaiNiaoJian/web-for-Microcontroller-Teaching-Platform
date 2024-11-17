document.addEventListener('DOMContentLoaded', function() {
	const replyEditor = document.getElementById('reply-editor');
	const replyCloseButton = document.getElementById('reply-close-button');
	const replyForm = document.getElementById('reply-form');
	const forumPosts = document.getElementById('forum-posts');

	// 点击回复按钮显示/隐藏回复编辑框
	forumPosts.addEventListener('click', function(event) {
		if (event.target.classList.contains('reply-button')) {
			const postId = event.target.getAttribute('data-post-id');
			replyEditor.classList.add('active');
			replyEditor.setAttribute('data-post-id', postId);
		}
	});

	// 点击关闭按钮隐藏回复编辑框
	replyCloseButton.addEventListener('click', function() {
		replyEditor.classList.remove('active');
	});

	// 提交回复表单
	replyForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const content = document.getElementById('reply-content').value;
		const emoji = document.getElementById('reply-emojis').value;
		const timestamp = new Date().toLocaleString();
		const postId = replyEditor.getAttribute('data-post-id');
		const userKey = generateUserKey();

		if (content) {
			const reply = {
				content: content,
				emoji: emoji,
				timestamp: timestamp,
				userKey: userKey
			};

			saveReply(postId, reply);
			addReplyToUI(postId, reply);

			// 清空表单
			replyForm.reset();
			replyEditor.classList.remove('active');
		}
	});

	function saveReply(postId, reply) {
		let posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
		let post = posts.find(p => p.timestamp === postId);
		if (!post.replies) {
			post.replies = [];
		}
		post.replies.push(reply);
		localStorage.setItem('forumPosts', JSON.stringify(posts));
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