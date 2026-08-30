// ---------------------------------------------------------------------------
// authStore.ts (Pinia store)
// Simple demo login. There is NO real backend, so we accept any email and
// password, and simply remember the logged-in user in localStorage.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  name: string
  email: string
  /** URL of the profile picture (or a generated avatar). */
  avatar: string
}

const USER_KEY = 'authUser'
const REMEMBER_KEY = 'rememberedEmail'

export const useAuthStore = defineStore('auth', () => {
  // Load the user from localStorage (null when not logged in).
  const user = ref<User | null>(loadUser())

  /** Quick check used in the navbar: are we logged in? */
  const isLoggedIn = () => user.value !== null

  /** Demo login. Accepts anything; builds a username from the email. */
  function login(email: string, password: string, remember = false): void {
    // Never store real passwords in a demo app!
    const name = email.split('@')[0] || 'Explorer'

    user.value = {
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff&size=256`,
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))

    if (remember) {
      // Save the email so the login form can prefill it next time.
      localStorage.setItem(REMEMBER_KEY, email)
    } else {
      localStorage.removeItem(REMEMBER_KEY)
    }
  }

  /** Remove the user from memory and from localStorage. */
  function logout(): void {
    user.value = null
    localStorage.removeItem(USER_KEY)
  }

  /** Update the profile fields (used by the profile page). */
  function updateProfile(updated: Partial<User>): void {
    if (user.value) {
      user.value = { ...user.value, ...updated }
      localStorage.setItem(USER_KEY, JSON.stringify(user.value))
    }
  }

  /** Get the remembered email for the login form, if any. */
  function getRememberedEmail(): string {
    return localStorage.getItem(REMEMBER_KEY) ?? ''
  }

  function loadUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    updateProfile,
    getRememberedEmail,
  }
})