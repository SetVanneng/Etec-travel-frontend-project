<script setup lang="ts">
// ReviewSection.vue
// Shows reviews for one destination, hotel or activity plus a form to post
// a new review (login required, one review per user per item).
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Star, Send, MessageSquare, LogIn, Trash2, CheckCircle2 } from '@lucide/vue'
import type { ReviewTargetType } from '../stores/reviewStore'
import { useReviewStore } from '../stores/reviewStore'
import { useAuthStore } from '../stores/authStore'
import { useI18nStore } from '../stores/i18n'
import { notify } from '../utils/toast'

const props = defineProps<{
  targetType: ReviewTargetType
  targetId: number
}>()

const router = useRouter()
const reviewStore = useReviewStore()
const authStore = useAuthStore()
const i18n = useI18nStore()

const list = computed(() => reviewStore.reviewsFor(props.targetType, props.targetId))
const average = computed(() => reviewStore.averageFor(props.targetType, props.targetId))
const canReview = computed(() => reviewStore.canReview(props.targetType, props.targetId))

// New-review form state.
const rating = ref(0)
const text = ref('')

// The HTML5 date input needs a plain string, so we format the ISO date once.
function formattedDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(i18n.locale === 'km' ? 'km-KH' : 'en-GB', {
    dateStyle: 'medium',
  }).format(date)
}

// Render a row of stars for a review (filled up to its rating).
function stars(count: number): boolean[] {
  return Array.from({ length: 5 }, (_, index) => index + 1 <= count)
}

function goToLogin(): void {
  const redirect =
    props.targetType === 'hotel'
      ? `/hotel/${props.targetId}`
      : props.targetType === 'activity'
        ? `/activity/${props.targetId}`
        : `/destination/${props.targetId}`
  router.push({ path: '/login', query: { redirect } })
}

function submit(): void {
  const result = reviewStore.addReview(props.targetType, props.targetId, rating.value, text.value)
  if (result.ok) {
    notify(i18n.t('reviews.posted'), 'success')
    rating.value = 0
    text.value = ''
  } else {
    notify(i18n.t(result.message ?? 'reviews.validation'), 'error')
  }
}

function remove(reviewId: number): void {
  reviewStore.removeReview(reviewId)
  notify(i18n.t('reviews.removed'), 'info')
}
</script>

<template>
  <section class="mt-14">
    <h2 class="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
      <MessageSquare :size="22" class="text-teal-600 dark:text-teal-400" />
      {{ i18n.t('reviews.title') }}
    </h2>

    <!-- Summary -->
    <div v-if="average !== null" class="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <span class="flex items-center gap-1 text-2xl font-extrabold text-slate-900 dark:text-white">
        {{ average.toFixed(1) }}
        <Star :size="22" class="fill-amber-500 text-amber-500" />
      </span>
      <span class="text-sm text-slate-500 dark:text-slate-400">
        {{
          list.length === 1
            ? i18n.t('reviews.basedOnOne', { count: String(list.length) })
            : i18n.t('reviews.basedOn', { count: String(list.length) })
        }}
      </span>
    </div>

    <!-- Review form -->
    <div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/40">
      <template v-if="!authStore.isLoggedIn()">
        <div class="flex flex-col items-center gap-3 py-4 text-center">
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ i18n.t('reviews.loginFirst') }}</p>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            @click="goToLogin"
          >
            <LogIn :size="16" />
            {{ i18n.t('nav.login') }}
          </button>
        </div>
      </template>

      <template v-else-if="!canReview">
        <p class="flex items-center justify-center gap-2 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <CheckCircle2 :size="18" class="text-teal-600 dark:text-teal-400" />
          {{ i18n.t('reviews.alreadyReviewed') }}
        </p>
      </template>

      <form v-else class="space-y-4" @submit.prevent="submit">
        <div>
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ i18n.t('reviews.ratingLabel') }}</p>
          <div class="mt-2 flex items-center gap-1">
            <button
              v-for="value in 5"
              :key="value"
              type="button"
              class="transition hover:scale-110"
              :aria-label="`${value} stars`"
              @click="rating = value"
            >
              <Star
                :size="26"
                :class="value <= rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300 dark:text-slate-600'"
              />
            </button>
          </div>
        </div>

        <div>
          <label for="review-text" class="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {{ i18n.t('reviews.commentLabel') }}
          </label>
          <textarea
            id="review-text"
            v-model="text"
            rows="3"
            maxlength="400"
            :placeholder="i18n.t('reviews.commentPlaceholder')"
            class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          ></textarea>
        </div>

        <button
          type="submit"
          class="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <Send :size="16" />
          {{ i18n.t('reviews.submit') }}
        </button>
      </form>
    </div>

    <!-- Review list -->
    <div v-if="list.length > 0" class="mt-6 space-y-4">
      <article
        v-for="review in list"
        :key="review.id"
        class="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
      >
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
              {{ review.author.charAt(0).toUpperCase() }}
            </span>
            <div>
              <p class="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                {{ review.author }}
                <span
                  v-if="review.author === authStore.user?.name"
                  class="rounded-full bg-teal-600/10 px-2 py-0.5 text-xs font-medium text-teal-700 dark:text-teal-300"
                >
                  {{ i18n.t('reviews.byYou') }}
                </span>
              </p>
              <p class="text-xs text-slate-400 dark:text-slate-500">{{ formattedDate(review.date) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="flex items-center gap-0.5">
              <Star
                v-for="(filled, index) in stars(review.rating)"
                :key="index"
                :size="15"
                :class="filled ? 'fill-amber-500 text-amber-500' : 'text-slate-300 dark:text-slate-600'"
              />
            </span>
            <button
              v-if="review.author === authStore.user?.name"
              type="button"
              class="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/30"
              :aria-label="i18n.t('reviews.remove')"
              :title="i18n.t('reviews.remove')"
              @click="remove(review.id)"
            >
              <Trash2 :size="15" />
            </button>
          </div>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ review.text }}</p>
      </article>
    </div>

    <!-- Empty state -->
    <p v-else class="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
      {{ i18n.t('reviews.empty') }}
    </p>
  </section>
</template>