<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <HeaderComponent />
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Quasar App</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-header v-else-if="$route.meta.payflowHeader">
      <HeaderComponent @toggleDrawer="toggleLeftDrawer" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered v-if="$route.meta.quasarHeader">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" href="https://quasar.dev" target="_blank">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>Docs</q-item-section>
        </q-item>
        <q-item clickable tag="a" href="https://github.com/quasarframework/quasar" target="_blank">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>Github</q-item-section>
        </q-item>
        <q-item clickable tag="a" href="https://chat.quasar.dev" target="_blank">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>Discord Chat Channel</q-item-section>
        </q-item>
        <q-item clickable tag="a" href="https://forum.quasar.dev" target="_blank">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>Forum</q-item-section>
        </q-item>
        <q-item clickable tag="a" href="https://twitter.com/quasarframework" target="_blank">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>Twitter</q-item-section>
        </q-item>
        <q-item clickable tag="a" href="https://facebook.com/quasarframework" target="_blank">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>Facebook</q-item-section>
        </q-item>
        <q-item clickable tag="a" href="https://awesome.quasar.dev" target="_blank">
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>Quasar Awesome</q-item-section>
        </q-item>
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
import HeaderComponent from 'components/Header/HeaderComponent.vue'

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
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.q-page-container {
  background-color: #f9fafc;
}
</style>
