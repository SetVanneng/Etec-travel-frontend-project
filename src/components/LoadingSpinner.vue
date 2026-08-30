<script setup lang="ts">
// LoadingSpinner.vue
// Shown while a page is "loading". In this demo the loading is simulated
// with setTimeout(), but the same component would be used with real APIs.
import { Loader2 } from '@lucide/vue'

defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-20 text-slate-500 dark:text-slate-400">
    <Loader2 :size="36" class="animate-spin text-teal-600 dark:text-teal-400" />
    <p class="text-sm font-medium">{{ text ?? 'Loading...' }}</p>
  </div>
</template>