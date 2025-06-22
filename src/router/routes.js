const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'transferencia',
        component: () => import('pages/TransferPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  //LoginForm
  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
