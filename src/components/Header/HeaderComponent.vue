<template>
  <q-toolbar class="header-toolbar">
    <div class="logo-bg" @click="$router.push('/inicio')" style="cursor: pointer">
      <img src="~assets/PayFlowS.jpg" alt="PayFlow Logo" class="payflow-logo" />
      <span class="logo-text">
        <span class="pay-text">Pay</span><span class="flow-text">Flow</span>
      </span>
    </div>

    <q-space />

    <div class="nav-group nav-group-centered">
      <q-btn
        flat
        no-caps
        label="Inicio"
        class="header-nav-btn"
        :class="{ 'active-nav-btn': $route.path === '/inicio' }"
        to="/inicio"
      />
      <q-btn
        flat
        no-caps
        label="Mis operaciones"
        class="header-nav-btn"
        :class="{ 'active-nav-btn': $route.path === '/mis-operaciones' }"
        to="/mis-operaciones"
      />
      <q-btn
        flat
        no-caps
        label="Transacciones"
        class="header-nav-btn"
        :class="{ 'active-nav-btn': $route.path === '/transacciones' }"
        to="/transacciones"
      />
      <q-btn
        flat
        no-caps
        label="Ayuda"
        class="header-nav-btn"
        :class="{ 'active-nav-btn': $route.path === '/ayuda' }"
        to="/ayuda"
      />
    </div>

    <q-space />

    <div class="header-actions">
      <q-btn flat round dense icon="notifications" class="header-icon-btn" />
      <span class="header-nav-btn-user">Hola! {{ nombreUsuario }}</span>
      <q-btn flat round dense icon="settings" class="header-icon-btn">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="$router.push('/MiPerfil')">
              <q-item-section>Mi perfil</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="cerrarSesion">
              <q-item-section>Cerrar Sesión</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api as $api } from 'boot/axios'

const nombreUsuario = ref('Usuario')
const router = useRouter()

function cerrarSesion() {
  localStorage.removeItem('user')
  localStorage.removeItem('userData')
  router.push('/login')
}

onMounted(async () => {
  let endpointUrl = '/api/v1/Usuarios/usuarioByjwt'
  let userData = localStorage.getItem('userData')
  let user = localStorage.getItem('user')
  let token = null
  if (userData) {
    const parsed = JSON.parse(userData)
    token = parsed.token
  } else if (user) {
    const parsed = JSON.parse(user)
    token = parsed.token
  }
  if (!token) {
    return
  }
  try {
    const response = await $api.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data && response.data.nombres) {
      nombreUsuario.value = response.data.nombres
    }
  } catch {
    // Si falla, deja el nombre por defecto
  }
})
</script>

<style scoped>
/* Estilos para la barra de herramientas y sus elementos */
.header-toolbar {
  height: 64px; /* Altura de la barra de herramientas */
  padding: 0 24px; /* Padding horizontal */
  background-color: #18077b; /* Fondo azul */
  border-bottom: 1px solid #e0e0e0; /* Borde inferior sutil */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra ligera */
}

.logo-bg {
  display: flex;
  align-items: center;
  background: #222b45;
  border-radius: 12px;
  padding: 6px 18px 6px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 30px; /* Espacio después del logo */
}

.payflow-logo {
  width: 32px; /* Tamaño del logo */
  height: 32px;
  margin-right: 8px; /* Espacio entre logo y texto */
}

.pay-text {
  color: #fff; /* Color blanco para "Pay" */
}

.flow-text {
  color: #18077b; /* Color azul para "Flow" */
}

.logo-text {
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
}

.header-nav-btn {
  font-size: 1rem;
  font-weight: 500;
  color: #fcfcfd;
  padding: 0 16px;
  margin: 0 8px;
  min-height: 48px;
  border-radius: 0;
  background: transparent;
  transition:
    color 0.3s ease,
    background 0.3s ease,
    border-bottom 0.3s ease;
}

.header-nav-btn:hover {
  color: #fff;
  background: #2a1a8c; /* Azul más bajo al pasar el mouse */
}

.active-nav-btn {
  color: #fff !important;
  background: transparent !important;
  font-weight: bold;
  border-bottom: 4px solid #fff; /* Línea blanca abajo */
  box-shadow: none;
}

.header-icon-btn {
  color: #fcfcfd;
  font-size: 1.5rem;
  margin-left: 16px;
  background: transparent;
  transition:
    color 0.3s,
    background 0.3s;
}

.header-icon-btn:hover {
  color: #fff;
  background: #2a1a8c;
}

/* Estilo para el botón de usuario para que parezca un enlace de navegación */
.header-nav-btn-user {
  font-size: 1rem;
  font-weight: 500;
  color: #fcfcfd;
  padding: 0 16px;
  margin: 0 8px;
  min-height: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 0;
  background: transparent;
  transition:
    color 0.3s,
    background 0.3s;
}

.header-nav-btn-user:hover {
  color: #fff;
  background: #2a1a8c;
}

.nav-group {
  display: flex;
}

.nav-group-centered {
  justify-content: center;
  gap: 32px; /* Espaciado más uniforme entre botones */
  flex: 0 1 auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
}
</style>
