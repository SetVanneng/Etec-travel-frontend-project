<script setup lang="ts">
// SearchBar.vue
// A pretty search input. Wiring it with v-model from the parent works like:
//    <SearchBar v-model="searchText" placeholder="Search destinations..." />
//
// defineProps + defineEmits give the v-model behaviour. Vue sends the new
// value to the parent through the "update:modelValue" event.
import { Search, X } from '@lucide/vue'
import { useI18nStore } from '../stores/i18n'

defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const i18n = useI18nStore()

function onInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function clearText(): void {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative w-full">
    <Search :size="20" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
    <input
      :value="modelValue"
      type="text"
      class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-11 text-sm text-slate-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      :placeholder="placeholder ?? i18n.t('common.search')"
      @input="onInput"
    />
    <button
      v-if="modelValue"
      type="button"
      class="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
      :aria-label="i18n.t('common.clearSearch')"
      @click="clearText"
    >
      <X :size="16" />
    </button>
  </div>
</template>