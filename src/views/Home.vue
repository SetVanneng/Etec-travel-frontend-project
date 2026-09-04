<script setup lang="ts">
// Home.vue
// The landing page: hero with search, popular destinations,
// featured hotels, popular activities and travel inspiration.
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, MapPin, ArrowRight, Star, Sparkles, Compass, TrendingUp, Plane } from '@lucide/vue'
import SearchBar from '../components/SearchBar.vue'
import SectionHeading from '../components/SectionHeading.vue'
import DestinationCard from '../components/DestinationCard.vue'
import HotelCard from '../components/HotelCard.vue'
import ActivityCard from '../components/ActivityCard.vue'
import { destinations } from '../data/destinations'
import { hotels } from '../data/hotels'
import { activities } from '../data/activities'

const router = useRouter()

// Bound to the SearchBar inside the hero form (v-model example).
const heroSearch = ref('')

// Sorted lists used by the sections.
// [...array].sort() copies the array before sorting so we never mutate data.
const popularDestinations = [...destinations].sort((a, b) => b.rating - a.rating).slice(0, 6)
const featuredHotels = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, 3)
const popularActivities = [...activities].sort((a, b) => b.rating - a.rating).slice(0, 4)

// When the user submits the hero search we navigate to the destinations
// page and pass the text through the URL query (?search=...).
function goToSearch(): void {
  router.push({
    path: '/destinations',
    query: heroSearch.value ? { search: heroSearch.value } : {},
  })
}

// Dummy "why travel with us" row.
const highlights = [
  { icon: Compass, title: 'Hand-picked destinations', text: 'Every place is carefully chosen by our travel editors.' },
  { icon: Star, title: '4.8 average guest rating', text: 'Thousands of happy travellers trust our recommendations.' },
  { icon: TrendingUp, title: 'Best price promise', text: 'Transparent prices with no hidden fees. Ever.' },
]

// Inspiration strip images + captions.
const inspiration = [
  {
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80',
    title: 'Chase the sunrise',
    text: 'Start your day at an epic viewpoint.',
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    title: 'Feel the sand',
    text: 'Long lazy days on world-class beaches.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80',
    title: 'Pack your boots',
    text: 'Trails that make you forget your phone.',
  },
]
</script>

<template>
  <div>
    <!-- ================= HERO ================= -->
    <section
      class="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80')"
    >
      <!-- Dark overlay so the white text is readable -->
      <div class="absolute inset-0 bg-slate-950/60" />

      <div class="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center">
        <p class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-teal-200 backdrop-blur">
          <Sparkles :size="16" />
          Your next adventure starts here
        </p>
        <h1 class="text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Explore the World, <span class="text-teal-400">One Trip at a Time</span>
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-base text-slate-200 sm:text-lg">
          Discover breathtaking destinations, book dream hotels and try
          unforgettable activities - all in one place.
        </p>

        <!-- Hero search form -->
        <form class="mt-8 flex flex-col gap-3 sm:flex-row" @submit.prevent="goToSearch">
          <div class="flex-1">
            <SearchBar v-model="heroSearch" placeholder="Search a destination, e.g. Paris or Tokyo" />
          </div>
          <button
            type="submit"
            class="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
          >
            <Search :size="18" />
            Explore Now
          </button>
        </form>

        <p class="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-300">
          <MapPin :size="15" class="text-teal-400" />
          {{ destinations.length }} destinations, {{ hotels.length }} hotels and {{ activities.length }} activities ready to browse
        </p>
      </div>
    </section>

    <!-- ================= WHY CHOOSE US ================= -->
    <section class="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
        <div v-for="item in highlights" :key="item.title" class="flex items-start gap-4">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600/10 text-teal-600 dark:text-teal-400">
            <component :is="item.icon" :size="22" />
          </span>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= POPULAR DESTINATIONS ================= -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Popular Destinations"
        subtitle="The most loved places around the world, ready to explore."
      />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DestinationCard v-for="destination in popularDestinations" :key="destination.id" :destination="destination" />
      </div>
      <div class="mt-10 text-center">
        <router-link
          to="/destinations"
          class="inline-flex items-center gap-2 rounded-xl border border-teal-600 px-6 py-3 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
        >
          View All Destinations
          <ArrowRight :size="16" />
        </router-link>
      </div>
    </section>

    <!-- ================= FEATURED HOTELS ================= -->
    <section class="bg-slate-50 py-16 dark:bg-slate-800/40">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title="Featured Hotels"
          subtitle="Hand-picked stays with top guest ratings."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <HotelCard v-for="hotel in featuredHotels" :key="hotel.id" :hotel="hotel" />
        </div>
        <div class="mt-10 text-center">
          <router-link
            to="/hotels"
            class="inline-flex items-center gap-2 rounded-xl border border-teal-600 px-6 py-3 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
          >
            View All Hotels
            <ArrowRight :size="16" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- ================= POPULAR ACTIVITIES ================= -->
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Popular Activities"
        subtitle="Experiences you will remember forever."
      />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ActivityCard v-for="activity in popularActivities" :key="activity.id" :activity="activity" />
      </div>
      <div class="mt-10 text-center">
        <router-link
          to="/activities"
          class="inline-flex items-center gap-2 rounded-xl border border-teal-600 px-6 py-3 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
        >
          View All Activities
          <ArrowRight :size="16" />
        </router-link>
      </div>
    </section>

    <!-- ================= BOOK A FLIGHT ================= -->
    <section class="bg-slate-50 py-16 dark:bg-slate-800/40">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title="Book a Flight"
          subtitle="Find airlines that fly to your dream destination and book directly on their website."
        />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <router-link
            v-for="item in [
              { country: 'Japan', desc: 'Fly to Tokyo, Kyoto & beyond with JAL, ANA and more', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80' },
              { country: 'France', desc: 'Paris awaits - fly direct with Air France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' },
              { country: 'Thailand', desc: 'Budget flights to Phuket and Bangkok', image: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=600&q=80' },
            ]"
            :key="item.country"
            :to="`/airline-booking?country=${item.country}`"
            class="group relative h-64 overflow-hidden rounded-2xl"
          >
            <img :src="item.image" :alt="item.country" class="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div class="absolute bottom-0 flex items-end justify-between p-5">
              <div>
                <h3 class="text-lg font-bold text-white">{{ item.country }}</h3>
                <p class="text-sm text-slate-300">{{ item.desc }}</p>
              </div>
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition group-hover:scale-110">
                <Plane :size="18" />
              </span>
            </div>
          </router-link>
        </div>
        <div class="mt-10 text-center">
          <router-link
            to="/airline-booking"
            class="inline-flex items-center gap-2 rounded-xl border border-teal-600 px-6 py-3 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
          >
            <Plane :size="16" />
            Book a Flight
            <ArrowRight :size="16" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- ================= TRAVEL INSPIRATION ================= -->
    <section class="bg-slate-900 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="mb-8 text-center">
          <h2 class="text-2xl font-bold text-white sm:text-3xl">Travel Inspiration</h2>
          <p class="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
            A few ideas to get your wanderlust going.
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <router-link
            v-for="item in inspiration"
            :key="item.title"
            to="/destinations"
            class="group relative h-72 overflow-hidden rounded-2xl"
          >
            <img :src="item.image" :alt="item.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div class="absolute bottom-0 p-5">
              <h3 class="text-lg font-bold text-white">{{ item.title }}</h3>
              <p class="text-sm text-slate-300">{{ item.text }}</p>
            </div>
          </router-link>
        </div>

        <!-- Call to action -->
        <div class="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-700 bg-slate-800/60 p-8 text-center sm:flex-row sm:text-left">
          <div class="flex items-center gap-4">
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
              <Plane :size="24" />
            </span>
            <div>
              <h3 class="text-lg font-bold text-white">Ready to plan your next trip?</h3>
              <p class="text-sm text-slate-400">Browse destinations, pick a hotel and book in a few clicks.</p>
            </div>
          </div>
          <router-link
            to="/booking"
            class="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
          >
            Start Planning
            <ArrowRight :size="16" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>