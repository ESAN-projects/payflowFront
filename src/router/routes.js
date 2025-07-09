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

  //inicio
  {
    path: '/inicio',
    component: () => import('src/pages/Inicio/Inicio.vue'),
  },

  // La ruta de mis-operaciones usará solo MisOperaciones.vue
  {
    path: '/mis-operaciones',
    component: () => import('src/pages/MisOperaciones.vue'),
  },

  //Mi perfil
  {
    path: '/MiPerfil',
    component: () => import('src/pages/perfil/MiPerfil.vue'),
  },

  //Ayuda
  {
    path: '/Ayuda',
    component: () => import('src/pages/Ayuda.vue'),
  },

  //Validar que deberia ir
  {
    path: '/Transacciones',
    component: () => import('src/pages/transacciones/mainTransacciones.vue'),
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
  {
    path: '/admin',
    component: () => import('layouts/Admin/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Admin/DashboardHomePage.vue') },
      { path: 'administradores', component: () => import('pages/Admin/AdministradoresPage.vue') }
    ]
  },

  // Siempre deja esta como la última, para manejar rutas no encontradas
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
