// z_js/collegeBeaImagewall.js

document.addEventListener('DOMContentLoaded', () => {
	const collegeBeautyImageWall = document.querySelector('.college-beauty-image-wall');

	collegeBeautyImageWall.addEventListener('scroll', () => {
		const maxScrollLeft = collegeBeautyImageWall.scrollWidth - collegeBeautyImageWall.clientWidth;
		if (collegeBeautyImageWall.scrollLeft >= maxScrollLeft) {
			collegeBeautyImageWall.scrollTo({
				left: 0,
				behavior: 'smooth'
			});
		}
	});

	// 添加鼠标滚轮事件监听器
	collegeBeautyImageWall.addEventListener('wheel', (event) => {
		event.preventDefault();
		collegeBeautyImageWall.scrollLeft += event.deltaY;
	});
});