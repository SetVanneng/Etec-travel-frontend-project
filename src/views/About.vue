<script setup lang="ts">
// About.vue
// Introduction, mission, why choose us, statistics and the team.
import { Target, HeartHandshake, Globe, Users, TrendingUp, Award, ShieldCheck, Plane } from '@lucide/vue'
import SectionHeading from '../components/SectionHeading.vue'

const missionPoints = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'Make travel planning simple, inspiring and honest so everyone can explore the world without stress.',
  },
  {
    icon: HeartHandshake,
    title: 'We Care About',
    text: 'Real experiences over tourist traps, clear prices over hidden fees and friendly support at every step.',
  },
]

// "Why choose us" cards.
const reasons = [
  {
    icon: Globe,
    title: '12+ curated destinations',
    text: 'Every place is hand-picked and reviewed so you only see the good stuff.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted and transparent',
    text: 'Honest ratings, real prices and no nasty surprises at checkout.',
  },
  {
    icon: Users,
    title: 'Beginner friendly',
    text: 'Built to be simple. If you can browse, you can plan your whole trip.',
  },
]

// Travel statistics (demo numbers).
const stats = [
  { icon: Plane, value: '12', label: 'Destinations' },
  { icon: Globe, value: '8', label: 'Countries' },
  { icon: Users, value: '250K+', label: 'Travellers helped' },
  { icon: TrendingUp, value: '4.8/5', label: 'Average rating' },
]

// Team members (mock data).
const team = [
  { name: 'Kapepelele', role: 'Founder', color: 'bg-rose-500' },
  { name: 'Van Neng', role: 'Destinations Editor', color: 'bg-teal-500' },
  { name: 'Ley Jesda', role: 'UX Designer', color: 'bg-sky-500' },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <SectionHeading
      title="About Travel &amp; Explore"
      subtitle="A learning project that makes planning a trip as fun as the trip itself."
    />

    <!-- Intro -->
    <div class="overflow-hidden rounded-3xl bg-slate-900">
      <div class="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 class="text-2xl font-bold text-white">A little doorway to the world</h2>
          <p class="mt-4 leading-relaxed text-slate-300">
            Travel &amp; Explore is a frontend-only demo website. It shows how a
            modern Vue 3 + TypeScript application is organized: pages, reusable
            components, routing, state with Pinia and browser storage with
            localStorage. Everything you see here runs in your own browser.
          </p>
          <p class="mt-3 leading-relaxed text-slate-400">
            There is no backend, no database and no real money involved - just
            beautiful mock data and clean code that is easy to read and change.
          </p>
        </div>
        <div class="rounded-2xl bg-slate-800 p-6">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
            alt="Woman with a map travelling"
            class="h-64 w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Mission -->
    <div class="mt-10 grid gap-6 sm:grid-cols-2">
      <div v-for="item in missionPoints" :key="item.title" class="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600/10 text-teal-600 dark:text-teal-400">
          <component :is="item.icon" :size="24" />
        </span>
        <h3 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">{{ item.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ item.text }}</p>
      </div>
    </div>

    <!-- Statistics -->
    <section class="mt-10 rounded-3xl bg-teal-600 px-6 py-10">
      <div class="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="item in stats" :key="item.label">
          <component :is="item.icon" :size="28" class="mx-auto text-teal-100" />
          <p class="mt-2 text-3xl font-extrabold text-white">{{ item.value }}</p>
          <p class="text-sm text-teal-100">{{ item.label }}</p>
        </div>
      </div>
    </section>

    <!-- Why choose us -->
    <section class="mt-16">
      <SectionHeading title="Why Choose Travel &amp; Explore" subtitle="Three simple reasons travellers pick us." />
      <div class="grid gap-6 sm:grid-cols-3">
        <div v-for="item in reasons" :key="item.title" class="rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
          <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-600 dark:text-teal-400">
            <component :is="item.icon" :size="26" />
          </span>
          <h3 class="mt-4 font-bold text-slate-900 dark:text-white">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="mt-16">
      <SectionHeading title="Meet the Team" subtitle="The friendly people behind the project (mock data)." />
      <div class="grid gap-6 sm:grid-cols-3">
        <div v-for="member in team" :key="member.name" class="rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
          <span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white" :class="member.color">
            {{ member.name.split(' ').map((part) => part[0]).join('') }}
          </span>
          <h3 class="mt-4 font-bold text-slate-900 dark:text-white">{{ member.name }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ member.role }}</p>
          <p class="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
            <Award :size="12" /> Travel expert
          </p>
        </div>
      </div>
    </section>
  </div>
</template>