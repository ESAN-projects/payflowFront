const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'transferencia', // Notice: no leading slash here, as it's relative to the parent's path '/'
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
