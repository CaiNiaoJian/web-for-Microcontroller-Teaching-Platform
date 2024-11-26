<!-- VueSrc/ArticleList.vue -->
<template>
	<div class="articles">
		<h2>非控制类文章列表</h2>
		<article v-for="article in articles" :key="article.title" class="article">
			<h3><a :href="article.url">{{ article.title }}</a></h3>
			<p>{{ article.summary }}</p>
			<div class="article-meta">
				<span class="views">阅读次数: <span class="view-count">{{ article.views }}</span></span>
				<span class="date">发布时间: <span class="publish-date">{{ article.date }}</span></span>
			</div>
			<div class="like-section">
				<button class="like-button" @click="likeArticle(article)">点赞</button>
				<span class="like-count">{{ article.likes }}</span>
			</div>
		</article>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				articles: [{
						title: "非控制类文章标题 1",
						url: "non-control-article1.html",
						summary: "这是非控制类文章的摘要内容。这是非控制类文章的摘要内容。这是非控制类文章的摘要内容。",
						views: 0,
						date: "2023-10-04",
						likes: 0
					},
					{
						title: "非控制类文章标题 2",
						url: "non-control-article2.html",
						summary: "这是非控制类文章的摘要内容。这是非控制类文章的摘要内容。这是非控制类文章的摘要内容。",
						views: 0,
						date: "2023-10-05",
						likes: 0
					},
					{
						title: "非控制类文章标题 3",
						url: "non-control-article3.html",
						summary: "这是非控制类文章的摘要内容。这是非控制类文章的摘要内容。这是非控制类文章的摘要内容。",
						views: 0,
						date: "2023-10-06",
						likes: 0
					}
				]
			};
		},
		methods: {
			likeArticle(article) {
				article.likes++;
			}
		}
	};
</script>

<style scoped>
	.articles {
		margin-top: 20px;
	}

	.article {
		margin-bottom: 20px;
		padding: 15px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #f9f9f9;
	}

	.article h3 {
		margin-bottom: 10px;
	}

	.article-meta {
		margin-top: 10px;
		font-size: 0.9em;
		color: #777;
	}

	.like-section {
		margin-top: 10px;
	}

	.like-button {
		padding: 5px 10px;
		background-color: #007BFF;
		color: white;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}

	.like-button:hover {
		background-color: #0056b3;
	}
</style>