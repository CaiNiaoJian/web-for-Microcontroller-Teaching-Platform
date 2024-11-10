document.addEventListener('DOMContentLoaded', function() {
	const postForm = document.getElementById('post-form');
	const postsContainer = document.getElementById('forum-posts');

	// 加载帖子
	loadPosts();

	postForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const title = document.getElementById('post-title').value;
		const content = document.getElementById('post-content').value;
		const emoji = document.getElementById('post-emojis').value;
		const author = '匿名'; // 可以根据需要修改为实际作者

		// 使用 AJAX 提交表单数据
		fetch('https://static-mp-6c87dd49-3175-4abe-84a1-35f09f5ef26f.next.bspapp.com/submit-post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					content,
					emoji,
					author
				})
			})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					// 添加新帖子到列表
					const newPost = document.createElement('li');
					newPost.className = 'forum-post';
					newPost.innerHTML = `
                    <h2><a href="#">${title}</a></h2>
                    <p>${content} ${emoji}</p>
                    <div class="post-meta">
                        <span class="author">作者: ${author}</span>
                        <span class="date">发布时间: ${new Date().toISOString().split('T')[0]}</span>
                    </div>
                `;
					postsContainer.insertBefore(newPost, postsContainer.firstChild);

					// 清空表单
					postForm.reset();
				} else {
					alert('发布失败，请稍后再试。');
				}
			})
			.catch(error => {
				console.error('Error:', error);
				alert('发布失败，请稍后再试。');
			});
	});

	// 加载帖子函数
	function loadPosts() {
		fetch('https://static-mp-6c87dd49-3175-4abe-84a1-35f09f5ef26f.next.bspapp.com/get-posts')
			.then(response => response.json())
			.then(data => {
				data.posts.forEach(post => {
					const newPost = document.createElement('li');
					newPost.className = 'forum-post';
					newPost.innerHTML = `
                    <h2><a href="#">${post.title}</a></h2>
                    <p>${post.content} ${post.emoji}</p>
                    <div class="post-meta">
                        <span class="author">作者: ${post.author}</span>
                        <span class="date">发布时间: ${new Date(post.created_at).toISOString().split('T')[0]}</span>
                    </div>
                `;
					postsContainer.appendChild(newPost);
				});
			})
			.catch(error => {
				console.error('Error:', error);
				alert('加载帖子失败，请稍后再试。');
			});
	}
});