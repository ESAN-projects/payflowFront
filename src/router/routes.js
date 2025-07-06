// Importa las funciones necesarias si las usas en algún middleware de ruta,
// aunque para este arreglo de rutas no son estrictamente necesarias aquí.

const routes = [
  {
    path: '/',
    // Volvemos a usar MainLayout.vue para que IndexPage.vue tenga su contexto Quasar.
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        // Añadimos una meta propiedad para indicar que el menú debe ocultarse.
        meta: { hideMenu: true },
      },
    ],
  },
  {
    // La ruta de transferencia también vuelve a usar MainLayout.vue.
    path: '/transferencia',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', // Ruta vacía para que /transferencia cargue directamente TransferPage.vue
        component: () => import('pages/TransferPage.vue'),
        meta: { requiresAuth: true, hideMenu: true }, // Ocultar menú y requerir autenticación
      },
    ],
  },

  // Rutas bajo '/pages' que usan MainLayout (y mostrarán el menú por defecto)
  {
    path: '/pages',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'misTransacciones',
        component: () => import('src/pages/transacciones/mainTransacciones.vue'),
        // Esta ruta no tiene 'hideMenu: true', por lo que el menú se mostrará.
      },
      // Puedes añadir más rutas aquí que usen el mismo MainLayout
    ],
  },

  // Rutas de autenticación sin MainLayout (estas no deberían tener el menú)
  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
    meta: { hideMenu: true }, // Aseguramos que no haya menú si LoginForm.vue es un componente standalone
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
