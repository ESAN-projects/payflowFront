<template>
  <q-toolbar class="header-toolbar">
    <div class="logo-container">
      <img src="~assets/PayFlowS.jpg" alt="PayFlow Logo" class="payflow-logo" />
      <span class="logo-text">PayFlow</span>
    </div>

    <q-space />

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

    <q-space />

    <q-btn flat round dense icon="notifications" class="header-icon-btn" />
    <q-btn flat no-caps class="header-nav-btn-user">
      <q-icon name="person" class="header-icon-btn q-mr-xs" />
      Usuario
      <q-icon name="arrow_drop_down" size="xs" />
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>Perfil</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Cerrar Sesión</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn flat round dense icon="settings" class="header-icon-btn" />
  </q-toolbar>
</template>

<script setup>
// En este componente de cabecera no necesitas ningún script específico
// a menos que quieras manejar algo localmente como un estado de menú desplegable.
// Los enlaces "to" dependen de Vue Router, que estará disponible en el contexto de tu app.
</script>

<style scoped>
/* Estilos para la barra de herramientas y sus elementos */
.header-toolbar {
  height: 64px; /* Altura de la barra de herramientas */
  padding: 0 24px; /* Padding horizontal */
  background-color: #ffffff; /* Fondo blanco */
  border-bottom: 1px solid #e0e0e0; /* Borde inferior sutil */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra ligera */
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

.logo-text {
  font-size: 1.4rem;
  font-weight: bold;
  color: #1a237e; /* Color del texto del logo */
  text-transform: uppercase;
}

.header-nav-btn {
  font-size: 1rem;
  font-weight: 500;
  color: #555555; /* Color por defecto de los enlaces */
  padding: 0 16px; /* Espaciado horizontal de los botones */
  margin: 0 8px; /* Margen entre botones */
  min-height: 48px; /* Altura mínima para clickable */
  border-radius: 0; /* Sin bordes redondeados */
  transition:
    color 0.3s ease,
    border-bottom 0.3s ease;
}

.header-nav-btn:hover {
  color: #1a237e; /* Color al pasar el mouse */
}

.active-nav-btn {
  color: #1a237e !important; /* Color para el elemento activo */
  border-bottom: 3px solid #1a237e; /* Línea inferior para el activo */
  font-weight: bold;
}

.header-icon-btn {
  color: #555555; /* Color de los íconos */
  font-size: 1.5rem; /* Tamaño de los íconos */
  margin-left: 16px; /* Espacio entre íconos */
}

.header-icon-btn:hover {
  color: #1a237e; /* Color al pasar el mouse por los íconos */
}

/* Estilo para el botón de usuario para que parezca un enlace de navegación */
.header-nav-btn-user {
  font-size: 1rem;
  font-weight: 500;
  color: #555555;
  padding: 0 16px;
  margin: 0 8px;
  min-height: 48px;
  border-radius: 0;
  transition: color 0.3s ease;
}

.header-nav-btn-user:hover {
  color: #1a237e;
}
</style>
