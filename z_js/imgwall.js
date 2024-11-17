// imgwall.js

document.addEventListener('DOMContentLoaded', () => {
	const imageWalls = document.querySelectorAll('.image-wall');

	imageWalls.forEach(wall => {
		wall.addEventListener('scroll', () => {
			const maxScrollLeft = wall.scrollWidth - wall.clientWidth;
			if (wall.scrollLeft >= maxScrollLeft) {
				wall.scrollTo({
					left: 0,
					behavior: 'smooth'
				});
			}
		});
	});
});