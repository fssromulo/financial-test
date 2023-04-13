import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
	state() {
		return {
			userId: null,
			tokenId: null,
			tokenExpiration: null,
		};
	},
	actions,
	getters,
	mutations,
};
