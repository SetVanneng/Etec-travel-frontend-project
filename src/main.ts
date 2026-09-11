// ---------------------------------------------------------------------------
// main.ts
// The entry point of the whole application.
// - createApp() builds the Vue application.
// - Pinia handles global state (favorites, auth, bookings).
// - router handles page navigation.
// - Then we mount the app into the <div id="app"> in index.html.
// ---------------------------------------------------------------------------
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './assets/styles/main.css'
import 'leaflet/dist/leaflet.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 450,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
  startEvent: 'DOMContentLoaded',
  throttleDelay: 40,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
