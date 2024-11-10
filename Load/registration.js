document.getElementById('register-btn').addEventListener('click', function() {
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirm-password').value;
	const captcha = document.getElementById('captcha').value;

	// 验证所有字段是否已填写
	if (!username || !email || !password || !confirmPassword || !captcha) {
		alert('请填写所有字段');
		return;
	}

	// 验证密码是否一致
	if (password !== confirmPassword) {
		alert('密码和确认密码不一致');
		return;
	}

	// 验证验证码
	const captchaCode = document.getElementById('captcha-image').innerText;
	if (captcha !== captchaCode) {
		alert('验证码错误');
		return;
	}

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