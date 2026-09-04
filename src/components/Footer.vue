<script setup lang="ts">
// Footer.vue
// Simple site footer with quick links, popular destinations and contact info.
import { Plane, MapPin, Mail, Phone, Globe, AtSign, Share2, Send } from '@lucide/vue'
import { destinations } from '../data/destinations'

const socials = [
  { name: 'Website', icon: Globe },
  { name: 'Email', icon: AtSign },
  { name: 'Share', icon: Share2 },
  { name: 'Newsletter', icon: Send },
]

const contactItems = [
  { icon: MapPin, text: '123 Wanderlust Street, Dream City, DW 0001' },
  { icon: Mail, text: 'hello@travelexplore.demo' },
  { icon: Phone, text: '+885 975576908' },
]
</script>

<template>
  <footer class="mt-auto border-t border-slate-800 bg-slate-900 text-slate-300">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-2">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
            <Plane :size="22" />
          </span>
          <span class="text-lg font-bold text-white">Travel &amp; Explore</span>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-slate-400">
          Discover amazing destinations, book great hotels and try unforgettable
          activities - all in one place.
        </p>
        <div class="mt-4 flex gap-2">
          <a
            v-for="item in socials"
            :key="item.name"
            href="#"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-teal-500 hover:text-teal-400"
            :aria-label="item.name"
          >
            <component :is="item.icon" :size="16" />
          </a>
        </div>
      </div>

      <!-- Quick links -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><router-link to="/" class="transition hover:text-teal-400">Home</router-link></li>
          <li><router-link to="/destinations" class="transition hover:text-teal-400">Destinations</router-link></li>
          <li><router-link to="/hotels" class="transition hover:text-teal-400">Hotels</router-link></li>
          <li><router-link to="/activities" class="transition hover:text-teal-400">Activities</router-link></li>
          <li><router-link to="/airlines" class="transition hover:text-teal-400">Airlines</router-link></li>
          <li><router-link to="/my-trips" class="transition hover:text-teal-400">My Trips</router-link></li>
        </ul>
      </div>

      <!-- Popular destinations -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Popular Destinations</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="destination in destinations.slice(0, 5)" :key="destination.id">
            <router-link
              :to="`/destination/${destination.id}`"
              class="transition hover:text-teal-400"
            >
              {{ destination.name }}, {{ destination.country }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="item in contactItems" :key="item.text" class="flex items-start gap-3">
            <component :is="item.icon" :size="18" class="mt-0.5 shrink-0 text-teal-400" />
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
      &copy; {{ new Date().getFullYear() }} Travel &amp; Explore. A frontend-only demo project. All data is mock.
    </div>
  </footer>
</template>