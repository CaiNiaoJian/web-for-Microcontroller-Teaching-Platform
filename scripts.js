// 导航栏响应式设计
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 更新阅读计数器和发布时间
function updateArticleMeta(article) {
    const views = parseInt(article.getAttribute('data-views'), 10);
    const date = article.getAttribute('data-date');

    // 增加阅读计数
    article.setAttribute('data-views', views + 1);

    // 更新页面上的阅读计数和发布时间
    const viewCountElement = article.querySelector('.view-count');
    const publishDateElement = article.querySelector('.publish-date');

    if (viewCountElement) {
        viewCountElement.textContent = views + 1;
    }

    if (publishDateElement) {
        publishDateElement.textContent = date;
    }
}

// 页面加载完成后更新当前文章的元数据
document.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector('.article-detail');
    if (article) {
        updateArticleMeta(article);
    }
});