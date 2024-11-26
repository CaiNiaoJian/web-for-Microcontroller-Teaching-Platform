<template>
	<button @click="toggleMode">切换模式</button>
</template>

<script>
	export default {
		methods: {
			toggleMode() {
				this.$emit('toggle-mode');
			}
		}
	}
</script>

<style scoped>
	button {
		background-color: #ff6f61;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #e05f51;
	}
</style>