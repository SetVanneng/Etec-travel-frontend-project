<script setup lang="ts">
import { useRouter } from 'vue-router'
import { AlertTriangle } from '@lucide/vue'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <span class="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
      <AlertTriangle :size="40" />
    </span>
    <h1 class="mt-6 text-6xl font-extrabold text-slate-900 dark:text-white">404</h1>
    <p class="mt-4 max-w-md text-lg text-slate-500 dark:text-slate-400">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <button
      class="mt-8 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
      @click="router.push('/')"
    >
      Back to Home
    </button>
  </div>
</template>
