<script setup lang="ts">
// Booking.vue
// Frontend-only multi-step booking wizard. There is NO backend - clicking
// "Confirm Booking" saves the trip into the bookingStore (localStorage) and
// shows a success notification.
//
// Steps:
//   1. Dates & guests
//   2. Destination & hotel
//   3. Room type
//   4. Guest details & confirm
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  CalendarDays, Users, User, Mail, BedDouble, MapPin, Hotel as HotelIcon,
  Info, CircleCheck, ShieldCheck, ArrowLeft, ArrowRight, Check, Compass, Star,
} from '@lucide/vue'
import { destinations } from '../data/destinations'
import { hotels, getHotelById } from '../data/hotels'
import { getActivityById } from '../data/activities'
import { useBookingStore } from '../stores/bookingStore'
import { useAuthStore } from '../stores/authStore'
import { notify } from '../utils/toast'
import type { Hotel as HotelType } from '../data/hotels'

const route = useRoute()
const router = useRouter()
const bookingStore = useBookingStore()
const authStore = useAuthStore()

// ---- Wizard state -----------------------------------------------------------
const steps = [
  { title: 'Dates & Guests', icon: CalendarDays },
  { title: 'Destination & Hotel', icon: MapPin },
  { title: 'Room Type', icon: BedDouble },
  { title: 'Confirm', icon: CircleCheck },
]
const currentStep = ref(0)
const isSubmitting = ref(false)

// reactive() groups the form fields into one reactive object.
const form = reactive({
  checkIn: '',
  checkOut: '',
  guests: 2,
  destinationId: 0,
  hotelId: 0,
  roomType: '',
  customerName: '',
  email: '',
})

// If the user came from a hotel page, destination page or activity page we
// grab the query params (?hotel=..., ?destination=..., ?activity=...) to
// prefill the form.
onMounted(() => {
  const { hotel, destination, room, activity } = route.query
  if (typeof activity === 'string') {
    const activityInfo = getActivityById(Number(activity))
    if (activityInfo) {
      form.destinationId = activityInfo.destinationId
    }
  }
  if (typeof destination === 'string') form.destinationId = Number(destination)
  if (typeof hotel === 'string') form.hotelId = Number(hotel)

  // If we landed with a specific hotel, set its room. Otherwise, if a place
  // was chosen (destination/activity) but no hotel, pick the first one nearby.
  if (typeof room === 'string' && roomOptions.value.some((item) => item.name === room)) {
    form.roomType = room
  } else if (getHotelById(form.hotelId)) {
    form.roomType = roomOptions.value[0]?.name ?? ''
  } else if (form.destinationId) {
    onDestinationChange()
  }

  if (authStore.user) {
    form.customerName = authStore.user.name
    form.email = authStore.user.email
  }
})

// ---- Derived data -----------------------------------------------------------
const destinationName = computed(() => {
  const match = destinations.find((item) => item.id === form.destinationId)
  return match ? `${match.name}, ${match.country}` : ''
})

// If the user came from an activity page, remember which one so we can show
// a friendly hint asking them to pick a hotel near it.
const activityName = computed(() => {
  const activity = route.query.activity
  return typeof activity === 'string' ? getActivityById(Number(activity))?.name ?? '' : ''
})

const hotelOptions = computed(() =>
  hotels.filter((hotel) => hotel.destinationId === form.destinationId),
)

const selectedHotel = computed<HotelType | undefined>(() => getHotelById(form.hotelId))

const roomOptions = computed(() => selectedHotel.value?.roomTypes ?? [])

// When the place changes, reset the hotel + room and, if there is a free
// hotel nearby, pre-select the first one so the user can see the price.
function onDestinationChange(): void {
  form.hotelId = 0
  form.roomType = ''
  const first = hotelOptions.value.find((hotel) => hotel.available)
  if (first) {
    form.hotelId = first.id
    form.roomType = first.roomTypes[0]?.name ?? ''
  }
}

// Pick a specific nearby hotel and reset the room to its first option.
function chooseHotel(hotel: HotelType): void {
  form.hotelId = hotel.id
  form.roomType = hotel.roomTypes[0]?.name ?? ''
}

const nights = computed(() => {
  if (!form.checkIn || !form.checkOut) return 0
  return bookingStore.nights(form.checkIn, form.checkOut)
})

const totalPrice = computed(() => {
  const room = roomOptions.value.find((item) => item.name === form.roomType)
  const pricePerNight = room?.price ?? selectedHotel.value?.pricePerNight ?? 0
  return pricePerNight * nights.value
})

const today = new Date().toISOString().split('T')[0]

// ---- Validation per step ----------------------------------------------------
function stepIsValid(step: number): boolean {
  if (step === 0) {
    if (!form.checkIn || !form.checkOut || nights.value <= 0) {
      notify('Please pick valid check-in and check-out dates.', 'error')
      return false
    }
    if (form.guests < 1) {
      notify('Please enter at least 1 guest.', 'error')
      return false
    }
    return true
  }
  if (step === 1) {
    if (!form.destinationId || !form.hotelId) {
      notify('Please choose a destination and a hotel.', 'error')
      return false
    }
    return true
  }
  if (step === 2) {
    if (!form.roomType) {
      notify('Please choose a room type.', 'error')
      return false
    }
    return true
  }
  return true
}

// Keep track of the furthest step the user legitimately passed so they can
// click back onto any completed step in the stepper.
const maxReachedStep = ref(0)

function next(): void {
  if (!stepIsValid(currentStep.value)) return
  const target = currentStep.value + 1
  maxReachedStep.value = Math.max(maxReachedStep.value, target)
  currentStep.value = Math.min(target, steps.length - 1)
}

function prev(): void {
  currentStep.value = Math.max(currentStep.value - 1, 0)
}

function goTo(step: number): void {
  // Only allow jumping to steps already reached.
  if (step <= maxReachedStep.value) {
    currentStep.value = step
  }
}

function submitBooking(): void {
  if (!stepIsValid(2)) return
  if (!form.customerName || !form.email.includes('@')) {
    notify('Please enter your name and a valid email address.', 'error')
    return
  }
  if (!selectedHotel.value) return

  isSubmitting.value = true
  setTimeout(() => {
    bookingStore.addBooking({
      destination: destinationName.value,
      hotelName: selectedHotel.value!.name,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      roomType: form.roomType,
      customerName: form.customerName,
      email: form.email,
      totalPrice: totalPrice.value,
    })

    notify('Booking confirmed! Check your My Trips page.')
    router.push('/my-trips')
  }, 600)
}

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Book Your Stay</h1>
      <p class="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        A simple four-step process. This is a demo - no real payment happens.
      </p>
    </div>

    <!-- Stepper -->
    <nav class="mx-auto mb-10 flex max-w-3xl items-center">
      <template v-for="(step, index) in steps" :key="step.title">
        <button
          type="button"
          class="flex flex-col items-center gap-2"
          :class="index <= maxReachedStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'"
          :disabled="index > maxReachedStep"
          @click="goTo(index)"
        >
          <span
            class="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition"
            :class="
              index < currentStep
                ? 'border-teal-600 bg-teal-600 text-white'
                : index === currentStep
                  ? 'border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300'
                  : 'border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900'
            "
          >
            <Check v-if="index < currentStep" :size="18" />
            <component v-else :is="step.icon" :size="18" />
          </span>
          <span
            class="text-xs font-medium sm:text-sm"
            :class="index === currentStep ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'"
          >
            {{ step.title }}
          </span>
        </button>

        <!-- Connector line -->
        <span
          v-if="index < steps.length - 1"
          class="mx-2 mb-6 h-0.5 flex-1 rounded-full sm:mx-4"
          :class="index < currentStep ? 'bg-teal-600' : 'bg-slate-200 dark:bg-slate-700'"
        ></span>
      </template>
    </nav>

    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Main form panel -->
      <form
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
        @submit.prevent="currentStep === steps.length - 1 ? submitBooking() : next()"
      >
        <!-- Step 1: Dates & guests -->
        <div v-if="currentStep === 0">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">When are you travelling?</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Pick your dates and party size.</p>

          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <CalendarDays :size="16" class="text-teal-600 dark:text-teal-400" /> Check-in
              </span>
              <input
                v-model="form.checkIn"
                type="date"
                :min="today"
                :class="inputClass"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <CalendarDays :size="16" class="text-teal-600 dark:text-teal-400" /> Check-out
              </span>
              <input
                v-model="form.checkOut"
                type="date"
                :min="form.checkIn || today"
                :class="inputClass"
              />
            </label>
          </div>

          <label class="mt-5 block max-w-xs">
            <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Users :size="16" class="text-teal-600 dark:text-teal-400" /> Guests
            </span>
            <input
              v-model.number="form.guests"
              type="number"
              min="1"
              max="20"
              :class="inputClass"
            />
          </label>
        </div>

        <!-- Step 2: Destination & hotel -->
        <div v-else-if="currentStep === 1">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">Where would you like to stay?</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Pick a place you are visiting, then choose a hotel nearby.</p>

          <div
            v-if="activityName"
            class="mt-4 flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
          >
            <Compass :size="16" class="shrink-0" />
            Book a hotel near your activity: {{ activityName }}
          </div>

          <!-- Place (destination) picker -->
          <label class="mt-5 block">
            <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <MapPin :size="16" class="text-teal-600 dark:text-teal-400" /> Place you are visiting
            </span>
            <select
              v-model="form.destinationId"
              :class="inputClass"
              @change="onDestinationChange"
            >
              <option :value="0" disabled>Select a place (e.g. Bali)</option>
              <option v-for="item in destinations" :key="item.id" :value="item.id">
                {{ item.name }}, {{ item.country }}
              </option>
            </select>
          </label>

          <!-- Nearby hotels -->
          <template v-if="form.destinationId !== 0">
            <h3 class="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <BedDouble :size="16" class="text-teal-600 dark:text-teal-400" />
              Hotels near {{ destinationName }}
            </h3>

            <div v-if="hotelOptions.length > 0" class="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                v-for="hotel in hotelOptions"
                :key="hotel.id"
                type="button"
                class="flex items-center gap-3 overflow-hidden rounded-xl border-2 p-2 text-left transition"
                :class="
                  form.hotelId === hotel.id
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-500/10'
                    : 'border-slate-200 hover:border-teal-300 dark:border-slate-700'
                "
                :disabled="!hotel.available"
                :aria-pressed="form.hotelId === hotel.id"
                @click="chooseHotel(hotel)"
              >
                <img
                  :src="hotel.image"
                  :alt="hotel.name"
                  class="h-20 w-20 shrink-0 rounded-lg object-cover"
                />
                <span class="min-w-0 flex-1">
                  <span class="flex items-center justify-between gap-2">
                    <span class="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                      {{ hotel.name }}
                    </span>
                  </span>
                  <span class="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin :size="12" class="text-teal-600 dark:text-teal-400" />
                    {{ hotel.location }}
                  </span>
                  <span class="mt-1.5 flex items-center justify-between gap-2">
                    <span
                      class="flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                    >
                      <Star :size="11" class="fill-amber-500 text-amber-500" />
                      {{ hotel.rating }}
                    </span>
                    <span class="text-sm font-bold text-teal-600 dark:text-teal-400">
                      ${{ hotel.pricePerNight }}<span class="text-xs font-medium text-slate-400">/night</span>
                    </span>
                  </span>
                  <span
                    v-if="!hotel.available"
                    class="mt-1 inline-block rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                  >
                    Sold out
                  </span>
                </span>
              </button>
            </div>

            <p
              v-else
              class="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
            >
              No hotels listed near {{ destinationName }} yet.
            </p>
          </template>
        </div>

        <!-- Step 3: Room type -->
        <div v-else-if="currentStep === 2">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">Choose your room</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ selectedHotel?.name }} has {{ roomOptions.length }} room options.
          </p>

          <div class="mt-6 space-y-3">
            <label
              v-for="room in roomOptions"
              :key="room.name"
              class="flex cursor-pointer items-center justify-between rounded-xl border p-4 transition"
              :class="
                form.roomType === room.name
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-500/10'
                  : 'border-slate-200 hover:border-teal-300 dark:border-slate-700'
              "
            >
              <span class="flex items-center gap-3">
                <input
                  v-model="form.roomType"
                  type="radio"
                  name="room"
                  :value="room.name"
                  class="accent-teal-600"
                />
                <span>
                  <span class="block text-sm font-semibold text-slate-800 dark:text-slate-100">{{ room.name }}</span>
                  <span class="block text-xs text-slate-500 dark:text-slate-400">{{ room.size }} m²</span>
                </span>
              </span>
              <span class="text-sm font-bold text-teal-600 dark:text-teal-400">${{ room.price }}/night</span>
            </label>
          </div>
        </div>

        <!-- Step 4: Confirm -->
        <div v-else>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">Your details</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Last step - just add your name and email.</p>

          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <User :size="16" class="text-teal-600 dark:text-teal-400" /> Full Name
              </span>
              <input
                v-model="form.customerName"
                type="text"
                placeholder="Jane Explorer"
                :class="inputClass"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Mail :size="16" class="text-teal-600 dark:text-teal-400" /> Email
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="jane@example.com"
                :class="inputClass"
              />
            </label>
          </div>

          <!-- Booking summary -->
          <div class="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
            <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><MapPin :size="15" class="text-teal-600" />Destination</span>
              <span class="font-medium">{{ destinationName || '—' }}</span>
            </p>
            <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><HotelIcon :size="15" class="text-teal-600" />Hotel</span>
              <span class="font-medium">{{ selectedHotel?.name || '—' }}</span>
            </p>
            <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><BedDouble :size="15" class="text-teal-600" />Room</span>
              <span class="font-medium">{{ form.roomType || '—' }}</span>
            </p>
            <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><CalendarDays :size="15" class="text-teal-600" />Dates</span>
              <span class="font-medium">{{ form.checkIn }} → {{ form.checkOut }}</span>
            </p>
            <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-1.5"><Users :size="15" class="text-teal-600" />Guests</span>
              <span class="font-medium">{{ form.guests }}</span>
            </p>
          </div>
        </div>

        <!-- Navigation buttons -->
        <div class="mt-8 flex items-center justify-between gap-3">
          <button
            v-if="currentStep > 0"
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            @click="prev"
          >
            <ArrowLeft :size="16" />
            Back
          </button>
          <span v-else></span>

          <button
            v-if="currentStep < steps.length - 1"
            type="submit"
            class="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700"
          >
            Continue
            <ArrowRight :size="16" />
          </button>
          <button
            v-else
            type="submit"
            class="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isSubmitting"
          >
            <CircleCheck :size="18" />
            {{ isSubmitting ? 'Booking...' : 'Confirm Booking' }}
          </button>
        </div>
      </form>

      <!-- Price summary sidebar -->
      <aside class="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Price summary
        </h3>
        <div class="mt-4 space-y-3 text-sm">
          <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span>Room</span>
            <span class="font-medium">{{ selectedHotel?.name || 'Not selected' }}</span>
          </p>
          <p v-if="roomOptions.find((r) => r.name === form.roomType)" class="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span>{{ form.roomType }}</span>
            <span>${{ roomOptions.find((r) => r.name === form.roomType)?.price }}/night</span>
          </p>
          <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span>Nights</span>
            <span>
              {{ nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : '—' }}
            </span>
          </p>
          <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span>Guests</span>
            <span>{{ form.guests }}</span>
          </p>
        </div>

        <div class="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
          <p class="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span class="flex items-center gap-1.5 font-semibold">
              <Info :size="16" class="text-teal-600 dark:text-teal-400" /> Total
            </span>
            <span class="text-2xl font-extrabold text-teal-700 dark:text-teal-300">${{ totalPrice }}</span>
          </p>
          <p v-if="nights === 0" class="mt-1 text-xs text-slate-400">
            Total updates after you pick dates and a room.
          </p>
        </div>

        <p class="mt-4 flex items-start justify-center gap-1.5 text-center text-xs text-slate-400 dark:text-slate-500">
          <ShieldCheck :size="14" class="mt-0.5 shrink-0" />
          Frontend-only demo. No real booking or payment is created.
        </p>
      </aside>
    </div>
  </div>
</template>
