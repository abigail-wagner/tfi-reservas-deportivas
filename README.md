# Reservas Deportivas · Villaguay 🏟️⚽🏀🎾

Trabajo Final Integrador (TFI) de la materia **Desarrollo para Móviles** (UNER - 2026, 2do cuatrimestre).

Aplicación móvil oficial para la gestión y reserva de canchas y complejos deportivos de la Municipalidad de Villaguay, Entre Ríos. Incluye catálogo interactivo, grilla de turnos de 7 días, mapas, código QR de ingreso offline, bloqueos por lluvia con evidencia fotográfica y notificaciones push.

---

## 📁 Estructura del Repositorio

* **[`app-reservas-deportivas/`](./app-reservas-deportivas)**: Aplicación móvil en React Native con Expo SDK 58, Expo Router, TypeScript, SQLite y Zustand.
* **[`api-reservas-deportivas/`](./api-reservas-deportivas)**: Backend en NestJS con SQLite/TypeORM y sistema de notificaciones push.
* **[`docs/`](./docs)**: Consignas, apuntes teóricos y especificación del PRD de la cátedra.

---

## 💻 Requisitos Previos (¿Qué necesitás tener instalado?)

Antes de comenzar, asegurate de tener instalado en tu computadora y teléfono:

1. **Node.js**: Versión 20 o superior (recomendado 22 LTS, 24 o 26). Podés verificarlo abriendo una terminal con:
   ```bash
   node -v
   ```
2. **Git**: Para clonar y sincronizar el repositorio.
3. **En tu celular (Android o iOS)**:
   * Instalá la aplicación gratuita **Expo Go** desde Google Play Store o Apple App Store.

---

## 🚀 Guía de Puesta en Marcha Paso a Paso

Seguí estos pasos en orden para levantar el sistema completo en tu máquina:

### Paso 1: Levantar el Backend (API)

Abrí una terminal en la raíz del proyecto y ejecutá:

```bash
# 1. Entrar a la carpeta del backend
cd api-reservas-deportivas

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de configuración .env
# En Windows (PowerShell):
copy .env.example .env
# En Linux / macOS:
cp .env.example .env

# 4. Crear la base de datos SQLite y cargar los datos de prueba de Villaguay
npm run db:reiniciar

# 5. Iniciar el servidor backend en modo desarrollo
npm run start:dev
```

> [!NOTE]
> La API quedará corriendo en `http://localhost:3000`. Podés abrir `http://localhost:3000/salud` en tu navegador para verificar que responda `{"estado": "ok"}`.
> **Dejá esta terminal abierta.**

---

### Paso 2: Levantar la Aplicación Móvil (Expo)

Abrí **una segunda terminal** en la raíz del proyecto y ejecutá:

```bash
# 1. Entrar a la carpeta de la app móvil
cd app-reservas-deportivas

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
# 👉 MODO RECOMENDADO (Túnel): funciona con cualquier conexión (Wi-Fi, datos móviles o detrás de firewalls)
npx expo start --tunnel

# 👉 O MODO LOCAL (si celular y computadora están en el mismo Wi-Fi sin bloqueo de router):
npx expo start
```

---

### Paso 3: Abrir la App en tu Celular

Cuando Metro Bundler termine de cargar en la terminal:

1. **En Android:**
   * Abrí la app **Expo Go** en tu celular.
   * Tocá en **"Scan QR code"** y escaneá el código QR que se muestra en tu terminal (o en el navegador en `http://localhost:8081`).
2. **En iOS (iPhone):**
   * Abrí la app **Cámara** nativa del iPhone y apuntá al código QR. Tocá la notificación para abrir en **Expo Go**.
3. **Alternativa manual:**
   * En Expo Go seleccioná **"Enter URL manually"** e ingresá la URL `exp://...` que te muestra la consola.

---

## 👥 Cuentas de Demostración para Pruebas

Todos los usuarios de prueba utilizan la contraseña universal fijada por cátedra: **`villaguay2026`**.

| Nombre | Email | Rol | Qué podés probar con esta cuenta |
|---|---|---|---|
| **Emiliano Ruiz** | `emiliano@mail.com` | `jugador` | Cancha 2 en favoritos, historial con 1 reserva cumplida y 1 confirmada. |
| **Lucía Benítez** | `lleno@demo.ar` | `jugador` | **3 reservas confirmadas**: probá hacer una 4ta reserva para validar la regla de negocio de límite de 3. |
| **Tomás Acosta** | `nuevo@demo.ar` | `jugador` | Usuario nuevo sin reservas ni favoritos. |
| **Marcelo Godoy** | `marcelo@villaguay.demo.ar` | `encargado` | Acceso al escáner QR de ingreso en puerta, bloqueo de canchas por lluvia con foto y reservas fijas. |
| **Admin Deportes** | `admin@villaguay.demo.ar` | `administrador` | Modificación de tarifas por hora de los 11 espacios deportivos. |

> [!TIP]
> En la app, dentro de la pestaña **Perfil**, tenés botones de **acceso rápido** con un solo toque para cambiar de usuario al instante sin necesidad de tipear contraseñas.

---

## 🧪 Pruebas Automatizadas y Calidad

Para verificar que todo el código cumple con los estándares exigidos:

### En la App Móvil (`app-reservas-deportivas/`):
```bash
cd app-reservas-deportivas

# Ejecutar los 19 tests unitarios (cálculos de 4 horas, grilla horaria y fórmulas Haversine)
npm test

# Verificar tipos estrictos de TypeScript (0 errores)
npm run check-types
```

### En el Backend (`api-reservas-deportivas/`):
```bash
cd api-reservas-deportivas

# Ejecutar los 25 tests del módulo de notificaciones push
npm run test:notificaciones
```

---

## 📱 Funcionalidades Destacadas de la App

* **Modo Offline:** Base de datos SQLite local para consultar canchas y presentar tu código QR en la entrada incluso si no tenés señal ni internet en el complejo.
* **Cancelaciones con Ventana de 4 Horas:** La app valida automáticamente si el turno dista más de 4 horas para permitir la cancelación o alertar de comunicarse con el encargado.
* **Multimedia Moderna:** Reproducción de video de recorrido de canchas con `expo-video` (`VideoView` y `useVideoPlayer`).
* **Hardware:** Escáner QR de ingreso con cámara, fotos de evidencia de anegamiento con galería/cámara, geolocalización y mapa con `react-native-maps`, y vibración háptica con `expo-haptics`.
* **Seguridad:** Almacenamiento seguro del token en `expo-secure-store` y compatibilidad con inicio de sesión biométrico (Huella dactilar / Face ID).
