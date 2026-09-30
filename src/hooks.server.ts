import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	event.locals.session = null;

	try {
		const session = await auth.api.getSession({ headers: event.request.headers });
		if (session) {
			event.locals.session = session.session;
			event.locals.user = session.user;
		}
	} catch (err) {
		console.error('[auth] getSession failed', err);
	}

	return svelteKitHandler({ event, resolve, auth, building });
};
