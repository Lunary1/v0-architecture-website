# Copilot Instructions for Studio Architecten Website

## Project Overview

A Next.js 16 marketing website for an architecture studio, built with v0.app and auto-synced with Vercel deployments. The site showcases projects, services, and contact information for a Dutch architecture firm.

**Key Stack:** Next.js 16 + TypeScript + Tailwind CSS + Radix UI + next-themes

## Architecture & Data Flow

### Component Structure

- **Page Components** (`app/*/page.tsx`): Route-specific layouts that compose reusable components
- **UI Components** (`components/`): Domain components (Hero, ProjectsGrid, ContactForm) and low-level UI primitives (`ui/`)
- **Data Layer** (`lib/data.ts`): Single source of truth for all mock data (projects, studio info, contact details)

### Key Pattern: Strapi CMS Integration

**Live Data Source:** Strapi CMS at `https://grateful-charity-81ae2ee2e5.strapiapp.com/api/projects/`

Content is transitioning from mock data (`lib/data.ts`) to Strapi:

- `studioInfo`: Still in `lib/data.ts` (office locations, contact details)
- `projectDetails`: **Being migrated to Strapi** – fetch from `/api/projects/` endpoint
- Strapi project schema: `Name`, `Description` (rich text), `Location`, `Buildyear`, `Surface`, `documentId`

**When adding projects:** Create in Strapi CMS, then fetch via API in components. Keep `lib/data.ts` only for static studio metadata.

**API Response Pattern:**

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "e8kohoufzeso7jg5cwurv7y7",
      "Name": "Project Name",
      "Description": [...],
      "Location": "City",
      "Buildyear": "2018-06-07",
      "Surface": 350
    }
  ],
  "meta": { "pagination": {...} }
}
```

### Data Flow Example (Strapi Integration)

1. `app/projecten/page.tsx` → `ProjectsGrid` component
2. `ProjectsGrid` fetches from Strapi: `fetch('https://grateful-charity-81ae2ee2e5.strapiapp.com/api/projects')`
3. Parse response `data` array and populate local state
4. User clicks project → navigates to `app/projecten/[id]/page.tsx`
5. Detail page fetches specific project by `documentId` from Strapi and renders

### Page Routes

- `/` - Homepage with hero, featured projects, services, testimonials
- `/projecten` - All projects grid (filterable by category)
- `/projecten/[id]` - Individual project detail page
- `/over` - About studio
- `/nieuws` - News/blog listing
- `/nieuws/[id]` - Individual news article
- `/contact` - Contact form

## Critical Development Workflows

### Build & Deployment

```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build (errors/TS ignored in next.config.mjs)
pnpm start    # Serve production build
pnpm lint     # ESLint check (runs against entire project)
```

### Build Configuration

- **next.config.mjs:** ESLint and TypeScript errors are **intentionally ignored** during builds (see `ignoreDuringBuilds`, `ignoreBuildErrors`)
- **Image Optimization:** Disabled (`images.unoptimized: true`)
- Auto-deploys to Vercel on repo push

## Component Conventions

### Client vs Server Components

- Components using `"use client"` with hooks: `Navigation`, `Hero`, `ProjectsGrid`, `ContactForm`, `ThemeProvider`
- Server components for layout and static content composition

### Styling Pattern

- **Tailwind CSS only** – no CSS files except globals
- Components use `className` with utility classes
- Responsive: `hidden md:flex` for desktop/mobile variants
- Dark mode support via `next-themes` (ThemeProvider wraps app)

### UI Component Library

`components/ui/` contains Radix UI primitive wrappers:

- `Button`, `Input`, `Textarea` with Tailwind styling
- Import from shadcn/ui pattern (installed via components.json)

### Typography & Spacing

- Font: Geist (Google Fonts, latin subset)
- Consistent use of `font-light tracking-widest` for headings
- Opacity classes (`opacity-60`, `opacity-80`) for visual hierarchy

## Project-Specific Patterns

### Navigation

- `Navigation` component: Fixed header with responsive mobile menu using animated hamburger icon
- Active link detection via `usePathname()` with `isActive()` helper
- All routes in one place; update both desktop and mobile menu

### Hero Section

- Parallax scroll effect: `translateY(scrollY * 0.5px)`
- Full viewport height (`h-screen`)
- Overlay using `bg-foreground/40` for text contrast

### Forms (Contact)

- Built with React Hook Form + Zod validation
- Uses UI primitives (Input, Textarea, Button)
- Submit handling in component; integrate with backend email service as needed

### Project Detail Pages

- `[id]` routes fetch from `lib/data.ts` via `projectDetails[id]`
- Always validate ID exists before rendering (check if `projectDetails[id]` is defined)
- Fallback to 404 or error boundary if ID not found

### Filtering & Sorting

- `ProjectsGrid` maintains `selectedCategory` state with `useMemo` for filtered results
- Real category values: "Residentieel Modern", "Residentieel Klassiek", "Kantoor & Industriebouw", "Interieur"

## Critical External Integration Points

Strapi CMS (ACTIVE):\*\* Endpoint: `https://grateful-charity-81ae2ee2e5.strapiapp.com/api/projects/`

- Fetch projects dynamically in `ProjectsGrid` and detail pages
- Handle pagination via `meta.pagination` if adding more projects
- Rich text descriptions stored as Strapi blocks – parse in components
- \*\*
- **Vercel Analytics:** `@vercel/analytics/next` imported in `layout.tsx` – tracks page views/events automatically
- **next-themes:** ThemeProvider in `components/theme-provider.tsx` enables light/dark mode
- **\*Create in Strapi:** Add new project entry via Strapi admin panel or API (fields: Name, Description, Location, Buildyear, Surface)

2. **Fetch in components:** `ProjectsGrid` and detail pages call Strapi `/api/projects/` and filter/display results
3. **No local file updates needed** – data flows directly from Strapi
4. Images: Upload to Strapi media library or reference external URLs in project data
5. Detail page: Use `documentId` from Strapi response to fetch and display full project

### Adding a New Project

1. Add entry to `projectDetails` in `lib/data.ts` with unique ID
2. Add matching project to `allProjects` array in `projects-grid.tsx`
3. Image path goes in `image` field (files live in `public/`)
4. Detail page (`app/projecten/[id]/page.tsx`) auto-accesses via `projectDetails` lookup

### Adding a New Page

1. Create folder in `app/` (e.g., `app/services/`)
2. Add `page.tsx` with route component
3. Update Navigation component to include new link (desktop + mobile)
4. Use `Link` from `next/link` for all internal routing

### Modal/Dialog Patterns

- `ContactForm` uses Radix Dialog (see imports)
- Dialog content wrapped in form elements; test close behavior

### Testing & Errors

- ESLint/TypeScript errors don't block builds (see next.config)
- Check browser console for runtime errors
- Rebuild if styles don't apply after edits

## File Locations Reference

- **Routes:** `app/[route]/page.tsx`
- **Components:** `components/[ComponentName].tsx`
- **Data:** `lib/data.ts` (single source of truth)
- **Styles:** `globals.css` (Tailwind imports + custom vars)
- **Config:** `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`
