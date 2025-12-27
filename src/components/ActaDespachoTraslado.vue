<template>
  <div class="contenedor">
    <h2>📦 ACTAS DE DESPACHO - TRASLADOS</h2>

    <p>Ingrese la fecha de los documentos por exportar</p>

    <label for="fecha">Fecha:</label>
    <input type="date" v-model="fecha" id="fecha" @change="verificarMigracion" aria-label="Seleccionar fecha" />

    <label for="firma">Seleccionar firma:</label>
    <select v-model="firmaSeleccionada" id="firma" aria-label="Seleccionar firma responsable">
      <option disabled value="">Seleccione una firma</option>
      <option v-for="firma in firmasDisponibles" :key="firma" :value="firma">
        {{ mostrarNombreFirma(firma) }}
      </option>
    </select>

    <div v-if="fechaVerificada" class="estado-migracion">
      <span v-if="datosMigrados" class="badge success">✅ Datos ya migrados</span>
      <span v-else class="badge warning">⚠️ Datos no migrados</span>
    </div>

    <div v-if="cargando" class="aviso-seguridad">
        <h3>⏳ {{ tituloProceso }}</h3>
        <p>Por favor, <b>NO CIERRE</b> esta ventana.</p>
        
        <div class="barra-contenedor">
            <div class="barra-relleno" :style="{ width: progreso + '%' }"></div>
        </div>
        <p class="texto-progreso">{{ textoProgreso }} ({{ progreso }}%)</p>
    </div>

    <div class="botones">
      <button 
        :disabled="cargando || datosMigrados" 
        @click="migrarDatos"
        :title="datosMigrados ? 'Los datos ya fueron migrados' : ''"
        style="background-color: #ff9800;"
      >
        🔄 {{ (cargando && tipoProceso === 'migracion') ? 'Migrando...' : (datosMigrados ? 'Datos Migrados' : 'Migrar Datos') }}
      </button>

      <button 
        :disabled="cargando || (!datosMigrados && !bonoHabilitado) || !firmaSeleccionada" 
        @click="generarPDF" 
        @dblclick.prevent="confirmarBono"
        :title="!datosMigrados && !bonoHabilitado ? 'Primero migre los datos o habilite el bono' : (!firmaSeleccionada ? 'Seleccione una firma' : '')"
      >
        {{ (cargando && tipoProceso === 'pdf') ? 'Procesando...' : '📄 Generar y Descargar ZIP' }}
      </button>

      <router-link to="/">
        <button class="volver" :disabled="cargando">🔙 Volver</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

const API_BASE = "http://192.168.1.52:8000/api"

export default {
  name: "ActaDespachoTraslados",
  data() {
    return {
      fecha: "",
      cargando: false,
      datosMigrados: false,
      fechaVerificada: false,
      bonoHabilitado: false,

      // Variables para el progreso real
      progreso: 0,
      textoProgreso: '',
      intervaloPolling: null,
      tipoProceso: '', // 'migracion' o 'pdf'

      firmaSeleccionada: "",
      // Nombres solicitados
      firmasDisponibles: [
        "FirmaAlfredoRoldanEsparraga.png", 
        "FirmaAnthonyAuquipuma.png",
        "FirmaCarmenCondoriSaravia.png"
      ],
    };
  },

  computed: {
    tituloProceso() {
        if (this.tipoProceso === 'migracion') return 'Importando Datos...';
        if (this.tipoProceso === 'pdf') return 'Generando Archivos...';
        return 'Procesando...';
    }
  },

  mounted() {
    window.addEventListener('beforeunload', this.prevenirCierre);
    Swal.fire({
      icon: 'warning',
      title: '⚠️ Atención',
      text: 'Primero migre la base de datos. Si ya lo hizo, puede continuar.',
      confirmButtonColor: '#8bb915'
    });
  },
  
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.prevenirCierre);
    if (this.intervaloPolling) clearInterval(this.intervaloPolling);
  },

  methods: {
    prevenirCierre(e) {
      if (this.cargando) {
        e.preventDefault();
        e.returnValue = ''; 
      }
    },
    mostrarNombreFirma(firma) {
      // Formatea: "FirmaAlfredo..." -> "Alfredo..."
      return firma.replace('Firma', '').replace('.png', '').replace(/([A-Z])/g, ' $1').trim();
    },
    
    async apiRequest(url, method = "GET", body = null) {
      const options = { method, headers: { "Content-Type": "application/json" } }
      if (body) options.body = JSON.stringify(body)

      const res = await fetch(`${API_BASE}${url}`, options)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Error en el servidor")
      return data
    },

    // --- MONITOREO DE LA BARRA DE CARGA ---
    async monitorearProgreso(taskId, esDescarga = false) {
      this.progreso = 0;
      
      this.intervaloPolling = setInterval(async () => {
        try {
          // LLAMADA AL ENDPOINT ESPECÍFICO DE TRASLADOS
          const res = await fetch(`${API_BASE}/progreso_traslados/${taskId}`);
          const data = await res.json();

          if (data.error) {
            clearInterval(this.intervaloPolling);
            this.cargando = false;

            if (data.error.includes("No se encontraron registros") || data.error.includes("No hay datos")) {
                Swal.fire({
                    icon: 'info', 
                    title: 'Aviso',
                    text: 'No se encontraron actas de traslado para la fecha y almacén seleccionados.',
                    confirmButtonText: 'Entendido'
                });
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: data.error });
            }
            return;
          }

          // Actualización Visual
          this.progreso = data.porcentaje || 0;
          this.textoProgreso = data.mensaje || 'Procesando...';

          if (data.listo) {
            clearInterval(this.intervaloPolling);
            this.progreso = 100;
            
            this.cargando = false; 
            window.removeEventListener('beforeunload', this.prevenirCierre);

            if (esDescarga) {
               // DESCARGA ESPECÍFICA DE TRASLADOS
               window.location.href = `${API_BASE}/descargar_traslados/${taskId}`;
               Swal.fire({ 
                   icon: 'success', 
                   title: '¡Generado!', 
                   text: 'La descarga comenzará en breve.', 
                   timer: 2000, 
                   showConfirmButton: false 
               });
            } else {
               Swal.fire({ icon: 'success', title: 'Completado', text: 'Proceso finalizado correctamente.' });
            }
            
            setTimeout(() => { this.cargando = false; }, 1500);
          }

        } catch (error) {
           clearInterval(this.intervaloPolling);
           this.cargando = false;
           console.error("Error polling:", error);
        }
      }, 1000); 
    },

    async verificarMigracion() {
      if (!this.fecha) {
        this.fechaVerificada = false;
        this.datosMigrados = false;
        return;
      }
      try {
        const fechaFormateada = new Date(this.fecha).toISOString().split('T')[0]
        const idAlmacen = this.$route.params.id || "*";

        const data = await this.apiRequest(`/verificar_migracion/?fecha=${fechaFormateada}&grupo=traslados&almacen_id=${idAlmacen}`)
        
        this.datosMigrados = data.migrado
        this.fechaVerificada = true

        if (data.migrado) {
          Swal.fire({
            icon: 'info',
            title: 'Datos ya migrados',
            text: 'Los datos para esta fecha ya fueron migrados anteriormente.',
            timer: 2000,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error("Error verificando migración:", error)
        this.datosMigrados = false
      }
    },

    async migrarDatos() {
      if (!this.fecha || this.datosMigrados) return
      
      this.cargando = true
      this.tipoProceso = 'migracion';
      this.progreso = 50; 
      this.textoProgreso = "Conectando con base de datos...";

      try {
        const fechaFormateada = new Date(this.fecha).toISOString().split('T')[0]
        const idAlmacen = this.$route.params.id || "*";

        // Asegúrate de que este endpoint exista en tu backend o cámbialo si es otro
        const data = await this.apiRequest("/importar_traslados/", "POST", { 
            fecha: fechaFormateada,
            almacen_id: idAlmacen
        })
        
        this.progreso = 100;
        await Swal.fire({ icon: 'success', title: '✅ Migración completada', text: data.mensaje || "Datos migrados correctamente" })
        this.datosMigrados = true
        this.bonoHabilitado = false

      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error en migración', text: error.message })
      } finally {
        this.cargando = false
      }
    },

    async confirmarBono() {
      const { isConfirmed } = await Swal.fire({
        icon: 'question',
        title: '¿Habilitar bono?',
        text: 'Esto te permitirá generar el PDF sin migrar datos nuevamente.',
        showCancelButton: true,
        confirmButtonColor: '#8bb915'
      })
      if (isConfirmed) {
        this.bonoHabilitado = true
        Swal.fire({ icon: 'success', title: 'Bono habilitado 🥷', timer: 1500, showConfirmButton: false })
      }
    },

    // --- NUEVO GENERAR PDF CON COLA ---
    async generarPDF() {
      if (!this.fecha) return Swal.fire({ icon: 'info', title: 'Seleccione una fecha' })
      if (!this.firmaSeleccionada) return Swal.fire({ icon: 'info', title: 'Seleccione una firma' })
      if (!this.datosMigrados && !this.bonoHabilitado) return Swal.fire({ icon: 'warning', text: 'Primero migre los datos o habilite el bono' })

      this.cargando = true;
      this.tipoProceso = 'pdf';
      this.textoProgreso = "Iniciando solicitud al servidor...";
      this.progreso = 0;

      try {
        const fechaFormateada = new Date(this.fecha).toISOString().split('T')[0]
        const idAlmacen = this.$route.params.id || "*";

        // A. SOLICITUD DE INICIO (NUEVO ENDPOINT)
        const response = await fetch(`${API_BASE}/iniciar_generacion_pdf_traslados/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                fecha: fechaFormateada, 
                firma: this.firmaSeleccionada,
                almacen_id: idAlmacen 
            })
        });

        if (!response.ok) {
            const txt = await response.text();
            throw new Error(txt);
        }

        const data = await response.json();
        
        // B. INICIAR POLLING (BARRA DE CARGA)
        this.monitorearProgreso(data.task_id, true);

      } catch (error) {
        this.cargando = false;
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Error al iniciar', text: error.message })
      }
    }
  }
}
</script>

<style scoped>
/* (Mismos estilos que pasaste, no es necesario cambiarlos, funcionan perfecto) */
.contenedor { 
  max-width: 480px; 
  margin: 3rem auto; 
  padding: 2rem; 
  background-color: #ffffff; 
  border: 2px solid #4CAF50; 
  border-radius: 12px; 
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08); 
  text-align: center; 
  font-family: 'Rubik', sans-serif; 
}
h2 { 
  color: #2e7d32; 
  margin-bottom: 1rem; 
  font-size: 1.6rem; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  gap: 0.5rem; 
}
p { 
  margin-bottom: 1rem; 
  font-size: 15px; 
  color: #555; 
}
label { 
  font-weight: 600; 
  color: #444; 
  display: block; 
  margin-top: 1rem; 
  margin-bottom: 0.5rem; 
}
input[type="date"] { 
  padding: 0.6rem; 
  border-radius: 8px; 
  border: 1px solid #ccc; 
  width: 100%; 
  max-width: 260px; 
  font-size: 15px; 
}
select#firma { 
  width: 100%; 
  padding: 0.6rem; 
  border-radius: 8px; 
  border: 1px solid #ccc; 
  font-size: 15px; 
  margin-bottom: 1rem; 
  background: #f8fafc; 
  color: #333; 
  transition: border-color 0.2s; }

select#firma:focus { 
  border-color: #4CAF50; 
  outline: none; 
}

.botones { 
  display: flex; 
  flex-direction: column; 
  gap: 0.8rem; 
  margin-top: 1.5rem; 
}

button { 
  background-color: #4CAF50; 
  border: none; 
  color: white; 
  padding: 0.8rem 1.4rem; 
  font-size: 15px; 
  font-weight: 500; 
  border-radius: 6px; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 
}

button:hover { 
  background-color: #388e3c; 
}

button:disabled { 
  background-color: #cccccc; 
  cursor: not-allowed; 
  opacity: 0.7; 
  pointer-events: all; 
}

button.volver { 
  background-color: #e0e0e0; 
  color: #333; 
}

button.volver:hover { 
  background-color: #c2c2c2; 
}

button:first-child { 
  background-color: #ff9800; 
}

button:first-child:hover { 
  background-color: #f57c00; 
}

.estado-migracion { 
  margin: 1rem 0; 
}

.badge { 
  padding: 0.5rem 1rem; 
  border-radius: 20px; 
  font-size: 0.9rem; 
  font-weight: 500; }

.success { 
  background-color: #e8f5e9; 
  color: #2e7d32; 
  border: 1px solid #a5d6a7; 
  animation: fadeIn 0.6s ease; 
}

.warning { 
  background-color: #fff8e1; 
  color: #ff8f00; 
  border: 1px solid #ffe082; 
  animation: fadeIn 0.6s ease; 
}

@keyframes fadeIn { 
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
}

/* AVISO Y BARRA DE CARGA */

.aviso-seguridad { 
  background-color: #fff3cd; 
  border: 1px solid #ffecb5; 
  color: #856404; 
  padding: 1.5rem; 
  margin: 1rem 0; 
  border-radius: 8px; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
  animation: palpitar 3s infinite; 
}

.aviso-seguridad h3 { 
  margin: 0 0 0.5rem 0; 
  font-size: 1.1rem; 
  color: #d9534f; 
  display: block; 
}

.barra-contenedor { 
  width: 100%; 
  height: 20px; 
  background-color: #e9ecef; 
  border-radius: 10px; 
  margin: 15px 0 5px 0; 
  overflow: hidden; 
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); 
  border: 1px solid #dcdcdc; 
}

.barra-relleno { 
  height: 100%; 
  background: linear-gradient(90deg, #4CAF50, #66bb6a); 
  width: 0%; 
  transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1); 
  border-radius: 10px; 
  position: relative; 
  overflow: hidden; 
}

.barra-relleno::after { 
  content: ""; 
  position: absolute; 
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0; 
  background-image: linear-gradient( 
    45deg, 
    rgba(255, 255, 255, 0.2) 25%, 
    transparent 25%, 
    transparent 50%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.2) 75%, 
    transparent 75%, 
    transparent 
  ); 
  background-size: 40px 40px; 
  animation: mover-rayas 1s linear infinite; }

@keyframes mover-rayas { 
  0% { background-position: 0 0; } 
  100% { background-position: 40px 0; } 
}

@keyframes palpitar { 
  0% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4); } 
  70% { box-shadow: 0 0 0 6px rgba(255, 193, 7, 0); } 
  100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0); } 
}

.texto-progreso { 
  font-size: 14px;
  color: #666; 
  font-weight: 600; 
  margin-top: 5px; 
}

</style>