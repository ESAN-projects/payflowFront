// routes.js - Versión Corregida

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  {
    // La ruta de transferencia también vuelve a usar MainLayout.vue.
    path: '/mis-operaciones',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/TransferPage.vue'),
        meta: { hideMenu: true }, // Aquí SÍ lo quieres oculto
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
        meta: { hideMenu: true }, // <--- AÑADIR ESTA LÍNEA si quieres que mainTransacciones.vue oculte el menú
      },
      // Puedes añadir más rutas aquí que usen el mismo MainLayout
    ],
  },

  // Rutas de autenticación sin MainLayout (estas no deberían tener el menú)
  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
    meta: { hideMenu: true }, // Correcto para ocultar
  },
  {
    path: '/Register',
    component: () => import('src/components/auth/RegisterForm.vue'),
    meta: { hideMenu: true }, // Correcto para ocultar
  },
  {
    path: '/ResetPassword',
    component: () => import('src/components/auth/ResetPassword.vue'),
    meta: { hideMenu: true }, // Correcto para ocultar
  },

  // Siempre deja esta como la última, para manejar rutas no encontradas
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
