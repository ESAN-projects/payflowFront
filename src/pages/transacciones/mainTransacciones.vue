<template>
  <div class="transacciones-page">
    <div class="transacciones-filter q-ml-md q-mr-xl">Filtro</div>

    <div class="transacciones-list">
      <TransaccionesList />
    </div>
  </div>
</template>

<style>
.transacciones-page {
  display: flex;
  justify-content: space-between;
}

.transacciones-filter {
  width: 25%;
}

.transacciones-list {
  width: 75%;
}
</style>

<script>
// import ProductFilter from 'src/components/product/ProductFilter.vue'
import TransaccionesList from 'src/components/transacciones/misTransaccionesTable.vue'
export default {
  name: 'TransaccionesPage',
  components: { TransaccionesList },
  data() {
    return {
      // Aquí puedes definir los datos necesarios para la página de productos
      // categoriaFiltrada: null,
    }
  },
  // methods: {
  //   actualizarCategoria(categoriaId) {
  //     // Aquí puedes manejar el cambio de categoría, por ejemplo, filtrando productos
  //     console.log('Categoría seleccionada:', categoriaId)
  //     this.categoriaFiltrada = categoriaId
  //     // Puedes emitir un evento o realizar una acción para actualizar la lista de productos
  //   },
  //   // Aquí puedes definir los métodos necesarios para la página de productos
  // },
}
</script>
