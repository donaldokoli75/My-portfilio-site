# Donald Okoli — Personal Portfolio

A long-term, self-editable portfolio site for Donald Okoli, Digital Marketing & Content Strategist. Built on the same stack pattern as High Class Gas: a static Astro frontend, a Supabase database as the content source, and a custom "Studio" admin panel for editing — no code edits required for day-to-day updates.

---

## A. Project structure

```
donald-okoli-portfolio/
├── public/
│   ├── studio/            Custom admin panel (index.html + app.js + config.js)
│   ├── favicon.svg
│   ├── og-default.svg     Default social-share image (placeholder — swap anytime via Settings)
│   └── robots.txt
├── src/
│   ├── components/        Header, Footer, StatBlock, ProjectCard, CaseStudyCard
│   ├── lib/supabase.js    Read-only Supabase client used at build time
│   ├── layouts/Base.astro SEO/meta shell used by every page
│   ├── pages/
│   │   ├── index.astro       Home
│   │   ├── about.astro
│   │   ├── work/index.astro  Case studies list
│   │   ├── work/[slug].astro Case study detail (one static page per row in case_studies)
│   │   ├── projects.astro
│   │   ├── experience.astro
│   │   ├── contact.astro
│   │   └── writing.astro     Links out to Clippings.me
│   └── styles/global.css     Design tokens + base styles
├── supabase/
│   ├── schema.sql          Run once in Supabase to create all tables + security rules
│   └── seed.sql             Run once after schema.sql to pre-fill your real CV content
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## B. Technology stack and rationale

- **Astro** — static-site generator, ships almost no JavaScript by default, excellent Core Web Vitals. Pages fetch from Supabase once, at build time, and the result is plain static HTML.
- **Supabase** — Postgres database + Auth + Storage, all free at this scale. You're already using it for High Class Gas, so this reuses infrastructure and a workflow you know.
- **Studio (`/studio`)** — a plain HTML/JS admin page, same pattern as your High Class Gas admin panel. Talks to Supabase directly from the browser (no server to run or maintain).
- **Netlify** — free hosting, and a build hook that Studio calls after every save so the live site rebuilds automatically.

## C. Content architecture

Browser (`/studio`, logged in) → writes directly to Supabase → Supabase Database → Netlify build hook fires → Astro rebuilds, reading fresh data from Supabase → static site redeploys.

| Studio section | Supabase table | Notes |
|---|---|---|
| Site Settings | `settings` (single row, id=1) | name, title, tagline, bio, contact info, CV file, social links, availability toggle |
| Skills | `skill_categories` | one row per category, skills stored as a text array |
| Selected Results | `results` | the homepage stat blocks |
| Experience | `experience` | one row per role |
| Case Studies | `case_studies` | one row per case study, auto-builds `/work/[slug]` |
| Projects | `projects` | tagged "Built From Scratch" or "Digital Experience" |
| Testimonials | `testimonials` | ready in the schema and Studio, not yet surfaced on any page — see section M |

The public site only ever reads rows where `published = true` (case studies, projects, testimonials) — Row Level Security enforces this at the database level, not just in the frontend code.

## D. Supabase setup

1. Create a project at [supabase.com](https://supabase.com) if you don't already have one for this site (you can reuse your existing organization, but use a **separate project** from High Class Gas — different app, different data).
2. Go to **SQL Editor**, paste in the full contents of `supabase/schema.sql`, and run it. This creates every table, locks down write access to authenticated users only, and sets up a public storage bucket called `portfolio-media`.
3. Then run `supabase/seed.sql` the same way. This pre-fills the database with the exact same content already verified against your CV — nothing invented.
4. Go to **Authentication → Users → Add user**, create yourself an account (your email + a password). This is the only login Studio will accept — **do not enable public sign-up**.
5. Go to **Project Settings → API**. Copy the **Project URL** and the **anon public key** — you'll need both twice (Studio config and Netlify environment variables).

## E. GitHub setup instructions

1. Create a new empty repository on GitHub (e.g. `donald-okoli-portfolio`).
2. In this project folder:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/donald-okoli-portfolio.git
   git push -u origin main
   ```

## F. Netlify deployment instructions

1. Log into [Netlify](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Connect GitHub, select the repository.
3. Build settings are already defined in `netlify.toml` (build command `npm run build`, publish directory `dist`).
4. **Before the first deploy succeeds**, add the environment variables in section G — the build will fail without them, since every page needs to read from Supabase.
5. Deploy. Your site goes live on a generated `*.netlify.app` subdomain.
6. **Enable the contact form:** Netlify auto-detects the form in `contact.astro` on the first deploy. Submissions appear under **Forms** in your Netlify dashboard.
7. **Create a build hook:** Netlify → Site configuration → Build & deploy → Build hooks → Add build hook, name it "Studio publish", save it. Copy the URL — you'll paste it into `public/studio/config.js` in section H.

## G. Environment variables

Set these in Netlify → Site configuration → Environment variables:

| Variable | Value | Purpose |
|---|---|---|
| `PUBLIC_SUPABASE_URL` | Your Supabase Project URL | Lets the site fetch content at build time |
| `PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon public key | Same — this key is read-only from the public site's perspective, enforced by Row Level Security |
| `PUBLIC_SITE_URL` | Your Netlify URL, e.g. `https://your-site.netlify.app` | Used in SEO tags and the sitemap; update once you attach a custom domain |

No other secrets are required. The anon key is meant to be public — it cannot write anything without a logged-in Supabase Auth session.

## H. How to access Studio

1. Open `public/studio/config.js` in the repo and fill in:
   - `SUPABASE_URL` — your Project URL
   - `SUPABASE_ANON_KEY` — your anon public key
   - `NETLIFY_BUILD_HOOK_URL` — the build hook URL from section F, step 7
2. Commit and push that change.
3. Visit `https://<your-site>.netlify.app/studio/`, log in with the email + password you created in section D, step 4.
4. Every save writes straight to Supabase and then triggers a rebuild automatically — the live site updates in about two minutes.

**Keep this URL to yourself.** It isn't linked from anywhere on the public site and is excluded from search indexing, but it isn't secret in the sense of being hidden — the real protection is that Supabase rejects any write that isn't from your logged-in account.

## I. How to add/edit a project

1. Go to `/studio/`, log in.
2. Click **Case Studies** (client work) or **Projects** (Brandora/ThePharmaDon-style ventures) in the sidebar.
3. Click **+ Add new**, or **Edit** on an existing entry.
4. Fill in only what's true — leave fields blank rather than guessing.
5. Toggle **Published** on and **Featured on homepage** on if you want it live and on the homepage.
6. Click **Save**. The site rebuilds automatically; refresh the live site in ~2 minutes to see it.

## J. How to replace the CV

Go to `/studio/` → **Site Settings** → **CV File** → choose your PDF. It uploads to Supabase Storage and every "Download CV" button across the site updates automatically after the next rebuild. **You still need to upload the actual CV** — nothing is preloaded there yet.

## K. How to connect a custom domain

1. Netlify → **Domain management → Add a domain**, enter e.g. `donaldokoli.com`.
2. Follow Netlify's DNS instructions.
3. Netlify provisions a free HTTPS certificate automatically once DNS propagates.
4. Update the `PUBLIC_SITE_URL` environment variable to the new domain and redeploy.

## L. SEO setup

Already implemented: semantic HTML with a clear heading hierarchy, per-page meta titles/descriptions, Open Graph and Twitter card tags, canonical URLs, an auto-generated sitemap via `@astrojs/sitemap`, `robots.txt` (with `/studio` excluded), and Person structured data (JSON-LD) on every page.

## M. Still needed from you

Nothing here blocks the site from working — these just make it stronger:

- **The actual CV PDF**, uploaded via `/studio` → Site Settings (see section J)
- **Live URL confirmation** for Brandora Media (currently `brandoraservicedeck.netlify.app`, pulled from your screenshot) and a live link for ThePharmaDon beyond Instagram, if one exists
- **"Before It's Too Late" landing page URL** — not yet linked; add it via Studio → Projects
- **The branded e-commerce project's real external URL**, if you want it linked (kept generic per your instructions — Studio lets you rename/relabel this later for a targeted portfolio)
- **LinkedIn URL confirmation** — currently `linkedin.com/in/donaldokoli`, pulled from your Instagram bio link
- **GitHub URL**, if you want one listed
- **A custom domain**, if you're buying one
- **Testimonials** — the table and Studio section exist, but no page surfaces them yet. Once you have consented testimonials, say the word and a "What people say" section can be added to the homepage or About page in a few minutes.
- **Project screenshots** — upload via Studio's image fields on any case study or project, and they'll appear automatically.

## N. Recruiter test (self-review)

1. Is it immediately obvious what Donald does? **Yes** — hero states role + tagline directly.
2. Is his professional level clear? **Yes** — 4+ years, named employers, quantified results.
3. Are his strongest results obvious? **Yes** — Selected Results stat block on the homepage.
4. Is there proof of actual work? **Yes** — four detailed case studies with context/approach/execution/results.
5. Is his marketing expertise obvious? **Yes** — case studies and skills section are marketing-first.
6. Is his entrepreneurial ability visible? **Yes** — "Built From Scratch" section, dedicated Projects page.
7. Is pharmacology positioned as an advantage, not the headline? **Yes** — secondary section, positioned after marketing content throughout.
8. Is there an obvious way to contact him? **Yes** — persistent header CTA + dedicated Contact page.
9. Can a recruiter quickly access his CV? **Yes**, once the PDF is uploaded (see section M).
10. Does it look credible for an international company? Structurally yes — final polish depends on adding real project imagery and the CV.
