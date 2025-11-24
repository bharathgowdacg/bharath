# Portfolio (React + Vite + Tailwind)

A React implementation of Bharath Gowda C G's portfolio with Tailwind CSS (built via PostCSS).

## Scripts
- `npm install` — install dependencies
- `npm run dev` — start Vite dev server
- `npm run build` — create production build
- `npm run preview` — preview the production build locally

## Project Structure
- `index.html` — Vite entry (mounts `#root`, includes meta + favicon)
- `src/App.jsx` — main app content (converted from original HTML) now includes EmailJS form submission
- `src/main.jsx` — React bootstrap and Tailwind import
- `src/index.css` — Tailwind directives + custom styles (font, scrollbar)
- `tailwind.config.js` — Tailwind configuration (content paths)
- `postcss.config.js` — Tailwind + Autoprefixer
- `public/favicon.svg` — favicon used in the head

## Deploy
Any static host that serves the `dist` folder will work.

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`

### Vercel
1. Framework preset: Vite
2. Build command: `npm run build`
3. Output directory: `dist`

### GitHub Pages
You can deploy the `dist` folder via GitHub Actions or manually:
1. `npm run build`
2. Push the `dist` folder to the `gh-pages` branch (or use an action)

If the repository will live under a subpath (e.g., username.github.io/repo), set Vite `base` in a `vite.config.js`:
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/repo-name/'
})
```

## Contact Form (EmailJS)
1. Sign up at [EmailJS](https://www.emailjs.com/) and create:
   - a **service** (copy the Service ID)
   - an **email template** (copy the Template ID and configure fields `name`, `email`, `message`)
   - a **public key** (formerly User ID)
2. Create a `.env.local` file in the project root with:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Install dependencies and run the app:
   ```bash
   npm install
   npm run dev
   ```
4. Submit the contact form to receive emails via EmailJS. Errors will display inline if configuration is missing or EmailJS fails.

