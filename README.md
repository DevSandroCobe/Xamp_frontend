# 🌐 Frontend - Sistema de Actas de Despacho

Sistema web moderno para la gestión, visualización y generación de actas de despacho, desarrollado con Vue 3 y Vite.  Se integra con el backend para automatizar procesos de migración de datos y generación de PDFs. 

![Vue](https://img.shields.io/badge/Vue. js-3.x-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías-principales)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)

---

## ✨ Características

- ✅ **Gestión de Actas**:  Visualización y gestión de actas de despacho (traslados y ventas)
- ✅ **Migración de Datos**: Interfaz para migrar datos desde sistemas legacy (SAP)
- ✅ **Generación de PDFs**: Descarga de actas en formato PDF con un clic
- ✅ **Interfaz Reactiva**: Experiencia de usuario fluida con Vue 3 Composition API
- ✅ **Navegación SPA**: Enrutamiento sin recargas de página
- ✅ **Diseño Responsivo**: Adaptable a diferentes dispositivos y tamaños de pantalla
- ✅ **Hot Module Replacement**: Desarrollo ultrarrápido con Vite

---

## 🚀 Tecnologías Principales

| Tecnología | Versión | Uso |
|------------|---------|-----|
| [Vue 3](https://vuejs.org/) | 3.x | Framework frontend progresivo |
| [Vite](https://vitejs.dev/) | 5.x | Build tool y dev server |
| [Vue Router](https://router.vuejs.org/) | 4.x | Enrutamiento SPA |
| [Axios](https://axios-http.com/) | 1.x | Cliente HTTP para API REST |
| [Pinia](https://pinia.vuejs.org/) | 2.x | Gestión de estado (Store) |

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**:  18.x o superior ([Descargar](https://nodejs.org/))
- **npm**: 9.x o superior (incluido con Node.js)
- **Backend**: El [backend de Xamp](https://github.com/DevSandroCobe/Xamp_backend) debe estar corriendo

---

## ⚙️ Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/DevSandroCobe/Xamp_frontend.git
   cd Xamp_frontend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_TITLE=Sistema de Actas de Despacho
```

### Configuración de la API

Si necesitas cambiar la URL del backend, modifica la configuración en: 
- `src/config/api.js` o donde tengas configurado Axios
- Asegúrate de que el backend esté corriendo en la URL especificada

---

## 💻 Uso

### Modo Desarrollo

Inicia el servidor de desarrollo con hot-reload: 

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

### Build para Producción

Compila y optimiza para producción:

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

### Preview de Producción

Previsualiza el build de producción localmente:

```bash
npm run preview
```

---

## 📁 Estructura del Proyecto

```
Xamp_frontend/
├── public/              # Archivos estáticos públicos
├── src/
│   ├── assets/          # Imágenes, estilos globales, fuentes
│   ├── components/      # Componentes reutilizables
│   │   ├── forms/       # Formularios
│   │   ├── tables/      # Tablas de datos
│   │   └── common/      # Componentes comunes (botones, modales, etc.)
│   ├── views/           # Vistas/páginas principales
│   │   ├── Home.vue
│   │   ├── ActaDespachoTraslado. vue
│   │   ├── ActaDespachoVenta.vue
│   │   └── Migracion.vue
│   ├── router/          # Configuración de rutas
│   │   └── index.js
│   ├── stores/          # Stores de Pinia (estado global)
│   ├── services/        # Servicios para llamadas a la API
│   │   └── api.js
│   ├── utils/           # Funciones auxiliares
│   ├── App.vue          # Componente raíz
│   └── main.js          # Punto de entrada
├── . env                 # Variables de entorno (no versionado)
├── .gitignore
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
└── README. md
```

---

## 📜 Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint

# Ejecutar tests (si aplica)
npm run test
```

---

## 🚢 Despliegue

### Netlify / Vercel

1. Conecta tu repositorio
2. Configura el comando de build:  `npm run build`
3. Directorio de publicación: `dist`
4. Agrega las variables de entorno necesarias

### Servidor Propio

```bash
# Build de producción
npm run build

# Sube la carpeta dist/ a tu servidor
# Configura tu servidor web (Nginx, Apache) para servir los archivos
```

**Ejemplo de configuración Nginx:**

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /ruta/a/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔗 Integración con Backend

Este frontend se comunica con el [backend de Xamp](https://github.com/DevSandroCobe/Xamp_backend) a través de una API REST.

**Endpoints principales:**
- `GET /api/actas` - Listar actas
- `POST /api/migracion` - Ejecutar migración de datos
- `GET /api/pdf/{id}` - Descargar PDF de acta
- `GET /api/status` - Estado del sistema

---

## 🤝 Contribución

Las contribuciones son bienvenidas.  Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Notas Adicionales

- El sistema está optimizado para trabajar con el backend de migración SAP y generación de PDFs
- Los estilos pueden personalizarse según la identidad visual de tu empresa
- Para producción, asegúrate de configurar correctamente CORS en el backend
- Utiliza las DevTools de Vue para debugging:  [Vue DevTools](https://devtools.vuejs.org/)

---

## 📄 Licencia

Este proyecto es privado.  Todos los derechos reservados. 

---

## 👤 Autor

**DevSandroCobe**
- GitHub: [@DevSandroCobe](https://github.com/DevSandroCobe)

---

¿Dudas, problemas o sugerencias? ¡Abre un [issue](https://github.com/DevSandroCobe/Xamp_frontend/issues)!
```
