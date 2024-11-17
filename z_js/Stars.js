// Stars.js

function createStars() {
	const starsContainer = document.createElement('div');
	starsContainer.id = 'stars-container';
	starsContainer.style.position = 'fixed';
	starsContainer.style.top = '0';
	starsContainer.style.left = '0';
	starsContainer.style.width = '100%';
	starsContainer.style.height = '100%';
	starsContainer.style.zIndex = '-1';
	starsContainer.style.pointerEvents = 'none';

	for (let i = 0; i < 100; i++) {
		const star = document.createElement('div');
		star.className = 'star';
		star.style.position = 'absolute';
		star.style.width = '2px';
		star.style.height = '2px';
		star.style.background = 'white';
		star.style.borderRadius = '50%';
		star.style.top = `${Math.random() * 100}%`;
		star.style.left = `${Math.random() * 100}%`;
		star.style.animation = `twinkle ${Math.random() * 5 + 2}s infinite`;
		starsContainer.appendChild(star);
	}

	document.body.appendChild(starsContainer);
}

function removeStars() {
	const starsContainer = document.getElementById('stars-container');
	if (starsContainer) {
		starsContainer.remove();
	}
}

function setTheme(theme) {
	const root = document.documentElement;
	if (theme === 'dark') {
		root.classList.add('dark-theme');
		createStars();
	} else {
		root.classList.remove('dark-theme');
		removeStars();
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
toggleButton.textContent = 'Toggle Theme';
toggleButton.classList.add('theme-toggle-button');
toggleButton.addEventListener('click', toggleTheme);

document.querySelector('header').appendChild(toggleButton);