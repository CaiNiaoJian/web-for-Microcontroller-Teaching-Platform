// 初始化 AOS 动画库
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 深色模式切换
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // 检查本地存储中的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', newTheme);
    });
}

// 导航栏滚动效果
let lastScroll = 0;
const nav = document.querySelector('.nav-wrapper');
if (nav) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 视差滚动效果
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.003);
    });
}

// 图片懒加载
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// 添加移动端菜单功能
const navContent = document.querySelector('.nav-content');
if (navContent) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    navContent.appendChild(menuToggle);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        mobileMenu.innerHTML = navLinks.outerHTML;
        document.querySelector('.nav-wrapper').appendChild(mobileMenu);

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
}

// 添加移动端菜单样式
const menuStyle = document.createElement('style');
menuStyle.textContent = `
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
    }
    
    .menu-toggle span {
        display: block;
        width: 25px;
        height: 2px;
        background-color: var(--text-color);
        margin: 5px 0;
        transition: var(--transition);
    }
    
    .mobile-menu {
        display: none;
        position: fixed;
        top: 48px;
        left: 0;
        right: 0;
        background: var(--background-color);
        padding: 20px;
        transform: translateY(-100%);
        transition: var(--transition);
    }
    
    .mobile-menu.active {
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
        
        .mobile-menu {
            display: block;
        }
        
        .mobile-menu .nav-links {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`;

document.head.appendChild(menuStyle); 