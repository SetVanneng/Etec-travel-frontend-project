// ---------------------------------------------------------------------------
// bookingStore.ts (Pinia store)
// Stores the user's demo bookings. There is no backend, so bookings live in
// localStorage and appear in the "My Trips" dashboard.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type BookingStatus = 'confirmed' | 'cancelled'

export interface Booking {
  id: number
  destination: string
  hotelName: string
  checkIn: string // format: YYYY-MM-DD
  checkOut: string // format: YYYY-MM-DD
  guests: number
  roomType: string
  customerName: string
  email: string
  /** Total price for the whole stay in USD. */
  totalPrice: number
  status: BookingStatus
  createdAt: string
}

const STORAGE_KEY = 'demoBookings'

export const useBookingStore = defineStore('bookings', () => {
  const bookings = ref<Booking[]>(loadFromStorage())

  /** number of nights between check-in and check-out. */
  const nights = (checkIn: string, checkOut: string): number => {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
  }

  /** Add a new booking and save it. Returns the created booking. */
  function addBooking(data: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking {
    const booking: Booking = {
      ...data,
      id: Date.now(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    bookings.value.unshift(booking)
    saveToStorage()
    return booking
  }

  /** Cancel a booking (status changes, the item is not deleted). */
  function cancelBooking(id: number): void {
    const booking = bookings.value.find((item) => item.id === id)
    if (booking) {
      booking.status = 'cancelled'
      saveToStorage()
    }
  }

  /** Remove a booking completely. */
  function removeBooking(id: number): void {
    bookings.value = bookings.value.filter((item) => item.id !== id)
    saveToStorage()
  }

  function loadFromStorage(): Booking[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as Booking[]) : []
    } catch {
      return []
    }
  }

  function saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings.value))
  }

  return {
    bookings,
    nights,
    addBooking,
    cancelBooking,
    removeBooking,
  }
})