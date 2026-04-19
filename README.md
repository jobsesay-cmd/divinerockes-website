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

## Notes on testing failure from previous PR

The earlier `npx prisma validate` failure was caused by fetching Prisma directly from npm in a restricted environment. This repository now includes Prisma as an explicit dependency and npm scripts so validation uses the local binary after installation (`npm run prisma:validate`), which avoids ad-hoc network fetch behavior.
