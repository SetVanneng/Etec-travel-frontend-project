// ---------------------------------------------------------------------------
// reviewStore.ts (Pinia store)
// Manages user reviews for destinations, hotels and activities.
// Reviews are stored in localStorage so they survive a browser restart.
// Only logged-in users can post a review and each user can only review a
// given item once. A few sample reviews are seeded the very first time so the
// feature is visible even before anyone writes anything.
// ---------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'

/** Which kind of item a review belongs to. */
export type ReviewTargetType = 'destination' | 'hotel' | 'activity'

export interface Review {
  id: number
  targetType: ReviewTargetType
  targetId: number
  /** Display name of the author (from the auth store). */
  author: string
  /** 1 to 5 stars. */
  rating: number
  text: string
  /** ISO date string, see new Date().toISOString(). */
  date: string
}

const STORAGE_KEY = 'reviews'
const MAX_TEXT_LENGTH = 400

// A few sample reviews so the feature has content on first load.
const seedReviews: Review[] = [
  {
    id: 1,
    targetType: 'destination',
    targetId: 2,
    author: 'Maya Stone',
    rating: 5,
    text: 'Santorini exceeded every expectation. The sunsets at Oia and the caldera boat tour were magical.',
    date: '2026-05-14',
  },
  {
    id: 2,
    targetType: 'destination',
    targetId: 6,
    author: 'Kenji Watanabe',
    rating: 5,
    text: 'Tokyo is a sensory overload in the best way. Street food tour was the highlight of our trip.',
    date: '2026-06-02',
  },
  {
    id: 3,
    targetType: 'destination',
    targetId: 29,
    author: 'Alice Chen',
    rating: 4,
    text: 'Hong Kong never sleeps. The Peak tram views are stunning, just go early to avoid the queues.',
    date: '2026-07-21',
  },
  {
    id: 4,
    targetType: 'hotel',
    targetId: 1,
    author: 'David Müller',
    rating: 5,
    text: 'Perfect beachfront location, friendly staff and a dreamy infinity pool. Would book again in a heartbeat.',
    date: '2026-04-30',
  },
  {
    id: 5,
    targetType: 'hotel',
    targetId: 28,
    author: 'Sophie Nguyen',
    rating: 5,
    text: 'The harbour view from the rooftop pool is unreal. Dim sum brunch included is a lovely touch.',
    date: '2026-07-09',
  },
  {
    id: 6,
    targetType: 'activity',
    targetId: 1,
    author: 'Lars Johansson',
    rating: 5,
    text: 'A challenging but rewarding hike. The Matterhorn panorama at the top is worth every step.',
    date: '2026-06-27',
  },
  {
    id: 7,
    targetType: 'activity',
    targetId: 5,
    author: 'Emily Park',
    rating: 5,
    text: 'Best way to explore Tokyo! We tried more foods than we could count and learned so much.',
    date: '2026-05-19',
  },
]

export const useReviewStore = defineStore('reviews', () => {
  const authStore = useAuthStore()
  const reviews = ref<Review[]>(loadFromStorage())

  // Seed the sample reviews only the very first time (no stored key yet).
  function seedReviewsOnce(): void {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      reviews.value = [...seedReviews]
      saveToStorage()
    }
  }
  seedReviewsOnce()

  /** Reviews for one specific item. */
  function reviewsFor(targetType: ReviewTargetType, targetId: number): Review[] {
    return reviews.value.filter(
      (review) => review.targetType === targetType && review.targetId === targetId,
    )
  }

  /** Average rating for an item, or null when there are no reviews yet. */
  function averageFor(targetType: ReviewTargetType, targetId: number): number | null {
    const list = reviewsFor(targetType, targetId)
    if (list.length === 0) return null
    return list.reduce((sum, review) => sum + review.rating, 0) / list.length
  }

  /** Number of reviews for an item. */
  function countFor(targetType: ReviewTargetType, targetId: number): number {
    return reviewsFor(targetType, targetId).length
  }

  /** Can the current user add a review here? (logged in + not already reviewed) */
  function canReview(targetType: ReviewTargetType, targetId: number): boolean {
    const author = authStore.user?.name
    if (!author) return false
    return !reviewsFor(targetType, targetId).some((review) => review.author === author)
  }

  /**
   * Add a review as the logged-in user.
   * Returns { ok: true } or { ok: false, message } where the message is a
   * translation key the calling component can display in a toast.
   */
  function addReview(
    targetType: ReviewTargetType,
    targetId: number,
    rating: number,
    text: string,
  ): { ok: boolean; message?: string } {
    const author = authStore.user?.name

    if (!author) {
      return { ok: false, message: 'reviews.loginFirst' }
    }
    if (rating < 1 || rating > 5 || !text.trim()) {
      return { ok: false, message: 'reviews.validation' }
    }
    if (!canReview(targetType, targetId)) {
      return { ok: false, message: 'reviews.alreadyReviewed' }
    }

    reviews.value.push({
      id: nextId(),
      targetType,
      targetId,
      author,
      rating,
      text: text.trim().slice(0, MAX_TEXT_LENGTH),
      date: new Date().toISOString(),
    })
    saveToStorage()
    return { ok: true }
  }

  /** Delete a review by its id. */
  function removeReview(reviewId: number): void {
    reviews.value = reviews.value.filter((review) => review.id !== reviewId)
    saveToStorage()
  }

  // --- localStorage helpers -----------------------------------------------

  function loadFromStorage(): Review[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as Review[]) : []
    } catch {
      return []
    }
  }

  function saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews.value))
  }

  function nextId(): number {
    return reviews.value.length ? Math.max(...reviews.value.map((review) => review.id)) + 1 : 1
  }

  return {
    reviews,
    reviewsFor,
    averageFor,
    countFor,
    canReview,
    addReview,
    removeReview,
  }
})