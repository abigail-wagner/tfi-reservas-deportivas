---
title: "Unidad 1 — Introducción · Desarrollo para Móviles"
source: "Unidad 1 — Introducción · Desarrollo para Móviles.pdf"
pages: 28
words: 2776
images: 1
creator: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36 Edg/151.0.0.0"
producer: "Skia/PDF m151"
pdf_created: "2026-08-07 02:12:51"
converted: "2026-10-27"
---

# Unidad 1 — Introducción · Desarrollo para Móviles

> **Fuente:** `Unidad 1 — Introducción · Desarrollo para Móviles.pdf` · **Páginas:** 28 · **Palabras:** 2.776 · **Imágenes:** 1

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S ITA R I A E N D E S A R R O L LO W E B · F C A D · U N E R
## **Unidad 1** **Introducción**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 1
##### **Qué vamos a ver**

**Objetivos** **Partes**

Conocer los enfoques de desarrollo móvil y cuándo
conviene cada uno.

Comparar los frameworks multiplataforma vigentes.

Dejar el entorno de desarrollo funcionando.

Trabajar con control de versiones desde el primer día (deck
aparte).

Enfoques de desarrollo móvil

Frameworks de desarrollo móvil

Entorno de desarrollo

<!-- página 3 -->

UNIDAD 1
##### **¿Qué es una app?**
Software diseñado para instalarse en teléfonos y tablets. A diferencia de una web, se descarga desde la tienda del sistema operativo y accede a las capacidades del dispositivo.

**Personalización**

La experiencia se adapta al
usuario y al dispositivo.

**Notificaciones**

Canal directo, sin depender
de que abra el navegador.

**Sensores y hardware**

Cámara, GPS, Bluetooth,
acelerómetro, biometría.

**Funciona sin conexión**

Datos locales y
sincronización diferida.

Una app exige planificación, mantenimiento, pruebas en muchos dispositivos y trabajo de publicación. **La primera**
**decisión del proyecto es si realmente hace falta una app o alcanza con una web.**

<!-- página 4 -->

UNIDAD 1 · PARTE 1
### **Enfoques de desarrollo móvil**

Nativas, híbridas y web. Qué gana y qué resigna cada una.

<!-- página 5 -->

UNIDAD 1 · PARTE 1 · ENFOQUES DE DESARROLLO MÓVIL
##### **Los tres enfoques**

**Nativas**

Un código fuente por plataforma, con el
lenguaje y las herramientas que define
cada una: Kotlin/Java en Android, Swift
en iOS.

**Híbridas / multiplataforma**

Una sola base de código para las dos
plataformas. Según el framework, se
renderiza en una WebView o se mapea
a componentes nativos reales.

**Web y PWA**

Sitios optimizados para móvil que
corren en el navegador, con
capacidades extra: uso sin conexión,
notificaciones, instalación.

Cada enfoque equilibra **rendimiento, costo y velocidad de desarrollo** . No hay uno mejor: hay uno adecuado para cada
proyecto.

<!-- página 6 -->

UNIDAD 1 · PARTE 1 · ENFOQUES DE DESARROLLO MÓVIL
##### **Nativas**

A FAVOR EN CONTRA

Rendimiento máximo y acceso directo al hardware.

Interfaz alineada con las guías de cada plataforma:
Material Design en Android, Human Interface Guidelines
en iOS.

Acceso completo e inmediato a toda API nueva del
sistema.

Ejemplos: Spotify, Google Maps.

Dos bases de código: el doble de tiempo y de costo.

Cada corrección espera la aprobación de la tienda.

Requiere perfiles especializados y distintos por
plataforma.

<!-- página 7 -->

UNIDAD 1 · PARTE 1 · ENFOQUES DE DESARROLLO MÓVIL
##### **Híbridas y multiplataforma**

Bajo el mismo rótulo conviven **dos técnicas muy distintas**, y la diferencia explica casi todo lo demás.

WEBVIEW COMPONENTES NATIVOS REALES

La app es una web empaquetada dentro de un
contenedor nativo ( WKWebView en iOS, WebView en
Android).

Los plugins extienden lo que el navegador no ofrece.

Ionic + Capacitor, Apache Cordova.

El framework traduce sus componentes a vistas nativas
del sistema.

No hay navegador de por medio: la interfaz es nativa.

React Native, Flutter, Kotlin Multiplatform.

Cuando alguien dice «las híbridas andan lento», casi siempre está hablando de la primera técnica. **React Native está en**
**la segunda.**

<!-- página 8 -->

UNIDAD 1 · PARTE 1 · ENFOQUES DE DESARROLLO MÓVIL
##### **Híbridas: resumen**

A FAVOR EN CONTRA

Una sola base de código reduce tiempo y costo.

Aprovecha lo que ya saben de desarrollo web.

Permite actualizar sin pasar por la tienda, dentro de
ciertos límites.

Las APIs más nuevas del sistema tardan en estar
disponibles.

Se depende del calendario de versiones del framework.

El tamaño de la app es mayor.

Casos muy exigentes —juegos, gráficos intensivos—
siguen pidiendo nativo.

<!-- página 9 -->

UNIDAD 1 · PARTE 1 · ENFOQUES DE DESARROLLO MÓVIL
##### **Web y PWA**

A FAVOR EN CONTRA

Funciona en cualquier dispositivo con navegador.

Costo bajo, con tecnologías web estándar.

Se actualiza al instante, sin tiendas.

No requiere instalación: se accede por URL.

Acceso al hardware limitado frente a nativas e híbridas.

Más lenta en aplicaciones complejas.

La experiencia varía según navegador y dispositivo.

Menos visibilidad: no está en las tiendas.

<!-- página 10 -->

|UNIDAD 1 · PARTE 1 · ENFOQUES DE DESARROLLO MÓVIL<br>**Cómo elegir**||
|---|---|
|Si el proyecto…|Conviene|
|Exprime gráficos o hardware al máximo(juegos, AR, edición de video)|**Nativo**|
|Necesita las dos plataformas con equipo y presupuesto acotados|**Multiplataforma**|
|Es sobre todo contenido y formularios, sin hardware específico|**Web / PWA**|
|Ya tiene un equipo web y necesita salir rápido|**Multiplataforma**|

En esta materia trabajamos con **React Native y Expo** : es el punto donde se cruzan lo que ya saben de web y una interfaz genuinamente nativa.

<!-- página 11 -->

UNIDAD 1 · PARTE 2
### **Frameworks de desarrollo móvil**

Qué es un framework y cuáles compiten hoy.

<!-- página 12 -->

UNIDAD 1 · PARTE 2 · FRAMEWORKS DE DESARROLLO MÓVIL
##### **Framework y librería**

LIBRERÍA FRAMEWORK

Conjunto de funciones que **vos invocás** cuando las
necesitás.

Flexible: se integra en la estructura que definís.

Ejemplos: lodash, date-fns .

**Controla el flujo y la estructura** de la aplicación.

Trae funcionalidad resuelta **de fábrica** : ruteo,
middlewares, autenticación, manejo de errores.

Trabajás dentro de sus reglas y convenciones.

Ejemplos: NestJS, Next.js, Angular, React Native .

La diferencia se llama **inversión de control** . Proteger una ruta con el guard de NestJS o el middleware de Next.js es una
línea de configuración; con librerías sueltas, ese mismo control lo cableás vos. El framework te da la pieza resuelta a
cambio de que aceptes su forma de hacer las cosas.

<!-- página 13 -->

UNIDAD 1 · PARTE 2 · FRAMEWORKS DE DESARROLLO MÓVIL
##### **Los que compiten hoy**

**React Native + Expo**

JavaScript/TypeScript y React. Componentes que se mapean
a vistas nativas. Expo aporta SDK, CLI y servicios de
compilación y publicación.

**Kotlin Multiplatform**

De JetBrains. Comparte la lógica de negocio entre
plataformas y deja la interfaz nativa en cada una — o la
comparte con Compose Multiplatform. Es la alternativa que
más creció en entornos que ya trabajan en Kotlin.

**Flutter**

De Google, en lenguaje Dart. Dibuja su propia interfaz con el
motor de render, en vez de usar los componentes del sistema.
Compila a código nativo. Muy fuerte en control visual y
animaciones.

**Ionic + Capacitor**

Tecnologías web dentro de una WebView. Se integra con
Angular, Vue o React. Cómodo si el equipo es de web puro,
pero la interfaz no llega a sentirse nativa y el rendimiento
depende de la WebView.

<!-- página 14 -->

UNIDAD 1 · PARTE 2 · FRAMEWORKS DE DESARROLLO MÓVIL
##### **React Native y Expo**

**React Native** es el framework: componentes de React que
se traducen a vistas nativas de iOS y Android desde una
sola base de código.

**Expo** es la plataforma que lo hace usable: un SDK con
acceso al hardware, un CLI, y servicios en la nube para
compilar y publicar sin depender de tener una Mac.

Lo usan Instagram, Discord, Shopify y Coinbase, entre otros.

**A favor**

Rendimiento cercano al nativo.

Recarga instantánea al guardar.

Ecosistema npm y comunidad muy grande.

Reutiliza lo que ya saben de React.

**A tener en cuenta**

App algo más pesada.

Integraciones nativas muy específicas requieren config
plugins.

<!-- página 15 -->

UNIDAD 1 · PARTE 2 · FRAMEWORKS DE DESARROLLO MÓVIL

#### **Hasta dónde llega la materia**

Una idea que rompe el supuesto de que React Native sirve sólo para hacer una app entera.

![Imagen de la página 15](assets/unidad-1-introduccion/p0015-03.png)

<!-- Start of picture text -->
9:41 ▪ ▪ ▮ 9:41 ▪ ▪ ▮<br>CURSADA Pedido 12 min<br>2 entregas<br>Actividad N°1 · vence el viernes 9:41<br>lunes 3 de agostolunes 3 de agosto<br>EN CAMINO<br>Llega en 12 min<br><!-- End of picture text -->

Widget en la pantalla de inicio

Live Activity e isla dinámica

###### expo-widgets

Escribe **widgets de pantalla de inicio y Live Activities** de iOS en TypeScript, con componentes de Expo UI, sin escribir Swift. Sólo iOS, y fuera de Expo Go. Android todavía no.

Un widget no es la app: es un pedazo de la app que vive **afuera** , en la pantalla de inicio o en la bloqueada. Se ve sin abrir nada y el sistema decide cuándo refrescarlo.

Apunta a algo más grande: el límite ya no es «la app» sino **cuánto de la plataforma podés escribir en TypeScript** .

**No la vamos a usar en la materia** ; conviene saber que existe.

<!-- página 16 -->

UNIDAD 1 · PARTE 3
### **Entorno de desarrollo**

De cero a una app corriendo en tu teléfono.

<!-- página 17 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Lo que hace falta para empezar**

**1 · Node.js**

Versión LTS. Trae npm y npx, que es
con lo que vamos a crear y correr el
proyecto.

**2 · Un editor**

VS Code, con las extensiones de ESLint
y Prettier.

**3 · Tu teléfono**

Con la app **Expo Go** instalada desde la
tienda.

**Eso es todo para la primera clase.** No hace falta Android Studio, ni Xcode, ni JDK, ni variables de entorno. Con esas tres
cosas ya podés tener una app corriendo en tu teléfono en cinco minutos.

La instalación completa —JDK, Android Studio, SDK, variables de entorno y emulador— tiene clase propia:

entorno.html de esta misma unidad.

<!-- página 18 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Crear y correr el proyecto**

## Crear el proyecto
npx create-expo-app@latest mi-app

## Entrar y levantar el servidor de desarrollo
cd mi-app
npx expo start

## Escaneás el código QR con la cámara (iOS) o desde Expo Go (Android)
## y la app se abre en tu teléfono

El teléfono y la computadora tienen que estar **en la misma red** . Si la red del aula los aísla, npx expo start --tunnel lo
resuelve.

<!-- página 19 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Expo Go**

Una app que se baja de la tienda y funciona como
**contenedor** : carga tu proyecto sin que tengas que compilar
nada.

Escaneás el QR y ves tu app.

Guardás un archivo y la pantalla se actualiza sola.

Cero configuración nativa.

**Para qué sirve**

Es la manera más rápida de tener algo funcionando y de iterar
mientras se aprenden los fundamentos: componentes, estilos,
navegación, estado.

La propia documentación de Expo lo describe como «un
espacio de juego para estudiantes». Es exactamente nuestro
caso durante las primeras unidades.

<!-- página 20 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Cuándo Expo Go deja de alcanzar**

Expo Go trae compiladas **solo las librerías del SDK** . El día que tu proyecto necesite código nativo que no esté ahí, deja
de poder abrirlo.

**Sigue alcanzando** ✓ **Necesitás un development build** ✗

Componentes, estilos y navegación

Cámara, ubicación, sensores, notificaciones — todo lo del
Expo SDK

Consumo de APIs, almacenamiento local

Una librería con código nativo fuera del SDK

Un config plugin que modifique la configuración nativa

Cambiar permisos, ícono o nombre de la app

Probar la app tal como la va a recibir el usuario

En la práctica: arrancamos con Expo Go y migramos cuando el **trabajo integrador** lo pida. No es un cambio traumático

- es un comando.

<!-- página 21 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **El development build**

Es **tu propia versión de Expo Go** : una compilación de tu app que incluye las herramientas de desarrollo y todas tus
librerías nativas. Se instala una vez y después se sigue trabajando igual que antes.

## 1. Agregar el cliente de desarrollo al proyecto
npx expo install expo-dev-client

## 2. Instalar EAS CLI e iniciar sesión (cuenta gratuita)
npm install --global eas-cli && eas login

## 3. Compilar en los servidores de Expo — no hace falta Mac ni Android Studio
eas build --platform android --profile development

## 4. Instalarlo y seguir trabajando con el mismo comando de siempre
npx expo start

La compilación ocurre **en la nube** . Eso es lo que permite generar la versión de iOS desde Windows o Linux.

<!-- página 22 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO

#### **Tres formas de compilar**

El development build se puede generar en la nube o en tu propia máquina. Cambia qué necesitás tener instalado.

|Forma|Necesita|Cuándo conviene|
|---|---|---|
|**En la nube**<br>eas build|Nada local. Sólo cuenta de<br>Expo.|Por defecto. Única opción para iOS si no tenés Mac.|
|**Local con EAS**<br>eas build--<br>local|Herramientas nativas<br>instaladas.|Mismo resultado que la nube, sin usar el cupo de la cuenta.|
|**Local sin EAS**<br>npx expo run:|Android Studio, o Xcode en<br>macOS.|Iteración rápida sobre código nativo. Sin depender de internet ni<br>de cuenta.|
|El plan gratuito d<br>camino local.|e EAS tiene**cupo mensual de com**|**pilaciones**. Con un curso entero compilando, conviene conocer el|

<!-- página 23 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Compilar en tu máquina**

## Compila el código nativo, instala la app y levanta Metro
npx expo run:android

## En macOS, para iOS
npx expo run:ios

## Elegir a qué dispositivo  - emulador va

npx expo run:android --device

El comando ejecuta primero npx expo prebuild, que genera las carpetas android/ e ios/ a partir de tu app.json .
Después compila e instala.

<u>Comando</u> <u>Cuándo</u>

npx expo run:android <u>Primera vez, al agregar una librería nativa o al cambiar un config plugin</u>

npx expo start Día a día, mientras sólo cambies JavaScript o TypeScript

Compilás una vez y seguís con npx expo start : Metro sirve el código nuevo **sin recompilar**, y la app carga en
segundos en vez de minutos.

<!-- página 24 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Debug y release un adelanto**

Todo lo anterior genera builds de **debug** . Existe otra variante, que es la que llega al usuario.

DEBUG RELEASE

El JavaScript lo sirve Metro desde tu computadora.

Recarga al guardar y herramientas de desarrollo.

Código sin optimizar.

npx expo run:android --variant release
npx expo run:ios --configuration Release

El JavaScript va **empaquetado dentro de la app** : no
necesita Metro.

Minificado y compilado a bytecode de Hermes.

Sin herramientas de desarrollo.

Estas builds locales **no están firmadas** : sirven para probar, no para publicar. La firma y el envío a las tiendas se ven en la
**Unidad 7** .

<!-- página 25 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Emulador y simulador opcional**

Hacen falta para **dos** cosas: correr un emulador en la computadora, y compilar localmente con npx expo run: . Para
trabajar con Expo Go o compilar en la nube, no.

**Android Studio**

Trae el SDK de Android y el Device Manager. Necesita además
el **JDK 17** y la variable ANDROID_HOME .

**Xcode**

Sólo en macOS. Trae el simulador de iOS. Quien no tenga Mac
compila en la nube con EAS y prueba en un iPhone real.

La instalación paso a paso de todo esto es una clase aparte: entorno.html de esta unidad. Acá alcanza con saber
cuándo hace falta.

**Probar en un teléfono real es preferible al emulador:** ves los tiempos, los gestos y los tamaños como los va a ver el
usuario.

<!-- página 26 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Si algo no arranca**

**Diagnóstico**

npx expo-doctor

Revisa versiones, dependencias incompatibles y problemas de
configuración.

**Instalar paquetes**

npx expo install <paquete>

Siempre así, **nunca** npm install para paquetes de Expo:
elige la versión compatible con tu SDK.

Instalar con npm install un paquete de Expo es la causa número uno de proyectos rotos en los trabajos prácticos.

<!-- página 27 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
##### **Agentes de IA en el entorno**

Van a usarlos igual, así que conviene hablarlo el primer día: qué agregan, dónde fallan y qué se espera de ustedes en
esta materia.

**Lo que Expo ofrece**

**Expo MCP Server** - le da al agente acceso a la
documentación actual, a npx expo install con la versión
compatible, y al estado de tus builds de EAS.

claude mcp add --transport http expo https://mcp.expo.dev/mcp

**Expo Skills** - instrucciones que le enseñan al agente cómo se
hacen las cosas en Expo.

**Por qué importa acá**

El modelo fue entrenado con material viejo: sin la
documentación en vivo te va a proponer expo-av, la API vieja
de expo-file-system y el modelo del puente — **todo lo que**
**en esta materia damos como retirado** .
Es el mismo problema que tienen ustedes al googlear, con la
diferencia de que el agente lo escribe con seguridad.

**Regla de la cátedra:** se puede usar. Lo que se evalúa es que **puedan explicar cada línea** del código que entregan. En el
parcial y en la defensa del integrador no hay agente.

<!-- página 28 -->

UNIDAD 1
#### **Lo que sigue**

**Git:** deck complementario de esta misma unidad — control de versiones y trabajo en equipo.

Práctica: crear el proyecto y subirlo al repositorio del grupo.

**Unidad 2:** TypeScript y React, cómo funciona React Native por dentro, y Expo en profundidad.

Documentación: docs.expo.dev - git-scm.com/doc
