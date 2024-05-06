# README

- Currently not working with pnpm version > 9

- Email service quota is low, could go to redis to view what key to verify email

- Config is stored in .env.local and .env in apps/(backend|frontend)

  - MAIL\_\* env could be revoked
  - You could use the default MAIL\_\* env (if not revoked) or generate yourself (easy and recommended)

- Start apps
  - pnpm install
  - docker compose up -d
  - pnpm nx serve backend
  - pnpm nx serve frontend
