<template>
  <div class="transacciones-page">
    <div class="transacciones-filter q-ml-md q-mr-xl">
      <TransaccionesFilter
        @cambio-tipo="aplicarFiltro"
        @buscar-fechas="buscarTransaccionesPorFecha"
      />
    </div>

    <div class="transacciones-list">
      <TransaccionesList :filtroTipo="filtroTipo" />
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
import TransaccionesFilter from 'src/components/transacciones/misTransaccionesFilter.vue'

export default {
  name: 'TransaccionesPage',
  components: { TransaccionesList, TransaccionesFilter },
  data() {
    return {
      filtroTipo: 'Todos',
      filtroFechas: null,
    }
  },
  methods: {
    aplicarFiltro(nuevoValor) {
      this.filtroTipo = nuevoValor
    },
    buscarTransaccionesPorFecha(filtros) {
      console.log('🔍 Buscar por fechas:', filtros)
      // Aquí luego implementarás la lógica real de consulta a la API
    },
  },
}
</script>
