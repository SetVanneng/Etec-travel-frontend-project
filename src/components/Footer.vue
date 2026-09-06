<script setup lang="ts">
// Footer.vue
// Simple site footer with quick links, popular destinations and contact info.
import { Plane, MapPin, Mail, Phone, Globe, AtSign, Share2, Send } from '@lucide/vue'
import { destinations } from '../data/destinations'
import { useI18nStore } from '../stores/i18n'

const i18n = useI18nStore()

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
          <span class="text-lg font-bold text-white">{{ i18n.t('app.name') }}</span>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-slate-400">
          {{ i18n.t('footer.tagline') }}
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
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">{{ i18n.t('footer.quickLinks') }}</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><router-link to="/" class="transition hover:text-teal-400">{{ i18n.t('nav.home') }}</router-link></li>
          <li><router-link to="/destinations" class="transition hover:text-teal-400">{{ i18n.t('nav.destinations') }}</router-link></li>
          <li><router-link to="/hotels" class="transition hover:text-teal-400">{{ i18n.t('nav.hotels') }}</router-link></li>
          <li><router-link to="/activities" class="transition hover:text-teal-400">{{ i18n.t('nav.activities') }}</router-link></li>
          <li><router-link to="/airlines" class="transition hover:text-teal-400">{{ i18n.t('nav.airlines') }}</router-link></li>
          <li><router-link to="/my-trips" class="transition hover:text-teal-400">{{ i18n.t('nav.myTrips') }}</router-link></li>
        </ul>
      </div>

      <!-- Popular destinations -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">{{ i18n.t('footer.popularDestinations') }}</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="destination in destinations.slice(0, 5)" :key="destination.id">
            <router-link
              :to="`/destination/${destination.id}`"
              class="transition hover:text-teal-400"
            >
              {{ i18n.pick(destination.name) }}, {{ i18n.t('countries.' + destination.country) }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">{{ i18n.t('footer.contact') }}</h3>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="item in contactItems" :key="item.text" class="flex items-start gap-3">
            <component :is="item.icon" :size="18" class="mt-0.5 shrink-0 text-teal-400" />
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
      &copy; {{ new Date().getFullYear() }} {{ i18n.t('app.name') }}. {{ i18n.t('footer.copyright') }}
    </div>
  </footer>
</template>