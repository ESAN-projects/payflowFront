<template>
  <div>
    <HeaderComponent />
    <div class="flex flex-center">
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
            @click="iniciarOperaciones"
            :disable="operacionesIniciadas"
          />
        </div>

        <!-- BLOQUES DE OPCIONES -->
        <div class="option-card">
          <div class="option-buttons">
            <div
              class="operation-block"
              :class="{ inactive: !operacionesIniciadas }"
              @click="operacionesIniciadas ? (showTransferencia = true) : null"
            >
              Transferencia
            </div>
            <div
              class="operation-block"
              :class="{ inactive: !operacionesIniciadas }"
              @click="operacionesIniciadas ? (showRetiro = true) : null"
            >
              Retiro
            </div>
            <div
              class="operation-block"
              :class="{ inactive: !operacionesIniciadas }"
              @click="operacionesIniciadas ? (showDeposito = true) : null"
            >
              Depósito
            </div>
          </div>
        </div>

        <DepositoModal v-model="showDeposito" />
        <Retiro
          v-model="showRetiro"
          :userBalance="userBalance"
          :userAccountNumber="userAccountNumber"
          @operacion-exitosa="handleOperacionExitosa"
        />

        <Transferencia
          v-model="showTransferencia"
          :cuenta-origen="userAccountNumber"
          @operacion-exitosa="handleOperacionExitosa"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'
import HeaderComponent from 'components/Header/HeaderComponent.vue'
import DepositoModal from './Deposito.vue'
import Retiro from 'src/components/transacciones/Retiro.vue'
import Transferencia from 'src/components/transacciones/Transferencia.vue'

const userBalance = 200
const userAccountNumber = '200-34783322134'
const operacionesIniciadas = ref(false)
const showDeposito = ref(false)
const showRetiro = ref(false)
const showTransferencia = ref(false)

function iniciarOperaciones() {
  operacionesIniciadas.value = true
}

function handleOperacionExitosa() {
  Notify.create({ type: 'positive', message: 'Operación completada con éxito' })
  operacionesIniciadas.value = false
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
  pointer-events: none;
}
</style>
