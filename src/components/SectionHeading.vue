<script setup lang="ts">
// SectionHeading.vue
// Small reusable heading for page sections.
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-8 text-center">
    <h2 class="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">{{ title }}</h2>
    <p v-if="subtitle" class="mx-auto mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
      {{ subtitle }}
    </p>
  </div>
</template>