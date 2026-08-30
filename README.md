# Travel & Explore

A modern, beginner-friendly **Travel & Explore** frontend website built with:

- **Vue 3** `<script setup>` + **TypeScript**
- **Vite** (fast dev server + build tool)
- **Vue Router** (pages and dynamic routes)
- **Pinia** (global state: favorites, auth, bookings)
- **Tailwind CSS** (utility-first styling, dark mode included)
- **Lucide icons** — the package is `@lucide/vue`, the official successor of
  `lucide-vue-next` (which is deprecated but has the same API and icon names)
- **localStorage** instead of a database

There is **no backend, no database, no payments**. All data is mock/ local.

---

## 1. Folder structure

```
travel-explore/
│
├── index.html                      # HTML entry point (loads /src/main.ts)
├── package.json                    # Project info + scripts + packages
├── vite.config.ts                  # Vite settings (Vue plugin)
├── tsconfig.json                   # TypeScript settings
├── tailwind.config.js              # Tailwind settings (dark mode: class)
├── postcss.config.js               # PostCSS settings (Tailwind + autoprefixer)
│
└── src/
    │
    ├── assets/
    │   └── styles/
    │       └── main.css            # Tailwind layers + small base rules
    │
    ├── components/                 # Reusable building blocks
    │   ├── Navbar.vue              # Responsive navigation + theme toggle
    │   ├── Footer.vue              # Site footer
    │   ├── DestinationCard.vue     # One destination card
    │   ├── HotelCard.vue           # One hotel card
    │   ├── ActivityCard.vue        # One activity card
    │   ├── SearchBar.vue           # Search input (works with v-model)
    │   ├── LoadingSpinner.vue      # Loading state indicator
    │   ├── SectionHeading.vue      # Consistent section titles
    │   └── ToastHost.vue           # Shows toast notifications
    │
    ├── data/                       # Mock/local data (no backend!)
    │   ├── destinations.ts         # Destinations + types
    │   ├── hotels.ts               # Hotels + types
    │   └── activities.ts           # Activities + types
    │
    ├── stores/                     # Pinia stores (global state)
    │   ├── favoriteStore.ts        # Favorites (saved to localStorage)
    │   ├── authStore.ts            # Demo login/logout
    │   └── bookingStore.ts         # Bookings (saved to localStorage)
    │
    ├── utils/
    │   └── toast.ts                # Tiny notification system
    │
    ├── router/
    │   └── index.ts                # All routes
    │
    ├── views/                      # One file per page
    │   ├── Home.vue                # Hero + search + highlights
    │   ├── Destinations.vue        # Search + category filters
    │   ├── DestinationDetails.vue  # /destination/:id
    │   ├── Hotels.vue              # Hotel list
    │   ├── HotelDetails.vue        # /hotel/:id (gallery, rooms)
    │   ├── Activities.vue          # Activity list + filters
    │   ├── ActivityDetails.vue     # /activity/:id
    │   ├── Favorites.vue           # Saved destinations (❤)
    │   ├── Booking.vue             # Frontend-only booking form
    │   ├── Login.vue               # Demo login page
    │   ├── Profile.vue             # User profile + stats
    │   ├── MyTrips.vue             # Travel dashboard (upcoming/previous)
    │   ├── About.vue               # About + team
    │   └── Contact.vue             # Contact form
    │
    ├── App.vue                     # App shell (Navbar + page + Footer + toasts)
    └── main.ts                     # Entry point: creates the app
```

---

## 2. Installation commands

```bash
# 1) Install dependencies
npm install

# 2) Start the dev server (http://localhost:5173)
npm run dev

# 3) Type-check + build for production (outputs to /dist)
npm run build

# 4) Preview the production build locally
npm run preview
```

---

## 3. Required npm packages

| Package            | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `vue`              | The framework itself                      |
| `vue-router`       | Page routing                              |
| `pinia`            | Global state (favorites, auth, bookings)  |
| `@lucide/vue`      | Real SVG icons (no emojis)                |
| `vite`             | Dev server + build tool                   |
| `@vitejs/plugin-vue` | Lets Vite read `.vue` files             |
| `typescript`       | Type checking                             |
| `vue-tsc`          | Type-checks `.vue` templates              |
| `tailwindcss`      | Utility-first CSS                         |
| `postcss`          | CSS processor that runs Tailwind          |
| `autoprefixer`     | Adds browser prefixes automatically       |

---

## 4. How each folder works

- **`src/data/`** — holds all the mock data as typed TypeScript arrays
  (`destinations`, `hotels`, `activities`). Pages import these directly.
  In a real project this is where `fetch()` API calls would go instead.
- **`src/components/`** — small reusable UI pieces. A parent page passes
  data in with **props** (`<DestinationCard :destination="x" />`), and the
  component renders it. Components that look the same are never duplicated.
- **`src/views/`** — one page per route. Views combine components and data
  and handle user interaction (search, forms, navigation).
- **`src/stores/`** — Pinia stores. Any page can read/write the same state:
  favorites, the logged-in user and bookings. Changes are saved to
  `localStorage` so they survive a page refresh.
- **`src/router/`** — defines which URL loads which view, including dynamic
  routes like `/destination/:id`.
- **`src/utils/`** — small helper code not tied to any page (the toast system).
- **`src/assets/`** — global CSS.

---

## 5. How the 15 features work

1. **Home Page** — `Home.vue`: a hero section with a background image,
   a search input (reuses `SearchBar`) and an *Explore Now* button that
   navigates to `/destinations?search=...`. Then sections for popular
   destinations, featured hotels, popular activities and a travel
   inspiration strip.
2. **Destination Search** — `Destinations.vue` uses `v-model` on the
   `SearchBar`, a `computed` that calls `.filter()`, and matches name /
   country / description so "Paris", "Tokyo" or "Cambodia" all work.
3. **Destination Categories** — category chips (Beaches, Mountains, Cities,
   Historical, Nature, Adventure) with icons. Clicking one sets
   `activeCategory` and the `computed` re-filters the grid.
4. **Destination Details** — dynamic route `/destination/:id`. Reads the id
   with `useRoute().params.id`, then shows image, name, country, description,
   best time, budget, rating, location, activities and nearby hotels.
5. **Favorite Destinations** — every destination card has a heart button.
   Clicking it calls `favoriteStore.toggleFavorite(destination)`, changes the
   heart fill, prevents duplicates (checked by id), updates the navbar badge,
   and the `/favorites` page lists all saved places.
6. **Popular Hotels** — `Hotels.vue` lists hotel cards with image, name,
   location, rating, price per night and facilities, plus a *View Hotel*
   button.
7. **Hotel Details** — `/hotel/:id` shows a clickable image gallery, room
   types you can select, facilities, price, availability and a booking button
   that jumps to the booking form with the hotel prefilled.
8. **Travel Activities** — `Activities.vue` with category filters (Hiking,
   Diving, City Tours, Camping, Food Tours, Cultural Tours, Sailing,
   Adventure). `ActivityDetails.vue` shows price, duration, rating and
   highlights.
9. **Frontend Booking** — `Booking.vue` form: destination, hotel (options
   depend on the chosen destination), check-in/out, guests, room type, name,
   email. On submit it validates, calls `bookingStore.addBooking(...)` and
   shows a success toast. No real payment or API.
10. **Login / Sign In** — `Login.vue`: email + password with show/hide eye
    icon, *Remember me* checkbox (saves the email). Any credentials work.
    After login it shows the toast "Hello, [username]! Welcome to Travel &
    Explore." and redirects.
11. **User Profile** — `Profile.vue`: name, email, avatar, favorite count
    and booking count, with *Edit Profile* (inline editor), *View
    Favorites*, *View Bookings*, *Book a Trip* and *Logout*.
12. **Responsive Navbar** — `Navbar.vue`: links collapse into a hamburger
    menu on mobile. Includes a favorites badge and shows logout/login.
13. **Dark / Light Mode** — a Sun/Moon toggle in the navbar switches a
    `dark` class on `<html>`; the choice is saved to `localStorage` and
    applied before Vue loads (so there is no flash).
14. **About & Contact** — `About.vue` (intro, mission, why choose us,
    statistics, team) and `Contact.vue` (name, email, subject, message;
    shows a success toast, resets the form).
15. **Travel Dashboard / My Trips** — `MyTrips.vue` splits bookings into
    *Upcoming* (confirmed and in the future) and *Previous & Cancelled*,
    showing destination, hotel, dates, guests and status. Trips can be
    cancelled.

---

## 6. Vue concepts used (with examples)

| Concept        | Where | Example |
| -------------- | ----- | ------- |
| `ref()`        | Destinations, Navbar, forms | `const searchText = ref('')` |
| `reactive()`   | Booking, Login, Contact    | `const form = reactive({ email: '' })` |
| `computed()`   | Destinations, Booking      | computed list after `.filter()` |
| `watch()`      | Navbar (theme), Destinations (route query) | react to a changed value |
| `onMounted()`  | Destinations, Booking      | run code once when the page loads |
| `v-if / v-else` | Favorites empty state, dark-mode icons, loading vs content | |
| `v-for`        | everywhere grids/options are rendered | |
| `v-model`      | SearchBar, forms, selects  | two-way input binding |
| `:class`       | Navbar active link, toast icon colors | dynamic classes |
| `:src`         | all images, avatars, gallery | dynamic image URL |
| `@click`       | buttons, hearts, toggles   | |
| `@submit.prevent` | Booking, Contact, Login  | handle submit without reloading |

Header comment in each file explains *what* it does and *why*.

---

## 7. Vue Router

Defined in `src/router/index.ts`. Routes map a URL to a view:

```
/                   Home
/destinations       Destinations
/destination/:id    Destination details   e.g. /destination/1, /destination/2
/hotels             Hotels
/hotel/:id          Hotel details          e.g. /hotel/3
/activities         Activities
/activity/:id       Activity details
/favorites          Favorites
/booking            Booking form
/login              Login
/profile            Profile
/my-trips           My Trips dashboard
/about              About
/contact            Contact
```

**Dynamic routes** — the `:id` part of the path is a placeholder. Any URL
like `/destination/5` matches the same page component; the page reads the
value with `useRoute().params.id`, converts it to a number and uses it to
look up the right item from the data file. That is why one component can
show a different destination for every id.

---

## 8. Pinia

Pinia keeps **global state** that any component can read or change.
The three stores:

- **favoriteStore** — `favorites` array, `toggleFavorite()`, `isFavorite()`,
  `favoriteCount`.
- **authStore** — `user`, `login()`, `logout()`, `updateProfile()`,
  `getRememberedEmail()`.
- **bookingStore** — `bookings`, `addBooking()`, `cancelBooking()`,
  `removeBooking()`, `nights()`.

Stores are used inside a component like this:

```ts
import { useFavoriteStore } from '../stores/favoriteStore'
const favoriteStore = useFavoriteStore()

favoriteStore.toggleFavorite(destination) // any component sees the change
```

Because all pages use the *same* store instance, toggling a heart on one
page instantly updates the navbar badge and the Favorites page.

---

## 9. localStorage

`localStorage` is a small key-value store every browser has. It survives
page reloads, but it can only hold **strings**. That is why we use:

- `JSON.stringify(favorites)` — turn the array into a string **before saving**.
- `JSON.parse(raw)` — turn the string back into an array **after loading**.

The demo uses these storage keys:

| Key                     | Stores          |
| ----------------------- | --------------- |
| `favoriteDestinations`  | Favorite destinations |
| `authUser`              | Logged-in user  |
| `rememberedEmail`       | "Remember me" email |
| `demoBookings`          | Bookings        |
| `theme`                 | `dark` or `light` |

Both stores use a `loadFromStorage()` + `saveToStorage()` pattern wrapped
in `try/catch` so corrupted data never crashes the app.

> In a real app you would use a backend API and a database. Here
> localStorage simulates persistence so beginners learn the pattern
> without any server.

---

## 10. Icons

All icons come from `@lucide/vue` (the successor of `lucide-vue-next`,
imported as:

```ts
import { Search, Heart, MapPin } from '@lucide/vue'
```

There are **no emoji icons** anywhere. Brand/logo icons (Facebook,
Instagram, Twitter) were removed from Lucide, so the footer uses
`Globe`, `AtSign`, `Share2` and `Send` instead.

---

## 11. Running the project

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. Try:

1. Search **"Paris"** on the home page or the destinations page.
2. Click a category chip (e.g. *Beaches*) to filter.
3. Open a destination, tap the ❤ (heart) to favorite it, check the navbar
   badge and then the **Favorites** page.
4. Open a hotel, pick a room, click **Book This Room**, fill the form and
   confirm - then check **My Trips**.
5. Log in from the navbar (any email + password with 4+ characters) and
   enjoy the welcome toast, then edit your profile.
6. Toggle the Sun/Moon icon to switch between light and dark mode (the
   choice is remembered).

For a production build:

```bash
npm run build     # type-check + build into /dist
npm run preview   # serve the built files
```

---

## Customization tips for beginners

- **Add a destination**: copy one object in `src/data/destinations.ts`,
  give it a new `id` and a new `image` URL.
- **Change the colors**: replace `teal` classes with another Tailwind color
  like `sky` or `violet` (e.g. `bg-teal-600` → `bg-sky-600`).
- **Add a page**: create a view in `src/views/`, register a route in
  `src/router/index.ts`, and add a link in `Navbar.vue`/`Footer.vue`.