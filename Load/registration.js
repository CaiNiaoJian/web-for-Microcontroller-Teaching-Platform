document.getElementById('register-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 将注册信息存储在 localStorage 中
    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(user));

    // 模拟注册成功
    alert('注册成功');
    window.location.href = 'ManagementLoading.html'; // 跳转到登录界面
});