<template>
  <div class="pagina">
    <!-- ENCABEZADO -->
    <header class="encabezado">
      <div class="logo-container">
        <img src="/imagenes/logo.jpg" alt="Logo" class="logo" />
      </div>
      <div class="titulo-container">
        <h1>ÁREA DE DIRECCIÓN TÉCNICA DE MEDICAMENTOS</h1>
        <h2 class="subtitulo">Panel de Reportes y Utilidades</h2>
      </div>
    </header>

    <!-- CUERPO PRINCIPAL -->
    <main class="cuerpo">
      <section class="hero-section">
        <h2 class="hero-title">Bienvenido</h2>
        <p class="instrucciones">Seleccione el tipo de acta que desea generar:</p>
        <div class="botonera">
          <button class="boton" @click="irADespacho" aria-label="Ir a Acta de Despacho">
            <span>🧾</span> Acta de Despacho
          </button>
          <button class="boton reception" @click="irADespachoRecepcion" aria-label="Ir a Actas de Recepción">
            <span>📦</span> Actas de Recepción
          </button>
          <button class="boton organo" @click="generarOrganoleptico" aria-label="Generar Organoléptico">
            <span>🧪</span> Generar Organoléptico
          </button>
        </div>
      </section>
    </main>

    <!-- PIE DE PÁGINA -->
    <footer class="pie">
      <div class="p1">
        <p><strong>👨‍💻 Desarrollado por:</strong><br><br>
          Área de Sistemas y T.I.<br>
          - Sandro Dominguez Albornoz
        </p>
      </div>
      <div class="p2">
        <p><strong>📬Contacto :</strong><br><br>
          soporte.ti@cobefar.com.pe<br>
        <span class="nivel-contacto">↳ coordinador.ti@cobefar.com.pe</span><br>
        <span class="nivel-contacto">↳↳ coordinador.desarrollo@cobefar.com.pe</span><br>
        <span class="nivel-contacto">↳↳↳ soporte.desarrollo@cobefar.com.pe</span>
        </p>
      </div>
      <div class="p3">
        <p><strong>Tecnologías usadas :</strong></p>
        <ul>
          <li><img src="/imagenes/pie/p_1.jpg" alt="Hana SQL" /> Hana SQL</li>
          <li><img src="/imagenes/pie/p_2.jpg" alt="PHP 7" /> PHP 7</li>
          <li><img src="/imagenes/pie/p_3.jpg" alt="HTML5" /> HTML5</li>
          <li><img src="/imagenes/pie/p_4.jpg" alt="CSS3" /> CSS3</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()


function irADespacho() {
  const almacenId = route.params.id
  if (!almacenId) {
    return Swal.fire({ icon: 'warning', title: 'No hay almacén seleccionado' })
  }
  router.push(`/acta-despacho/${almacenId}`)
}

function irADespachoRecepcion() {
  const almacenId = route.params.id
  if (!almacenId) {
    return Swal.fire({ icon: 'warning', title: 'No hay almacén seleccionado' })
  }
  router.push(`/actas-recepcion/${almacenId}`)
}

function generarOrganoleptico() {
  const almacenId = route.params.id
  if (!almacenId) {
    return Swal.fire({ icon: 'warning', title: 'No hay almacén seleccionado' })
  }
  router.push(`/organoleptico/${almacenId}`)
}
</script>

<style scoped>
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
  background-color: #388e3c;
}

button:first-child:hover {
  background-color: #4CAF50;
}

/* Animación de carga elegante */
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

</style>
