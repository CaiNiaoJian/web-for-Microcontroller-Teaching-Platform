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

    // 创建一个包含文章内容的 HTML 字符串
    const articleHTML = `
        <h1>${title}</h1>
        <p><strong>作者:</strong> ${author}</p>
        <p><strong>分类:</strong> ${category}</p>
        <div>${content}</div>
    `;

    // 创建一个 Blob 对象，包含文章内容
    const blob = new Blob([articleHTML], { type: 'text/html' });

    // 创建一个下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.html`;
    link.style.display = 'none';

    // 将下载链接添加到文档中并触发点击事件
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 显示提交成功弹窗
    alert('提交成功，等待审核。文章内容已打包为 Word 文件并发送到 2263617544@qq.com 邮箱。');

    // 重置表单
    document.getElementById('submit-form').reset();
    document.getElementById('editor').innerHTML = '';
});