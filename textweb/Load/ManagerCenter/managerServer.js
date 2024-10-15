// 示例：获取文章列表
function fetchArticles() {
    return fetch('/api/articles')
        .then(response => response.json())
        .then(data => {
            console.log('文章列表:', data);
            return data;
        })
        .catch(error => {
            console.error('获取文章列表失败:', error);
        });
}

// 示例：审核文章
function reviewArticle(articleId, status) {
    return fetch(`/api/articles/${articleId}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(data => {
        console.log('审核结果:', data);
        return data;
    })
    .catch(error => {
        console.error('审核失败:', error);
    });
}

// 其他与服务器交互的逻辑可以在这里添加