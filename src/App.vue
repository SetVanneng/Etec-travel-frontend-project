<script setup lang="ts">
// App.vue
// The root component. It only lays out the site shell:
// Navbar on top, the current page in the middle, Footer at the bottom
// and the floating toast notifications.
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AOS from 'aos'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastHost from './components/ToastHost.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { useI18nStore } from './stores/i18n'

const route = useRoute()
const i18n = useI18nStore()

// Re-scan the DOM after the first page renders and whenever the route changes,
// because AOS only sees elements that exist when it checks the DOM.
const refreshAnimations = () => {
  nextTick(() => AOS.refreshHard())
}
onMounted(refreshAnimations)
watch(() => route.path, refreshAnimations)

// Brief full-screen loading overlay shown while the language / typography
// swaps over. Re-keys the page so it re-renders in the new language.
const isSwitchingLocale = ref(false)
let localeTimer: number | undefined

watch(
  () => i18n.locale,
  () => {
    isSwitchingLocale.value = true
    refreshAnimations()
    if (localeTimer) window.clearTimeout(localeTimer)
    localeTimer = window.setTimeout(() => {
      isSwitchingLocale.value = false
    }, 600)
  },
)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-50 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <Navbar />

    <!-- <router-view> renders the component matching the current URL. -->
    <main class="relative flex-1">
      <!-- Crossfade the page when navigating or switching language. -->
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path + i18n.locale" />
        </Transition>
      </router-view>
    </main>

    <Footer />

    <!-- Floating success / error / info notifications. -->
    <ToastHost />

    <!-- Full-screen loading overlay shown while the language switches. -->
    <Transition name="fade">
      <div
        v-if="isSwitchingLocale"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50/90 backdrop-blur-sm dark:bg-slate-950/90"
      >
        <LoadingSpinner :text="i18n.t('common.loading')" />
      </div>
    </Transition>
  </div>
</template>