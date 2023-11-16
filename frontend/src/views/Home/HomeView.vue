<template>
	<div class="home-view__container">
		<h3>Neversitup Test</h3>
		<div class="list-group home-view__menus">
			<RouterLink class="list-group-item list-group-item-action" to="/permutations" active-class="active">
				Permutations
			</RouterLink>
			<RouterLink class="list-group-item list-group-item-action" to="/permutations" active-class="active">
				Find the odd int
			</RouterLink>
			<RouterLink class="list-group-item list-group-item-action" to="/permutations" active-class="active">
				Count the smiley faces!
			</RouterLink>
		</div>
	</div>
</template>
<style scoped lang="css">
.home-view__container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 1.5rem;
	gap: 1rem 0;
}

.home-view__menus {
	width: 100%;
	max-width: 992px;
}
</style>
