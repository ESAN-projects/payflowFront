<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <HeaderComponent />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HeaderComponent from 'components/Header/HeaderComponent.vue' // Importa tu nuevo componente de cabecera
</script>

<style scoped>
/* Estilos generales para el fondo de la página, si los quieres en el layout */
.q-page-container {
  background-color: #f9fafc; /* Azul muy claro para el fondo de la página */
}
</style>
