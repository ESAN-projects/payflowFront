const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
    ],
  },

  // TransferForm fuera del layout principal
  {
    path: '/transferencia',
    component: () => import('pages/TransferPage.vue'),
    meta: { requiresAuth: true },
  },

  // LoginForm
  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
  },

  // Always leave this as last one,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
