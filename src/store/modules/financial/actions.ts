export default {
	async searchFinancialData(context: any): Promise<any> {
		const response = await fetch("https://api.hgbrasil.com/finance?key=1d717806&format=json-cors");
		const responseData = await response.json();

		if (!response.ok) {
			return new Error(responseData.message || "Failed to fetch from HGBRASIL API !");
		}

		const cachedFinancialData = context.getters.getFinancialData ?? [];
		delete responseData.results.currencies.source;
		responseData.results.baseDate = new Date().toISOString();
		cachedFinancialData.push(responseData.results);

		context.commit("setFinancialData", { cacheFinancial: cachedFinancialData });
		return responseData;
	},
};
