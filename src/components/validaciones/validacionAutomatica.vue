<template>
  <div class="q-pa-md">
    <h5 class="q-mb-md">Validación automática</h5>

    <q-form class="q-gutter-md">
      <q-input filled v-model="cliente" label="Cliente" />
      <q-input filled v-model="documento" label="Nro Documento" />
    </q-form>

    <div class="q-mt-lg">
      <q-card flat bordered class="q-pa-md">
        <q-card-section>
          <q-layout view="hHh lpR fFf">
            <q-page-container>
              <div class="row q-col-gutter-md">
                <!-- Columna izquierda: Vista previa del voucher -->
                <div class="col-12 col-md-6">
                  <div class="text-subtitle2 q-mb-sm">Vista previa del voucher</div>
                  <q-img
                    :src="vistaPreviaUrl"
                    spinner-color="primary"
                    class="q-mb-md full-width"
                    style="max-width: 700px; object-fit: scale-down"
                    v-if="vistaPreviaUrl"
                  />
                  <q-uploader
                    ref="uploader"
                    accept=".png, .jpg, .jpeg, .webp"
                    label="Subir voucher"
                    :auto-upload="false"
                    @added="procesarImagen"
                    style="max-width: 100%"
                  />
                </div>

                <!-- Columna derecha: Texto detectado -->
                <!-- <div class="col-12 col-md-6">
                  <div class="text-subtitle2 q-mb-sm">Texto detectado</div>
                  <q-card class="q-pa-md bg-grey-2" style="min-height: 400px">
                    <pre style="white-space: pre-wrap">{{ textoDetectado }}</pre>
                  </q-card>
                </div> -->

                <div class="q-mt-md">
                  <div class="text-subtitle2">Datos detectados</div>
                  <q-form class="q-gutter-md q-mt-sm">
                    <q-input
                      v-model="numeroOperacion"
                      label="Número de operación"
                      filled
                      readonly
                    />
                    <q-input v-model="montoDetectado" label="Monto (S/)" filled readonly />
                    <q-input v-model="numeroCuenta" label="Número de cuenta" filled readonly />
                    <q-input v-model="fechaHoraDetectada" label="Fecha y hora" filled readonly />
                  </q-form>

                  <q-btn
                    label="Validar depósito"
                    color="primary"
                    @click="validarDeposito"
                    class="q-mt-md"
                    :disable="
                      !numeroOperacion || !montoDetectado || !numeroCuenta || !fechaHoraDetectada
                    "
                  />

                  <div v-if="resultadoValidacion" class="q-mt-md">
                    <q-banner
                      :class="
                        resultadoValidacion.exito ? 'bg-green-3 text-black' : 'bg-red-3 text-black'
                      "
                      rounded
                    >
                      {{ resultadoValidacion.mensaje }}
                    </q-banner>
                  </div>
                </div>
              </div>

              <!-- <q-btn
                label="Validar depósito"
                color="primary"
                @click="validarDeposito"
                class="q-mt-md"
              /> -->

              <div v-if="resultadoValidacion" class="q-mt-md">
                <q-banner
                  :class="
                    resultadoValidacion.exito ? 'bg-green-3 text-black' : 'bg-red-3 text-black'
                  "
                  rounded
                >
                  {{ resultadoValidacion.mensaje }}
                </q-banner>
              </div>
            </q-page-container>
          </q-layout>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tesseract from 'tesseract.js'
import { useQuasar } from 'quasar'

const cliente = ref('')
const documento = ref('')
const textoDetectado = ref('')
const vistaPreviaUrl = ref('')

const montoDetectado = ref('')
const numeroOperacion = ref('')
const numeroCuenta = ref('')
const fechaHoraDetectada = ref('')
const resultadoValidacion = ref(null)

const $q = useQuasar()

function procesarImagen(archivos) {
  const imagen = archivos[0]
  if (!imagen) return

  vistaPreviaUrl.value = URL.createObjectURL(imagen)
  textoDetectado.value = 'Procesando...'

  Tesseract.recognize(imagen, 'spa', {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        console.log(`[OCR] Progreso: ${Math.floor(m.progress * 100)}%`)
      }
    },
  })
    .then(({ data: { text } }) => {
      const lineas = text.split('\n').map((l) => l.trim().toLowerCase())
      console.log('[OCR] Líneas detectadas:', lineas)

      // Detectar número de operación
      const lineaOperacion = lineas.find(
        (l) => l.includes('número de solicitud') || l.includes('numero de solicitud'),
      )
      const numeroOperacionExtraido = lineaOperacion?.match(/\d{6,}/)?.[0] || ''

      // Detectar cuenta de destino
      const lineaCuenta = lineas.find((l) => l.includes('cuenta de destino'))
      const cuentaMatch = lineaCuenta?.match(/(\d{3})-(\d{6,})/)
      const numeroCuentaExtraido = cuentaMatch ? cuentaMatch[1] + cuentaMatch[2] : ''

      // Detectar monto
      let montoExtraido = ''
      const indexMonto = lineas.findIndex((l) => l.includes('monto'))

      if (indexMonto >= 0) {
        const lineaActual = lineas[indexMonto]
        const lineaSiguiente = lineas[indexMonto + 1] || ''

        // Buscar en línea actual o siguiente
        let lineaBusqueda = lineaActual + ' ' + lineaSiguiente

        // Normalizar errores típicos del OCR
        lineaBusqueda = lineaBusqueda
          .replace(/(\$1|5\/|s\/|s\\|s\|)/gi, 'S/') // Corrige errores comunes
          .replace(/s\s*\/\s*/gi, 'S/') // s / 41.80 → S/41.80
          .replace(/s\/\s*\.\s*/gi, 'S/ 0.') // S/ .80 → S/ 0.80
          .replace(/S\/\s*(\d)\.(\d{2})\.(\d{2})/, 'S/ $1$2.$3') // S/ 1.41.80 → S/ 141.80
          .replace(/(?<!S)\/(\d)/g, 'S/ $1') // /41.80 → S/ 41.80

        const montoMatch = lineaBusqueda.match(/S\/\s*\d+(\.\d{1,2})?/)
        if (montoMatch) {
          // Formatear limpio
          const limpio = montoMatch[0].replace(/\s+/, '').replace('S/', 'S/ ')
          montoExtraido = limpio
        }
      }

      // Detectar fecha y hora
      let fechaMatch = ''
      let horaMatch = ''
      for (const linea of lineas) {
        if (!fechaMatch && linea.includes('fecha')) {
          const match = linea.match(/(\d{2}\/\d{2}\/\d{4})/)
          if (match) fechaMatch = match[0]
        }
        if (!horaMatch && linea.includes('hora')) {
          const match = linea.match(/(\d{1,2}:\d{2}\s?(a\.?m\.?|p\.?m\.?))/i)
          if (match) horaMatch = match[0].replace(/\./g, '').toUpperCase()
        }
      }

      const fechaHoraFinal = fechaMatch && horaMatch ? `${fechaMatch} ${horaMatch}` : ''

      // Actualiza los valores reactivos (ref)
      numeroOperacion.value = numeroOperacionExtraido
      numeroCuenta.value = numeroCuentaExtraido
      console.log('[OCR] Monto extraído:', montoExtraido)
      montoDetectado.value = montoExtraido
      fechaHoraDetectada.value = fechaHoraFinal

      textoDetectado.value = text // Texto completo por si deseas mostrarlo
    })

    .catch((error) => {
      textoDetectado.value = 'Error al procesar la imagen'
      console.error(error)
    })
}

async function validarDeposito() {
  try {
    if (
      !numeroOperacion.value ||
      !montoDetectado.value ||
      !numeroCuenta.value ||
      !fechaHoraDetectada.value
    ) {
      resultadoValidacion.value = { mensaje: 'Faltan datos del voucher', exito: false }
      return
    }

    // Limpia el monto y lo convierte a número
    const monto = parseFloat(montoDetectado.value.replace('S/', '').trim())

    // Convierte la fecha a ISO 8601 (ej: "2024-11-11T14:38:00")
    const [fechaStr, horaStr] = fechaHoraDetectada.value.split(' ')
    const [dd, mm, yyyy] = fechaStr.split('/')
    let [hh, min] = horaStr.split(':')
    const isPM = horaStr.toLowerCase().includes('pm')
    let hora = parseInt(hh)
    if (isPM && hora < 12) hora += 12
    if (!isPM && hora === 12) hora = 0

    const fechaISO = new Date(
      parseInt(yyyy),
      parseInt(mm) - 1,
      parseInt(dd),
      hora,
      parseInt(min),
    ).toISOString()

    // Recupera token JWT desde localStorage (ajusta si usas Pinia o Vuex)
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    const token = userData.token

    if (!token) {
      $q.notify({ type: 'negative', message: 'No hay token disponible' })
      return
    }

    const response = await fetch('http://localhost:5077/api/v1/transacciones/validar-deposito', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        numeroOperacion: numeroOperacion.value,
        monto: monto,
        numeroCuenta: numeroCuenta.value,
        fechaHora: fechaISO,
        // cuentaId no se envía porque lo extraerás del token en el backend
      }),
    })

    const data = await response.json()
    resultadoValidacion.value = data
  } catch (err) {
    console.error('❌ Error al validar depósito:', err)
    resultadoValidacion.value = { mensaje: 'Error al contactar el servidor', exito: false }
  }
}
</script>
