import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
  routes
})

// ✅ Global auth guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // Not logged in
    return next({ name: 'app.login' })
  }

  if ((to.name === 'app.login' || to.name === 'app.register') && token) {
    // Already logged in
    return next({ name: 'app.dashboard' })
  }

  next()
})

export default router
