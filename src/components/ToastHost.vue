<script setup lang="ts">
// ToastHost.vue
// Displays the little notifications (toasts) created by utils/toast.ts.
// Each toast shows an icon depending on its type: success / error / info.
import { Check, AlertCircle, Info, X } from '@lucide/vue'
import { toasts, removeToast } from '../utils/toast'
import type { ToastType } from '../utils/toast'

// Pick the right icon and color for each toast type.
const styles: Record<ToastType, { icon: typeof Check; class: string }> = {
  success: { icon: Check, class: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400' },
  error: { icon: AlertCircle, class: 'bg-rose-100 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400' },
  info: { icon: Info, class: 'bg-sky-100 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400' },
}
</script>

<template>
  <!-- Fixed container pinned to the top-right corner of the screen -->
  <div class="pointer-events-none fixed right-4 top-20 z-50 flex w-full max-w-sm flex-col gap-2 px-4">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-800"
      >
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="styles[toast.type].class">
          <component :is="styles[toast.type].icon" :size="16" />
        </span>
        <p class="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{{ toast.message }}</p>
        <button
          type="button"
          class="shrink-0 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Dismiss notification"
          @click="removeToast(toast.id)"
        >
          <X :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* Fade + slide animation for the toast messages. */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>