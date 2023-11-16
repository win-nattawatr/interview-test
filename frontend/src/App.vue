<template>
	<Nav />

	<div class="app-content__container">
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import Nav from "./components/Nav.vue";
</script>

<style scoped lang="css">
.app-content__container {
	width: 100%;
	height: 100%;
}
</style>
