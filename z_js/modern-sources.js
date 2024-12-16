// 初始化 AOS
AOS.init({
    duration: 800,
    once: true
});

// 资源搜索功能
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const resourceCards = document.querySelectorAll('.resource-card');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        resourceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const isMatch = title.includes(searchTerm) || 
                          description.includes(searchTerm) ||
                          tags.some(tag => tag.includes(searchTerm));

            card.style.display = isMatch ? 'block' : 'none';
            card.style.opacity = isMatch ? '1' : '0';
        });
    });
}

// 分类筛选功能
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const resourceCards = document.querySelectorAll('.resource-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的活动状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            resourceCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    const cardCategory = card.dataset.category;
                    if (cardCategory === category) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }
            });
        });
    });
}

// 资源卡片动画
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.resource-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// 标签点击筛选
function initializeTagFiltering() {
    const tags = document.querySelectorAll('.tag');
    const resourceCards = document.querySelectorAll('.resource-card');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagText = tag.textContent.toLowerCase();

            resourceCards.forEach(card => {
                const cardTags = Array.from(card.querySelectorAll('.tag'))
                    .map(t => t.textContent.toLowerCase());

                if (cardTags.includes(tagText)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// 资源访问统计
function initializeResourceTracking() {
    const resourceLinks = document.querySelectorAll('.resource-link');

    resourceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const resourceName = link.closest('.resource-card').querySelector('h3').textContent;
            
            // 这里可以添加访问统计的代码
            console.log(`Resource accessed: ${resourceName}`);
            
            // 如果需要，这里可以发送统计数据到服务器
        });
    });
}

// 暗色模式切换
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// 检查本地存储中的主题设置
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    initializeFilters();
    initializeCardAnimations();
    initializeTagFiltering();
    initializeResourceTracking();
}); 