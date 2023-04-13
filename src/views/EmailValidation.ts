export function validateEmail(login: string): boolean {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login) ?? false;
}
