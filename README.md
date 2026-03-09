# Botpress Competitive Intelligence Dashboard

Internal competitive analysis dashboard for the AI Customer Service market. Password-protected for team-only access.

## Quick Deploy to Vercel

### Option A: One-click (fastest)

1. Push this repo to GitHub:
   ```bash
   cd botpress-competitive-intel
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create botpress-competitive-intel --private --push
   ```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Import the `botpress-competitive-intel` repo

4. Add the environment variable:
   - Key: `NEXT_PUBLIC_SITE_PASSWORD`
   - Value: *(your team password)*

5. Click **Deploy** — done!

### Option B: Vercel CLI

```bash
npm i -g vercel
cd botpress-competitive-intel
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_SITE_PASSWORD
# Enter your password when prompted

# Deploy to production
vercel --prod
```

## Local Development

```bash
npm install
cp .env.example .env.local   # Edit the password
npm run dev                    # → http://localhost:3000
```

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_PASSWORD` | Password to access the dashboard | `botpress2026` |

### Changing the password

1. In Vercel dashboard → Settings → Environment Variables
2. Update `NEXT_PUBLIC_SITE_PASSWORD`
3. Redeploy (Vercel → Deployments → Redeploy)

## Security Note

This uses a simple client-side password gate (via `NEXT_PUBLIC_` env var). It's sufficient for internal team access but **not for sensitive data**. The password is embedded in the JS bundle. For stronger protection, consider:
- Vercel's built-in [Password Protection](https://vercel.com/docs/security/deployment-protection) (Pro plan)
- Adding server-side auth with NextAuth.js

## Stack

- Next.js 14 (App Router)
- Recharts for data visualization
- Tailwind CSS
- Deployed on Vercel
