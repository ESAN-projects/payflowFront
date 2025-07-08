// routes.js - Versión Corregida

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { quasarHeader: true },
      },
    ],
  },

  // La ruta de mis-operaciones usará solo MisOperaciones.vue
  {
    path: '/mis-operaciones',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/MisOperaciones.vue'),
        meta: { payflowHeader: true, hideMenu: true },
      },
    ],
  },

  // Rutas bajo '/pages' que usan MainLayout (y por defecto mostrarán el menú)
  {
    path: '/pages',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'misTransacciones',
        component: () => import('src/pages/transacciones/mainTransacciones.vue'),
        meta: { hideMenu: true },
      },
      // Puedes añadir más rutas aquí que usen el mismo MainLayout
    ],
  },

  // Rutas de autenticación sin MainLayout (estas no deberían tener el menú)
  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
    meta: { hideMenu: true },
  },
  {
    path: '/Register',
    component: () => import('src/components/auth/RegisterForm.vue'),
    meta: { hideMenu: true },
  },
  {
    path: '/ResetPassword',
    component: () => import('src/components/auth/ResetPassword.vue'),
    meta: { hideMenu: true },
  },

  // Siempre deja esta como la última, para manejar rutas no encontradas
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
