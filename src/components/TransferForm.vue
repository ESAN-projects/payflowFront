<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
    <!-- Correo o alias -->
    <q-input v-model="emailOrAlias" label="Correo o alias del destinatario" filled required />

    <!-- Nombre del destinatario -->
    <q-input v-model="destinatarioNombre" label="Nombre del destinatario" filled required />

    <!-- Número de cuenta (automático si se encuentra por correo) -->
    <q-input v-model="cuentaDestino" label="Número de cuenta destino (API)" filled readonly />

    <!-- Número de cuenta (manual) -->
    <q-input
      v-model="cuentaDestinoManual"
      label="Número de cuenta destino (ingreso manual)"
      filled
      type="text"
      hint="Opcional: ingrésalo manualmente si lo conoces"
      class="q-mb-md"
    />

    <!-- Monto a transferir -->
    <q-input
      v-model.number="amount"
      type="number"
      label="Monto a transferir (S/.)"
      filled
      required
    />

    <!-- Botón de envío -->
    <q-btn
      label="Siguiente"
      type="submit"
      color="primary"
      :disable="loading"
      class="siguiente-btn"
    />

    <!-- Banner de error -->
    <q-banner v-if="errorMessage" class="bg-red text-white">
      {{ errorMessage }}
    </q-banner>

    <!-- Diálogo con resumen -->
    <q-dialog v-model="showSummary">
      <q-card>
        <q-card-section>
          <div class="text-h6">Resumen de la Transferencia</div>
          <p><strong>Destinatario:</strong> {{ destinatarioNombre }} ({{ emailOrAlias }})</p>
          <p><strong>Número de cuenta (API):</strong> {{ cuentaDestino }}</p>
          <p><strong>Número de cuenta (manual):</strong> {{ cuentaDestinoManual }}</p>
          <p><strong>Monto:</strong> S/. {{ amount.toFixed(2) }}</p>
          <p><strong>Saldo final:</strong> S/. {{ userBalance - amount }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-form>
</template>

<script>
import { ref } from 'vue'
import axios from 'boot/axios'
import { Notify } from 'quasar'

export default {
  name: 'TransferForm',
  setup() {
    const emailOrAlias = ref('')
    const destinatarioNombre = ref('')
    const cuentaDestino = ref('')
    const cuentaDestinoManual = ref('')
    const amount = ref(0)
    const errorMessage = ref('')
    const showSummary = ref(false)
    const loading = ref(false)

    const userEmail = 'usuario@payflow.com'
    const userBalance = 500
    const currentUser = { cuentaId: 2 }

    const handleSubmit = async () => {
      errorMessage.value = ''
      loading.value = true

      try {
        if (amount.value <= 1 || amount.value > userBalance) {
          throw new Error('El monto debe ser mayor a S/1 y menor o igual a tu saldo disponible.')
        }

        if (emailOrAlias.value === userEmail) {
          throw new Error('No puedes transferirte dinero a ti mismo.')
        }

        const usuarioRes = await axios.get(`/api/v1/usuarios?correo=${emailOrAlias.value}`)
        const destinatario = usuarioRes.data

        if (!destinatario || !destinatario.usuarioId) {
          throw new Error('Usuario destinatario no encontrado.')
        }

        cuentaDestino.value = destinatario.cuentaId // lo guardamos para mostrarlo en el resumen

        const body = {
          cuentaId: currentUser.cuentaId,
          tipoTransaccion: 'Transferencia',
          monto: amount.value,
          fechaHora: new Date().toISOString(),
          estado: 'Procesado',
          cuentaDestinoId: destinatario.cuentaId,
          ipOrigen: '192.168.1.10',
          ubicacion: 'Lima',
        }

        const cuentaRes = await axios.get(`/api/v1/Cuentas/usuario/${destinatario.usuarioId}`)
        const cuenta = cuentaRes.data

        if (!cuenta || !cuenta.numeroCuenta) {
          throw new Error('No se encontró una cuenta asociada al destinatario.')
        }

        cuentaDestino.value = cuenta.numeroCuenta

        // Solo después de tener la cuenta destino, realiza el POST
        const response = await axios.post(`/api/v1/Cuentas/usuario/${destinatario.usuarioId}`, body)

        if (response.status === 200 || response.data.success) {
          showSummary.value = true
          Notify.create({ type: 'positive', message: 'Transferencia realizada con éxito' })
        } else {
          throw new Error('No se pudo completar la transferencia.')
        }
      } catch (err) {
        errorMessage.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      emailOrAlias,
      destinatarioNombre,
      cuentaDestino,
      cuentaDestinoManual,
      amount,
      errorMessage,
      showSummary,
      loading,
      userBalance,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.q-form {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.q-card {
  background: #fff;
}

.siguiente-btn {
  min-width: 120px;
  max-width: 180px;
  width: auto;
  align-self: center;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 12px;
  padding-left: 24px;
  padding-right: 24px;
}
</style>
