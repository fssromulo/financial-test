import router from "@/router/index";
let timer: any = null;
let interval: any = null;
const timeoutChart = 100000; // Each 10 minutes will do the request again

export default {
	async login(context: any, payload: any) {
		return context.dispatch("auth", {
			...payload,
			mode: "login",
		});
	},
	async signup(context: any, payload: any) {
		return context.dispatch("auth", {
			...payload,
			mode: "signup",
		});
	},
	async auth(context: any, payload: any) {
		const mode = payload.mode;
		let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoG9_oLjMpmAxVhlYRqnStbTpdWiMTS1A";

		if (mode === "signup") {
			url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoG9_oLjMpmAxVhlYRqnStbTpdWiMTS1A";
		}

		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				returnSecureToken: true,
				email: payload.email,
				password: payload.password,
			}),
		});

		const responseData = await response.json();
		if (!response.ok) {
			console.error("Failed to login!", responseData);
			const error = new Error(responseData.error.errors[0].message || "Failed to login!");
			throw error;
		}

		const expiresIn = +responseData.expiresIn * 1000;
		const expirationDate = new Date().getTime() + expiresIn;

		localStorage.setItem("token", responseData.idToken);
		localStorage.setItem("userId", responseData.localId);
		localStorage.setItem("tokenExpiration", expirationDate.toString());

		timer = setTimeout(() => {
			context.dispatch("autoLogout");
		}, expiresIn);

		interval = setInterval(() => {
			context.dispatch("searchFinancialData");
		}, timeoutChart);

		context.commit("setUser", {
			token: responseData.idToken,
			userId: responseData.localId,
		});
	},

	autoLogin(context: any) {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		const tokenExpiration = localStorage.getItem("tokenExpiration") || 0;

		const expiresIn = +tokenExpiration - new Date().getTime();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(() => {
			context.dispatch("autoLogout");
		}, expiresIn);

		if (token && userId) {
			context.commit("setUser", {
				token,
				userId,
			});
		}
	},
	autoLogout(context: any) {
		context.dispatch("logout");
		context.commit("setAutoLogout");
	},
	logout(context: any) {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		localStorage.removeItem("tokenExpiration");

		context.commit("setUser", {
			token: null,
			userId: null,
		});
		context.commit("setFinancialData", { cacheFinancial: [] });

		router.replace("/home");

		clearTimeout(timer);
		clearInterval(interval);
	},
};
