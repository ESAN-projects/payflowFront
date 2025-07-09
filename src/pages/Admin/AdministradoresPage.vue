<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row q-col-gutter-xl">
      <!-- Filtro y búsqueda -->
      <div class="col-3">
        <div class="q-pa-md shadow-2 bg-white rounded-borders">
          <div class="text-subtitle1 q-mb-md"><b>Filtrar por</b></div>
          <q-option-group
            v-model="filtro"
            :options="filtroOptions"
            color="primary"
            type="radio"
            class="q-mb-lg"
          />
          <div class="text-subtitle1 q-mb-xs"><b>Buscar</b> <span class="text-caption">(nombres y apellidos, correo electrónico, DNI)</span></div>
          <q-input v-model="busqueda" dense outlined placeholder="" />
        </div>
      </div>
      <!-- Tabla -->
      <div class="col-9">
        <div class="q-pa-md shadow-2 bg-white rounded-borders">
          <div class="text-h6 text-center q-mb-md">Administradores</div>
          <q-table
            :rows="this.administradores"
            :columns="columns"
            row-key="dni"
            flat
            dense
            v-model:pagination="pagination"
            :rows-per-page-options="[5, 10, 20]"
            hide-bottom
            class="my-table"
            :virtual-scroll="false"
          >
            <template v-slot:body-cell-estado="props">
              <q-td :props="props">
                <span :class="estadoClass(props.row.estado)">{{ props.row.estado }}</span>
              </q-td>
            </template>
            <template v-slot:body-cell-dni="props">
              <q-td :props="props">
                <a href="#" class="text-primary text-weight-bold">{{ props.row.dni }}</a>
              </q-td>
            </template>
          </q-table>
          <!-- Paginación -->
          <div class="row justify-center q-mt-md">
            <q-pagination
              v-model="pagination.page"
              :max="maxPage"
              max-pages="5"
              color="primary"
              input
              direction-links
              boundary-links
            />
          </div>
          <!-- Botón registrar debajo de la tabla -->
          <div class="row justify-end q-mt-lg">
            <q-btn color="primary" label="Registrar nuevo" rounded />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AdministradoresPage',
  data() {
    return {
      filtro: 'activos',
      filtroOptions: [
        { label: 'Activos', value: 'activos' },
        { label: 'Bloqueados', value: 'bloqueados' },
        { label: 'Inactivos', value: 'inactivos' }
      ],
      busqueda: '',
      pagination: {
        page: 1,
        rowsPerPage: 5
      },
      columns: [
        { name: 'dni', label: 'DNI', align: 'left', field: 'dni', sortable: true },
        { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
        { name: 'correo', label: 'Correo electrónico', align: 'left', field: 'correo', sortable: true },
        { name: 'fecha', label: 'Fecha de registro', align: 'left', field: 'fecha', sortable: true },
        { name: 'estado', label: 'Estado de la cuenta', align: 'left', field: 'estado', sortable: true }
      ],
      administradores: []
    }
  },
  computed: {
    maxPage() {
      // Calcula el número máximo de páginas según el filtrado actual
      let filtrados = Array.isArray(this.administradores) ? this.administradores : [];
      return Math.ceil(filtrados.length / this.pagination.rowsPerPage) || 1;
    },
  },
  mounted() {
    this.obtenerAdministradores();
  },
  methods: {
    async obtenerAdministradores() {
      this.loading = true;
      try {
        const response = await this.$axios.get('http://localhost:5077/api/Administradores');
        this.administradores = response.data.map(item => ({
          dni: item.administradorId || '',
          nombre: ((item.nombres || '') + ' ' + (item.apellidos || '')).trim(),
          correo: item.correoElectronico || '',
          fecha: item.fechaRegistro || '',
          estado: item.estadoAdministrador || ''
        }));
      } catch (error) {
        console.error('Error al cargar administradores:', error);
        this.administradores = [];
        this.$q.notify({ type: 'negative', message: 'Error al cargar administradores' });
      } finally {
        this.loading = false;
      }
    },
    estadoClass(estado) {
      if (estado === 'Activo') return 'text-positive'
      if (estado === 'Bloqueado') return 'text-warning'
      if (estado === 'Inactivo') return 'text-negative'
      return ''
    }
  },
  watch: {
    filtro() {
      // Si la página actual es mayor al máximo, ajústala
      if (this.pagination.page > this.maxPage) {
        this.pagination.page = this.maxPage;
      } else {
        this.pagination.page = 1;
      }
    },
    busqueda() {
      if (this.pagination.page > this.maxPage) {
        this.pagination.page = this.maxPage;
      } else {
        this.pagination.page = 1;
      }
    }
  }
}
</script>
<style scoped>
.shadow-2 {
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
}
.rounded-borders {
  border-radius: 8px;
}
.my-table .q-table__middle {
  background: #f5f7fa;
}
.my-table .q-table__top, .my-table .q-table__bottom {
  background: transparent;
}
.my-table .q-table__th {
  background: #e0e3ea;
  font-weight: bold;
}
.my-table .q-table__tr--body:nth-child(even) {
  background: #f0f4fa;
}
.my-table .q-table__tr--body:nth-child(odd) {
  background: #e9f0ff;
}
.text-positive {
  color: #388e3c;
  font-weight: bold;
}
.text-warning {
  color: #fbc02d;
  font-weight: bold;
}
.text-negative {
  color: #d32f2f;
  font-weight: bold;
}
</style>
