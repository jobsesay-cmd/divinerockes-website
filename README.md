# divinerockes-website

Production-grade backend foundation for Divinerock Engineering Services website + admin dashboard.

## Tech stack
- Next.js route handlers (`src/app/api/**`)
- PostgreSQL + Prisma ORM (`prisma/schema.prisma`)
- Session authentication (secure cookies)
- RBAC and audit/activity logging
- Zod request validation + rich-text sanitization

## Backend architecture
Domain modules:
- `auth`
- `users`
- `pages`
- `services`
- `projects`
- `news`
- `inquiries`
- `settings`
- `analytics`
- `reports`

See `docs/backend-api.md` for route map and sample requests.

## Setup
1. Install dependencies:
   ```bash
   npm install