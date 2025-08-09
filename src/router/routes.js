import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('@/layouts/DefaultLayout.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const StudentsPage = () => import('@/pages/Students/Index.vue')
const LoginPage = () => import('@/pages/Auth/Login.vue')
const RegisterPage = () => import('@/pages/Auth/Register.vue')

const routes = [
  // Auth (no layout)
  {
    path: '/login',
    name: 'app.login',
    component: LoginPage,
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'app.register',
    component: RegisterPage,
    meta: { title: 'Register' }
  },

  // Main app (with layout)
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: { name: 'app.dashboard' } }, // default after login
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: DashboardView,
        meta: { title: 'Dashboard', requiresAuth: true }
      },
      {
        path: 'students',
        name: 'app.students',
        component: StudentsPage,
        meta: { title: 'Students', requiresAuth: true }
      }
    ]
  },

  // 404
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simple auth check — customize to your auth state (pinia/vuex/cookies)
function isAuthenticated() {
  return !!localStorage.getItem('token')
}

// Guards: force login first; send logged-in users away from login/register
router.beforeEach((to, from, next) => {
  const authed = isAuthenticated()

  if (to.meta.requiresAuth && !authed) {
    return next({ name: 'app.login', query: { redirect: to.fullPath } })
  }

  if (authed && (to.name === 'app.login' || to.name === 'app.register')) {
    return next({ name: 'app.dashboard' })
  }

  next()
})

// Optional: set document title
router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
