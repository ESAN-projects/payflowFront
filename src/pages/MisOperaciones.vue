<template>
  <q-page class="flex flex-center">
    <div class="transfer-flex-container">
      <!-- TARJETA DE LA CUENTA -->
      <div class="account-card">
        <div class="account-title">Cuenta Soles</div>
        <div class="account-number">{{ userAccountNumber }}</div>
        <div class="account-balance-label">Saldo disponible</div>
        <div class="account-balance">S/. {{ userBalance.toFixed(2) }}</div>
        <q-btn
          label="Iniciar operaciones"
          color="primary"
          class="q-mt-md"
          @click="currentStep = 1"
        />
      </div>

      <!-- BLOQUES DE OPCIONES -->
      <div class="option-card" v-if="currentStep === 0">
        <div class="option-buttons">
          <div class="operation-block" @click="currentStep = 1">Transfiere</div>
          <div class="operation-block inactive">Retiro</div>
        </div>
      </div>

      <!-- FORMULARIO DE TRANSFERENCIA -->
      <div class="transfer-block" v-if="currentStep === 1">
        <q-card class="transfer-card">
          <q-card-section>
            <div class="transfer-title text-center">Transfiere</div>

            <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
              <q-input
                v-model="emailOrAlias"
                label="Correo o alias del destinatario"
                filled
                required
              />

              <q-input
                v-model="cuentaDestinoManual"
                label="Número de cuenta destino (manual)"
                filled
                type="text"
                inputmode="numeric"
                maxlength="20"
                pattern="[0-9]*"
                :rules="[(val) => /^\d*$/.test(val) || 'Solo se permiten números']"
              />

              <q-input
                v-model.number="amount"
                type="number"
                min="0"
                label="Monto a transferir (S/.)"
                filled
                :rules="[(val) => val > 0 || 'El monto debe ser mayor a cero']"
                required
              />

              <q-btn
                label="Siguiente"
                type="submit"
                color="primary"
                :disable="loading"
                class="siguiente-btn"
              />

              <q-banner v-if="errorMessage" class="bg-red text-white q-mt-md">
                {{ errorMessage }}
              </q-banner>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <!-- CONFIRMACIÓN -->
      <div v-else-if="currentStep === 2" class="transfer-block">
        <q-card class="transfer-card">
          <q-card-section>
            <div class="text-h6 text-positive text-center q-mb-md">
              Confirmación de transferencia
            </div>
            <div class="confirm-labels">
              <p>
                <span class="label">Cuenta de cargo:</span
                ><span class="value">{{ userAccountNumber }}</span>
              </p>
              <p>
                <span class="label">Cuenta de destino:</span
                ><span class="value">{{ cuentaDestinoManual }}</span>
              </p>
              <p>
                <span class="label">Moneda y monto:</span
                ><span class="value amount">S/. {{ amount.toFixed(2) }}</span>
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
          </q-card-section>
        </q-card>
      </div>

      <!-- ÉXITO -->
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
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { Notify } from 'quasar'

export default {
  name: 'TransferPage',
  setup() {
    const userBalance = 200
    const userAccountNumber = '200-34783322134'
    const currentStep = ref(0) // empieza en 0 para mostrar los bloques
    const emailOrAlias = ref('')
    const cuentaDestinoManual = ref('')
    const amount = ref(0)
    const loading = ref(false)
    const errorMessage = ref('')

    function handleSubmit() {
      errorMessage.value = ''

      if (!emailOrAlias.value || !amount.value) {
        errorMessage.value = 'Completa todos los campos correctamente.'
        return
      }

      if (amount.value <= 0) {
        errorMessage.value = 'El monto debe ser mayor a cero.'
        return
      }

      if (amount.value > userBalance) {
        errorMessage.value = 'El monto excede tu saldo disponible.'
        return
      }

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
      currentStep.value = 0
      emailOrAlias.value = ''
      cuentaDestinoManual.value = ''
      amount.value = 0
      errorMessage.value = ''
    }

    return {
      userBalance,
      userAccountNumber,
      currentStep,
      emailOrAlias,
      cuentaDestinoManual,
      amount,
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
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
  min-height: calc(100vh - 64px);
  padding: 2rem 0;
}
.account-card {
  background: #fff;
  min-width: 300px;
  max-width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2.5rem;
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
.option-card {
  min-width: 340px;
  max-width: 420px;
}
.option-buttons {
  display: flex;
  justify-content: space-around;
  gap: 12px;
}
.operation-block {
  width: 150px;
  height: 150px;
  background-color: #dcdcdc;
  color: #444;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
}
.operation-block.inactive {
  opacity: 0.5;
  cursor: not-allowed;
}
.transfer-block {
  min-width: 340px;
  max-width: 420px;
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
.full-width-btn {
  width: 100%;
  font-weight: bold;
  font-size: 1.1em;
  margin-top: 16px;
}
.text-positive {
  color: #00b300 !important;
}
.siguiente-btn {
  font-size: 0.9rem;
  padding: 6px 12px;
  min-width: 120px;
  max-width: 220px;
  width: auto;
  font-weight: 600;
  display: block;
  margin: 18px auto 0 auto;
}
</style>
