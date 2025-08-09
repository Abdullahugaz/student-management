const Layout = () => import('@/layouts/DefaultLayout.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const StudentsPage = () => import('@/pages/Students/Index.vue')
const LoginPage = () => import('@/pages/Auth/Login.vue')
const RegisterPage = () => import('@/pages/Auth/Register.vue')

export default [
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
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: { name: 'app.dashboard' } },
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
  }
]
