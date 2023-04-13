export default {
	userId(state: any) {
		return state.userId;
	},
	token(state: any) {
		return state.token;
	},
	isAuthenticated(state: any) {
		return !!state.token;
	},
};
