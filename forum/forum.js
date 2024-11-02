// 导航栏移动端菜单切换
document.getElementById('mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// 点击帖子标题时显示帖子详情
document.querySelectorAll('.forum-posts a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const postTitle = this.textContent;
        const postContent = this.parentElement.querySelector('p').textContent;
        const postAuthor = this.parentElement.querySelector('.author').textContent;
        const postDate = this.parentElement.querySelector('.date').textContent;

        document.querySelector('.forum-details .post-detail h3').textContent = postTitle;
        document.querySelector('.forum-details .post-detail p').textContent = postContent;
        document.querySelector('.forum-details .post-detail .author').textContent = postAuthor;
        document.querySelector('.forum-details .post-detail .date').textContent = postDate;
    });
});

// 发布新帖子
document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;
    const postEmoji = document.getElementById('post-emojis').value;

    // 这里可以添加将帖子数据发送到服务器的逻辑
    console.log('New Post:', postTitle, postContent, postEmoji);

    // 清空表单
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-emojis').value = '😀';
});