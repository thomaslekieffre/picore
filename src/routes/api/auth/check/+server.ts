import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const email = url.searchParams.get('email')?.trim().toLowerCase();
	const username = url.searchParams.get('username')?.trim();

	if (!email && !username) error(400, 'email ou username requis');

	let emailTaken = false;
	let usernameTaken = false;

	if (email) {
		const found = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1);
		emailTaken = found.length > 0;
	}

	if (username) {
		const found = await db.select({ id: user.id }).from(user).where(eq(user.name, username)).limit(1);
		usernameTaken = found.length > 0;
	}

	return json({ emailTaken, usernameTaken });
};
