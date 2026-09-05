<script setup lang="ts">
// HotelDetails.vue
// Dynamic route /hotel/:id with an image gallery, room types,
// facilities and a booking button.
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  MapPin, Star, ArrowLeft, BedDouble, Wifi, Coffee, Utensils,
  Dumbbell, Car, Waves, ShowerHead, Clock, CheckCircle2, ArrowRight,
} from '@lucide/vue'
import type { Component } from 'vue'
import { getHotelById } from '../data/hotels'
import { notify } from '../utils/toast'
import { useBookingStore } from '../stores/bookingStore'
import { useAuthStore } from '../stores/authStore'

const route = useRoute()
const router = useRouter()
const bookingStore = useBookingStore()
const authStore = useAuthStore()

const hotel = computed(() => getHotelById(Number(route.params.id)))

// Gallery: the selected/full-size image. Starts with the first image.
const activeImage = ref(0)

// Map each facility name to an icon for a nice touch.
function facilityIcon(name: string): Component | null {
  const lower = name.toLowerCase()
  if (lower.includes('wifi')) return Wifi
  if (lower.includes('pool') || lower.includes('terrace')) return Waves
  if (lower.includes('breakfast') || lower.includes('restaurant')) return Utensils
  if (lower.includes('coffee') || lower.includes('bar')) return Coffee
  if (lower.includes('spa')) return ShowerHead
  if (lower.includes('fitness') || lower.includes('sauna')) return Dumbbell
  if (lower.includes('parking')) return Car
  if (lower.includes('storage')) return Car
  return null
}

// The room the user picks in the "book this room" section.
const selectedRoom = ref(0)

// "Book this room" stores a draft booking (dates + guests get added
// on the booking page, so we only navigate there).
function bookRoom(): void {
  if (!authStore.isLoggedIn()) {
    notify('Please log in before booking.', 'info')
    router.push({ path: '/login', query: { redirect: '/booking' } })
    return
  }
  if (!hotel.value) return
  const room = hotel.value.roomTypes[selectedRoom.value]
  notify(`Selected ${room.name} at ${hotel.value.name}.`, 'info')
  router.push({ path: '/booking', query: { hotel: hotel.value.id, room: room.name } })
}

function goBack(): void {
  router.push('/hotels')
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <!-- Not found -->
    <div v-if="!hotel" class="flex flex-col items-center gap-4 py-24 text-center">
      <BedDouble :size="48" class="text-slate-300 dark:text-slate-600" />
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Hotel not found</h1>
      <button
        type="button"
        class="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        @click="goBack"
      >
        Back to hotels
      </button>
    </div>

    <div v-else>
      <button
        type="button"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
        @click="goBack"
      >
        <ArrowLeft :size="16" />
        Back to all hotels
      </button>

      <div class="grid gap-10 lg:grid-cols-3">
        <!-- Left column: gallery -->
        <div class="lg:col-span-2">
          <!-- Main gallery image (:src binding example) -->
          <div class="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <img :src="hotel.gallery[activeImage]" :alt="hotel.name" class="h-full w-full object-cover" />
            <span
              class="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
              :class="hotel.available ? 'bg-emerald-500' : 'bg-rose-500'"
            >
              {{ hotel.available ? 'Available' : 'Sold out' }}
            </span>
          </div>

          <!-- Thumbnails -->
          <div class="mt-3 grid grid-cols-3 gap-3">
            <button
              v-for="(image, index) in hotel.gallery"
              :key="image"
              type="button"
              class="overflow-hidden rounded-xl border-2 transition"
              :class="activeImage === index ? 'border-teal-500' : 'border-transparent opacity-70 hover:opacity-100'"
              @click="activeImage = index"
            >
              <img :src="image" :alt="`${hotel.name} photo ${index + 1}`" class="h-24 w-full object-cover" />
            </button>
          </div>

          <!-- Description -->
          <h2 class="mt-8 text-xl font-bold text-slate-900 dark:text-white">About this hotel</h2>
          <p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{{ hotel.description }}</p>

          <!-- Facilities -->
          <h2 class="mt-8 text-xl font-bold text-slate-900 dark:text-white">Facilities</h2>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="facility in hotel.facilities"
              :key="facility"
              class="flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <component :is="facilityIcon(facility) ?? CheckCircle2" :size="15" class="text-teal-600 dark:text-teal-400" />
              {{ facility }}
            </span>
          </div>
        </div>

        <!-- Right column: booking panel -->
        <aside data-aos="fade-up" class="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ hotel.name }}</h1>
              <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin :size="15" class="text-teal-600 dark:text-teal-400" />
                {{ hotel.location }}
              </p>
            </div>
            <span class="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400">
              <Star :size="14" class="fill-amber-500 text-amber-500" />
              {{ hotel.rating }}
            </span>
          </div>

          <!-- Room types -->
          <h3 class="mt-6 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Choose a room
          </h3>
          <div class="mt-3 space-y-2">
            <label
              v-for="(room, index) in hotel.roomTypes"
              :key="room.name"
              class="flex cursor-pointer items-center justify-between rounded-xl border p-3 transition"
              :class="selectedRoom === index ? 'border-teal-500 bg-teal-50 dark:bg-teal-500/10' : 'border-slate-200 hover:border-teal-300 dark:border-slate-700'"
            >
              <span class="flex items-center gap-2">
                <input v-model="selectedRoom" type="radio" name="room" :value="index" class="accent-teal-600" />
                <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ room.name }}</span>
              </span>
              <span class="text-sm font-bold text-teal-600 dark:text-teal-400">${{ room.price }}</span>
            </label>
          </div>

          <!-- Price summary -->
          <div class="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
            <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><BedDouble :size="15" />{{ hotel.roomTypes[selectedRoom].name }}</span>
              <span>${{ hotel.roomTypes[selectedRoom].price }}/night</span>
            </p>
            <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><Clock :size="15" />Nights on booking</span>
              <span>You pick dates</span>
            </p>
          </div>

          <button
            type="button"
            class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
            :disabled="!hotel.available"
            :class="!hotel.available ? 'cursor-not-allowed opacity-50' : ''"
            @click="bookRoom"
          >
            Book This Room
            <ArrowRight :size="16" />
          </button>
          <p v-if="!hotel.available" class="mt-2 text-center text-xs text-rose-500">
            This hotel is not taking bookings right now.
          </p>
        </aside>
      </div>
    </div>
  </div>
</template>