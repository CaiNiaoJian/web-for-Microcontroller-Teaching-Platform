// dynamic.js

// Example data for articles to be loaded dynamically
const newArticles = [{
		title: '计算机网络安全',
		summary: '计算机网络安全是保护计算机免受外部攻击和数据泄露的重要技术。'
	},
	{
		title: '人工智能的发展趋势',
		summary: '探讨人工智能技术的最新进展及其应用场景。'
	},
	{
		title: '智能制造的未来',
		summary: '智能制造如何改变传统工业生产流程。'
	},
	{
		title: '虚拟现实在教育中的应用',
		summary: '虚拟现实技术在教育领域的创新应用。'
	},
	{
		title: '自动驾驶技术的挑战',
		summary: '自动驾驶技术在安全性、法规和社会接受度方面的挑战。'
	},
	{
		title: '5G技术与未来网络',
		summary: '5G技术在提升网络速度和效率方面的作用及前景。'
	}
];

// Function to render a new article card
function renderArticleCard(title, summary) {
	const articleCard = document.createElement('div');
	articleCard.classList.add('article-card');

	const articleTitle = document.createElement('h3');
	articleTitle.textContent = title;

	const articleSummary = document.createElement('p');
	articleSummary.textContent = summary;

	articleCard.appendChild(articleTitle);
	articleCard.appendChild(articleSummary);

	return articleCard;
}

// Function to load new articles dynamically
function loadMoreArticles() {
	const sections = document.querySelectorAll('section');

	// Display loading effect
	const loadingMessage = document.createElement('div');
	loadingMessage.classList.add('loading');
	loadingMessage.textContent = '加载中...';
	document.body.appendChild(loadingMessage);

	// Simulate loading time with setTimeout
	setTimeout(() => {
		// Remove loading message
		document.body.removeChild(loadingMessage);

		// Insert new articles into each section
		sections.forEach(section => {
			newArticles.forEach(article => {
				const newCard = renderArticleCard(article.title, article.summary);
				section.appendChild(newCard);
			});
		});
	}, 1500); // Simulate a 1.5s loading time
}

// Scroll listener to detect when to load more articles
window.addEventListener('scroll', () => {
	const bottomOfPage = document.documentElement.scrollHeight === document.documentElement.scrollTop + window
		.innerHeight;
	if (bottomOfPage) {
		loadMoreArticles();
	}
});

// Initial load of some articles on page load
window.addEventListener('load', () => {
	loadMoreArticles();
});

// Smooth scroll functionality for anchor links in the navbar
document.querySelectorAll('nav ul li a').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();

		const targetId = this.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);

		window.scrollTo({
			top: targetElement.offsetTop - 100, // Adjust for navbar height
			behavior: 'smooth'
		});
	});
});