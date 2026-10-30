# Reservas Deportivas · Villaguay 🏟️⚽🏀🎾

Aplicación móvil oficial para la reserva y gestión de canchas y espacios deportivos municipales de la ciudad de Villaguay, Entre Ríos.
Desarrollada para el **Trabajo Final Integrador (TFI)** de la materia **Desarrollo para Móviles** (UNER - 2026, 2do cuatrimestre).

---

## 📋 Resumen de Cumplimiento de Requisitos

La aplicación implementa de forma completa y estricta los 10 requisitos mínimos exigidos por la cátedra:

| N° | Requisito de la Cátedra | Implementación en la App |
|---|---|---|
| **1** | **Dominio real asignado** | Reservas Deportivas de Villaguay: 11 espacios reales (fútbol 5, fútbol 11, básquet, vóley, tenis, gimnasio) con fotos, video, reglamento y precios. |
| **2** | **Navegación completa** | **Expo Router** basado en archivos (`src/app/`): 5 pestañas principales (`Canchas`, `Mapa`, `Mis Reservas`, `Gestión`, `Perfil`) y pantallas de detalle (`espacio/[id]`, `espacio/[id]/turnos`, `reserva/[id]`, modal `auth`, etc.). |
| **3** | **Listado y Búsqueda con Filtros** | Búsqueda por texto (nombre, complejo, superficie), chips de deportes, toggles de equipamiento (techado, iluminación), ordenamiento por cercanía, precio o capacidad. Store en **Zustand**. |
| **4** | **Detalle y Multimedia** | Galería de fotos con **`expo-image`**, reproductor de video de la cancha con la API moderna **`expo-video`** (`useVideoPlayer` y `VideoView`), insignias de equipamiento y reglamento. |
| **5** | **Formularios y Validación** | Formularios controlados con **`react-hook-form`** y validación de esquemas tipados con **`zod`** (`auth/ingreso`, `auth/registro`, modal de confirmación con capacidad de personas). |
| **6** | **Persistencia y Modo Offline** | **`expo-sqlite`** para base de datos local con migraciones `PRAGMA user_version`, consultas parametrizadas con `?` y sincronización bidireccional. Persistencia sincrónica de preferencias con **`expo-sqlite/kv-store`**. |
| **7** | **Seguridad y Biometría** | Token JWT sensible almacenado en **`expo-secure-store`**. Autenticación biométrica con **`expo-local-authentication`** (Face ID / huella dactilar) con toggle configurable. |
| **8** | **Hardware y Sensores** | **`expo-camera`** (`CameraView`) para escáner QR de ingreso, **`expo-image-picker`** y **`expo-file-system`** para foto de evidencia en bloqueos climáticos, **`expo-location`** y **`react-native-maps`** para mapa interactivo de complejos, **`expo-haptics`** para feedback táctil en favoritos y escaneo. |
| **9** | **Notificaciones** | Registro de token push en backend (`/dispositivos`) con **`expo-notifications`**, canales Android (`reservas`, `general`), y recordatorios locales programados automáticamente **2 horas antes** de cada partido reservado. |
| **10** | **Testing y Compilación** | 19 tests unitarios con **`vitest`** cubriendo cálculos de ventana de cancelación (4 horas), grilla horaria y fórmulas geográficas Haversine. Flujo E2E definido en **Maestro** (`.maestro/camino-principal.yaml`). Configuración de compilación APK interno en `eas.json`. |

---

## 👥 Cuentas de Demostración para Evaluación

Todos los usuarios de prueba comparten la contraseña fijada por cátedra: `villaguay2026`.

| Nombre | Email | Rol | Particularidad / Caso de Prueba |
|---|---|---|---|
| **Emiliano Ruiz** | `emiliano@mail.com` | `jugador` | Cancha 2 en favoritos, historial con 1 reserva cumplida y 1 confirmada. |
| **Lucía Benítez** | `lleno@demo.ar` | `jugador` | **3 reservas activas confirmadas** (prueba el límite de negocio D2). |
| **Tomás Acosta** | `nuevo@demo.ar` | `jugador` | Usuario nuevo sin reservas ni favoritos. |
| **Marcelo Godoy** | `marcelo@villaguay.demo.ar` | `encargado` | Acceso a escáner de QR en puerta, bloqueos por lluvia y reservas fijas. |
| **Admin Deportes** | `admin@villaguay.demo.ar` | `administrador` | Actualización de tarifas por hora y gestión total del complejo. |

> [!TIP]
> En la pestaña **Perfil** disponés de botones de acceso rápido para alternar entre cualquiera de estas cuentas con un solo toque.

---

## 🚀 Puesta en Marcha

### 1. Requisitos Previos
- Node.js versión 20 o superior (Node 26 soportado).
- Expo CLI / npx.

### 2. Ejecutar la App Móvil
```bash
cd app-reservas-deportivas
npx expo start
```
- Presioná `a` para abrir en emulador de Android.
- Presioná `i` para abrir en simulador de iOS.
- Presioná `w` para abrir en navegador web.
- O escaneá el código QR con la app **Expo Go** en tu celular físico.

### 3. Ejecutar los Tests Unitarios
```bash
cd app-reservas-deportivas
npm test
```
Ejecuta los tests unitarios con `vitest`, verificando cálculos de grilla, reglas de 4 horas y algoritmos de distancia.

### 4. Verificación de Tipos TypeScript
```bash
cd app-reservas-deportivas
npm run check-types
```
Ejecuta el compilador de TypeScript (`tsc --noEmit`), garantizando 0 errores de tipos en todo el proyecto.

### 5. Backend de Notificaciones
Los tests de backend en `api-reservas-deportivas` (almacén de tokens TypeORM y enviador de push a Expo en tandas de 100) se ejecutan con:
```bash
cd api-reservas-deportivas
npm run test:notificaciones
```
*(25 de 25 tests pasando exitosamente).*

---

## 🛠️ Tecnologías y Librerías Principales
- **Framework:** Expo SDK 58, React Native 0.88, React 19.
- **Lenguaje:** TypeScript 6.
- **Enrutamiento:** Expo Router v58 (`expo-router/entry`).
- **Estado Global:** Zustand v5.
- **Consultas y Caché:** @tanstack/react-query v5.
- **Base de Datos Local:** `expo-sqlite` (SQLite WAL + `expo-sqlite/kv-store`).
- **Formularios:** `react-hook-form` + `zod`.
- **Iconografía:** `@react-native-vector-icons/ionicons`.
- **Multimedia:** `expo-image`, `expo-video` (`VideoView`, `useVideoPlayer`).
- **Hardware & Sensores:** `expo-camera`, `expo-image-picker`, `expo-location`, `react-native-maps`, `expo-haptics`, `expo-local-authentication`, `expo-notifications`, `expo-file-system`.
