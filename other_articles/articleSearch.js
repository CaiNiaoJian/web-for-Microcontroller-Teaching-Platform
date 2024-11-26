// 模拟文章数据
const articlesData = [{
		title: "我们的初心【顶置】🌹",
		url: "OurFollowedHeart.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[1]",
		url: "baseknowloage.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[2]",
		url: "baseknowloage2.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[3]",
		url: "baseknowloage3.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[4]",
		url: "baseknowloage3.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[5]",
		url: "baseknowlodage5.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[6]",
		url: "baseknowlodage6.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[7]",
		url: "baseknowlodage7.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[8]",
		url: "baseknowlodage8.html"
	},
	{
		title: "51单片机开发基础知识和嵌入式C语言入门[9]",
		url: "baseknowlodage9.html"
	},
	{
		title: "数据库的建立一",
		url: "database-setup.html"
	},
	{
		title: "数据库的建立二",
		url: "database-setup2.html"
	},
	{
		title: "其他类文章标题 3",
		url: "other-article3.html"
	}
];

// 获取搜索框和文章列表元素
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const articlesList = document.getElementById('articles-list');

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