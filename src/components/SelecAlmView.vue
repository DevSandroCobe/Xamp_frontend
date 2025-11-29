<template>
  <div class="pagina">
    <div class="container">
      <h2 class="title">Selecciona el almacén</h2>
      <div class="button-group">
        <button
          v-for="alm in almacenes"
          :key="alm.id"
          class="almacen-btn"
          @click="seleccionarAlmacen(alm)"
        >
          <span class="icon">🏬</span>
          <span class="almacen-label">{{ alm.nombre }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const almacenes = [
  { id: '01', nombre: 'ALMACÉN N°1',  tax: 'ALM01', vista: 'RecepcionView' },
  //{ id: '03', nombre: 'ALMACÉN N°3',  tax: 'ALM03', vista: 'HomeView' },
  { id: '09', nombre: 'ALMACÉN N°6',  tax: 'ALM05', vista: 'RecepcionView' },
  { id: '15', nombre: 'ALMACÉN N°8 OWTR', tax: 'ALM08', vista: 'HomeView' },
  { id: '16', nombre: 'ALMACÉN N°8 ODLN', tax: 'ALM08', vista: 'HomeView' },
  { id: 'ALM07', nombre: 'ALMACÉN N°7',    tax: 'ALM06', vista: 'HomeView' },
]

function seleccionarAlmacen(alm) {
  if (!alm.vista) {
    alert(`El almacén ${alm.id} no tiene vista asignada 🚨`)
    return
  }
  router.push({ path: `/${alm.vista}/${alm.id}` })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.pagina {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #d9f7f5 0%, #b3e5fc 100%);
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 90vw;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
  text-align: center;
  animation: fadein 0.7s;
}

.title {
  margin-bottom: 38px;
  font-size: 2rem;
  font-weight: 700;
  color: #1976d2;
  text-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* ✅ Botones centrados en varias filas */
.button-group {
  display: flex;
  flex-wrap: wrap;           /* permite varias filas */
  justify-content: center;   /* centra horizontalmente */
  gap: 24px;
}

.almacen-btn {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 24px 28px;
  font-size: 1.35rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #4caf50 0%, #2196f3 100%);
  color: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.almacen-btn .icon {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  padding: 10px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.almacen-btn:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.almacen-btn:active {
  transform: scale(0.97);
}

/* 📱 Ajuste en móvil */
@media (max-width: 600px) {
  .container {
    padding: 24px 16px;
  }
  .almacen-btn {
    padding: 18px 20px;
    font-size: 1.1rem;
  }
  .almacen-btn .icon {
    font-size: 1.5rem;
  }
}

@keyframes fadein {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: none; }
}
</style>
