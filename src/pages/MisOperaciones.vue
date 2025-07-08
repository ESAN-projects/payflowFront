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
          <div class="operation-block" @click="currentStep = 'retiro'">Retiro</div>
        </div>
      </div>

      <!-- FORMULARIO DE TRANSFERENCIA (PASO 1) -->
      <div class="transfer-block" v-if="currentStep === 1 && transferStep === 1">
        <q-card class="transfer-card">
          <q-card-section>
            <div class="row items-center justify-center q-mb-md">
              <q-btn
                round
                :color="transferStep >= 1 ? 'primary' : 'grey-4'"
                size="sm"
                label="1"
                :flat="transferStep !== 1"
              />
              <q-btn
                round
                :color="transferStep >= 2 ? 'primary' : 'grey-4'"
                size="sm"
                label="2"
                class="q-ml-md q-mr-md"
                :flat="transferStep !== 2"
              />
              <q-btn
                round
                :color="transferStep === 3 ? 'primary' : 'grey-4'"
                size="sm"
                label="3"
                :flat="transferStep !== 3"
              />
            </div>
            <div class="transfer-title text-center">Transfiere</div>
            <q-form @submit.prevent="goToTransferConfirm" class="q-gutter-md">
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

      <!-- CONFIRMACIÓN DE TRANSFERENCIA (PASO 2) -->
      <div class="transfer-block" v-if="currentStep === 1 && transferStep === 2">
        <q-card class="transfer-card">
          <q-card-section>
            <div class="row items-center justify-center q-mb-md">
              <q-btn
                round
                :color="transferStep >= 1 ? 'primary' : 'grey-4'"
                size="sm"
                label="1"
                :flat="transferStep !== 1"
              />
              <q-btn
                round
                :color="transferStep >= 2 ? 'primary' : 'grey-4'"
                size="sm"
                label="2"
                class="q-ml-md q-mr-md"
                :flat="transferStep !== 2"
              />
              <q-btn
                round
                :color="transferStep === 3 ? 'primary' : 'grey-4'"
                size="sm"
                label="3"
                :flat="transferStep !== 3"
              />
            </div>
            <div class="text-positive text-center q-mb-md">Confirmación de transferencia</div>
            <div class="confirm-labels">
              <p>
                <span class="label">Cuenta de cargo:</span>
                <span class="value">{{ userAccountNumber }}</span>
              </p>
              <p>
                <span class="label">Cuenta de destino:</span>
                <span class="value">{{ cuentaDestinoManual }}</span>
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
          </q-card-section>
        </q-card>
      </div>

      <!-- ÉXITO TRANSFERENCIA (PASO 3) -->
      <div class="transfer-block" v-if="currentStep === 1 && transferStep === 3">
        <q-card class="transfer-card text-center q-pa-lg">
          <q-card-section>
            <div class="row items-center justify-center q-mb-md">
              <q-btn
                round
                :color="transferStep >= 1 ? 'primary' : 'grey-4'"
                size="sm"
                label="1"
                :flat="transferStep !== 1"
              />
              <q-btn
                round
                :color="transferStep >= 2 ? 'primary' : 'grey-4'"
                size="sm"
                label="2"
                class="q-ml-md q-mr-md"
                :flat="transferStep !== 2"
              />
              <q-btn
                round
                :color="transferStep === 3 ? 'primary' : 'grey-4'"
                size="sm"
                label="3"
                :flat="transferStep !== 3"
              />
            </div>
            <q-icon name="check_circle" color="green" size="xl" />
            <div class="text-h6 q-mt-md">¡Transferencia exitosa!</div>
            <p>Monto: S/. {{ amount.toFixed(2) }} transferido a {{ emailOrAlias }}</p>
            <q-btn
              label="Realizar otra transferencia"
              color="primary"
              class="q-mt-md full-width-btn"
              @click="resetForm"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- FORMULARIO DE RETIRO (PASO 1) -->
      <div class="transfer-block" v-if="currentStep === 'retiro' && retiroStep === 1">
        <q-card class="transfer-card">
          <q-card-section>
            <div class="row items-center justify-center q-mb-md">
              <q-btn
                round
                :color="retiroStep >= 1 ? 'primary' : 'grey-4'"
                size="sm"
                label="1"
                :flat="retiroStep !== 1"
              />
              <q-btn
                round
                :color="retiroStep >= 2 ? 'primary' : 'grey-4'"
                size="sm"
                label="2"
                class="q-ml-md q-mr-md"
                :flat="retiroStep !== 2"
              />
              <q-btn
                round
                :color="retiroStep === 3 ? 'primary' : 'grey-4'"
                size="sm"
                label="3"
                :flat="retiroStep !== 3"
              />
            </div>
            <div class="transfer-title text-center">Retirar</div>
            <q-form @submit.prevent="goToRetiroConfirm" class="q-gutter-md">
              <q-input
                v-model="retiroCuenta"
                label="Cuenta de cargo"
                filled
                type="text"
                inputmode="numeric"
                maxlength="20"
                pattern="[0-9]*"
                :rules="[(val) => /^\d{1,20}$/.test(val) || 'Máximo 20 dígitos numéricos']"
                required
              />
              <q-input
                v-model.number="retiroMonto"
                type="number"
                min="0"
                label="Monto a retirar (S/.)"
                filled
                :rules="[(val) => val > 0 || 'El monto debe ser mayor a cero']"
                required
              />
              <q-btn
                label="Siguiente"
                type="submit"
                color="primary"
                :disable="retiroLoading"
                class="siguiente-btn"
              />
              <q-banner v-if="retiroError" class="bg-red text-white q-mt-md">
                {{ retiroError }}
              </q-banner>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <!-- CONFIRMACIÓN DE RETIRO (PASO 2) -->
      <div class="transfer-block" v-if="currentStep === 'retiro' && retiroStep === 2">
        <q-card class="transfer-card">
          <q-card-section>
            <div class="row items-center justify-center q-mb-md">
              <q-btn
                round
                :color="retiroStep >= 1 ? 'primary' : 'grey-4'"
                size="sm"
                label="1"
                :flat="retiroStep !== 1"
              />
              <q-btn
                round
                :color="retiroStep >= 2 ? 'primary' : 'grey-4'"
                size="sm"
                label="2"
                class="q-ml-md q-mr-md"
                :flat="retiroStep !== 2"
              />
              <q-btn
                round
                :color="retiroStep === 3 ? 'primary' : 'grey-4'"
                size="sm"
                label="3"
                :flat="retiroStep !== 3"
              />
            </div>
            <div class="text-positive text-center q-mb-md">Confirmación retiro</div>
            <div class="confirm-labels">
              <p>
                <span class="label">Cuenta de cargo:</span>
                <span class="value">{{ retiroCuenta }}</span>
              </p>
              <p>
                <span class="label">Moneda y monto:</span>
                <span class="value amount">S/. {{ retiroMonto.toFixed(2) }}</span>
              </p>
            </div>
            <div class="q-mt-lg flex flex-center">
              <q-btn
                label="Retirar"
                color="primary"
                class="confirm-btn"
                @click="handleRetiro"
                :disable="retiroLoading"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- ÉXITO RETIRO (PASO 3) -->
      <div class="transfer-block" v-if="currentStep === 'retiro' && retiroStep === 3">
        <q-card class="transfer-card text-center q-pa-lg">
          <q-card-section>
            <div class="row items-center justify-center q-mb-md">
              <q-btn
                round
                :color="retiroStep >= 1 ? 'primary' : 'grey-4'"
                size="sm"
                label="1"
                :flat="retiroStep !== 1"
              />
              <q-btn
                round
                :color="retiroStep >= 2 ? 'primary' : 'grey-4'"
                size="sm"
                label="2"
                class="q-ml-md q-mr-md"
                :flat="retiroStep !== 2"
              />
              <q-btn
                round
                :color="retiroStep === 3 ? 'primary' : 'grey-4'"
                size="sm"
                label="3"
                :flat="retiroStep !== 3"
              />
            </div>
            <div class="text-bold text-primary">Constancia</div>
            <div class="text-positive">¡Retiro exitoso!</div>
            <div class="q-mt-md" style="color: #888; font-size: 0.95em">
              Código de operación: 2458788<br />
              Fecha: 22 abr 2025 &nbsp; Hora: 23:49
            </div>
            <div class="confirm-labels q-mt-md">
              <p>
                <span class="label">Cuenta de cargo:</span>
                <span class="value">{{ retiroCuentaConfirmada }}</span>
              </p>
              <p>
                <span class="label">Moneda y monto:</span>
                <span class="value amount">S/. {{ retiroMontoConfirmado.toFixed(2) }}</span>
              </p>
            </div>
            <div class="q-mt-md">
              <q-btn
                flat
                class="text-positive"
                label="Enviar Constancia"
                @click="enviarConstancia"
              />
            </div>
            <div>
              <q-btn
                flat
                class="text-positive"
                label="Descargar constancia"
                @click="descargarConstancia"
              />
            </div>
            <div class="q-mt-lg">
              <q-btn
                label="Volver al inicio"
                color="primary"
                class="full-width-btn q-mb-sm"
                @click="resetForm"
              />
              <q-btn
                label="Realizar otra operación"
                color="primary"
                class="full-width-btn"
                @click="resetRetiro"
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
  name: 'MisOperaciones',
  setup() {
    const userBalance = 200
    const userAccountNumber = '200-34783322134'
    const currentStep = ref(0) // 0: opciones, 1: transferir, 'retiro': retiro
    const emailOrAlias = ref('')
    const cuentaDestinoManual = ref('')
    const amount = ref(0)
    const loading = ref(false)
    const errorMessage = ref('')

    // Para retiro
    const retiroStep = ref(1)
    const retiroCuenta = ref('')
    const retiroMonto = ref(0)
    const retiroLoading = ref(false)
    const retiroError = ref('')
    const retiroCuentaConfirmada = ref('')
    const retiroMontoConfirmado = ref(0)

    // Para transferencia
    const transferStep = ref(1)

    function goToTransferConfirm() {
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
      transferStep.value = 2
    }

    function handleConfirm() {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        transferStep.value = 3
        Notify.create({ type: 'positive', message: 'Transferencia realizada con éxito' })
      }, 1200)
    }

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

    function goToRetiroConfirm() {
      retiroError.value = ''
      if (!/^\d{1,20}$/.test(retiroCuenta.value)) {
        retiroError.value = 'La cuenta debe tener hasta 20 dígitos numéricos.'
        return
      }
      if (retiroMonto.value <= 0) {
        retiroError.value = 'El monto debe ser mayor a cero.'
        return
      }
      if (retiroMonto.value > userBalance) {
        retiroError.value = 'El monto excede tu saldo disponible.'
        return
      }
      retiroStep.value = 2
    }

    function handleRetiro() {
      retiroLoading.value = true
      setTimeout(() => {
        retiroLoading.value = false
        retiroCuentaConfirmada.value = retiroCuenta.value
        retiroMontoConfirmado.value = retiroMonto.value
        retiroStep.value = 3
        Notify.create({ type: 'positive', message: 'Retiro realizado con éxito' })
      }, 1200)
    }

    function resetForm() {
      currentStep.value = 0
      emailOrAlias.value = ''
      cuentaDestinoManual.value = ''
      amount.value = 0
      errorMessage.value = ''
      transferStep.value = 1
    }

    function resetRetiro() {
      retiroStep.value = 1
      retiroCuenta.value = ''
      retiroMonto.value = 0
      retiroError.value = ''
      currentStep.value = 0
    }

    function enviarConstancia() {
      Notify.create({ type: 'info', message: 'Constancia enviada (simulado)' })
    }
    function descargarConstancia() {
      Notify.create({ type: 'info', message: 'Descarga de constancia (simulado)' })
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
      // retiro
      retiroStep,
      retiroCuenta,
      retiroMonto,
      retiroLoading,
      retiroError,
      retiroCuentaConfirmada,
      retiroMontoConfirmado,
      goToRetiroConfirm,
      resetRetiro,
      handleRetiro,
      // transferencia
      transferStep,
      goToTransferConfirm,
      enviarConstancia,
      descargarConstancia,
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
