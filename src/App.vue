<script setup lang="ts">
// App.vue
// The root component. It only lays out the site shell:
// Navbar on top, the current page in the middle, Footer at the bottom
// and the floating toast notifications.
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastHost from './components/ToastHost.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-50 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <Navbar />

    <!-- <router-view> renders the component matching the current URL. -->
    <main class="flex-1">
      <router-view />
    </main>

    <Footer />

    <!-- Floating success / error / info notifications. -->
    <ToastHost />
  </div>
</template>