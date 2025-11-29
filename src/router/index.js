import { createRouter, createWebHistory } from 'vue-router'

import ActaDespachoTraslado from '../components/ActaDespachoTraslado.vue'
import ActaDespachoVenta from '../components/ActaDespachoVenta.vue'
import ActaDespacho from '../components/ActaDespacho.vue'
import HomeView from '../components/HomeView.vue'
import RecepcionView from '../components/RecepcionView.vue'
import ActaRecepcion from '../components/ActaRecepcion.vue'
import Organoleptico from '../components/Organoleptico.vue'
import SelecAlmView from '../components/SelecAlmView.vue'


const routes = [
  { path: '/', component: SelecAlmView },                    // página de inicio
  { path: '/HomeView/:id', component: HomeView },            // almacenes 6 y 8
  { path: '/RecepcionView/:id', component: RecepcionView },  // almacenes 1 y 5

  // 🔑  Rutas con ID dinámico para que reciban el almacén seleccionado
  { path: '/actas-traslados/:id', component: ActaDespachoTraslado },
  { path: '/actas-ventas/:id',    component: ActaDespachoVenta },
  { path: '/acta-despacho/:id',   component: ActaDespacho },
  { path: '/organoleptico/:id',   component: Organoleptico },

  { path: '/actas-recepcion/:id', component: ActaRecepcion }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
