// 初始化 AOS
AOS.init({
    duration: 800,
    once: true
});

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

// 标签切换功能
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有活动状态
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // 添加新的活动状态
        tab.classList.add('active');
        const targetContent = document.getElementById(`${tab.dataset.tab}-content`);
        targetContent.classList.add('active');
    });
});

// 文件上传处理
const fileUploads = document.querySelectorAll('.file-upload input[type="file"]');

fileUploads.forEach(upload => {
    upload.addEventListener('change', (e) => {
        const label = upload.nextElementSibling;
        const span = label.querySelector('span');
        const files = Array.from(e.target.files);
        
        if (files.length > 0) {
            span.textContent = files.length === 1 
                ? files[0].name 
                : `已选择 ${files.length} 个文件`;
        } else {
            span.textContent = '点击或拖拽文件到此处';
        }
    });
});

// 标签输入功能
const tagInput = document.querySelector('.tag-input input');
const tagsContainer = document.querySelector('.tags');
let tags = [];

if (tagInput) {
    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && tagInput.value.trim() !== '') {
            e.preventDefault();
            const tag = tagInput.value.trim();
            if (!tags.includes(tag)) {
                tags.push(tag);
                renderTags();
            }
            tagInput.value = '';
        }
    });
}

function renderTags() {
    tagsContainer.innerHTML = tags.map(tag => `
        <div class="tag">
            <span>${tag}</span>
            <i class="fas fa-times" onclick="removeTag('${tag}')"></i>
        </div>
    `).join('');
}

function removeTag(tag) {
    tags = tags.filter(t => t !== tag);
    renderTags();
}

// 参考链接处理
const addLinkBtn = document.querySelector('.add-link');
const linkInput = document.querySelector('.link-input input');
const linksList = document.querySelector('.links-list');
let links = [];

if (addLinkBtn) {
    addLinkBtn.addEventListener('click', () => {
        const url = linkInput.value.trim();
        if (url && isValidURL(url) && !links.includes(url)) {
            links.push(url);
            renderLinks();
            linkInput.value = '';
        }
    });
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function renderLinks() {
    linksList.innerHTML = links.map(link => `
        <div class="tag">
            <a href="${link}" target="_blank">${new URL(link).hostname}</a>
            <i class="fas fa-times" onclick="removeLink('${link}')"></i>
        </div>
    `).join('');
}

function removeLink(link) {
    links = links.filter(l => l !== link);
    renderLinks();
}

// 表单提交处理
const forms = document.querySelectorAll('.modern-form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // 这里添加表单提交逻辑
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // 显示提交成功提示
        showNotification('提交成功！', 'success');
    });
});

// 通知提示功能
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // 添加显示动画
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 3秒后移除通知
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 拖拽上传功能
const dropZones = document.querySelectorAll('.file-upload');

dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        const input = zone.querySelector('input[type="file"]');
        const span = zone.querySelector('span');
        
        if (files.length > 0) {
            // 更新文件输入
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            input.files = dataTransfer.files;
            
            // 更新显示文本
            span.textContent = files.length === 1 
                ? files[0].name 
                : `已选择 ${files.length} 个文件`;
        }
    });
});

// 北京时间更新
function updateBeijingTime() {
    const options = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const beijingTime = new Date().toLocaleString('zh-CN', options);
    document.getElementById('current-time').textContent = beijingTime;
}

// 初始更新时间
updateBeijingTime();

// 每秒更新一次时间
setInterval(updateBeijingTime, 1000);
 