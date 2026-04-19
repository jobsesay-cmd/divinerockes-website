# Prisma Migration Strategy (Production)

## 1) Environment setup
- Configure `DATABASE_URL` in `.env` per environment (local, staging, production).
- Never commit credentials. Use secret managers in CI/CD.
- Install dependencies once per environment so Prisma CLI is available locally:
  ```bash
  npm ci
  ```

## 2) Local development workflow
1. Update `prisma/schema.prisma`.
2. Validate and format schema:
   ```bash
   npm run prisma:validate
   npm run prisma:format
   ```
3. Create a migration:
   ```bash
   npm run db:migrate:dev -- --name <descriptive_name>
   ```
4. Regenerate client:
   ```bash
   npm run prisma:generate
   ```
5. Seed baseline data:
   ```bash
   npm run db:seed
   ```

## 3) CI/CD deployment workflow
1. Install dependencies:
   ```bash
   npm ci
   ```
2. Run schema checks:
   ```bash
   npm run prisma:validate
   ```
3. Apply pre-generated migrations in deployment target:
   ```bash
   npm run db:migrate:deploy
   ```
4. Optionally run seed on first deploy only:
   ```bash
   npm run db:seed
   ```

## 4) Zero-downtime migration approach
- Prefer additive changes first (add nullable columns/tables/indexes).
- Deploy app version compatible with both old and new schema.
- Backfill data asynchronously for large tables.
- Enforce new constraints (NOT NULL, unique) in a later migration after backfill.

## 5) Rollback strategy
- Prisma migrations are forward-only by default. Prepare rollback as a new corrective migration.
- Keep database backups and point-in-time recovery enabled.

## 6) Index tuning guidance
- Start with indexes defined in schema.
- Review query plans (`EXPLAIN ANALYZE`) for admin list pages and filters.
- Add composite indexes through new migrations if production queries evolve.
