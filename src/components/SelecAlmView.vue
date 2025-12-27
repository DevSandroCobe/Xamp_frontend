<template>
  <div class="layout-container">
    <div class="watermark"></div>

    <header class="encabezado">
      <div class="logo-box">
        <img src="/imagenes/logo.jpg" alt="Logo Cobefar" class="logo" />
      </div>
      <div class="titulo-box">
        <h1>SELECCIÓN DE ALMACÉN</h1>
      </div>
    </header>

    <main class="contenido-principal">
      
      <div class="hero-text">
        <h2>Hola, Bienvenido</h2>
        <p>Por favor, indica en qué almacén vas a trabajar hoy:</p>
      </div>

      <div class="grid-almacenes">
        <div 
          v-for="alm in almacenes" 
          :key="alm.id" 
          class="card-almacen"
          @click="seleccionarAlmacen(alm)"
        >
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M7 5V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1"/></svg>
          </div>
          
          <div class="card-info">
            <span class="nombre">{{ alm.nombre }}</span>
          </div>

          <div class="card-arrow">➜</div>
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
import { useRouter } from 'vue-router'
const router = useRouter()

const almacenes = [
  /* ---{ id: '01', nombre: 'RyO ALMACÉN N°1',  tax: 'ALM01', vista: 'RecepcionView' }, --- */
  { id: 'ALM07', nombre: 'ALMACÉN N°3', tax: 'ALM03', vista: 'HomeView' },
  { id: '16', nombre: 'ALMACÉN N°5', tax: 'ALM05', vista: 'HomeView' },
  /* ---{ id: '09', nombre: 'ALMACÉN N°6',  tax: 'ALM06', vista: 'RecepcionView' }, --- */
  /* ---{ id: '03', nombre: 'ALMACÉN N°1', tax: 'ALM01', vista: 'HomeView' }, --- */
]

function seleccionarAlmacen(alm) {
  if (!alm.vista) {
    alert(`El almacén ${alm.nombre} no tiene vista asignada 🚨`)
    return
  }
  router.push({ path: `/${alm.vista}/${alm.id}` })
}
</script>

<style scoped>
/* --- ESTRUCTURA GLOBAL --- */
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Rubik', sans-serif;
  background-color: #f8f9fa;
  position: relative;
  overflow-x: hidden;
}

.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background-image: url('/imagenes/logo.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.04;
  pointer-events: none;
  z-index: 0;
  filter: grayscale(100%);
}

/* --- ENCABEZADO --- */
.encabezado {
  background: white;
  height: 80px;
  border-bottom: 3px solid #2e7d32;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  z-index: 10;
}

.logo-box {
  position: absolute;
  left: 2rem;
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

/* --- CONTENIDO --- */
.contenido-principal {
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-text {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-text h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.hero-text p {
  color: #666;
  font-size: 1.1rem;
}

/* --- GRID DE TARJETAS --- */
.grid-almacenes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  justify-content: center;
}

/* --- DISEÑO DE TARJETA --- */
.card-almacen {
  background: white;
  border: 1px solid #e0e0e0;
  border-left: 5px solid #2e7d32;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

.card-almacen:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(46, 125, 50, 0.15);
  background-color: #fcfdfc;
}

/* Icono */
.card-icon {
  background-color: #e8f5e9;
  color: #2e7d32;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 24px;
  height: 24px;
}

/* Info Texto (Solo Nombre) */
.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nombre {
  font-weight: 700;
  font-size: 1.15rem; /* Ligeramente más grande al no haber código */
  color: #333;
}

/* Flecha */
.card-arrow {
  color: #ccc;
  font-weight: bold;
  transition: transform 0.2s, color 0.2s;
}

.card-almacen:hover .card-arrow {
  color: #2e7d32;
  transform: translateX(5px);
}

/* --- FOOTER --- */
.pie-pagina {
  background-color: #263238;
  color: #ecf0f1;
  padding: 2rem 2rem;
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
  .encabezado {
    flex-direction: column;
    height: auto;
    padding: 1rem;
    gap: 0.5rem;
  }
  .logo-box {
    position: static;
    transform: none;
    margin-bottom: 0.5rem;
  }
  .titulo-box h1 {
    white-space: normal;
    font-size: 1.1rem;
  }
  .grid-almacenes {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .titulo-columna {
    margin: 0 auto 0.8rem;
  }
  .tech-grid {
    justify-content: center;
  }
}
</style>