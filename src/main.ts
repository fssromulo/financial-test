import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import "./assets/main.css";

// Vuetify - Begin
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
	components,
	directives,
});
// Vuetify - END

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");
