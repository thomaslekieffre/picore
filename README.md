# Picore

> Ce que tu picores, Pico le garde.

**Picore** est un gestionnaire de liens : tu enregistres ce que tu trouves sur le web, tu le ranges avec des tags, et Pico — la mascotte — le garde pour toi.

> 🚧 **Projet en cours de développement.** L'authentification et le modèle de données sont en place ; la gestion des liens arrive.

![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)

## État d'avancement

- [x] Application SvelteKit dans Docker
- [x] Base PostgreSQL + migrations Drizzle (utilisateurs, liens, tags)
- [x] Inscription et connexion par **lien magique** (Better Auth + Resend)
- [x] Onboarding et mascotte animée
- [ ] Ajout, recherche et organisation des liens
- [ ] Tags et filtres

## Stack

- **SvelteKit 2** + **Svelte 5** + TypeScript
- **Tailwind CSS v4**
- **PostgreSQL 17** + **Drizzle ORM**
- **Better Auth** (lien magique) + **Resend** pour les e-mails
- **Docker Compose** pour l'environnement de développement
- Vitest, ESLint, Prettier

## Lancer en local

```bash
git clone https://github.com/thomaslekieffre/picore.git
cd picore
cp .env.example .env   # puis renseigner les variables
docker compose up --build
```

L'application est servie sur [http://localhost:5173](http://localhost:5173), Adminer sur [http://localhost:8080](http://localhost:8080).

Sans Docker, avec une base Postgres accessible :

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

### Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Identifiants de la base |
| `DATABASE_URL` | URL de connexion Postgres |
| `BETTER_AUTH_SECRET` | Secret de signature des sessions |
| `BETTER_AUTH_URL` | URL publique de l'application |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi des liens magiques |
| `EMAIL_FROM` | Expéditeur des e-mails |

En développement, le dernier lien magique généré est aussi récupérable sans e-mail, via une route désactivée en production.

## Scripts

| Commande | Rôle |
| --- | --- |
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm check` | Vérification des types |
| `pnpm lint` / `pnpm format` | ESLint et Prettier |
| `pnpm test` | Tests unitaires (Vitest) |
| `pnpm db:generate` / `pnpm db:migrate` / `pnpm db:studio` | Migrations et studio Drizzle |

## Structure

```
src/
├── lib/
│   ├── assets/        # logos, icônes, illustrations de Pico
│   ├── components/    # composants d'authentification et mascotte
│   ├── server/        # base de données (Drizzle), e-mails
│   ├── auth.ts        # configuration Better Auth
│   └── auth-client.ts
└── routes/            # accueil, login, register, onboarding, API
drizzle/               # migrations SQL
```
