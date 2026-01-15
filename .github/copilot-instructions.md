# Copilot Instructions for Studio Architecten Website

## Project Overview

A Next.js 16 marketing website for an architecture studio, built with v0.app and auto-synced with Vercel deployments. The site showcases projects, services, and contact information for a Dutch architecture firm. **Projects are managed via Strapi CMS.**

**Key Stack:** Next.js 16 + TypeScript + Tailwind CSS + Radix UI + next-themes + Strapi CMS

## Architecture & Data Flow

### Component Structure

- **Page Components** (`app/*/page.tsx`): Route-specific layouts that compose reusable components
- **UI Components** (`components/`): Domain components (Hero, ProjectsGrid, ContactForm) and low-level UI primitives (`ui/`)
- **Data Layer**: [lib/strapi.ts](lib/strapi.ts) (projects from Strapi CMS) + [lib/data.ts](lib/data.ts) (static studio info, testimonials)

### Key Pattern: Strapi CMS Integration (Active)

**Live Data Source:** `https://grateful-charity-81ae2ee2e5.strapiapp.com/api`

**[lib/strapi.ts](lib/strapi.ts) Module:**
- `fetchProjects()` - fetch all projects with categories, descriptions (rich text blocks), images
- `fetchProjectById(id)` - fetch single project by ID for detail pages
- `fetchCategories()` - fetch category list for grid filtering
- `parseDescription()` - parse Strapi rich text block format to string
- Type definitions: `StrapiProject`, `StrapiCategory`, `Project`, `Category`

**Components Using Strapi:**
- [components/projects-grid.tsx](components/projects-grid.tsx) - uses `fetchProjects()` and `fetchCategories()` for filtering
- [components/featured-projects.tsx](components/featured-projects.tsx) - uses `fetchProjects()` to display featured items
- [components/hero.tsx](components/hero.tsx) - uses `fetchProjects()` for background image fallback

**Strapi Project Schema:** `Name`, `Description` (rich text blocks), `Location`, `Buildyear`, `Surface`, `categories` (relation), `image`, `documentId`

**When adding projects:** Create in Strapi CMS admin panel. No code changes needed—components automatically fetch and display new projects.

### Data Flow Example (Strapi Integration)

1. User navigates to `/projecten`
2. [components/projects-grid.tsx](components/projects-grid.tsx) loads and calls `fetchProjects()` + `fetchCategories()`
3. Strapi API returns projects with category relations and rich text descriptions
4. Grid renders filterable project list; `parseDescription()` converts rich blocks to string
5. User clicks project → navigates to `/projecten/[id]`
6. [app/projecten/[id]/page.tsx](app/projecten/[id]/page.tsx) calls `fetchProjectById(id)` 
7. Detail page displays full project info (description, images, specs) from Strapi

**Rich Text Format:** Strapi descriptions stored as block array; `parseDescription()` handles parsing

## Critical Development Workflows

### Build & Deployment

```bash
pnpm install  # Install dependencies
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build (errors/TS ignored in next.config.mjs)
pnpm start    # Serve production build
pnpm lint     # ESLint check (runs against entire project)
```

### Build Configuration

- **next.config.mjs:** ESLint and TypeScript errors are **intentionally ignored** during builds (see `ignoreDuringBuilds`, `ignoreBuildErrors`)
- **Image Optimization:** Disabled (`images.unoptimized: true`)
- Auto-deploys to Vercel on repo push

## Project-Specific Patterns

### Navigation

- `Navigation` component: Fixed header with responsive mobile menu using animated hamburger icon
- Active link detection via `usePathname()` with `isActive()` helper
- All routes in one place; update both desktop and mobile menu

### Hero Section

- Parallax scroll effect: `translateY(scrollY * 0.5px)`
- Full viewport height (`h-screen`)
- Overlay using `bg-foreground/40` for text contrast
- Fetches featured projects from Strapi as background images

### Forms (Contact)

- Built with React Hook Form + Zod validation
- Uses UI primitives (Input, Textarea, Button)
- Submit handling in component; integrate with backend email service as needed

### Project Detail Pages

- `[id]` routes fetch from Strapi via `fetchProjectById(id)`
- Validate project exists before rendering
- Parse rich text descriptions with `parseDescription()`

### Filtering & Sorting

- `ProjectsGrid` maintains `selectedCategory` state with `useMemo` for filtered results
- Categories fetched live from Strapi; "Alle Projecten" prepended for "show all" option

## Critical External Integration Points

- **Strapi CMS:** Endpoint `https://grateful-charity-81ae2ee2e5.strapiapp.com/api/projects/` – fetch projects dynamically
- **Vercel Analytics:** `@vercel/analytics/next` imported in `layout.tsx` – tracks page views/events
- **next-themes:** ThemeProvider in `components/theme-provider.tsx` enables light/dark mode

## When Adding Features

1. **New Projects**: Create in Strapi CMS admin panel. No code changes needed—components automatically fetch and display
2. **New Pages**: Create route in `app/` folder, add link in [components/navigation.tsx](components/navigation.tsx) (desktop + mobile)
3. **New UI Components**: Wrap Radix UI in `components/ui/`, follow existing patterns
4. **Forms**: Use react-hook-form + Zod + Radix inputs, reference [components/contact-form.tsx](components/contact-form.tsx)
5. **Static Content**: Update [lib/data.ts](lib/data.ts) for studio info, testimonials, services (non-Strapi data)
