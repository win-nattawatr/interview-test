<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#mainNavbar"
				aria-controls="mainNavbar"
				aria-expanded="false"
				aria-label="Toggle navbar"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="mainNavbar">
				<RouterLink class="navbar-brand" to="/">Neversitup Test</RouterLink>
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<RouterLink class="nav-link" to="/permutations" active-class="active">Permutations</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink class="nav-link" to="/findTheOddInt" active-class="active">
							Find the odd int
						</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink class="nav-link" to="/countTheSmileyFaces" active-class="active">
							Count the smiley faces!
						</RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
