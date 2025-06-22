<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <HeaderComponent />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Enlaces Esenciales</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue' // Asegúrate de que esta ruta sea correcta
import HeaderComponent from 'components/Header/HeaderComponent.vue' // Importa tu nuevo componente de cabecera

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]

const leftDrawerOpen = ref(false)

// Si no tienes un botón en el HeaderComponent para activar el drawer,
// puedes eliminar esta función y la declaración de 'leftDrawerOpen'
// si el drawer se abre de otra manera o siempre está abierto con 'show-if-above'.
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>

<style scoped>
/* Estilos generales para el fondo de la página, si los quieres en el layout */
.q-page-container {
  background-color: #e0f2f7; /* Azul muy claro para el fondo de la página */
}
</style>
