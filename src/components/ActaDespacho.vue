<template>
  <div class="contenedor">
    <h2>🧾 ACTAS DE DESPACHO</h2> 

    <p>Ingrese la fecha de los documentos por exportar</p>

    <label for="fecha">Fecha:</label>
    <input type="date" v-model="fecha" id="fecha" @change="verificarMigracion" aria-label="Seleccionar fecha de acta de despacho" />

    <label for="firma">Firma responsable:</label>
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
        <h3>⏳ Procesando...</h3>
        <p>Por favor, <b>NO CIERRE</b> esta ventana.</p>
    </div>

    <div class="botones">
      <button 
        :disabled="cargando || datosMigrados" 
        @click="migrarDatos"
        :title="datosMigrados ? 'Los datos ya fueron migrados' : ''"
        aria-label="Migrar datos de despacho"
        style="background-color: #ff9800;"
      >
        🔄 {{ datosMigrados ? 'Datos Migrados' : 'Migrar Datos' }}
      </button>

      <button 
        :disabled="cargando || (!datosMigrados && !bonoHabilitado) || !firmaSeleccionada" 
        @click="generarPDF" 
        @dblclick.prevent="confirmarBono"
        :title="!datosMigrados && !bonoHabilitado ? 'Primero migre los datos o habilite el bono' : (!firmaSeleccionada ? 'Seleccione una firma' : '')"
        aria-label="Generar PDF de acta de despacho"
      >
        {{ cargando ? 'Procesando...' : '📄 Generar y Descargar ZIP' }}
      </button>

      <router-link to="/">
        <button class="volver" :disabled="cargando">🔙 Volver</button>
      </router-link>
    </div>

    <div v-if="cargando" class="loader"></div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

const API_BASE = "http://192.168.1.52:8000/api"

export default {
  name: "ActaDespacho", // Corregido el nombre (estaba como ActaDespachoVentas)
  data() {
    return {
      fecha: "",
      cargando: false,
      datosMigrados: false,
      fechaVerificada: false,
      bonoHabilitado: false,
      firmaSeleccionada: "",
      firmasDisponibles: [
        "FirmaAlfredoRoldanEsparraga.png",
        "FirmaAnthonyAuquipuma.png",
        "FirmaEdgarNolascoChavez.png",
        "FirmaDavidVidalRafael.png",
        "FirmaDamianAlvarezGarcia.png",
        "FirmaCesarLopezRivas.png",
        "FirmaCarmenCondoriSaravia.png",
        "FirmaCarlosRodasSandoval.png",
        "FirmaAntonySarangoTamayo.png",
        "FirmaHemersonRichardLauraPaucar.png",
        "FirmaHeberCastilloCastillo.png",
        "FirmaFreddyAnguloGaray.png",
        "FirmaEvelinMamaniDelgado.png",
        "FirmaHenryRodasSandoval.png",
        "FirmaJesusDanielPisconteAguado.png",
        "FirmaJesusAngelNunahuanca.png",
        "FirmaIvanAchoNavarro.png",
        "FirmaMaribelRamos.png",
        "FirmaRaulSuarezPumacayo.png",
        "FirmaRaulLlanosYauri.png"
      ],
    };
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
  },
  methods: {
    prevenirCierre(e) {
      if (this.cargando) {
        e.preventDefault();
        e.returnValue = ''; 
      }
    },
    mostrarNombreFirma(firma) {
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

    // ---------------------------------------------------------
    // 🛠️ CORRECCIÓN 1: Capturar ID en Verificación
    // ---------------------------------------------------------
    async verificarMigracion() {
      if (!this.fecha) {
        this.fechaVerificada = false;
        this.datosMigrados = false;
        return;
      }
      this.cargando = true
      try {
        const fechaFormateada = new Date(this.fecha).toISOString().split('T')[0]
        
        // 👉 NUEVO: Capturamos ID
        const idAlmacen = this.$route.params.id || "*";

        // 👉 NUEVO: Enviamos el parametro almacen_id
        const data = await this.apiRequest(`/verificar_migracion/?fecha=${fechaFormateada}&grupo=despacho&almacen_id=${idAlmacen}`)
        
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
      } finally {
        this.cargando = false
      }
    },

    // ---------------------------------------------------------
    // 🛠️ CORRECCIÓN 2: Capturar ID en Migración
    // ---------------------------------------------------------
    async migrarDatos() {
      if (!this.fecha || this.datosMigrados) return
      this.cargando = true
      try {
        const fechaFormateada = new Date(this.fecha).toISOString().split('T')[0]
        
        // 👉 NUEVO: Capturamos ID
        const idAlmacen = this.$route.params.id || "*";

        // 👉 NUEVO: Enviamos el ID en el body
        const data = await this.apiRequest("/importar_despacho/", "POST", { 
            fecha: fechaFormateada,
            almacen_id: idAlmacen 
        })

        Swal.fire({ icon: 'success', title: '✅ Migración completada', text: data.mensaje || "Datos migrados correctamente" })
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

    async generarPDF() {
      if (!this.fecha) return Swal.fire({ icon: 'info', title: 'Seleccione una fecha' })
      if (!this.firmaSeleccionada) return Swal.fire({ icon: 'info', title: 'Seleccione una firma' })
      if (!this.datosMigrados && !this.bonoHabilitado) return Swal.fire({ icon: 'warning', text: 'Primero migre los datos o habilite el bono' })

      this.cargando = true
      try {
        const fechaFormateada = new Date(this.fecha).toISOString().split('T')[0]

        const idAlmacen = this.$route.params.id || "*";

        const response = await fetch(`${API_BASE}/generar_pdf_despacho/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                fecha: fechaFormateada, 
                firma: this.firmaSeleccionada,
                almacen_id: idAlmacen  
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Nombre dinámico con hora para evitar caché o sobrescritura visual
        const ahora = new Date();
        const horaStr = ahora.getHours().toString().padStart(2, '0') + '-' + ahora.getMinutes().toString().padStart(2, '0');
        const nombreArchivo = `Actas_Despacho_${fechaFormateada}_${horaStr}.zip`;
        
        link.setAttribute('download', nombreArchivo);
        document.body.appendChild(link);
        link.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        Swal.fire({ icon: 'success', title: '¡Descarga Iniciada!', text: 'Revise su carpeta de descargas.' })

      } catch (error) {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Error generando PDF', text: error.message })
      } finally {
        this.cargando = false
      }
    }
  }
}
</script>

<style scoped>
/* ESTILOS EXACTAMENTE IGUALES + EL AVISO DE SEGURIDAD */
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
  transition: border-color 0.2s;
}
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

.loader {
  height: 60px;
  aspect-ratio: 1;
  position: relative;
  margin: 1rem auto;
}
.loader::before,
.loader::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transform-origin: bottom;
}
.loader::after {
  background:
    radial-gradient(at 75% 15%,#fffb,#0000 35%),
    radial-gradient(at 80% 40%,#0000,#0008),
    radial-gradient(circle  5px,#fff 94%,#0000),
    radial-gradient(circle 10px,#000 94%,#0000),
    linear-gradient(#F93318 0 0) top   /100% calc(50% - 5px),
    linear-gradient(#fff    0 0) bottom/100% calc(50% - 5px)
    #000;
  background-repeat: no-repeat;
  animation: l20 1s infinite cubic-bezier(0.5,120,0.5,-120);
}
.loader::before {
  background:#ddd;
  filter: blur(8px);
  transform: scaleY(0.4) translate(-13px, 0px);
}
@keyframes l20 { 
 30%,70% {transform:rotate(0deg)}
 49.99%  {transform:rotate(0.2deg)}
 50%     {transform:rotate(-0.2deg)}
}

.estado-migracion {
  margin: 1rem 0;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

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

button:disabled {
  opacity: 0.7;
  pointer-events: all;
}

button:disabled:hover::after {
  content: attr(title);
  position: absolute;
  top: -35px;
  background: #333;
  color: #fff;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
}

/* Aviso de seguridad igual a ventas */
.aviso-seguridad {
    background-color: #fff3cd;
    border: 1px solid #ffecb5;
    color: #856404;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    animation: palpitar 2s infinite;
}
.aviso-seguridad h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #d9534f;
    display: block; 
}
@keyframes palpitar {
    0% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(255, 193, 7, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0); }
}
</style>