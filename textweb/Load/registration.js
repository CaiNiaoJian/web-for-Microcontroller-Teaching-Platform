// registration.js

document.getElementById('register-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 模拟注册
    if (username && email && password) {
        alert('注册成功');
        // 这里可以添加将用户信息插入数据库的代码
    } else {
        alert('请填写所有字段');
    }
});