<template>
  <q-page class="flex flex-center">
    <div class="transfer-flex-container">
      <div class="account-card">
        <div class="account-title">Cuenta Soles</div>
        <div class="account-number">{{ userAccountNumber }}</div>
        <div class="account-balance-label">Saldo disponible</div>
        <div class="account-balance">S/. {{ userBalance.toFixed(2) }}</div>
      </div>

      <div class="transfer-block">
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { Notify } from 'quasar' // Asegúrate de importar Notify

export default {
  name: 'TransferForm', // O TransferPage si lo estás usando como una página directamente
  setup() {
    const userBalance = 200
    const userAccountNumber = '200-34783322134'
    const currentStep = ref(1) // Generalmente, la transferencia inicia en paso 1, no en 2
    const emailOrAlias = ref('')
    const amount = ref(0)
    const destinationAccountNumber = ref('')
    const loading = ref(false)
    const errorMessage = ref('')

    function handleSubmit() {
      errorMessage.value = ''
      if (!emailOrAlias.value || !amount.value || amount.value <= 0) {
        errorMessage.value = 'Completa todos los campos correctamente.'
        return
      }
      if (amount.value > userBalance) {
        errorMessage.value = 'El monto excede tu saldo disponible.'
        return
      }
      // Simula obtener la cuenta de destino
      destinationAccountNumber.value = '123-45678901234'
      currentStep.value = 2
    }

    function handleConfirm() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        currentStep.value = 3
        Notify.create({ type: 'positive', message: 'Transferencia realizada con éxito' })
      }, 1200)
    }

    function resetForm() {
      currentStep.value = 1
      emailOrAlias.value = ''
      amount.value = 0
      destinationAccountNumber.value = ''
      errorMessage.value = ''
    }

    return {
      userBalance,
      userAccountNumber,
      currentStep,
      emailOrAlias,
      amount,
      destinationAccountNumber,
      loading,
      errorMessage,
      handleSubmit,
      handleConfirm,
      resetForm,
    }
  },
}
</script>

<style scoped>
.transfer-flex-container {
  display: flex;
  /* Cambios clave aquí para poner los elementos al lado.
     - justify-content: 'center' los agrupa al centro. 'space-around' o 'space-evenly'
       los distribuyen con espacio entre ellos y los bordes.
     - gap: Un espacio entre los elementos.
  */
  justify-content: center; /* O usa 'space-around' para más espacio entre y alrededor */
  align-items: flex-start; /* Alinea los ítems en la parte superior del contenedor flex */
  gap: 30px; /* Espacio entre el card de cuenta y el card de transferencia */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan a la siguiente línea en pantallas pequeñas */
  min-height: calc(100vh - 64px); /* Ajusta para la altura de la cabecera, si la tienes. */
  padding: 2rem 0;
}

.account-card {
  background: #fff;
  min-width: 300px;
  max-width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  /* border: 0px solid #d1d1e0; /* No necesitas un borde de 0px */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2.5rem;
  /* height: fit-content; */ /* Esto ya está por defecto, no es estrictamente necesario */
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
.transfer-block {
  /* No necesitas flex-basis o flex-grow/shrink si estás usando min/max-width y gap */
  /* flex: 1 1 350px; */ /* Puedes simplificar esto si solo quieres que tome espacio */
  min-width: 340px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */ /* Esto centraría verticalmente dentro de transfer-block */
}
.transfer-card {
  width: 100%;
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
