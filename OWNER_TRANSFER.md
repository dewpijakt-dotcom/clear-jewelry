# CLEAR JEWELRY — Owner Transfer Document

> This document is the complete handover for someone taking ownership of the
> Clear Jewelry website. Everything required to deploy, edit, and operate the
> site is here. Keep this file in the repo. If anything changes (URLs, IDs,
> passwords), update the relevant section.

Last verified: **June 2026**.

---

## 1.  At a glance

| Asset | Where | Owner needs |
| --- | --- | --- |
| Source code | GitHub: `kirbykung168-art/clear-jewelry` | Read access at minimum; admin if you want to push directly |
| Live site | Vercel: `clear-jewelry.vercel.app` | New Vercel account, connected to the GitHub repo |
| Content (text + images) | Sanity: project `clear-jewelry` (`2dkw5oqu`) | Sanity account invited to the project |
| Studio (admin editor) | `clear-jewelry.vercel.app/studio` | Sanity login (same account) |
| Image CDN | `cdn.sanity.io/images/2dkw5oqu/...` | Managed automatically by Sanity |
| Domain (custom) | Not yet set — currently `.vercel.app` subdomain | Optional: buy a domain and point DNS at Vercel |

---

## 2.  Move the site to a new Vercel account

The site does not "live" in any one Vercel account — Vercel is just a builder
that pulls from GitHub. To transfer:

### 2.1  In the new Vercel account

1. Sign up at **https://vercel.com** with the new owner's email.
2. Connect GitHub:  Vercel → **Add New… → Project** → click **Continue with GitHub** → authorise → pick `kirbykung168-art/clear-jewelry` (or a fork — see §2.3).
3. Framework preset is auto-detected: **Next.js**. Leave all build settings at defaults.
   - Build command: `next build`
   - Output: `.next`
   - Root directory: leave blank
   - Node version: 20.x (default)
4. **Environment Variables** — add these two before clicking Deploy:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=2dkw5oqu
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
   Apply to all three environments (Production, Preview, Development).
5. Click **Deploy**. First build takes ~2–3 minutes.
6. Once green, the site is at `https://<new-vercel-project-name>.vercel.app`.

### 2.2  Decommission the old Vercel project (optional)

After the new project is verified live:
- Old Vercel account → Settings → Project Settings → **Delete Project**
- The custom domain (if any) needs to be removed from old project before the new one can claim it.

### 2.3  If you fork the GitHub repo instead of using the original

If you want the new owner to control the GitHub repo too (recommended):
1. On GitHub, the original owner clicks **Settings → Transfer ownership** and enters the new owner's username/org. Or:
2. New owner clicks **Fork** on the original repo → connect Vercel to the fork → behaves identically.

### 2.4  Token to keep secret

No long-lived secrets are required on Vercel for the live site to render content.
The public Sanity client is unauthenticated. **Do not** put `SANITY_API_TOKEN` on
Vercel unless you set up a webhook or write-back feature later.

---

## 3.  Sanity (content + image hosting)

### 3.1  Project facts

| Item | Value |
| --- | --- |
| Project name | `clear-jewelry` |
| Project ID | `2dkw5oqu` |
| Dataset | `production` |
| Studio URL (embedded) | `https://clear-jewelry.vercel.app/studio` (changes with new Vercel domain) |
| Sanity manage URL | `https://www.sanity.io/manage/personal/project/2dkw5oqu` |
| Default editor email | `kirbykung168@gmail.com` |

### 3.2  Transfer Sanity to a new owner

1. Current owner opens https://www.sanity.io/manage/personal/project/2dkw5oqu/members
2. **Invite** the new owner's email as a member with role **Administrator**.
3. New owner accepts the invite from email.
4. Current owner re-opens members panel and **changes own role to Editor** (or removes self).
5. Project ID stays the same — no code changes required.

If the new owner wants a **brand new Sanity project** instead of inheriting:
1. They create a fresh project at https://www.sanity.io/manage → note the new project ID.
2. Update `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel env vars to the new ID.
3. Re-run the migration script (§5) pointed at the new project to copy all 26 pieces + 8 categories + 6 singletons over.
4. Update `next.config.mjs` hostname pattern to the new project ID: `/images/<NEW-ID>/**`.
5. Update `sanity.config.ts` and `sanity.cli.ts` projectId values.

### 3.3  CORS origins (required for embedded Studio)

Every domain that hosts the embedded Studio must be added to Sanity's CORS list:
1. https://www.sanity.io/manage/personal/project/2dkw5oqu/api
2. **CORS Origins** → **Add CORS origin**
3. Origin URL: the new Vercel deployment URL (e.g. `https://clear-jewelry-newaccount.vercel.app`)
4. Toggle **Allow credentials** ON
5. Save

Add `https://*.vercel.app` if you want previews to access Studio.

### 3.4  API tokens

Tokens live at https://www.sanity.io/manage/personal/project/2dkw5oqu/api/tokens.
You may have one **Editor / Deploy Studio** token for content migrations and
Studio deploy. Tokens **never** belong in the GitHub repo. If a token leaks,
revoke it at the same URL.

---

## 4.  GitHub repository

| Item | Value |
| --- | --- |
| Repo | https://github.com/kirbykung168-art/clear-jewelry |
| Branch | `main` (auto-deploys to Vercel) |
| Open issues / PRs | https://github.com/kirbykung168-art/clear-jewelry/issues |

### 4.1  Folder structure (what lives where)

```
clear-jewelry/
├── README.md                 — project overview
├── OWNER_GUIDE.md            — how to edit content in Sanity Studio
├── OWNER_TRANSFER.md         — this document
├── CLAUDE.md                 — brand brief
├── package.json              — Next + Sanity dependencies
├── next.config.mjs           — image CDN whitelist
├── sanity.config.ts          — Sanity Studio config + schemas list
├── sanity.cli.ts             — Studio deploy config
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── hero/hero-main.jpg           — fallback hero image
│       └── gallery/*.jpg                — fallback gallery images
└── src/
    ├── app/                  — Next.js pages (routes)
    │   ├── page.tsx          — Home (`/`)
    │   ├── layout.tsx        — site shell (Header, Footer, fonts)
    │   ├── globals.css
    │   ├── gallery/page.tsx  — Gallery (`/gallery`)
    │   ├── about/page.tsx    — About (`/about`)
    │   ├── info/page.tsx     — Information (`/info`)
    │   ├── contact/page.tsx  — Contact (`/contact`)
    │   ├── book/page.tsx     — Book (`/book` → LINE)
    │   └── studio/           — Embedded Sanity Studio (`/studio`)
    ├── components/           — React components (Header, Footer, GalleryClient, …)
    ├── lib/
    │   ├── brand.ts                  — fallback brand facts (used if Sanity is offline)
    │   ├── gallery-manifest.ts       — fallback gallery (used if Sanity is offline)
    │   ├── sanity.ts                 — Sanity client + image URL builder
    │   ├── sanityQueries.ts          — GROQ query strings
    │   └── sanityAdapter.ts          — Sanity-first / manifest-fallback bridge
    └── sanity/
        └── schemas/          — Sanity document types (galleryPiece, category, homepage, …)
```

### 4.2  Branch / push policy

Anyone with **write** access can push directly to `main` → triggers an automatic
Vercel build in ~45 seconds. For team workflows, protect `main` and require PRs:
- GitHub → Settings → Branches → Add branch protection rule for `main`
  - Require pull request review before merging.

---

## 5.  Migration script (for fresh Sanity project setup)

If you ever migrate to a new Sanity project, the canonical migration script is:

- **Source:** `https://github.com/kirbykung168-art/clear-jewelry/tree/main/sanity-work` (note: this folder may not be committed; check `OWNER_TRANSFER` for the full migration script body)
- **What it does:** Uploads 8 categories → 26 gallery pieces (with their images) → 6 singleton documents (Site settings, Homepage, Homepage featured, About, Info, Contact).
- **How to run:**
  ```bash
  # Editor-level token from https://www.sanity.io/manage/.../api/tokens
  export SANITY_TOKEN="sk..."

  # Install client (one-time)
  npm install @sanity/client

  # Run
  node sanity-work/migrate.js
  ```

The script is idempotent — running it twice is safe.

---

## 6.  Custom domain (optional)

Currently the site is at `clear-jewelry.vercel.app` (free Vercel subdomain).
To use `clearjewelry.com` or similar:

1. **Buy the domain** at a registrar (Cloudflare, Namecheap, Google Domains).
2. In Vercel: Project → Settings → Domains → **Add Domain** → type your domain.
3. Vercel shows you DNS records to add (an `A` record + `CNAME`).
4. At the registrar, add those records. Propagation takes 5 min – 24 hr.
5. Once Vercel verifies, the domain is live, SSL auto-issued via Let's Encrypt.
6. Add the new domain to Sanity CORS (§3.3) so Studio works there too.

---

## 7.  Routine maintenance

| Task | Frequency | How |
| --- | --- | --- |
| Update gallery imagery | Anytime | Sanity Studio (see OWNER_GUIDE.md) |
| Update brand text / contact info | Anytime | Sanity Studio → **Site settings** |
| Bump dependencies (security) | Quarterly | `npm outdated` locally, PR the updates, Vercel re-deploys |
| Rotate Sanity tokens | Yearly or on suspicion of leak | Sanity Manage → API → Tokens → Revoke + Add new |
| Renew custom-domain SSL | Automatic (Vercel handles via Let's Encrypt) | Nothing |
| Back up Sanity content | Monthly | `npx sanity@latest dataset export production backup.tar.gz` |

---

## 8.  Vercel webhook for instant content updates

The site is set to ISR (Incremental Static Regeneration) with a 60-second
revalidate window. To make Sanity publishes trigger an immediate rebuild:

1. Vercel project → Settings → Git → **Deploy Hooks** → Create Hook
   - Name: `sanity-publish`
   - Branch: `main`
   - Copy the hook URL.
2. Sanity manage → Project `2dkw5oqu` → **API** → **Webhooks** → Create new webhook
   - Name: `vercel-deploy`
   - URL: paste the Vercel deploy hook URL
   - Dataset: `production`
   - Trigger on: `Create / Update / Delete` for all document types
   - HTTP method: `POST`
3. Save. From now on, every Sanity publish triggers a Vercel rebuild within
   ~30 seconds (faster than the ISR window).

---

## 9.  Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Site shows white screen | Build failed on Vercel | Vercel project → Deployments → click failed deploy → see logs |
| Gallery is empty | Sanity unreachable + no fallback manifest | Check Sanity status at https://www.sanity.io/status |
| Studio at `/studio` shows spinner forever | CORS origin missing | §3.3 |
| Images don't load on next/image | Sanity CDN host not in `next.config.mjs` `remotePatterns` | Edit `next.config.mjs` and add the host |
| Owner edits not appearing | ISR cache hasn't expired | Wait 60s and hard-refresh; or set up webhook (§8) |
| 404 on `/studio` | StudioRoot route not deployed | Check `src/app/studio/page.tsx` exists in repo |

---

## 10.  Contact + credits

| Person | Role | Contact |
| --- | --- | --- |
| Kirby | Current owner / developer | kirbykung168@gmail.com |
| Atelier | Brand HQ | Gaysorn Centre, 3rd Floor, Bangkok · LINE @clearjewelry |

If you take over operations, replace this section with your own contact.

---

## 11.  Quick command reference

```bash
# Run the site locally (port 3000)
git clone https://github.com/<owner>/clear-jewelry.git
cd clear-jewelry
npm install
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=2dkw5oqu"   > .env.local
echo "NEXT_PUBLIC_SANITY_DATASET=production"   >> .env.local
npm run dev

# Open in browser
open http://localhost:3000          # site
open http://localhost:3000/studio   # Studio

# Deploy Studio to a Sanity-hosted subdomain (optional, embedded works fine)
export SANITY_AUTH_TOKEN="sk..."    # from Sanity Manage
npx sanity@latest deploy
# Choose hostname like "clear-jewelry"; resulting URL: https://clear-jewelry.sanity.studio
```

That's the entire transfer. Anyone receiving this document, the repo URL,
and access to the Sanity + Vercel + GitHub accounts can operate the site
end-to-end.
