const Layout = () => import('@/layouts/DefaultLayout.vue');
const DashboardView = () => import('@/views/DashboardView.vue');

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: DashboardView, // ✅ matches the import above
      },
    ],
  },
];
