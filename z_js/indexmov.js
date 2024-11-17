// z_js/indexmov.js

document.addEventListener('DOMContentLoaded', () => {
	const navbar = document.querySelector('.navbar');
	const footer = document.querySelector('.footer');
	const menuToggle = document.querySelector('.menu-toggle');
	const navLinks = document.querySelector('.nav-links');
	const welcomeSection = document.querySelector('.welcome');
	const developerImages = document.querySelectorAll('.image-wall img');

	let lastScrollTop = 0;

	window.addEventListener('scroll', () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollTop > lastScrollTop) {
			// Scrolling down
			navbar.style.transform = 'translateY(-100%)';
			footer.style.transform = 'translateY(100%)';
		} else {
			// Scrolling up
			navbar.style.transform = 'translateY(0)';
			footer.style.transform = 'translateY(0)';
		}

		lastScrollTop = scrollTop;

		// 检查欢迎部分是否在视口中
		const welcomeSectionTop = welcomeSection.getBoundingClientRect().top;
		if (welcomeSectionTop < window.innerHeight && welcomeSectionTop > 0) {
			welcomeSection.classList.add('show');
		}

		// 检查开发者图片是否在视口中
		developerImages.forEach(image => {
			const imageTop = image.getBoundingClientRect().top;
			if (imageTop < window.innerHeight && imageTop > 0) {
				image.classList.add('show');
			}
		});
	});

	menuToggle.addEventListener('click', () => {
		navLinks.classList.toggle('active');
	});
});