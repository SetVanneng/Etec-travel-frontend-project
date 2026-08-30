<script setup lang="ts">
// Profile.vue
// Shows the logged-in user, their stats, an edit form and logout.
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Heart, CalendarDays, Pencil, LogOut, ArrowRight, User } from '@lucide/vue'
import { useAuthStore } from '../stores/authStore'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useBookingStore } from '../stores/bookingStore'
import { notify } from '../utils/toast'

const router = useRouter()
const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()
const bookingStore = useBookingStore()

// Count only the bookings that belong to this user's email.
const myBookingCount = computed(
  () => bookingStore.bookings.filter((booking) => booking.email === authStore.user?.email).length,
)

// Edit mode: when editing, the name input is shown instead of static text.
const editing = ref(false)
const editName = ref('')

// If the user was already saved without an avatar, generate one.
onMounted(() => {
  if (authStore.user && !authStore.user.avatar) {
    authStore.updateProfile({
      avatar: avatarFor(authStore.user.name),
    })
  }
})

function avatarFor(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff&size=256`
}

function startEditing(): void {
  editName.value = authStore.user?.name ?? ''
  editing.value = true
}

function saveProfile(): void {
  const name = editName.value.trim()
  if (!name) {
    notify('Name cannot be empty.', 'error')
    return
  }
  authStore.updateProfile({ name, avatar: avatarFor(name) })
  editing.value = false
  notify('Profile updated successfully.')
}

function doLogout(): void {
  authStore.logout()
  notify('You have been logged out.', 'info')
  router.push('/')
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-12 sm:px-6">
    <!-- Not logged in -->
    <div v-if="!authStore.user" class="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 py-24 text-center dark:border-slate-700">
      <User :size="52" class="text-slate-300 dark:text-slate-600" />
      <h1 class="text-xl font-bold text-slate-700 dark:text-slate-200">You are not logged in</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">Log in to see your profile, favorites and trips.</p>
      <router-link
        to="/login"
        class="mt-2 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        Go to Login
        <ArrowRight :size="16" />
      </router-link>
    </div>

    <!-- Profile -->
    <div v-else>
      <!-- Header card -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <img :src="authStore.user?.avatar" :alt="authStore.user?.name" class="h-20 w-20 rounded-full border-4 border-teal-500 object-cover" />

          <div class="text-center sm:text-left">
            <!-- v-if / v-else editing example -->
            <template v-if="editing">
              <input
                v-model="editName"
                type="text"
                class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-lg font-bold text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div class="mt-3 flex gap-2">
                <button
                  type="button"
                  class="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                  @click="saveProfile"
                >
                  Save
                </button>
                <button
                  type="button"
                  class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  @click="editing = false"
                >
                  Cancel
                </button>
              </div>
            </template>
            <template v-else>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ authStore.user?.name }}</h1>
              <p class="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start dark:text-slate-400">
                <Mail :size="15" class="text-teal-600 dark:text-teal-400" />
                {{ authStore.user?.email }}
              </p>
            </template>
          </div>

          <button
            v-if="!editing"
            type="button"
            class="mt-2 flex items-center gap-2 rounded-xl border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white sm:ml-auto sm:mt-0"
            @click="startEditing"
          >
            <Pencil :size="16" />
            Edit Profile
          </button>
        </div>

        <!-- Stats -->
        <div class="mt-8 grid grid-cols-2 gap-4">
          <router-link
            to="/favorites"
            class="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
              <Heart :size="20" />
            </span>
            <div>
              <p class="text-2xl font-extrabold text-slate-900 dark:text-white">{{ favoriteStore.favoriteCount }}</p>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Favorites</p>
            </div>
          </router-link>

          <router-link
            to="/my-trips"
            class="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <CalendarDays :size="20" />
            </span>
            <div>
              <p class="text-2xl font-extrabold text-slate-900 dark:text-white">{{ myBookingCount }}</p>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Bookings</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        <router-link
          to="/favorites"
          class="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-teal-400"
        >
          <Heart :size="17" /> View Favorites
        </router-link>
        <router-link
          to="/my-trips"
          class="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-teal-400"
        >
          <CalendarDays :size="17" /> View Bookings
        </router-link>
        <router-link
          to="/booking"
          class="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-teal-400"
        >
          <CalendarDays :size="17" /> Book a Trip
        </router-link>
        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-xl border border-rose-300 px-5 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/30"
          @click="doLogout"
        >
          <LogOut :size="17" /> Logout
        </button>
      </div>
    </div>
  </div>
</template>