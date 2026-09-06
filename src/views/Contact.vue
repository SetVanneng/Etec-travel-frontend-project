<script setup lang="ts">
// Contact.vue
// Contact form (frontend only). Shows a success notification on submit.
import { reactive } from 'vue'
import { User, Mail, Tag, MessageSquare, Send, MapPin } from '@lucide/vue'
import { useI18nStore } from '../stores/i18n'
import { notify } from '../utils/toast'

const i18n = useI18nStore()

// reactive() groups all form fields into one reactive object.
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// The subjects offered in the dropdown. Kept in English (raw values) and
// displayed through i18n.subject* keys so they stay translatable.
const subjects = ['Feedback', 'Partnership', 'Support', 'Other']

function subjectLabel(subject: string): string {
  const key =
    subject === 'Feedback'
      ? 'contact.subjectFeedback'
      : subject === 'Partnership'
        ? 'contact.subjectPartnership'
        : subject === 'Support'
          ? 'contact.subjectSupport'
          : 'contact.subjectOther'
  return i18n.t(key)
}

function submitMessage(): void {
  // Simple validation (frontend only).
  if (!form.name || !form.email.includes('@') || !form.subject || !form.message) {
    notify(i18n.t('contact.errFillAll'), 'error')
    return
  }

  // Real success notification as required.
  notify(i18n.t('contact.messageSent'))

  // Reset the form after sending.
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">{{ i18n.t('contact.title') }}</h1>
      <p class="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {{ i18n.t('contact.subtitle') }}
      </p>
    </div>

    <div class="grid gap-10 md:grid-cols-5">
      <!-- Contact info side -->
      <aside class="md:col-span-2">
        <div data-aos="fade-right" class="rounded-2xl bg-slate-900 p-6 text-slate-300">
          <h2 class="text-lg font-bold text-white">{{ i18n.t('contact.asideTitle') }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-400">
            {{ i18n.t('contact.asideText') }}
          </p>

          <ul class="mt-6 space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <MapPin :size="18" class="mt-0.5 shrink-0 text-teal-400" />
              123 Wanderlust Street, Dream City, DW 0001
            </li>
            <li class="flex items-center gap-3">
              <Mail :size="18" class="shrink-0 text-teal-400" />
              hello@travelexplore.demo
            </li>
          </ul>

          <div class="mt-8 rounded-xl bg-slate-800 p-4">
            <p class="text-xs uppercase tracking-wider text-slate-500">{{ i18n.t('contact.officeHours') }}</p>
            <p class="mt-1.5 text-sm">{{ i18n.t('contact.officeHoursValue') }}</p>
          </div>
        </div>
      </aside>

      <!-- Form -->
      <form
        data-aos="fade-left"
        class="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        @submit.prevent="submitMessage"
      >
        <div class="grid gap-5 sm:grid-cols-2">
          <label class="block">
            <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <User :size="16" class="text-teal-600 dark:text-teal-400" /> {{ i18n.t('contact.name') }}
            </span>
            <input
              v-model="form.name"
              type="text"
              :placeholder="i18n.t('contact.yourName')"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </label>

          <label class="block">
            <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Mail :size="16" class="text-teal-600 dark:text-teal-400" /> {{ i18n.t('contact.email') }}
            </span>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </label>
        </div>

        <label class="mt-5 block">
          <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Tag :size="16" class="text-teal-600 dark:text-teal-400" /> {{ i18n.t('contact.subject') }}
          </span>
          <select
            v-model="form.subject"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="" disabled>{{ i18n.t('contact.chooseSubject') }}</option>
            <option v-for="subject in subjects" :key="subject" :value="subject">{{ subjectLabel(subject) }}</option>
          </select>
        </label>

        <label class="mt-5 block">
          <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <MessageSquare :size="16" class="text-teal-600 dark:text-teal-400" /> {{ i18n.t('contact.message') }}
          </span>
          <textarea
            v-model="form.message"
            rows="5"
            :placeholder="i18n.t('contact.messagePlaceholder')"
            class="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </label>

        <button
          type="submit"
          class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
        >
          <Send :size="18" />
          {{ i18n.t('contact.sendMessage') }}
        </button>
      </form>
    </div>
  </div>
</template>