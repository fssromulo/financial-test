import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import financialModule from "./modules/financial/index.js";

const store = createStore({
	modules: {
		auth: authModule,
		financial: financialModule,
	},
});

export default store;
