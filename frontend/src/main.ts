import { createApp } from "vue";
import "./assets/_base.css";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const initialize = async () => {
	const app = createApp(App);

	app.use(router);
	await router.isReady();

	app.mount("#app");
};

initialize();
