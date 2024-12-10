// column.js

// Mock data for articles
const computerData = [{
		title: '计算机科学概论',
		summary: '介绍计算机科学的基本概念。'
	},
	{
		title: '编程语言发展史',
		summary: '分析不同编程语言的演变过程。'
	},
];

const mechanicalData = [{
		title: '机械设计原理',
		summary: '学习机械设计的基本原理。'
	},
	{
		title: '自动化技术',
		summary: '探讨现代自动化技术的应用。'
	},
];

const electricalData = [{
		title: '电力系统基础',
		summary: '介绍电力系统的组成及工作原理。'
	},
	{
		title: '电子学基础',
		summary: '讲解电子学的基本概念和应用。'
	},
];

// Function to render article cards
function renderArticles(sectionId, data) {
	const section = document.getElementById(sectionId);
	data.forEach(article => {
		const articleCard = document.createElement('div');
		articleCard.classList.add('article-card');

		const articleTitle = document.createElement('h3');
		articleTitle.textContent = article.title;

		const articleSummary = document.createElement('p');
		articleSummary.textContent = article.summary;

		articleCard.appendChild(articleTitle);
		articleCard.appendChild(articleSummary);
		section.appendChild(articleCard);
	});
}

// Render the articles when the page loads
document.addEventListener('DOMContentLoaded', () => {
	renderArticles('computer', computerData);
	renderArticles('mechanical', mechanicalData);
	renderArticles('electrical', electricalData);
});

// Dark Mode Toggle Functionality
function toggleDarkMode() {
	document.body.classList.toggle('dark-mode');
	document.body.classList.toggle('day-mode');
}

// Check if dark mode is saved in local storage
if (localStorage.getItem('dark-mode') === 'true') {
	document.body.classList.add('dark-mode');
} else {
	document.body.classList.add('day-mode');
}

// Add an event listener for toggling dark mode
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
	toggleDarkMode();
	localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});