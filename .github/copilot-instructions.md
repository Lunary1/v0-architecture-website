# Copilot Instructions for Architectenbureau Paul Kindt Website

## Project Overview

A Next.js 16 marketing website for an architecture studio, built with v0.app and auto-synced with Vercel deployments. The site showcases projects, services, and contact information for a Dutch architecture firm. **Projects are managed via Strapi CMS.**

**Key Stack:** Next.js 16 + TypeScript + Tailwind CSS + Radix UI + next-themes + Strapi CMS

## Architecture & Data Flow

### Component Structure

- **Page Components** (`app/*/page.tsx`): Route-specific layouts that compose reusable components
- **UI Components** (`components/`): Domain components (Hero, ProjectsGrid, ContactForm) and low-level UI primitives (`ui/`)
- **Data Layer**: [lib/strapi.ts] (projects from Strapi CMS) + [lib/data.ts] (static studio info, testimonials)

### Key Pattern: Strapi CMS Integration (Active)

**Live Data Source:** `https://grateful-charity-81ae2ee2e5.strapiapp.com/api`

**[lib/strapi.ts] (lib/strapi.ts) Module:**

- `fetchProjects()` - fetch all projects (caches via ISR 1h) with categories, descriptions (rich text blocks), images, thumbnails
- `fetchProjectByDocumentId(documentId)` - fetch single project by documentId for detail pages; uses `documentId` (not numeric `id`)
- `fetchCategories()` - fetch category list for grid filtering (ISR 1h)
- `parseDescription()` - parse Strapi rich text block format (array of paragraph blocks) to plain string
- Type definitions: `StrapiProject`, `StrapiCategory`, `Project`, `Category`

**Key Data Transformations in `fetchProjects()`:**

- `Categories`: Maps Strapi relation array to flat string array (e.g., `["Residentieel Modern", "Interieur"]`)
- `Thumbnail`: Prioritizes `Thumbnail.formats.medium` (750px) for grid display
- `imageUrls`: Sorts Pictures by filename (descending, numeric) and extracts `formats.large` URLs
- `year`: Extracts from `Buildyear` string via `extractYearFromDate()`
- `description`: Parses rich blocks to string; `descriptionBlocks` retains raw format

**Components Using Strapi:**

- [components/projects-grid.tsx] - uses `fetchProjects()` + `fetchCategories()` for filtering; categories sorted via `categoryOrder` mapping
- [components/featured-projects.tsx] - uses `fetchProjects()`, displays up to 3 items with `featured: true` (if schema has it)
- [app/projecten/[id]/page.tsx] - server component; uses `generateStaticParams()` + `fetchProjectByDocumentId()`

**Strapi Project Schema:** `documentId` (unique key), `Name`, `Description` (rich text blocks array), `Location`, `Buildyear`, `Surface`, `categories` (many-to-many relation), `Thumbnail`, `Pictures` (array), `createdAt`, `publishedAt`

**When adding projects:** Create in Strapi CMS admin panel. No code changes needed—components automatically fetch and display. File naming for Pictures: use `0.jpg`, `1.jpg`, etc. for correct sort order.

### Data Flow Example (Strapi Integration)

1. User navigates to `/projecten`
2. [components/projects-grid.tsx] loads (server component) and calls `fetchProjects()` + `fetchCategories()`
3. Strapi API returns all projects with relations; ISR cache hits for repeated requests
4. Grid renders filterable list; `parseDescription()` used only if displaying preview text; categories sorted by predefined order
5. User clicks project → navigates to `/projecten/[id]`
6. [app/projecten/[id]/page.tsx] calls `fetchProjectByDocumentId(id)` server-side
7. Detail page displays: full description (both blocks + parsed text), all images sorted, related projects (same category filter)
8. Page uses `revalidate: 3600` (ISR) and `generateStaticParams()` for static generation at build time

**Rich Text Format:** Strapi stores descriptions as: `Array<{ type: "paragraph", children: Array<{ text: string, type: string }> }>`. Parse via `parseDescription()` → joins all text nodes per block with newlines between blocks.

## Development Workflow

### Dev Server Management (IMPORTANT)

**Do NOT build the app for every change.** Instead:

1. **Check if dev server is running** - Test if `http://localhost:3000` is accessible
2. **If running** - Make code changes; auto-reload applies within seconds (Turbopack HMR)
3. **If not running** - Start with `npm run dev` (takes ~3-5 seconds)
4. **Only build before deployment** - Run `npm run build` to verify production readiness

**When dev server is running:**

- Code changes compile automatically; no manual action needed
- Changes visible immediately in browser (no full page refresh required)
- Build is expensive (~30-40s); skip for active development

### Build & Deployment Commands

```bash
npm i    # Install dependencies
npm run dev         # Start dev server (localhost:3000)
npm run build       # Production build (TS/ESLint errors intentionally ignored)
npm run start       # Serve production build
npm run lint        # ESLint check (runs entire project)
```

### Build Configuration Details

- **[next.config.mjs]:** ESLint and TypeScript errors are **intentionally ignored** during builds (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`) – this allows incomplete work to be tested
- **Image Optimization:** Disabled (`images.unoptimized: true`) – all images served as-is from URLs
- **Deployment:** Auto-deploys to Vercel on push to `main` branch

## Project-Specific Patterns

### Navigation

- `Navigation` component: Fixed header with responsive mobile menu using animated hamburger icon
- Active link detection via `usePathname()` with `isActive()` helper
- All routes in one place; update both desktop and mobile menu when adding pages

### Hero Section

- Parallax scroll effect: `translateY(scrollY * 0.5px)`
- Full viewport height (`h-screen`)
- Overlay using `bg-foreground/40` for text contrast
- Fetches featured projects from Strapi as background images

### Forms (Contact)

- Built with react-hook-form + Zod validation
- Uses UI primitives from `components/ui/` (Input, Textarea, Button)
- Form submit handling in component; backend integration needed for actual email delivery

### Project Detail Pages (`[id]` routes)

- Server component pattern: `generateStaticParams()` pre-builds routes at build time
- Fetch via `fetchProjectByDocumentId(documentId)` – uses documentId (not numeric id)
- Validate project existence before rendering; show 404-style fallback if not found
- Parse rich text descriptions with `parseDescription()` for plain text display
- Display related projects (same category) using `filter()` on all projects

### Category Filtering in ProjectsGrid

- Maintains `selectedCategory` state with `useMemo` for filtered results
- Categories fetched live from Strapi; always prepend "Alle Projecten" for "show all" option
- Define category sort order in `categoryOrder` map to control display sequence
- Many-to-many relationship: check if project has ANY matching category via `.some()`

## Critical External Integration Points

- **Strapi CMS:** `https://grateful-charity-81ae2ee2e5.strapiapp.com/api/` – projects, categories (with ISR caching 1h)
- **Vercel Analytics:** `@vercel/analytics/next` imported in [app/layout.tsx] – auto-tracks page views
- **next-themes:** `ThemeProvider` in [components/theme-provider.tsx] – light/dark mode switching via `useTheme()` hook
- **News Data:** Hardcoded in [components/news-grid.tsx] (~272 lines, array of static `NewsArticle` objects); migrate to Strapi if CMS expansion needed

## Static Data Patterns

**[lib/data.ts]** - Single source of truth for non-CMS content:

- `contactInfo` - studio address, phone, email, BTW ID, hours (update when info changes)
- `testimonials` - array of client quotes (add new items here for homepage carousel)
- Services, team bios, and other static text go here

**When to use static data vs. Strapi:**

- **Static (lib/data.ts):** Studio info, testimonials, services, team, contact details – changes rarely
- **Dynamic (Strapi):** Projects, news articles, portfolio items – updated frequently via CMS admin panel

## When Adding Features

1. **New Projects**: Create in Strapi CMS admin panel. No code changes needed—components automatically fetch and display. Picture filenames should be `0.jpg`, `1.jpg`, etc. for correct sort order.
2. **New Pages**: Create route in `app/` folder, add link in [components/navigation.tsx] (desktop + mobile menu)
3. **New UI Components**: Wrap Radix UI in `components/ui/`, follow existing patterns (e.g., [components/ui/button.tsx])
4. **Forms**: Use react-hook-form + Zod + Radix inputs, reference [components/contact-form.tsx]
5. **Static Content**: Update [lib/data.ts] for studio info, testimonials, services (non-Strapi data)
6. **News/Blog Articles**: Currently hardcoded in [components/news-grid.tsx]; migrate to Strapi if scaling needed
