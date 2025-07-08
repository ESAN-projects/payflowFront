<template>
  <HeaderComponent />
  <div class="inicio-container">
    <h1>Bienvenido a la página de inicio</h1>
    <p>Esta es la página principal de tu aplicación.</p>
    <p>Aquí puedes agregar más contenido o componentes según sea necesario.</p>
  </div>
</template>

<script>
import HeaderComponent from 'components/Header/HeaderComponent.vue'
export default {
  name: 'InicioPage',
  components: { HeaderComponent },
}
</script>

<style></style>
