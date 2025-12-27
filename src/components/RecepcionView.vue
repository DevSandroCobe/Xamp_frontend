<template>
  <div class="layout-container">
    <div class="watermark"></div>

    <header class="encabezado">
      <div class="logo-box">
        <img src="/imagenes/logo.jpg" alt="Logo Cobefar" class="logo" />
      </div>
      
      <div class="titulo-box">
        <h1>ÁREA DE DIRECCIÓN TÉCNICA DE MEDICAMENTOS</h1>
      </div>
    </header>

    <main class="contenido-principal">
      <section class="bienvenida">
        <h2 class="hero-title">Bienvenido</h2>
        <p class="instrucciones">Seleccione el módulo al que desea ingresar:</p>
      </section>

      <div class="grid-opciones">
        <div class="card-opcion" @click="navegar('acta-despacho')">
          <div class="icono">🧾</div>
          <h3>Acta de Despacho</h3>
        </div>

        <div class="card-opcion" @click="navegar('actas-recepcion')">
          <div class="icono">📦</div>
          <h3>Actas de Recepción</h3>
        </div>

        <div class="card-opcion" @click="navegar('organoleptico')">
          <div class="icono">🧪</div>
          <h3>Generar Organoléptico</h3>
        </div>
      </div>
    </main>

    <footer class="pie-pagina">
      <div class="footer-grid">
        
        <div class="columna">
          <h4 class="titulo-columna">👨‍💻 Desarrollo</h4>
          <div class="info-bloque">
            <p class="area">Área de Sistemas y T.I.</p>
            <p class="dev-name">Sandro Dominguez Albornoz</p>
          </div>
        </div>

        <div class="columna">
          <h4 class="titulo-columna">📬 Mesa de Ayuda</h4>
          <ul class="lista-contactos">
            <li><a href="mailto:soporte.ti@cobefar.com.pe">soporte.ti@cobefar.com.pe</a></li>
            <li><a href="mailto:coordinador.ti@cobefar.com.pe">coordinador.ti@cobefar.com.pe</a></li>
            <li><a href="mailto:coordinador.desarrollo@cobefar.com.pe">coordinador.desarrollo@cobefar.com.pe</a></li>
            <li><a href="mailto:soporte.desarrollo@cobefar.com.pe">soporte.desarrollo@cobefar.com.pe</a></li>
          </ul>
        </div>

        <div class="columna">
          <h4 class="titulo-columna">🛠️ Tecnologías</h4>
          <div class="tech-grid">
            
            <div class="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
              <span>Python</span>
            </div>

            <div class="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" />
              <span>Vue 3</span>
            </div>

            <div class="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="Hana SQL" />
              <span>Hana SQL</span>
            </div>

            <div class="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
              <span>HTML5</span>
            </div>
            
            <div class="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
              <span>CSS3</span>
            </div>

          </div>
        </div>

      </div>
      </footer>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

function navegar(rutaBase) {
  const almacenId = route.params.id

  if (!almacenId) {
    return Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: 'No hay almacén seleccionado.',
      confirmButtonColor: '#2e7d32'
    })
  }
  
  router.push(`/${rutaBase}/${almacenId}`)
}
</script>

<style scoped>
/* --- LAYOUT GLOBAL --- */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Rubik', sans-serif;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-image: url('/imagenes/logo.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  filter: grayscale(100%);
}

/* --- HEADER --- */
.encabezado {
  background: white;
  height: 80px;
  border-bottom: 3px solid #2e7d32;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Título centrado */
  padding: 0 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  z-index: 10;
  flex-shrink: 0;
}

.logo-box {
  position: absolute;
  left: 2rem; /* Pegado a la izquierda */
  top: 50%;
  transform: translateY(-50%);
}

.logo {
  height: 55px;
  width: auto;
  display: block;
}

.titulo-box h1 {
  color: #2e7d32;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
}

/* --- CUERPO --- */
.contenido-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  z-index: 1;
  overflow-y: auto;
}

.bienvenida {
  text-align: center;
  margin-bottom: 2rem;
}

.hero-title {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.instrucciones {
  color: #666;
}

.grid-opciones {
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
}

.card-opcion {
  background: white;
  width: 250px;
  padding: 2rem 1rem;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.03);
  transition: transform 0.2s;
}

.card-opcion:hover {
  transform: translateY(-5px);
  border-color: #2e7d32;
}

.card-opcion .icono {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.card-opcion h3 {
  color: #2e7d32;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

/* --- FOOTER OSCURO --- */
.pie-pagina {
  background-color: #263238;
  color: #ecf0f1;
  padding: 2rem 2rem; /* Espacio uniforme */
  flex-shrink: 0;
  z-index: 1;
  font-size: 0.85rem;
}

.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.columna {
  display: flex;
  flex-direction: column;
}

.titulo-columna {
  color: #81c784;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  border-bottom: 1px solid #546e7a;
  padding-bottom: 0.4rem;
  width: fit-content;
}

.area { font-weight: 700; margin-bottom: 0.3rem; }
.dev-name { color: #b0bec5; }

/* Lista de correos plana */
.lista-contactos {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-contactos li {
  margin-bottom: 0.5rem;
}

.lista-contactos a {
  color: #eceff1;
  text-decoration: none;
  transition: color 0.2s;
}

.lista-contactos a:hover {
  color: #81c784;
  text-decoration: underline;
}

/* Iconos SVG */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.08);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.tech-item:hover {
  background: rgba(255,255,255,0.15);
}

.tech-item img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.tech-item span {
  font-size: 0.85rem;
}

/* Responsive */
@media (max-width: 768px) {
  .layout-container { height: auto; overflow: auto; }
  .encabezado { flex-direction: column; height: auto; padding: 1rem; gap: 0.5rem; }
  .logo-box { position: static; transform: none; margin-bottom: 0.5rem; }
  .titulo-box h1 { white-space: normal; font-size: 1.1rem; }
  .footer-grid { grid-template-columns: 1fr; text-align: center; }
  .titulo-columna { margin: 0 auto 0.8rem; }
  .tech-grid { justify-content: center; }
}
</style>