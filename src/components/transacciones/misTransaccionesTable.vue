<template>
  <div style="margin-right: 2rem">
    <q-table
      title="Mis Transacciones"
      :rows="rows"
      :columns="columns"
      row-key="transaccionId"
      class="q-mt-md bg-blue-1"
      flat
      bordered
    >
      <template v-slot:body-cell-monto="props">
        <q-td :props="props" class="text-center">
          <span
            :class="[
              props.row.tipoTransaccion === 'Retiro' ? 'text-negative' : 'text-primary',
              'text-weight-bold',
            ]"
          >
            {{
              props.row.tipoTransaccion === 'Retiro'
                ? `- S/ ${props.row.monto}`
                : `S/ ${props.row.monto}`
            }}
          </span>
        </q-td>
      </template>
    </q-table>

    <div class="row q-mt-md q-gutter-md justify-center">
      <q-btn color="primary" label="Descargar CSV" @click="exportToCSV" icon="download" />
      <q-btn color="primary" label="Descargar Excel" @click="exportToExcel" icon="download" />
    </div>
  </div>
</template>

<!-- <script>
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { defineProps } from 'vue'

export default {
  setup() {
    const props = defineProps({
      filtroTipo: {
        type: String,
        default: 'Todos',
      },
    })

    const originalRows = ref([])

    function filtrarPorTipo(tipo) {
      if (tipo === 'Todos') {
        rows.value = [...originalRows.value]
      } else {
        rows.value = originalRows.value.filter((r) => r.tipoTransaccion === tipo)
      }
    }

    watch(
      () => props.filtroTipo,
      (nuevo) => {
        filtrarPorTipo(nuevo)
      },
    )

    const $q = useQuasar()
    const columns = [
      { name: 'tipoTransaccion', label: 'Tipo', align: 'center', field: 'tipoTransaccion' },
      { name: 'monto', label: 'Monto', align: 'center', field: 'monto' },
      { name: 'estado', label: 'Estado', align: 'center', field: 'estado' },
      { name: 'fecha', label: 'Fecha', align: 'center', field: 'fechaHora' },
    ]

    const rows = ref([])

    onMounted(async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}') // asegúrate que esté almacenado ahí
        const token = userData.token
        // console.log('Token:', token)

        if (!token) {
          $q.notify({ type: 'negative', message: 'No hay token disponible' })
          return
        }

        const response = await fetch(
          'http://localhost:5077/api/v1/Transacciones/mis-transacciones',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const mapped = data.map((t) => ({
          tipoTransaccion: t.tipoTransaccion,
          monto: t.monto,
          estado: t.estado,
          fechaHora: new Date(t.fechaHora).toLocaleString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))

        //console.log('Transacciones:', data)
        // rows.value = data.map((t) => ({
        //   tipoTransaccion: t.tipoTransaccion,
        //   monto: t.monto,
        //   estado: t.estado,
        //   fechaHora: new Date(t.fechaHora).toLocaleString('es-PE', {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //   }),
        // }))

        rows.value = mapped
        originalRows.value = mapped

        filtrarPorTipo(props.filtroTipo)
      } catch (error) {
        console.error('❌ Error al cargar transacciones:', error)
        $q.notify({ type: 'negative', message: 'No se pudieron cargar las transacciones' })
      }
    })

    function exportToCSV() {
      const csvContent = [
        ['Tipo', 'Monto', 'Estado', 'Fecha'],
        ...rows.value.map((row) => [row.tipo, row.monto, row.estado, row.fecha]),
      ]
        .map((e) => e.join(','))
        .join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      saveAs(blob, 'transacciones.csv')
    }

    function exportToExcel() {
      const ws = XLSX.utils.json_to_sheet(rows.value)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Transacciones')
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([wbout], { type: 'application/octet-stream' })
      saveAs(blob, 'transacciones.xlsx')
    }

    return {
      columns,
      rows,
      exportToCSV,
      exportToExcel,
    }
  },
}
</script> -->

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const props = defineProps({
  filtroTipo: {
    type: String,
    default: 'Todos',
  },
})

const $q = useQuasar()

const columns = [
  { name: 'tipoTransaccion', label: 'Tipo', align: 'center', field: 'tipoTransaccion' },
  { name: 'monto', label: 'Monto', align: 'center', field: 'monto' },
  { name: 'estado', label: 'Estado', align: 'center', field: 'estado' },
  { name: 'fecha', label: 'Fecha', align: 'center', field: 'fechaHora' },
]

const rows = ref([])
const originalRows = ref([])

function filtrarPorTipo(tipo) {
  if (tipo === 'Todos') {
    rows.value = [...originalRows.value]
  } else {
    rows.value = originalRows.value.filter((r) => r.tipoTransaccion === tipo)
  }
}

watch(
  () => props.filtroTipo,
  (nuevo) => {
    filtrarPorTipo(nuevo)
  },
)

onMounted(async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    const token = userData.token

    if (!token) {
      $q.notify({ type: 'negative', message: 'No hay token disponible' })
      return
    }

    const response = await fetch('http://localhost:5077/api/v1/Transacciones/mis-transacciones', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    const mapped = data.map((t) => ({
      tipoTransaccion: t.tipoTransaccion,
      monto: t.monto,
      estado: t.estado,
      fechaHora: new Date(t.fechaHora).toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }))

    rows.value = mapped
    originalRows.value = mapped

    filtrarPorTipo(props.filtroTipo)
  } catch (error) {
    console.error('❌ Error al cargar transacciones:', error)
    $q.notify({ type: 'negative', message: 'No se pudieron cargar las transacciones' })
  }
})

function exportToCSV() {
  const csvContent = [
    ['Tipo', 'Monto', 'Estado', 'Fecha'],
    ...rows.value.map((row) => [row.tipoTransaccion, row.monto, row.estado, row.fechaHora]),
  ]
    .map((e) => e.join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'transacciones.csv')
}

function exportToExcel() {
  const exportData = rows.value.map((row) => ({
    Tipo: row.tipoTransaccion,
    Monto: row.monto,
    Estado: row.estado,
    Fecha: row.fechaHora,
  }))

  const ws = XLSX.utils.json_to_sheet(exportData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Transacciones')
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], { type: 'application/octet-stream' })
  saveAs(blob, 'transacciones.xlsx')
}
</script>
