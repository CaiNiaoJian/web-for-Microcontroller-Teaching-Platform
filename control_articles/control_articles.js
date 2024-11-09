// control_articles.js

document.addEventListener('DOMContentLoaded', function() {
    const likeButtons = document.querySelectorAll('.like-button');

    // 获取点赞数据
    fetch('/getLikes')
        .then(response => response.json())
        .then(data => {
            likeButtons.forEach(button => {
                const articleId = button.getAttribute('data-article-id');
                const likeCount = button.nextElementSibling;
                likeCount.textContent = data[articleId] || 0;
            });
        });

    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article-id');
            const likeCount = this.nextElementSibling;

            // 发送点赞请求
            fetch('/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ articleId })
            })
            .then(response => response.json())
            .then(data => {
                likeCount.textContent = data.likes;
            });
        });
    });
});