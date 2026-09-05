// ---------------------------------------------------------------------------
// authStore.ts (Pinia store)
// Demo authentication with registration. There is NO real backend, so accounts
// live in localStorage. Registration stores a new account and logs the user in;
// login only succeeds for registered "email + password" pairs.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  name: string
  email: string
  /** URL of the profile picture (or a generated avatar). */
  avatar: string
}

/** A user account registered on this device (stored in localStorage). */
export interface RegisteredAccount extends User {
  password: string
}

/** Result type so views can show friendly error messages. */
export type AuthResult = { ok: true } | { ok: false; message: string }

const USER_KEY = 'authUser'
const REMEMBER_KEY = 'rememberedEmail'
const ACCOUNTS_KEY = 'registeredAccounts'

export const useAuthStore = defineStore('auth', () => {
  // Load the user from localStorage (null when not logged in).
  const user = ref<User | null>(loadUser())

  /** Quick check used in the navbar: are we logged in? */
  const isLoggedIn = () => user.value !== null

  /** Build a User object with an auto-generated avatar. */
  function buildUser(name: string, email: string): User {
    return {
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff&size=256`,
    }
  }

  function loadAccounts(): RegisteredAccount[] {
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY)
      return raw ? (JSON.parse(raw) as RegisteredAccount[]) : []
    } catch {
      return []
    }
  }

  function saveAccounts(accounts: RegisteredAccount[]): void {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  }

  function findAccount(email: string): RegisteredAccount | undefined {
    return loadAccounts().find((account) => account.email === email.toLowerCase())
  }

  /** Create a new account and log the user in. */
  function register(name: string, email: string, password: string, remember = false): AuthResult {
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (findAccount(cleanEmail)) {
      return { ok: false, message: 'An account with this email already exists. Try logging in instead.' }
    }

    const accounts = loadAccounts()
    accounts.push({ ...buildUser(cleanName, cleanEmail), password })
    saveAccounts(accounts)

    user.value = buildUser(cleanName, cleanEmail)
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
    rememberEmail(cleanEmail, remember)
    return { ok: true }
  }

  /** Demo login. Only works for registered email + password pairs. */
  function login(email: string, password: string, remember = false): AuthResult {
    const account = findAccount(email)
    if (!account) {
      return { ok: false, message: 'No account found with this email. Please register first.' }
    }
    if (account.password !== password) {
      return { ok: false, message: 'Incorrect password. Please try again.' }
    }

    const { password: _ignored, ...profile } = account
    user.value = { ...profile }
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
    rememberEmail(account.email, remember)
    return { ok: true }
  }

  /** Save the email so the login form can prefill it next time. */
  function rememberEmail(email: string, remember: boolean): void {
    if (remember) {
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
    register,
    login,
    logout,
    updateProfile,
    getRememberedEmail,
  }
})