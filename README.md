# 🏠 Personal HomePage

A beautiful glassmorphism-style personal homepage with admin panel, built with React + TypeScript.

## Features

- 🎨 Modern glassmorphism UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚙️ Admin panel at `/admin` to configure everything
- 📊 GitHub contribution chart integration
- 🌐 Cloudflare Pages + KV storage (free tier)
- 🔐 Password-protected admin API

## Deploy to Cloudflare Pages

### 1. Create KV Namespace
```bash
npx wrangler kv:namespace create CONFIG
```

### 2. Set Environment Variables in Cloudflare Dashboard
- `ADMIN_PASSWORD` — your admin password
- KV binding: `KV` → your namespace ID

### 3. Deploy
Connect this GitHub repo to Cloudflare Pages:
- Build command: `npm run build`
- Build output directory: `dist`
- Add KV namespace binding in Settings → Functions

## Development
```bash
npm install
npm run dev
```

## Stack
- React 19 + TypeScript
- Tailwind CSS 3
- Vite
- Cloudflare Pages Functions
- Cloudflare KV
