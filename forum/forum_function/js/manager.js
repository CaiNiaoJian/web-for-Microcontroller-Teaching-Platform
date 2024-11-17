document.addEventListener('DOMContentLoaded', function() {
	const forumPosts = document.getElementById('forum-posts');
	const managerLoginButton = document.getElementById('manager-login-button');
	const managerLoginForm = document.getElementById('manager-login-form');
	const managerForm = document.getElementById('manager-form');

	const managerUsername = '08222220';
	const managerPassword = 'admin';
	const managerKey = 'jian';

	// 点击管理员登录按钮显示/隐藏管理员登录表单
	managerLoginButton.addEventListener('click', function() {
		managerLoginForm.classList.toggle('active');
	});

	// 管理员登录
	managerForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const inputUsername = document.getElementById('manager-username').value;
		const inputPassword = document.getElementById('manager-password').value;
		const inputKey = document.getElementById('manager-key').value;

		if (inputUsername === managerUsername && inputPassword === managerPassword && inputKey ===
			managerKey) {
			localStorage.setItem('managerLoggedIn', 'true');
			managerLoginForm.classList.remove('active');
			alert('管理员登录成功！');
		} else {
			alert('用户名、密码或管理员识别密钥错误，登录失败！');
		}
	});

	// 管理员删除帖子
	forumPosts.addEventListener('click', function(event) {
		if (event.target.classList.contains('delete-button') && isManagerLoggedIn()) {
			const postId = event.target.getAttribute('data-post-id');
			const postElement = document.querySelector(`.forum-posts li[data-post-id="${postId}"]`);
			deletePost(postId);
			postElement.remove();
		}
	});

	// 管理员删除回复
	forumPosts.addEventListener('click', function(event) {
		if (event.target.classList.contains('delete-reply-button') && isManagerLoggedIn()) {
			const replyId = event.target.getAttribute('data-reply-id');
			const replyElement = event.target.parentElement;
			const postId = replyElement.parentElement.getAttribute('data-post-id');
			deleteReply(postId, replyId);
			replyElement.remove();
		}
	});

	function deletePost(postId) {
		let posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
		posts = posts.filter(post => post.timestamp !== postId);
		localStorage.setItem('forumPosts', JSON.stringify(posts));
	}

	function deleteReply(postId, replyId) {
		let posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
		let post = posts.find(p => p.timestamp === postId);
		if (post && post.replies) {
			post.replies = post.replies.filter(reply => reply.timestamp !== replyId);
			localStorage.setItem('forumPosts', JSON.stringify(posts));
		}
	}

	function isManagerLoggedIn() {
		return localStorage.getItem('managerLoggedIn') === 'true';
	}
});