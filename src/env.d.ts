// TypeScript declarations for the environment.
// This file only exists so Vite + TypeScript understand
// things like .vue imports and import.meta.env.
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}