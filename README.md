# Pages
Jeg har oprettet nogle sider til jer. I kan vælge at bruge dem eller lave jeres egen. Men husk at ændre routes, hvis i ændre filnavne
# Routes 
## index.js
Indeholder alle routes fra mit eksempel, så i har et start sted.
## RequireAuth.js
Benyttes af routes for at tjekke om brugeren er logget ind
# apiClient.js

apiClient er oprettet for jer. Den ligger i mappen api.
Den kaldes således:

## Login (Post)
import { api, setToken } from "../api/apiClient";

async function handleLogin(email, password) {
  try {
    const res = await api.post("/Users/login", { email, password });
    // backend svarer fx med { access_token: "..." }
    setToken(res.access_token);
  } catch (e) {
    console.error("Login fejlede:", e);
  }
}

## Hent profil (/me)
import { api } from "../api/apiClient";

async function loadProfile() {
  try {
    const me = await api.get("/Users/me", { auth: true });
    console.log("Brugerprofil:", me);
  } catch (e) {
    console.error("Kunne ikke hente profil:", e);
  }
}

## Hent liste med query-params
import { api } from "../api/apiClient";

async function loadBookings() {
  try {
    const res = await api.get("/Bookings", {
      auth: true,
      params: { page: 1, pageSize: 10, search: "tesla" }
    });
    console.log("Bookinger:", res.items);
  } catch (e) {
    console.error("Fejl ved hentning:", e);
  }
}

## Opret / redigér / slet
// POST (opret)
await api.post("/Bookings", { startDate: "...", endDate: "...", roomId: 5 }, { auth: true });

// PUT (opdater)
await api.put("/Bookings/123", { status: "confirmed" }, { auth: true });

// DELETE
await api.del("/Bookings/123", { auth: true });

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

