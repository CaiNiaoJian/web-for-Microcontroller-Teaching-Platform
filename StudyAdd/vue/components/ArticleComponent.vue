<template>
	<div>
		<h3>{{ data.title }}</h3>
		<img :src="data.image" alt="专栏图片" style="width: 100%; max-width: 500px;">
		<p>{{ data.description }}</p>
	</div>
</template>

<script>
	export default {
		props: ['data']
	}
</script>

<style scoped>
	h3 {
		color: #ff6f61;
	}

	img {
		border-radius: 8px;
	}

	p {
		font-size: 1.1em;
		line-height: 1.6;
	}
</style>