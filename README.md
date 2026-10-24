# 🎬 TMDB Movie Explorer

A responsive movie discovery app built with React, TypeScript, Redux Toolkit Query, React Router, Material UI, CSS Modules, and Zod. It uses The Movie Database (TMDB) API to browse movie categories, search titles, inspect details and cast, discover movies with filters, and save favorites locally.

**🔗 [Live Demo]()** | **💼 [LinkedIn](https://linkedin.com/in/alexandr-sklyarenko-0b41793bb)** | **📱 [Telegram](https://t.me/SanyaStOskol)**

## 📸 Screenshots

|              Dark Theme               |               Light Theme               |
|:-------------------------------------:|:---------------------------------------:|
| ![dark theme](/public/dark-theme.png) | ![light theme](/public/light-theme.png) |

## ✨ Features

- **Browse:** Popular, top-rated, upcoming, and now-playing movies.
- **Search & Filter:** Search titles, filter by genre, rating, release year, and sort order.
- **Details:** Comprehensive movie details page (rating, genres, runtime, budget, revenue, cast, and similar movies).
- **Favorites:** Save/remove favorite movies (persisted in `localStorage`).
- **Theming:** Seamless switch between light and dark themes (persisted in `localStorage`).
- **Robustness:** Validate environment variables and API responses using Zod. Show loading placeholders (skeletons) and API error messages.

## 🛠 Tech Stack

- **Core:** React 18, TypeScript, Vite
- **State & Data Fetching:** Redux Toolkit, RTK Query
- **Routing:** React Router (v7)
- **Styling:** Material UI, CSS Modules, CSS Variables
- **Validation:** Zod
- **Testing:** Vitest, React Testing Library, jsdom
- **Code Quality:** ESLint, Prettier

## ⚙️ Requirements

- **Node.js:** Current Node 22 LTS release (or compatible with Vite/Vitest versions in `package.json`).
- **Package Manager:** `pnpm` (the repository includes `pnpm-lock.yaml`).
- **API Key:** A TMDB v3 API key.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/SanyaSkl/TMDB-serchingmovies.git
   cd TMDB-serchingmovies
Install dependencies:

bash
pnpm install
Set up environment variables:

bash
cp .env.example .env
Edit .env and replace the placeholder with your own TMDB v3 API key:

dotenv
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY=your_tmdb_v3_api_key
Run the development server:

bash
pnpm dev

🧪 Quality Checks
bash
pnpm test:run       # run tests once
pnpm test:coverage  # run tests and generate coverage
pnpm lint           # run ESLint
pnpm build          # type-check and create a production build
pnpm format:check   # check formatting

📁 Project Structure
text
src/
├── api/             # RTK Query endpoints for TMDB
├── app/             # app-level composition and theme application
├── components/
│   ├── Layout/      # header, footer, route outlet and app layout
│   ├── movie/       # movie cards, genres, cast and related movie UI
│   ├── skeletons/   # loading placeholders (MUI Skeleton)
│   └── ui/          # reusable UI such as search, errors, pagination
├── config/          # environment loading and validation
├── constants/       # route paths, movie categories and filter options
├── hooks/           # typed Redux hooks, filters, debounce and media query
├── pages/           # route-level pages
├── store/           # Redux store, favorites, theme and selectors
├── test/            # test setup
└── validations/     # Zod schemas and inferred data types