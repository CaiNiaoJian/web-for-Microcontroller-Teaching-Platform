// articleSearch.js
document.addEventListener('DOMContentLoaded', () => {
	const searchBox = document.getElementById('search-box');
	const searchButton = document.getElementById('search-button');
	const articlesList = document.querySelector('.articles');

	// 搜索功能
	searchButton.addEventListener('click', () => {
		const searchTerm = searchBox.value.toLowerCase();

		// 遍历所有文章元素
		const articles = articlesList.querySelectorAll('.article');
		articles.forEach(article => {
			const title = article.querySelector('h3 a').innerText.toLowerCase();
			if (title.includes(searchTerm)) {
				article.style.display = 'block'; // 显示匹配的文章
			} else {
				article.style.display = 'none'; // 隐藏不匹配的文章
			}
		});
	});

	// 实时搜索功能（可选）
	searchBox.addEventListener('input', () => {
		searchButton.click();
	});
});