<template>
  <q-toolbar class="header-toolbar">
    <div class="logo-bg">
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

    <q-btn
      flat
      no-caps
      label="Mis operaciones"
      class="header-nav-btn"
      :class="{ 'active-nav-btn': $route.path === '/mis-operaciones' }"
      to="/mis-operaciones"
    />

    <div class="header-actions">
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
    </div>
  </q-toolbar>
</template>

<script setup>
// Los enlaces "to" dependen de Vue Router, que estará disponible en el contexto de tu app.
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
  color: #fcfcfd; /* Color por defecto de los enlaces */
  padding: 0 16px; /* Espaciado horizontal de los botones */
  margin: 0 8px; /* Margen entre botones */
  min-height: 48px; /* Altura mínima para clickable */
  border-radius: 0; /* Sin bordes redondeados */
  transition:
    color 0.3s ease,
    border-bottom 0.3s ease;
}

.header-nav-btn:hover {
  color: #8d90a9; /* Color al pasar el mouse */
}

.active-nav-btn {
  color: #1a237e !important; /* Color para el elemento activo */
  border-bottom: 3px solid #1a237e; /* Línea inferior para el activo */
  font-weight: bold;
}

.header-icon-btn {
  color: #fcfcfd; /* Color de los íconos */
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
  color: #fcfcfd;
  padding: 0 16px;
  margin: 0 8px;
  min-height: 48px;
  border-radius: 0;
  transition: color 0.3s ease;
}

.header-nav-btn-user:hover {
  color: #1a237e;
}

.nav-group {
  display: flex;
}

.nav-group-centered {
  justify-content: center;
  gap: 170px;
  flex: 0 1 auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
}
</style>
