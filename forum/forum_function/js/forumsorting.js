document.addEventListener("DOMContentLoaded", function() {
	const forumPosts = document.getElementById("forum-posts");

	// 获取所有帖子
	const posts = Array.from(forumPosts.children);

	// 根据时间戳排序帖子
	posts.sort((a, b) => {
		const timestampA = new Date(a.getAttribute("data-post-id")).getTime();
		const timestampB = new Date(b.getAttribute("data-post-id")).getTime();
		return timestampB - timestampA; // 时间越新的帖子排在前面
	});

	// 清空帖子列表
	forumPosts.innerHTML = "";

	// 将排序后的帖子重新添加到帖子列表中
	posts.forEach(post => {
		forumPosts.appendChild(post);
	});
});