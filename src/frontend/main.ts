import './global.css'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import createRouter from './router'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const store = createPinia()

  app.use(store)
  app.use(router)
  return { app, router, store }
}
