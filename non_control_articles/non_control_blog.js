// 更新阅读次数
document.addEventListener('DOMContentLoaded', function() {
    const article = document.querySelector('.article-detail');
    const viewCount = article.getAttribute('data-views');
    const viewCountElement = article.querySelector('.view-count');

    // 增加阅读次数
    let newViewCount = parseInt(viewCount) + 1;
    viewCountElement.textContent = newViewCount;
    article.setAttribute('data-views', newViewCount);
});