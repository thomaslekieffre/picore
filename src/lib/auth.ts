import { betterAuth } from 'better-auth';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins/magic-link';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { db } from './server/db/index';
import * as schema from './server/db/schema';
import { sendMagicLinkEmail } from './server/mail';

const USERNAME_RE = /^[a-zA-Z0-9._-]{1,21}$/;

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	secret: process.env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema
	}),
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					if (!user.name || !USERNAME_RE.test(user.name)) {
						throw new APIError('BAD_REQUEST', {
							message: 'Nom d’utilisateur requis (1–21 car.)'
						});
					}
					return { data: user };
				}
			}
		}
	},
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			if (ctx.path !== '/sign-in/magic-link') return;

			const email = (ctx.body as { email?: string } | undefined)?.email;
			const name = (ctx.body as { name?: string } | undefined)?.name?.trim();
			if (!email) return;

			const existing = await ctx.context.internalAdapter.findUserByEmail(email);
			if (existing?.user) return;

			// signup : username obligatoire (passé via `name`)
			if (!name || !USERNAME_RE.test(name)) {
				throw new APIError('BAD_REQUEST', {
					message: 'Crée un compte avec un nom d’utilisateur'
				});
			}
		})
	},
	plugins: [
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				await sendMagicLinkEmail({ email, url });
			}
		}),
		sveltekitCookies(getRequestEvent)
	]
});
