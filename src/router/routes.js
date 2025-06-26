const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  //LoginForm
  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
  },

  //RegisterForm
  {
    path: '/Register',
    component: () => import('src/components/auth/RegisterForm.vue'),
  },

  //ResetPassword
  {
    path: '/ResetPassword',
    component: () => import('src/components/auth/ResetPassword.vue'),
  },

  {
    path: '/pages',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'misTransacciones',
        component: () => import('src/pages/transacciones/mainTransacciones.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
