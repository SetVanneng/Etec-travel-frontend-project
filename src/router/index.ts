// ---------------------------------------------------------------------------
// router/index.ts
// Vue Router maps URLs to View components.
//
// Static routes look like this:        /destinations
// Dynamic routes have a ":id" part:    /destination/:id   (e.g. /destination/5)
// The value of :id is available as route.params.id inside the page.
// ---------------------------------------------------------------------------
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

// Lazy loading: the view file is only downloaded when its route is opened.
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/destinations', name: 'destinations', component: () => import('../views/Destinations.vue') },
  { path: '/destination/:id', name: 'destination-details', component: () => import('../views/DestinationDetails.vue') },
  { path: '/hotels', name: 'hotels', component: () => import('../views/Hotels.vue') },
  { path: '/hotel/:id', name: 'hotel-details', component: () => import('../views/HotelDetails.vue') },
  { path: '/activities', name: 'activities', component: () => import('../views/Activities.vue') },
  { path: '/activity/:id', name: 'activity-details', component: () => import('../views/ActivityDetails.vue') },
  { path: '/airlines', name: 'airlines', component: () => import('../views/Airlines.vue') },
  { path: '/airline-booking', name: 'airline-booking', component: () => import('../views/AirlineBooking.vue') },
  { path: '/favorites', name: 'favorites', component: () => import('../views/Favorites.vue') },
  { path: '/booking', name: 'booking', component: () => import('../views/Booking.vue') },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  { path: '/profile', name: 'profile', component: () => import('../views/Profile.vue') },
  { path: '/my-trips', name: 'my-trips', component: () => import('../views/MyTrips.vue') },
  { path: '/about', name: 'about', component: () => import('../views/About.vue') },
  { path: '/contact', name: 'contact', component: () => import('../views/Contact.vue') },
  // Catch-all: any unknown URL goes to the home page.
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Every time we navigate, scroll back to the top of the page.
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router