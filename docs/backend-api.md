# Backend API Design

## Domain modules
- `auth` (session login/logout/me)
- `users` (CRUD + role assignment)
- `pages` (CRUD + draft/published/scheduled)
- `services` (CRUD)
- `projects` (CRUD + categories)
- `news` (CRUD)
- `inquiries` (contact + quotes lifecycle)
- `settings` (site settings)
- `analytics` (event tracking)
- `reports` (export jobs)

## Route map
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET|POST /api/users`
- `GET|POST /api/pages`
- `GET|POST /api/services`
- `GET|POST /api/projects`
- `GET|POST /api/news`
- `POST /api/inquiries`
- `POST|PATCH /api/inquiries/quotes`
- `POST /api/seo`
- `POST /api/settings`
- `POST /api/reports/export`
- `POST /api/analytics/events`

## Example payloads

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@divinerockes.com",
  "password": "StrongPassword123!"
}
```

### Create Page (scheduled)
```http
POST /api/pages
x-csrf-token: <csrf-token>
Content-Type: application/json

{
  "title": "About Divinerock",
  "slug": "about-divinerock",
  "content": "<p>Engineering content...</p>",
  "workflow": {
    "status": "SCHEDULED",
    "publishedAt": "2026-04-30T09:00:00.000Z"
  }
}
```

### Create Quote Request
```http
POST /api/inquiries/quotes
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "serviceType": "Structural design",
  "requirements": "Need a quote for warehouse reinforcement"
}
```

### Advance Quote Status
```http
PATCH /api/inquiries/quotes?id=<quote-id>
Content-Type: application/json

{
  "status": "REVIEWED"
}
```

## Security model
- Passwords hashed with bcrypt (12 rounds).
- Session cookie is HTTP-only and server validated.
- CSRF double-submit token for write endpoints.
- In-memory IP based rate limit on login.
- Zod validation on every endpoint.
- Cloudinary URL allowlist for media fields.
- Rich text sanitized on input.
- RBAC permission checks for all admin endpoints.
- Admin actions persisted to `AuditLog`.
