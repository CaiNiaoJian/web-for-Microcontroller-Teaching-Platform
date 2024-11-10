document.getElementById('addArticleButton').addEventListener('click', function() {
	const addArticleForm = document.getElementById('addArticles');
	addArticleForm.style.display = addArticleForm.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('submitArticleButton').addEventListener('click', function() {
	const title = document.getElementById('articleTitle').value;
	const content = document.getElementById('articleContent').value;

	if (title && content) {
		const articleList = document.getElementById('articleList');
		const articleItem = document.createElement('div');
		articleItem.className = 'article-item';
		articleItem.innerHTML = `
            <div class="article-title">${title}</div>
            <div class="article-actions">
                <button class="edit-button">编辑</button>
                <button class="delete-button">删除</button>
            </div>
        `;
		articleList.appendChild(articleItem);

		document.getElementById('articleTitle').value = '';
		document.getElementById('articleContent').value = '';
		document.getElementById('addArticles').style.display = 'none';
	} else {
		alert('请填写文章标题和内容');
	}
});

document.getElementById('articleList').addEventListener('click', function(event) {
	if (event.target.classList.contains('delete-button')) {
		event.target.parentElement.parentElement.remove();
	} else if (event.target.classList.contains('edit-button')) {
		const articleItem = event.target.parentElement.parentElement;
		const title = articleItem.querySelector('.article-title').innerText;
		document.getElementById('articleTitle').value = title;
		document.getElementById('addArticles').style.display = 'block';
	}
});