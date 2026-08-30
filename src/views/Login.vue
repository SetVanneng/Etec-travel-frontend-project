<script setup lang="ts">
// Login.vue
// Demo login page. Any email + password works because there is no backend.
// After login a toast shows: "Hello, [username]! Welcome to Travel & Explore."
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Mail, Lock, Eye, EyeOff, LogIn, Compass } from '@lucide/vue'
import { useAuthStore } from '../stores/authStore'
import { notify } from '../utils/toast'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

// Whether the password is currently visible (eye icon toggle).
const showPassword = ref(false)

// Prefill the email if the user checked "remember me" before.
onMounted(() => {
  form.email = authStore.getRememberedEmail()
})

function submitLogin(): void {
  // Simple demo validation (there is no real authentication).
  if (!form.email.includes('@') || form.password.length < 4) {
    notify('Enter a valid email and a password with at least 4 characters.', 'error')
    return
  }

  authStore.login(form.email, form.password, form.remember)

  // The welcome message required by the task.
  notify(`Hello, ${form.email.split('@')[0]}! Welcome to Travel & Explore.`)

  // Go back to where the user was, or to the profile page.
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/profile'
  router.push(redirect)
}
</script>

<template>
  <div class="mx-auto flex max-w-lg flex-col px-4 py-16 sm:px-6">
    <div class="mb-6 text-center">
      <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-soft">
        <Compass :size="28" />
      </span>
      <h1 class="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Demo login - enter any email and a password (min 4 characters).
      </p>
    </div>

    <form
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 dark:border-slate-800 dark:bg-slate-900"
      @submit.prevent="submitLogin"
    >
      <!-- Email -->
      <label class="block">
        <span class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
        <div class="relative">
          <Mail :size="18" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </label>

      <!-- Password with show/hide -->
      <label class="mt-5 block">
        <span class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</span>
        <div class="relative">
          <Lock :size="18" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Your password"
            class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" :size="18" />
            <Eye v-else :size="18" />
          </button>
        </div>
      </label>

      <!-- Remember me -->
      <label class="mt-4 flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <input
          v-model="form.remember"
          type="checkbox"
          class="h-4 w-4 rounded accent-teal-600"
        />
        Remember me
      </label>

      <button
        type="submit"
        class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
      >
        <LogIn :size="18" />
        Login
      </button>
    </form>

    <p class="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
      Tip: after logging in you can edit your profile and view your trips.
    </p>
  </div>
</template>