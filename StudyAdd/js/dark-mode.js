// dark-mode.js

// Function to toggle dark mode
function toggleDarkMode() {
	document.body.classList.toggle('dark-mode');
}

// Check if the user has a saved preference for dark mode
if (localStorage.getItem('dark-mode') === 'true') {
	document.body.classList.add('dark-mode');
}

// Add an event listener for dark mode toggle
document.querySelector('header').addEventListener('click', () => {
	toggleDarkMode();
	localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});