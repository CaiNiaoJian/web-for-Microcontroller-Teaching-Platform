// z_js/BeautyImage.js

document.addEventListener('DOMContentLoaded', () => {
	const beautyImageWall = document.querySelector('.beauty-image-wall');

	beautyImageWall.addEventListener('scroll', () => {
		const maxScrollLeft = beautyImageWall.scrollWidth - beautyImageWall.clientWidth;
		if (beautyImageWall.scrollLeft >= maxScrollLeft) {
			beautyImageWall.scrollTo({
				left: 0,
				behavior: 'smooth'
			});
		}
	});
});