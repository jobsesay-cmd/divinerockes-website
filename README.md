# divinerockes-website

Prisma/PostgreSQL data layer for Divinerock Engineering Services CMS + Admin Dashboard.

## Setup

1. Copy environment template and configure PostgreSQL:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Validate the Prisma schema:
   ```bash
   npm run prisma:validate
   ```
4. Create and apply local migrations:
   ```bash
   npm run db:migrate:dev -- --name init
   ```
5. Seed baseline RBAC/settings data:
   ```bash
   npm run db:seed
   ```

## Notes on prior setup issues

- `prisma db seed` deprecation warning is resolved by running seed directly through `npm run db:seed`.
- If seed fails with "Authentication failed against database server", your `.env` `DATABASE_URL` credentials do not match your PostgreSQL user/password.
