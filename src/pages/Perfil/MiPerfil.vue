<template>
  <div>
    <HeaderComponent />
    <div class="perfil-container">
      <q-card class="perfil-card">
        <div class="perfil-title">Mi perfil</div>
        <div class="perfil-info">
          <div>
            <span class="perfil-label">Nombres</span><br /><span class="perfil-value">{{
              nombres
            }}</span>
          </div>
          <div>
            <span class="perfil-label">Apellidos</span><br /><span class="perfil-value">{{
              apellidos
            }}</span>
          </div>
          <div>
            <span class="perfil-label">DNI</span><br /><span class="perfil-value">{{ dni }}</span>
          </div>
          <div>
            <span class="perfil-label">Correo</span><br /><span class="perfil-value">{{
              correo
            }}</span>
          </div>
          <div class="perfil-info-extra">
            <q-icon name="info" size="sm" color="primary" />
            <span class="perfil-info-text"
              >Tus constancias se enviarán automáticamente al correo registrado aquí:</span
            >
          </div>
        </div>
        <q-btn
          class="btn-actualizar"
          color="primary"
          label="Actualizar datos"
          @click="actualizarDatos"
        />
        <q-card class="card-ultimo-ingreso"> Último ingreso: {{ fechaHora }} </q-card>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderComponent from 'components/Header/HeaderComponent.vue'

const nombres = ref('Edgar Antony')
const apellidos = ref('Solis Celestino')
const dni = ref('72809856')
const correo = ref('correo@gmail.com')
const fechaHora = ref('')

function actualizarDatos() {
  // Aquí conecta con la API para actualizar los datos del usuario
  // Ejemplo:
  // this.$api.post('/api/v1/usuarios/actualizar', { nombres: nombres.value, apellidos: apellidos.value, dni: dni.value, correo: correo.value })
  //   .then(() => { ... })
  //   .catch(() => { ... })
}

onMounted(() => {
  const now = new Date()
  const fecha = now.toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: '2-digit' })
  const hora = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
  fechaHora.value = `${fecha} ${hora}`
})
</script>

<style scoped>
.perfil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.perfil-card {
  width: 400px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  text-align: center;
}
.perfil-title {
  font-size: 2rem;
  font-weight: bold;
  color: #18077b;
  margin-bottom: 24px;
}
.perfil-info {
  text-align: left;
  margin-bottom: 16px;
}
.perfil-label {
  color: #888;
  font-size: 0.95rem;
}
.perfil-value {
  font-weight: bold;
  color: #222;
  font-size: 1.1rem;
}
.perfil-info-extra {
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: #888;
  font-size: 0.95rem;
}
.perfil-info-text {
  margin-left: 8px;
}
.btn-actualizar {
  margin: 24px 0 12px 0;
  width: 60%;
  font-weight: bold;
}
.card-ultimo-ingreso {
  margin: 0 auto;
  background: #e0e0e0;
  color: #222;
  font-size: 0.95rem;
  border-radius: 6px;
  padding: 8px 0;
  width: 80%;
  box-shadow: none;
}
</style>
