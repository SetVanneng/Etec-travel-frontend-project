<script setup lang="ts">
// Login.vue
// Login page. Only registered accounts can log in (see authStore). Users
// without an account are pointed to the /register page.
// After login a toast shows: "Hello, [username]! Welcome to Travel & Explore."
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Mail, Lock, Eye, EyeOff, LogIn, Compass } from '@lucide/vue'
import { useAuthStore } from '../stores/authStore'
import { useI18nStore } from '../stores/i18n'
import { notify } from '../utils/toast'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const i18n = useI18nStore()

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
  // Basic validation before checking the registered accounts.
  if (!form.email.includes('@') || form.password.length < 4) {
    notify(i18n.t('auth.errValid'), 'error')
    return
  }

  const result = authStore.login(form.email, form.password, form.remember)
  if (!result.ok) {
    notify(i18n.t(result.message), 'error')
    return
  }

  // The welcome message required by the task.
  notify(i18n.t('auth.welcome', { name: authStore.user?.name ?? '' }))

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
      <h1 class="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{{ i18n.t('auth.welcomeBack') }}</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {{ i18n.t('auth.loginSubtitle') }}
      </p>
    </div>

    <form
      data-aos="fade-up"
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 dark:border-slate-800 dark:bg-slate-900"
      @submit.prevent="submitLogin"
    >
      <!-- Email -->
      <label class="block">
        <span class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">{{ i18n.t('auth.email') }}</span>
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
        <span class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">{{ i18n.t('auth.password') }}</span>
        <div class="relative">
          <Lock :size="18" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="i18n.t('auth.yourPassword')"
            class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
            :aria-label="showPassword ? i18n.t('auth.hidePassword') : i18n.t('auth.showPassword')"
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
        {{ i18n.t('auth.rememberMe') }}
      </label>

      <button
        type="submit"
        class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
      >
        <LogIn :size="18" />
        {{ i18n.t('auth.login') }}
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
      {{ i18n.t('auth.noAccount') }}
      <router-link to="/register" class="font-semibold text-teal-600 transition hover:text-teal-700 dark:text-teal-400">
        {{ i18n.t('auth.register') }}
      </router-link>
    </p>
  </div>
</template>