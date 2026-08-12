# Ifham Mohamed Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fifham-mohamed%2Fportfolio)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Setup only takes a few minutes by editing the data files in [`./src/data`](./src/data)
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ifham-mohamed/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the data files in [`./src/data`](./src/data) (start with `personal.data.ts`) and make changes

# Deploy to Vercel

1. Push your code to GitHub.
2. Go to https://vercel.com/new and import your repository.
3. When asked for **Root Directory**:
   - If your repo has a top-level `portfolio/` folder, set Root Directory to `portfolio`.
   - If your Next.js app is at the repo root, leave it as `/`.
4. Framework preset: **Next.js** (auto-detected).
5. Build settings (defaults are fine):
   - Install: `pnpm install` (or `npm install` if you use npm)
   - Build: `pnpm build`
   - Output: `.next`
6. Click **Deploy**.

# Images

Everything under `public/images/` is referenced from `./src/data` but no files
are committed. Components fall back to a theme-aware monogram tile, so the site
renders correctly with none of them present.

To add one, drop the file in and uncomment the line directly above the empty
value in the matching data file:

| File to add | Referenced by |
| --- | --- |
| `public/images/profile/me.png` | `personal.data.ts` |
| `public/images/companies/app360.png`, `docq.png` | `experience.data.ts` |
| `public/images/education/uom.png` | `education.data.ts` |
| `public/images/activities/sef.png`, `hacktoberfest.png`, `microsoft.png`, `ieee.png` | `activities.data.ts` |
| `public/images/projects/<id>.png` | `src/data/projects/<id>.tsx` |

# Turbopack panic: "reading file … lucide-react/…"

If `pnpm dev` dies with `FATAL: An unexpected Turbopack error occurred` and the
panic names a file inside `node_modules`, that file is unreadable on disk — the
pnpm store hardlinks into a global content-addressable store, so one damaged
blob breaks every project that links it.

Confirm it, replacing the path with the one from the panic message:

```bash
node -e "require('fs').readFileSync(process.argv[1])" "<path from the panic>"
```

Repair by re-fetching rather than re-linking the same bad blob:

```bash
pnpm store prune
rm -rf node_modules
pnpm install --force
```

If it comes straight back, the blob in the global store is still bad — delete
the store itself and reinstall:

```bash
rm -rf "$(pnpm store path)"
pnpm install
```

Repeated corruption on the same drive is worth a `chkdsk` pass.

# Vercel 404: NOT_FOUND (How to fix)

This Vercel error usually means the URL doesn’t map to a deployment.

Checklist:

1. **Wrong URL**  
   Open the exact URL shown in the Vercel dashboard (Production URL).  
   Example: `https://your-project.vercel.app`

2. **Root Directory is wrong**  
   If your repo has a `portfolio/` subfolder, Vercel must use that as Root Directory.

3. **Custom domain not configured**  
   Add the domain in Vercel → Project → Settings → Domains.  
   Update DNS records as instructed and wait for propagation.

4. **Deployment failed**  
   Check Vercel → Project → Deployments. Fix build errors and redeploy.

5. **Wrong project/team**  
   Make sure you’re in the correct Vercel team and project.

If you still see `NOT_FOUND`, open the latest deployment, click **Redeploy**, and confirm the Production URL.

# License

Licensed under the [MIT license](https://github.com/ifham-mohamed/portfolio/blob/main/LICENSE.md).
