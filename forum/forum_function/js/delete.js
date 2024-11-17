document.addEventListener('DOMContentLoaded', function() {
	const forumPosts = document.getElementById('forum-posts');
	const userKey = localStorage.getItem('userKey') || generateUserKey();
	localStorage.setItem('userKey', userKey);

	// 删除帖子
	forumPosts.addEventListener('click', function(event) {
		if (event.target.classList.contains('delete-button')) {
			const postId = event.target.getAttribute('data-post-id');
			const postElement = document.querySelector(`.forum-posts li[data-post-id="${postId}"]`);
			const postUserKey = postElement.getAttribute('data-user-key');

			if (postUserKey === userKey || isManagerLoggedIn()) {
				deletePost(postId);
				postElement.remove();
			}
		}
	});

	// 删除回复
	forumPosts.addEventListener('click', function(event) {
		if (event.target.classList.contains('delete-reply-button')) {
			const replyId = event.target.getAttribute('data-reply-id');
			const replyElement = event.target.parentElement;
			const replyUserKey = replyElement.getAttribute('data-user-key');

			if (replyUserKey === userKey || isManagerLoggedIn()) {
				const postId = replyElement.parentElement.getAttribute('data-post-id');
				deleteReply(postId, replyId);
				replyElement.remove();
			}
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

	function generateUserKey() {
		return Math.random().toString(36).substr(2, 9);
	}

	function isManagerLoggedIn() {
		return localStorage.getItem('managerLoggedIn') === 'true';
	}
});