import { createAuthClient } from 'better-auth/svelte';

// Évite `better-auth/client/plugins` (barrel → Vite SSR freeze sur captcha etc.)
const magicLinkClient = () =>
	({
		id: 'magic-link',
		$InferServerPlugin: {} as const
	}) as const;

export const authClient = createAuthClient({
	plugins: [magicLinkClient()]
});
