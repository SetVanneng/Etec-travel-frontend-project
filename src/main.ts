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
import './assets/styles/main.css'
import 'leaflet/dist/leaflet.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')