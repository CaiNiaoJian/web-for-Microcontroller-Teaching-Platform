// 插入图片按钮点击事件
document.getElementById('insert-image-btn').addEventListener('click', () => {
    document.getElementById('image-upload').click();
});

// 图片上传事件
document.getElementById('image-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            document.getElementById('editor').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// 表单提交事件
document.getElementById('submit-form').addEventListener('submit', (event) => {
    event.preventDefault(); // 阻止表单默认提交行为

    // 获取表单数据
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('editor').innerHTML;

    // 创建一个包含文章内容的文本字符串
    const articleText = `
        文章标题: ${title}
        作者: ${author}
        分类: ${category}
        文章内容:
        ${content}
    `;

    // 创建一个 Blob 对象，包含文章内容
    const blob = new Blob([articleText], { type: 'text/plain' });

    // 创建一个 FormData 对象，用于发送文件
    const formData = new FormData();
    formData.append('file', blob, `${title}.txt`);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('content', content);

    // 发送表单数据到后端
    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('提交成功，等待审核。文章内容已打包为 .txt 文件并发送到 2263617544@qq.com 邮箱。');
            // 重置表单
            document.getElementById('submit-form').reset();
            document.getElementById('editor').innerHTML = '';
        } else {
            alert('提交失败，请稍后重试。');
        }
    })
    .catch(error => {
        console.error('提交文章时出错：', error);
        alert('提交失败，请稍后重试。');
    });
});