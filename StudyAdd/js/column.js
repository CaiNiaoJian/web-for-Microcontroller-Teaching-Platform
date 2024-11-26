new Vue({
	el: '#app',
	data: {
		computerData: {
			title: '计算机',
			description: '计算机技术的前沿动态和深入解析。',
			image: 'Columnimages/computer.jpg'
		},
		mechanicalData: {
			title: '机械',
			description: '机械工程的最新发展和应用案例。',
			image: 'Columnimages/mechanical.jpg'
		},
		electricalData: {
			title: '电器',
			description: '电器设备的创新技术和市场趋势。',
			image: 'Columnimages/electrical.jpg'
		}
	},
	methods: {
		autoToggleMode() {
			const now = new Date();
			const hour = now.getHours();
			if (hour >= 18 || hour < 6) {
				this.loadStyle('css/dark-mode.css');
			} else {
				this.loadStyle('css/modern-style.css');
			}
		},
		toggleMode() {
			const themeLink = document.getElementById('theme-link');
			if (themeLink.getAttribute('href') === 'css/modern-style.css') {
				this.loadStyle('css/dark-mode.css');
			} else {
				this.loadStyle('css/modern-style.css');
			}
		},
		loadStyle(href) {
			const themeLink = document.getElementById('theme-link');
			if (!themeLink) {
				const link = document.createElement('link');
				link.id = 'theme-link';
				link.rel = 'stylesheet';
				link.href = href;
				document.head.appendChild(link);
			} else {
				themeLink.href = href;
			}
		}
	},
	mounted() {
		this.autoToggleMode();
	},
	components: {
		ArticleComponent: {
			props: ['data'],
			template: `
                <div>
                    <h3>{{ data.title }}</h3>
                    <img :src="data.image" alt="专栏图片" style="width: 100%; max-width: 500px;">
                    <p>{{ data.description }}</p>
                </div>
            `
		},
		ToggleModeComponent: {
			template: `
                <button @click="toggleMode">切换模式</button>
            `,
			methods: {
				toggleMode() {
					this.$emit('toggle-mode');
				}
			}
		}
	}
});