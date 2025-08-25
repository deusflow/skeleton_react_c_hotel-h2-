# CORS - Udviklings‑workaround: Vite dev‑proxy (slipper for CORS lokalt)
Åben vite.config.js og ændre url til jeres projekts api url:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: "https://karambit-api.mercantec.tech",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

Nu rammer api.post("/Users/login", ...) → http://localhost:5174/api/Users/login,
som Vite sender videre til https://karambit-api.mercantec.tech/api/Users/login uden CORS‑blokering i browseren.
I produktion sætter du VITE_API_URL til din rigtige backend‑URL igen (CORS skal stadig være korrekt på serveren i prod).

# Tailwind (er installeret for jer)
## Installation (Tailwind v3 – stabil version)
Installer Tailwind + PostCSS + Autoprefixer
I projektroden (samme mappe som package.json):

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

Det opretter to filer:
	•	tailwind.config.js
	•	postcss.config.js

## Konfiguration
### tailwind.config.js
Åbn og indsæt:

// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

### postcss.config.js
Åbn og indsæt:

// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# skeleton_react_c_hotel-h2-