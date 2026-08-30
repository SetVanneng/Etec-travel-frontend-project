// ---------------------------------------------------------------------------
// toast.ts
// A tiny "notification" system. Instead of using a heavy library we keep a
// reactive list of messages and display them with the <ToastHost /> component.
// Use it anywhere like:
//    import { notify } from '../utils/toast'
//    notify('Your booking was confirmed!')
// ---------------------------------------------------------------------------
import { reactive } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: number
  type: ToastType
  message: string
}

// reactive() makes the array reactive. Adding/removing items
// automatically updates the ToastHost component.
export const toasts = reactive<ToastMessage[]>([])

let nextId = 1

/** Show a notification for a few seconds. */
export function notify(message: string, type: ToastType = 'success'): void {
  const id = nextId++
  toasts.push({ id, type, message })

  // Remove the toast automatically after 4 seconds.
  setTimeout(() => removeToast(id), 4000)
}

/** Remove a single toast by its id. */
export function removeToast(id: number): void {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index !== -1) {
    toasts.splice(index, 1)
  }
}