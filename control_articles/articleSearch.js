// 模拟文章数据
const articlesData = [{
		title: "音乐展示器设计实验",
		url: "musicshower.html"
	},
	{
		title: "波形发生器设计实验",
		url: "control-article1.html"
	},
	{
		title: "串口通信",
		url: "exp1-3.html"
	},
	{
		title: "红绿灯",
		url: "exp1-2.html"
	},
	{
		title: "51单片机实验 - 温度传感器与LCD显示",
		url: "exp1-1.html"
	}
];

// 获取搜索框和文章列表元素
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const articlesList = document.querySelector('.articles');

// 确保在 DOM 加载完成后再执行搜索功能
document.addEventListener('DOMContentLoaded', () => {
	// 搜索功能
	searchButton.addEventListener('click', () => {
		const searchTerm = searchBox.value.toLowerCase();

		// 遍历所有文章元素
		const articles = articlesList.querySelectorAll('.article');
		articles.forEach(article => {
			const title = article.querySelector('h2').innerText.toLowerCase();
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