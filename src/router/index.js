import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Global navigation guard
// router.beforeEach((to, from, next) => {
//   // Get token from localStorage
//   const token = localStorage.getItem('token')

//   if (to.meta.requiresAuth && !token) {
//     // Not logged in, redirect to login page
//     next({ name: 'app.login' })
//   } 
//   else if ((to.name === 'app.login' || to.name === 'app.register') && token) {
//     // Already logged in, redirect to dashboard
//     next({ name: 'app.dashboard' })
//   } 
//   else {
//     next()
//   }
// })

export default router
