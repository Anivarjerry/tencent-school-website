# VIDYASETU AI: WEBSITE GENERATION MASTER PROMPT (V2.0)

You are a **Senior Full-Stack Web Architect** specialized in building Premium Educational Institute Websites. Your task is to generate a React-based professional website that dynamically reads data from a Supabase backend, matching the **VidyaSetu AI ERP** ecosystem.

## 1. STRATEGIC CONTEXT
The user is a School Administrator using the "VidyaSetu AI ERP". They have configured their website using a "Website Builder" portal. 
- **Goal**: Create a "WOW" experience for parents and students. 
- **Vibe**: Elite, Modern, University-style, 3D Animations, High Performance.
- **Tech Stack**: React, Lucide-React, Framer Motion, Tailwind CSS.

## 2. DESIGN SYSTEM TOKENS
- **Typography**: Primary: `Outfit` or `Inter` (Sans-serif), Display: `Outfit` (Bold/Black).
- **Border Radius**: `rounded-2xl` (16px) for cards, `rounded-3xl` (24px) for sections.
- **Shadows**: Soft, layered shadows (e.g., `shadow-2xl shadow-emerald-500/5`).
- **Effects**: Glassmorphism (`backdrop-blur-xl`, `bg-white/80`), Gradient overlays.
- **Colors**: Dynamic `primary_color` from settings, with a neutral `slate-50` background.

## 3. DATABASE & STORAGE ARCHITECTURE
All data is scoped by `school_id` (UUID). Use the following tables:

### A. TABLE: `website_settings`
- `subdomain_slug`: String (e.g., "my-school"). **CRITICAL for dynamic routing.**
- **Field `content` (JSONB)**:
    - `header`: `{ title: string, logo_url: string }`
    - `hero`: `{ heading: string, subheading: string, banner_url: string, cta_text: string }`
    - `about`: `{ content: string (HTML), image_url: string }`
    - `highlights`: `string[]` (e.g. ["Smart Classes", "100% Result"])
    - `facilities`: `{ id: string, label: string, icon: string, enabled: boolean }[]` (Max 12)
    - `events`: `{ image_url: string, caption: string, date: string }[]` (Latest 8)
    - `form_config`: `{ id: string, label: string, enabled: boolean }[]` (Admission form fields)
    - `contact`: `{ phone: string, email: string, address: string }`
    - `footer`: `{ text: string }`
- **Field `config` (JSONB)**:
    - `primary_color`: Hex Code (e.g. #10b981)
    - `font_family`: String (Inter, Outfit, etc.)

### B. TABLE: `website_gallery`
- `image_url`: URL of the photo.
- `caption`: Short description.
- `order_index`: For sorting.

### C. TABLE: `website_notices`
- `title`: Heading.
- `content`: Sub-text.
- `image_url`: Optional attachment.
- `is_active`: Boolean (Only show if true).
- `published_at`: Timestamp.

### D. TABLE: `website_enquiries`
- `form_data`: JSONB (Data from Admission form submissions).
- `school_id`: Reference.

## 4. COMPONENT BREAKDOWN & UI/UX
### A. Header (Navbar)
- Sticky with `backdrop-blur`.
- Dynamic school name and logo.
- Smooth scroll navigation to sections.

### B. Hero Section
- 3D-inspired layout with floating elements.
- Staggered entrance animations for text and CTA.
- High-quality banner image with a perspective-slanted achievement card.

### C. Highlights Marquee
- An animated horizontal list of key school features.
- Continuous loop using Framer Motion.

### D. Facilities Grid
- Handle up to 12 facilities in a 4x3 or 3x4 grid.
- Interactive cards with Lucide icons (dynamically rendered).
- Hover effects with scale and shadow changes.

### E. Admission Form
- Dynamically render ONLY enabled fields from `form_config`.
- Real-time validation and loading states.
- Success feedback with confetti or smooth animations.
- POST data to `website_enquiries` table.

## 5. DYNAMIC ROUTING & FETCHING
1. **Extract Subdomain**: Read `window.location.hostname`. If it is `school1.vidyasetuai.com`, the slug is `school1`.
2. **Fetch by Slug**: 
    - Query `website_settings` where `subdomain_slug` matches the extracted slug.
    - If found, use that `school_id` to fetch Gallery and Notices.
3. **Fallback**: If no slug match is found, show default data for "VidyaSetu AI Digital School, Hanumangarh, Rajasthan".

## 6. ANIMATION SPEC (Framer Motion)
- **Entrance**: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`.
- **Stagger**: Use `staggerChildren` for lists and grids.
- **Hover**: `whileHover={{ scale: 1.05, y: -5 }}`.
- **Transitions**: Use `type: "spring", stiffness: 100` for a premium feel.

---
**INSTRUCTION**: Generate the full React application code including hooks, components, and Supabase integration logic following this master prompt.
