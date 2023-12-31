import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	sensitive: true,
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "landing",
			component: () => import("../views/Home/HomeView.vue"),
		},
		{
			path: "/permutations",
			name: "permutations",
			component: () => import("../views/Permutations/PermutationsView.vue"),
		},
		{
			path: "/findTheOddInt",
			name: "findTheOddInt",
			component: () => import("../views/FindTheOddInt/FindTheOddIntView.vue"),
		},
		{
			path: "/countTheSmileyFaces",
			name: "countTheSmileyFaces",
			component: () => import("../views/CountTheSmileyFaces/CountTheSmileyFacesView.vue"),
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: "/",
		},
	],
});

export default router;
