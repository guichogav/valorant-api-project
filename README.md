# Valorant Esports

Una aplicación web moderna que proporciona información sobre la escena profesional de Valorant, incluyendo equipos, jugadores y eventos. 

---

## ✨ Características

### 🎯 Sección de Equipos
- Visualiza equipos profesionales de Valorant en un diseño de cuadrícula responsive
- Cada tarjeta de equipo muestra:
  - Logo/imagen del equipo
  - Nombre del equipo 
  - País de origen
- Vista detallada en modal con:
  - Información completa del equipo
  - Lista de jugadores actuales
  - Staff técnico
  - Eventos recientes
- Paginación dinámica (8 equipos por página)

### 👥 Sección de Jugadores
- Explora los jugadores profesionales de Valorant
- Tarjetas de jugador con:
  - Foto de perfil
  - Nombre del jugador
  - Equipo actual
  - País que representa
- Modal detallado incluyendo:
  - Estadísticas del jugador
  - Redes sociales
  - Historial de equipos
  - Enlaces a perfiles externos
- Paginación eficiente (8 jugadores por página)

### 🏆 Sección de Eventos
- Últimos torneos y eventos de Valorant
- Tarjetas informativas con:
  - Imagen del evento
  - Nombre del torneo
  - Estado actual (en curso/próximo/completado)
  - Premio total
  - Fechas programadas
  - País sede
- Paginación personalizada (10 eventos por página)

### 🔍 Búsqueda Global
- Barra de búsqueda en tiempo real
- Búsqueda simultánea en:
  - Equipos (nombre/país)
  - Jugadores (nombre/equipo/país)
  - Eventos (nombre/estado/región/premios)
- Actualización instantánea de resultados
- Destacado visual de coincidencias

### 🔐 Autenticación
- Login con Google Firebase
- Persistencia de sesión
- Interfaz adaptativa según estado de autenticación
- Perfil de usuario con foto

### ⚡ Rendimiento
- Caché local de datos (TTL 12h)
- Carga progresiva con indicador visual
- Paginación optimizada
- Precarga inteligente de imágenes

---

## 🎨 Personalización

### 🎯 Diseño Visual
- Tema oscuro inspirado en Valorant
- Paleta de colores consistente:
  - Rojo principal: #ff4655
  - Fondos oscuros: #1f2326
  - Acentos claros: #ece8e1
- Tipografía moderna y legible
- Iconografía de Bootstrap Icons

### 🎮 Elementos UI
- Cards con efectos hover suaves
- Modales personalizados con gradientes
- Botones con estados y transiciones
- Barras de progreso animadas
- Headers fijos con transparencia

### 📱 Responsive Design
- Diseño fluido mobile-first
- Breakpoints optimizados
- Menú adaptativo
- Imágenes responsive
- Grid system flexible

### 🌈 Efectos Visuales
- Transiciones suaves entre secciones
- Animaciones de carga
- Efectos hover en tarjetas
- Sombras y elevaciones
- Indicadores de estado

---

## 🛠️ Detalles Técnicos

### Integración de API
- Impulsado por la API de Valorant Esports (RapidAPI)
- Endpoints utilizados:
  - `/teams` - Listado y detalles de equipos
  - `/players` - Información de jugadores
  - `/events` - Datos de torneos

---

## 👥 Colaboradores
Hecho con 💜 por Nutri y Guicho