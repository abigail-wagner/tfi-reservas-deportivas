---
title: "Unidad 2 — React Native y Expo · Desarrollo para Móviles"
source: "U02 — React Native y Expo · Desarrollo para Móviles.pdf"
pages: 29
words: 2361
images: 0
creator: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36"
producer: "Skia/PDF m151"
pdf_created: "2026-08-12 01:56:16"
converted: "2026-10-27"
---

# Unidad 2 — React Native y Expo · Desarrollo para Móviles

> **Fuente:** `U02 — React Native y Expo · Desarrollo para Móviles.pdf` · **Páginas:** 29 · **Palabras:** 2.361 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
## **Unidad 2** **React Native y Expo**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 2
###### **Qué vamos a ver**

**Objetivos** **Temas**

Entender cómo React Native llega a la interfaz nativa.

Conocer la arquitectura de ejecución actual.

Trabajar con Expo y su flujo de desarrollo.

React Native: qué es y de dónde viene

DOM vs. componentes nativos

**Arquitectura de ejecución**

Expo: CLI, EAS y configuración del proyecto

TypeScript, React y ciclo de vida se vieron en la clase anterior
de esta misma unidad.

<!-- página 3 -->

UNIDAD 2 · PARTE 1
#### **React Native**

Qué es, de dónde viene y en qué se diferencia de React para web.

<!-- página 4 -->

UNIDAD 2 · PARTE 1 · REACT NATIVE
###### **Qué es**

Framework open source de JavaScript creado por Meta para construir aplicaciones nativas en
iOS, Android y otras plataformas usando React.

**Componentes nativos**
Elementos agnósticos de plataforma
( `<View>`, `<Text>` ) que se mapean a
interfaces nativas reales.

**Aprender una vez**
Reutilización de código entre
plataformas, enrutamiento basado en
archivos y más de 50 módulos del
ecosistema.

**Alcance**
Mantenido por Meta, con apoyo de
Expo, Microsoft y la comunidad. Se
extiende a Windows, macOS y web.

<!-- página 5 -->

UNIDAD 2 · PARTE 2
#### **DOM vs. componentes nativos**

Misma idea de componentes de React, destinos completamente distintos.

<!-- página 6 -->

UNIDAD 2 · PARTE 2 · DOM VS. COMPONENTES NATIVOS
###### **Renderizado**

REACT (WEB) REACT NATIVE
Renderiza al DOM del navegador como elementos HTML Renderiza a elementos de interfaz nativos: `UIView` en
( `<div>`, `<p>` ). iOS, `ViewGroup` en Android.

El DOM virtual optimiza actualizaciones por diferencias y
actualiza el DOM real.

Lo hace mediante **Fabric**, que mantiene el árbol de la
interfaz en C++ y actualiza las vistas nativas
directamente.

React Native evita la sobrecarga del navegador y da una experiencia nativa, pero exige considerar diferencias entre
plataformas.

<!-- página 7 -->

UNIDAD 2 · PARTE 2 · DOM VS. COMPONENTES NATIVOS
###### **Biblioteca de componentes**

DOM REACT NATIVE

`<div>`, `<span>`, `<input>`, `<button>` `<View>`, `<Text>`, `<TextInput>`, `<Pressable>`

`<div>` → `<View>` `<p>` → `<Text>` `<input>` →
```
<TextInput>

```

`<img>` → `<Image>`

<!-- página 8 -->

UNIDAD 2 · PARTE 2 · DOM VS. COMPONENTES NATIVOS
###### **Estilos**

CSS · WEB

```
.tarjeta {
  background-color: #0B5394;
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
}

<div class="tarjeta">Hola</div>

```

STYLESHEET · REACT NATIVE

```
const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#0B5394',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
});

<View style={estilos.tarjeta}>
  <Text>Hola</Text>
</View>

```

**camelCase**

`background-color` pasa a ser `backgroundColor` .

**Números, no cadenas**

**Números, no cadenas** **Objetos, no selectores**

`16px` pasa a ser `16` . Sin unidades. No hay archivo `.css`

No hay archivo `.css` ni cascada: el estilo se pasa
como propiedad al componente.

No existe `hover`, y **Flexbox es el modelo por defecto** - con `flexDirection: 'column'`, no `row` como en web.

<!-- página 9 -->

UNIDAD 2 · PARTE 2 · DOM VS. COMPONENTES NATIVOS
###### **Manejo de eventos**

DOM

REACT NATIVE

`onClick`, `onMouseOver`, `onKeyPress` `onPress`, `onLongPress`, `onScroll`

```
<button onClick={handleClick}>

```

```
<Pressable onPress={handlePress}>

```

Los eventos están pensados para toques y gestos, no para mouse y teclado.

<!-- página 10 -->

UNIDAD 2 · PARTE 2 · DOM VS. COMPONENTES NATIVOS
###### **Plataforma y APIs**

**Comportamiento específico de plataforma** **Acceso a capacidades**
**Web:** mayormente agnóstico; diferencias menores entre **Web:** APIs del navegador (
navegadores. `fetch` ).

**Web:** APIs del navegador ( `window`, `localStorage`,

`fetch` ).

**Nativo:** hay que manejar diferencias iOS/Android — sobre
todo en estilos. Se usa la API `Platform` .

**Nativo:** APIs del dispositivo (cámara, GPS, notificaciones)
vía módulos de React Native o Expo.

**Al pasar de web a móvil:** reutilizá lo que sabés de React —hooks, estado, composición— y cambiá sólo la capa de
componentes y eventos.

<!-- página 11 -->

UNIDAD 2 · PARTE 3
#### **Arquitectura de ejecución**

Cómo viaja una instrucción desde JavaScript hasta el componente nativo.

<!-- página 12 -->

UNIDAD 2 · PARTE 3 · ARQUITECTURA DE EJECUCIÓN
###### **¿Cómo llega el código a la pantalla?**

**JavaScript** **Vista nativa**
**?**
tu código y React UIView · ViewGroup

Ya vimos **qué** renderiza React Native: componentes nativos, no DOM.

Falta el **cómo** : es lo que explica por qué ciertas librerías pueden existir y por qué casi todo el material anterior a
2025 está desactualizado.

<!-- página 13 -->

UNIDAD 2 · PARTE 3 · ARQUITECTURA DE EJECUCIÓN

**ELIMINADO EN SDK 55**
###### **El modelo histórico: el puente**

**Hilo de JS**
tu código y React

**PUENTE**

JSON JSON JSON

**Hilo de UI (main)**
el único que toca la pantalla

Un tercer hilo, el **Shadow thread**, calculaba el layout con Yoga.

Cada mensaje se **serializaba a JSON**, se encolaba y se entregaba de forma **asincrónica y por lotes** .

Motor de JavaScript: JavaScriptCore.

<!-- página 14 -->

UNIDAD 2 · PARTE 3 · ARQUITECTURA DE EJECUCIÓN
###### **Los límites del puente**

**Asincronía obligatoria**
Nada podía ser sincrónico. Medir un elemento y decidir en el
mismo cuadro era imposible: parpadeos y saltos visuales.

**Congestión**
Un scroll rápido o una animación llenaban la cola: la interfaz
se retrasaba respecto del dedo del usuario.

**Costo de serialización**
Cada dato se convertía a texto JSON de ida y se parseaba de
vuelta. Con listas largas o gestos, el costo se acumula.

**Arranque lento y sin tipos**
Todos los módulos nativos se inicializaban al abrir la app. Y
JS y nativo acordaban tipos por convención: el error aparecía
en ejecución.

A 60 fps hay **16 ms por cuadro** para hacer el viaje completo de ida y vuelta. Una animación que sigue el dedo no
entraba en ese presupuesto.

<!-- página 15 -->

UNIDAD 2 · PARTE 3 · ARQUITECTURA DE EJECUCIÓN
###### **JSI: el reemplazo del puente**

**JavaScript**
Hermes · JSC · V8

**JSI · C++**

⇄

**Objetos nativos**

referencia directa

Una API liviana en **C++** : JavaScript tiene referencias directas a objetos nativos e invoca sus métodos.

No hay puente, no hay JSON, no hay cola: es una **invocación de función** .

Habilita **llamadas sincrónicas** y es agnóstico del motor.

El puente era mandarse cartas por correo. JSI es levantar el teléfono.

<!-- página 16 -->

UNIDAD 2 · PARTE 3 · ARQUITECTURA DE EJECUCIÓN
###### **Fabric, el nuevo renderizador**

El **Shadow Tree** —el árbol que representa la interfaz antes de convertirse en vistas nativas— ahora vive en C++ y es
**compartido entre iOS y Android** .

**Layout sincrónico**
Medición y posicionamiento en el
mismo cuadro: sin parpadeos.

**Acceso directo**
El código nativo lee y actualiza el árbol
sin pasar por el hilo de JS.

**React 19 concurrente**
Suspense, transiciones y renderizados
interrumpibles funcionan de verdad.

**Recuerden esta slide.** En la Unidad 3 vamos a usar Unistyles, que actualiza los estilos escribiendo en este árbol
desde C++, sin re-renderizar ningún componente de React.

<!-- página 17 -->

UNIDAD 2 · PARTE 3 · ARQUITECTURA DE EJECUCIÓN
###### **El motor: Hermes V1**

Motor de JavaScript de Meta, específico para móviles.

Compila a **bytecode en tiempo de build** (AOT), no al
abrir la app: arranque más rápido, menos memoria,
menos batería.

Motor **por defecto desde Expo SDK 56** . En SDK 55
era opcional.

### **JS**

Antes: se parsea

### **JS 0x**

Antes: se parsea Hermes: bytecode

al abrir la app ya compilado

ya compilado

**Consecuencia práctica:** cuando se le manda una actualización a una app ya instalada, alcanza con enviar las
diferencias de bytecode en lugar del paquete completo — hasta un **75% más chicas** . Lo vemos en la Parte 4 y en
detalle en la Unidad 7.

<!-- página 18 -->

UNIDAD 2 · PARTE 3 · ARQUITECTURA DE EJECUCIÓN
###### **Por qué nos importa**

**APIs sincrónicas**

`expo-sqlite/kv-store` lee y escribe de forma sincrónica
(Unidad 5). Sobre el puente era imposible.

**Animaciones fuera del hilo de JS**
Reanimated 4 y worklets (Unidad 3).

**Estilos sin re-renders**
Unistyles 3 actualiza el Shadow Tree desde C++ (Unidad 3).

**React 19 concurrente**
Suspense y transiciones funcionan de verdad.

**SDK 52 · RN 0.76**
Nueva Arquitectura pasa a ser el valor
por defecto

**SDK 55 · RN 0.83**
Se elimina la arquitectura legacy

**SDK 56 · RN 0.85**
Hermes V1 como motor por defecto

**SDK 57 · RN 0.86**
La versión de esta cursada

No hay opción de volver atrás. **Si encuentran un tutorial que habla del puente, está desactualizado** - y ahora
saben reconocerlo.

<!-- página 19 -->

UNIDAD 2 · PARTE 4
#### **Expo**

La plataforma sobre la que vamos a trabajar toda la cursada.

<!-- página 20 -->

UNIDAD 2 · PARTE 4 · EXPO

**CONTEXTO HISTÓRICO**
###### **La vida antes de Expo**

**Configuración manual**
Xcode para iOS (sólo Mac) y Android Studio para Android.
Instalar el CLI, configurar el entorno, gestionar dependencias,
compilar a mano.

```
npx @react-native-community/cli init MiApp
cd ios && pod install
./gradlew assembleDebug

```

**Los dolores**

Curva de aprendizaje pronunciada: React, JavaScript y
plataformas nativas.

Emuladores, dependencias y depuración específica por
plataforma.

Navegación, notificaciones y cámara requerían librerías o
código nativo.

Cada corrección, por chica que fuera, tenía que pasar por
la revisión de la tienda y esperar su aprobación.

<!-- página 21 -->

UNIDAD 2 · PARTE 4 · EXPO
###### **Qué es**

Plataforma de código abierto que simplifica crear y desplegar aplicaciones iOS y Android con
React Native. Aporta herramientas, servicios y librerías sobre el framework.

**Expo SDK**
Librerías para acceder a cámara,
ubicación, notificaciones o
almacenamiento, con una API común
para iOS y Android.

**Expo CLI**
Herramienta de línea de comandos
para iniciar, desarrollar y compilar
proyectos.

**EAS**
**Expo Application Services.** Servicios
en la nube que compilan la app, la
envían a las tiendas y le mandan
actualizaciones. Lo vemos en la
próxima slide.

<!-- página 22 -->

UNIDAD 2 · PARTE 4 · EXPO
###### **EAS y las actualizaciones OTA**

**EAS Build**
Compila la app en servidores de Expo.
**No necesitás una Mac para generar**
**la versión de iOS.**

**EAS Submit**
Sube el archivo compilado a Google
Play y App Store sin hacerlo a mano.

**EAS Update**
Envía cambios a las apps ya
instaladas, sin pasar por la tienda.

**OTA** = Over-The-Air, «por el aire». Es actualizar una app ya instalada en el teléfono del usuario **sin publicar una**
**versión nueva en la tienda** : la app descarga el cambio sola la próxima vez que se abre.

VIAJA POR OTA ✓ REQUIERE BUILD NUEVO Y TIENDA ✗
Tu código JavaScript y TypeScript Agregar una librería con código nativo

Imágenes, fuentes y demás recursos

Corregir un texto, un estilo o un bug de lógica

Cambiar permisos, ícono o nombre de la app

Subir de versión de SDK

La regla es simple: **si cambia el JavaScript, va por OTA. Si cambia lo nativo, hay que compilar y volver a la**
**tienda.**

<!-- página 23 -->

UNIDAD 2 · PARTE 4 · EXPO
###### **Cómo se prueba la app**

**SÓLO PARA EMPEZAR** **LO QUE VAMOS A USAR**
EXPO GO DEVELOPMENT BUILD

App de tienda que carga tu proyecto escaneando un QR.

Sin compilar nada: ideal para las primeras clases.

**Limitación:** sólo incluye las librerías del SDK. Si agregás
una dependencia nativa, deja de servir.

Una compilación propia de tu app con el cliente de
desarrollo incluido.

Soporta cualquier librería nativa y config plugin.

Se genera con EAS Build, sin necesidad de tener una
Mac.

Expo **no recomienda Expo Go** como entorno de desarrollo para aplicaciones que van a producción. Lo usamos para
arrancar y migramos a development builds apenas el proyecto integrador necesite algo nativo.

<!-- página 24 -->

UNIDAD 2 · PARTE 4 · EXPO
###### **Qué resigna**

**Dependencia del ecosistema**
Quedás atado al calendario de versiones del SDK. Por eso en
esta cursada lo congelamos en 57.

**Rendimiento extremo**
No es la mejor opción para casos como juegos con gráficos
intensivos.

**Tamaño de la aplicación**
Las apps tienden a ser más grandes por las librerías
incluidas.

**Integraciones nativas muy específicas**
Se resuelven con config plugins o código nativo propio
mediante prebuild.

<!-- página 25 -->

UNIDAD 2 · PARTE 4 · EXPO **Expo CLI: comandos que vas a usar todos los días**

```
# Servidor de desarrollo (Metro) en http://localhost:8081
npx expo start
```

```
# Compilar y correr localmente en simulador o emulador
npx expo run:ios          # sólo macOS
npx expo run:android
```

- `# Instalar paquetes en la versión correcta para tu SDK npx expo install expo-camera        # NO uses npm install para paquetes de Expo`

```
# Diagnosticar problemas de dependencias o de SDK
npx expo-doctor
```

```
# Publicar una actualización OTA (reemplaza al viejo `expo publish`)
eas update --branch production
```

`-` **Atajos en la terminal:** `a` Android · `i` iOS · `w` web · `r` recargar · `m` menú de desarrollo · `--tunnel` URL pública · `-offline` sin red

<!-- página 26 -->

UNIDAD 2 · PARTE 4 · EXPO

**PLANTILLA SDK 55+**
###### **Estructura del proyecto**

```
mi-app/
├── src/
│   └── app/            ← rutas (Expo Router)
│       ├── _layout.tsx
│       ├── index.tsx
│       └── (tabs)/
├── assets/             ← imágenes, fuentes, íconos
├── app.json            ← configuración central
├── package.json
├── tsconfig.json
└── node_modules/

```

**`src/app/`** - cada archivo es una ruta. El enrutamiento
es basado en archivos, como en Next.js.

**`app.json`** - metadatos, íconos, splash, configuración
por plataforma.

**`assets/`** - recursos estáticos referenciados desde

`app.json` .

Si viste tutoriales con `App.js` en la raíz y sin carpeta

`app/`, son anteriores a Expo Router. La plantilla cambió.

<!-- página 27 -->

UNIDAD 2 · PARTE 4 · EXPO
###### **app.json : la configuración central**

```
{
  "expo": {
    "name": "MiApp",
    "slug": "mi-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#0B3A5D"
    },
    "ios":     { "bundleIdentifier": "ar.edu.uner.miapp",
                 "supportsTablet": true },
    "android": { "package": "ar.edu.uner.miapp",
                 "adaptiveIcon": { "foregroundImage": "./assets/adaptive.png" } },
    "plugins": ["expo-router", "expo-camera"]
  }
}

```

**Metadatos:** `name`, `slug`, `version` .

**Identificadores:** `bundleIdentifier` y

`package` son los que identifican la app en
cada tienda. Se definen una vez y no se
cambian.

**Config plugins:** configuran código nativo
sin escribirlo.

Podés usar `app.config.js` en lugar de

`app.json` cuando necesites lógica o
variables de entorno.

<!-- página 28 -->

UNIDAD 2 · PARTE 4 · EXPO
###### **Leer la configuración desde el código**

```
import Constants from 'expo-constants';

// Configuración ya procesada — no importes app.json directamente
const nombre = Constants.expoConfig?.name;

// `extra` es el lugar para tus propios valores
const apiUrl = Constants.expoConfig?.extra?.apiUrl;

// Entorno de ejecución: 'storeClient' (Expo Go), 'standalone', 'bare'
const entorno = Constants.executionEnvironment;

```

**Por qué no importar** **`app.json`**

Expondrías el archivo entero al bundle. `expoConfig` ya viene filtrado:
campos sensibles como `ios.googleServicesFile` se excluyen.

**Verificar qué se publica**

`npx expo config --type public` muestra exactamente qué valores quedan
incrustados en la compilación.

<!-- página 29 -->

UNIDAD 2
##### **Lo que sigue**

Práctica: entorno de desarrollo y primer proyecto con Expo.

**Unidad 3:** pantallas, estilos con StyleSheet y Unistyles, navegación con Expo Router.

Documentación: `docs.expo.dev` - `reactnative.dev`
