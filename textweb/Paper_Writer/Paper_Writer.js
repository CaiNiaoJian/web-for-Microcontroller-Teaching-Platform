document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const boldBtn = document.getElementById('bold-btn');
    const italicBtn = document.getElementById('italic-btn');
    const codeBtn = document.getElementById('code-btn');
    const latexBtn = document.getElementById('latex-btn');
    const publishBtn = document.getElementById('publish-btn');
    const loginBtn = document.getElementById('login-btn');
    const backBtn = document.getElementById('back-btn');

    // 加粗按钮
    boldBtn.addEventListener('click', () => {
        document.execCommand('bold', false, null);
    });

    // 斜体按钮
    italicBtn.addEventListener('click', () => {
        document.execCommand('italic', false, null);
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
});