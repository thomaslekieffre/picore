import { json, error } from '@sveltejs/kit';
import { peekMagicLink } from '$lib/server/dev-magic-link';
import { dev } from '$app/environment';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	if (!dev) error(404);

	const email = url.searchParams.get('email');
	if (!email) error(400, 'email requis');

	return json({ url: peekMagicLink(email) });
};
