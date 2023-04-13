import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/discovery",
			name: "discoveryview",
			component: () => import("../views/DiscoveryView.vue"),
			meta: { requireAuth: true },
		},
		{
			path: "/discovery/:type/:item",
			props: true,
			component: () => import("../views/ItemDetails.vue"),
		},
		{
			path: "/signup",
			name: "signupview",
			component: () => import("../views/SignupView.vue"),
			meta: { requireAuth: false },
		},
		{
			path: "/auth",
			name: "auth",
			component: () => import("../views/HomeView.vue"),
			meta: { requireAuth: false },
		},
		{ path: "/:notFound(.*)", component: () => import("../views/HomeView.vue") },
	],
});

router.beforeEach((to, _, next) => {
	const hasToken = localStorage.getItem("token") ?? "";
	if (to.name !== "auth" && hasToken.length === 0 && to.meta.requireAuth === true) {
		next("/auth");
	} else {
		next();
	}
});

export default router;
