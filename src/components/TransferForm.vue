<template>
  <q-row class="transfer-main-row q-col-gutter-xl">
    <!-- Tarjeta Cuenta Soles -->
    <q-col cols="12" md="5" class="flex flex-center">
      <q-card class="account-card">
        <q-card-section class="text-center">
          <div class="account-title">Cuenta Soles</div>
          <div class="account-number">{{ userAccountNumber }}</div>
          <div class="account-balance-label">Saldo disponible</div>
          <div class="account-balance">S/. {{ userBalance.toFixed(2) }}</div>
        </q-card-section>
      </q-card>
    </q-col>

    <!-- Tarjeta Transferencia -->
    <q-col cols="12" md="7" class="flex flex-center">
      <q-card class="transfer-card">
        <q-card-section>
          <div class="transfer-title text-center">Transfiere</div>
          <div class="step-indicators q-mb-md flex flex-center">
            <q-btn round flat :color="currentStep >= 1 ? 'primary' : 'grey'" label="1" />
            <q-icon name="arrow_right" size="sm" class="q-mx-sm" />
            <q-btn round flat :color="currentStep >= 2 ? 'primary' : 'grey'" label="2" />
            <q-icon name="arrow_right" size="sm" class="q-mx-sm" />
            <q-btn round flat :color="currentStep >= 3 ? 'primary' : 'grey'" label="3" />
          </div>

          <!-- Paso 2: Confirmación -->
          <div v-if="currentStep === 2" class="confirmation-summary-card">
            <div class="text-h6 text-positive text-center q-mb-md">
              Confirmación de transferencia
            </div>
            <div class="confirm-labels">
              <p>
                <span class="label">Cuenta de cargo:</span>
                <span class="value">{{ userAccountNumber }}</span>
              </p>
              <p>
                <span class="label">Cuenta de destino:</span>
                <span class="value">{{ destinationAccountNumber }}</span>
              </p>
              <p>
                <span class="label">Moneda y monto:</span>
                <span class="value amount">S/. {{ amount.toFixed(2) }}</span>
              </p>
            </div>
            <div class="q-mt-lg flex flex-center">
              <q-btn
                label="Confirmar"
                color="primary"
                class="confirm-btn"
                @click="handleConfirm"
                :disable="loading"
              />
            </div>
          </div>

          <!-- Paso 1: Formulario -->
          <div v-else-if="currentStep === 1">
            <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
              <q-input
                v-model="emailOrAlias"
                label="Correo o alias del destinatario"
                filled
                required
              />
              <q-input
                v-model.number="amount"
                type="number"
                label="Monto a transferir (S/.)"
                filled
                required
              />
              <q-btn
                label="Siguiente"
                type="submit"
                color="primary"
                :disable="loading"
                class="full-width-btn"
              />
              <q-banner v-if="errorMessage" class="bg-red text-white q-mt-md">{{
                errorMessage
              }}</q-banner>
            </q-form>
          </div>

          <!-- Paso 3: Éxito -->
          <div v-else-if="currentStep === 3" class="text-center q-pa-lg">
            <q-icon name="check_circle" color="green" size="xl" />
            <div class="text-h6 q-mt-md">¡Transferencia exitosa!</div>
            <p>Monto: S/. {{ amount.toFixed(2) }} transferido a {{ emailOrAlias }}</p>
            <q-btn
              label="Realizar otra transferencia"
              color="primary"
              class="q-mt-md full-width-btn"
              @click="resetForm"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-col>
  </q-row>
</template>

<script>
import { ref } from 'vue'
import { Notify } from 'quasar'

export default {
  name: 'TransferForm',
  setup() {
    const emailOrAlias = ref('')
    const amount = ref(0)
    const errorMessage = ref('')
    const loading = ref(false)
    const currentStep = ref(2) // Por defecto en paso 2 para mostrar confirmación

    const userEmail = 'usuario@payflow.com'
    const userBalance = 200
    const userAccountNumber = '200-34783322134'

    const destinationAccountNumber = ref('200-34783377135') // Simulado para demo
    const cuentaDestinoId = ref(null)

    // Si quieres que inicie en paso 1, cambia currentStep.value = 1
    // y ajusta la lógica de handleSubmit/handleConfirm

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
        // Simulación de búsqueda de usuario
        destinationAccountNumber.value = '200-34783377135'
        cuentaDestinoId.value = 3
        currentStep.value = 2
      } catch (err) {
        errorMessage.value = err.message
      } finally {
        loading.value = false
      }
    }

    const handleConfirm = async () => {
      errorMessage.value = ''
      loading.value = true
      try {
        // Simulación de post
        setTimeout(() => {
          currentStep.value = 3
          Notify.create({ type: 'positive', message: 'Transferencia realizada con éxito' })
          loading.value = false
        }, 800)
      } catch (err) {
        errorMessage.value =
          err.message || 'Ocurrió un error inesperado al confirmar la transferencia.'
        loading.value = false
      }
    }

    const resetForm = () => {
      emailOrAlias.value = ''
      amount.value = 0
      errorMessage.value = ''
      currentStep.value = 1
      destinationAccountNumber.value = ''
      cuentaDestinoId.value = null
    }

    return {
      emailOrAlias,
      amount,
      errorMessage,
      loading,
      currentStep,
      userBalance,
      userAccountNumber,
      destinationAccountNumber,
      handleSubmit,
      handleConfirm,
      resetForm,
    }
  },
}
</script>

<style scoped>
.transfer-main-row {
  min-height: 70vh;
  align-items: center;
}
.account-card {
  min-width: 300px;
  max-width: 350px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  border: 1px solid #d1d1e0;
}
.account-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #18077b;
  margin-bottom: 8px;
}
.account-number {
  font-size: 1.3rem;
  font-weight: 600;
  color: #888;
  margin-bottom: 8px;
}
.account-balance-label {
  color: #888;
  font-size: 1rem;
  margin-bottom: 4px;
}
.account-balance {
  font-size: 1.5rem;
  font-weight: bold;
  color: #18077b;
  margin-top: 8px;
}
.transfer-card {
  min-width: 340px;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #18077b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
.transfer-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #18077b;
  border-bottom: 2px solid #18077b;
  padding-bottom: 4px;
  margin-bottom: 16px;
}
.step-indicators .q-btn {
  font-weight: bold;
  min-width: 32px;
}
.step-indicators .q-icon {
  color: #ccc;
}
.step-indicators .q-btn[color='primary'] + .q-icon {
  color: var(--q-primary);
}
.confirm-labels {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 16px;
}
.confirm-labels .label {
  font-weight: 500;
  color: #888;
}
.confirm-labels .value {
  font-weight: bold;
  color: #222;
}
.confirm-labels .amount {
  color: #18077b;
}
.confirm-btn {
  width: 220px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 6px;
  background: #18077b;
}
.confirm-btn:deep(.q-btn__content) {
  color: #fff;
}
.full-width-btn {
  width: 100%;
  font-weight: bold;
  font-size: 1.1em;
  margin-top: 16px;
}
.text-positive {
  color: #00b300 !important;
}
</style>
