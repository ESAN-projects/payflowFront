<template>
  <div class="q-pa-md row q-gutter-md">
    <div class="col-12 col-md-12">
      <q-card bordered class="q-pa-md">
        <div class="text-subtitle1 q-mb-sm">Filtrar por</div>
        <q-option-group
          v-model="tipoFiltroLocal"
          :options="[
            { label: 'Depósitos', value: 'Deposito' },
            { label: 'Retiros', value: 'Retiro' },
            { label: 'Todas las transacciones', value: 'Todos' },
          ]"
          type="radio"
          @update:model-value="emitirFiltro"
        />
        <q-separator class="q-my-sm" />
        <div class="q-mb-sm">Fecha de Inicio</div>
        <q-input filled v-model="fechaInicio" mask="####/##/##" placeholder="yyyy/mm/dd">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="fechaInicio" mask="YYYY/MM/DD" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="q-mt-sm q-mb-sm">Fecha de Fin</div>
        <q-input filled v-model="fechaFin" mask="####/##/##" placeholder="yyyy/mm/dd">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="fechaFin" mask="YYYY/MM/DD" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn
          class="q-mt-md full-width"
          color="primary"
          label="Aplicar filtros"
          @click="aplicarFiltros"
        />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tipoFiltroLocal = ref('Todos')
const fechaInicio = ref(null)
const fechaFin = ref(null)

const emit = defineEmits(['cambio-tipo', 'buscar-fechas'])

function emitirFiltro() {
  emit('cambio-tipo', tipoFiltroLocal.value)
}

function aplicarFiltros() {
  emit('buscar-fechas', {
    tipo: tipoFiltroLocal.value,
    fechaInicio,
    fechaFin,
  })
}
</script>
