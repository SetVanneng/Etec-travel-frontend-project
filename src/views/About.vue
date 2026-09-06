<script setup lang="ts">
// About.vue
// Introduction, mission, why choose us, statistics and the team.
import { Target, HeartHandshake, Globe, Users, TrendingUp, Award, ShieldCheck, Plane } from '@lucide/vue'
import SectionHeading from '../components/SectionHeading.vue'
import { useI18nStore } from '../stores/i18n'

const i18n = useI18nStore()

const missionPoints = [
  {
    icon: Target,
    titleKey: 'about.missionTitle',
    textKey: 'about.missionText',
  },
  {
    icon: HeartHandshake,
    titleKey: 'about.careTitle',
    textKey: 'about.careText',
  },
]

// "Why choose us" cards.
const reasons = [
  {
    icon: Globe,
    titleKey: 'about.reason1Title',
    textKey: 'about.reason1Text',
  },
  {
    icon: ShieldCheck,
    titleKey: 'about.reason2Title',
    textKey: 'about.reason2Text',
  },
  {
    icon: Users,
    titleKey: 'about.reason3Title',
    textKey: 'about.reason3Text',
  },
]

// Travel statistics (demo numbers).
const stats = [
  { icon: Plane, value: '12', labelKey: 'about.statDestinations' },
  { icon: Globe, value: '8', labelKey: 'about.statCountries' },
  { icon: Users, value: '250K+', labelKey: 'about.statTravellers' },
  { icon: TrendingUp, value: '4.8/5', labelKey: 'about.statRating' },
]

// Team members (mock data).
const team = [
  { name: 'Kapepelele', roleKey: 'about.roleFounder', color: 'bg-rose-500' },
  { name: 'Van Neng', roleKey: 'about.roleEditor', color: 'bg-teal-500' },
  { name: 'Ley Jesda', roleKey: 'about.roleDesigner', color: 'bg-sky-500' },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <SectionHeading
      :title="i18n.t('about.title')"
      :subtitle="i18n.t('about.subtitle')"
    />

    <!-- Intro -->
    <div data-aos="fade-up" class="overflow-hidden rounded-3xl bg-slate-900">
      <div class="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ i18n.t('about.introTitle') }}</h2>
          <p class="mt-4 leading-relaxed text-slate-300">
            {{ i18n.t('about.intro1') }}
          </p>
          <p class="mt-3 leading-relaxed text-slate-400">
            {{ i18n.t('about.intro2') }}
          </p>
        </div>
        <div class="rounded-2xl bg-slate-800 p-6">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
            :alt="i18n.t('about.imgAlt')"
            class="h-64 w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Mission -->
    <div class="mt-10 grid gap-6 sm:grid-cols-2">
      <div v-for="item in missionPoints" :key="item.titleKey" data-aos="fade-up" class="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600/10 text-teal-600 dark:text-teal-400">
          <component :is="item.icon" :size="24" />
        </span>
        <h3 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">{{ i18n.t(item.titleKey) }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ i18n.t(item.textKey) }}</p>
      </div>
    </div>

    <!-- Statistics -->
    <section class="mt-10 rounded-3xl bg-teal-600 px-6 py-10">
      <div class="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="item in stats" :key="item.labelKey" data-aos="fade-up">
          <component :is="item.icon" :size="28" class="mx-auto text-teal-100" />
          <p class="mt-2 text-3xl font-extrabold text-white">{{ item.value }}</p>
          <p class="text-sm text-teal-100">{{ i18n.t(item.labelKey) }}</p>
        </div>
      </div>
    </section>

    <!-- Why choose us -->
    <section class="mt-16">
      <SectionHeading :title="i18n.t('about.whyTitle')" :subtitle="i18n.t('about.whySubtitle')" />
      <div class="grid gap-6 sm:grid-cols-3">
        <div v-for="item in reasons" :key="item.titleKey" data-aos="fade-up" class="rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
          <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-600 dark:text-teal-400">
            <component :is="item.icon" :size="26" />
          </span>
          <h3 class="mt-4 font-bold text-slate-900 dark:text-white">{{ i18n.t(item.titleKey) }}</h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ i18n.t(item.textKey) }}</p>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="mt-16">
      <SectionHeading :title="i18n.t('about.teamTitle')" :subtitle="i18n.t('about.teamSubtitle')" />
      <div class="grid gap-6 sm:grid-cols-3">
        <div v-for="member in team" :key="member.name" data-aos="fade-up" class="rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
          <span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white" :class="member.color">
            {{ member.name.split(' ').map((part) => part[0]).join('') }}
          </span>
          <h3 class="mt-4 font-bold text-slate-900 dark:text-white">{{ member.name }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ i18n.t(member.roleKey) }}</p>
          <p class="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
            <Award :size="12" /> {{ i18n.t('about.travelExpert') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>