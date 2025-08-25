# React + vite installation med clone/fork
	1.	git clone ... henter hele projektet inklusiv git-historik.
	2.	åben folder og terminal -> skriv: npm install (eller yarn install) henter alle afhængigheder baseret på package.json.
	3.	npm run dev starter Vite’s dev-server (typisk på http://localhost:5173)  

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
<code> import { api, setToken } from "../api/apiClient";
async function handleLogin(email, password) {
  try {
    const res = await api.post("/Users/login", { email, password });
    // backend svarer fx med { access_token: "..." }
    setToken(res.access_token);
  } catch (e) {
    console.error("Login fejlede:", e);
  }
}
</code>
## Hent profil (/me)
<code> import { api } from "../api/apiClient";

async function loadProfile() {
  try {
    const me = await api.get("/Users/me", { auth: true });
    console.log("Brugerprofil:", me);
  } catch (e) {
    console.error("Kunne ikke hente profil:", e);
  }
}
</code>
## Hent liste med query-params
<code>
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
</code>
## Opret / redigér / slet
// POST (opret)
<code>
await api.post("/Bookings", { startDate: "...", endDate: "...", roomId: 5 }, { auth: true });
</code>
// PUT (opdater)
<code>
await api.put("/Bookings/123", { status: "confirmed" }, { auth: true });
</code>
// DELETE
<code>
await api.del("/Bookings/123", { auth: true });
</code>
# CORS - Udviklings‑workaround: Vite dev‑proxy (slipper for CORS lokalt)
Åben vite.config.js og ændre url til jeres projekts api url:
<code>
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
</code>
Nu rammer api.post("/Users/login", ...) → http://localhost:5174/api/Users/login,</br>
som Vite sender videre til https://karambit-api.mercantec.tech/api/Users/login uden CORS‑blokering i browseren.</br>
I produktion sætter du VITE_API_URL til din rigtige backend‑URL igen (CORS skal stadig være korrekt på serveren i prod).</br>

# Tailwind (er installeret for jer)
## Installation (Tailwind v3 – stabil version)
Installer Tailwind + PostCSS + Autoprefixer</br>
I projektroden (samme mappe som package.json):
</br>
<code>
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
</code>
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

