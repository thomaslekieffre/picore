const lastByEmail = new Map<string, string>();

export function rememberMagicLink(email: string, url: string) {
	lastByEmail.set(email.toLowerCase(), url);
}

export function peekMagicLink(email: string) {
	return lastByEmail.get(email.toLowerCase()) ?? null;
}
