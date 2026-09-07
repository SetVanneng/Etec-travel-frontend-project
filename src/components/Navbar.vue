<script setup lang="ts">
// Navbar.vue
// Responsive navigation bar with: logo, links, favorites badge,
// dark/light theme toggle and login / profile button.
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Heart, Sun, Moon, Menu, X, LogIn, Languages } from '@lucide/vue'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useAuthStore } from '../stores/authStore'
import { useI18nStore } from '../stores/i18n'

const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()
const i18n = useI18nStore()
const route = useRoute()
const router = useRouter()

// When "mobileOpen" is true the hamburger menu is shown on small screens.
const mobileOpen = ref(false)

// Closing the mobile menu whenever the route changes keeps it in sync.
watch(() => route.fullPath, closeMenu)

// Close the menu with the Escape key.
function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeMenu()
}

// Close the menu when clicking/tapping outside of the header.
function onClickOutside(event: MouseEvent): void {
  const el = document.getElementById('navbar')
  if (el && !el.contains(event.target as Node)) closeMenu()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onClickOutside)
})

// Theme state starts from whatever index.html already applied,
// so there is no flash of the wrong theme.
const isDark = ref(document.documentElement.classList.contains('dark'))

// watch() runs the function every time isDark changes.
watch(isDark, (value) => {
  // Toggle the "dark" class on <html> so Tailwind switches all dark: styles.
  document.documentElement.classList.toggle('dark', value)
  // Remember the choice for the next visit.
  localStorage.setItem('theme', value ? 'dark' : 'light')
})

// The links shown in the middle of the navbar.
// "labelKey" points at a translation key; "path" is the route.
const navLinks = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.destinations', path: '/destinations' },
  { labelKey: 'nav.hotels', path: '/hotels' },
  { labelKey: 'nav.activities', path: '/activities' },
  { labelKey: 'nav.airlines', path: '/airlines' },
  { labelKey: 'nav.favorites', path: '/favorites' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.contact', path: '/contact' },
]

// Small helper: returns true when a link belongs to the current page.
function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

// Highlighted style for the current page link.
const activeClasses = 'text-teal-600 dark:text-teal-400 font-semibold'
const normalClasses = 'text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400'

function closeMenu(): void {
  mobileOpen.value = false
}
</script>

<template>
  <header id="navbar" class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:gap-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2" @click="closeMenu">
        <img src="/logo.jpg" alt="Logo" class="h-10 w-10 rounded-xl object-cover shadow-soft" />
        <span class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          {{ i18n.t('app.name') }}
        </span>
      </router-link>

      <!-- Desktop links (hidden on small screens) -->
      <div class="hidden items-center gap-1 lg:flex">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="relative rounded-lg px-3 py-2 text-sm transition"
          :class="isActive(link.path) ? activeClasses : normalClasses"
        >
          {{ i18n.t(link.labelKey) }}
          <!-- Favorites count badge (only on the Favorites link) -->
          <span
            v-if="link.path === '/favorites' && favoriteStore.favoriteCount > 0"
            class="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white"
          >
            {{ favoriteStore.favoriteCount }}
          </span>
        </router-link>
      </div>

      <!-- Right side: theme toggle + language + login/profile -->
      <div class="flex items-center gap-2">
        <!-- Language toggle (shown on desktop where links are visible) -->
        <button
          type="button"
          class="hidden h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 lg:flex dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          :aria-label="i18n.t('nav.toggleLanguage')"
          :title="i18n.t('nav.toggleLanguage')"
          @click="i18n.setLocale(i18n.locale === 'km' ? 'en' : 'km')"
        >
          <Languages :size="18" class="text-teal-600 dark:text-teal-400" />
          <span v-if="i18n.locale === 'km'">🇰🇭 ខ្មែរ</span>
          <span v-else>🇬🇧 English</span>
        </button>

        <!-- Dark / light mode toggle -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          :aria-label="isDark ? i18n.t('nav.toggleThemeLight') : i18n.t('nav.toggleThemeDark')"
          @click="isDark = !isDark"
        >
          <Sun v-if="!isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>

        <!-- Login button OR profile avatar -->
        <router-link
          v-if="!authStore.isLoggedIn()"
          to="/login"
          class="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-teal-700"
        >
          <LogIn :size="18" />
          <span class="hidden sm:inline">{{ i18n.t('nav.login') }}</span>
        </router-link>
        <router-link
          v-else
          to="/profile"
          class="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          :title="authStore.user?.name"
        >
          <img
            :src="authStore.user?.avatar"
            :alt="authStore.user?.name"
            class="h-9 w-9 rounded-full border-2 border-teal-500 object-cover"
          />
        </router-link>

        <!-- Hamburger button for mobile screens -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          :aria-label="i18n.t('nav.toggleMenu')"
          @click.stop="mobileOpen = !mobileOpen"
        >
          <Menu v-if="!mobileOpen" :size="20" />
          <X v-else :size="20" />
        </button>
      </div>
    </nav>

    <!-- Mobile dropdown menu (v-if / v-else example) -->
    <transition name="menu">
      <div
        v-if="mobileOpen"
        class="border-t border-slate-200 bg-white px-4 pb-4 pt-2 lg:hidden dark:border-slate-800 dark:bg-slate-900"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition"
          :class="isActive(link.path) ? activeClasses : normalClasses"
          @click="closeMenu"
        >
          <span>
            {{ i18n.t(link.labelKey) }}
            <span
              v-if="link.path === '/favorites' && favoriteStore.favoriteCount > 0"
              class="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white"
            >
              <Heart :size="12" class="mr-0.5" />{{ favoriteStore.favoriteCount }}
            </span>
          </span>
        </router-link>

        <!-- Language switcher inside the mobile menu, styled like the desktop one -->
        <div class="mt-2 border-t border-slate-200 pt-3 dark:border-slate-800">
          <button
            type="button"
            class="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            :aria-label="i18n.t('nav.toggleLanguage')"
            @click="i18n.setLocale(i18n.locale === 'km' ? 'en' : 'km')"
          >
            <Languages :size="18" class="text-teal-600 dark:text-teal-400" />
            <span v-if="i18n.locale === 'km'">🇰🇭 ខ្មែរ</span>
            <span v-else>🇬🇧 English</span>
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
  max-height: 0;
  overflow: hidden;
}

.menu-enter-to,
.menu-leave-from {
  max-height: 500px;
}
</style>