const Layout = () => import('@/layouts/DefaultLayout.vue');
const DashboardView = () => import('@/views/DashboardView.vue');
const StudentForm = () => import('@/pages/Students/Form.vue');

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: DashboardView, // ✅ matches the import above
        meta: { title: 'Dashboard' }
      },
       {
        path: 'Create',
        name: 'app.Form',
        component: StudentForm, // ✅ matches the import above
        meta: { title: 'Students' }
      },
    ],
  },
];
