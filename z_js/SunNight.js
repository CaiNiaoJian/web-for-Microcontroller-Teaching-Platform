// SunNight.js

function setTheme(theme) {
	const root = document.documentElement;
	if (theme === 'dark') {
		root.classList.add('dark-theme');
	} else {
		root.classList.remove('dark-theme');
	}
	localStorage.setItem('theme', theme);
}

function toggleTheme() {
	const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
	setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// 初始化主题
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// 添加开关按钮
const toggleButton = document.createElement('button');
toggleButton.textContent = '主题切换';
toggleButton.classList.add('theme-toggle-button');
toggleButton.addEventListener('click', toggleTheme);

document.querySelector('header').appendChild(toggleButton);