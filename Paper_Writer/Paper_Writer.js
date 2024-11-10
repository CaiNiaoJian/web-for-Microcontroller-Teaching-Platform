document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const boldBtn = document.getElementById('bold-btn');
    const italicBtn = document.getElementById('italic-btn');
    const underlineBtn = document.getElementById('underline-btn');
    const strikeBtn = document.getElementById('strike-btn');
    const h1Btn = document.getElementById('h1-btn');
    const h2Btn = document.getElementById('h2-btn');
    const h3Btn = document.getElementById('h3-btn');
    const quoteBtn = document.getElementById('quote-btn');
    const ulBtn = document.getElementById('ul-btn');
    const olBtn = document.getElementById('ol-btn');
    const codeBtn = document.getElementById('code-btn');
    const latexBtn = document.getElementById('latex-btn');
    const alignLeftBtn = document.getElementById('align-left-btn');
    const alignCenterBtn = document.getElementById('align-center-btn');
    const alignRightBtn = document.getElementById('align-right-btn');
    const alignJustifyBtn = document.getElementById('align-justify-btn');
    const fontSizeBtn = document.getElementById('font-size-btn');
    const fontColorBtn = document.getElementById('font-color-btn');
    const bgColorBtn = document.getElementById('bg-color-btn');
    const saveBtn = document.getElementById('save-btn');
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    const publishBtn = document.getElementById('publish-btn');
    const loginBtn = document.getElementById('login-btn');
    const backBtn = document.getElementById('back-btn');
    const helpBtn = document.getElementById('help-btn');

    // 实时预览
    editor.addEventListener('input', () => {
        preview.innerHTML = editor.innerHTML;
    });

    // 加粗按钮
    boldBtn.addEventListener('click', () => {
        document.execCommand('bold', false, null);
    });

    // 斜体按钮
    italicBtn.addEventListener('click', () => {
        document.execCommand('italic', false, null);
    });

    // 下划线按钮
    underlineBtn.addEventListener('click', () => {
        document.execCommand('underline', false, null);
    });

    // 删除线按钮
    strikeBtn.addEventListener('click', () => {
        document.execCommand('strikeThrough', false, null);
    });

    // 标题按钮
    h1Btn.addEventListener('click', () => {
        document.execCommand('formatBlock', false, '<h1>');
    });

    h2Btn.addEventListener('click', () => {
        document.execCommand('formatBlock', false, '<h2>');
    });

    h3Btn.addEventListener('click', () => {
        document.execCommand('formatBlock', false, '<h3>');
    });

    // 引用按钮
    quoteBtn.addEventListener('click', () => {
        document.execCommand('formatBlock', false, '<blockquote>');
    });

    // 无序列表按钮
    ulBtn.addEventListener('click', () => {
        document.execCommand('insertUnorderedList', false, null);
    });

    // 有序列表按钮
    olBtn.addEventListener('click', () => {
        document.execCommand('insertOrderedList', false, null);
    });

    // 插入代码按钮
    codeBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <textarea id="code-input" placeholder="请输入代码片段..."></textarea>
                <button id="insert-code-btn">插入代码</button>
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close');
        const insertCodeBtn = modal.querySelector('#insert-code-btn');
        const codeInput = modal.querySelector('#code-input');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        insertCodeBtn.addEventListener('click', () => {
            const code = codeInput.value;
            if (code) {
                document.execCommand('insertHTML', false, `<pre><code>${code}</code></pre>`);
            }
            modal.style.display = 'none';
        });

        modal.style.display = 'block';
    });

    // 插入LaTeX按钮
    latexBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <textarea id="latex-input" placeholder="请输入LaTeX公式..."></textarea>
                <button id="insert-latex-btn">插入LaTeX</button>
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close');
        const insertLatexBtn = modal.querySelector('#insert-latex-btn');
        const latexInput = modal.querySelector('#latex-input');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        insertLatexBtn.addEventListener('click', () => {
            const latex = latexInput.value;
            if (latex) {
                document.execCommand('insertHTML', false, `<span class="latex">${latex}</span>`);
            }
            modal.style.display = 'none';
        });

        modal.style.display = 'block';
    });

    // 对齐按钮
    alignLeftBtn.addEventListener('click', () => {
        document.execCommand('justifyLeft', false, null);
    });

    alignCenterBtn.addEventListener('click', () => {
        document.execCommand('justifyCenter', false, null);
    });

    alignRightBtn.addEventListener('click', () => {
        document.execCommand('justifyRight', false, null);
    });

    alignJustifyBtn.addEventListener('click', () => {
        document.execCommand('justifyFull', false, null);
    });

    // 字体大小按钮
    fontSizeBtn.addEventListener('click', () => {
        const size = prompt('请输入字体大小（1-7）：');
        if (size >= 1 && size <= 7) {
            document.execCommand('fontSize', false, size);
        }
    });

    // 字体颜色按钮
    fontColorBtn.addEventListener('click', () => {
        const color = prompt('请输入字体颜色（例如：#000000）：');
        if (color) {
            document.execCommand('foreColor', false, color);
        }
    });

    // 背景颜色按钮
    bgColorBtn.addEventListener('click', () => {
        const color = prompt('请输入背景颜色（例如：#ffffff）：');
        if (color) {
            document.execCommand('backColor', false, color);
        }
    });

    // 保存按钮
    saveBtn.addEventListener('click', () => {
        const content = editor.innerHTML;
        localStorage.setItem('savedContent', content);
        alert('内容已保存！');
    });

    // 撤销按钮
    undoBtn.addEventListener('click', () => {
        document.execCommand('undo', false, null);
    });

    // 重做按钮
    redoBtn.addEventListener('click', () => {
        document.execCommand('redo', false, null);
    });

    // 发布按钮
    publishBtn.addEventListener('click', () => {
        const content = editor.innerHTML;
        // 发送内容到后端进行发布
        fetch('/publish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('发布文章时出错：', error);
        });
    });

    // 管理员登录按钮
    loginBtn.addEventListener('click', () => {
        const username = prompt('请输入管理员账号：');
        const password = prompt('请输入管理员密码：');
        if (username && password) {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('管理员登录时出错：', error);
            });
        }
    });

    // 返回按钮
    backBtn.addEventListener('click', () => {
        window.location.href = '../blog.html';
    });

    // 帮助按钮
    helpBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>功能按键使用方法</h2>
                <ul>
                    <li><strong>加粗</strong>：Ctrl + B</li>
                    <li><strong>斜体</strong>：Ctrl + I</li>
                    <li><strong>下划线</strong>：Ctrl + U</li>
                    <li><strong>删除线</strong>：Ctrl + Shift + X</li>
                    <li><strong>标题1</strong>：Ctrl + 1</li>
                    <li><strong>标题2</strong>：Ctrl + 2</li>
                    <li><strong>标题3</strong>：Ctrl + 3</li>
                    <li><strong>引用</strong>：Ctrl + Q</li>
                    <li><strong>无序列表</strong>：Ctrl + Shift + 8</li>
                    <li><strong>有序列表</strong>：Ctrl + Shift + 7</li>
                    <li><strong>插入代码</strong>：Ctrl + Shift + C</li>
                    <li><strong>插入LaTeX</strong>：Ctrl + Shift + L</li>
                    <li><strong>左对齐</strong>：Ctrl + L</li>
                    <li><strong>居中</strong>：Ctrl + E</li>
                    <li><strong>右对齐</strong>：Ctrl + R</li>
                    <li><strong>两端对齐</strong>：Ctrl + J</li>
                    <li><strong>字体大小</strong>：Ctrl + Shift + S</li>
                    <li><strong>字体颜色</strong>：Ctrl + Shift + F</li>
                    <li><strong>背景颜色</strong>：Ctrl + Shift + B</li>
                    <li><strong>保存</strong>：Ctrl + S</li>
                    <li><strong>撤销</strong>：Ctrl + Z</li>
                    <li><strong>重做</strong>：Ctrl + Y</li>
                </ul>
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.style.display = 'block';
    });
});