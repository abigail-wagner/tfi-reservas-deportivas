# Desarrollo para Móviles — Contenido completo

> **21 documentos · 593 páginas · 50.419 palabras · 100 imágenes**
>
> Conversión de los 21 PDFs originales a Markdown. Generado el 2026-10-27.
> Los PDFs originales se eliminaron; las imágenes están en `assets/` y cada página conserva su marca `<!-- página N -->`.

## Índice


### Unidad 1 — Introducción y entorno

- [01. Unidad 1 — Introducción · Desarrollo para Móviles](#doc-01)
- [02. Unidad 1 — Entorno de desarrollo · Desarrollo para Móviles](#doc-02)
- [03. Git — Control de versiones · Desarrollo para Móviles](#doc-03)
- [04. P01 - Instalación Entorno de Desarrollo](#doc-04)

### Unidad 2 — TypeScript, React Native y calidad

- [05. Unidad 2 — React Native y Expo · Desarrollo para Móviles](#doc-05)
- [06. Unidad 2 — TypeScript, React y ciclo de vida · Desarrollo para Móviles](#doc-06)
- [07. Unidad 2 — Testing · Desarrollo para Móviles](#doc-07)
- [08. Unidad 2 — Depuración y rendimiento · Desarrollo para Móviles](#doc-08)

### Unidad 3 — Navegación e interfaz

- [09. Navegación — Expo Router · Desarrollo para Móviles](#doc-09)
- [10. Unidad 3 — Interfaz y navegación · Desarrollo para Móviles](#doc-10)

### Unidad 4 — APIs del dispositivo

- [11. Unidad 4 — Librerías, plugins y permisos · Desarrollo para Móviles](#doc-11)
- [12. Unidad 4 — APIs del dispositivo · Desarrollo para Móviles](#doc-12)
- [13. Unidad 4 — Notificaciones · Desarrollo para Móviles](#doc-13)

### Unidad 5 — Redes, persistencia y estado

- [14. Unidad 5 — Redes · Desarrollo para Móviles](#doc-14)
- [15. Unidad 5 — Persistencia y estado · Desarrollo para Móviles](#doc-15)

### Unidad 6 — Computación ubicua y seguridad

- [16. Unidad 6 — Computación ubicua e IoT · Desarrollo para Móviles](#doc-16)
- [17. Unidad 6 — Seguridad · Desarrollo para Móviles](#doc-17)

### Unidad 7 — Construcción y publicación

- [18. Unidad 7 — Construir la aplicación · Desarrollo para Móviles](#doc-18)
- [19. Unidad 7 — Publicar y actualizar · Desarrollo para Móviles](#doc-19)

### Trabajo final integrador

- [20. Reservas Deportivas - Villaguay](#doc-20)
- [21. TRABAJO FINAL INTEGRADOR](#doc-21)

---

<a id="doc-01"></a>

## 01. Unidad 1 — Introducción · Desarrollo para Móviles

> **Fuente:** `Unidad 1 — Introducción · Desarrollo para Móviles.pdf` · **Páginas:** 28 · **Palabras:** 2.776 · **Imágenes:** 1

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S ITA R I A E N D E S A R R O L LO W E B · F C A D · U N E R
### **Unidad 1** **Introducción**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 1
###### **Qué vamos a ver**

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
###### **¿Qué es una app?**
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
#### **Enfoques de desarrollo móvil**

Nativas, híbridas y web. Qué gana y qué resigna cada una.

<!-- página 5 -->

UNIDAD 1 · PARTE 1 · ENFOQUES DE DESARROLLO MÓVIL
###### **Los tres enfoques**

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
###### **Nativas**

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
###### **Híbridas y multiplataforma**

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
###### **Híbridas: resumen**

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
###### **Web y PWA**

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
#### **Frameworks de desarrollo móvil**

Qué es un framework y cuáles compiten hoy.

<!-- página 12 -->

UNIDAD 1 · PARTE 2 · FRAMEWORKS DE DESARROLLO MÓVIL
###### **Framework y librería**

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
###### **Los que compiten hoy**

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
###### **React Native y Expo**

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

##### **Hasta dónde llega la materia**

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
#### **Entorno de desarrollo**

De cero a una app corriendo en tu teléfono.

<!-- página 17 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
###### **Lo que hace falta para empezar**

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
###### **Crear y correr el proyecto**

### Crear el proyecto
npx create-expo-app@latest mi-app

### Entrar y levantar el servidor de desarrollo
cd mi-app
npx expo start

### Escaneás el código QR con la cámara (iOS) o desde Expo Go (Android)
### y la app se abre en tu teléfono

El teléfono y la computadora tienen que estar **en la misma red** . Si la red del aula los aísla, npx expo start --tunnel lo
resuelve.

<!-- página 19 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
###### **Expo Go**

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
###### **Cuándo Expo Go deja de alcanzar**

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
###### **El development build**

Es **tu propia versión de Expo Go** : una compilación de tu app que incluye las herramientas de desarrollo y todas tus
librerías nativas. Se instala una vez y después se sigue trabajando igual que antes.

### 1. Agregar el cliente de desarrollo al proyecto
npx expo install expo-dev-client

### 2. Instalar EAS CLI e iniciar sesión (cuenta gratuita)
npm install --global eas-cli && eas login

### 3. Compilar en los servidores de Expo — no hace falta Mac ni Android Studio
eas build --platform android --profile development

### 4. Instalarlo y seguir trabajando con el mismo comando de siempre
npx expo start

La compilación ocurre **en la nube** . Eso es lo que permite generar la versión de iOS desde Windows o Linux.

<!-- página 22 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO

##### **Tres formas de compilar**

El development build se puede generar en la nube o en tu propia máquina. Cambia qué necesitás tener instalado.

|Forma|Necesita|Cuándo conviene|
|---|---|---|
|**En la nube**<br>eas build|Nada local. Sólo cuenta de<br>Expo.|Por defecto. Única opción para iOS si no tenés Mac.|
|**Local con EAS**<br>eas build--<br>local|Herramientas nativas<br>instaladas.|Mismo resultado que la nube, sin usar el cupo de la cuenta.|
|**Local sin EAS**<br>npx expo run:|Android Studio, o Xcode en<br>macOS.|Iteración rápida sobre código nativo. Sin depender de internet ni<br>de cuenta.|
|El plan gratuito d<br>camino local.|e EAS tiene**cupo mensual de com**|**pilaciones**. Con un curso entero compilando, conviene conocer el|

<!-- página 23 -->

UNIDAD 1 · PARTE 3 · ENTORNO DE DESARROLLO
###### **Compilar en tu máquina**

### Compila el código nativo, instala la app y levanta Metro
npx expo run:android

### En macOS, para iOS
npx expo run:ios

### Elegir a qué dispositivo  - emulador va

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
###### **Debug y release un adelanto**

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
###### **Emulador y simulador opcional**

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
###### **Si algo no arranca**

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
###### **Agentes de IA en el entorno**

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
##### **Lo que sigue**

**Git:** deck complementario de esta misma unidad — control de versiones y trabajo en equipo.

Práctica: crear el proyecto y subirlo al repositorio del grupo.

**Unidad 2:** TypeScript y React, cómo funciona React Native por dentro, y Expo en profundidad.

Documentación: docs.expo.dev - git-scm.com/doc

---

<a id="doc-02"></a>

## 02. Unidad 1 — Entorno de desarrollo · Desarrollo para Móviles

> **Fuente:** `U01 - Entorno de desarrollo.pdf` · **Páginas:** 26 · **Palabras:** 2.135 · **Imágenes:** 1

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 1** **Entorno de desarrollo**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · JDK 17

<!-- página 2 -->

UNIDAD 1
###### **De qué se trata esta clase**

**Al terminar tenés** **Lo que NO entra**

Node y un editor funcionando.

El SDK de Android instalado y en el `PATH` .

Un emulador o tu celular listo para recibir la app.

Crear el proyecto.

Correr la app.

Eso es la clase siguiente. Hoy dejamos la máquina lista.

Es la clase menos vistosa de la materia y la que más tiempo ahorra después: casi todos los problemas de las primeras
semanas se originan acá.

<!-- página 3 -->

UNIDAD 1
###### **El mapa: qué instala qué**

**Node.js**

Corre las herramientas de

JavaScript: `npm`, `npx`, el bundler.

**JDK 17**

Lo necesita Gradle, que es quien

compila la parte Android.

**Android Studio**

En realidad lo que nos interesa es

lo que trae: el SDK de Android y el
emulador.

**Variables de entorno**

Le dicen a las herramientas dónde

quedó instalado todo lo anterior.

Ninguna de las cuatro es de React Native. Son las herramientas **de la plataforma Android**, las mismas que usa
alguien que programa en Kotlin. React Native se apoya arriba.

<!-- página 4 -->

UNIDAD 1 · PARTE 1
#### **Las herramientas base**

Node, el editor y el control de versiones.

<!-- página 5 -->

UNIDAD 1 · PARTE 1 · LAS HERRAMIENTAS BASE
###### **Node.js**

**Qué versión**
**22.11.0 o superior**  - es lo que pide React Native 0.86. La
LTS actual cumple.

Descarga desde `nodejs.org` . En macOS y Linux conviene
un gestor de versiones ( `nvm`, `fnm` ) en lugar del instalador.

**Verificar**

```
node -v
# v22.11.0  (o mayor)

npm -v

```

Si `node -v` no responde después de instalar, cerrá la terminal y abrila de nuevo. El `PATH` se lee al abrir la terminal, no
se actualiza sola. Es el primer tropiezo de la clase, y va a repetirse tres veces más hoy.

<!-- página 6 -->

UNIDAD 1 · PARTE 1 · LAS HERRAMIENTAS BASE
###### **El editor**

**Visual Studio Code**
Es el que vamos a usar en clase. Gratis, multiplataforma, y
con soporte de TypeScript incorporado.

Alternativas válidas: WebStorm, Zed, Neovim. Si ya tenés uno
y lo manejás, quedate con ese.

**Extensiones que conviene tener**

**ESLint**  - marca los errores de reglas de hooks mientras
escribís.

**Prettier**  - formatea al guardar.

**Expo Tools**  - autocompletado de `app.json` .

**Git** también va en esta lista, pero tiene su propia clase: lo vemos en `git.html` de esta misma unidad.

<!-- página 7 -->

UNIDAD 1 · PARTE 1 · LAS HERRAMIENTAS BASE **Sólo en macOS: Watchman**

```
brew install watchman
```

Vigila los cambios en los archivos del proyecto para recargar la app. En macOS el límite de archivos abiertos del sistema es bajo y sin Watchman el bundler falla en proyectos grandes. En Windows no hace falta.

<!-- página 8 -->

UNIDAD 1 · PARTE 2
#### **El SDK de Android**

JDK, Android Studio y las variables que los conectan.

<!-- página 9 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID
###### **Por qué hace falta el JDK**
El código Java no aparece por ningún lado en la materia. Pero la parte Android de la app se compila con Gradle, y Gradle corre sobre Java.

**JVM**

La máquina virtual donde corre Gradle.

```
javac
```

Compila a bytecode el código Java que generan
las librerías nativas.

**Herramientas**

`keytool`, que en la Unidad 7 usamos para firmar
la app.

Va **JDK 17** . Con versiones más nuevas el Gradle del proyecto puede no reconocerlas y el build falla con un error que
no dice qué pasó. Es una de las pocas veces en la materia en que conviene no usar la última versión.

<!-- página 10 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID
###### **Instalar el JDK**

MACOS

```
brew install --cask zulu@17

# despues, en ~/.zshrc
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

```

Zulu trae versiones para Intel y para Apple Silicon: en
una Mac M1 o posterior conviene, porque compila más
rápido.

WINDOWS Y LINUX

```
# Windows: instalador de
# Microsoft Build of OpenJDK 17
# o Azul Zulu 17

# Linux
sudo apt install openjdk-17-jdk

```

En Windows, `JAVA_HOME` se define en «Variables de
entorno» del panel de control, apuntando a la carpeta
del JDK (no a su `bin` ).

<!-- página 11 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID
###### **Android Studio: qué instala en realidad**

Es un IDE de 4 GB que no vamos a usar para programar. Lo instalamos por tres componentes que vienen adentro, y
que hay que **tildar en el asistente** :

**Android SDK**

Las herramientas de línea de comandos: `adb`,

`sdkmanager`, `emulator` .

**Android SDK Platform**

Las APIs de una versión concreta de Android,
contra las que se compila.

**Android Virtual Device**

El emulador y sus imágenes de sistema.

Si alguna casilla aparece gris, seguí adelante: se instalan después desde el **SDK Manager**, que es la próxima slide.

<!-- página 12 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID
###### **SDK Manager**

Dentro de Android Studio: More Actions → SDK Manager, o Settings → Languages & Frameworks → Android SDK. Hay
que tildar **Show Package Details** en las dos pestañas.

**Pestaña SDK Platforms** **Pestaña SDK Tools**

La plataforma que corresponda al SDK de Expo del curso

- para SDK 57, **Android 16 (API 36)** .

Una **imagen de sistema** para el emulador: Google APIs,
en la arquitectura de tu máquina.

**Android SDK Build-Tools**

**Android SDK Command-line Tools (latest)**

**Android SDK Platform-Tools** - trae `adb` .

Son varios GB de descarga. Si la conexión del aula no da, conviene tenerlo hecho de antes.

<!-- página 13 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID **Las piezas, una por una**

|**Pieza**|**Paraqué sirve**|
|---|---|
|`adb`|Habla con el celular o el emulador: instala APKs, pasa archivos, muestra los logs. Es el que te<br>dice si el dispositivo está conectado.|
|`platform-tools`|La carpeta donde vive<br>`adb`. Va en el<br>`PATH`.|
|`build-tools`|Empaqueta,alineayfirma el APK o el AAB.|
|`emulator`|Arranca los dispositivos virtuales. También va en el<br>`PATH`.|
|Gradle|Orquesta todo lo anterior. No se instala aparte: viene con el proyecto.|

<!-- página 14 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID
###### **Variables de entorno**

**LA CORRECTA**
```
ANDROID_HOME 
```

Apunta a la carpeta raíz del SDK de Android. Es la que leen
todas las herramientas.

**DEPRECADA**
```
ANDROID_SDK_ROOT 
```

Apuntaba a lo mismo. Google la dio de baja: si la dejás
definida, Android Studio y Gradle verifican que coincida con

`ANDROID_HOME` y se quejan si no.

Material anterior a 2024 —incluido el nuestro— decía lo contrario, que había que migrar de `ANDROID_HOME` a

`ANDROID_SDK_ROOT` . Es al revés.

<!-- página 15 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID
###### **Definirlas**

MACOS · LINUX

```
# en ~/.zshrc o ~/.bashrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

source ~/.zshrc

```

En Linux el SDK queda en `$HOME/Android/Sdk` .

WINDOWS

```
ANDROID_HOME = %LOCALAPPDATA%\Android\Sdk

# y agregar al Path:
%LOCALAPPDATA%\Android\Sdk\platform-tools
%LOCALAPPDATA%\Android\Sdk\emulator

```

Panel de control → Cuentas de usuario → Cambiar mis
variables de entorno.

La ruta real del SDK está en Android Studio, en Settings → Languages & Frameworks → Android SDK. Copiala de ahí
en vez de escribirla de memoria.

<!-- página 16 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID **Verificar que quedó bien**

```
java -version        # openjdk version "17.x.x"
echo $ANDROID_HOME    # la ruta del SDK, no vacio
adb --version        # Android Debug Bridge version 1.0.xx
emulator -list-avds  # lista (puede estar vacia todavia)
```

Si alguno falla, el problema casi siempre es uno de dos: **terminal sin reabrir** después de tocar las variables, o la ruta del SDK mal escrita. En Windows, `echo %ANDROID_HOME%` .

<!-- página 17 -->

UNIDAD 1 · PARTE 3
#### **Dónde va a correr la app**

Emulador, celular propio, y qué pasa con iOS.

<!-- página 18 -->

UNIDAD 1 · PARTE 3 · DÓNDE VA A CORRER LA APP **Crear un emulador**

###### **Pasos**

1. Android Studio → Device Manager.

2. Create Virtual Device y elegir un teléfono — Pixel 8 anda bien.

3. Elegir la imagen de sistema descargada antes (API 36).

4. Finish, y arrancarlo con el triángulo verde.

Cada emulador ocupa varios GB en disco. Con uno alcanza.

![Imagen de la página 18](assets/u01-entorno-de-desarrollo/p0018-07.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>Pixel 8 · API 36<br><!-- End of picture text -->

Un AVD es un teléfono virtual completo

<!-- página 19 -->

UNIDAD 1 · PARTE 3 · DÓNDE VA A CORRER LA APP
###### **Aceleración por hardware**

Sin ella el emulador es inusable. Cada sistema la resuelve distinto, y en Windows esto cambió hace poco.

**Windows**

**Windows Hypervisor Platform (WHPX)** . Se
activa en «Características de Windows» y pide
reiniciar. Sirve para Intel y AMD.

**macOS**

Virtualización nativa de Apple
( `Hypervisor.framework` ). No hay que instalar
nada, en Intel y en Apple Silicon.

**Linux**

**KVM** . Hay que agregar el usuario al grupo `kvm` .

**No instales Intel HAXM.** Quedó atrás, y el driver alternativo de Google (Android Emulator hypervisor driver, AEHD) **se**
**discontinúa el 31-12-2026** : los que lo usen tienen que pasarse a WHPX. Material y tutoriales viejos todavía lo
recomiendan.

<!-- página 20 -->

UNIDAD 1 · PARTE 3 · DÓNDE VA A CORRER LA APP
###### **Tu propio celular**

**Habilitar la depuración USB**
1. Ajustes → Información del teléfono.
2. Apretar **siete veces** sobre «Número de compilación».
3. Aparece Opciones para desarrolladores: activar
**Depuración por USB** .
4. Conectar por cable y aceptar el diálogo de confianza.

**Comprobar**

```
adb devices

# List of devices attached
# R58M20ABCDE   device

```

Si dice `unauthorized`, falta aceptar el diálogo en el teléfono.
Si no aparece, probá otro cable: muchos cables son sólo de
carga.

Un teléfono real es mejor que el emulador para desarrollar: ves los tiempos, los gestos y los tamaños como los va a
ver el usuario. Y no consume la RAM de tu máquina.

<!-- página 21 -->

UNIDAD 1 · PARTE 3 · DÓNDE VA A CORRER LA APP
###### **Expo Go**

**Qué es**
Una app que se baja de la tienda y que actúa de contenedor:
adentro corre tu proyecto sin necesidad de compilar nada.

Es el camino de las primeras clases. La documentación de
Expo la define como entorno para estudiantes y para probar
rápido.

**Instalarla**

**Android:** «Expo Go» en Google Play.

**iOS:** «Expo Go» en la App Store.

El celular y la computadora tienen que estar en la **misma red** .

Con Expo Go instalada, nada de la Parte 2 hace falta para empezar. El SDK de Android se vuelve necesario recién
cuando el proyecto usa una librería que Expo Go no trae — eso lo vemos en la clase siguiente.

<!-- página 22 -->

UNIDAD 1 · PARTE 3 · DÓNDE VA A CORRER LA APP
###### **iOS y la Mac**

**Con Mac**
Xcode desde la App Store. Trae el simulador de iOS y las
herramientas de compilación. Después hay que instalar las
Command Line Tools desde Xcode → Settings → Locations.

**Sin Mac**
No quedás afuera de nada. Se prueba con Expo Go en un
iPhone real, y se compila en la nube con **EAS Build**, que
corre sobre máquinas macOS de Expo.

Lo vemos en la Unidad 7.

Compilar para iOS exige macOS: es una restricción de Apple, no de React Native ni de Expo. La nube existe
justamente para eso.

<!-- página 23 -->

UNIDAD 1 · PARTE 4
#### **Control final**

Cómo saber que quedó bien, y qué mirar cuando no.

<!-- página 24 -->

###### UNIDAD 1 · PARTE 4 · CONTROL FINAL **Checklist**

|**Comando**<br>**Qué tieneque responder**|
|---|
|`node -v`<br>`v22.11.0`o mayor|
|`npm -v`<br>un número de versión|
|`git --version`<br>un número de versión|
|`java -version`<br>`openjdk version "17…"`|
|`echo $ANDROID_HOME`<br>la ruta del SDK|
|`adb --version`<br>`Android Debug Bridge…`|
|`adb devices`<br>tu celular o el emulador, como<br>`device`|
|Los siete en verde = entorno listo. La clase que viene creamos el proyecto.|

<!-- página 25 -->

UNIDAD 1 · PARTE 4 · CONTROL FINAL
###### **Los problemas de siempre**

**«No se reconoce el comando»**

La terminal se abrió antes de tocar el `PATH` . Cerrala y abrila de nuevo. En VS
Code, la terminal integrada también.

**«SDK location not found»**

`ANDROID_HOME` mal escrito o apuntando a una carpeta que no existe. Copiá
la ruta desde Android Studio.

**El emulador no arranca**

Virtualización deshabilitada en la BIOS. Hay que entrar a la BIOS y activarla;
desde el sistema operativo no se puede.

**El celular no aparece en** **`adb`**

Falta aceptar el diálogo de depuración, o el cable es sólo de carga.

<!-- página 26 -->

UNIDAD 1
##### **Lo que sigue**

Crear el proyecto y correrlo: **deck principal de la Unidad 1**, Parte 3.

Cuándo Expo Go deja de alcanzar y aparece el development build: misma parte.

Firmar y publicar, con `keytool` y EAS: **Unidad 7** .

Documentación: `docs.expo.dev/get-started/set-up-your-environment`
```
developer.android.com/tools/variables

```

---

<a id="doc-03"></a>

## 03. Git — Control de versiones · Desarrollo para Móviles

> **Fuente:** `U01 - Git - Control de versiones.pdf` · **Páginas:** 30 · **Palabras:** 2.815 · **Imágenes:** 13

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Git** **Control de versiones**

Unidad 1 · Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

<!-- página 2 -->

UNIDAD 1 · GIT · PARTE 1
#### **Qué es y de dónde viene**

Por qué existe el control de versiones y cómo llegamos a Git.

<!-- página 3 -->

UNIDAD 1 · GIT · PARTE 1 · QUÉ ES Y DE DÓNDE VIENE
###### **Por qué control de versiones**

Trabajando en equipo, dos personas tocan lo mismo y al integrar aparecen los conflictos. El control de versiones
resuelve eso y además aporta:

**Historial**
Qué cambió, cuándo y por qué. Y la
posibilidad de volver atrás.

**Trabajo en paralelo**
Cada uno en su rama, integrando
cuando está listo.

**Trazabilidad**
Cada cambio con un mensaje que
explica qué se hizo.

**Git es distribuido:** cada persona tiene una copia completa del repositorio, no sólo la porción que está editando. Por
eso las operaciones son rápidas y se puede trabajar sin conexión.

<!-- página 4 -->

UNIDAD 1 · GIT · PARTE 1 · QUÉ ES Y DE DÓNDE VIENE
###### **De dónde viene Git**

Medio siglo de intentos, y en cada salto el problema fue el mismo: **cuánta gente puede trabajar a la vez sin pisarse** .

**1972 · SCCS**
El primero, en Bell Labs. Un archivo por
vez y sin red.

**1990 · CVS**
Servidor central: varias personas sobre
un repositorio.

**2000 · Subversion**
El commit pasa a ser atómico. Sigue
siendo centralizado.

**2005 · Git**
Cada copia es el repositorio entero.
Ramificar sale gratis.

**Centralizados**
**Subversion** y **Perforce** . Sin servidor
no hay historial. Perforce sigue fuerte
en videojuegos, donde el repositorio
son gigabytes de arte, no de texto.

**HOY**
**Distribuidos**

**Git**, y muy por detrás **Mercurial** y
**Fossil** . Casi el 94% de las personas
que programan usa Git (Stack
Overflow, 2025).

**Encima de Git**
**Sapling** (Meta) y **Jujutsu** trabajan
contra repositorios de Git: cambian la
interfaz, no el formato. Vale conocerlos;
no hace falta usarlos.

Los conceptos —commit, rama, merge, conflicto— son de **todos** estos sistemas, no de Git. Lo que cambia de uno a
otro son los comandos.

<!-- página 5 -->

UNIDAD 1 · GIT · PARTE 2
#### **El trabajo de todos los días**

Configurar, commitear y leer el historial. El 90% de lo que van a usar.

<!-- página 6 -->

UNIDAD 1 · GIT · PARTE 2 · EL TRABAJO DE TODOS LOS DÍAS **Configuración inicial**

- `# Descargar desde git-scm.com y seguir el instalador`

```
# Identidad: aparece en cada commit que hagas
git config --global user.name "Nombre Apellido"
git config --global user.email "correo@ejemplo.com"
```

- `# Rama principal por defecto git config --global init.defaultBranch main`

Se configura **una sola vez por computadora** . Si el correo no coincide con el de GitHub, los commits no se asocian a tu cuenta.

<!-- página 7 -->

UNIDAD 1 · GIT · PARTE 2 · EL TRABAJO DE TODOS LOS DÍAS **El ciclo básico**

**Working tree git add Stage git commit Repositorio** tus archivos → preparado → historial

```
git init                    # inicializar el repositorio
git status                  # ver en qué estado está cada archivo
git add .                   # preparar los cambios
git commit -m "Agrega pantalla de login"
git log --oneline           # ver el historial
```

<!-- página 8 -->

UNIDAD 1 · GIT · PARTE 2 · EL TRABAJO DE TODOS LOS DÍAS
###### **Leer el historial**

```
# El historial en una línea por commit, con el dibujo de las ramas
git log --oneline --graph --all

# Qué cambié y todavía no preparé
git diff

# Qué hizo un commit puntual
git show a1b2c3d

# Quién tocó cada línea de un archivo
git blame App.tsx

```

`--oneline --graph --all` es el comando que más van a usar: muestra de un vistazo **en qué rama está cada cosa** y
dónde se separaron.

<!-- página 9 -->

UNIDAD 1 · GIT · PARTE 2 · EL TRABAJO DE TODOS LOS DÍAS
###### **Mensajes de commit**

EVITAR PREFERIR

```
cambios

arreglo

asdasd

final final v2

```

```
Agrega validación de email en el registro

Corrige el cálculo del total con descuento

Reemplaza AsyncStorage por kv-store

```

En presente, describiendo **qué hace el cambio**, no qué archivos tocaste. El diff ya muestra los archivos; lo que no
muestra es la intención.

<!-- página 10 -->

UNIDAD 1 · GIT · PARTE 3
#### **Ramas, merges y conflictos**

Cómo trabajan dos personas sobre el mismo proyecto sin pisarse.

<!-- página 11 -->

UNIDAD 1 · GIT · PARTE 3 · RAMAS, MERGES Y CONFLICTOS **Ramas**

![Imagen de la página 11](assets/u01-git-control-de-versiones/p0011-01.png)

![Imagen de la página 11](assets/u01-git-control-de-versiones/p0011-02.png)

<!-- Start of picture text -->
nueva-funcionalidad<br>main<br><!-- End of picture text -->

Una rama no copia nada: es un puntero a un commit. Por eso crearla es instantáneo.

**Nueva funcionalidad:** se desarrolla aislada y se integra cuando anda.

`# Crear una rama y moverse a ella` cuando anda. `git switch -c nueva-funcionalidad # Volver a la principal` **Corrección de errores:** se aísla el problema sin tocar la `git switch main` rama principal.

- `# Integrar la rama en main git merge nueva-funcionalidad`

**Experimentación:** si funciona se integra, si no se descarta.

En el trabajo integrador cada integrante trabaja en su rama y se integra a `main` . Es la forma de que dos personas editen el proyecto sin pisarse.

<!-- página 12 -->

UNIDAD 1 · GIT · PARTE 3 · RAMAS, MERGES Y CONFLICTOS **Cómo integra Git**

###### **Fast-forward**

La rama principal no avanzó desde que te separaste. Git sólo mueve el puntero hacia adelante: no hay nada que resolver.

###### **Three-way merge**

Las dos ramas avanzaron. Git compara tres puntos: el ancestro común, la punta de tu rama y la punta de la otra.

![Imagen de la página 12](assets/u01-git-control-de-versiones/p0012-05.png)

<!-- Start of picture text -->
main antes main<br><!-- End of picture text -->

No se crea ningún commit.

![Imagen de la página 12](assets/u01-git-control-de-versiones/p0012-07.png)

<!-- Start of picture text -->
main<br><!-- End of picture text -->

Aparece un commit de merge, con dos padres.

Si los cambios están en archivos distintos —o en partes distintas del mismo archivo— Git los integra solo. **El conflicto aparece únicamente cuando dos ramas tocaron las mismas líneas.**

<!-- página 13 -->

UNIDAD 1 · GIT · PARTE 3 · RAMAS, MERGES Y CONFLICTOS
###### **Conflictos**

Git marca las dos versiones dentro del archivo y deja que decidas vos.

```
<<<<<<< HEAD
const titulo = 'Iniciar sesión';
=======
const titulo = 'Ingresar';
>>>>>>> nueva-funcionalidad

```

**1**

Editás el archivo y dejás la versión que
corresponde.

**2**

Borrás las tres marcas `<<<`, `===`, `>>>` .

**3**

`git add` y `git commit` .

No hay magia: **el conflicto lo resuelve una persona, no la herramienta.** Git sólo señala dónde está.

<!-- página 14 -->

UNIDAD 1 · GIT · PARTE 4
#### **Deshacer**

Qué hacer cuando algo salió mal, y qué no hacer nunca.

<!-- página 15 -->

UNIDAD 1 · GIT · PARTE 4 · DESHACER
###### **Deshacer antes del commit**

**Descartar cambios**

```
git restore archivo.tsx      # descarta en working tree
git restore --staged archivo # saca del stage

```

**Guardar para después**

```
git stash -u                 # guarda y limpia
git stash pop                # los recupera

```

Sirve para cambiar de rama con trabajo a medio hacer. El `-u`
incluye los archivos nuevos.

`git restore` **no tiene vuelta atrás** : los cambios descartados no estaban en ningún commit, así que Git no los tiene
guardados en ninguna parte.

<!-- página 16 -->

UNIDAD 1 · GIT · PARTE 4 · DESHACER
###### **Deshacer después del commit**

```
# Corregir el último commit: mensaje o archivos olvidados
git commit --amend

# Deshacer un commit creando otro que lo revierte
git revert a1b2c3d

# Mover la rama hacia atrás — reescribe el historial
git reset --hard a1b2c3d

```

REVERT — SEGURO RESET --HARD — PELIGROSO

Agrega un commit nuevo que deshace el anterior.

El historial queda intacto.

Es lo que se usa cuando ya hiciste `push` .

Borra commits del historial local.

Si ya los subiste, rompe el repositorio de tus
compañeros.

**Regla:** nunca reescribas historial que ya subiste y que otro pudo haber descargado. Con `amend` pasa lo mismo —
sólo antes del `push` .

<!-- página 17 -->

UNIDAD 1 · GIT · PARTE 4 · DESHACER

###### **Las tres formas, dibujadas**

La diferencia no está en el comando sino en **qué le pasa al historial** .

![Imagen de la página 17](assets/u01-git-control-de-versiones/p0017-03.png)

<!-- Start of picture text -->
git revert<br><!-- End of picture text -->

![Imagen de la página 17](assets/u01-git-control-de-versiones/p0017-04.png)

<!-- Start of picture text -->
main<br>el error<br><!-- End of picture text -->

El commit con el error **sigue ahí** . Se agrega uno nuevo que lo deshace.

![Imagen de la página 17](assets/u01-git-control-de-versiones/p0017-06.png)

<!-- Start of picture text -->
git reset --hard<br><!-- End of picture text -->

![Imagen de la página 17](assets/u01-git-control-de-versiones/p0017-07.png)

<!-- Start of picture text -->
main<br>descartados<br><!-- End of picture text -->

La rama vuelve atrás y los dos commits **dejan de aparecer** en el historial.

```
git reflog
```

![Imagen de la página 17](assets/u01-git-control-de-versiones/p0017-10.png)

<!-- Start of picture text -->
main<br><!-- End of picture text -->

![Imagen de la página 17](assets/u01-git-control-de-versiones/p0017-11.png)

Git se acordaba de dónde había estado la rama, así que los commits **vuelven** .

Fijate que en los tres casos **los commits nunca se borran del disco** : lo que se mueve es el puntero de la rama. Eso es lo que hace que el reflog pueda rescatarlos.

<!-- página 18 -->

UNIDAD 1 · GIT · PARTE 4 · DESHACER
###### **Cuando algo sale mal**

Git guarda cada movimiento de las ramas, aunque el commit ya no aparezca en el historial. **Casi nada se pierde de**
**verdad.**

```
# Todo lo que hiciste, incluso lo que "borraste"
git reflog

# Volver a ese punto
git reset --hard HEAD@{3}

```

**Commiteé en la rama equivocada**

`git reset --soft HEAD~1`, cambiás de rama y
volvés a commitear.

**Subí un archivo que no debía**

Agregalo al `.gitignore` y `git rm --cached`

`archivo` .

**Subí una clave**

El único arreglo real es **rotar la clave** . Borrarla en
otro commit no la saca del historial.

<!-- página 19 -->

UNIDAD 1 · GIT · PARTE 5
#### **El repositorio remoto**

Compartir el proyecto con el equipo. Qué es un remoto y qué no lo es.

<!-- página 20 -->

UNIDAD 1 · GIT · PARTE 5 · EL REPOSITORIO REMOTO **Trabajar con un repositorio remoto**

Hasta acá todo fue local. Para que el equipo comparta el código hace falta un **remoto** : una copia en un servidor — GitHub, GitLab.

- `# Traer un repositorio que ya existe git clone https://github.com/usuario/proyecto.git`

- `# Conectar un repositorio local con uno remoto vacío`

```
git remote add origin https://github.com/usuario/proyecto.git
```

- `# Subir tus commits`

```
git push origin main
```

- `# Traer lo que subieron los demás — antes de empezar a trabajar git pull origin main`

**Regla de convivencia:** `pull` antes de empezar y `push` al terminar. La mayoría de los conflictos aparecen por trabajar varias horas sobre una copia desactualizada.

<!-- página 21 -->

UNIDAD 1 · GIT · PARTE 5 · EL REPOSITORIO REMOTO **Local y remoto son el mismo historial**

No hay dos historias paralelas. `origin/main` es simplemente **la marca de hasta dónde llegó lo que está en el servidor** , sobre la misma línea de commits.

###### **`git push`**

![Imagen de la página 21](assets/u01-git-control-de-versiones/p0021-03.png)

<!-- Start of picture text -->
origin/main<br>main<br><!-- End of picture text -->

Tenés dos commits que el servidor no tiene. Al subirlos,

`origin/main` alcanza a `main` .

###### **`git pull`**

![Imagen de la página 21](assets/u01-git-control-de-versiones/p0021-07.png)

<!-- Start of picture text -->
origin/main<br>main<br><!-- End of picture text -->

Los demás subieron dos commits que vos no tenés. Al bajarlos, `main` se pone al día.

El problema aparece cuando pasan **las dos cosas a la vez** : vos commiteaste y ellos también. Ahí la línea se bifurca y `pull` tiene que integrar — es el origen de casi todos los conflictos.

<!-- página 22 -->

UNIDAD 1 · GIT · PARTE 5 · EL REPOSITORIO REMOTO
###### **Git no es GitHub**

Git es un programa que corre en tu máquina, y todo lo que vimos hasta acá —commits, ramas, merges— funciona **sin**
**cuenta, sin servidor y sin internet** . Un remoto no es «GitHub»: es **cualquier otra copia del repositorio que puedas**
**alcanzar** .

```
# Un servicio de alojamiento
git clone https://github.com/usuario/proyecto.git

# Una máquina tuya, por SSH
git clone franco@203.0.113.25:/srv/git/proyecto.git

# Una carpeta del disco, o un pendrive
git clone /media/backup/proyecto.git

```

Los tres son remotos válidos y se manejan con **los**
**mismos comandos** .

Para armar el tuyo alcanza con `git init --bare` en
una máquina que tenga SSH.

Si además querés la parte web —Pull Requests, issues

- se instala **Forgejo** - **Gitea** : andan en una Raspberry
Pi.

GitHub, GitLab y Bitbucket **no son Git** : alojan una copia y le suman lo que Git no trae —Pull Requests, issues,
permisos, CI—. Es cómodo y es el estándar de la industria, pero si mañana desaparecieran, tu repositorio seguiría
completo en tu disco.

<!-- página 23 -->

UNIDAD 1 · GIT · PARTE 5 · EL REPOSITORIO REMOTO **Los servicios de alojamiento**

Todos alojan repositorios de Git y hablan el mismo protocolo: mudarse de uno a otro es un `clone` y un `push` . Lo que los diferencia es **lo que le agregan alrededor** .

|**GitHub**|De Microsoft. El más usadoyel ecosistema másgrande,con CIpropio.|
|---|---|
|**GitLab**|Fuerte en empresas. CI/CD integrado desde siempre, ysepuede autoalojar.<br>l|
|**Bitbucket**|De Atlassian. Se usa dondeya hayJirayConfluence.|
|**Azure DevOps**|También de Microsoft,en organizacionesqueya trabajan sobre Azure.<br>i|
|**Codeberg**|Sin fines de lucroycomunitario, pensadoparaproyectos abiertos.|
|**Forgejo · Gitea**|Autoalojados: el servidor lo ponés vos, en la máquina que quieras.|
|En la materia usam<br>importa se traslad|os**GitHub**: es gratis para lo que necesitamos y es el que más se van a cruzar después. Lo que<br>a a cualquiera de los otros.|

<!-- página 24 -->

UNIDAD 1 · GIT · PARTE 6
#### **Conectar con GitHub**

Autenticación, el flujo del equipo y qué no subir nunca al repositorio.

<!-- página 25 -->

UNIDAD 1 · GIT · PARTE 6 · CONECTAR CON GITHUB
###### **Autenticarse**

GitHub **no acepta tu contraseña** para operaciones de Git desde 2021. Es el primer obstáculo con el que se van a
chocar al hacer `push` .

**MÁS SIMPLE**
**GitHub CLI**

```
gh auth login

```

Resuelve todo desde el navegador y
deja las credenciales configuradas.

**Token (HTTPS)**
Se genera un Personal Access Token
en la configuración de GitHub y se usa
**en lugar de la contraseña** cuando Git
la pide.

**Clave SSH**

```
ssh-keygen -t ed25519

```

Se sube la clave pública a GitHub. No
vuelve a pedir nada nunca más.

<!-- página 26 -->

UNIDAD 1 · GIT · PARTE 6 · CONECTAR CON GITHUB
###### **El flujo del trabajo integrador**

**1 · Actualizar**
```
git switch main
git pull

```

**2 · Ramificar**
```
git switch -c mi-tarea

```

**3 · Trabajar**

`git add` - `git commit`
Commits chicos y
frecuentes.

**4 · Integrar**
```
git push origin mitarea
```

y abrir un Pull Request.

El **Pull Request** es donde el equipo revisa el cambio antes de integrarlo. No es un requisito de Git sino de GitHub, y es
la práctica estándar en la industria.

<!-- página 27 -->

UNIDAD 1 · GIT · PARTE 6 · CONECTAR CON GITHUB **El mismo flujo, dibujado**

Dos integrantes trabajando en paralelo sobre el mismo proyecto, cada uno en su rama, integrando a `main` cuando terminan.

![Imagen de la página 27](assets/u01-git-control-de-versiones/p0027-02.png)

<!-- Start of picture text -->
ana/login<br>main<br>PR de Ana<br>arranque<br>juan/mapa<br><!-- End of picture text -->

Las dos ramas salen del mismo commit y se integran por separado. Mientras toquen archivos distintos **no hay nada que resolver a mano** : por eso conviene repartir el trabajo por pantalla, no por archivo compartido.

<!-- página 28 -->

UNIDAD 1 · GIT · PARTE 6 · CONECTAR CON GITHUB
###### **.gitignore en un proyecto Expo**

```
node_modules/
.expo/
dist/
web-build/

# Nativo generado por prebuild
/ios
/android

# Secretos
.env*.local

```

`node_modules/` se reconstruye con `npm install` : no
va al repositorio.

`ios/` y `android/` los genera Expo automáticamente
cuando hace falta.

**Nunca subir claves ni tokens.** Una vez en el historial,
quedan ahí aunque después las borres.

`create-expo-app` ya genera un `.gitignore` razonable. Conviene revisarlo, no reemplazarlo.

<!-- página 29 -->

UNIDAD 1 · GIT · PARTE 6 · CONECTAR CON GITHUB
###### **Machete**

**Todos los días**

```
git status
git pull
git add .
git commit -m "..."
git push

```

**Deshacer**

```
git restore archivo
git stash -u / pop
git revert a1b2c3d

```

**Ramas**

```
git switch -c rama
git switch main
git merge rama
git branch -d rama

```

**Rescate**

```
git reflog
git reset --hard HEAD@{2}

```

**Mirar**

```
git log --oneline --graph
git diff
git show a1b2c3d

```

**Con cuidado**
```
git reset --hard
git commit --amend
git push --force
```

Sólo sobre commits que **todavía no**
**subiste** .

<!-- página 30 -->

UNIDAD 1 · GIT
##### **Para la práctica**

Crear el repositorio del grupo y agregar a todos los integrantes.

Subir el proyecto de Expo con un `.gitignore` correcto.

Que cada integrante haga al menos un commit desde su rama.

Documentación: `git-scm.com/doc` - `docs.github.com`

---

<a id="doc-04"></a>

## 04. P01 - Instalación Entorno de Desarrollo

> **Fuente:** `P01 - Instalación Entorno de Desarrollo.pdf` · **Páginas:** 64 · **Palabras:** 2.846 · **Imágenes:** 61

<!-- página 1 -->

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-00.png)

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-01.png)

### **Desarrollo para dispositivos móviles**

Instalación Entorno de Desarrollo

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-04.png)

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-05.png)

Facultad de Cs. de la Administración - UNER

<!-- página 2 -->

### Pre-Requisitos Instalación del Entorno de Desarrollo

<!-- página 3 -->

###### Pre-Requisitos - Instalacion del Entorno de Desarrollo

- NodeJS (Versión LTS recomendada) :
Entorno de ejecución para JavaScript que permite código JavaScript en el lado del servidor.

  - Descargar desde: <u><mark>[https://nodejs.org](https://nodejs.org)</mark></u>

- Editor de Código (recomendado: Visual Studio Code)
Descargar desde: <u><mark>[https://code.visualstudio.com/](https://code.visualstudio.com/)</mark></u>

  - Otras alternativas:

    - WebStorm

<!-- página 4 -->

### OPEN JDK

<!-- página 5 -->

Open JDK

**Open Java Development Kit** implementación gratuita y de código abierto del lenguaje de programación Java y su entorno de ejecución (Java Runtime Environment, JRE).

![Imagen de la página 5](assets/p01-instalacion-entorno-de-desarrollo/p0005-02.png)

<!-- página 6 -->

###### Open JDK

Open Java Development Kit i Conjunto de herramientas, librerías y entornos necesarios para compilar, ejecutar y desarrollar aplicaciones en Java. Incluye: ● La JVM (Java Virtual Machine) → ejecuta programas Java. ● El compilador javac → traduce código Java a bytecode. ● Librerías estándar de Java (colecciones, IO, networking, etc.).

<!-- página 7 -->

###### Open JDK

**¿Por qué es necesario el JDK?**

- Permite Ejecutar herramientas del SDK de Android como gradle, javac, adb, etc.

  - **Gradle** : Parte de Android SDK Platform Tools Se encarga de compilar, enlazar dependencias, empaquetar,
firmar y generar el APK o AAB

  - **Javac** compilador de Java que viene con el JDK. Convierte el código fuente Java (.java) en bytecode (.class),
que luego puede ejecutarse en la Java Virtual Machine (JVM).

**Versión recomendada**

**JDK 17**

<!-- página 8 -->

### Instalación Android Studio

Entorno de desarrollo integrado (IDE) oficial para el desarrollo de aplicaciones para el sistema operativo
Android. Fue desarrollado por Google y está basado en IntelliJ IDEA, un IDE para Java.

<!-- página 9 -->

###### Pre-Requisitos - Instalación del Entorno de Desarrollo

Cuándo necesitamos Android Studio ● Código Nativo Personalizado: Si necesitamo escribir código nativo personalizado (Java, Kotlin para Android), o integrar bibliotecas nativas que no son parte del SDK estándar de Expo, necesitarás Android Studio para compilar y probar.Características Nativas Específicas. **● Para usar un emulador Android** Si no tenemos un celular físico disponible, o decidimos utilizar un emulador de Android por algún motivo necesitamos crear y correr un dispositivo virtual (AVD).

<!-- página 10 -->

###### Pre-Requisitos - Instalacion del Entorno de Desarrollo

Cuándo NO necesitamos Android Studio ● Cuando hacemos el desarrollo únicamente con librerías compatibles con Expo. para usar un emulador Android. ● Cuando usamos Expo Go en el celular para probar la app (escaneando el QR con npx expo start). ● Cuando publicamos con EAS Build (Expo Application Services), ya que Expo genera los binarios en la nube.

<!-- página 11 -->

Instalación Android Studio

![Imagen de la página 11](assets/p01-instalacion-entorno-de-desarrollo/p0011-01.png)

<!-- página 12 -->

Instalación Android Studio

![Imagen de la página 12](assets/p01-instalacion-entorno-de-desarrollo/p0012-01.png)

<!-- página 13 -->

Instalación Android Studio

![Imagen de la página 13](assets/p01-instalacion-entorno-de-desarrollo/p0013-01.png)

<!-- página 14 -->

Instalación Android Studio

Para realizar la instalación primeramente  deberemos ingresar la página de Android Studio y presionar Descargar.

![Imagen de la página 14](assets/p01-instalacion-entorno-de-desarrollo/p0014-02.png)

202 - Segundo cuatrimestre

<!-- página 15 -->

Instalación Android Studio

![Imagen de la página 15](assets/p01-instalacion-entorno-de-desarrollo/p0015-01.png)

<!-- página 16 -->

Instalación Android Studio

![Imagen de la página 16](assets/p01-instalacion-entorno-de-desarrollo/p0016-01.png)

<!-- página 17 -->

###### Instalación Android Studio

sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386

sudo yum install zlib.i686 ncurses-libs.i686 bzip2-libs.i686

![Imagen de la página 17](assets/p01-instalacion-entorno-de-desarrollo/p0017-r00.png)

<!-- página 18 -->

Instalación Android Studio

![Imagen de la página 18](assets/p01-instalacion-entorno-de-desarrollo/p0018-01.png)

<!-- página 19 -->

Instalación Android Studio

Ambas opciones son necesarias para correr y emular nuestro proyecto.

![Imagen de la página 19](assets/p01-instalacion-entorno-de-desarrollo/p0019-02.png)

<!-- página 20 -->

Instalación Android Studio

A continuación nos indicará el mínimo espacio requerido y ruta donde realizará las instalación..

![Imagen de la página 20](assets/p01-instalacion-entorno-de-desarrollo/p0020-02.png)

<!-- página 21 -->

Instalación Android Studio

A continuación nos pregunta si deseamos crear acceso directo.

![Imagen de la página 21](assets/p01-instalacion-entorno-de-desarrollo/p0021-02.png)

<!-- página 22 -->

Instalación Android Studio

Extracción de archivos necesarios para la instalación.

![Imagen de la página 22](assets/p01-instalacion-entorno-de-desarrollo/p0022-02.png)

<!-- página 23 -->

Instalación Android Studio

![Imagen de la página 23](assets/p01-instalacion-entorno-de-desarrollo/p0023-01.png)

<!-- página 24 -->

Instalación Android Studio

![Imagen de la página 24](assets/p01-instalacion-entorno-de-desarrollo/p0024-01.png)

<!-- página 25 -->

Instalación Android Studio

![Imagen de la página 25](assets/p01-instalacion-entorno-de-desarrollo/p0025-01.png)

<!-- página 26 -->

###### Instalación Android Studio

![Imagen de la página 26](assets/p01-instalacion-entorno-de-desarrollo/p0026-01.png)

- **Android SDK** : El kit de desarrollo de software que incluye herramientas necesarias para desarrollar y probar aplicaciones Android.

  - **adb (Android Debug Bridge):** Parte de Android SDK Platform Tools Permite **comunicarse con un dispositivo o emulador Android** . Instalar/desinstalar APKs. Pasar archivos al dispositivo. Ejecutar comandos en la terminal del teléfono.

- **Android API 35** : API de Android esencial para ejecutar y probar aplicaciones en esa versión de Android.

- **Performance (Intel® HAXM)** (Intel) o **Performance (Android Emulator hypervisor driver) (AMD)** : Necesarios para mejorar el rendimiento del emulador. Se debe seleccionar uno de ellos dependiendo de si la máquina es compatible con Intel HAXM o con el controlador de hipervisor de Android Emulator.

- **Android Virtual Device (AVD)** : Esencial para crear y configurar dispositivos virtuales de Android que se ejecutarán en el emulador.

<!-- página 27 -->

Instalación Android Studio

![Imagen de la página 27](assets/p01-instalacion-entorno-de-desarrollo/p0027-01.png)

<!-- página 28 -->

Instalación Android Studio

![Imagen de la página 28](assets/p01-instalacion-entorno-de-desarrollo/p0028-01.png)

<!-- página 29 -->

Intel® HAXMInstalación Android Studio

Para poder instalar Intel® HAXM correctamente  debemos habilitar las Tecnólogías de Virtualización en la BIOS y Windows:

![Imagen de la página 29](assets/p01-instalacion-entorno-de-desarrollo/p0029-02.png)

![Imagen de la página 29](assets/p01-instalacion-entorno-de-desarrollo/p0029-03.png)

<!-- página 30 -->

Intel® HAXMInstalación Android Studio

**IMPORTANTE** : Intel® HAXM fue oficialmente descontinuado por Google e Intel.

###### **Windows:**

- Se utiliza **Windows Hypervisor Platform (WHPX)** .

  - Es compatible con **Intel** y **AMD** .

  - Funciona en **Windows 10/11 de 64 bits** con virtualización habilitada en BIOS.

  - No requiere instalación adicional si tenés habilitado Hyper-V o WSL2.

![Imagen de la página 30](assets/p01-instalacion-entorno-de-desarrollo/p0030-07.png)

- **macOS:**

- Se usa la virtualización nativa de **Apple (Hypervisor.framework)** .

  - Totalmente compatible con Intel y Apple Silicon (M1, M2, M3).

  - Más rápida y eficiente que HAXM.

<!-- página 31 -->

Instalación Android Studio

![Imagen de la página 31](assets/p01-instalacion-entorno-de-desarrollo/p0031-01.png)

<!-- página 32 -->

###### Variables de Entorno

Luego de Instalar OpenJDK y Android Srudio debemos configurar las variables de entorno para que Android
Studio y las herramientas de Android SDK funcionen bien, es decir queden listos para compilar y ejecutar apps.
(ya sea con React Native, Expo Bare Workflow, o proyectos Android nativos), necesitamos configurar variables
de entorno.

**JAVA_HOME: Creamos una variable de entorno nueva llamada JAVA_HOME**

**JAVA_HOME**

Apuntamos a la carpeta donde tenemos instalado el JDK (Java Development Kit)

JAVA_HOME = C:\Program Files\Java\jdk-17

![Imagen de la página 32](assets/p01-instalacion-entorno-de-desarrollo/p0032-r00.png)

<!-- página 33 -->

Variables de Entorno

Luego editamos la carpeta PATH y agregamos entrada bin con la ruta a dicha carpeta: C:\Program Files\Java\jdk-17\bin

![Imagen de la página 33](assets/p01-instalacion-entorno-de-desarrollo/p0033-02.png)

<!-- página 34 -->

Variables de Entorno

**ANDROID_HOME:** si bien se sigue usando la documentación sugiere usar ANDROID_SDK_ROOT. Apuntamos al directorio raíz del **Android SDK:**

###### **ANDROID_SDK_ROOT = C:\Users\TU_USUARIO\AppData\Local\Android\Sdk**

![Imagen de la página 34](assets/p01-instalacion-entorno-de-desarrollo/p0034-03.png)

<!-- página 35 -->

Variables de Entorno

**PATH:** luego en el Path agregamos rutas a binarios importantes

**C:\Users\[Nombre de usuario]\AppData\Local\Android\Sdk\platform-tools C:\Users\[Nombre de usuario]\AppData\Local\Android\Sdk\tools C:\Users\[Nombre de usuario]\AppData\Local\Android\Sdk\tools\bin C:\Users\[Nombre de usuario]\AppData\Local\Android\Sdk\emulator**

![Imagen de la página 35](assets/p01-instalacion-entorno-de-desarrollo/p0035-03.png)

<!-- página 36 -->

###### Instalación Android Studio

**Crear un emulador (AVD):** ●  Abrir Android Studio ●  Ir a Tools > "Device Manager" ●  Crear un nuevo dispositivo (por ejemplo: Pixel 8) y seleccionar una imagen del sistema (recomendado: API 31 o superior). ● Ejecutar el emulador: Desde "Device Manager", iniciar el emulador. ● Verificar conexión con Expo: ○ Ejecutar: npx expo start --android ○ Se debería abrir la app automáticamente en el emulador.

<!-- página 37 -->

Instalación Android Studio

![Imagen de la página 37](assets/p01-instalacion-entorno-de-desarrollo/p0037-01.png)

<!-- página 38 -->

Instalación Android Studio

![Imagen de la página 38](assets/p01-instalacion-entorno-de-desarrollo/p0038-01.png)

<!-- página 39 -->

###### Instalación Android Studio

![Imagen de la página 39](assets/p01-instalacion-entorno-de-desarrollo/p0039-01.png)

<!-- página 40 -->

Instalación Android Studio

![Imagen de la página 40](assets/p01-instalacion-entorno-de-desarrollo/p0040-01.png)

<!-- página 41 -->

### EXPO

<!-- página 42 -->

###### Expo

###### **Expo**

- Expo es una plataforma y framework para construir aplicaciones móviles multiplataforma (Android e iOS)
usando React Native. Simplifica el proceso de desarrollo proporcionando herramientas, librerías y
servicios que agilizan la creación, prueba y despliegue de aplicaciones.

###### **Expo Go**

- Expo Go es una aplicación móvil (disponible para Android e iOS) que funciona como un entorno de
pruebas rápido para experimentar y testear aplicaciones basadas en Expo.

Permite a los desarrolladores previsualizar e iterar sobre sus proyectos sin necesidad de configurar un
entorno completo de desarrollo ni compilar binarios nativos.

###### **Expo Cli**

- Proporciona comandos para inicializar, compilar y publicar aplicaciones, además de interactuar con los
servicios de Expo como los servidores de compilación y las actualizaciones OTA (Over The Air).

<!-- página 43 -->

###### Expo

###### **Instalar Expo GO en Dispositivo Movil**

Aplicación móvil que permite ejecutar proyectos de React Native creados con Expo sin necesidad de
compilar código nativo ni usar Android Studio o Xcode.

- Buscar "Expo Go" en Play Store o App Store.

- Instalar la app.

<!-- página 44 -->

Expo

##### **Crear un nuevo Proyecto**

● rpeta del proyecto:

● Ejecutar:

![Imagen de la página 44](assets/p01-instalacion-entorno-de-desarrollo/p0044-04.png)

![Imagen de la página 44](assets/p01-instalacion-entorno-de-desarrollo/p0044-05.png)

![Imagen de la página 44](assets/p01-instalacion-entorno-de-desarrollo/p0044-06.png)

<!-- página 45 -->

Expo

##### **Crear un nuevo Proyecto**

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-02.png)

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-03.png)

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-04.png)

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-05.png)

<!-- página 46 -->

Expo

##### **Crear un nuevo Proyecto**

![Imagen de la página 46](assets/p01-instalacion-entorno-de-desarrollo/p0046-02.png)

<!-- página 47 -->

Expo

##### **Crear un nuevo Proyecto**

![Imagen de la página 47](assets/p01-instalacion-entorno-de-desarrollo/p0047-02.png)

<!-- página 48 -->

Expo

##### **Crear un nuevo Proyecto**

![Imagen de la página 48](assets/p01-instalacion-entorno-de-desarrollo/p0048-02.png)

<!-- página 49 -->

Expo

##### **Ejecutar la App**

- Entrar a la carpeta del proyecto:

**<u>IMPORTANTE</u>** <u>:</u> Debemos estar conectado a la **misma red Wi-Fi** que nuestro celular.

- Ejecutar:

![Imagen de la página 49](assets/p01-instalacion-entorno-de-desarrollo/p0049-05.png)

<!-- página 50 -->

Expo

![Imagen de la página 50](assets/p01-instalacion-entorno-de-desarrollo/p0050-01.png)

**Metro waiting on exp://192.168.100.117:8081**

- **› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)**

- **› Web is waiting on http://localhost:8081**

- **› Using Expo Go**

- **› Press s │ switch to development build (** Cambia entre **Expo Go** y **Development Build)**

- **› Press a │ open Android (** Abre la app en un **emulador Android)**

- **› Press w │ open web (** Abre la app en modo **web** en tu navegador. **)**

- **› Press j │ open debugger (** Abre el **debugger en Chrome** para ver logs y hacer debugging **)**

- **› Press r │ reload app (Recarga (reload) la app en todos los dispositivos conectados.)**

- **› Press m │ toggle menu (Muestra o oculta el menú de desarrollo en el dispositivo/emulador.)**

- **› shift+m │ more tools (Muestra más herramientas en la terminal (como logs, configuración, etc).)**

- **› Press o │ open project code in your editor (Abre el proyecto en el editor de código predeterminado (como VS Code).**

- **› Press ? │ show all commands (Muestra todos los comandos disponibles en pantalla.)**

<!-- página 51 -->

Expo

|**Característica**|**Expo Go**|**Development Build**|
|---|---|---|
|Instalación|Desde la tienda<br>(Play/App Store)|Requiere compilar e instalar la<br>app.|
|Librerías nativas<br>personalizadas|No permite|Sí permite|
|Velocidad para ejecutar<br>la App|Rapido No necesita compilar.|Mas Lento. Requiere compilación|
|Para que proposito es<br>ideal?|Apps simples.|Apps más complejas o con<br>plugins nativos|

<!-- página 52 -->

###### Expo

npx expo start + Press a
npx expo run:android

![Imagen de la página 52](assets/p01-instalacion-entorno-de-desarrollo/p0052-r00.png)

<!-- página 53 -->

Expo

##### **EAS (Expo Aplication Services)  Buld (Development Build)**

###### **Instalar y configurar EAS**

###### **Iniciar sesión en cuenta de Expo**

![Imagen de la página 53](assets/p01-instalacion-entorno-de-desarrollo/p0053-04.png)

<!-- página 54 -->

Expo

###### **Configurar EAS**

- Crea el archivo eas.json (configuración de builds).

- Nos  pregunta qué plataforma querés soportar (iOS, Android o ambas).

- Configura app.json/app.config.js para tener los campos obligatorios, como android.package. **Importante:** Para Android, android.package debe tener el formato com.tunombre.miapp y ser

- único.

![Imagen de la página 54](assets/p01-instalacion-entorno-de-desarrollo/p0054-05.png)

<!-- página 55 -->

###### Expo

###### **Elegir el tipo de build**

Podemos generar:

- **AAB (Android App Bundle)** → requerido por Google Play.

- **APK** → solo para instalar directamente en dispositivos.

Por defecto, EAS Build para Android genera un **AAB** . Si queremos APK, debemos usar la
opción --profile preview y configurá el eas.json.

Ejemplo de eas.json:

<!-- página 56 -->

Pre-Requisitos - Instalacion del Entorno de Desarrollo

![Imagen de la página 56](assets/p01-instalacion-entorno-de-desarrollo/p0056-01.png)

<!-- página 57 -->

Expo

##### **Ejecutar la build**

Para Android (producción):

eas build --platform android (Producción)

Para Android (desarrollo):

![Imagen de la página 57](assets/p01-instalacion-entorno-de-desarrollo/p0057-05.png)

Para iOS:

![Imagen de la página 57](assets/p01-instalacion-entorno-de-desarrollo/p0057-07.png)

<!-- página 58 -->

Expo

![Imagen de la página 58](assets/p01-instalacion-entorno-de-desarrollo/p0058-01.png)

![Imagen de la página 58](assets/p01-instalacion-entorno-de-desarrollo/p0058-02.png)

**Luego debemos descargar e instalar el Development Build en nuestro dispositivo o emulador**

![Imagen de la página 58](assets/p01-instalacion-entorno-de-desarrollo/p0058-04.png)

**IMPORTANTE: El servidor Metro local busca un development build APK instalado en el dispositivo/emulador que coincida con el identificador android.package de nuestra app.**

<!-- página 59 -->

Expo

Una vez finalizado el Build podemos scanear el QR o hacer clic en el Link lo  cual nos permitirá instalar el mismo en nuestro dispositivo.

![Imagen de la página 59](assets/p01-instalacion-entorno-de-desarrollo/p0059-02.png)

<!-- página 60 -->

Expo

![Imagen de la página 60](assets/p01-instalacion-entorno-de-desarrollo/p0060-01.png)

<!-- página 61 -->

Expo

###### Podemos también instalarlo en nuestro Emulador de Android.

![Imagen de la página 61](assets/p01-instalacion-entorno-de-desarrollo/p0061-02.png)

<!-- página 62 -->

Expo

![Imagen de la página 62](assets/p01-instalacion-entorno-de-desarrollo/p0062-01.png)

<!-- página 63 -->

Expo

![Imagen de la página 63](assets/p01-instalacion-entorno-de-desarrollo/p0063-01.png)

<!-- página 64 -->

###### Expo

**Metro waiting on exp://192.168.100.117:8081**
**› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)**

**› Web is waiting on http://localhost:8081**

**› Using Expo Go**
**› Press s │ switch to development build (** Cambia entre **Expo Go** y **Development Build)**

**› Press a │ open Android (** Abre la app en un **emulador Android)**
**› Press w │ open web (** Abre la app en modo **web** en tu navegador. **)**

**› Press j │ open debugger (** Abre el **debugger en Chrome** para ver logs y hacer debugging **)**
**› Press r │ reload app (Recarga (reload) la app en todos los dispositivos conectados.)**
**› Press m │ toggle menu (Muestra o oculta el menú de desarrollo en el dispositivo/emulador.)**
**› shift+m │ more tools (Muestra más herramientas en la terminal (como logs, configuración, etc).)**
**› Press o │ open project code in your editor (Abre el proyecto en el editor de código**
**predeterminado (como VS Code).**
**› Press ? │ show all commands (Muestra todos los comandos disponibles en pantalla.)**

---

<a id="doc-05"></a>

## 05. Unidad 2 — React Native y Expo · Desarrollo para Móviles

> **Fuente:** `U02 — React Native y Expo · Desarrollo para Móviles.pdf` · **Páginas:** 29 · **Palabras:** 2.361 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 2** **React Native y Expo**

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
##### **React Native**

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
##### **DOM vs. componentes nativos**

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
##### **Arquitectura de ejecución**

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

#### **JS**

Antes: se parsea

#### **JS 0x**

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
##### **Expo**

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
###### **Lo que sigue**

Práctica: entorno de desarrollo y primer proyecto con Expo.

**Unidad 3:** pantallas, estilos con StyleSheet y Unistyles, navegación con Expo Router.

Documentación: `docs.expo.dev` - `reactnative.dev`

---

<a id="doc-06"></a>

## 06. Unidad 2 — TypeScript, React y ciclo de vida · Desarrollo para Móviles

> **Fuente:** `U02 — TypeScript, React y ciclo de vida · Desarrollo para Móviles.pdf` · **Páginas:** 43 · **Palabras:** 3.478 · **Imágenes:** 1

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 2** **TypeScript, React y ciclo de vida**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 2
###### **Qué vamos a ver**

**Objetivos** **Temas**

Repasar TypeScript y React con la mirada puesta en móvil.

Escribir componentes tipados y reutilizables.

Entender **cuándo** se ejecuta cada parte de un
componente.

TypeScript vs. JavaScript

Componentes, props y estado

Hooks: los que vas a usar todos los días

**Ciclo de vida: componente, pantalla y app**

Esta es la **primera clase de la Unidad 2** . La segunda —React Native, arquitectura de ejecución y Expo— arranca
donde termina ésta.

<!-- página 3 -->

UNIDAD 2 · PARTE 1
#### **TypeScript**

Qué agrega sobre JavaScript y por qué en móvil pesa más que en web.

<!-- página 4 -->

UNIDAD 2 · PARTE 1 · TYPESCRIPT
###### **Qué es**
Un superconjunto de JavaScript : todo JavaScript válido es TypeScript válido. Le agrega un sistema de tipos que se verifica antes de ejecutar, y después desaparece — al dispositivo llega JavaScript común.

**Tipado estático**

Declarás qué tipo tiene cada variable, parámetro
y retorno.

**Se borra al compilar**

Los tipos no existen en tiempo de ejecución: no
hay costo de performance.

**Gradual**

Podés tipar un archivo y dejar el resto como
está. No es todo o nada.

El template de `create-expo-app` ya viene en TypeScript. No hay que configurar nada para empezar.

<!-- página 5 -->

UNIDAD 2 · PARTE 1 · TYPESCRIPT
###### **Por qué importa más en móvil**

**En web**
Un error de tipos rompe la página. El usuario recarga con F5
y seguís. Si el bug llegó a producción, subís el arreglo y en
minutos está.

**En una app**
Un error de tipos **cierra la aplicación** . Y el arreglo tiene que
pasar por la tienda: días de revisión, más los usuarios que
nunca actualizan.

El costo de un error crece con lo lejos que llega. TypeScript lo corre hacia el momento más barato posible: mientras
escribís.

<!-- página 6 -->

UNIDAD 2 · PARTE 1 · TYPESCRIPT
###### **Tipos e inferencia**

ANOTADO A MANO

```
let nombre: string = 'Ana';
let edad: number = 24;
let activo: boolean = true;
let etiquetas: string[] = ['nuevo'];

function saludar(a: string): string {
  return 'Hola ' + a;
}

```

INFERIDO POR TYPESCRIPT

```
let nombre = 'Ana';        // string
let edad = 24;             // number
let activo = true;         // boolean
let etiquetas = ['nuevo']; // string[]

function saludar(a: string) {
  return 'Hola ' + a;      // devuelve string
}

```

No hace falta anotar todo. Lo que sí conviene anotar siempre: los **parámetros** de una función y la forma de los datos
que vienen de afuera (una API, por ejemplo), porque ahí TypeScript no tiene de dónde inferir.

<!-- página 7 -->

UNIDAD 2 · PARTE 1 · TYPESCRIPT **Interfaces: la forma de un objeto**

```
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;   // el ? lo hace opcional
}
interface PropsTarjeta {
  producto: Producto;
  alTocar: (id: number) => void;
}
function Tarjeta({ producto, alTocar }: PropsTarjeta) {
  // ...
}
```

Es el uso número uno de TypeScript en React: **describir las props** de un componente. Escribir la interfaz es documentar el componente y validarlo al mismo tiempo.

<!-- página 8 -->

UNIDAD 2 · PARTE 1 · TYPESCRIPT **Uniones: cuando hay varios estados posibles**

```
type Estado =
```

- `| { fase: 'cargando' }`

- `| { fase: 'listo'; productos: Producto[] }`

- `| { fase: 'error'; mensaje: string };`

```
function render(estado: Estado) {
  if (estado.fase === 'cargando') return 'Cargando…';
  if (estado.fase === 'error') return estado.mensaje;
  return estado.productos.length + ' productos';
```

- `// acá TypeScript ya sabe que .productos existe`

- `}`

Los tres estados de una pantalla que pide datos —cargando, listo, error— son un caso perfecto para una unión. El compilador no te deja olvidarte de uno.

<!-- página 9 -->

UNIDAD 2 · PARTE 1 · TYPESCRIPT **Genéricos: el tipo como parámetro**

```
// T se decide en cada llamada, no al escribir la función
async function traer<T>(url: string): Promise<T> {
  const respuesta = await fetch(url);
  return respuesta.json();
}
const productos = await traer<Producto[]>('/api/productos');
// productos es Producto[], no "any"
const usuario = await traer<Usuario>('/api/perfil');
// usuario es Usuario
```

Sin genéricos habría que escribir una función por cada tipo de dato, o resignarse a `any` y perder toda la ayuda del editor.

<!-- página 10 -->

UNIDAD 2 · PARTE 2
#### **React: componentes y props**

La unidad mínima con la que se construye una interfaz.

<!-- página 11 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS
###### **La idea central**
React es declarativo : no describís los pasos para cambiar la pantalla, describís cómo tiene que verse la pantalla para un estado dado. React se encarga del resto.

IMPERATIVO

```
const el = document.querySelector('#total');
el.textContent = carrito.length;
if (carrito.length === 0) {
  el.classList.add('vacio');
} else {
  el.classList.remove('vacio');
}

```

DECLARATIVO

```
<Text style={carrito.length === 0
  ? estilos.vacio
  : estilos.normal}>
  {carrito.length}
</Text>

```

En el segundo caso no hay que acordarse de sacar la clase. **El estado es la única fuente de verdad** y la interfaz es
una función de ese estado.

<!-- página 12 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS
###### **Un componente es una función**

```
import { View, Text } from 'react-native';

export default function TarjetaPerfil() {
  return (
    <View>
      <Text>Ana Gómez</Text>
    </View>
  );
}

```

**PascalCase**

`TarjetaPerfil`, no `tarjetaPerfil` . Con
minúscula React lo trata como etiqueta común.

**Devuelve JSX**

Un solo elemento raíz. Si necesitás varios
hermanos, van dentro de un `<>…</>` .

**Se anidan**

Un componente puede usar otros adentro. Así se
arma toda la pantalla.

<!-- página 13 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS
###### **JSX y TSX**

LO QUE ESCRIBÍS

```
<View style={estilos.caja}>
  <Text>Hola {nombre}</Text>
</View>

```

**No es HTML**

Es azúcar sintáctico para llamadas a función. Por eso las llaves `{ }` aceptan
cualquier expresión de JavaScript.

LO QUE CORRE

```
jsx(View, { style: estilos.caja,
  children: jsx(Text, {
    children: ['Hola ', nombre]
  })
});

```

**`.tsx`** **, no** **`.ts`**

Un archivo con JSX y TypeScript lleva extensión `.tsx` . Es la que vas a usar para
todo componente.

<!-- página 14 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS **Props: de padre a hijo**

```
interface Props {
  nombre: string;
  edad?: number;          // opcional
}
function Perfil({ nombre, edad = 0 }: Props) {
  return <Text>{nombre} ({edad})</Text>;
}
// desde el padre
<Perfil nombre="Ana" edad={24} />
```

Las props son de **sólo lectura** . Un componente nunca modifica las props que recibe: si necesita cambiar algo, avisa al padre.

<!-- página 15 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS
###### **De hijo a padre: pasar una función**
###### El hijo avisa

```
type Item = { id: number; nombre: string };

interface Props {
  item: Item;
  aBorrar: (id: number) => void;
}

function Fila({ item, aBorrar }: Props) {
  return (
    <View>
      <Text>{item.nombre}</Text>
      <Button title="Borrar"
              onPress={() => aBorrar(item.id)} />
    </View>
  );
}

```

###### El padre decide

```
const INICIALES: Item[] = [
  { id: 1, nombre: 'Yerba' },
  { id: 2, nombre: 'Bizcochos' },
  { id: 3, nombre: 'Azúcar' },
];

function Lista() {
  const [items, setItems] = useState(INICIALES);
  const borrar = (id: number) =>
    setItems(xs => xs.filter(x => x.id !== id));

  return (
    <View>
      {items.map(item => (
        <Fila key={item.id} item={item}
              aBorrar={borrar} />
      ))}
    </View>
  );
}

```

Los datos bajan, los eventos suben. `Fila` no sabe qué va a pasar: sólo avisa que apretaron el botón, con el `id` de su
propio ítem.

<!-- página 16 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS
###### **Estado vs. props**

**Props** **Estado**
Vienen de afuera, las manda el padre. Vive adentro del componente.

Sólo lectura.

Cambian cuando el padre las cambia.

Se cambia con su función `set…` .

Cambiarlo dispara un nuevo renderizado.

Regla práctica: si un dato se puede calcular a partir de las props o de otro estado, **no lo guardes en estado** .
Calculalo en el renderizado. Dos fuentes de verdad para el mismo dato terminan siempre desincronizadas.

<!-- página 17 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS
###### **Listas y key**

```
{productos.map((producto) => (
  <Tarjeta key={producto.id} producto={producto} />
))}

```

`//` ❌ `el índice no sirve como key`
```
{productos.map((producto, i) => (
  <Tarjeta key={i} producto={producto} />
))}

```

La `key` tiene que ser **estable y propia del dato** —el `id`, no el índice del arreglo. Con el índice, al borrar un elemento
del medio React reutiliza el componente equivocado: el estado interno queda pegado a la fila que no corresponde.

<!-- página 18 -->

UNIDAD 2 · PARTE 2 · REACT: COMPONENTES Y PROPS
###### **Buenas prácticas**

**Componentes chicos**
Uno solo propósito. Si la función no entra en pantalla, hay
más de un componente adentro.

**Props siempre tipadas**
Una `interface Props` por componente. Es la
documentación que no se desactualiza.

**Nombres que dicen qué es**

`TarjetaProducto`, no `Item2` .

**Sin lógica de negocio en el JSX**
Calculá arriba, mostrá abajo. El `return` se lee de un vistazo.

<!-- página 19 -->

UNIDAD 2 · PARTE 3
#### **Hooks**

Cómo un componente que es una función puede recordar cosas.

<!-- página 20 -->

UNIDAD 2 · PARTE 3 · HOOKS
###### **El problema que resuelven**
Un componente es una función que se ejecuta entera cada vez que hay que redibujar. Todas sus variables locales se pierden. Entonces, ¿dónde guarda lo que tiene que recordar entre un renderizado y el siguiente?

**REACT < 16.8**
**Antes: clases**

El estado vivía en `this.state`, y había que lidiar con `this`,

`bind` y métodos de ciclo de vida.

**Ahora: hooks**
React guarda el estado por afuera del componente y se lo
devuelve en cada llamada. La función queda limpia.

Un hook es una función que empieza con `use` y que le pide algo a React. Vas a usar los que trae React, los que trae
Expo, y los que escribas vos.

<!-- página 21 -->

UNIDAD 2 · PARTE 3 · HOOKS
###### **Las dos reglas**

**1 · Siempre en el nivel superior**
Nunca dentro de un `if`, un bucle o una función anidada.

`//` ❌
```
if (hayUsuario) {
  const [n, setN] = useState(0);
}

```

**2 · Sólo desde componentes o hooks propios**
No desde una función común, un manejador de evento o una
clase.

`//` ✅
```
  const [n, setN] = useState(0);
if (hayUsuario) { /* usar n */ }

```

React identifica cada hook **por el orden** en que se llama, no por su nombre. Si el orden cambia entre dos
renderizados, el estado se mezcla.

<!-- página 22 -->

UNIDAD 2 · PARTE 3 · HOOKS
###### **`useState`**

```
const [cantidad, setCantidad] = useState(0);
const [productos, setProductos] = useState<Producto[]>([]);

```

`//` ❌ `los dos leen el mismo valor viejo: suma 1, no 2`
```
setCantidad(cantidad + 1);
setCantidad(cantidad + 1);

```

`//` ✅ `actualización en base al valor previo`
```
setCantidad(c => c + 1);
setCantidad(c => c + 1);

```

`cantidad` es una **constante dentro de ese renderizado** : no cambia de valor por llamar a `setCantidad` . El valor
nuevo se ve recién en el renderizado siguiente.

<!-- página 23 -->

UNIDAD 2 · PARTE 3 · HOOKS
###### **`useEffect`**

```
useEffect(() => {
  const id = setInterval(() => console.log('tic'), 1000);

  return () => clearInterval(id);   // limpieza
}, []);

```

```
[]
```

Se ejecuta una vez, al montarse.

```
[a, b]
```

Se vuelve a ejecutar cuando cambia `a` - `b`
(limpiando antes).

**sin arreglo**

Se ejecuta después de cada renderizado. Casi
nunca es lo que querés.

Sin la función de limpieza, ese `setInterval` queda vivo para siempre. En una app que el usuario deja abierta días,
eso se acumula.

<!-- página 24 -->

UNIDAD 2 · PARTE 3 · HOOKS

###### **`useContext`**

```
const TemaContexto = createContext<'claro' | 'oscuro'>('claro');
function Raiz() {
  return (
    <TemaContexto value="oscuro">
      <Pantalla />
    </TemaContexto>
  );
}
function BotonProfundo() {
  const tema = useContext(TemaContexto);   // sin pasar props en cadena
}
```

Para datos que necesita medio árbol: tema, usuario logueado, idioma. Se retoma en la Unidad 3 (temas) y en la Unidad 5 (estado global).

<!-- página 25 -->

UNIDAD 2 · PARTE 3 · HOOKS
###### **`useRef`**

```
const cantidadRenderizados = useRef(0);
cantidadRenderizados.current += 1;   // NO dispara un renderizado

const campo = useRef<TextInput>(null);
<TextInput ref={campo} />
<Button title="Enfocar" onPress={() => campo.current?.focus()} />

```

**Una caja que persiste**

El valor sobrevive entre renderizados, pero cambiarlo no redibuja nada.

**Referencia a un componente**

Para operaciones imperativas que no se pueden expresar con props:

`focus()`, `scrollTo()`, reproducir un video.

Si el valor se muestra en pantalla, va en `useState`, no en `useRef` : la interfaz no se va a enterar del cambio.

<!-- página 26 -->

###### UNIDAD 2 · PARTE 3 · HOOKS

###### **`useMemo` y** **`useCallback`**

```
// memoriza un VALOR: no recalcula si no cambian las dependencias
const ordenados = useMemo(
```

```
() => productos.slice().sort((a, b) => a.precio - b.precio),
```

```
[productos]
```

```
);
```

```
// memoriza una FUNCIÓN: mantiene la misma identidad entre renderizados
const alTocar = useCallback((id: number) => abrir(id), []);
```

**No los pongas por las dudas.** Memorizar tiene su propio costo. Van cuando hay un cálculo caro medido, o cuando la función se pasa como dependencia de un efecto o a un componente memorizado — como en `useFocusEffect` , que vemos en un rato.

<!-- página 27 -->

UNIDAD 2 · PARTE 3 · HOOKS

**ESTABLE DESDE V1.0**
###### **React Compiler**

Es un compilador que **memoriza por vos** : analiza el componente en tiempo de build y agrega la memorización donde
hace falta. Se activa con una línea.

**Prenderlo**

```
{ "expo": {
    "experiments": { "reactCompiler": true }
} }

```

Desde SDK 54 Babel ya viene configurado: alcanza con el
flag. Las reglas de ESLint vienen incluidas en `eslint-`

`config-expo` desde SDK 55.

**Qué cambia en tu código**
**Nada, y ese es el punto.** Podés borrar los `useMemo`,

`useCallback` y `React.memo` que estaban ahí sólo por
rendimiento.
Si un componente se rompe, se lo excluye con la directiva

`'use no memo'` adentro de la función.

Sólo optimiza código que **respeta las reglas de React** : nada de mutar props o estado durante el render. `npx react-`
`compiler-healthcheck` revisa el proyecto antes de prenderlo. Los componentes de clase quedan afuera.

<!-- página 28 -->

UNIDAD 2 · PARTE 3 · HOOKS

###### **`useReducer`**

```
type Accion = { tipo: 'sumar' } | { tipo: 'restar' } | { tipo: 'reiniciar' };
function reducer(estado: number, accion: Accion): number {
  switch (accion.tipo) {
    case 'sumar':     return estado + 1;
    case 'restar':    return estado - 1;
    case 'reiniciar': return 0;
  }
}
const [cantidad, despachar] = useReducer(reducer, 0);
<Button title="+" onPress={() => despachar({ tipo: 'sumar' })} />
```

Cuando el estado tiene varias transiciones repartidas en muchos manejadores, conviene juntar toda la lógica de actualización en una función afuera del componente.

<!-- página 29 -->

UNIDAD 2 · PARTE 3 · HOOKS **Hooks propios**

```
// hooks/useContador.ts
export function useContador(inicial = 0) {
  const [valor, setValor] = useState(inicial);
  const sumar    = useCallback(() => setValor(v => v + 1), []);
  const reiniciar = useCallback(() => setValor(inicial), [inicial]);
  return { valor, sumar, reiniciar };
}
// en cualquier pantalla
const { valor, sumar } = useContador();
```

Un hook propio es sólo una función que empieza con `use` y usa otros hooks adentro. Es la forma de **reutilizar lógica** —no interfaz— entre componentes.

<!-- página 30 -->

UNIDAD 2 · PARTE 3 · HOOKS

###### **Lo que trajo React 19**

SDK 57 usa **React 19.2** . Tres cambios que se notan apenas empezás a escribir componentes.

```
// 1 · ref es una prop más: forwardRef ya no hace falta
function Campo({ etiqueta, ref }: { etiqueta: string; ref?: Ref<TextInput> }) {
  return <TextInput ref={ref} placeholder={etiqueta} />;
}
```

- `// 2 · el Context se usa directo como proveedor`

- `<TemaContext value={tema}>{hijos}</TemaContext>   // antes: .Provider`

```
// 3 · use() lee un contexto (o una promesa) y puede ir adentro de un if
const tema = use(TemaContext);
```

`use` es la única excepción a la primera regla de los hooks: **sí puede llamarse condicionalmente** . Las demás siguen igual.

<!-- página 31 -->

UNIDAD 2 · PARTE 3 · HOOKS
###### **React 19.2: useEffectEvent y Activity**

```
USEEFFECTEVENT

const avisar = useEffectEvent(() => {
  mostrarToast(`Conectado a ${sala}`, tema);
});

useEffect(() => {
  const c = conectar(sala);
  c.on('listo', avisar);
  return () => c.cerrar();
}, [sala]);   // tema NO va acá

```

Lee siempre el valor último de `tema`, pero no redispara el efecto cuando cambia.

```
<ACTIVITY>

<Activity mode={visible ? 'visible' : 'hidden'}>
  <Formulario />
</Activity>

```

Esconde la pantalla **sin desmontarla** : se desmontan
los efectos, pero el estado —lo que el usuario ya
escribió— queda.

Los dos atacan el mismo dolor: el arreglo de dependencias del efecto. Uno saca de ahí lo que no debería disparar
nada; el otro evita el `{'{'}visible && <Formulario />{'}'}` que borra todo lo escrito.

<!-- página 32 -->

UNIDAD 2 · PARTE 4
#### **Ciclo de vida**

Cuándo se ejecuta cada cosa — y por qué en móvil hay tres relojes, no uno.

<!-- página 33 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA
###### **Los tres momentos de un componente**

**Montaje**
React ejecuta la función por primera
vez y pone el resultado en pantalla.

**Actualización**
Cambian las props o el estado: la
función se vuelve a ejecutar entera y
React aplica sólo la diferencia.

**Desmontaje**
React lo saca de la pantalla. Lo que el
componente haya dejado abierto hay
que cerrarlo acá.

El componente tiene ciclo de vida. Los **hooks no son métodos de ciclo de vida** : son la herramienta con la que
reaccionás a esos momentos.

<!-- página 34 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA
###### **Cómo se hacía antes**

**CÓDIGO HEREDADO**
CLASE

```
class Reloj extends React.Component {
  componentDidMount() {
    this.id = setInterval(this.tic, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.id);
  }
  render() { /* … */ }
}

```

**LO QUE USAMOS**
FUNCIÓN

```
function Reloj() {
  useEffect(() => {
    const id = setInterval(tic, 1000);
    return () => clearInterval(id);
  }, []);
  // …
}

```

Lo que estaba partido en dos métodos lejanos —abrir arriba, cerrar abajo— queda junto. Esa cercanía es la razón
principal del cambio: es muy difícil olvidarse de limpiar algo que está tres líneas más abajo.

<!-- página 35 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA

###### **De los métodos de clase a los hooks**

|**Método de clase**|**Equivalente con hooks**|
|---|---|
|`componentDidMount`|`useEffect(() => {…}, [])`|
|`componentDidUpdate`|`useEffect(() => {…}, [dependencias])`|
|`componentWillUnmount`|el<br>`return`del<br>`useEffect`|
|`this.state`/<br>`setState`|`useState`|
|`shouldComponentUpdate`|`React.memo`|

La tabla sirve para **leer código viejo** , no para escribir código nuevo. No es una traducción exacta, y pensar en efectos como "métodos de montaje" lleva derecho a poner mal las dependencias.

<!-- página 36 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA **El efecto tiene su propio ciclo**

En vez de pensar «esto corre al montar», pensá: **empezar a sincronizar** y **dejar de sincronizar** .

```
useEffect(() => {
  const sub = suscribirseA(salaId);      // empezar a sincronizar
  return () => sub.cancelar();           // dejar de sincronizar
}, [salaId]);
```

Cuando `salaId` cambia de `'a'` a `'b'` , React **primero cancela** la suscripción a `'a'` y recién después se suscribe a `'b'` . No hace falta escribir esa coreografía: alcanza con decir cómo se empieza y cómo se termina.

<!-- página 37 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA
###### **Por qué se ejecuta dos veces en desarrollo**
Si envolvés la app en <StrictMode>, React monta cada componente, lo desmonta y lo vuelve a montar — una sola vez, y sólo en desarrollo.

**No es un bug**
Es a propósito: fuerza a que se ejecute la limpieza. Un efecto
bien escrito no nota la diferencia.

**Es un detector**
Si ves dos requests, dos suscripciones o el contador
saltando de a dos, **falta la limpieza** .

En la build de producción esto no pasa. Si "arreglás" el síntoma sacando `StrictMode`, el bug sigue estando: sólo
dejaste de verlo.

<!-- página 38 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA

###### **Segundo reloj: la pantalla**

En web, al navegar de A a B, A se desmonta. **En una app no.** React Navigation deja la pantalla montada para poder volver instantáneamente y conservar el scroll, el formulario a medio llenar y la posición de la lista.

Consecuencia directa: al salir de una pantalla **no corre la limpieza** de sus efectos, y al volver **no se vuelven a ejecutar** . El `useEffect(…, [])` que refresca datos "al entrar" corre una sola vez en toda la vida de la app.

![Imagen de la página 38](assets/u02-typescript-react-y-ciclo-de-vida/p0038-04.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>←   Detalle<br><!-- End of picture text -->

Inicio sigue montada, abajo

<!-- página 39 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA

###### **`useFocusEffect`**

```
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
export default function Perfil() {
  useFocusEffect(
    useCallback(() => {
      const id = setInterval(refrescarSaldo, 5000);
      return () => clearInterval(id);     // al perder el foco
    }, [])
  );
}
```

Es `useEffect` atado al **ciclo de vida de la navegación** en lugar del componente: corre cuando la pantalla toma el foco y limpia cuando lo pierde. El `useCallback` no es opcional — sin él la función es nueva en cada renderizado y el efecto se reinicia sin parar.

<!-- página 40 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA
###### **Tercer reloj: la app**

```
import { AppState } from 'react-native';

useEffect(() => {
  const sub = AppState.addEventListener('change', (estado) => {
    if (estado === 'active') refrescar();   // volvió del segundo plano
  });
  return () => sub.remove();
}, []);

```

```
active
```

En primer plano. El usuario la está usando.

```
background
```

En otra app, o en la pantalla de inicio.

**`inactive`** **IOS**

De paso entre las dos, o durante una llamada
entrante.

<!-- página 41 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA
###### **Los tres relojes**

**Componente**
Montaje · actualización · desmontaje
```
useEffect

```

**Pantalla**
Foco · pérdida de foco
```
useFocusEffect

```

**Aplicación**
Primer plano · segundo plano
```
AppState

```

Los tres corren al mismo tiempo y son independientes. La pregunta a hacerse antes de escribir un efecto es **cuál de**
**los tres** es el que corresponde.

<!-- página 42 -->

UNIDAD 2 · PARTE 4 · CICLO DE VIDA
###### **Los cuatro errores de siempre**

**Efecto sin limpieza**

Temporizadores, suscripciones y listeners que quedan vivos. Se acumulan
con cada montaje.

**Esperar que la pantalla se remonte**

No pasa. Si tiene que correr cada vez que se entra, va `useFocusEffect` .

**Sacar dependencias del arreglo**

Para "que no se ejecute de más". El efecto queda leyendo valores viejos. Si
sobra una dependencia, revisá el efecto.

**`useEffect`** **para derivar estado**

Un efecto que sólo hace `setEstado` a partir de props sobra: calculalo
durante el renderizado.

<!-- página 43 -->

UNIDAD 2
##### **Lo que sigue**

**Segunda clase de la Unidad 2:** React Native, arquitectura de ejecución y Expo.

El ciclo de vida de la pantalla vuelve en la **Unidad 3** con Expo Router, y el de la app en la **Unidad 4** con las APIs del
dispositivo.

Documentación: `react.dev` - `typescriptlang.org/docs` - `reactnavigation.org`

---

<a id="doc-07"></a>

## 07. Unidad 2 — Testing · Desarrollo para Móviles

> **Fuente:** `U02 — Testing.pdf` · **Páginas:** 24 · **Palabras:** 2.089 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 2** **Testing**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · Jest · Testing Library · Maestro

<!-- página 2 -->

UNIDAD 2
###### **Qué vamos a ver**

**Objetivos** **Temas**

Saber qué conviene testear y qué no.

Escribir el primer test de un componente.

Conocer las tres escalas de prueba.

La pirámide: unidad, integración, E2E

`jest-expo` y Jest

**React Native Testing Library**

Expo Router · Maestro · `expo lint`

La clase anterior fue sobre encontrar un error. Ésta es sobre **que no vuelva** .

<!-- página 3 -->

UNIDAD 2 · PARTE 1
#### **Qué se testea**

Y, sobre todo, qué no.

<!-- página 4 -->

UNIDAD 2 · PARTE 1 · QUÉ SE TESTEA
###### **Para qué sirve un test**

**Es una red**

Podés cambiar código con la confianza de que si

rompiste algo, te vas a enterar.

**Es documentación**

Un test dice qué se espera que haga la función,

con ejemplos concretos. Y no se desactualiza sin
avisar.

**Evita la repetición**

Un bug que ya apareció y tiene test no vuelve.

Sin test, vuelve.

Lo que un test **no** es: una garantía de que la app funciona. Cobertura del 100 % con tests que no prueban nada real
es peor que no tener, porque da tranquilidad falsa.

<!-- página 5 -->

UNIDAD 2 · PARTE 1 · QUÉ SE TESTEA

###### **Las tres escalas**

||**Quéprueba**|**Conqué**|**Costo**|
|---|---|---|---|
|**Unidad**|Una función o un componente, aislado|Jest + Testing Library|Barato y<br>rápido|
|**Integración**|Varias piezas juntas: una pantalla con su navegación<br>ysus datos|`expo-router/testing-library`|Medio|
|**E2E**|La app entera, instalada, como la usa una persona|Maestro|Caro y lento|
|Muchos de l                i<br>los que más|os primeros, algunos de los segundos, pocos de los terc       i<br>cuestan de mantener: se rompen cuando cambiás un te|eros. Los E2E son los que más coni<br>xto de la interfaz.|fianza dan y|

<!-- página 6 -->

UNIDAD 2 · PARTE 1 · QUÉ SE TESTEA
###### **Qué conviene testear en el TP**

**Sí** **No**

Lógica propia: cálculos, validaciones, transformaciones de los datos de la
API.

Componentes con condiciones: qué muestra si la lista está vacía, si hay
error.

Lo que ya se rompió una vez.

Que React Native renderice un `<Text>` . Eso ya está testeado.

Detalles de implementación: nombres de estado interno, cuántas veces se
llamó a una función privada.

Estilos exactos. Cambian todo el tiempo y no son el comportamiento.

El criterio que ordena: **testeá lo que el usuario percibe**, no cómo está hecho por dentro. Así el test sobrevive a una
refactorización.

<!-- página 7 -->

UNIDAD 2 · PARTE 2
#### **Jest y jest-expo**

El primer test, de punta a punta.

<!-- página 8 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO
###### **Instalación**

```
npx expo install jest-expo jest @types/jest --dev
npx expo install @testing-library/react-native --dev

package.json

{
  "scripts": {
    "test": "jest --watchAll"
  },
  "jest": { "preset": "jest-expo" }
}

```

```
tsconfig.json

{
  "compilerOptions": {
    "types": ["jest"]
  }
}

```

`jest-expo` es un preset: simula la parte nativa del SDK de Expo y deja casi toda la configuración resuelta. Sin él,
importar cualquier módulo de Expo haría explotar el test. Y sin `"types": ["jest"]`, TypeScript no conoce `test` ni

`expect` y el editor los marca en rojo aunque los tests pasen.

<!-- página 9 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO
###### **El primer test**

EL COMPONENTE

```
// src/app/index.tsx
export default function Inicio() {
  return (
    <View>
      <Text>¡Bienvenida!</Text>
    </View>
  );
}

```

EL TEST

```
// __tests__/inicio-test.tsx
import { render, screen }
  from '@testing-library/react-native';
import Inicio from '@/app/index';

test('saluda al abrir', () => {
  render(<Inicio />);
  expect(screen.getByText('¡Bienvenida!'))
    .toBeVisible();
});

```

El preset reconoce como test los archivos que terminan en `-test.ts` / `-test.tsx`, y los que están dentro de

`__tests__` .

<!-- página 10 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO
###### **Cómo organizar los tests**

UN `__TESTS__` EN LA RAÍZ

```
__tests__/
  inicio-test.tsx
  tarjeta-test.tsx
src/
  app/
    index.tsx
  componentes/
    tarjeta.tsx

```

Alcanza mientras haya pocos tests. Todo junto se
encuentra rápido.

UNO POR ÁREA, AL LADO DEL CÓDIGO

```
src/
  app/
    index.tsx
  componentes/
    tarjeta.tsx
    __tests__/
      tarjeta-test.tsx
  utils/
    precios.ts
    __tests__/
      precios-test.ts

```

El test viaja con el archivo que prueba: si se mueve la
carpeta, se mueve todo junto.

Dos reglas. Una: dentro de `app/` **no** van tests —ahí todo tiene que ser una ruta—, así que las pantallas se prueban
siempre desde el `__tests__` de la raíz. Dos: ahí conviene nombrar por el **componente** ( `inicio-test.tsx` ), porque
con Expo Router todas las rutas se llaman `index.tsx` y `index-test.tsx` no diría cuál es.

<!-- página 11 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO
###### **Buscar como busca un usuario**

```
screen.getByText('Guardar');                     // por el texto visible
screen.getByLabelText('Cerrar');                 // por la etiqueta de accesibilidad
screen.getByPlaceholderText('Buscá un producto');
screen.getByRole('button', { name: 'Enviar' });

```

```
getBy…
```

Tiene que existir. Si no, el test falla.

```
queryBy…
```

Devuelve `null` si no está. Es el que se usa para
afirmar que algo no aparece.

```
findBy…
```

Espera a que aparezca. Para lo que llega de
forma asíncrona.

Fijate que ninguna de estas consultas menciona clases ni estructura interna. Buscan por lo que se ve — que es
justamente lo que hace que el test no se rompa al refactorizar.

<!-- página 12 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO **Interacción y espera**

```
import { render, screen, userEvent } from '@testing-library/react-native';
test('muestra el error si el campo está vacío', async () => {
  const usuario = userEvent.setup();
  render(<Formulario />);
  await usuario.press(screen.getByText('Enviar'));
  expect(await screen.findByText('El nombre es obligatorio')).toBeVisible();
});
```

Tres pasos, siempre los mismos: **preparar** (render), **actuar** (press, type) y **verificar** (expect). Si un test tuyo no se lee así, probablemente esté probando de más.

<!-- página 13 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO
###### **Tests de instantánea**

```
test('la tarjeta se ve igual', () => {
  const arbol = render(<Tarjeta producto={ejemplo} />).toJSON();
  expect(arbol).toMatchSnapshot();
});

```

**Qué hacen**

Guardan el árbol renderizado en un archivo y avisan si cambia. Se actualizan
con `jest -u` .

**Por qué usarlos poco**

Fallan ante cualquier cambio legítimo, y la reacción natural es actualizarlos

sin mirar. Cuando eso pasa, dejaron de servir. **Expo recomienda E2E antes**

**que instantáneas** para probar interfaz.

<!-- página 14 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO
###### **Correr los tests y medir cobertura**

FLUJOS, EN `PACKAGE.JSON`

```
"scripts": {
  "test": "jest --watch --changedSince=origin/main",
  "test:final": "jest",
  "test:snap": "jest -u"
}

```

`test` mientras programás: queda corriendo y sólo
prueba lo que cambiaste respecto de `main` .

`test:final` antes de entregar, corre todo. `test:snap`
regenera las instantáneas.

**Dónde ver el reporte**

Queda en `coverage/lcov-report/index.html` : se abre en el navegador y
muestra línea por línea qué se ejecutó. `coverage/**/*` va al `.gitignore` .

COBERTURA, EN LA CLAVE `JEST`

```
"jest": {
  "preset": "jest-expo",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/.expo/**"
  ]
}

```

**Para qué NO sirve**

Como número a maximizar. Sirve para lo contrario: encontrar el archivo que
nadie probó nunca. Un 90% de cobertura con tests que no verifican nada da
exactamente cero confianza.

<!-- página 15 -->

UNIDAD 2 · PARTE 2 · JEST Y JEST-EXPO **Un aviso sobre material viejo**

```
react-test-renderer 
```

**DEPRECADO**

Es lo que usan casi todos los tutoriales de testing en React Native anteriores a 2025. **No soporta React 19** , así que con nuestro SDK no sirve.

###### **`@testing-library/react-native`**

Es el reemplazo, y es lo que recomienda la documentación de Expo. Si tenías el otro instalado, sacalo.

Es el mismo patrón que ya vimos con Flipper y con `ANDROID_SDK_ROOT` : el ecosistema se mueve rápido y el primer resultado de búsqueda suele ir un par de años atrás. Verificar contra la documentación es parte del oficio.

<!-- página 16 -->

UNIDAD 2 · PARTE 3
#### **Integración y E2E**

Cuando hace falta probar más de una pieza.

<!-- página 17 -->

UNIDAD 2 · PARTE 3 · INTEGRACIÓN Y E2E **Probar la navegación**

```
import { renderRouter, screen } from 'expo-router/testing-library';
test('el detalle abre en la ruta correcta', () => {
  renderRouter(['index', 'productos/[id]'], { initialUrl: '/productos/12' });
  expect(screen).toHavePathname('/productos/12');
});
```

Expo Router arma las rutas leyendo el sistema de archivos, así que testearlo requiere simular ese sistema. `exporouter/testing-library` lo hace: le pasás una lista de rutas y te arma una app en memoria.

Los archivos de test **no van dentro de** **`app/`** : ahí todo tiene que ser una ruta o un layout. Van en `__tests__` .

<!-- página 18 -->

UNIDAD 2 · PARTE 3 · INTEGRACIÓN Y E2E
###### **E2E con Maestro**

```
# .maestro/inicio.yml
appId: ar.edu.uner.miapp
 -- - launchApp
- assertVisible: '¡Bienvenida!'
- tapOn: 'Explorar'
- assertVisible: 'Productos.*'

```

**Qué prueba**

La app instalada de verdad, en un emulador o un dispositivo, tocando la
pantalla como una persona.

**Cómo se corre**

`maestro test .maestro/inicio.yml` en tu máquina, o en la nube dentro de
un flujo de EAS Workflows, disparado por cada Pull Request.

Los flujos se escriben en YAML, no en JavaScript. Es a propósito: son cortos y los puede leer alguien que no
programa.

<!-- página 19 -->

UNIDAD 2 · PARTE 3 · INTEGRACIÓN Y E2E **`expo lint` : el test que no escribís**

```
npx expo lint
```

```
/src/components/hello-wave.tsx
  22:6  warning  React Hook useEffect has a missing dependency: 'rotateAnimation'
                 react-hooks/exhaustive-deps
✖ 1 problem (0 errors, 1 warning)
```

La primera vez que lo corrés, crea el `eslint.config.js` con la configuración de Expo. Y esa advertencia de arriba es exactamente el error de dependencias que vimos en la clase de ciclo de vida: **el linter lo encuentra solo** . Sumado a **TypeScript** , que ya verifica los tipos, tenés dos capas de control que no cuestan escribir un solo test.

<!-- página 20 -->

UNIDAD 2 · PARTE 3 · INTEGRACIÓN Y E2E
###### **TDD: escribir el test primero**

**TDD** —Test-Driven Development, desarrollo guiado por pruebas— da vuelta el orden de siempre: en lugar de escribir el
código y después probarlo, el test va primero y es el que **define** qué tiene que hacer el código. Lo que sigue tiene
sentido sólo si trabajás así.

**1 · Rojo**

Escribís el test de algo que todavía no existe. Lo

corrés y **falla** . Eso confirma que el test realmente
prueba algo.

**Dónde rinde**

Lógica pura: un cálculo, una validación,
transformar la respuesta de la API. Sabés qué
tiene que dar, así que podés escribirlo antes.

**2 · Verde**

Escribís el código mínimo que lo hace pasar. Sin
adornos ni casos que nadie pidió.

**Dónde estorba**

La interfaz. No sabés cómo va a quedar hasta
verla: escribir el test antes es adivinar.

**3 · Refactor**

Ahora sí lo ordenás. El test te avisa en el acto si
en el camino rompiste el comportamiento.

**Y con agentes**

Si el código lo escribe una IA, el test es lo que le

**define** qué pedís y lo que **verifica** que lo hizo.

El caso donde conviene siempre, aunque no hagan TDD para nada más: **cuando aparece un bug** . Antes de tocar el
código, escribí el test que lo reproduce y miralo fallar. Si no falla, todavía no entendiste el problema.

<!-- página 21 -->

UNIDAD 2 · PARTE 3 · INTEGRACIÓN Y E2E
###### **Por dónde empezar**

**1**
`expo lint` y TypeScript sin errores

**2**
Tests de la lógica propia: funciones puras

**3**
Un test por cada componente con
condiciones

**4**
Un E2E del camino principal de la app

Para el trabajo integrador, con los pasos 1 y 2 ya cambia bastante la calidad de la entrega. Nadie espera cobertura
total: se espera que lo que es fácil de romper esté cubierto.

<!-- página 22 -->

UNIDAD 2 · DOCUMENTACIÓN
#### **Documentación**

Todo lo de esta clase sale de acá.

<!-- página 23 -->

UNIDAD 2 · DOCUMENTACIÓN · DOCUMENTACIÓN
###### **Fuentes**

**Testing unitario con Jest**
La guía de Expo: instalación, estructura, cobertura

**React Native Testing Library**
Consultas, `userEvent`, buenas prácticas

**Testing de Expo Router**

`renderRouter` y sus matchers

```
docs.expo.dev/develop/unit-testing

callstack.github.io/react-native-testing-library

docs.expo.dev/router/reference/testing

```

**<u>E2E con Maestro en EAS</u>** <u>`docs.expo.dev/eas/workflows/examples/e2e-tests`</u>
**Maestro** `docs.maestro.dev`
Referencia de comandos de los flujos

**<u>Jest</u>** <u>`jestjs.io/docs/getting-started`</u>
**ESLint y Prettier en Expo** `docs.expo.dev/guides/using-eslint`

<!-- página 24 -->

UNIDAD 2
##### **Para llevarse**

Testeá **lo que el usuario percibe**, no cómo está hecho por dentro.

Muchos tests de unidad, algunos de integración, **pocos E2E** .

`expo lint` y TypeScript son la primera línea, y son gratis.

Un bug con test no vuelve. Sin test, vuelve.

---

<a id="doc-08"></a>

## 08. Unidad 2 — Depuración y rendimiento · Desarrollo para Móviles

> **Fuente:** `U02 — Depuración y rendimiento.pdf` · **Páginas:** 26 · **Palabras:** 2.073 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 2** **Depuración y rendimiento**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

React Native 0.86 · Expo SDK 57

<!-- página 2 -->

UNIDAD 2
###### **Qué vamos a ver**

**Objetivos** **Temas**

Dejar de depurar con `console.log` a ciegas.

Leer lo que pasa dentro de la app mientras corre.

Encontrar por qué algo va lento, con datos.

El menú de desarrollo

**React Native DevTools**

Frames, hilos y el Perf Monitor

Listas largas

Todo lo de hoy es **gratis** : viene con el proyecto y no hay que instalar nada. Es la clase con mejor relación entre lo que
cuesta y lo que ahorra.

<!-- página 3 -->

UNIDAD 2 · PARTE 1
##### **El menú de desarrollo**

La puerta de entrada a todo lo demás.

<!-- página 4 -->

UNIDAD 2 · PARTE 1 · EL MENÚ DE DESARROLLO
###### **Nada de esto existe en producción**

**Build de debug**
Menú de desarrollo, LogBox, DevTools, Fast Refresh. La app
hace mucho trabajo extra para poder avisarte de las cosas.

**Build de release**
Todo eso **está deshabilitado** . El código va optimizado y
minificado.

De acá sale la regla más importante de la segunda mitad de la clase: **el rendimiento se mide en release, nunca en**
**debug.** En debug la app es lenta a propósito, y medir ahí lleva a optimizar cosas que no son el problema.

<!-- página 5 -->

UNIDAD 2 · PARTE 1 · EL MENÚ DE DESARROLLO
###### **Cómo se abre**

**Desde la terminal**
Con el servidor de desarrollo corriendo, apretá `m` . Es la
forma más cómoda y la que menos falla.

Y `j` abre directamente las DevTools.

```
adb shell input keyevent 82    # Android, cuando sacudir no funciona

```

**Desde el dispositivo**

**Android:** sacudir, o `Ctrl` / `Cmd` + `M` en el emulador.

**iOS:** sacudir, tres dedos en la pantalla, o `Ctrl` + `Cmd` + `Z`
en el simulador.

<!-- página 6 -->

UNIDAD 2 · PARTE 1 · EL MENÚ DE DESARROLLO
###### **Qué trae el menú**

**Open DevTools**

Lo importante. Es la Parte 2 entera.

**Toggle element inspector**

Tocás un elemento en pantalla y te muestra qué componente es, con sus
estilos y su jerarquía.

**Toggle performance monitor**

El overlay con FPS, memoria y cantidad de vistas. Parte 3.

**Fast Refresh · Reload**

Fast Refresh está activado por defecto y conserva el estado. Recargar sólo
hace falta cuando algo quedó raro.

En Expo el menú lo proveen **Expo Go** y los development builds. Si armaste una build de release, el menú no está — y
eso es lo esperado.

<!-- página 7 -->

UNIDAD 2 · PARTE 2
##### **React Native DevTools**

El depurador que viene incluido.

<!-- página 8 -->

UNIDAD 2 · PARTE 2 · REACT NATIVE DEVTOOLS
###### **Qué es, y qué reemplazó**

Desde **React Native 0.76**, la experiencia de depuración oficial. Está construida sobre el frontend de Chrome DevTools,
así que si venís de web ya la conocés. Funciona en cualquier app que use **Hermes** .

**NO USAR**
**Lo que quedó atrás** **Cómo se abre**

**Flipper** Apretando `j` en la terminal, o Open DevTools en el menú de

desarrollo.

El depurador de Hermes en Chrome

**Flipper**

El depurador de Hermes en Chrome

`chrome://inspect`  - ya no está soportado

**Remote JS Debugging**, deprecado desde 0.73

Casi todos los tutoriales anteriores a 2025 explican Flipper o `chrome://inspect` . Si encontrás uno, cerralo.

<!-- página 9 -->

UNIDAD 2 · PARTE 2 · REACT NATIVE DEVTOOLS
###### **Console**

**Es una terminal conectada a tu app**

Podés escribir JavaScript y se ejecuta adentro de la aplicación. Si estás
parado en un breakpoint, se ejecuta en ese ámbito: ves y modificás las
variables locales.

**Trucos que valen**

Filtrar por texto o por nivel cuando hay mucho ruido.

**Preserve logs** para que sobrevivan a un reload.

Live Expressions para vigilar un valor sin llenar de logs.

Con las DevTools abiertas, **LogBox oculta todo salvo los errores fatales** . La consola de DevTools es la fuente de
verdad: LogBox tiene filtros propios que pueden esconderte cosas.

<!-- página 10 -->

UNIDAD 2 · PARTE 2 · REACT NATIVE DEVTOOLS
###### **Breakpoints**

```
function calcularTotal(items: Item[]) {
  debugger;                    // para la ejecución acá
  return items.reduce((a, i) => a + i.precio, 0);
}

```

**Dos formas**

Hacer clic en el número de línea en la pestaña Sources, o escribir

`debugger;` en el editor — Fast Refresh lo lleva al dispositivo al instante.

**Cuando está parado**

Mirá los paneles de la derecha: ámbito actual, pila de llamadas y expresiones
vigiladas. Ahí está la respuesta, no en el `console.log` que ibas a escribir.

Hay **breakpoints condicionales** y logpoints: paran sólo si se cumple una condición, o imprimen sin parar. Sirven para
el caso «falla recién en el ítem 400».

<!-- página 11 -->

UNIDAD 2 · PARTE 2 · REACT NATIVE DEVTOOLS
###### **Network**

**Qué muestra**
Cada request con sus tiempos, cabeceras enviadas y
recibidas, y una vista previa de la respuesta. La pestaña
Initiator te dice desde qué línea de tu código salió.

**La particularidad de Expo**
Expo muestra su propio panel **Expo Network**, que cubre más
orígenes de request. Requiere `expo-dev-client` - Expo Go.

Se registra automáticamente mientras las DevTools estén abiertas. Todavía no hay WebSockets, ni simulación de red
lenta, ni respuestas simuladas.

<!-- página 12 -->

UNIDAD 2 · PARTE 2 · REACT NATIVE DEVTOOLS
###### **Components**

**El árbol, en vivo**

Ves el árbol de componentes de React con sus props y su estado. Y podés

**editarlos en caliente** para probar sin tocar el código.

El botón «Select element» arriba a la izquierda: lo apretás, tocás algo en el
teléfono y te lleva al componente.

**Es React, no la pantalla**

El element inspector del menú te muestra la vista nativa. Este panel te

muestra **tu componente** . Son dos árboles distintos y conviene no
confundirlos.

Los componentes optimizados por **React Compiler** aparecen con una insignia «Memo ✨ ».

<!-- página 13 -->

UNIDAD 2 · PARTE 2 · REACT NATIVE DEVTOOLS
###### **El truco que más rinde**
Resaltar re-renderizados. En el engranaje de View Settings, activá «Highlight updates when components render».

**Qué vas a ver**
Un borde de color alrededor de cada componente cada vez
que se vuelve a renderizar. Escribís una letra en un campo de
texto y se te ilumina media pantalla.

**Por qué importa**
Los re-renderizados de más son la causa número uno de
lentitud en una app React. Y son invisibles hasta que los
pintás.

Es también la forma honesta de decidir si hace falta `useMemo` : primero mirás, después optimizás. Al revés, se agrega
complejidad sin evidencia.

<!-- página 14 -->

UNIDAD 2 · PARTE 2 · REACT NATIVE DEVTOOLS
###### **Profiler y Memory**

**React Profiler**
Grabás mientras usás la app y te muestra, en un gráfico de
llamas, cuánto tardó cada componente en renderizar y
cuántas veces lo hizo.

Sirve para responder «¿qué componente se está comiendo el
tiempo?».

**Memory**
Instantáneas del montón de memoria de JavaScript.
Comparar dos instantáneas separadas en el tiempo es cómo
se detecta una fuga.

Típicamente: el efecto sin limpieza de la clase de ciclo de
vida.

Los perfiles todavía **no se simbolizan con source maps** y sólo se pueden tomar en builds de debug. Sirven para
comparar, no para dar números absolutos.

<!-- página 15 -->

UNIDAD 2 · PARTE 3
##### **Rendimiento**

Qué significa «va lento», y cómo se mide.

<!-- página 16 -->

UNIDAD 2 · PARTE 3 · RENDIMIENTO
###### **16,67 milisegundos**
Los dispositivos muestran al menos 60 cuadros por segundo . Eso deja 16,67 ms para preparar cada cuadro. Si no llegás, se pierde el cuadro y la interfaz se siente trabada.
#### **60 16,67 12**

cuadros por segundo milisegundos por cuadro cuadros perdidos si algo tarda 200 ms

«Va lento» casi nunca es un problema general de la app: es **una operación concreta** que no entra en su presupuesto
de tiempo. El trabajo es encontrar cuál.

<!-- página 17 -->

UNIDAD 2 · PARTE 3 · RENDIMIENTO
###### **Los dos hilos**

**Hilo de JavaScript**
Tu lógica, los eventos táctiles, las llamadas a la API, el
renderizado de React. Si se traba, la app deja de responder a
los toques.

**Hilo de UI (principal)**
El dibujado nativo. Puede seguir andando aunque el de
JavaScript esté ocupado.

Por eso un `ScrollView` sigue desplazándose fluido con el hilo de JS trabado, y por eso las transiciones del **native**
**stack** se sienten mejores que las de un stack en JavaScript: corren del lado nativo. Es el mismo tema de la
arquitectura de ejecución de la clase anterior.

<!-- página 18 -->

UNIDAD 2 · PARTE 3 · RENDIMIENTO
###### **Perf Monitor**

Desde el menú de desarrollo: Toggle performance monitor. Un overlay chiquito sobre la app.

**RAM**

Memoria que ocupa el proceso.

**JSC / heap**

Memoria de JavaScript. Si sube y
nunca baja, hay una fuga.

**Views**

Cantidad de vistas en pantalla y en
el componente.

**UI · JS**

Los dos FPS, por separado. Es el
dato principal.

Es **una guía, no una medición** : corre dentro de la app y por lo tanto la afecta. Para números serios están las
herramientas de Android Studio y Xcode.

<!-- página 19 -->

UNIDAD 2 · PARTE 3 · RENDIMIENTO **Las dos trampas de siempre**

###### **Medir en debug**

En modo desarrollo el hilo de JavaScript hace mucho trabajo extra para poder darte advertencias útiles. La app es más lenta, y no tiene nada que ver con cómo va a andar publicada.

**`console.log` en el código que se publica** Cada llamada cuesta, y en un bucle o en un render cuesta mucho. Incluyendo los que dejaron tus dependencias.

```
npm i babel-plugin-transform-remove-console --save-dev
```

`console.*` de la build de release. Ese plugin, configurado para el entorno de producción, borra todas las llamadas a Conviene ponerlo aunque no uses ninguna.

<!-- página 20 -->

UNIDAD 2 · PARTE 3 · RENDIMIENTO
###### **Listas largas**

**`map()`** **dentro de un** **`ScrollView`**

Renderiza **todos** los elementos, estén o no en pantalla. Con
500 filas, la pantalla tarda segundos en abrir.

```
FlatList
```

Sólo renderiza lo visible y un poco más. Es lo que viene con
React Native y para la mayoría de los casos alcanza.

Si las filas tienen todas la misma altura, `getItemLayout` le evita a `FlatList` tener que medirlas y se nota bastante. Y
la `key` estable de la clase anterior también es un tema de rendimiento, no sólo de corrección.

<!-- página 21 -->

UNIDAD 2 · PARTE 3 · RENDIMIENTO
###### **Otros clásicos**

**Animaciones que trabajan en JS**

Con la API `Animated`, cada cuadro se calcula en el hilo de JavaScript salvo
que pongas `useNativeDriver: true` .

**`onPress`** **que hace mucho**

Si el trabajo pesado ocurre en el mismo cuadro que el efecto visual del
toque, el botón se siente muerto. Envolvelo en `requestAnimationFrame` .

**Redimensionar imágenes**

En iOS, cambiar `width` - `height` de una `Image` la recorta y reescala cada
vez. Animá con `transform: [{ scale }]` .

**Texto transparente sobre imagen**

En Android obliga a recomponer en cada cuadro.

`renderToHardwareTextureAndroid` ayuda — con moderación, porque come
memoria.

<!-- página 22 -->

UNIDAD 2 · PARTE 3 · RENDIMIENTO
###### **El orden correcto**

**1 · Reproducir**
En un dispositivo real y en build de
release

**2 · Medir**
Perf Monitor, Profiler, resaltado de rerenderizados

**3 · Cambiar**
Una sola cosa por vez

**4 · Volver a medir**
¿Mejoró? Si no, revertí

Optimizar sin medir agrega complejidad y casi nunca velocidad. Un `useMemo` puesto «por las dudas» es código que
alguien va a tener que entender después, a cambio de nada.

<!-- página 23 -->

UNIDAD 2 · DOCUMENTACIÓN
##### **Documentación**

Todo lo de esta clase sale de acá. Está en inglés y se mantiene al día.

<!-- página 24 -->

UNIDAD 2 · DOCUMENTACIÓN · DOCUMENTACIÓN
###### **Depuración**

**Depuración, conceptos básicos**
Menú de desarrollo, LogBox, Perf Monitor

**React Native DevTools**
Guía completa de todos los paneles

**Herramientas de depuración en Expo**
El panel Expo Network, VS Code, Rozenite

```
reactnative.dev/docs/debugging

reactnative.dev/docs/react-native-devtools

docs.expo.dev/debugging/tools

```

**<u>Errores y advertencias</u>** <u>`docs.expo.dev/debugging/errors-and-warnings`</u>
**Chrome DevTools** `developer.chrome.com/docs/devtools`
La base sobre la que está construido todo

<!-- página 25 -->

UNIDAD 2 · DOCUMENTACIÓN · DOCUMENTACIÓN **Rendimiento**

###### **Panorama de rendimiento**

```
reactnative.dev/docs/performance
```

Cuadros, hilos y causas frecuentes

###### **Optimizar** **`FlatList` Perfilado React Profiler**

```
reactnative.dev/docs/optimizing-flatlist-configuration
reactnative.dev/docs/profiling
```

```
react.dev/reference/dev-tools/react-performance-tracks
```

Las páginas de `reactnative.dev` están versionadas: verificá que arriba a la izquierda diga **0.86** , que es la versión de nuestro SDK.

<!-- página 26 -->

UNIDAD 2
###### **Para llevarse**

`j` en la terminal abre las DevTools. Es todo lo que hay que recordar para empezar.

Un **breakpoint** te muestra más que veinte `console.log` .

**Medir antes de optimizar**, y siempre en release.

Lo que sigue: **testing**  - cómo evitar que el error vuelva.

---

<a id="doc-09"></a>

## 09. Navegación — Expo Router · Desarrollo para Móviles

> **Fuente:** `U03 T01 - Navegación - Expo Router.pdf` · **Páginas:** 22 · **Palabras:** 2.345 · **Imágenes:** 13

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Navegación** **con Expo Router**

Unidad 3 · Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

<!-- página 2 -->

UNIDAD 3 · NAVEGACIÓN **El problema**

Tenés una pantalla. Andás bien. Ahora necesitás **otra** . Y volver. Y que el botón «atrás» del teléfono haga lo correcto. Y que si alguien abre un enlace a un producto, la app arranque ahí.

En la web eso lo resuelven la URL y el navegador web. En una app **no hay navegador web** : hay que construir esa parte.

![Imagen de la página 2](assets/u03-t01-navegacion-expo-router/p0002-03.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>Productos<br><!-- End of picture text -->

¿Y ahora cómo llego al detalle?

<!-- página 3 -->

UNIDAD 3 · NAVEGACIÓN
##### **Dos formas de resolverlo**

REACT NAVIGATION · REGISTRÁS CADA
PANTALLA

```
const Stack = createNativeStackNavigator();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Inicio"  component={Inicio} />
    <Stack.Screen name="Detalle" component={Detalle} />
  </Stack.Navigator>
</NavigationContainer>

navigation.navigate('Detalle', { id: 42 });

```

EXPO ROUTER · LA CARPETA ES LA
CONFIGURACIÓN

```
src/app/

```

**`_layout.tsx`** declara el <Stack />
```
  index.tsx → /
  detalle.tsx → /detalle

 <Link href="/detalle?id=42">Ver detalle</Link>

```

Creás un archivo y ya existe la ruta. No hay lugar
central donde registrar nada.

**No compiten: Expo Router está construido encima de React Navigation.** Usamos Expo Router —viene en la
plantilla, trae enlaces profundos (deep links) y web sin trabajo extra— y como por debajo es React Navigation, su
documentación te sirve igual.

<!-- página 4 -->

UNIDAD 3 · NAVEGACIÓN
##### **La carpeta es el mapa**

Antes de ver los navegadores, la regla que ordena todo lo demás: en Expo Router **cada archivo de** **`src/app/`** **es una**
**ruta** . No hay ningún lugar donde registrarlas.

```
src/app/
```

**`_layout.tsx`** envuelve todo
```
  index.tsx → /
```

**`(tabs)/`** grupo: no sale en la URL
```
    perfil.tsx → /perfil
  producto/
    [id].tsx → /producto/42
  docs/
    [...ruta].tsx → /docs/a/b/c
```

**`+not-found.tsx`** cualquier ruta inválida

`_layout.tsx` - el navegador (router) de esa carpeta.

`[id]` - un parámetro.

`[...ruta]` - captura el resto completo.

`(grupo)` - organiza sin tocar la URL.

`+not-found` - la ruta que no existe.

Como cada pantalla tiene URL real, los deep links y la
versión web salen sin configurar nada.

<!-- página 5 -->

UNIDAD 3 · NAVEGACIÓN **Tres formas de moverse**

![Imagen de la página 5](assets/u03-t01-navegacion-expo-router/p0005-01.png)

<!-- Start of picture text -->
9:41 ▮▮▮ 9:41 ▮▮▮ 9:41 ▮▮▮<br>←   Detalle ☰<br>Inicio Buscar Perfil<br>Stack Tabs Drawer<br><!-- End of picture text -->

<!-- página 6 -->

UNIDAD 3 · NAVEGACIÓN

#### **Stack: una pantalla sobre otra**

![Imagen de la página 6](assets/u03-t01-navegacion-expo-router/p0006-02.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>Productos<br><!-- End of picture text -->

###### Empezás con una pantalla: la lista.

<!-- página 7 -->

UNIDAD 3 · NAVEGACIÓN

#### **Stack: una pantalla sobre otra**

![Imagen de la página 7](assets/u03-t01-navegacion-expo-router/p0007-02.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>9:41 ▮▮▮<br>9:41 ←   Editar ▮▮▮<br>←   Detalle<br>Productos<br><!-- End of picture text -->

Cada pantalla nueva **tapa** a la anterior — no la destruye. Por eso «atrás» siempre sabe adónde volver.

<!-- página 8 -->

UNIDAD 3 · NAVEGACIÓN
##### **Stack: el código**

La **carpeta** declara qué pantallas existen; el `_layout.tsx` declara **cómo se ven** .

LA CARPETA
```
src/app/

```

**`_layout.tsx`** el <Stack />
```
  index.tsx → /
  detalle.tsx → /detalle
  carrito.tsx → /carrito
```

`detalle.tsx` no aparece en el layout y funciona igual:
hereda las `screenOptions` . Sólo se nombra lo que
necesita algo distinto.

SRC/APP/_LAYOUT.TSX

```
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0B3A5D' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index"
        options={{ title: 'Productos' }} />
      <Stack.Screen name="carrito"
        options={{ presentation: 'modal' }} />
    </Stack>
  );
}

```

```
screenOptions
```

Se aplica a **todas** las pantallas del
Stack.

```
options
```

Sólo a esa pantalla. Pisa lo
anterior.

```
presentation
```

`'modal'` entra desde abajo:
carrito, filtro, formulario corto.

```
headerShown
```

En `false`, sin header. El botón de
volver aparece solo.

<!-- página 9 -->

UNIDAD 3 · NAVEGACIÓN
##### **El header**

No es parte de tu pantalla: lo dibuja el navegador (router). Vos le pasás opciones.

← **Zapatillas running** ♡

tu pantalla empieza acá

automático
```
                         headerBackTitle

// El título depende de datos que todavía no llegaron
export default function Producto() {
 const { data } = useProducto(id);
 return (
<>
<Stack.Screen options={{ title: data?.nombre ?? 'Cargando…' }} />
<Vista producto={data} />
</>
);
}

```

```
title headerRight

```

<!-- página 10 -->

UNIDAD 3 · NAVEGACIÓN
##### **Opciones del header**

Todo lo que se ve en esa barra sale de `options` : el texto, los colores y los botones. Los botones son componentes
tuyos, así que pueden tener ícono, `onPress` y etiqueta de accesibilidad.

UN HEADER CON ACCIÓN

```
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

<Stack.Screen options={{
  title: 'Zapatillas running',
  headerStyle: { backgroundColor: '#0B3A5D' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700' },
  headerRight: ({ tintColor }) => (
    <Pressable onPress={compartir} hitSlop={12}
               accessibilityLabel="Compartir">
      <Ionicons name="share-outline"
                size={22} color={tintColor} />
    </Pressable>
  ),
}} />

```

EL REPERTORIO

texto `title` - `headerTitle`, que también acepta un
<u>componente — un logo, por ejemplo</u>
colores `headerStyle` el fondo · `headerTintColor` la flecha y el
<u>título ·</u> `headerTitleStyle` <u>la tipografía</u>
acciones `headerRight` y `headerLeft` : devuelven un componente y
reciben `tintColor`

forma `headerTransparent` flota sobre el contenido ·
`headerShadowVisible` saca la línea de abajo

buscador `headerSearchBarOptions` pone el buscador nativo del
sistema

`headerRight` recibe `tintColor` : si se lo pasás al ícono, el botón acompaña solo el color del header y no hay que
repetir el valor en dos lugares.

<!-- página 11 -->

UNIDAD 3 · NAVEGACIÓN
##### **Apagar el header**

El header lo pone el navegador (router), así que también se saca desde ahí: `headerShown: false` . Hay tres situaciones
en las que estorba.

**Pantalla completa**

Una portada, un onboarding, un login, un mapa,
una galería de fotos: el contenido tiene que llegar
hasta el borde.

**Header propio**

El diseño pide un buscador, un avatar o un
degradé. Lo que el navegador no sabe dibujar, lo
dibujás vos.

**Header doble**

Dos navegadores anidados dibujan uno cada
uno. Se elige cuál manda y se apaga el otro —
es el caso que vemos en «Anidar».

```
<Stack screenOptions={{ headerShown: false }}>              // a todas
<Stack.Screen name="login" options={{ headerShown: false }} />  // a una, desde el layout
<Stack.Screen options={{ headerShown: false }} />               // a una, desde la pantalla

```

<!-- página 12 -->

###### UNIDAD 3 · NAVEGACIÓN

#### **Sin header, lo reponés vos**

![Imagen de la página 12](assets/u03-t01-navegacion-expo-router/p0012-02.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br><!-- End of picture text -->

![Imagen de la página 12](assets/u03-t01-navegacion-expo-router/p0012-03.png)

<!-- Start of picture text -->
←   Detalle<br><!-- End of picture text -->

![Imagen de la página 12](assets/u03-t01-navegacion-expo-router/p0012-04.png)

Con header: empieza donde debe

![Imagen de la página 12](assets/u03-t01-navegacion-expo-router/p0012-06.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br><!-- End of picture text -->

`headerShown: false` sin nada más

El header no era sólo una barra: te venía resolviendo tres cosas. Al apagarlo, **pasan a ser tuyas** .

**La safe area de arriba.** Sin header, tu contenido arranca debajo del reloj — es el mismo problema del edge-to-edge.

**El botón de volver** , con su etiqueta para el lector de pantalla.

**El título** de la pantalla.

```
const insets = useSafeAreaInsets();
```

```
<View style={{ paddingTop: insets.top }}>
  <Pressable onPress={() => router.back()}
             accessibilityLabel="Volver">…
```

<!-- página 13 -->

#### UNIDAD 3 · NAVEGACIÓN **Tabs apretá las pestañas**

![Imagen de la página 13](assets/u03-t01-navegacion-expo-router/p0013-01.png)

<!-- Start of picture text -->
9:41 ▮▮▮ ▮<br>Tienda UNER<br>Inicio Buscar Perfil<br><!-- End of picture text -->

Secciones **en paralelo** : el usuario salta entre ellas. Cada pestaña **recuerda dónde estaba** . Si dejaste un detalle abierto en «Inicio», al volver sigue ahí.

El ícono y el rótulo salen de `tabBarIcon` y `title` . Tres a cinco. Con más, no entran los rótulos.

Si dos secciones se visitan en secuencia y no en paralelo, no son pestañas: son un Stack.

<!-- página 14 -->

UNIDAD 3 · NAVEGACIÓN
##### **Tabs: el código**

SRC/APP/(TABS)/_LAYOUT.TSX

```
import { Tabs } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0B5394' }}>
      <Tabs.Screen name="index" options={{
        title: 'Inicio',
        tabBarIcon: ({ color }) =>
          <Ionicons name="home" size={22} color={color} />,
      }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}

```

LOS PARÉNTESIS
```
src/app/
```

**`_layout.tsx`** Stack raíz
```
(tabs)/

```

**`_layout.tsx`** las pestañas
```
     index.tsx → /

     perfil.tsx → /perfil
```

`(tabs)` es un **grupo** : organiza los archivos sin
aparecer en la URL. Sin los paréntesis la ruta sería

`/tabs/perfil` .

Los íconos vienen de `@react-native-vector-icons`, **un paquete por familia** : `npx expo install @react-native-`
`vector-icons/ionicons` . El `@expo/vector-icons` que van a ver en todos los tutoriales **QUEDA DEPRECADO** .

<!-- página 15 -->

###### UNIDAD 3 · NAVEGACIÓN

#### **Drawer: el menú lateral**

```
// src/app/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
```

```
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index"
```

```
          options={{ drawerLabel: 'Inicio', title: 'Tienda' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
```

###### **`src/app/`**

**`_layout.tsx`** el <Drawer />

```
index.tsx→ /
pedidos.tsx→ /pedidos
```

![Imagen de la página 15](assets/u03-t01-navegacion-expo-router/p0015-08.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>☰   Tienda<br><!-- End of picture text -->

Se abre con el gesto o con el botón ☰

A diferencia de Stack y Tabs, **el Drawer necesita instalación** : `npx expo install @react-navigation/drawer reactnative-gesture-handler react-native-reanimated` — y envolver todo en `GestureHandlerRootView` .

<!-- página 16 -->

###### UNIDAD 3 · NAVEGACIÓN

#### **Los que faltan**

![Imagen de la página 16](assets/u03-t01-navegacion-expo-router/p0016-02.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>Productos<br><!-- End of picture text -->

##### Modal

No es un navegador aparte: un `Stack.Screen` con `presentation: 'modal'` . Entra desde abajo, la pantalla

de atrás queda visible.

Carrito, filtros, un formulario corto.

![Imagen de la página 16](assets/u03-t01-navegacion-expo-router/p0016-07.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>Mercado<br>Ofertas Nuevos Todos<br><!-- End of picture text -->

##### Pestañas superiores

Las que se pasan deslizando, típicas de Android. `@react-`

`navigation/material-top-tabs` .

Para subdividir una sección, no como navegación principal.

<!-- página 17 -->

UNIDAD 3 · NAVEGACIÓN
##### **<Slot /> : el layout que no navega**

```
// src/app/_layout.tsx
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <SesionProvider>
      <TemaProvider>
        <Slot />
      </TemaProvider>
    </SesionProvider>
  );
}

```

Un `_layout.tsx` **no recibe** `children` . `<Slot />` es el
agujero donde Expo Router dibuja la ruta hija que
corresponda.

```
src/app/
```

**`_layout.tsx`** proveedores + <Slot />
```
(tabs)/
```

**`_layout.tsx`** acá sí navega

**Cuándo usarlo**

Layout raíz que sólo envuelve **proveedores** : sesión, tema,
cliente de datos.

Cuando hay que **esperar algo** antes de mostrar la app —
fuentes, sesión — y recién ahí sacar el splash.

Cuando la navegación real vive **más abajo**, dentro de un
grupo como `(tabs)` .

Cuando dibujás vos la barra de navegación.

**Cuándo no**

Si querés header, transición o gesto de volver → `Stack` .

Si la pantalla anterior tiene que **seguir viva** : Slot muestra
una sola ruta y desmonta la anterior.

<!-- página 18 -->

###### UNIDAD 3 · NAVEGACIÓN

#### **Anidar: un Stack por pestaña**

```
src/app/
```

**`_layout.tsx`** Stack raíz

```
(tabs)/
```

**`_layout.tsx`** Tabs

###### **`inicio/`**

**`_layout.tsx`** Stack propio

`index.tsx` la lista

**`[id].tsx`** el detalle

```
perfil.tsx
```

Es la estructura de casi toda app real: cada sección con

![Imagen de la página 18](assets/u03-t01-navegacion-expo-router/p0018-12.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>Inicio<br>←   Detalle<br>Inicio Perfil<br><!-- End of picture text -->

**El error clásico:** dos headers

su propia historia.

El Stack raíz dibuja uno y el de la pestaña dibuja otro. Se apaga el de arriba: `<Stack.Screen name="(tabs)" options= {{ headerShown: false }} />`

<!-- página 19 -->

###### UNIDAD 3 · NAVEGACIÓN

#### **Moverse**

```
import { Link, router } from 'expo-router';
// Declarativo — preferilo: es accesible y se puede mantener apretado
<Link href="/perfil">Ver perfil</Link>
<Link href={`/producto/${id}`}>Ver producto</Link>
<Link href="/ayuda" asChild>
  <MiBotón>Ayuda</MiBotón>          {/* tu propio componente */}
</Link>
// Imperativo — cuando navegás por una acción
router.push('/perfil');       // apila: queda el botón de volver
router.replace('/inicio');    // reemplaza: sin vuelta atrás
router.back();
router.dismiss();             // cierra un modal
```

Después de un login va `replace` , no `push` : nadie quiere que «atrás» devuelva al formulario de una sesión ya iniciada.

<!-- página 20 -->

UNIDAD 3 · NAVEGACIÓN
##### **Parámetros**

EN LA RUTA
```
 src/app/producto/
    [id].tsx → /producto/42

   import { useLocalSearchParams, Stack } from 'expo-router';
   import { Text } from 'react-native';

   export default function Producto() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const idNum = Number(id);    // '42' → 42

    return (
   <>
   <Stack.Screen options={{ title: `Producto ${id}` }} />
   <Text>Mostrando el producto {idNum}</Text>
   </>
   );
   }

```

CÓMO SE LE PASAN

```
import { Link, router, useLocalSearchParams } from 'expo-router';

// en la ruta  →  /producto/42
<Link href={`/producto/${producto.id}`}>Ver</Link>
router.push(`/producto/${producto.id}`);

// como query  →  /buscar?q=zapatillas&orden=precio
<Link href={{
  pathname: '/buscar',
  params: { q: 'zapatillas', orden: 'precio' },
}}>Buscar</Link>

// y del otro lado, en src/app/buscar.tsx
const { q, orden } = useLocalSearchParams<{
  q?: string; orden?: string;
}>();

```

**Todo parámetro llega como texto.** Ese `id` es `'42'`, no `42` . Comparado con `===` contra un número, no coincide
nunca — y el código parece correcto.

<!-- página 21 -->

UNIDAD 3 · NAVEGACIÓN

#### **Rutas protegidas**

```
src/app/
```

**`_layout.tsx`** decide qué rutas existen `login.tsx → /login` **`(privado)/`** sólo con sesión `perfil.tsx → /perfil export default function Layout() { const { sesion } = useSesion(); return ( <Stack> <Stack.Protected guard={!!sesion}> <Stack.Screen name="(privado)" /> </Stack.Protected> <Stack.Protected guard={!sesion}> <Stack.Screen name="login" /> </Stack.Protected> </Stack> ); }`

Si el `guard` es falso, **la ruta no existe** : no se llega ni escribiendo la URL. Mejor que redirigir desde adentro, que alcanza a mostrar la pantalla privada un instante.

<!-- página 22 -->

UNIDAD 3 · NAVEGACIÓN **Documentación**

###### **Expo Router**

```
docs.expo.dev/router/introduction
```

**React Navigation** — las opciones avanzadas de navegadores y headers se documentan acá `reactnavigation.org/docs/getting-started`

**Íconos** — instalación, tipografía de íconos propia y el componente botón `docs.expo.dev/guides/icons`

el catálogo para buscar el nombre de cada ícono: `oblador.github.io/react-native-vector-icons`

---

<a id="doc-10"></a>

## 10. Unidad 3 — Interfaz y navegación · Desarrollo para Móviles

> **Fuente:** `U03 T02 - Interfaz y navegación.pdf` · **Páginas:** 43 · **Palabras:** 4.512 · **Imágenes:** 6

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 3** **Diseño de interfaz** **y navegación**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 3
###### **Qué vamos a ver**

**Objetivos** **Partes**
Construir pantallas con los componentes nativos. Construcción de pantallas

Dar estilo y tema a la aplicación.

Adaptarla a distintos tamaños y orientaciones.

Que se pueda usar sin mirar la pantalla.

Navegar entre pantallas y proteger rutas.

Estilos, temas y diseño responsivo

Gestos y animaciones

Accesibilidad

Navegación (deck aparte)

<!-- página 3 -->

UNIDAD 3 · PARTE 1
#### **Construcción de pantallas**

Los componentes con los que se arma todo lo demás.

<!-- página 4 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS
###### **Los componentes que vas a usar siempre**

```
View
```

El contenedor. Equivale al

`<div>`, pero ya viene en
Flexbox con dirección

`column` .

```
Text
```

Todo texto visible va
adentro. No se puede poner
texto suelto en una `View` .

```
TextInput
```

Entrada de datos. Sin

`form` : el estado lo manejás
vos.

```
Pressable
```

Cualquier cosa que
responda al toque.
Reemplaza a los viejos

`Touchable*` .

El error más común de quien viene de web: **texto fuera de un** **`<Text>`** . React Native lanza un error en tiempo de
ejecución, no lo ignora como el navegador.

<!-- página 5 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS **`View` · el contenedor**

Mapea directo al contenedor nativo — `UIView` en iOS, `android.view` en Android — y admite de cero a muchos hijos de cualquier tipo. Ya viene en Flexbox con dirección `column` ; el detalle de estilos lo vemos en la Parte 2. Lo propio de `View` son estas cuatro props.

`onLayout` avisa la posición y el tamaño reales apenas se calculan: es la forma de medir algo en lugar de suponerlo. `hitSlop` agranda el área sensible al toque sin agrandar la vista. Nunca se pasa de los límites del padre. <u>`pointerEvents`</u> `none` la vuelve intocable, `box-none` deja pasar el toque a los hijos, `box-only` al revés. `role` qué es y cómo se llama para el lector de pantalla. Vuelve en la Parte 4. y

```
accessibilityLabel
```

React Native **borra del árbol nativo las** **`View` que sólo aportan layout** . Por eso ponerle `testID` o `nativeID` desactiva esa optimización — y por eso a veces una vista no aparece en el inspector nativo.

<!-- página 6 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS
###### **Text · mostrar texto**

Es el único que acepta strings. Usa **layout de texto**, no Flexbox: no se comporta como una caja, se corta al final de la
línea. Y anidar `Text` adentro de `Text` es la forma de mezclar formatos en un mismo párrafo — por debajo se aplana
en un solo texto con atributos.

```
<Text style={e.parrafo}>
  <Text style={{ fontWeight: 'bold' }}>Total: </Text>
  $1.250 con<Text style={{ color: 'crimson' }}> 20% off</Text>
</Text>

<Text numberOfLines={2} ellipsizeMode="tail">{descripcion}</Text>
<Text onPress={abrirTerminos}>Ver términos</Text>

```

`allowFontScaling` viene en `true` : si la persona agrandó la letra del sistema, tu texto crece. **No lo apagues**  - si te
rompe el diseño, acotalo con `maxFontSizeMultiplier` .

<!-- página 7 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS **`TextInput` · entrada de datos**

Es un **componente controlado** : el valor vive en tu estado y se lo devolvés por `value` . `onChangeText` te entrega el texto ya listo, sin evento de por medio.

```
<TextInput value={texto} onChangeText={setTexto}
           placeholder="Escribí algo" />
```

`keyboardType` <u>qué teclado abre:</u> `email-address` <u>,</u> `numeric` <u>,</u> <u>`phone-pad`</u> … `autoCapitalize` viene en `sentences` : para mails y usuarios va `none` . `autoComplete` <u>ya es multiplataforma; es lo que hace que el gestor de contraseñas ofrezca completar.</u> `secureTextEntry` oculta lo escrito. No se combina con `multiline` . `returnKeyType` qué dice la tecla de retorno y qué pasa al tocarla — así se encadenan campos.

qué dice la tecla de retorno y qué pasa al tocarla — así se encadenan campos.

- + `onSubmitEditing`

`blurOnSubmit` quedó **deprecado** : ahora es `submitBehavior` , con `'submit'` , `'blurAndSubmit'` o `'newline'` . Buena parte de los tutoriales todavía usa el viejo.

<!-- página 8 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **`Pressable` · responder al toque**

Envuelve cualquier cosa y detecta las distintas etapas del toque. Reemplaza a los viejos `Touchable*` , que ya no conviene usar.

```
<Pressable
  onPress={agregar}
  onLongPress={mostrarOpciones}
  hitSlop={10}
  android_ripple={{ color: '#DDD' }}
  style={({ pressed }) => [e.boton, pressed && e.botonTocado]}
>
  {({ pressed }) => (
```

```
    <Text>{pressed ? 'Agregando…' : 'Agregar'}</Text>
  )}
</Pressable>
```

`style` y `children` pueden ser **funciones** que reciben `{ pressed }` : ahí se dibuja el estado de presionado, sin manejar estado propio.

<!-- página 9 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **Edge-to-edge**

###### **OBLIGATORIO DESDE SDK 54**

Desde Android 15 y Expo SDK 54, **tu app dibuja debajo de la barra de estado y de la barra de navegación** . No se puede desactivar.

![Imagen de la página 9](assets/u03-t02-interfaz-y-navegacion/p0009-04.png)

<!-- Start of picture text -->
9:41 ▮▮▮ 9:41 ▮▮▮<br>Mis productos<br>Mis productos<br><!-- End of picture text -->

Sin manejarlo: el reloj se superpone al título Con `insets` : el contenido arranca donde debe

`react-native-safe-area-context` ya viene instalado si usás Expo Router. **El error típico es usarlo sólo en la pantalla raíz:** hay que aplicarlo en cada pantalla que toque un borde.

<!-- página 10 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS
###### **Safe area en la práctica**

Dos formas, misma librería: `react-native-safe-area-context` .

`SAFEAREAVIEW` - EL COMPONENTE

```
import { SafeAreaView }
  from 'react-native-safe-area-context';

<SafeAreaView
  style={{ flex: 1 }}
  edges={['top', 'bottom']}
>
  <Text>Contenido</Text>
</SafeAreaView>

```

Envuelve y aplica el margen solo. Con `edges` elegís
qué lados. Es lo que vas a usar casi siempre.

`USESAFEAREAINSETS` - EL HOOK

```
import { useSafeAreaInsets }
  from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();

<FlatList
  contentContainerStyle={{
    paddingBottom: insets.bottom,
  }}
/>

```

Te da los números y decidís dónde aplicarlos.
Necesario cuando el margen no va en el contenedor.

**Cuidado con el import:** también existe un `SafeAreaView` en `react-native`, pero sólo funciona en iOS y está en
desuso. **Siempre el de** **`react-native-safe-area-context`** **.**

<!-- página 11 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS **Desplazar contenido:** **`ScrollView`**

Una `View` no se desplaza: lo que no entra en pantalla queda cortado. `ScrollView` es el contenedor que sí desplaza, y sirve para **cualquier contenido** — un formulario largo, una pantalla de detalle, un carrusel con `horizontal` .

```
<ScrollView
```

```
  style={{ flex: 1 }}
  contentContainerStyle={{ padding: 16, gap: 12 }}
>
```

- `<Image source={{ uri: producto.foto }} style={estilos.foto} />`

- `<Text style={estilos.titulo}>{producto.nombre}</Text>`

```
<Text>{producto.descripcion}</Text>
```

- `<Pressable onPress={agregar}><Text>Agregar</Text></Pressable>`

```
</ScrollView>
```

Renderiza **todos** sus hijos de una, se vean o no. Va bien con contenido variado y de cantidad conocida; para una **colección que puede crecer** no alcanza, y ahí entran las listas de las próximas dos slides.

<!-- página 12 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS **Listas ·** **`FlatList`**

Para una **colección de elementos** hay dos componentes, `FlatList` y `SectionList` . Los dos **renderizan sólo lo que se ve** (y un poco más): montan y desmontan las filas a medida que desplazás. `FlatList` es el que vas a usar casi siempre.

```
<FlatList
```

```
data={productos}
keyExtractor={item => item.id}
renderItem={({ item }) => <Tarjeta producto={item} />}
```

```
ListEmptyComponent={<Vacio />}
```

```
onEndReached={cargarMas}
```

- `refreshControl={`

- `<RefreshControl refreshing={cargando} onRefresh={recargar} />`

- `}`

```
/>
```

Poner una lista larga adentro de un `ScrollView` es el error de rendimiento más frecuente: se renderizan los mil elementos aunque se vean diez. Tampoco anides una `FlatList` dentro de un `ScrollView` vertical: pierde la virtualización y React Native te lo avisa por consola.

<!-- página 13 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS **Listas ·** **`SectionList`**

La misma virtualización que `FlatList` , pero los datos vienen partidos en grupos y cada grupo lleva su encabezado.

```
const secciones = [
  { title: 'Bebidas', data: [agua, jugo] },
  { title: 'Snacks',  data: [mani, papas] },
];
```

```
<SectionList
  sections={secciones}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Tarjeta producto={item} />}
  renderSectionHeader={({ section }) => (
```

- `<Text style={estilos.encabezado}>{section.title}</Text>`

```
  )}
  stickySectionHeadersEnabled
/>
```

**Cuál uso:** contenido variado que no entra en pantalla → `ScrollView` ; colección que puede crecer → `FlatList` ; colección con encabezados de grupo → `SectionList` .

<!-- página 14 -->

###### UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **Imágenes**

Para renderizar imágenes en Expo se utiliza **`expo-image`** . Lo mínimo son tres props — `source` (de dónde sale), `style` (qué lugar ocupa) y `contentFit` (cómo se acomoda adentro de ese cuadro).

```
import { Image } from 'expo-image';
```

```
<Image source="https://ejemplo.com/foto.jpg"
       style={{ width: '100%', height: 200 }}
       contentFit="cover" transition={200} />
```

![Imagen de la página 14](assets/u03-t02-interfaz-y-navegacion/p0014-05.png)

<!-- Start of picture text -->
9:41 ▮▮▮ 9:41 ▮▮▮<br><!-- End of picture text -->

![Imagen de la página 14](assets/u03-t02-interfaz-y-navegacion/p0014-06.png)

<!-- Start of picture text -->
cover  · llena y recorta contain  · entra entera, deja aire<br><!-- End of picture text -->

![Imagen de la página 14](assets/u03-t02-interfaz-y-navegacion/p0014-07.png)

<!-- Start of picture text -->
Además<br>Caché  en disco y memoria sin<br>configurar, y soporte de  WebP,<br>AVIF y SVG .<br><!-- End of picture text -->

**Toda imagen necesita dimensiones.** A diferencia de la web, React Native no reserva espacio automáticamente mientras carga: sin ancho y alto, la imagen no aparece.

<!-- página 15 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **Image: las props que vas a usar**

|**Prop**|**Valores**|**Para qué**|
|---|---|---|
|`source`|URL,<br>`require(…)`,<br>`{'{'} uri {'}'}`|de dónde sale la imagen|
|`contentFit`|**cover**· contain · fill · none · scale-down|cómo se acomoda en el cuadro|
|`contentPosition`|**center**·<br>`'top right'`·<br>`{'{'} top: 8 {'}'}`|desdequépunto recorta|
|`transition`|número en ms, o<br>`{'{'} duration, effect {'}'}`|fundido al aparecer o cambiar|
|`placeholder`|blurhash o thumbhash|qué se ve mientras carga|
|`cachePolicy`|none · disk · memory· memory-disk|dónde seguarda|
|`priority`|low ·**normal**· high|orden de descarga|
|`recyclingKey`|texto|limpia al reciclar filas de una lista|
|`tintColor`|un color|tiñe la figura — para íconos|
|`blurRadius`|número(**0**= sin desenfoque)|desenfoca|
|`alt`|texto|lo que lee el lector de pantalla|

En **negrita** , el valor por defecto. `contentFit` y `contentPosition` son `object-fit` y `object-position` de CSS con otro nombre — ya los conocés.

<!-- página 16 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **Un formulario sin** **`<form>`**

No hay `<form>` , ni evento `submit` , ni `name` , ni `FormData` . Hay campos controlados sueltos y un estado que los junta; el botón, cuando lo tocan, llama a tu función con lo que haya ahí.

```
const [email, setEmail] = useState('');
const [clave, setClave] = useState('');
```

```
<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="tu@email.com"
  keyboardType="email-address"
  autoCapitalize="none"
  autoComplete="email"
/>
```

- `<TextInput value={clave} onChangeText={setClave} secureTextEntry />`

- `<Pressable onPress={() => ingresar(email, clave)}>`

- `<Text>Ingresar</Text> </Pressable>`

Un `useState` por campo funciona bien hasta tres o cuatro. Más que eso, o con reglas de validación, el código empieza a repetirse — y eso es exactamente lo que resuelve la slide que sigue.

<!-- página 17 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **Formularios · a mano**

Dos campos con validación, sin librerías: un estado por campo, un objeto de errores y una función que valida antes de enviar.

```
import { useState } from 'react';
import { TextInput, Text, Pressable } from 'react-native';
```

```
const [email, setEmail] = useState('');
const [clave, setClave] = useState('');
const [errores, setErrores] = useState({});
```

```
const enviar = () => {
  const e = {};
  if (!email.includes('@')) e.email = 'Email inválido';
  if (clave.length < 8)     e.clave = 'Mínimo 8 caracteres';
  setErrores(e);
  if (Object.keys(e).length > 0) return;
  // enviar...
};
```

- `<TextInput value={email} onChangeText={setEmail} /> {errores.email && <Text>{errores.email}</Text>}`

- `<TextInput value={clave} onChangeText={setClave} secureTextEntry /> {errores.clave && <Text>{errores.clave}</Text>}`

- `<Pressable onPress={enviar}><Text>Ingresar</Text></Pressable>`

Funciona, y para dos campos está bien. Lo que no escala es la validación: cada regla nueva es una línea más en `errores` . `enviar` y una entrada más en

<!-- página 18 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **Formularios ·** **`react-hook-form` +** **`zod`**

El mismo formulario, pero las reglas viven en un **esquema** y la librería se encarga del resto: validar, guardar los valores y decir qué falló.

```
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
const esquema = z.object({
  email: z.email({ error: 'Email inválido' }),
  clave: z.string().min(8, { error: 'Mínimo 8 caracteres' }),
});
const { control, handleSubmit, formState: { errors } } =
  useForm({ resolver: zodResolver(esquema) });
<Controller name="email" control={control}
  render={({ field: { value, onChange } }) => (
    <TextInput value={value} onChangeText={onChange} />)} />
{errors.email && <Text>{errors.email.message}</Text>}
<Controller name="clave" control={control}
  render={({ field: { value, onChange } }) => (
    <TextInput value={value} onChangeText={onChange} secureTextEntry />)} />
{errors.clave && <Text>{errors.clave.message}</Text>}
<Pressable onPress={handleSubmit(ingresar)}><Text>Ingresar</Text></Pressable>
```

Con dos campos empatan. Con ocho, cada uno con sus reglas, el de la slide anterior se multiplica y este es **el mismo código** : lo único que crece es el esquema. Y ese esquema además **tipa** el formulario — si escribís `errors.emial` , TypeScript te avisa.

<!-- página 19 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS
###### **Manejo del teclado**

**El problema**
El teclado aparece y tapa el campo donde se está
escribiendo. En iOS y Android se comporta distinto.

```
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <TextInput ... />
</KeyboardAvoidingView>

```

**La solución**

`KeyboardAvoidingView` para casos simples; `react-native-`

`keyboard-controller` cuando se necesita control fino o
animaciones que sigan al teclado.

<!-- página 20 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

**ESTABLE DESDE SDK 56**
###### **Expo UI**

`@expo/ui` es un conjunto de componentes que se dibujan **directamente con SwiftUI en iOS y con Jetpack**
**Compose en Android** . Los componentes de React Native están inspirados en los del sistema; estos **son** los del
sistema, no una imitación hecha en JavaScript.

**Hasta SDK 55**
Un selector de fecha, un slider o una hoja inferior había que
armarlos a mano o traer una dependencia de la comunidad:
cada una con su propio calendario de versiones y su propia
forma de romperse al subir de SDK.

**Desde SDK 56**
Vienen en el SDK y son estables. Y `@expo/ui/community`
trae reemplazos **con la misma API** de las librerías más
usadas: cambiás el import y sacás la dependencia del
proyecto.

**Acá sí importa sobre qué sistema corre la app.** Los componentes universales se importan de `@expo/ui` y se
resuelven solos. Los propios de una plataforma salen de `@expo/ui/swift-ui` - de `@expo/ui/jetpack-compose`, y ahí
la decisión es tuya.

<!-- página 21 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **Expo UI en código**

Una pantalla de configuración con controles del sistema.

```
import { Host, Column, Button, Switch, Picker } from '@expo/ui';
```

```
<Host style={{ height: 220 }}>
```

```
<Column spacing={12}>
```

```
<Switch label="Notificaciones"
        value={activo} onValueChange={setActivo} />
```

```
<Picker selectedValue={frecuencia} onValueChange={setFrecuencia}>
```

```
<Picker.Item label="Diaria"  value="diaria" />
```

- `<Picker.Item label="Semanal" value="semanal" />`

```
</Picker>
```

- `<Button label="Guardar" onPress={guardar} />`

- `</Column>`

```
</Host>
```

###### **Qué gana**

El control se ve y se comporta como el del sistema, y hereda su accesibilidad y sus animaciones sin que vos hagas nada.

###### **Qué cuesta**

Todo va adentro de un `Host` , con alto propio: el layout de adentro no es el Flexbox de React Native, es el de SwiftUI o Compose.

<!-- página 22 -->

UNIDAD 3 · PARTE 1 · CONSTRUCCIÓN DE PANTALLAS

###### **El mismo control, dos sistemas**

Un selector de fecha, bajando al módulo específico de cada plataforma. No es el mismo componente con otra piel: cambian el nombre, las props y hasta el tipo del valor.

![Imagen de la página 22](assets/u03-t02-interfaz-y-navegacion/p0022-03.png)

![Imagen de la página 22](assets/u03-t02-interfaz-y-navegacion/p0022-04.png)

iOS · `DatePicker` de SwiftUI

Android · `DateTimePicker` de Jetpack Compose

**`@expo/ui/swift-ui @expo/ui/jetpack-compose`** componente `DatePicker DateTimePicker` valor `selection` — un `Date initialDate` — texto ISO cambio `onDateChange onDateSelected` estilo modificador `datePickerStyle('graphical')` prop `variant="picker"`

<!-- página 23 -->

UNIDAD 3 · PARTE 2
#### **Estilos, temas y diseño responsivo**

De `StyleSheet` a una aplicación que se adapta.

<!-- página 24 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO
###### **La base: StyleSheet**

EN LÍNEA

```
<View style={{ padding: 16 }}>

```

Cómodo para un ajuste puntual. Crea un objeto nuevo
en cada render, así que no conviene en listas largas.

```
STYLESHEET.CREATE

const e = StyleSheet.create({
  caja: { padding: 16 },
});

<View style={e.caja}>

```

Se define una vez, fuera del componente.

Se combinan pasando un arreglo — `style={[e.caja, e.destacada]}` - y así se aplican estilos condicionales, que
vemos en la próxima slide.

<!-- página 25 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO
###### **Lo que cambia respecto de CSS**

**Sin unidades**

`padding: 16`, no `16px` . El número son density-independent
pixels: el sistema los escala según la densidad de la pantalla.

**Sin atajos**
No existe `margin: 0 auto` ni `border: 1px solid red` . Va
propiedad por propiedad: `borderWidth`, `borderColor`,

`borderStyle` .

**Flexbox por defecto**
Toda `View` ya es `display: flex` con `flexDirection:`

`'column'` - al revés que en web, donde es `row` .

**Sin cascada ni herencia**
Un `color` puesto en una `View` **no llega al** **`Text`** **de**
**adentro** . Cada componente define lo suyo.

La falta de herencia es lo que más sorprende viniendo de web. La única excepción es un `<Text>` anidado dentro de
otro `<Text>` : ahí sí hereda tipografía y color.

<!-- página 26 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO
###### **Estilos condicionales**

Un chip que se selecciona al tocarlo. Apretalo para ver los dos estados.

**Ofertas**

EL COMPONENTE

```
export function Chip({ etiqueta }) {
  const [activo, setActivo] = useState(false);

  return (
    <Pressable
      onPress={() => setActivo(!activo)}
      style={[e.chip, activo && e.chipActivo]}
    >
      <Text style={[e.texto, activo && e.textoActivo]}>
        {etiqueta}
      </Text>
    </Pressable>
  );
}

```

LOS ESTILOS

```
const e = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#D8E0E8',
    backgroundColor: '#FFFFFF',
  },
  chipActivo: {
    borderColor: '#0B5394',
    backgroundColor: '#0B5394',
  },
  texto:       { color: '#5C6B7A' },
  textoActivo: { color: '#FFFFFF' },
});

```

El arreglo se resuelve de izquierda a derecha: **lo de la derecha pisa lo de la izquierda** . Un `false` se ignora, así que

`activo && e.chipActivo` aplica el estilo sólo cuando corresponde.

<!-- página 27 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO
###### **El panorama de librerías**

Sobre `StyleSheet` se construyeron varias librerías. Todas resuelven lo mismo: **temas, variantes y diseño**
**responsivo** .

**Unistyles**
API casi idéntica a `StyleSheet` . Sin re-renders, con temas y
breakpoints incluidos. Requiere development build.

**Tamagui**
Sistema de diseño completo, con componentes propios y
compilador. Más ambicioso y más opinado.

**NativeWind**
Tailwind en React Native: clases utilitarias en `className` . La
más usada del ecosistema.

**CÓDIGO HEREDADO**
**Styled Components**

CSS-in-JS con template literals. Lo van a encontrar en
proyectos existentes; no es la opción a elegir en uno nuevo.

<!-- página 28 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO **Temas**

React Native te dice en qué modo está el sistema. El resto —qué colores usar— lo definís vos.

```
import { useColorScheme } from 'react-native';
const temas = {
  claro:  { fondo: '#FFFFFF', texto: '#1A2530', acento: '#0B5394' },
  oscuro: { fondo: '#12191F', texto: '#E8EDF2', acento: '#7FB3E0' },
};
export function Pantalla() {
  const modo = useColorScheme();                    // 'light' | 'dark'
  const t = temas[modo === 'dark' ? 'oscuro' : 'claro'];
  return (
    <View style={[e.caja, { backgroundColor: t.fondo }]}>
      <Text style={{ color: t.texto }}>Hola</Text>
    </View>
  );
}
```

Repetir esas dos líneas en cada pantalla no escala. La solución habitual es un **Context** que exponga el tema, y que cada componente lo lea con un hook propio: `const t = useTema();`

<!-- página 29 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO **Diseño responsivo**

Una app tiene que verse bien en un teléfono chico, en uno grande, en una tablet y **rotada** .

```
import { useWindowDimensions } from 'react-native';
export function Grilla({ productos }) {
  const { width } = useWindowDimensions();   // re-renderiza al rotar
  const columnas = width >= 768 ? 3 : width >= 576 ? 2 : 1;
  return (
    <FlatList
      data={productos}
      numColumns={columnas}
      key={columnas}                         // fuerza el remontaje al cambiar
      renderItem={({ item }) => <Tarjeta producto={item} />}
    />
  );
}
```

`useWindowDimensions` **sí re-renderiza** cuando cambia el tamaño o la orientación. Es lo que querés — pero si lo usás en un componente que está dentro de una lista larga, ese costo se multiplica.

<!-- página 30 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO
###### **Unistyles opcional**

Resuelve temas, breakpoints y variantes **sin escribir el andamiaje** . Es `StyleSheet` con capas encima: se adopta
cambiando el import.

TEMAS Y BREAKPOINTS

```
- import { StyleSheet } from 'react-native'
+ import { StyleSheet } from 'react-native-unistyles'

const e = StyleSheet.create(theme => ({
  grilla: {
    backgroundColor: theme.colors.fondo,
    flexDirection: { xs: 'column', md: 'row' },
    padding: { xs: 12, md: 24 },
  },
}));

```

Sin Context, sin `useWindowDimensions`, sin re-renders.

VARIANTES

```
chip: {
  borderRadius: 999,
  variants: {
    activo: {
      true:  { backgroundColor: theme.colors.acento },
      false: { backgroundColor: theme.colors.fondo },
    },
  },
},

e.useVariants({ activo });

```

El estado se declara, en vez de armar arreglos
condicionales.

<!-- página 31 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO
###### **Unistyles: qué cuesta adoptarlo**

**No corre en Expo Go**
Tiene código nativo propio. Hay que instalar dos
dependencias, agregar el plugin de Babel y correr `npx expo`

`prebuild --clean`, y a partir de ahí trabajar con un
**development build** .

**Lo que ganás**
Temas y breakpoints sin andamiaje, variantes declarativas, y
cambios de estilo que no re-renderizan ningún componente.

**Es opcional.** Con `StyleSheet`, un Context para el tema y `useWindowDimensions` se llega al mismo resultado. Si el
proyecto es chico o prefieren no salir de Expo Go, es una decisión perfectamente válida.

<!-- página 32 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO
###### **NativeWind opcional**

Tailwind en React Native. Las clases se escriben en `className` y un compilador de Babel las convierte en objetos de

`StyleSheet` en tiempo de build.

EL MISMO CHIP

```
<Pressable
  className={`px-5 py-2 rounded-full border-2
    ${activo
      ? 'bg-blue-800 border-blue-800'
      : 'bg-white border-slate-300'}`}
>
  <Text className={activo ? 'text-white' : 'text-slate-500'}>
    {etiqueta}
  </Text>
</Pressable>

```

CUÁNDO CONVIENE

Ya trabajan con Tailwind en web.

Se comparte el sistema de diseño entre web y móvil:
mismo `tailwind.config` .

**Sí funciona en Expo Go** : es un plugin de Babel, no tiene
código nativo.

**En contra:** el JSX se llena de clases y las
condicionales quedan como cadenas de texto largas.

<!-- página 33 -->

UNIDAD 3 · PARTE 2 · ESTILOS, TEMAS Y DISEÑO RESPONSIVO

###### **iOS 26: Liquid Glass**

Apple rediseñó el sistema alrededor de un material translúcido que refracta lo que tiene detrás. Expo lo expone con `expo-glass-effect` .

```
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
```

- `{isLiquidGlassAvailable()`

- `? <GlassView style={e.barra} glassEffectStyle="regular" />`

- `: <View style={[e.barra, { backgroundColor: '#F2F2F7' }]} />}`

Es **sólo iOS 26 o superior** : abajo de esa versión `GlassView` se comporta como una `View` común, así que el diseño tiene que funcionar igual sin el efecto. En Android no existe.

<!-- página 34 -->

UNIDAD 3 · PARTE 3
#### **Gestos y animaciones**

Lo que separa una app que funciona de una que se siente bien.

<!-- página 35 -->

UNIDAD 3 · PARTE 3 · GESTOS Y ANIMACIONES **Gestos**

`react-native-gesture-handler` reconoce toques, desplazamientos, pellizcos y rotaciones — y lo hace **en el hilo nativo** , sin esperar a JavaScript.

```
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
```

```
const arrastrar = Gesture.Pan()
  .onUpdate(e => {
    x.value = e.translationX;
    y.value = e.translationY;
  });
```

- `<GestureDetector gesture={arrastrar}>`

- `<Animated.View style={estiloAnimado} />`

- `</GestureDetector>`

Los gestos se **componen** : `Gesture.Simultaneous()` , `Gesture.Race()` , `Gesture.Exclusive()` . Así se arma, por ejemplo, pellizcar para hacer zoom mientras se arrastra.

<!-- página 36 -->

UNIDAD 3 · PARTE 3 · GESTOS Y ANIMACIONES **Animaciones con Reanimated 4**

```
import Animated, { useSharedValue, useAnimatedStyle,
                   withSpring } from 'react-native-reanimated';
const escala = useSharedValue(1);
const estilo = useAnimatedStyle(() => ({
  transform: [{ scale: escala.value }],
}));
```

```
<Pressable onPress={() => { escala.value = withSpring(1.2); }}>
  <Animated.View style={estilo} />
</Pressable>
```

Un **shared value** vive fuera del estado de React: cambiarlo no dispara un render. La animación corre en el hilo de UI, así que se mantiene fluida aunque JavaScript esté ocupado.

<!-- página 37 -->

UNIDAD 3 · PARTE 4
#### **Accesibilidad**

Una pantalla que sólo funciona mirándola está a medio terminar.

<!-- página 38 -->

UNIDAD 3 · PARTE 4 · ACCESIBILIDAD
###### **Qué es y por qué acá**

**Quién la usa**
Los lectores de pantalla del sistema — **VoiceOver** en iOS,
**TalkBack** en Android — leen la pantalla en voz alta y se
navegan por gestos.
También el que agrandó la tipografía del sistema, el que
invierte los colores y el que apagó las animaciones.

**Por qué en esta unidad**
Porque se resuelve **mientras se arma la pantalla**, con las
mismas props del componente. Agregada al final es un
rediseño.
Y porque lo mismo que la hace accesible la hace **testeable** :
las consultas de React Native Testing Library buscan por rol y
por etiqueta.

El sistema operativo ya hace casi todo. Lo que hace tu app es **describirle qué es cada cosa** : eso es la accesibilidad
en React Native.

<!-- página 39 -->

###### UNIDAD 3 · PARTE 4 · ACCESIBILIDAD **Las props que resuelven el 90%**

```
<Pressable
```

```
accessible                              // es UN elemento, no tres
role="button"                           // qué es
accessibilityLabel="Agregar al carrito" // cómo se llama
accessibilityHint="Suma el producto y vuelve al listado"
onPress={agregar}>
```

- `<Ionicons name="cart" size={24} />`

```
</Pressable>
```

###### **Se lee así**

«Agregar al carrito, botón» — y después, si el usuario tiene las pistas activadas, la hint.

###### **`role` , no** **`accessibilityRole`**

Los dos existen y hacen lo mismo. `role` es la forma nueva, tiene precedencia sobre la otra y usa los mismos nombres de ARIA que ya vienen de web.

<!-- página 40 -->

UNIDAD 3 · PARTE 4 · ACCESIBILIDAD

###### **Estado, valor y cambios**

Un control que cambia tiene que **contar** que cambió.

```
<Pressable role="switch"
  accessibilityLabel="Notificaciones"
  accessibilityState={{ checked: activo, disabled: !editable }} />
```

```
<Slider role="adjustable"
  accessibilityLabel="Volumen"
```

```
accessibilityValue={{ min: 0, max: 100, now: volumen }} />
```

- `{/* el resultado de una búsqueda, que aparece sin que el foco se mueva */}`

- `<Text accessibilityLiveRegion="polite">{n} resultados</Text>`

Los alias de ARIA también funcionan: `aria-label` , `aria-checked` , `aria-disabled` , `aria-hidden` , `aria-live` . Si venís de web, escribí como escribías.

<!-- página 41 -->

UNIDAD 3 · PARTE 4 · ACCESIBILIDAD
###### **Los cuatro errores de siempre**

**Botón que es sólo un ícono**
Sin `accessibilityLabel` el lector anuncia «botón» y nada
más. Es el más frecuente de todos.

**Área de toque diminuta**
El mínimo es **44 pt** en iOS y **48 dp** en Android. Se agranda
con `hitSlop`, sin tocar el diseño.

**Imagen decorativa que se lee**
Si no aporta información va con `aria-hidden` . Si aporta, va
con etiqueta.

**Contraste al límite**
El gris claro sobre blanco que se ve bien en el monitor
desaparece al sol. El piso es **4,5:1** para texto normal.

Un quinto, más sutil: envolver media pantalla en un `View` con `accessible` . El lector lo trata como **un** elemento y lee
todo de corrido, sin poder entrar a los botones de adentro.

<!-- página 42 -->

UNIDAD 3 · PARTE 4 · ACCESIBILIDAD
###### **Cómo se prueba**

**Android · TalkBack**
Ajustes → Accesibilidad → TalkBack. Se prende y apaga
manteniendo **las dos teclas de volumen 3 segundos** .
El emulador no lo trae: hace falta una imagen con Play Store
e instalarlo, o usar un teléfono real.

**iOS · VoiceOver**
Ajustes → Accesibilidad → VoiceOver. Conviene dejarlo en el
atajo de accesibilidad: **triple clic** al botón lateral.
No corre en el simulador. Desde Xcode se usa el Accessibility
Inspector, que no es lo mismo pero sirve.

Prueba de dos minutos, sin herramientas: prendé el lector, **apagá la pantalla** y tratá de completar la tarea principal de
tu app. Lo que no puedas hacer, no lo puede hacer nadie que dependa del lector.

<!-- página 43 -->

UNIDAD 3
##### **Lo que sigue**

**Navegación:** deck complementario de esta misma unidad.

Práctica: pantallas con tema claro/oscuro y diseño adaptable.

**Unidad 4:** cámara, ubicación, sensores y sistema de archivos.

Documentación: `docs.expo.dev/router` - `docs.expo.dev/versions/latest/sdk/ui`
`reactnative.dev/docs/accessibility` - `unistyl.es`

---

<a id="doc-11"></a>

## 11. Unidad 4 — Librerías, plugins y permisos · Desarrollo para Móviles

> **Fuente:** `U04.01 - Librerías, plugins y permisos.pdf` · **Páginas:** 26 · **Palabras:** 2.109 · **Imágenes:** 2

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 4** **Librerías, plugins** **y permisos**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 4
###### **Qué vamos a ver**

###### **Objetivos Partes**

Entender cómo el código JavaScript llega al hardware del
teléfono.

Elegir e instalar una librería nativa sin romper el proyecto.

Configurar el proyecto nativo sin abrir `android/` ni `ios/` .

Declarar y pedir permisos como corresponde en cada
plataforma.

De JavaScript al hardware

Generación nativa continua y config plugins

Permisos

Las APIs concretas —cámara, ubicación, sensores, archivos

- van en el deck siguiente.

<!-- página 3 -->

UNIDAD 4 · PARTE 1
#### **De JavaScript al hardware**
###### Qué hay entre import y la cámara del teléfono.

<!-- página 4 -->

UNIDAD 4 · PARTE 1 · DE JAVASCRIPT AL HARDWARE
###### **Lo que cambia a partir de acá**

###### UNIDADES 2 Y 3 UNIDAD 4

Componentes, estado, estilos, navegación. Cámara, GPS, acelerómetro, archivos, vibración.

Todo se resuelve dentro de React.

Si funciona en tu teléfono, funciona en todos.

Hace falta código nativo del otro lado.

El usuario puede **decir que no**, y el hardware puede
directamente no existir.

Dos ideas nuevas y ninguna es de React: el permiso (el usuario autoriza) y la disponibilidad (el dispositivo tiene o no tiene ese sensor). Las dos hay que manejarlas en el código.

<!-- página 5 -->

UNIDAD 4 · PARTE 1 · DE JAVASCRIPT AL HARDWARE
###### **El camino completo**

**Tu código**
```
Camera.takePictureAsync()

```

**MÓDULO NATIVO**

⇄

###### **Escrito en JS**

Lo que vos importás: una función o un
componente de React, con tipos de
TypeScript.

###### **Escrito en Swift / Kotlin**

El módulo que traduce esa llamada a la
API del sistema. Es lo que hay que
compilar.

**API del sistema operativo**
AVFoundation (iOS) · CameraX (Android)

###### **Por eso hace falta compilar**

Agregar una librería nativa no es
agregar un paquete de npm: cambia el
binario.

<!-- página 6 -->

UNIDAD 4 · PARTE 1 · DE JAVASCRIPT AL HARDWARE
###### **De dónde sale una capacidad nueva**

###### **1 · Expo SDK**

Módulos mantenidos por Expo,
versionados junto al SDK y probados
en cada release. Es el primer lugar
donde buscar.

```
docs.expo.dev/versions/latest

```

###### **2 · La comunidad**

Todo lo demás. El directorio filtra por
plataforma, mantenimiento y
compatibilidad con Expo Go.

```
reactnative.directory

```

###### **3 · Un módulo propio**

Cuando no existe. Se escribe con

`create-expo-module` en Swift y Kotlin.
Fuera del alcance de la materia, pero
conviene saber que se puede.

Regla práctica para el TP integrador: si está en el SDK de Expo, usá eso . Se actualiza solo cuando subís de SDK y no te deja a mitad de camino en noviembre.

<!-- página 7 -->

UNIDAD 4 · PARTE 1 · DE JAVASCRIPT AL HARDWARE
###### **Antes de instalar: cuatro preguntas**

###### **¿En qué plataformas corre?**

Arriba de cada página de la documentación están los badges
Android · iOS · Web. Varios sensores dicen iOS (device only):
en el simulador no andan.

###### **¿Está viva?**

Fecha del último commit, issues abiertos y, sobre todo, si
declara soporte de la Nueva Arquitectura. Sin eso no corre en
SDK 55 o superior.

###### **¿Corre en Expo Go?**

El badge Included in Expo Go decide si la vas a poder probar
el primer día o si necesitás una development build.

###### **¿Qué permisos arrastra?**

Una librería puede agregar permisos al manifiesto sin que los
pidas. Apple rechaza apps que declaran permisos que no
usan.

<!-- página 8 -->

UNIDAD 4 · PARTE 1 · DE JAVASCRIPT AL HARDWARE
###### **npx expo install, no npm install**

###### LO QUE HACE NPM

```
npm install expo-camera
# instala la última versión publicada
# → puede no ser compatible con tu SDK

```

###### LO QUE HACE EXPO

```
npx expo install expo-camera
# consulta qué versión corresponde al SDK 57
# instala esa, y avisa si algo quedó desfasado

```

Vale también para librerías de la comunidad: npx expo install react-native-maps . Expo mantiene una tabla de versiones compatibles por SDK y la usa para elegir. npx expo install --check revisa el package.json entero y te dice qué está fuera de rango. Corrélo antes de entregar.

<!-- página 9 -->

UNIDAD 4 · PARTE 1 · DE JAVASCRIPT AL HARDWARE
###### **Qué de esta unidad corre en Expo Go**

###### **Sí — se prueba el primer día No — hace falta development build**

```
expo-camera

expo-image-picker

expo-location

```

`expo-sensors` - `expo-haptics`

```
expo-file-system

react-native-maps

```

Notificaciones **locales**

Notificaciones **push** **DESDE SDK 53 EN ANDROID**

`expo-maps` **ALPHA**

Cualquier librería sin el badge de Expo Go

Cualquier config plugin que cambie el proyecto nativo

Planificá el TP integrador con esto a la vista: si tu app necesita push, la development build tiene que estar hecha antes de la semana en que la vayas a usar, no el día anterior a la entrega.

<!-- página 10 -->

UNIDAD 4 · PARTE 2
#### **Generación nativa continua**
###### Configurar el proyecto nativo sin abrirlo nunca.

<!-- página 11 -->

UNIDAD 4 · PARTE 2 · GENERACIÓN NATIVA CONTINUA
###### **El problema que resuelve**

###### REACT NATIVE A MANO CNG CON EXPO

Editás `AndroidManifest.xml`, `Info.plist`, Editás **solo** `app.json` .

`build.gradle`, `Podfile` .

Esos archivos viven en el repositorio.

Actualizar de versión es resolver conflictos a mano en
archivos que casi nadie del equipo entiende.

`android/` e `ios/` no están en el repositorio: se
generan.

Actualizar de SDK es cambiar un número y volver a
generar.

CNG = Continuous Native Generation. La idea de fondo: el proyecto nativo es un artefacto de build, como node_modules . No se versiona, se reconstruye.

<!-- página 12 -->

UNIDAD 4 · PARTE 2 · GENERACIÓN NATIVA CONTINUA
###### **Cómo se genera**

**app.json** **android/ · ios/**
**npx expo prebuild**
lo único que escribís generados

Cada librería aporta su config plugin: una función JS que sabe qué tocar del proyecto nativo.

<!-- página 13 -->

UNIDAD 4 · PARTE 2 · GENERACIÓN NATIVA CONTINUA
###### **Cómo se genera**

**app.json** **android/ · ios/**
**CONFIG PLUGINS**
lo único que escribís generados

###### **Permisos**

`AndroidManifest.xml` - `Info.plist`

###### **Dependencias nativas**

`build.gradle` - `Podfile`

###### **Recursos**

Íconos, sonidos, claves de API,
esquemas de URL

<!-- página 14 -->

UNIDAD 4 · PARTE 2 · GENERACIÓN NATIVA CONTINUA **Un config plugin en** **`app.json`**

```
{
  "expo": {
    "name": "Mi App",
    "slug": "mi-app",
    "plugins": [
      "expo-router",
      [
        "expo-camera",
        {
          "cameraPermission": "Sacamos la foto del producto que vas a publicar.",
          "microphonePermission": "Grabamos la nota de voz que adjuntás.",
          "recordAudioAndroid": true
        }
      ]
    ]
  }
}
```

Un string suelto es el plugin con su configuración por defecto. Un array es `["nombre", { opciones }]` . Los textos de permiso son los que **ve el usuario** en el cartel del sistema.

<!-- página 15 -->

UNIDAD 4 · PARTE 2 · GENERACIÓN NATIVA CONTINUA
###### **Cuándo hay que volver a compilar**

###### **Basta con recargar**

Cualquier cambio en tus componentes.

Estilos, navegación, estado.

Agregar una librería que sea solo JavaScript.

Fast Refresh lo aplica en el momento.

###### **Hay que rearmar el binario**

Instalar una librería con código nativo.

Agregar o cambiar un config plugin.

Tocar permisos, íconos, nombre o esquema de URL.

`npx expo prebuild --clean` y una build nueva.

Síntoma típico: agregaste el plugin, recargaste, y el permiso sigue sin aparecer. No es un bug tuyo — el manifiesto viejo sigue en el binario instalado.

<!-- página 16 -->

UNIDAD 4 · PARTE 2 · GENERACIÓN NATIVA CONTINUA
###### **Si abrís android/ a mano**

###### **Qué pasa**

El proyecto pasa a bare: los directorios nativos ahora son
tuyos y hay que versionarlos.

###### **Qué perdés**

El próximo `prebuild` pisa tus cambios. Y el salto de SDK
deja de ser automático: pasa a ser una migración manual.

Casi nunca hace falta. Si una librería pide un cambio nativo que no tiene plugin, se escribe un config plugin propio — es un archivo JS— antes de romper el modelo.

<!-- página 17 -->

UNIDAD 4 · PARTE 3
#### **Permisos**
###### Declarar, pedir, y sobrevivir a que el usuario diga que no.

<!-- página 18 -->

UNIDAD 4 · PARTE 3 · PERMISOS
###### **Dos momentos distintos**

###### **1 · Declaración — cuando compilás**

El binario dice qué permisos puede llegar a pedir. Va en

`app.json` y termina en el manifiesto.

Si no está declarado, el pedido en tiempo de ejecución falla
sin mostrar nada.

###### **2 · Solicitud — cuando la app corre**

El usuario ve un cartel del sistema y decide. Lo dispara tu
código, en el momento que vos elijas.

Si no lo pedís, tenés el permiso declarado y la API igual falla.

Los dos son necesarios. La mitad de los «no me anda la cámara» de la cursada son uno de estos dos pasos faltando.

<!-- página 19 -->

UNIDAD 4 · PARTE 3 · PERMISOS **Los estados de un permiso**

![Imagen de la página 19](assets/u04-01-librerias-plugins-y-permisos/p0019-01.png)

<!-- Start of picture text -->
9:41 ▮▮▮<br>«Mi App» quiere<br>acceder a la cámara<br>Necesitamos la cámara para que subas la<br>foto del producto.<br>No permitir Permitir<br><!-- End of picture text -->

El cartel lo dibuja el sistema operativo, no vos

**`undetermined`** Todavía no se preguntó. Es el estado al instalar. **`granted`** Concedido. La API funciona.

![Imagen de la página 19](assets/u04-01-librerias-plugins-y-permisos/p0019-04.png)

<!-- Start of picture text -->
denied<br><!-- End of picture text -->

Rechazado. Y ojo con `canAskAgain` : si es `false` , el cartel **no vuelve a aparecer nunca** . La única salida es que el usuario lo cambie desde Ajustes.

<!-- página 20 -->

UNIDAD 4 · PARTE 3 · PERMISOS

##### **El patrón moderno: un hook por permiso**

```
import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Text, Button } from 'react-native';
export default function Pantalla() {
  const [permiso, pedirPermiso] = useCameraPermissions();
```

```
if (!permiso) return <View />;                            // 1 · resolviendo
```

```
if (!permiso.granted) return (                            // 2 · no lo tenemos
  <View>
```

```
      <Text>Necesitamos la cámara para la foto del producto.</Text>
      <Button title="Dar acceso" onPress={pedirPermiso} />
    </View>
  );
  return <CameraView style={{ flex: 1 }} facing="back" />;   // 3 · adelante
}
```

**Siempre son tres ramas, no dos.** Saltear la primera es el bug más común: por un instante `permiso` es `null` y la pantalla parpadea con el mensaje de rechazo.

<!-- página 21 -->

UNIDAD 4 · PARTE 3 · PERMISOS
###### **La misma idea, sin hook**

###### CON HOOK — DENTRO DE UN COMPONENTE

```
const [permiso, pedir] = useCameraPermissions();

if (permiso?.granted) { /* … */ }

```

###### CON FUNCIONES — EN CUALQUIER LADO

```
import * as Location from 'expo-location';

async function ubicar() {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') return null;

  return Location.getCurrentPositionAsync({});
}

```

Las funciones vienen siempre de a pares: get…PermissionsAsync() consulta sin molestar al usuario, request… PermissionsAsync() muestra el cartel. Consultá primero.

<!-- página 22 -->

##### UNIDAD 4 · PARTE 3 · PERMISOS **iOS: el texto es obligatorio**

```
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "Sacamos la foto del producto que vas a publicar.",
        "NSLocationWhenInUseUsageDescription": "Mostramos los locales cercanos a donde estás."
      }
    }
  }
}
```

###### **Si falta**

La app **crashea** al pedir el permiso. No devuelve error: se cierra.

###### **Si es genérico**

Apple rechaza la publicación. «This app needs camera access» no alcanza.

Los config plugins ya escriben estos strings —por eso `cameraPermission` —, pero el texto por defecto es genérico: reescribilo.

<!-- página 23 -->

UNIDAD 4 · PARTE 3 · PERMISOS **Android: agregar y también quitar**

```
{
  "expo": {
    "android": {
      "permissions": ["android.permission.CAMERA"],
      "blockedPermissions": [
        "android.permission.RECORD_AUDIO"
      ]
    }
  }
}
```

###### **`permissions`**

Agrega al manifiesto. Casi nunca hace falta: las librerías declaran lo suyo.

###### **`blockedPermissions`**

Saca lo que una librería metió y vos no usás. Es el que más se usa.

Google Play te pide justificar cada permiso sensible. Un `RECORD_AUDIO` que entró de arrastre y no usás es una razón para que te rechacen.

<!-- página 24 -->

UNIDAD 4 · PARTE 3 · PERMISOS
###### **Manifiestos de privacidad de Apple**

###### **Qué son**

Un archivo `PrivacyInfo.xcprivacy` dentro del proyecto iOS
donde declarás **por qué** tu app usa ciertas APIs sensibles:
acceso a archivos, espacio en disco, hora del sistema,
preferencias del usuario.

Obligatorio para publicar en la App Store.

###### **Cómo se resuelve en Expo**

Se declara en `app.json` bajo `ios.privacyManifests` y CNG
lo genera. Las librerías del SDK ya aportan sus propias
razones.

Aparece recién al preparar la entrega a la tienda: lo
retomamos en la Unidad 7.

No confundirlo con los strings de infoPlist . Aquellos son para el usuario ; este es para Apple .

<!-- página 25 -->

UNIDAD 4 · PARTE 3 · PERMISOS
###### **Cómo se pide bien**

###### **Mal Bien**

Pedir todos los permisos al abrir la app. Pedirlo cuando el usuario aprieta «Sacar foto».

Mostrar el cartel sin ningún contexto previo.

Dar por hecho que dijo que sí.

Dejar la pantalla en blanco si dijo que no.

Explicar antes, con tu propia interfaz, para qué es.

Manejar las tres ramas del hook.

Ofrecer un camino alternativo: elegir de la galería, escribir
la dirección a mano.

Se evalúa en el TP integrador: la app tiene que seguir siendo usable si el usuario rechaza todo . No tiene que hacer todo, pero no puede romperse.

<!-- página 26 -->

UNIDAD 4 **Documentación**

```
docs.expo.dev/workflow/using-libraries
```

```
docs.expo.dev/workflow/continuous-native-generation
```

```
docs.expo.dev/guides/permissions
```

```
docs.expo.dev/guides/apple-privacy
```

---

<a id="doc-12"></a>

## 12. Unidad 4 — APIs del dispositivo · Desarrollo para Móviles

> **Fuente:** `U04.T02 - APIs del dispositivo.pdf` · **Páginas:** 34 · **Palabras:** 2.928 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 4** **APIs del dispositivo**

Cámara · Galería · Ubicación · Mapas · Sensores · Hápticos · Archivos

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 4
###### **Qué vamos a ver**

**Objetivos** **Partes**

Sacar y elegir imágenes desde la app.

Ubicar al usuario y mostrarlo en un mapa.

Leer sensores y devolver respuesta táctil.

Guardar y leer archivos con la API nueva.

Reproducir video y audio, y grabar con el micrófono.

Cámara y galería

Ubicación y mapas

Sensores y hápticos

Sistema de archivos

Multimedia

Todo lo de hoy asume el deck anterior: `npx expo install`, config plugin y permiso pedido en tiempo de ejecución.

<!-- página 3 -->

UNIDAD 4 · PARTE 1
#### **Cámara y galería**

Dos librerías distintas para dos problemas parecidos.

<!-- página 4 -->

UNIDAD 4 · PARTE 1 · CÁMARA Y GALERÍA
###### **Sacar la foto vs. elegir la foto**

```
 EXPO-CAMERA EXPO-IMAGE-PICKER

```

Te da un **componente** : la vista previa vive dentro de tu
pantalla.

Controlás zoom, linterna, flash, cámara frontal o trasera.

Escanea códigos QR y de barras.

Interfaz propia: la diseñás vos.

Te da una **función** : abre la pantalla del sistema.

El usuario ya conoce esa interfaz.

Permite recortar y elegir varias.

También puede abrir la cámara del sistema.

Para el TP integrador, empezá por `expo-image-picker` : resuelve el 90% de los casos con diez líneas. Pasá a `expo-`
`camera` solo si necesitás la vista previa dentro de tu pantalla o escanear códigos.

<!-- página 5 -->

UNIDAD 4 · PARTE 1 · CÁMARA Y GALERÍA **La vista previa**

```
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
export default function Camara() {
  const [lado, setLado] = useState<CameraType>('back');
  const [permiso, pedirPermiso] = useCameraPermissions();
  // …las tres ramas del permiso, como en el deck anterior…
  return (
    <CameraView style={{ flex: 1 }} facing={lado} enableTorch={false}>
      <Pressable onPress={() => setLado(l => (l === 'back' ? 'front' : 'back'))}>
        <Text>Dar vuelta</Text>
      </Pressable>
    </CameraView>
  );
}
```

`<CameraView>` acepta hijos: los botones se dibujan **encima** de la vista previa, como en cualquier `View` .

<!-- página 6 -->

UNIDAD 4 · PARTE 1 · CÁMARA Y GALERÍA **Sacar la foto**

```
import { CameraView } from 'expo-camera';
import { useRef, useState } from 'react';
const camara = useRef<CameraView>(null);
const [foto, setFoto] = useState<string | null>(null);
```

```
async function disparar() {
  const resultado = await camara.current?.takePictureAsync({ quality: 0.7 });
  setFoto(resultado?.uri ?? null);   // file:///…/Caches/ExponentExperienceData/…
}
```

```
<CameraView ref={camara} style={{ flex: 1 }} />
```

###### **Qué devuelve**

`uri` , `width` , `height` . Con `base64: true` también el contenido, pero pesa un tercio más.

###### **Dónde queda**

En la **caché** de la app. El sistema la puede borrar. Si la foto tiene que sobrevivir, hay que copiarla — lo vemos en la Parte 4.

<!-- página 7 -->

UNIDAD 4 · PARTE 1 · CÁMARA Y GALERÍA **Escanear un código**

```
<CameraView
  style={{ flex: 1 }}
  barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13'] }}
  onBarcodeScanned={escaneado ? undefined : ({ type, data }) => {
    setEscaneado(true);          // sin esto se dispara decenas de veces por segundo
    router.push(`/producto/${data}`);
  }}
/>
```

`onBarcodeScanned` se llama en **cada cuadro** donde el código sea visible. Sin una bandera de estado vas a navegar treinta veces a la misma pantalla.

Idea para el TP: inventario, entradas a un evento, menú de un restaurante, control de asistencia. Es la funcionalidad que más impresiona por menos código.

<!-- página 8 -->

UNIDAD 4 · PARTE 1 · CÁMARA Y GALERÍA **Elegir de la galería**

```
import * as ImagePicker from 'expo-image-picker';
async function elegirImagen() {
  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],        // también 'videos' y 'livePhotos'
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });
  if (resultado.canceled) return;
  const imagen = resultado.assets[0];
  setUri(imagen.uri);
}
```

`mediaTypes` ahora es un **array de strings** : si encontrás `MediaTypeOptions.Images` , ese tutorial es viejo Con `allowsMultipleSelection` vienen varias en `assets` , y `canceled` va con una sola l.

**DEPRECADO** .

<!-- página 9 -->

UNIDAD 4 · PARTE 1 · CÁMARA Y GALERÍA
###### **Qué te devuelve, y cómo lo mostrás**

EL ASSET

```
{
  uri: 'file:///…/IMG_0042.jpg',
  width: 3024,
  height: 4032,
  fileSize: 2_481_920,
  mimeType: 'image/jpeg',
  fileName: 'IMG_0042.jpg',
  exif: { … }
}

```

MOSTRARLO

```
import { Image } from 'expo-image';

<Image
  source={{ uri }}
  style={{ width: '100%', aspectRatio: 3 / 4 }}
  contentFit="cover"
  transition={200}
/>

```

Usá `expo-image` y no el `Image` de React Native: caché en disco, placeholder y transición al aparecer. Y ojo con

`fileSize` : una foto de teléfono son 2 a 5 MB, así que antes de subirla redimensionala con `expo-image-manipulator` .

<!-- página 10 -->

UNIDAD 4 · PARTE 2
#### **Ubicación y mapas**

Dónde está el usuario, y cómo se lo mostrás.

<!-- página 11 -->

UNIDAD 4 · PARTE 2 · UBICACIÓN Y MAPAS
###### **Dos permisos, no uno**

```
requestForegroundPermissionsAsync()
```

«Mientras uso la app». Es el que vas a usar en la materia. El
usuario ve un cartel normal.

```
requestBackgroundPermissionsAsync()
```

«Siempre», incluso con la app cerrada. Requiere justificación
ante las dos tiendas y en Android hay que pedir el de primer
plano primero.

No pidas el de segundo plano «por las dudas». Es el permiso que más rechazos de publicación genera, y para un TP
integrador casi nunca hace falta.

<!-- página 12 -->

UNIDAD 4 · PARTE 2 · UBICACIÓN Y MAPAS **Obtener la posición**

```
import * as Location from 'expo-location';
async function ubicar() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
  const ultima = await Location.getLastKnownPositionAsync();   // rápida, puede ser vieja
  if (ultima) mostrar(ultima);
  const actual = await Location.getCurrentPositionAsync({      // precisa, tarda
    accuracy: Location.Accuracy.Balanced,
  });
  mostrar(actual);
}
```

Ese doble pedido es el patrón que usan las apps buenas: mostrás algo **ya** y lo corregís cuando llega la lectura fina. Sin eso el usuario mira una pantalla vacía cinco segundos.

<!-- página 13 -->

UNIDAD 4 · PARTE 2 · UBICACIÓN Y MAPAS **Seguir la posición**

```
useEffect(() => {
  let suscripcion: Location.LocationSubscription;
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    suscripcion = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 10 },  // metros
      (posicion) => setCoords(posicion.coords),
    );
  })();
  return () => suscripcion?.remove();   // ← sin esto el GPS sigue prendido
}, []);
```

El `return` del `useEffect` no es opcional. Una suscripción de GPS que queda viva después de salir de la pantalla vacía la batería y es el bug que más aparece corregido en las entregas.

<!-- página 14 -->

UNIDAD 4 · PARTE 2 · UBICACIÓN Y MAPAS
###### **De coordenadas a dirección y al revés**

COORDENADAS → DIRECCIÓN

```
const [lugar] = await Location.reverseGeocodeAsync({
  latitude: -31.7333,
  longitude: -60.5297,
});

// { city: 'Paraná', region: 'Entre Ríos',
//   street: 'Urquiza', country: 'Argentina' }

```

DIRECCIÓN → COORDENADAS

```
const [punto] = await Location.geocodeAsync(
  'Urquiza 552, Paraná, Entre Ríos'
);

// { latitude: -31.7333, longitude: -60.5297 }

```

Los nombres se confunden todo el tiempo. **Geocodificar** es convertir un texto en coordenadas; **reverse** es el camino
inverso. Los dos devuelven un **array**, que puede venir vacío.

En Android hay que tener el permiso de ubicación concedido antes de geocodificar, aunque no estés leyendo la
posición del usuario.

<!-- página 15 -->

UNIDAD 4 · PARTE 2 · UBICACIÓN Y MAPAS
###### **El mapa**

**LO QUE USAMOS**
```
REACT-NATIVE-MAPS 

import MapView, { Marker, Circle } from 'react-native-maps';

<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: -31.7333, longitude: -60.5297,
    latitudeDelta: 0.05, longitudeDelta: 0.05,
  }}>
  <Marker
    coordinate={{ latitude: -31.7333, longitude: -60.5297 }}
    title="FCAD" description="Facultad de Ciencias de la Administración"
  />
  <Circle
    center={{ latitude: -31.7333, longitude: -60.5297 }}
    radius={500}
  />
</MapView>

```

QUÉ PODÉS DIBUJAR ENCIMA

`Marker`  - un pin. Acepta un componente propio como
hijo.

`Polyline`  - un recorrido.

`Polygon`  - un área.

`Circle`  - centro y radio en metros.
Todos van como hijos directos de <MapView> . latitudeDelta es el zoom: cuántos grados entran en la pantalla.

Viene incluido en Expo Go ( `1.27.2` en SDK 57): se prueba sin configurar nada.

<!-- página 16 -->

UNIDAD 4 · PARTE 2 · UBICACIÓN Y MAPAS **El mapa en producción**

###### **En desarrollo**

Nada. Expo Go trae la librería y usa Apple Maps en iOS y Google Maps en Android, sin credenciales.

**En la build de la tienda** Google Maps exige una **clave de API** propia, restringida por huella SHA-1 y por identificador de paquete.

```
{
  "expo": {
    "plugins": [
      ["react-native-maps", { "androidGoogleMapsApiKey": "process.env.GOOGLE_MAPS_KEY" }]
    ]
  }
}
```

La clave **no va escrita en el repositorio** : variable de entorno y, en EAS, un secret. Lo retomamos en la Unidad 7.

<!-- página 17 -->

UNIDAD 4 · PARTE 2 · UBICACIÓN Y MAPAS
###### **expo-maps : hacia dónde va el SDK**

**Qué propone**
Un módulo propio de Expo, con un componente por
plataforma en vez de una abstracción común.

```
import { AppleMaps, GoogleMaps } from 'expo-maps';

Platform.OS === 'ios'
  ? <AppleMaps.View style={{ flex: 1 }} />
  : <GoogleMaps.View style={{ flex: 1 }} />

```

**ALPHA**
**Por qué todavía no lo usamos**

La propia documentación avisa que va a tener **cambios**
**que rompen**, seguido.

**No está en Expo Go** : hace falta development build.

Google Maps solo en Android, Apple Maps solo en iOS. No
hay un componente único.

Decisión de la cursada: se enseña `react-native-maps` y se muestra `expo-maps` para que sepan que existe. Si tu
grupo quiere usarlo en el TP, se puede — pero asumiendo que puede romperse en una actualización.

<!-- página 18 -->

UNIDAD 4 · PARTE 3
#### **Sensores y hápticos**

Leer el mundo físico y contestarle.

<!-- página 19 -->

UNIDAD 4 · PARTE 3 · SENSORES Y HÁPTICOS
###### **Lo que trae expo-sensors**

**Acelerómetro**
Aceleración en g sobre x, y,
z. Inclinación, sacudidas,
pasos.

**LightSensor**
Luz ambiente en lux. **Solo**
**Android.**

**Giroscopio**
Velocidad de rotación en
rad/s. Orientación del
dispositivo.

**Podómetro**
Conteo de pasos, en vivo o
histórico.

**Magnetómetro**
Campo magnético en μT. Es
lo que hace funcionar una
brújula.

**DeviceMotion**
Los tres primeros
combinados y ya
procesados. El más
práctico.

**Barómetro**
Presión en hPa. Altitud
aproximada, clima. No
todos lo tienen.

**Todos**
Misma API: suscribirse, fijar
frecuencia, desuscribirse.

En el simulador de iOS los sensores **no existen** . Esta parte se prueba sí o sí en un teléfono real.

<!-- página 20 -->

UNIDAD 4 · PARTE 3 · SENSORES Y HÁPTICOS **El patrón, siempre igual**

```
import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
useEffect(() => {
  let suscripcion: { remove: () => void };
  (async () => {
    if (!(await Accelerometer.isAvailableAsync())) return;   // 1 · ¿existe?
    Accelerometer.setUpdateInterval(100);                    // 2 · cada 100 ms
    suscripcion = Accelerometer.addListener(setDatos);       // 3 · escuchar
  })();
  return () => suscripcion?.remove();                        // 4 · soltar
}, []);
```

Si encontrás `activate()` , `deactivate()` o `removeAllListeners()` en un apunte, está viejo: los dos primeros no existen y el tercero está **DEPRECADO** en favor de `subscription.remove()` .

<!-- página 21 -->

UNIDAD 4 · PARTE 3 · SENSORES Y HÁPTICOS **Un ejemplo entero: detectar una sacudida**

```
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
const UMBRAL = 1.8;   // en g. En reposo el módulo del vector da ≈ 1.
useEffect(() => {
  Accelerometer.setUpdateInterval(100);
  const sub = Accelerometer.addListener(({ x, y, z }) => {
    if (Math.sqrt(x * x + y * y + z * z) > UMBRAL) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      sortearPregunta();
    }
  });
  return () => sub.remove();
}, []);
```

El módulo del vector no depende de cómo esté agarrado el teléfono: sirve igual en cualquier orientación. Una sacudida firme pasa de 1,8.

<!-- página 22 -->

UNIDAD 4 · PARTE 3 · SENSORES Y HÁPTICOS
###### **Hápticos: tres tipos de respuesta**

```
selectionAsync()
```

Cambió una selección. Elegir un ítem,
mover un slider, pasar de pestaña.

El más sutil.

```
notificationAsync(tipo)
```

`Success`, `Warning`, `Error` .
Resultado de una acción: se guardó,
falló el pago.

```
impactAsync(estilo)
```

`Light`, `Medium`, `Heavy`, `Rigid`,

`Soft` . Un choque físico simulado.

En Android la documentación recomienda `performAndroidHapticsAsync(AndroidHaptics.Confirm)` antes que

`impactAsync` : usa el motor háptico del sistema y no necesita el permiso `VIBRATE` .

En iOS no pasa nada con el modo de bajo consumo activo, con el Taptic Engine apagado o con la cámara en uso.
**Nunca uses la vibración como única señal.**

<!-- página 23 -->

UNIDAD 4 · PARTE 4
#### **Sistema de archivos**

API nueva desde el SDK 54. La anterior ya no funciona.

<!-- página 24 -->

UNIDAD 4 · PARTE 4 · SISTEMA DE ARCHIVOS
###### **Esto cambió, y cambió fuerte**

Las funciones sueltas — `writeAsStringAsync`, `readAsStringAsync`, `getInfoAsync` …— **tiran error en tiempo de**
**ejecución** . No están deprecadas: no andan.

**SDK 53 Y ANTERIORES**
ANTES

```
import * as FileSystem from 'expo-file-system';

const uri = FileSystem.documentDirectory + 'notas.txt';
await FileSystem.writeAsStringAsync(uri, texto);
const leido = await FileSystem.readAsStringAsync(uri);

```

**SDK 54 EN ADELANTE**
AHORA

```
import { File, Paths } from 'expo-file-system';

const archivo = new File(Paths.document, 'notas.txt');
archivo.create();
archivo.write(texto);
const leido = archivo.textSync();

```

Si tenés código viejo que no querés reescribir hoy, existe la puerta de servicio: `import * as FileSystem from 'expo-`
`file-system/legacy'` . Sirve para migrar de a poco, no para arrancar un proyecto nuevo.

<!-- página 25 -->

UNIDAD 4 · PARTE 4 · SISTEMA DE ARCHIVOS
###### **La tabla de traducción**

**API vieja** **API nueva**

```
documentDirectory

cacheDirectory

writeAsStringAsync()

readAsStringAsync()

```

`deleteAsync()` - `moveAsync()` - `copyAsync()`

```
makeDirectoryAsync()

readDirectoryAsync()

getInfoAsync()

downloadAsync()

```

```
Paths.document

Paths.cache

archivo.write()

```

`archivo.text()` - `textSync()`

`archivo.delete()` - `move()` - `copy()`

```
new Directory(…).create()

directorio.list()

```

`archivo.exists` - `archivo.info`

```
File.downloadFileAsync()

```

El cambio de fondo: de **funciones sobre strings** a **objetos con métodos** . Un `File` sabe si existe, cuánto pesa y
cómo leerse; ya no arrastrás la URI a todos lados.

<!-- página 26 -->

UNIDAD 4 · PARTE 4 · SISTEMA DE ARCHIVOS
###### **Dónde guardar cada cosa**

```
Paths.document
```

Permanente. Sobrevive a reinicios y
actualizaciones. Se borra solo al
desinstalar.

Notas del usuario, borradores, la foto
que subió.

```
Paths.cache
```

Temporal. El sistema lo puede vaciar
cuando le falta espacio, sin avisarte.

Miniaturas, descargas en curso, la
salida de la cámara.

**Diagnóstico**

`Paths.availableDiskSpace` y

`Paths.totalDiskSpace` reemplazan a
las viejas funciones de espacio libre.

En iOS el sistema **revisa** qué guardás en documentos. Poner ahí archivos que se pueden volver a descargar es motivo
de rechazo en la App Store. Descargas → caché.

<!-- página 27 -->

UNIDAD 4 · PARTE 4 · SISTEMA DE ARCHIVOS **Leer, escribir, recorrer**

```
import { File, Directory, Paths } from 'expo-file-system';
const carpeta = new Directory(Paths.document, 'notas');     // crear
if (!carpeta.exists) carpeta.create();
const archivo = new File(carpeta, 'clase-09.md');
archivo.create({ overwrite: true });
archivo.write('# Unidad 4');
console.log(archivo.textSync());                            // leer, sincrónico
console.log(await archivo.text());                          // …o asincrónico
for (const item of carpeta.list()) {                        // recorrer
  if (item instanceof File) console.log(item.name, item.size);
}
```

Las versiones sincrónicas son nuevas y son cómodas: para un archivo de configuración de 2 KB no tiene sentido un `await` . Para algo grande, seguí usando la asincrónica o vas a trabar la interfaz.

<!-- página 28 -->

UNIDAD 4 · PARTE 4 · SISTEMA DE ARCHIVOS **Descargar con barra de progreso**

```
import { File, Directory, Paths } from 'expo-file-system';
// Simple: se resuelve cuando terminó
const destino = new Directory(Paths.cache, 'pdfs');
if (!destino.exists) destino.create();
const bajado = await File.downloadFileAsync('https://…/apunte.pdf', destino);
// Con progreso: lo que necesitás para mostrar una barra
const salida = new File(Paths.cache, 'video.mp4');
const tarea = File.createDownloadTask('https://…/video.mp4', salida, {
  onProgress: ({ bytesWritten, totalBytesExpectedToWrite }) => {
    setAvance(bytesWritten / totalBytesExpectedToWrite);
  },
});
await tarea.start();
```

También existe `archivo.watch(callback)` , que avisa cuando un archivo o directorio cambia. Útil si dos partes de la app tocan lo mismo.

<!-- página 29 -->

UNIDAD 4 · PARTE 4 · SISTEMA DE ARCHIVOS **Cerrar el círculo: guardar la foto**

```
import { File, Directory, Paths } from 'expo-file-system';
async function guardarFoto(uriDeLaCamara: string) {
  const galeria = new Directory(Paths.document, 'fotos');
  if (!galeria.exists) galeria.create();
```

```
const temporal = new File(uriDeLaCamara);            // está en la caché
const definitiva = new File(galeria, `${Date.now()}.jpg`);
```

```
  temporal.copy(definitiva);                            // ahora sí sobrevive
  return definitiva.uri;
}
```

`takePictureAsync` y `launchImageLibraryAsync` devuelven una URI en la **caché** . Si tu app guarda la referencia en una base de datos y no copia el archivo, en unos días la imagen no está más. Es un bug que aparece en la entrega final, nunca en la demo.

<!-- página 30 -->

UNIDAD 4 · PARTE 5
#### **Multimedia**

Reproducir video, reproducir audio y grabar con el micrófono.

<!-- página 31 -->

UNIDAD 4 · PARTE 5 · MULTIMEDIA **Dos paquetes, un mismo patrón**

###### **ELIMINADO EN SDK 55**

```
expo-av 
```

Traía `<Video>` y `Audio.Sound` en un solo paquete. **Ya no existe** : instalarlo no es una opción, y casi todo el material que van a encontrar googleando lo usa.

**`expo-video` +** **`expo-audio`**

Se partió en dos. Los dos comparten la misma idea: un **reproductor** —el objeto que tiene el estado— y, si hay algo que mostrar, una **vista** aparte que lo dibuja.

El reproductor **no vive en el estado de React** : cambiarle una propiedad no re-renderiza nada. Para mostrar en pantalla si está reproduciendo hay que **escuchar sus eventos** — es el mismo patrón que los sensores de la Parte 3.

<!-- página 32 -->

###### UNIDAD 4 · PARTE 5 · MULTIMEDIA

###### **Video**

```
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
export function Reproductor({ fuente }: { fuente: string }) {
  const player = useVideoPlayer(fuente, p => { p.loop = true; p.play(); });
  // el estado NO es de React: hay que escucharlo
  const { isPlaying } = useEvent(player, 'playingChange',
                                 { isPlaying: player.playing });
  return (
    <>
      <VideoView style={e.video} player={player}
                 fullscreenOptions={{ enable: true }} allowsPictureInPicture />
      <Button title={isPlaying ? 'Pausar' : 'Reproducir'}
              onPress={() => isPlaying ? player.pause() : player.play()} />
    </>
  );
}
```

Seguir reproduciendo con la app en segundo plano y el picture-in-picture **no se prenden desde el código** : van en el config plugin de `expo-video` en `app.json` y piden recompilar.

<!-- página 33 -->

UNIDAD 4 · PARTE 5 · MULTIMEDIA
###### **Audio: reproducir y grabar**

REPRODUCIR

```
import { useAudioPlayer } from 'expo-audio';

const sonido = useAudioPlayer(require('./assets/ok.mp3'));

<Button title="Sonar" onPress={() => {
  sonido.seekTo(0);
  sonido.play();
}} />

```

GRABAR

```
import { useAudioRecorder, useAudioRecorderState,
         RecordingPresets, AudioModule } from 'expo-audio';

const grabador = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
const estado   = useAudioRecorderState(grabador);

await AudioModule.requestRecordingPermissionsAsync();

await grabador.prepareToRecordAsync();
grabador.record();
// ...
await grabador.stop();     // el archivo queda en grabador.uri

```

Por defecto la grabación se guarda en la **caché** - el mismo problema que la foto de la cámara. Se resuelve igual:
copiándola con `expo-file-system`, o pasándole `{ ...RecordingPresets.HIGH_QUALITY, directory: 'document'`
`}` .

<!-- página 34 -->

UNIDAD 4
##### **Lo que queda**

**Notificaciones**  - el deck que sigue: locales y push.

**Unidad 5**  - dónde se guarda lo que hoy escribimos en un archivo: SQLite, almacenamiento clave-valor y el
servidor.

`docs.expo.dev/versions/latest/sdk/camera` - `/imagepicker` - `/location` - `/map-view` - `/sensors` - `/haptics`
`/filesystem` - `/video` - `/audio`

---

<a id="doc-13"></a>

## 13. Unidad 4 — Notificaciones · Desarrollo para Móviles

> **Fuente:** `U04.T03 - Notificaciones.pdf` · **Páginas:** 29 · **Palabras:** 2.047 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 4** **Notificaciones**

Locales y push · `expo-notifications`

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 4
#### **Qué vamos a ver**

##### **Objetivos**
Programar, cancelar y reaccionar a notificaciones locales. Entender el recorrido completo de una notificación push. Obtener y administrar un token de dispositivo. Diagnosticar por qué una push no llegó.

##### **Partes**
###### Qué es una notificación Notificaciones locales Notificaciones push Buenas prácticas y diagnóstico

Las **locales** se prueban en Expo Go y no necesitan servidor: es
donde vamos a pasar la mayor parte de la clase.

<!-- página 3 -->

UNIDAD 4 · PARTE 1
### **Qué es una notificación**
###### El único canal que tenés cuando la app está cerrada.

<!-- página 4 -->

UNIDAD 4 · PARTE 1 · QUÉ ES UNA NOTIFICACIÓN
#### **Lo que la vuelve distinta**

**9:41** **`▮▮▮`**

**9:41**
martes 4 de agosto

**MI APP · ahora**
**Se acerca la entrega**
El TP integrador cierra en 2 días.

**MI APP · hace 1 h**
**Germán comentó tu entrega**

La app está cerrada. El sistema dibuja esto, no vos.
##### **No es una pantalla de tu app**
La dibuja el sistema operativo. Vos aportás título, cuerpo y datos; el aspecto y el momento los decide él.

##### **Es un permiso, y de los caros**
El usuario lo concede una vez y lo revoca a la primera molestia. Una app que abusa pierde el canal para siempre.

##### **Es el único canal con la app cerrada**
###### Sin notificaciones, tu app solo existe mientras alguien la está mirando.

<!-- página 5 -->

UNIDAD 4 · PARTE 1 · QUÉ ES UNA NOTIFICACIÓN
#### **Locales y push**

**ARRANCAMOS POR ACÁ**
##### LOCAL
La programa la propia app, en el dispositivo. No necesita internet ni servidor. El sistema la guarda y la dispara aunque la app esté cerrada. Recordatorios, temporizadores, alarmas, vencimientos. **Funciona en Expo Go.**

##### PUSH
La manda un servidor, en cualquier momento. Necesita conexión, un token por dispositivo y credenciales. Pasa por Google (FCM) o Apple (APNs). Mensajes nuevos, cambios de estado de un pedido. **Necesita development build.**

Existe un tercer tipo, la **push silenciosa** : no muestra nada, solo
despierta la app para que corra un poco de JavaScript en segundo

<!-- página 6 -->

plano (sincronizar datos, por ejemplo). Sale del alcance de la
materia.

<!-- página 7 -->

UNIDAD 4 · PARTE 1 · QUÉ ES UNA NOTIFICACIÓN
#### **Quién decide qué se ve**

##### **App en primer plano**
El usuario está mirando tu app. Decidís vos, con setNotificationHandler . Por defecto no se muestra nada: si no configurás el handler, parece que la notificación se perdió.

##### **App en segundo plano**
Minimizada. Decide el sistema : muestra el banner y lo deja en el centro de notificaciones.

##### **App cerrada**
Terminada por el usuario o por el sistema. También decide el sistema; tu código ni se ejecuta.

El «no me llega la notificación» número uno de la cursada: **la app**
**estaba abierta y no había handler** . Probar siempre con la app
minimizada antes de salir a buscar el problema en otro lado.

<!-- página 8 -->

UNIDAD 4 · PARTE 2
### **Notificaciones locales**
###### Sin servidor, sin internet, sin credenciales.

<!-- página 9 -->

UNIDAD 4 · PARTE 2 · NOTIFICACIONES LOCALES **Instalar y configurar**

`{ "expo": { "plugins": [ ["expo-notifications", { "icon": "./assets/notificacion.png", "color": "#0B3A5D", "sounds": ["./assets/aviso.wav"] }] ] } }` **`ICON` Y** **`COLOR`**

Solo Android. Silueta blanca sobre transparente: el sistema la recorta.

```
SOUNDS
```

Se empaquetan en el binario y después se referencian por nombre.

Es un config plugin: tocarlo **obliga a compilar de nuevo** .

<!-- página 10 -->

UNIDAD 4 · PARTE 2 · NOTIFICACIONES LOCALES

#### **El handler: qué pasa con la app abierta**

```
import * as Notifications from 'expo-notifications';
```

```
// Se declara UNA vez, fuera del componente, al 
cargar el módulo.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,    // el cartel que baja 
arriba
```

```
    shouldShowList: true,      // queda en el centro 
de notificaciones
    shouldPlaySound: true,
    shouldSetBadge: false,     // el globito rojo 
sobre el ícono
```

```
}),
```

```
});
```

`handleNotification` recibe la notificación, así que podés decidir por contenido: si el usuario ya está en la pantalla del chat, devolvé `shouldShowBanner: false` .

<!-- página 11 -->

UNIDAD 4 · PARTE 2 · NOTIFICACIONES LOCALES **Permisos y canales**

```
async function pedirPermiso() {
  if (Platform.OS === 'android') {        // el canal 
va ANTES del permiso
    await 
Notifications.setNotificationChannelAsync('default', 
{
      name: 'Avisos generales',
      importance: 
Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  const { status } = await 
Notifications.getPermissionsAsync();
  if (status === 'granted') return true;
  const pedido = await 
Notifications.requestPermissionsAsync();
  return pedido.status === 'granted';
}
```

Un **canal** de Android es una categoría que el usuario puede silenciar por separado —«promociones» sí, «mensajes» no—. Sin al menos un canal creado, en Android 13 o superior el cartel de permiso **no aparece** .

<!-- página 12 -->

UNIDAD 4 · PARTE 2 · NOTIFICACIONES LOCALES

#### **Programar**

##### AHORA MISMO

```
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Listo',
    body: 'Se guardó tu entrega.',
    data: { ruta: '/entregas/42' },
  },
  trigger: null,
});
```

##### EN UN RATO, Y REPITIENDO

```
trigger: {
  type: Notifications.SchedulableTriggerInputTypes
          .TIME_INTERVAL,
  seconds: 60 * 20,
  repeats: true,
}
```

##### EN UNA FECHA EXACTA

```
trigger: {
  type: Notifications.SchedulableTriggerInputTypes
          .DATE,
  date: new Date('2026-11-14T09:00:00'),
}
```

<!-- página 13 -->

###### Hay más tipos —diario, semanal, coincidencia de calendario en iOS—. Están en SchedulableTriggerInputTypes .

El `trigger` ahora **lleva** **`type`** . Si ves `trigger: { seconds: 60 }`
suelto, es la forma vieja **DEPRECADA** .

<!-- página 14 -->

UNIDAD 4 · PARTE 2 · NOTIFICACIONES LOCALES

#### **Administrar lo programado**

```
// Guardá el identificador: es lo único que te deja 
cancelar una sola.
```

```
const id = await 
Notifications.scheduleNotificationAsync({ /* … */ });
```

```
await 
```

```
Notifications.cancelScheduledNotificationAsync(id);
await 
Notifications.cancelAllScheduledNotificationsAsync();
```

```
const pendientes = await 
Notifications.getAllScheduledNotificationsAsync();
console.log(pendientes.length);
```

```
// Distinto: esto limpia lo que YA se mostró y está 
en el centro de notificaciones.
```

```
await Notifications.dismissAllNotificationsAsync();
```

**Cancelar ≠ descartar.** `cancel…` borra algo que todavía no se disparó; `dismiss…` saca de la bandeja algo que ya apareció. Y reprogramar sin cancelar duplica: si el usuario edita el recordatorio tres veces, recibe tres notificaciones.

<!-- página 15 -->

UNIDAD 4 · PARTE 2 · NOTIFICACIONES LOCALES **Reaccionar al toque**

```
const router = useRouter();
```

```
useEffect(() => {
  // Llegó mientras la app estaba abierta.
  const recibida = 
Notifications.addNotificationReceivedListener((n) => 
{
    console.log('llegó:', n.request.content.title);
  });
  // El usuario la apretó: la app puede estar 
abierta, minimizada o cerrada.
  const tocada = 
Notifications.addNotificationResponseReceivedListener
((r) => {
    const { ruta } = 
r.notification.request.content.data;
    if (ruta) router.push(ruta);
  });
  return () => { recibida.remove(); tocada.remove(); 
};
}, []);
```

Por eso el campo `data` lleva la ruta y no el texto: es lo que convierte la notificación en un atajo a una pantalla concreta. Con Expo Router, `router.push(ruta)` y listo.

<!-- página 16 -->

UNIDAD 4 · PARTE 3
### **Notificaciones push**
###### Del servidor al teléfono, y todo lo que hay en el medio.

<!-- página 17 -->

UNIDAD 4 · PARTE 3 · NOTIFICACIONES PUSH
#### **El recorrido completo**

##### **1 · La app**
###### Pide permiso y genera un token : ExponentPushToken[…] . Se lo manda a tu servidor.

##### **2 · Tu servidor**
###### Guarda el token asociado al usuario. Cuando pasa algo, arma el mensaje.

##### **3 · Expo Push Service**
Recibe el mensaje, mira el token y decide si va por Google o por Apple.

##### **4 · FCM / APNs**
El servicio de Google o Apple lo entrega al dispositivo. Es el único que puede.

**App**
genera el token

**TU SERVIDOR**
⇄

**FCM · APNs**
vía Expo Push Service

<!-- página 18 -->

UNIDAD 4 · PARTE 3 · NOTIFICACIONES PUSH

#### **Conseguir el token**

```
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
```

```
import Constants from 'expo-constants';
```

```
export async function registrarParaPush() {
  if (!Device.isDevice) return null;                 
// 1 · ¿dispositivo real?
```

```
  if (!(await pedirPermiso())) return null;          
// 2 · permiso + canal
```

```
const projectId = 
```

```
Constants.expoConfig?.extra?.eas?.projectId;   // 3 · 
proyecto
```

```
  if (!projectId) throw new Error('Falta el projectId 
de EAS');
```

```
const { data: token } =
```

```
    await Notifications.getExpoPushTokenAsync({ 
projectId });      // 4 · token
```

```
  await fetch('https://mi-api/tokens', {               
// 5 · al servidor
```

```
method: 'POST',
```

```
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token }),
});
```

```
return token;   // 
```

<!-- página 19 -->

```
ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
}
```

<!-- página 20 -->

UNIDAD 4 · PARTE 3 · NOTIFICACIONES PUSH

#### **Qué hace falta antes de que esto ande**

##### **DEVELOPMENT BUILD**

Expo Go no sirve para push en Android desde el SDK 53.

```
eas build --profile development
```

##### **CREDENCIALES**

Una clave de APNs para iOS y las de FCM para Android.

`eas credentials` las genera y las guarda.

##### **DÓNDE PROBAR**

Dispositivo físico, emulador de Android con Google Play, o simulador de iOS con Xcode 14 o superior.

<!-- página 21 -->

UNIDAD 4 · PARTE 3 · NOTIFICACIONES PUSH

#### **Mandar una push**

##### PARA PROBAR — `CURL`

```
curl -X POST https://exp.host/--/api/v2/push/send 
\
  -H "Content-Type: application/json" \
  -d '{
    "to": "ExponentPushToken[xxxxxxxx]",
    "title": "Se corrigió tu entrega",
    "body": "Entrá para ver la devolución.",
    "data": { "ruta": "/entregas/42" }
  }'
```

##### CÓDIGO DE SERVIDOR — `EXPO-SERVER-SDK`

```
import { Expo } from 'expo-server-sdk';
const expo = new Expo();
```

```
const mensajes = tokens
  .filter(t => Expo.isExpoPushToken(t))
  .map(to => ({ to, title: 'Novedad', body: '…' 
}));
```

```
const tickets = [];
for (const lote of 
expo.chunkPushNotifications(mensajes)) {
  tickets.push(...await 
expo.sendPushNotificationsAsync(lote));
}
```

<!-- página 22 -->

El SDK de servidor no es un lujo: parte en lotes de 100, limita las
conexiones en paralelo y valida el formato del token. Hacerlo a mano
con `fetch` funciona hasta que tenés doscientos usuarios.

<!-- página 23 -->

UNIDAD 4 · PARTE 3 · NOTIFICACIONES PUSH **Tickets y recibos: no son lo mismo**

**TICKET — INMEDIATO**

Respuesta de Expo al recibir tu mensaje. `status: "ok"` significa **«lo tomé»** , no «llegó».

Trae un `id` para consultar después.

##### **RECIBO — A LOS ~15 MINUTOS**

Dice qué contestaron Google o Apple. Es el único lugar donde te enterás de que un token murió.

```
await expo.getPushNotificationReceiptsAsync(ids);
```

Si tu servidor no lee los recibos, va a seguir mandando mensajes a teléfonos que desinstalaron la app. Con el tiempo Expo empieza a limitarte por tasa de error.

<!-- página 24 -->

UNIDAD 4 · PARTE 3 · NOTIFICACIONES PUSH

**Los errores que vas a ver**

###### **`DEVICENOTREGISTERED`**

Desinstaló la app o revocó el permiso. **Borrá ese token de tu base de datos** , no reintentes.

###### **`MESSAGETOOBIG`**

El mensaje completo pasa de 4 KB. Mandá un identificador en `data` , no el contenido entero.

```
MESSAGERATEEXCEEDED
```

Demasiados mensajes al mismo dispositivo. Reintento con espera creciente.

`MismatchSenderId` aparece en Android cuando las credenciales de FCM no corresponden al proyecto. Se arregla con `eas credentials` , no en el código.

Para probar rápido sin servidor: la **Expo Push Notifications Tool** en `expo.dev/notifications` . Pegás el token y mandás.

<!-- página 25 -->

UNIDAD 4 · PARTE 3 · NOTIFICACIONES PUSH
#### **Dónde vive cada cosa**

##### EN LA APP
El token propio, y nada más. Se regenera cuando hace falta: no hay que persistirlo con cuidado.

##### EN EL SERVIDOR
La tabla de tokens, asociada a usuarios. La lógica de a quién y cuándo notificar. Las credenciales de FCM y APNs.

Un token no es un secreto grave, pero **la lista completa sí lo es** :
con ella cualquiera le manda notificaciones a todos tus usuarios.
Nunca la expongas en un endpoint público ni la metas en el
repositorio.

<!-- página 26 -->

UNIDAD 4 · PARTE 4
### **Buenas prácticas y diagnóstico**
###### Cómo no perder el permiso, y qué mirar cuando no llega.

<!-- página 27 -->

UNIDAD 4 · PARTE 4 · BUENAS PRÁCTICAS Y DIAGNÓSTICO
#### **Cuándo notificar**

##### **Sí**
Algo que el usuario pidió: un recordatorio que él programó. Algo que lo involucra: le respondieron, le asignaron una tarea. Algo con vencimiento real.

##### **No**
«Hace 3 días que no entrás». Promociones sin que las haya pedido. Cinco avisos separados de lo mismo en vez de uno agrupado. De madrugada, porque tu servidor corre en otro huso horario.

Dos reglas que valen para el TP: **pedí el permiso recién cuando el**
**usuario activa algo que lo necesita**, y **dale una pantalla de**
**ajustes** para elegir qué avisos quiere. Es más barato que perder el
permiso entero.

<!-- página 28 -->

UNIDAD 4 · PARTE 4 · BUENAS PRÁCTICAS Y DIAGNÓSTICO
#### **No me llega. ¿Qué miro?**

##### **Primero, lo tonto**
¿La app está en primer plano y falta el handler? ¿El permiso está concedido? ¿ canAskAgain quedó en false ? ¿Estás en Expo Go queriendo probar push? ¿El dispositivo está en «no molestar»?

##### **Después, la cadena**
¿El token se generó? Imprimilo. ¿La herramienta de Expo entrega a ese token? ¿Qué dice el recibo, no el ticket? ¿ eas credentials muestra clave de APNs y de FCM?

Diagnosticá **en ese orden** . La mayoría de los casos se resuelven en
la columna de la izquierda, y la de la derecha lleva media hora.

<!-- página 29 -->

UNIDAD 4

### **Documentación**

```
docs.expo.dev/versions/latest/sdk/notifications
docs.expo.dev/push-notifications/overview
docs.expo.dev/push-notifications/push-
notifications-setup
```

```
docs.expo.dev/push-notifications/sending-
notifications
```

Speaker notes

---

<a id="doc-14"></a>

## 14. Unidad 5 — Redes · Desarrollo para Móviles

> **Fuente:** `U05.T01 - Redes.pdf` · **Páginas:** 23 · **Palabras:** 1.900 · **Imágenes:** 1

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 5** **Redes**

Fetch · Axios · TanStack Query

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 5
###### **Qué vamos a ver**

**Objetivos** **Partes**

Pedir y enviar datos a un servidor.

Manejar carga, error y cancelación como parte del diseño.

Centralizar la configuración de la API.

Dejar de escribir a mano la sincronización con el servidor.

Hablar con un servidor

Axios

TanStack Query

Persistencia, estado global y conectividad van en el deck
siguiente.

<!-- página 3 -->

UNIDAD 5 · PARTE 1
#### **Hablar con un servidor**

<!-- página 4 -->

UNIDAD 5 · PARTE 1 · HABLAR CON UN SERVIDOR
###### **Por qué en móvil es distinto**

**En el navegador de una computadora** **En un teléfono**
La conexión casi siempre está. Se entra y se sale del ascensor, del subte, del campo.

Cambiar de red es raro.

Si falla, el usuario recarga.

Wi-Fi → datos móviles a mitad de un request.

«Conectado» no significa que haya internet: el portal
cautivo del bar te contesta a todo.

No hay botón de recargar.

Consecuencia práctica: **el estado de error y el de carga no son excepciones, son parte del diseño de la pantalla** .
Una pantalla que solo contempla el caso feliz está a medio hacer.

<!-- página 5 -->

UNIDAD 5 · PARTE 1 · HABLAR CON UN SERVIDOR

##### **Fetch, lo provee React Native**

```
async function traerProductos() {
  const respuesta = await fetch('https://api.ejemplo.com/productos', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const datos = await respuesta.json();
  return datos;
}
```

**Ya está disponible** React Native lo expone como global, igual que el navegador. No se instala nada.

###### **Basado en promesas**

Funciona con `async/await` sin vueltas.

**En contra** Sin JSON automático, sin tiempo de espera, sin reintentos, y con una trampa grande.

<!-- página 6 -->

UNIDAD 5 · PARTE 1 · HABLAR CON UN SERVIDOR
###### **La trampa: un 404 no es un error**

LO QUE CASI TODOS ESCRIBEN

```
try {
  const r = await fetch(url);
  const datos = await r.json();
  mostrar(datos);          // ← con un 404 llega acá
} catch (e) {
  mostrarError(e);         // ← nunca entra
}

```

LO QUE HAY QUE ESCRIBIR

```
try {
  const r = await fetch(url);

  if (!r.ok) {             // ← el chequeo que falta
    throw new Error(`El servidor respondió ${r.status}`);
  }

  mostrar(await r.json());
} catch (e) {
  mostrarError(e);
}

```

`fetch` solo rechaza la promesa si **no llegó a hablar con el servidor** —sin red, DNS caído, TLS inválido—. Un 404 o
un 500 son respuestas exitosas desde su punto de vista: **chequeá** **`response.ok`** **siempre** .

<!-- página 7 -->

UNIDAD 5 · PARTE 1 · HABLAR CON UN SERVIDOR

##### **Los tres estados de cualquier request**

![Imagen de la página 7](assets/u05-t01-redes/p0007-02.png)

<!-- Start of picture text -->
9:41 ▮▮▮ 9:41 ▮▮▮ 9:41 ▮▮▮<br>Productos<br>No pudimos conectarnos<br>Revisá tu conexión.<br>Reintentar<br>Cargando Error — con salida Dato<br><!-- End of picture text -->

Las tres se diseñan. La del medio es la que siempre falta, y es la única que el usuario va a ver justo cuando más lo necesita.

<!-- página 8 -->

UNIDAD 5 · PARTE 1 · HABLAR CON UN SERVIDOR **Cancelar el request**

```
useEffect(() => {
  const control = new AbortController();
  (async () => {
    try {
      const r = await fetch(url, { signal: control.signal });
      if (!r.ok) throw new Error(`Error ${r.status}`);
      setDatos(await r.json());
    } catch (e) {
      if (e.name !== 'AbortError') setError(e);   // cancelar no es fallar
    }
  })();
  return () => control.abort();
}, [url]);
```

Sin esto: el usuario sale de la pantalla, la respuesta llega igual y React avisa que actualizaste un componente desmontado. En una lista donde se escribe para buscar, además se pisan las respuestas y gana la más lenta.

<!-- página 9 -->

UNIDAD 5 · PARTE 2
#### **Axios**

Lo mismo, con lo repetido ya resuelto.

<!-- página 10 -->

UNIDAD 5 · PARTE 2 · AXIOS
###### **Qué te ahorra**

**JSON automático**

`response.data` ya viene
parseado. Sin `await`

`r.json()` .

**Errores de verdad**
Un 404 o un 500 **sí**
rechazan la promesa. Se
acabó el `response.ok` .

**Tiempo de espera**

`timeout` por configuración.
Fetch no lo tiene.

**Interceptores**
Un lugar único donde tocar
todas las peticiones y todas
las respuestas.

También cancela, igual que Fetch y con la misma `AbortController` : no es una API distinta, es la misma del estándar.

<!-- página 11 -->

UNIDAD 5 · PARTE 2 · AXIOS **Un cliente para toda la app**

```
// api/cliente.ts — se escribe una vez
import axios from 'axios';
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,   // https://api.ejemplo.com
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});
// en cualquier pantalla
import { api } from '@/api/cliente';
const { data } = await api.get('/productos');
await api.post('/productos', { nombre, precio });
```

La URL del servidor aparece **una sola vez** en todo el proyecto. Cuando pases de tu máquina a producción, cambiás una variable de entorno y no veinte archivos.

<!-- página 12 -->

##### UNIDAD 5 · PARTE 2 · AXIOS **Interceptores: el token, en un solo lugar**

```
// Antes de cada petición: adjuntar el token.
api.interceptors.request.use(async (config) => {
  const token = await leerToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Después de cada respuesta: reaccionar a un 401 en un solo lado.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (error.response?.status === 401) cerrarSesion();
    return Promise.reject(error);
  },
);
```

Sin interceptores, ese `if (401)` queda copiado en cada pantalla que llama a la API. El token va a `expo-securestore` , no a un archivo de texto — lo vemos en la Unidad 6.

<!-- página 13 -->

UNIDAD 5 · PARTE 2 · AXIOS **El error de Axios tiene tres formas**

```
try {
  const { data } = await api.get('/productos');
} catch (e) {
  if (e.response) {
    // Llegó al servidor y contestó mal. Es el caso más informativo.
    console.log(e.response.status, e.response.data);
  } else if (e.request) {
    // Salió el request y nunca volvió: sin red, servidor caído, timeout.
    mostrar('No pudimos conectarnos. Revisá tu conexión.');
  } else {
    // Ni salió: error de configuración del request. Es un bug tuyo.
    console.error(e.message);
  }
}
```

Esa distinción es la que te deja escribir un mensaje útil. «Algo salió mal» no le sirve a nadie; «no hay conexión» y «ese producto no existe» sí.

<!-- página 14 -->

UNIDAD 5 · PARTE 2 · AXIOS
###### **¿Fetch o Axios?**

FETCH ALCANZA SI… AXIOS CONVIENE SI…
Son dos o tres requests sueltos. Hay una API propia con muchos endpoints.

No hay autenticación.

Querés cero dependencias.

Hay token y sesión que expira.

Querés el mismo manejo de errores en toda la app.

Ninguno de los dos resuelve el problema que viene ahora: **qué hacer con el dato una vez que llegó** . Dónde se
guarda, cuándo está viejo, quién lo vuelve a pedir.

<!-- página 15 -->

UNIDAD 5 · PARTE 3
#### **TanStack Query**

El dato del servidor no es estado de tu app: es una copia.

<!-- página 16 -->

UNIDAD 5 · PARTE 3 · TANSTACK QUERY
###### **Dos clases de estado**

ESTADO DEL CLIENTE

El texto de un formulario, si el modal está abierto, el
tema oscuro.

**Vos sos el dueño.** Es la verdad.

Sincrónico y siempre disponible.
###### useState, Context, Zustand.

ESTADO DEL SERVIDOR

La lista de productos, el perfil, los pedidos.

**El dueño es otro.** Vos tenés una copia que envejece.

Asincrónico, puede fallar, puede quedar viejo sin
avisarte.

###### TanStack Query.

Meter el estado del servidor en un `useState` es el error de diseño más común. Funciona, y después hay que escribir a
mano caché, reintentos, invalidación y refresco al volver a la app.

<!-- página 17 -->

UNIDAD 5 · PARTE 3 · TANSTACK QUERY
###### **Lo mismo, en dos versiones**

A MANO

```
const [datos, setDatos] = useState(null);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const c = new AbortController();
  setCargando(true);
  api.get('/productos', { signal: c.signal })
    .then(r => setDatos(r.data))
    .catch(e => { if (e.name !== 'CanceledError') setError(e); })
    .finally(() => setCargando(false));
  return () => c.abort();
}, []);

```

CON TANSTACK QUERY

```
const { data, isPending, error } = useQuery({
  queryKey: ['productos'],
  queryFn: () => api.get('/productos')
                    .then(r => r.data),
});

```

Y encima trae caché compartida, reintentos, refresco en
segundo plano y deduplicación de requests simultáneos.

No es solo que sea más corto: la versión de la izquierda **no comparte** nada. Dos pantallas que muestran los
productos hacen dos requests y mantienen dos copias que se desincronizan.

<!-- página 18 -->

UNIDAD 5 · PARTE 3 · TANSTACK QUERY
###### **Las opciones que importan**

```
queryKey
```

La identidad en la caché. Todo lo que cambie el resultado va
adentro: cambiar la clave es pedir otra cosa.

```
queryKey: ['productos', categoria, pagina]

staleTime
```

Cuánto vale la copia antes de salir a chequear. Por defecto **0** : todo
está viejo enseguida.

```
staleTime: 60_000        // un minuto

```

```
queryFn
```

Devuelve el dato o **tira un error** . Con Axios ya viene; con Fetch hay
que tirarlo a mano.

```
queryFn: () => api.get('/productos').then(r => r.data)

```

**`gcTime`** **·** **`retry`**

Cuánto sobrevive en memoria lo que ya nadie mira, y cuántos
reintentos ante un fallo.

```
gcTime: 5 * 60_000,      // por defecto
retry: 2                 // por defecto 3

```

`staleTime` y `gcTime` se confunden siempre. **Stale** = «lo muestro igual, pero salgo a chequear». **gc** = «lo borro de
memoria».

<!-- página 19 -->

UNIDAD 5 · PARTE 3 · TANSTACK QUERY
###### **Los dos hooks**

`USEQUERY`  - LEER

Corre **solo**, cuando el componente se monta.

Guarda lo que trae en la caché, bajo su `queryKey`, y lo
comparte con toda la app.

Repetirlo no tiene consecuencias: por eso puede
reintentar y refrescar en segundo plano sin preguntarte.
###### Lee. Es el GET .

`USEMUTATION` - ESCRIBIR

No corre solo: lo disparás vos, con `.mutate(datos)` .

No se cachea. Lo que devuelve no es un dato para
mostrar, es la confirmación de un efecto.

Repetirlo **sí** tiene consecuencias —crea dos veces—, así
que no reintenta por su cuenta.
###### Escribe. Es el POST, PUT o DELETE .

<!-- página 20 -->

UNIDAD 5 · PARTE 3 · TANSTACK QUERY **Escribir:** **`useMutation`**

```
import { useMutation, useQueryClient } from '@tanstack/react-query';
const queryClient = useQueryClient();
const crear = useMutation({
  mutationFn: (nuevo) => api.post('/productos', nuevo).then(r => r.data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productos'] }),
  onError: (e) => mostrarError(e),
});
```

```
<Button title="Guardar" onPress={() => crear.mutate({ nombre, precio })} />
```

Así se enganchan los dos hooks: una mutación que sale bien deja la caché vieja, y por eso su último paso es **invalidar la query** , para que se vuelva a pedir sola.

`invalidateQueries` lleva un **objeto** : `{ queryKey: ['productos'] }` .

<!-- página 21 -->

UNIDAD 5 · PARTE 3 · TANSTACK QUERY **Actualización optimista**

```
const marcar = useMutation({
  mutationFn: (id) => api.patch(`/tareas/${id}`, { hecha: true }),
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['tareas'] });
    const previo = queryClient.getQueryData(['tareas']);     // guardar por si falla
    queryClient.setQueryData(['tareas'], (viejas) =>         // pintar YA
      viejas.map(t => (t.id === id ? { ...t, hecha: true } : t)));
    return { previo };
  },
  onError: (_e, _id, ctx) => queryClient.setQueryData(['tareas'], ctx.previo),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['tareas'] }),
});
```

Es lo que hace que un check se sienta instantáneo con una red lenta. La parte que casi nadie escribe es `onError` : sin volver atrás, la pantalla miente.

<!-- página 22 -->

UNIDAD 5 · PARTE 3 · TANSTACK QUERY **Montarlo en la app**

```
// app/_layout.tsx
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 2 } },
});
// En React Native no hay «foco de ventana»: se lo damos nosotros.
AppState.addEventListener('change', (estado) =>
  focusManager.setFocused(estado === 'active'));
export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
```

Sin ese `AppState` , el refresco al volver a la app —una de las razones para usar la librería— no se dispara nunca en móvil.

<!-- página 23 -->

UNIDAD 5 **Documentación**

```
developer.mozilla.org/es/docs/Web/API/Fetch_API
```

```
axios-http.com/es/
```

```
tanstack.com/query/latest
```

```
tanstack.com/query/latest/docs/framework/react/react-native
```

---

<a id="doc-15"></a>

## 15. Unidad 5 — Persistencia y estado · Desarrollo para Móviles

> **Fuente:** `U05.T02 - Persistencia y estado.pdf` · **Páginas:** 28 · **Palabras:** 2.191 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 5** **Persistencia y estado**

Clave-valor · SQLite · Estado global · Conectividad

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 5
###### **Qué vamos a ver**

###### **Objetivos Partes**

Elegir dónde guardar cada dato. Qué guardar y dónde

Usar SQLite con la API moderna y migraciones.

Compartir estado entre pantallas sin sufrir.

Que la app siga siendo útil sin conexión.

Clave-valor

SQLite

Estado global

Conectividad

<!-- página 3 -->

UNIDAD 5 · PARTE 1
#### **Qué guardar y dónde**
###### Cuatro lugares, cuatro problemas distintos.

<!-- página 4 -->

UNIDAD 5 · PARTE 1 · QUÉ GUARDAR Y DÓNDE
###### **Los cuatro lugares**

###### **Clave-valor**
```
expo-sqlite/kv-store
```

Preferencias, el último filtro
elegido, si ya vio el tutorial.
Poco dato, sin consultas.

###### **Base relacional**
```
expo-sqlite
```

Muchos registros con
relaciones y consultas.
Trabajo sin conexión de
verdad.

###### **Secretos**
```
expo-secure-store
```

Tokens, claves. Cifrado por
el sistema. Va en la Unidad
6.

###### **Archivos**
```
expo-file-system
```

Fotos, PDF, adjuntos. Lo
vimos en la Unidad 4.

Nada de esto es la respuesta a «¿dónde guardo la lista de productos que trae la API?». Eso es caché de estado del servidor y lo resolvió el deck anterior. Persistir a mano lo que TanStack Query ya cachea es trabajo doble.

<!-- página 5 -->

UNIDAD 5 · PARTE 2
#### **Clave-valor**
###### Lo más simple que hay, y lo que cambió.

<!-- página 6 -->

UNIDAD 5 · PARTE 2 · CLAVE-VALOR
###### **De AsyncStorage a kv-store**

**LO QUE DICE EL APUNTE VIEJO**
###### ANTES

```
import AsyncStorage
  from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('tema', 'oscuro');
const tema = await AsyncStorage.getItem('tema');

```

**LO QUE USAMOS**
###### AHORA

```
import Storage from 'expo-sqlite/kv-store';

await Storage.setItem('tema', 'oscuro');
const tema = await Storage.getItem('tema');

```

###### **Misma API**

Migrar es cambiar la línea del `import` .
Nada más.

###### **Una dependencia menos**

Si ya usás `expo-sqlite`, esto viene
incluido.

###### **Y encima sincrónico**

`getItemSync()` y `setItemSync()`,
que AsyncStorage no tiene.

<!-- página 7 -->

UNIDAD 5 · PARTE 2 · CLAVE-VALOR
###### **Por qué importa lo sincrónico**

###### ASINCRÓNICO

```
const [tema, setTema] = useState(null);

useEffect(() => {
  Storage.getItem('tema').then(setTema);
}, []);

if (tema === null) return <Cargando />;

```

Un parpadeo con el tema equivocado antes de que resuelva la
promesa.

###### SINCRÓNICO

```
const [tema, setTema] = useState(
  () => Storage.getItemSync('tema') ?? 'claro'
);

```

El valor correcto ya en el primer render. Sin estado de carga.

Para cosas chicas que se leen al arrancar —tema, idioma, si ya inició sesión— la versión sincrónica elimina toda una clase de parpadeos.

<!-- página 8 -->

UNIDAD 5 · PARTE 2 · CLAVE-VALOR
###### **Solo guarda texto**

```
import Storage from 'expo-sqlite/kv-store';

// Guardar un objeto: hay que serializarlo.
await Storage.setItem('usuario', JSON.stringify({ id: 7, nombre: 'Ana' }));

// Leerlo: puede no estar. getItem devuelve string | null.
const crudo = await Storage.getItem('usuario');
const usuario = crudo ? JSON.parse(crudo) : null;

await Storage.removeItem('usuario');

```

###### **El error clásico**

`JSON.parse(null)` devuelve `null`, pero `JSON.parse('')`
revienta. Y un número guardado vuelve como string.

###### **La costumbre sana**

Envolvelo en dos funciones, `guardar()` y `leer()`, con el

`JSON` y el `try/catch` adentro. Una vez.

<!-- página 9 -->

UNIDAD 5 · PARTE 2 · CLAVE-VALOR
###### **Lo que NO va acá**

###### **Tokens y contraseñas**

No está cifrado. En un dispositivo con
root se lee entero.

→ `expo-secure-store`

###### **Listas largas**

No hay consultas ni índices: para filtrar
hay que leer todo y recorrerlo en
JavaScript.

→ `expo-sqlite`

###### **Imágenes en base64**

Infla la base y la vuelve lenta. Se
guarda el archivo y acá, a lo sumo, la
ruta.

→ `expo-file-system`

Guardar el token de sesión en almacenamiento común es el hallazgo más frecuente en los TP. Funciona, y es exactamente el punto que la Unidad 6 va a marcar como vulnerabilidad.

<!-- página 10 -->

UNIDAD 5 · PARTE 3
#### **SQLite**
###### Una base relacional entera adentro del teléfono.

<!-- página 11 -->

UNIDAD 5 · PARTE 3 · SQLITE
###### **Cuándo hace falta**

###### **Sí No**

La app tiene que funcionar sin conexión y no solo mostrar
una caché.

Hay cientos o miles de registros.

Hace falta filtrar, ordenar, agrupar o cruzar tablas.

Los datos tienen relaciones: pedidos con ítems, cursos
con alumnos.

Son cuatro preferencias.

Es una copia de lo que trae la API y siempre hay internet.

Es un solo objeto que se lee entero cada vez.

Una base sin consultas es un archivo de texto caro.

Ventaja para el TP: es SQL. Lo que ya saben de bases de datos se aplica tal cual — CREATE TABLE, JOIN, WHERE, índices.

<!-- página 12 -->

UNIDAD 5 · PARTE 3 · SQLITE **La API moderna: proveedor y hook**

```
// app/_layout.tsx  ·  import { SQLiteProvider } from 'expo-sqlite'
export default function Layout() {
  return (
```

```
<SQLiteProvider databaseName="app.db" onInit={migrar}>
  <Slot />
```

```
</SQLiteProvider>
```

```
  );
}
```

```
// en cualquier pantalla  ·  import { useSQLiteContext } from 'expo-sqlite'
const db = useSQLiteContext();
```

```
const tareas = await db.getAllAsync('SELECT * FROM tareas');
```

Una sola conexión para toda la app, abierta una vez y compartida por contexto. `onInit` corre **antes** de que se renderice nada adentro: cuando tu pantalla consulta, las tablas ya existen.

<!-- página 13 -->

UNIDAD 5 · PARTE 3 · SQLITE
###### **Cuatro métodos, cuatro usos**

```
execAsync(sql)
```

Varias sentencias de una. Para crear el esquema.

**No escapa parámetros** : nunca con datos del usuario.

```
getFirstAsync(sql, params)
```

Una fila o `null` . Buscar por id, contar.

```
runAsync(sql, params)
```

`INSERT`, `UPDATE`, `DELETE` . Devuelve `lastInsertRowId` y

`changes` .

```
getAllAsync(sql, params)
```

Un array de objetos. La lista que va a la pantalla.

Todos tienen gemelo sincrónico — runSync, getAllSync —. Andan, pero bloquean el hilo de JS : sobre una tabla grande se nota como tirones al hacer scroll. Usá los asincrónicos salvo que midas otra cosa.

<!-- página 14 -->

UNIDAD 5 · PARTE 3 · SQLITE
###### **Parámetros, siempre**

###### NUNCA

```
await db.execAsync(
  `SELECT * FROM usuarios
   WHERE nombre = '${entrada}'`
);

// entrada = "'; DROP TABLE usuarios; --"

```

###### SIEMPRE

```
await db.getAllAsync(
  'SELECT * FROM usuarios WHERE nombre = ?',
  entrada
);

await db.runAsync(
  'UPDATE tareas SET hecha = ? WHERE id = $id',
  [1], { $id: 7 }
);

```

El ? no es una comodidad de sintaxis: SQLite recibe la consulta y los valores por separado, así que el texto del usuario no puede convertirse en instrucción. Es la defensa, no una ayuda.

<!-- página 15 -->

UNIDAD 5 · PARTE 3 · SQLITE **Migraciones**

```
async function migrar(db: SQLiteDatabase) {
  const VERSION = 1;
  let { user_version: actual } = await db.getFirstAsync('PRAGMA user_version');
  if (actual >= VERSION) return;
  if (actual === 0) {
    await db.execAsync(`PRAGMA journal_mode = 'wal';
      CREATE TABLE tareas (id INTEGER PRIMARY KEY NOT NULL, titulo TEXT NOT NULL,
                           hecha INTEGER NOT NULL DEFAULT 0);`);
    actual = 1;
  }
  // if (actual === 1) { …la próxima migración va acá… }
  await db.execAsync(`PRAGMA user_version = ${VERSION}`);
}
```

La base **sobrevive a la actualización de la app** . Si agregás una columna sin escribir la migración, a quien ya la tenía instalada le explota — y en tu teléfono, que lo reinstalaste, anda perfecto.

<!-- página 16 -->

UNIDAD 5 · PARTE 3 · SQLITE **Transacciones**

```
await db.withTransactionAsync(async () => {
  const { lastInsertRowId } = await db.runAsync(
    'INSERT INTO pedidos (cliente, fecha) VALUES (?, ?)', cliente, fecha,
  );
  for (const item of items) {
    await db.runAsync(
      'INSERT INTO items (pedido_id, producto, cantidad) VALUES (?, ?, ?)',
      lastInsertRowId, item.producto, item.cantidad,
    );
  }
});
```

O entra todo o no entra nada. Sin transacción, una app que se cierra a mitad del bucle deja un pedido sin ítems — y esa fila rota queda para siempre. Además es mucho más rápido: mil `INSERT` sueltos hacen mil escrituras a disco; dentro de una transacción, una sola.

<!-- página 17 -->

UNIDAD 5 · PARTE 4
#### **Estado global**
###### Lo que varias pantallas necesitan al mismo tiempo.

<!-- página 18 -->

UNIDAD 5 · PARTE 4 · ESTADO GLOBAL
###### **El problema**

###### **Pasar props hacia abajo**

El carrito vive en la pantalla de inicio y lo necesita un botón
cuatro niveles más abajo. Cada componente del medio recibe
y reenvía algo que no usa.

###### **Context como estado**

Resuelve el paso de props, pero **cuando cambia el valor se**
**vuelve a renderizar todo el árbol**, incluso lo que solo lee
una parte.

Context sigue siendo lo correcto para cosas que casi no cambian —el tema, el idioma, la sesión—. Para lo que cambia seguido conviene algo que permita suscribirse a un pedacito.

<!-- página 19 -->

UNIDAD 5 · PARTE 4 · ESTADO GLOBAL
###### **Antes de agregar una librería**

###### **TanStack Query**

Si el dato viene del servidor.
**Ya es global** : la caché se
comparte entre pantallas sin
que hagas nada.

###### **Zustand**

Si es estado del cliente,
cambia seguido y lo tocan
pantallas que no son
parientes.

```
useState
```

Si el dato lo usa una
pantalla y sus hijos directos.
La mayoría de los casos.

###### **Context**

Si lo leen muchas pantallas
pero **cambia poco** : tema,
idioma, sesión. Viene con
React.

El error de diseño más común es meter en el estado global la lista que trae la API. Eso ya lo resolvió TanStack Query; duplicarlo es garantizar que las dos copias se desincronicen.

<!-- página 20 -->

UNIDAD 5 · PARTE 4 · ESTADO GLOBAL **Context + Provider: sin librerías**

```
// contexto/carrito.tsx
```

```
import { createContext, use, useState, type ReactNode } from 'react';
```

```
type Carrito = { items: Item[]; agregar: (i: Item) => void; quitar: (id: string) => void };
const CarritoContext = createContext<Carrito | null>(null);
```

```
export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const agregar = (item: Item) => setItems((s) => [...s, item]);
  const quitar = (id: string) => setItems((s) => s.filter((i) => i.id !== id));
  return (
```

- `<CarritoContext value={{ items, agregar, quitar }}>`

```
{children}
```

- `</CarritoContext>`

```
  );
}
```

El mismo patrón que `SQLiteProvider` + `useSQLiteContext` de la Parte 3: **un componente arriba guarda el valor** y un hook abajo lo lee.

<!-- página 21 -->

UNIDAD 5 · PARTE 4 · ESTADO GLOBAL
###### **Envolver la app y leerlo**

###### EL HOOK — MISMO ARCHIVO

```
export function useCarrito() {
  const carrito = use(CarritoContext);
  if (!carrito) {
    throw new Error('Falta <CarritoProvider>');
  }
  return carrito;
}

```

###### EL PROVEEDOR — APP/_LAYOUT.TSX

```
export default function Layout() {
  return (
    <CarritoProvider>
      <Slot />
    </CarritoProvider>
  );
}

```

Desde cualquier pantalla: const { items, agregar } = useCarrito(); Sin pasar props y sin instalar nada. El costo: cuando cambia items se vuelven a renderizar todos los componentes que llaman a useCarrito(), aunque solo usen agregar . Context entrega el valor entero; no hay forma de suscribirse a un pedazo.

<!-- página 22 -->

UNIDAD 5 · PARTE 4 · ESTADO GLOBAL **Zustand: el store**

```
// store/carrito.ts
import { create } from 'zustand';
type Carrito = {
  items: Item[];
  agregar: (item: Item) => void;
  quitar: (id: string) => void;
  total: () => number;
};
export const useCarrito = create<Carrito>((set, get) => ({
  items: [],
  agregar: (item) => set((s) => ({ items: [...s.items, item] })),
  quitar: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
  total: () => get().items.reduce((a, i) => a + i.precio * i.cantidad, 0),
}));
```

El store **es un hook** . No hay proveedor que envolver, no hay reducer, no hay acciones ni tipos de acción: estado y funciones que lo cambian, en el mismo objeto.

<!-- página 23 -->

UNIDAD 5 · PARTE 4 · ESTADO GLOBAL
###### **Usarlo, y el detalle del selector**

###### MAL — SE LLEVA TODO

```
const { items, agregar } = useCarrito();

// Este componente se vuelve a renderizar
// ante CUALQUIER cambio del store.

```

###### BIEN — UN SELECTOR POR DATO

```
const cantidad = useCarrito(s => s.items.length);
const agregar  = useCarrito(s => s.agregar);

// Solo se vuelve a renderizar cuando
// cambia la cantidad. La función es estable.

```

Esa es la ventaja concreta sobre Context: te suscribís a un pedazo del estado, no al estado entero . El ícono del carrito en el encabezado se actualiza sin tocar el resto de la pantalla.

<!-- página 24 -->

UNIDAD 5 · PARTE 4 · ESTADO GLOBAL **Que sobreviva al cierre de la app**

```
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Storage from 'expo-sqlite/kv-store';
export const useCarrito = create<Carrito>()(
  persist(
    (set, get) => ({ /* …lo mismo de antes… */ }),
    {
      name: 'carrito',
      storage: createJSONStorage(() => Storage),
      partialize: (s) => ({ items: s.items }),   // guardar solo los datos
    },
  ),
);
```

Acá se cierra el círculo de las dos primeras partes: el estado global se guarda solo, en el mismo `kv-store` . `partialize` evita persistir las funciones, que no tiene sentido serializar.

<!-- página 25 -->

UNIDAD 5 · PARTE 5
#### **Conectividad**
###### Saber que no hay red, y hacer algo al respecto.

<!-- página 26 -->

###### UNIDAD 5 · PARTE 5 · CONECTIVIDAD

##### **`expo-network`**

```
import { useNetworkState, NetworkStateType } from 'expo-network';
export function AvisoDeRed() {
  const red = useNetworkState();
  if (red.isInternetReachable === false) {
    return <Barra texto="Sin conexión. Vas a ver datos guardados." />;
  }
  if (red.type === NetworkStateType.CELLULAR) {
    return <Barra texto="Estás usando datos móviles." />;
  }
  return null;
}
```

`isConnected` y `isInternetReachable` no son lo mismo. El Wi-Fi del bar que te pide iniciar sesión da `isConnected: true` y ningún dato pasa. **El que importa es el segundo.**

<!-- página 27 -->

UNIDAD 5 · PARTE 5 · CONECTIVIDAD
###### **Diseñar para que se corte**

###### **Al leer Al escribir**

Mostrar lo último que tenés, avisando que es viejo.

Nunca una pantalla en blanco.

Que el reintento sea un botón, no un misterio.

Guardar local y marcar como pendiente.

Sincronizar cuando vuelva la red.

Decir con claridad qué se envió y qué no.

Ese «guardar y sincronizar después» es exactamente para lo que sirve SQLite: una tabla de pendientes con su estado, y un proceso que la vacía cuando isInternetReachable vuelve a ser true . Se evalúa en el TP integrador: poné el teléfono en modo avión y usá tu app . Si queda colgada en un spinner, falta trabajo.

<!-- página 28 -->

UNIDAD 5 **Documentación**

```
docs.expo.dev/versions/latest/sdk/sqlite
```

```
docs.expo.dev/versions/latest/sdk/sqlite/#key-value-storage
```

```
docs.expo.dev/versions/latest/sdk/network
```

```
zustand.docs.pmnd.rs
```

---

<a id="doc-16"></a>

## 16. Unidad 6 — Computación ubicua e IoT · Desarrollo para Móviles

> **Fuente:** `Unidad 6 — Computación ubicua e IoT · Desarrollo para Móviles.pdf` · **Páginas:** 19 · **Palabras:** 1.511 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S ITA R I A E N D E S A R R O L LO W E B · F C A D · U N E R
### **Unidad 6** **Computación ubicua e IoT**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86

<!-- página 2 -->

UNIDAD 6
###### **Qué vamos a ver**

**Objetivos** **Temas**

Ubicar el celular dentro de un sistema más grande.

Entender la arquitectura de un sistema IoT.

Saber por dónde entra una app Expo.

Computación ubicua y ambientes inteligentes

IoT: capas, direccionamiento, retos

**La app como cliente del sistema**

Es la clase más conceptual de la materia. La última parte baja a código: hasta ahora el celular era el producto, acá pasa
a ser **una pieza más** .

<!-- página 3 -->

UNIDAD 6 · PARTE 1
#### **Computación ubicua**

Cuando la computadora deja de parecer una computadora.

<!-- página 4 -->

UNIDAD 6 · PARTE 1 · COMPUTACIÓN UBICUA
###### **La idea**
Mark Weiser la formuló en 1991: «las tecnologías más profundas son las que desaparecen; se entretejen en la vida cotidiana hasta volverse indistinguibles».

Pensalo así: ¿cuántas computadoras usaste hoy? Si contás el celular, la respuesta es una. Si contás la SUBE, el
molinete, el semáforo, el datáfono del kiosco y el termostato del aire, la cuenta es otra — y ninguna te pareció una
computadora.

**Invisible**

No hay una pantalla que anuncie que hay

cómputo.

**Contextual**

Reacciona a dónde estás y qué estás haciendo.

**Distribuida**

Muchos dispositivos chicos en lugar de uno

grande.

<!-- página 5 -->

UNIDAD 6 · PARTE 1 · COMPUTACIÓN UBICUA
###### **Las escalas**

**Dust**

Dispositivos diminutos, de nanómetros
a centímetros, sin respuesta visual.
Etiquetas RFID, sensores embebidos.

**Skin**

Superficies y materiales que emiten luz

- cambian: ropa, revestimientos,
pantallas flexibles.

**Clay**

Objetos con volumen, con los que se
interactúa como con cosas físicas.

La clasificación importa menos que lo que tienen en común: **ninguno tiene teclado** . La interfaz, cuando hace falta, suele
ser el celular.

<!-- página 6 -->

UNIDAD 6 · PARTE 1 · COMPUTACIÓN UBICUA
###### **Ambientes inteligentes**

Espacios donde los sensores y el cómputo están integrados al entorno y pasan desapercibidos. El usuario interactúa
por gestos, voz, movimiento o simplemente estando ahí.

**Ejemplos cotidianos** **Lo que tienen en común**

Luces que se encienden por presencia.

Climatización que aprende horarios.

Riego que mira la humedad del suelo.

El sistema decide sin que nadie le pida nada. Eso es cómodo — y es
exactamente lo que vuelve delicada la privacidad: **hay datos generándose**
**todo el tiempo sobre personas que no apretaron ningún botón** .

<!-- página 7 -->

UNIDAD 6 · PARTE 2
#### **Internet de las cosas**

La forma concreta que tomó la idea.

<!-- página 8 -->

UNIDAD 6 · PARTE 2 · INTERNET DE LAS COSAS
###### **Qué es**
Objetos físicos con sensores, capacidad de cómputo y conexión, que recopilan y comparten datos con mínima intervención humana .

Lo que lo hizo posible no fue una invención sino que se juntaran cuatro cosas: chips baratos y de bajo consumo,
sensores chicos, conectividad omnipresente y capacidad de almacenar y procesar en la nube lo que generan millones
de dispositivos.

**Salud**

Pulseras que miden ritmo cardíaco

y sueño.

**Agro**

Sensores de humedad y

temperatura del suelo.

**Industria**

Detección de desgaste en líneas de

montaje.

**Ciudad**

Contenedores que avisan cuando

están llenos.

<!-- página 9 -->

UNIDAD 6 · PARTE 2 · INTERNET DE LAS COSAS
###### **La arquitectura por capas**

Capa Qué hace
**Percepción** Sensores y actuadores. Capta el mundo físico y actúa sobre él.
**Red** Transporta los datos: wifi, Bluetooth, LoRa, celular.
**Middleware** Concilia y normaliza datos de dispositivos heterogéneos, y los almacena.
**Aplicación** Lo que ve el usuario. **Acá entra nuestra app.**
**Negocio** Modelo de negocio, analítica y decisiones sobre el producto.

La razón de ser del middleware es que la capa de aplicación no tenga que saber si el sensor habla MQTT, CoAP o HTTP:
recibe datos ya normalizados.

<!-- página 10 -->

UNIDAD 6 · PARTE 2 · INTERNET DE LAS COSAS
###### **El problema de las direcciones**

**1981**
**IPv4**

Direcciones de **32 bits** : unos 4.300 millones. Ya éramos más
personas que direcciones antes de empezar a conectar
objetos.

**Cabecera más simple**

Enrutamiento más eficiente.

**Autoconfiguración**

Con Neighbor Discovery los dispositivos se
descubren solos en la red local.

**1998**
**IPv6**

Direcciones de **128 bits** : 3,4 × 1038. Alcanza y sobra para
darle una a cada objeto del planeta.

**Seguridad integrada**

IPsec forma parte del diseño, no es un agregado.

<!-- página 11 -->

UNIDAD 6 · PARTE 2 · INTERNET DE LAS COSAS
###### **Los cuatro retos**

**Fiabilidad**

El sistema tiene que funcionar siempre. Un sensor de temperatura que deja de
reportar en una fábrica arruina la producción sin avisar.

**Interoperabilidad**

Muchos fabricantes, muchos protocolos, varios propietarios. Es la razón por
la que tu termostato no habla con tu asistente de voz.

**Rendimiento**

Si la respuesta llega tarde, no sirve. Una cámara de seguridad con diez
segundos de retraso no es una cámara de seguridad.

**Seguridad y privacidad**

Dispositivos baratos, sin actualizaciones y con contraseñas de fábrica. Y
datos íntimos: cuándo dormís, cuándo no hay nadie en casa.

<!-- página 12 -->

UNIDAD 6 · PARTE 3
#### **La app dentro del sistema**

Los dos caminos por los que el celular habla con un dispositivo.

<!-- página 13 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
###### **Directo o por la nube**

**Celular**
app Expo

**Celular**
app Expo

**Directo**

**REST · WEBSOCKETS**

⇄

**BLE · WIFI LOCAL · NFC**

⇄

**Plataforma IoT**
middleware, en la nube

**Por la nube**

**MQTT · HTTP · COAP**

⇄

**Dispositivo**
sensor · actuador

**Dispositivo**
sensor · actuador

El celular se conecta al dispositivo: Bluetooth Low Energy, wifi
local, NFC.

**Sirve para:** una pulsera, una balanza, una cerradura. **Requiere**
estar cerca.

El dispositivo publica sus datos en una plataforma, y la app
los consume desde ahí — una API REST o WebSockets.

**Sirve para:** ver la cámara de casa desde el trabajo. **Requiere**
internet en los dos extremos.

La mayoría de los productos reales usan los dos: BLE para configurar el aparato la primera vez —cuando todavía no
tiene wifi— y la nube para el uso cotidiano.

<!-- página 14 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
###### **BLE desde Expo**

import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

manager.startDeviceScan(null, null, (error, device) => {

if (error) return;
if (device?.name === 'MiSensor') {
manager.stopDeviceScan();
device.connect()
.then((d) => d.discoverAllServicesAndCharacteristics())
.then(leerTemperatura);
}
});

react-native-ble-plx **no corre en Expo Go** : trae código nativo. Va con su config plugin en app.json y un
**development build**, como vimos en la Unidad 1.

<!-- página 15 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
###### **Lo que complica al BLE**

**Permisos que cambiaron**

Desde Android 12 son BLUETOOTH_SCAN y

BLUETOOTH_CONNECT . Antes se pedía ubicación —
y en dispositivos viejos todavía hace falta.

**Todo es asíncrono y falla**

El dispositivo se aleja, se queda sin batería, se
desconecta. Hay que manejar la reconexión, no
suponerla.

**No hay emulador**

Se prueba con hardware real. Un ESP32 sale muy
poco y alcanza.

Por qué se pedía ubicación para escanear Bluetooth: la lista de dispositivos cercanos **permite deducir dónde estás** . Es
un buen ejemplo de que la privacidad no depende sólo del dato obvio.

<!-- página 16 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
###### **Por la nube: una plataforma IoT**

**ThingsBoard** es una plataforma de código abierto que ocupa la capa de middleware: recibe telemetría por MQTT, HTTP

- CoAP, la almacena, permite definir reglas y la expone por API REST.

**Qué te ahorra** **Qué le pedís desde la app**

Ingesta y almacenamiento de telemetría. Nada nuevo: es **una API REST** . Lo mismo que hicimos en la Unidad 5 con
Fetch y TanStack Query.

Motor de reglas: «si supera 30 °C, avisá».

Gestión de miles de dispositivos.

<!-- página 17 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
###### **Consumirla es lo de siempre**

const { data } = useQuery({

queryKey: ['telemetria', dispositivoId],
queryFn: async () => {

const r = await fetch(

`${BASE}/api/plugins/telemetry/DEVICE/${dispositivoId}/values/timeseries`,
{ headers: { 'X-Authorization': `Bearer ${token}` } }
);

return r.json();
},

refetchInterval: 5000,
});

Nada de esto es nuevo: es la Unidad 5. Y el token va en **SecureStore**, que es la otra mitad de esta unidad.

<!-- página 18 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
###### **Qué aporta el celular**

**Es la interfaz**

El sensor no tiene pantalla. Todo lo que el usuario
ve y configura pasa por acá.

**Es un sensor más**

Ubicación, acelerómetro, cámara — todo lo de la
Unidad 4. El teléfono también aporta datos al
sistema.

**Es el canal de aviso**

Las notificaciones de la Unidad 4 son cómo el
sistema llega a la persona cuando pasa algo.

Visto así, esta unidad no agrega herramientas nuevas: **recombina las de todo el cuatrimestre** con el celular puesto en
otro lugar del sistema.

<!-- página 19 -->

UNIDAD 6
##### **Para llevarse**

La computación ubicua es cómputo que **deja de verse** ; IoT es su forma concreta.

Una app móvil ocupa la **capa de aplicación** : es la cara visible de un sistema mucho más grande.

Dos caminos: **BLE** para lo que está cerca, **API** para todo lo demás.

Los dos necesitan lo de la otra mitad de esta unidad: **seguridad** .

thingsboard.io - github.com/dotintent/react-native-ble-plx

---

<a id="doc-17"></a>

## 17. Unidad 6 — Seguridad · Desarrollo para Móviles

> **Fuente:** `Unidad 6 — Seguridad · Desarrollo para Móviles.pdf` · **Páginas:** 30 · **Palabras:** 2.560 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S ITA R I A E N D E S A R R O L LO W E B · F C A D · U N E R
### **Unidad 6** **Seguridad**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · OWASP Mobile Top 10 (2024)

<!-- página 2 -->

UNIDAD 6
###### **Qué vamos a ver**

**Objetivos** **Temas**

Entender por qué una app es más expuesta que una web.

Guardar datos sensibles donde corresponde.

Resolver un login sin manejar contraseñas.

OWASP Mobile Top 10

Almacenamiento seguro y tokens

Biometría

**OAuth 2.0 con PKCE**

WebViews y navegador

<!-- página 3 -->

UNIDAD 6 · PARTE 1
#### **Por qué en móvil es distinto**

Lo que cambia respecto de una aplicación web.

<!-- página 4 -->

UNIDAD 6 · PARTE 1 · POR QUÉ EN MÓVIL ES DISTINTO
###### **El binario está en manos del atacante**
En web, el código que importa corre en tu servidor. En móvil, la aplicación entera se descarga al dispositivo — incluido el de alguien que quiera abrirla.

**Lo que se puede hacer con tu APK**

Descomprimirlo, leer el bundle de JavaScript, buscar cadenas,
interceptar el tráfico con un proxy, correrlo en un emulador
modificado.

**La consecuencia práctica**

**Nada secreto puede vivir en la app.** Ni una clave de API, ni una
contraseña, ni un client secret . Aunque esté en una
variable de entorno: termina en el bundle.

Ofuscar no es cifrar. Retrasa a un curioso; no detiene a nadie con intención.

<!-- página 5 -->

UNIDAD 6 · PARTE 1 · POR QUÉ EN MÓVIL ES DISTINTO
###### **Cuatro diferencias con el escritorio**

**Redes que no controlás**

El wifi del bar, el del aeropuerto, uno que se llama igual que el de la facultad.
Toda la comunicación viaja por ahí.

**El dispositivo se pierde**

Un teléfono robado o rooteado da acceso físico al almacenamiento de la app.

**Hardware sensible**

Cámara, micrófono, GPS, biometría. Cada permiso que pedís es una puerta
que abrís y que hay que justificar.

**El parche pasa por la tienda**

Publicar un arreglo lleva días de revisión, más los usuarios que nunca
actualizan.

De la última se desprende algo que vimos en la Unidad 7: **EAS Update** permite corregir el JavaScript sin pasar por la
tienda. No todo se arregla así, pero para un bug de seguridad en la capa JS cambia los días por minutos.

<!-- página 6 -->

UNIDAD 6 · PARTE 2
#### **OWASP Mobile Top 10**

El mapa de lo que efectivamente sale mal.

<!-- página 7 -->

UNIDAD 6 · PARTE 2 · OWASP MOBILE TOP 10
###### **Qué es**

**OWASP**

Fundación sin fines de lucro dedicada a la seguridad del
software. Su material es abierto y es el estándar de facto de la
industria.

**El Top 10 móvil**

Una lista de los diez riesgos más frecuentes y de mayor
impacto en aplicaciones móviles, armada a partir de reportes
de incidentes, CVEs y programas de bug bounty.

**La lista vigente es la de 2024** y es bastante distinta de la de 2016, que todavía es la que aparece primero en muchas
búsquedas. Si un artículo habla de «M2: Insecure Data Storage», está usando la vieja.

<!-- página 8 -->

UNIDAD 6 · PARTE 2 · OWASP MOBILE TOP 10 **Los diez, edición 2024**

**M6** Controles de privacidad insuficientes **M7** Protección del binario insuficiente **M8** Configuración de seguridad incorrecta **M9** Almacenamiento de datos inseguro **M10** Criptografía insuficiente

**M1** Uso indebido de credenciales **M6** Controles de privacidad insuficientes **M2** Cadena de suministro insegura **M7** Protección del binario insuficiente **M3** Autenticación / autorización insegura **M8** Configuración de seguridad incorrecta **M4** Validación de entrada y salida insuficiente **M9** Almacenamiento de datos inseguro **M5** Comunicación insegura **M10** Criptografía insuficiente

Fijate que **M1, M2 y M3 encabezan la lista** : credenciales, dependencias y autenticación. No son fallas exóticas — son las tres cosas que todo TP integrador hace.

<!-- página 9 -->

UNIDAD 6 · PARTE 2 · OWASP MOBILE TOP 10
###### **Los cuatro que les van a tocar**

**M1 · Credenciales**

La clave de la API escrita en el código, o el token guardado sin cifrar. **Lo**
**resolvemos en la Parte 3.**

**M3 · Autenticación**

Login casero, sesiones que no expiran, autorización decidida en el cliente.
**Parte 4.**

**M2 · Cadena de suministro**

Una dependencia de npm comprometida o abandonada. npm audit, y no
instalar paquetes con tres descargas.

**M5 · Comunicación**

HTTP en lugar de HTTPS, o certificados que no se validan. **Parte 5.**

<!-- página 10 -->

UNIDAD 6 · PARTE 3
#### **Dónde se guarda cada cosa**

Almacenamiento seguro, tokens y biometría.

<!-- página 11 -->

UNIDAD 6 · PARTE 3 · DÓNDE SE GUARDA CADA COSA
###### **Lo que ya usamos no está cifrado**

expo-sqlite/kv-store

Lo vimos en la Unidad 5 y está perfecto para preferencias, el
último filtro elegido o el modo oscuro. **No está cifrado:** en un
teléfono rooteado se lee en texto plano.

expo-secure-store

Para lo que no puede leerse nunca: tokens, credenciales,
datos personales. Usa el almacén de claves del sistema
operativo.

La pregunta para decidir es simple: **si alguien lee este valor, ¿puede hacerse pasar por el usuario o acceder a sus**
**datos?** Si la respuesta es sí, va en SecureStore.

<!-- página 12 -->

UNIDAD 6 · PARTE 3 · DÓNDE SE GUARDA CADA COSA
###### expo-secure-store

import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', valor);

const token = await SecureStore.getItemAsync('token'); // null si no hay

await SecureStore.deleteItemAsync('token');

**Android**

SharedPreferences cifradas con el **Keystore** del sistema.

**iOS**

**Keychain**, como kSecClassGenericPassword .

Sólo guarda **cadenas de texto** . Un objeto va con JSON.stringify .

<!-- página 13 -->

UNIDAD 6 · PARTE 3 · DÓNDE SE GUARDA CADA COSA
###### **Tres detalles que sorprenden**

**Persistencia asimétrica**

En **Android** los datos se borran al desinstalar. En
**iOS** el Keychain los conserva y reaparecen si se
reinstala la app con el mismo bundle ID.

**Valores grandes**

Expo no impone un límite, pero la plataforma
puede rechazar valores muy grandes —
históricamente iOS rechazaba por encima de ~2

KB. Hay que manejar el error.

**No es una base de datos**

Es un llavero. Para volumen, va SQLite; si además
tiene que estar cifrado, una base con cifrado.

Que en iOS el dato sobreviva a la desinstalación no es una garantía sobre la que apoyarse — es un detalle de
implementación del Keychain. Tampoco es lo que espera un usuario que desinstala para «borrar todo».

<!-- página 14 -->

UNIDAD 6 · PARTE 3 · DÓNDE SE GUARDA CADA COSA
###### **Los dos tokens**

**Access token** **Refresh token**

Vida corta: minutos u horas.

Viaja en cada request, en la cabecera Authorization .

Si se filtra, el daño tiene fecha de vencimiento.

Vida larga: días o meses.

Sólo sirve para pedir un access token nuevo.

Si se filtra, el atacante se renueva solo. **Es el que más hay**
**que cuidar.**

Los dos van en SecureStore. Y el **cierre de sesión** tiene que borrarlos y además avisarle al servidor, para que revoque el
refresh token: borrarlo sólo del teléfono no lo invalida.

<!-- página 15 -->

UNIDAD 6 · PARTE 3 · DÓNDE SE GUARDA CADA COSA
###### **Biometría**

import * as LocalAuthentication from 'expo-local-authentication';

const hayLector = await LocalAuthentication.hasHardwareAsync();
const hayHuellas = await LocalAuthentication.isEnrolledAsync();

if (hayLector && hayHuellas) {

const r = await LocalAuthentication.authenticateAsync({

promptMessage: 'Confirmá tu identidad',
cancelLabel: 'Cancelar',
});

if (r.success) abrirSesion();
}

Siempre hay que preguntar **antes** si el dispositivo tiene lector y si el usuario tiene algo registrado. Y siempre tiene que
haber un camino alternativo: no todos los teléfonos tienen biometría, y un dedo mojado no la pasa.

<!-- página 16 -->

UNIDAD 6 · PARTE 3 · DÓNDE SE GUARDA CADA COSA
###### **Biometría para abrir el llavero**

await SecureStore.setItemAsync('refresh_token', valor, {

requireAuthentication: true,
authenticationPrompt: 'Desbloqueá para continuar',
});

**Qué cambia**

El dato no se puede leer sin que el usuario se autentique. La biometría deja de
ser una pantalla decorativa y pasa a proteger el dato de verdad.

**El costo**

Si el usuario agrega una huella nueva o cambia el rostro registrado, la clave se
invalida y **el valor deja de poder leerse** . Hay que preverlo.

requireAuthentication **no funciona en Expo Go** cuando hay biometría disponible, porque falta el
NSFaceIDUsageDescription . Va con development build y el plugin de expo-secure-store .

<!-- página 17 -->

UNIDAD 6 · PARTE 4
#### **Login con OAuth 2.0 y PKCE**

Cómo entrar sin que la app toque nunca una contraseña.

<!-- página 18 -->

UNIDAD 6 · PARTE 4 · LOGIN CON OAUTH 2.0 Y PKCE
###### **Por qué no pedir la contraseña**

**Login propio**

La app ve la contraseña. Tenés que guardarla, transmitirla,
hashearla bien, resolver el «olvidé mi clave», el segundo factor,
el bloqueo por intentos. Cada uno es una oportunidad de
equivocarse.

**OAuth 2.0**

El usuario se autentica **en el sitio del proveedor** —Google,
GitHub, el campus— dentro del navegador del sistema. Tu app
nunca ve la contraseña: recibe un token.

Y como el login ocurre en el navegador y no en una pantalla tuya, el usuario puede **verificar el dominio en la barra de**
**direcciones** . Ese es justamente el control que una pantalla de login dentro de una WebView le quita.

<!-- página 19 -->

UNIDAD 6 · PARTE 4 · LOGIN CON OAUTH 2.0 Y PKCE
###### **El flujo, en cinco pasos**

**1**
La app abre el navegador en el
proveedor

**2**
El usuario se loguea y autoriza
los permisos

**3**
El proveedor redirige a la app con
un **código**

**4**
Ese código se canjea por un
token

**5**
El token va a SecureStore

Se llama authorization code grant. El código intermedio existe para que el token nunca viaje por la barra de direcciones
del navegador, donde quedaría en el historial y en los logs.

<!-- página 20 -->

UNIDAD 6 · PARTE 4 · LOGIN CON OAUTH 2.0 Y PKCE
###### **Qué agrega PKCE**

Queda un problema: otra app instalada en el mismo teléfono puede registrar el mismo esquema de redirección e
interceptar el código del paso 3.

**1 · Antes de empezar**

La app inventa un secreto al azar (code verifier) y
manda su **hash** al proveedor.

**2 · Vuelve el código**

El proveedor lo asocia a ese hash.

**3 · Al canjear**

Hay que presentar el secreto original. Quien robó
el código no lo tiene y el canje falla.

**En** expo-auth-session **viene activado por defecto** ( usePKCE: true ). No hay que hacer nada — pero sí hay que saber
que está, y no desactivarlo.

<!-- página 21 -->

UNIDAD 6 · PARTE 4 · LOGIN CON OAUTH 2.0 Y PKCE
###### **En código**

import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();  // cierra la ventana al volver

const discovery = {

authorizationEndpoint: 'https://github.com/login/oauth/authorize',
tokenEndpoint: 'https://github.com/login/oauth/access_token',
};

const [request, response, promptAsync] = useAuthRequest(
{ clientId: CLIENT_ID, scopes: ['identity'],

redirectUri: makeRedirectUri({ scheme: 'tuapp' }) },
discovery
);

<Button title="Entrar" disabled={!request} onPress={() => promptAsync()} />

<!-- página 22 -->

UNIDAD 6 · PARTE 4 · LOGIN CON OAUTH 2.0 Y PKCE
###### **Las cuatro reglas**

maybeCompleteAuthSession()

Si falta, la ventana del navegador no se cierra al volver y el usuario queda
mirando una pantalla en blanco.

disabled={!request}

El armado del pedido es asíncrono. Si el botón se aprieta antes, el navegador
móvil bloquea la apertura.

makeRedirectUri()

No escribas la URL de redirección a mano: cambia entre desarrollo, build
nativa y web.

**Expo Go no sirve acá**

No permite personalizar el esquema de la app, así que la redirección no
vuelve. Hace falta un **development build** .

<!-- página 23 -->

UNIDAD 6 · PARTE 4 · LOGIN CON OAUTH 2.0 Y PKCE
###### El client secret no va en la app
Varios proveedores piden un client_secret para canjear el código por el token. Ese canje no puede ocurrir en el teléfono : ya vimos que cualquier cadena del bundle es legible.

**Dónde va**

En un servidor tuyo. Puede ser una API route del mismo proyecto Expo, o el
backend que ya tenga el grupo.

**Qué hace la app**

Manda el código a tu servidor, y tu servidor devuelve el token. El secreto
nunca sale de ahí.

Es otra vez el mismo principio de la Parte 1: **el cliente no es un lugar seguro** . Todo lo demás de esta unidad son casos
particulares de eso.

<!-- página 24 -->

UNIDAD 6 · PARTE 5
#### **Contenido web y red**

WebViews, navegador del sistema y HTTPS.

<!-- página 25 -->

UNIDAD 6 · PARTE 5 · CONTENIDO WEB Y RED
###### **WebViews**

Un componente que muestra una página web dentro de la app, con react-native-webview . Sirve para incrustar
contenido que ya existe en web: términos y condiciones, un reporte, una pasarela de pago.

**Los riesgos** **Cómo se acota**

**XSS** si el contenido no es de confianza.

**Phishing:** adentro no hay barra de direcciones, así que el usuario no puede
verificar dónde está.

**Redirecciones** a cualquier dominio.

Cargar sólo **orígenes propios** .

Bloquear la navegación a otros dominios.

Desactivar lo que no se use.

**Nunca un login dentro de una WebView.** Le quita al usuario la única forma que tiene de saber a quién le está dando la
contraseña. Para eso está la Parte 4.

<!-- página 26 -->

UNIDAD 6 · PARTE 5 · CONTENIDO WEB Y RED
###### **Acotar una WebView**

<WebView
source={{ uri: 'https://midominio.edu.ar/terminos' }}
originWhitelist={['https://midominio.edu.ar']}
javaScriptEnabled={false}
onShouldStartLoadWithRequest={(req) =>
req.url.startsWith('https://midominio.edu.ar')
}
/>

onShouldStartLoadWithRequest se ejecuta antes de cada navegación: si devolvés false, no carga. Es el control que
evita que una redirección saque al usuario a otro dominio sin que se note.

<!-- página 27 -->

UNIDAD 6 · PARTE 5 · CONTENIDO WEB Y RED
###### **Casi siempre alcanza con el navegador**

import * as WebBrowser from 'expo-web-browser';

await WebBrowser.openBrowserAsync('https://uner.edu.ar');

**Qué abre**

**Android:** Chrome Custom Tabs. **iOS:** SFSafariViewController . En los dos
casos, con barra de direcciones visible.

**Por qué es más seguro**

El contenido corre fuera de tu app, con el motor y los parches del sistema. Y el
usuario ve el dominio.

Regla práctica: **si el contenido no es tuyo, va al navegador** . La WebView se justifica cuando necesitás que se vea
integrado y controlás el origen.

<!-- página 28 -->

UNIDAD 6 · PARTE 5 · CONTENIDO WEB Y RED
###### **HTTPS, y qué es realmente el pinning**

**Lo obligatorio**

**HTTPS siempre.** Android e iOS ya bloquean el tráfico en texto
plano por defecto. Si algo «no anda» y la solución que
encontrás en internet es habilitar HTTP, la solución es otra.

**Certificate pinning**

La app acepta **un certificado concreto**, no cualquiera que la
cadena de confianza valide. Protege contra un certificado
emitido de forma fraudulenta o un proxy instalado en el
dispositivo.

Tiene un costo real: **el día que rote el certificado del servidor, todas las apps instaladas dejan de conectarse** hasta que
publiques una versión nueva. Se justifica en banca y salud; en un TP integrador, no.

<!-- página 29 -->

UNIDAD 6 · PARTE 5 · CONTENIDO WEB Y RED
###### **Permisos: pedir sólo lo que se usa**

// cada módulo pide lo suyo, cuando hace falta
const { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') return;

**No existe más** expo-permissions **.** Ese paquete se retiró hace varias versiones: hoy cada módulo expone su propio

requestPermissionsAsync(), y lo declarativo va en el app.json .

Pedir permisos de más no es sólo un riesgo (M6): **las tiendas rechazan apps** que piden permisos sin justificación, y iOS
exige explicar cada uno en el Info.plist .

<!-- página 30 -->

UNIDAD 6
##### **Para llevarse**

**El cliente no es un lugar seguro.** Todo lo demás de esta unidad se deduce de ahí.

Tokens en **SecureStore**, nunca en kv-store.

Login por **OAuth con PKCE**, en el navegador del sistema y no en una WebView.

Los secretos y la validación que importa, **en el servidor** .

owasp.org/www-project-mobile-top-10 - docs.expo.dev/guides/authentication

---

<a id="doc-18"></a>

## 18. Unidad 7 — Construir la aplicación · Desarrollo para Móviles

> **Fuente:** `Unidad 7 — Construir la aplicación · Desarrollo para Móviles.pdf` · **Páginas:** 27 · **Palabras:** 2.102 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S ITA R I A E N D E S A R R O L LO W E B · F C A D · U N E R
### **Unidad 7** **Construir la aplicación**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 7
###### **Qué vamos a ver**

La unidad son dos clases. Esta es la primera: cómo se convierte el proyecto en un archivo instalable y firmado.

**Hoy · Construir** **La clase que viene · Publicar**

Qué entrega cada tienda y por qué va firmado

EAS Build: perfiles, credenciales, distribución interna

iOS sin tener una Mac

Versionado de la app

Íconos, splash y ficha de tienda

Cuentas de desarrollador y EAS Submit

Actualizaciones por aire con EAS Update

Cómo se entrega el TP integrador

<!-- página 3 -->

UNIDAD 7 · PARTE 1
##### **Del proyecto al binario**

Qué archivo pide cada tienda, y por qué ninguna acepta uno sin firmar.

<!-- página 4 -->

UNIDAD 7 · PARTE 1 · DEL PROYECTO AL BINARIO
###### **Dónde estábamos**

En la Unidad 1 quedó planteada la diferencia. Ahora la usamos.

DEBUG — LO QUE VENÍAMOS HACIENDO RELEASE — LO QUE SE PUBLICA

Metro sirve el JavaScript desde tu computadora.

Recarga al guardar, herramientas de desarrollo.

La app no funciona si apagás la máquina.

El JavaScript va **adentro** del binario, como bytecode de
Hermes.

Minificado, optimizado, sin herramientas de desarrollo.

Se instala y anda sola.

Toda esta unidad trabaja sobre builds de **release** . Es la primera vez en el cuatrimestre que medimos la app como la va a
ver el usuario.

<!-- página 5 -->

UNIDAD 7 · PARTE 1 · DEL PROYECTO AL BINARIO
###### **Qué archivo pide cada tienda**

**PLAY STORE**
**.aab**

**Android App Bundle.** No se instala: es
el paquete que Google recibe y del que
genera un APK a medida de cada
dispositivo e idioma.

**.apk**

El instalable de Android. Sirve para
probar y para repartir a mano, **no** para
subir a Play Store.

**APP STORE**
**.ipa**

El equivalente de iOS. Solo se instala a
través de la App Store o de TestFlight,
nunca copiando el archivo.

Google acepta **únicamente** .aab para apps nuevas. Un .apk subido a Play Console es rechazado.

<!-- página 6 -->

UNIDAD 7 · PARTE 1 · DEL PROYECTO AL BINARIO
###### **Por qué todo va firmado**

Ni Android ni iOS instalan una app sin firma digital. No es un trámite: es el mecanismo que sostiene las actualizaciones.

**Qué garantiza** **La consecuencia dura**

**Identidad:** esta app la publicó quien dice publicarla.

**Integridad:** el archivo no se modificó en el camino.

**Continuidad:** la actualización viene del mismo autor que la
versión instalada.

Si la clave cambia, el sistema operativo considera que es **otra**
**app** . No hay actualización posible: el usuario tendría que
desinstalar y perder sus datos.
Por eso la clave se cuida más que el código.

<!-- página 7 -->

UNIDAD 7 · PARTE 1 · DEL PROYECTO AL BINARIO
###### **Android: las dos claves**

Google separa la clave con la que vos subís de la clave con la que el usuario recibe la app. Se llama **firma de apps de**
**Play** .

**Clave de carga**

La que usás para firmar el .aab antes de subirlo. Google la
usa para verificar que sos vos.
**Si la perdés, se puede reemplazar** pidiendo un
restablecimiento.

**Clave de firma de la app**

Con esta Google firma los APK que llegan al dispositivo.
Nunca cambia durante toda la vida de la app.
Google la guarda por vos. **Es la que no se puede perder** - y
por eso conviene no tenerla.

Las claves viven en un **keystore** ( .jks ): un archivo binario con contraseña que funciona como repositorio de
certificados.

<!-- página 8 -->

UNIDAD 7 · PARTE 1 · DEL PROYECTO AL BINARIO
###### **iOS: certificados y perfiles**

Apple usa dos piezas en lugar de una, y las dos las emite Apple.

**Certificado de distribución**

Identifica a la cuenta de desarrollador que firma. Equivale, en
intención, al keystore de Android.

**Perfil de aprovisionamiento**

Dice qué app, firmada por quién, puede correr dónde. Para
pruebas incluye la lista de dispositivos autorizados.

Generarlos a mano es tedioso incluso para quien ya lo hizo, y clásicamente requería una Mac. Es exactamente el
problema que resuelve la parte que sigue.

<!-- página 9 -->

UNIDAD 7 · PARTE 2
##### **EAS Build**

Compilar en la nube, con las credenciales administradas.

<!-- página 10 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Qué es EAS**

**Expo Application Services** : los servicios en la nube que acompañan al SDK. Tres de ellos son esta unidad.

**EAS Build**

Compila la app en servidores de Expo y
devuelve el .aab, .apk - .ipa
firmado.

**EAS Submit**

Sube ese binario a Play Store o App
Store desde la terminal.

**EAS Update**

Manda cambios de JavaScript a las
apps ya instaladas, sin pasar por la
tienda.

Los tres funcionan con el **plan gratuito** . Los límites concretos los vemos en unas slides.

<!-- página 11 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Los primeros tres comandos**

### 1. La herramienta de línea de comandos de EAS
npm install --global eas-cli

### 2. Iniciar sesión con la cuenta de Expo (la misma de Expo Go)
eas login

### 3. Preparar el proyecto: crea eas.json
eas build:configure

eas build:configure se corre **una vez por proyecto** . Lo único que hace es dejar un eas.json en la raíz, al lado de
package.json .

<!-- página 12 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **eas.json y los perfiles**

{

"build": {

"development": {

"developmentClient": true,
"distribution": "internal"

},
"preview": {

"distribution": "internal"
},

"production": {}
}
}

Un **perfil** es un conjunto de opciones con nombre. Estos tres vienen por defecto, pero los nombres son libres: podrías
llamarlos como quieras.

Sin --profile, EAS usa production .

<!-- página 13 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Qué hace cada perfil**

Perfil Qué genera Para qué

**development** Build de debug con expo-dev-client El development build de la Unidad 1. Nunca va a una
<u>tienda.</u>

**preview** .apk de release, sin herramientas de
<u>desarrollo</u>

Que otra persona pruebe la app real. **Es el perfil del TP.**

**production** .aab / .ipa firmados para la tienda Publicar. No se instala directo en un dispositivo.

"distribution": "internal" es lo que cambia el formato de Android de .aab a .apk . Sin eso, el archivo que baja no
se puede instalar.

<!-- página 14 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Las credenciales las genera EAS**

eas build --platform android --profile production

La primera vez, la terminal pregunta qué hacer con la firma:

**Generate new keystore**

EAS crea el keystore, lo guarda cifrado en sus servidores y lo
usa en cada build. No hay archivo que perder.

**Usar uno propio**

Si ya publicaste antes, subís tu keystore existente y EAS firma
con ese.

En iOS es el mismo mecanismo: iniciás sesión con tu cuenta de Apple Developer y EAS emite el certificado y el perfil por
vos.

<!-- página 15 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Qué pasa mientras compila**

**1 · Subida**
EAS comprime el proyecto y lo manda. Lo
que esté en .gitignore no viaja.

**2 · Prebuild**
Genera android/ e ios/ a partir de

app.json y los config plugins.

**3 · Compilación**
Gradle o Xcode en un servidor limpio. El
JavaScript se empaqueta a bytecode de
Hermes.

**4 · Firma**
Se firma con las credenciales guardadas
y queda el archivo para descargar.

El comando espera hasta el final, pero se puede cortar sin problema: el build sigue en el servidor. eas build:list
muestra el estado.

<!-- página 16 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Distribución interna**

Un build con "distribution": "internal" genera un **link** con código QR. Quien lo abre desde el teléfono, instala.

**Android**

Es un .apk . Se instala aceptando el aviso de "app de origen
desconocido". Sin cuenta de desarrollador, sin tienda, sin
revisión.

**CON FRICCIÓN**
**iOS**

Aprovisionamiento ad hoc: solo instalan los dispositivos cuyo
UDID estaba registrado **al momento de compilar** .
Se registran con eas device:create . Máximo 100 por año.

En iOS, sumar un dispositivo nuevo obliga a **volver a compilar** . En Android el mismo .apk sirve para cualquiera.

<!-- página 17 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Versionar la app**

Hay dos números distintos y se confunden todo el tiempo.

version **— la que se ve**

La que figura en la ficha de la tienda: "1.4.0" . La elegís vos,
cuando decidís que hay una versión nueva.

versionCode **/** buildNumber

El número interno de cada envío. Nadie lo ve. Tiene que subir
en **cada** archivo que subas a la tienda.

Olvidarse de incrementar el número interno es una de las causas más comunes de rechazo: la tienda ve un envío
duplicado.

<!-- página 18 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Que lo cuente EAS**

{

"cli": { "appVersionSource": "remote" },
"build": {

"production": { "autoIncrement": true }
}

}

Con appVersionSource: "remote" el número interno lo guarda y lo incrementa el servidor de EAS en cada build. Los
valores del app.json pasan a ignorarse.

Es el comportamiento recomendado desde EAS CLI 12. Elimina de raíz el olvido de la slide anterior.

<!-- página 19 -->

UNIDAD 7 · PARTE 2 · EAS BUILD
###### **Los límites del plan gratuito**

#### **15 + 15**

#### **45 min**

tiempo máximo

#### **1**

build a la vez
(concurrencia)

#### **baja**

prioridad
en la cola

builds por mes

por build

Android e iOS

Suficiente para el TP, pero no para compilar a cada rato. Cuando el cupo se agota o la cola está larga, queda el camino
local de la Unidad 1: eas build --local - npx expo run: .

Enviar a las tiendas con **EAS Submit está incluido** en el plan gratuito, sin límite de envíos.

<!-- página 20 -->

UNIDAD 7 · PARTE 3
##### **iOS sin tener una Mac**

Qué se puede hacer desde Windows o Linux, y qué no.

<!-- página 21 -->

UNIDAD 7 · PARTE 3 · IOS SIN TENER UNA MAC
###### **El mito y el dato**

LO QUE SE CREE LO QUE PASA HOY

"Para hacer una app de iOS hace falta una Mac."

Era cierto: compilar iOS requiere Xcode, que solo corre en
macOS.

La Mac la pone **EAS** : compila en sus servidores.

Desde Windows o Linux salen builds de iOS reales,
firmados.

Lo que sigue haciendo falta es la **cuenta**, no la máquina.

Cuenta de Apple Developer: **99 USD por año** . Es el límite real para un estudiante, y no lo resuelve ninguna herramienta.

<!-- página 22 -->

UNIDAD 7 · PARTE 3 · IOS SIN TENER UNA MAC **Tres builds de iOS distintos**

|Destino|Necesita cuenta paga|Cómo se pide|
|---|---|---|
|Simulador de iOS<br>solo corre en una Mac|No|"ios": { "simulator":true}en el perfil|
|iPhone real, interno|Sí|eas device:create+ perfil<br>preview|
|App Store / TestFlight|Sí|Perfil<br>production|
|El build de simulador es g            i<br>falta.|ratis pero no sirve de mucho sin      i|una Mac donde abrirlo. La fila del medio es la que suele hacer|

<!-- página 23 -->

UNIDAD 7 · PARTE 3 · IOS SIN TENER UNA MAC
###### **Lo que EAS no resuelve**

**La revisión de Apple**

Toda app y toda actualización pasa por
revisión humana. Puede tardar días y
puede ser rechazada.

**El límite de 100**

Cien dispositivos por año para
distribución ad hoc. Borrar uno no
libera el cupo hasta que se renueva la
membresía.

**Las reglas de la tienda**

Permisos justificados, política de
privacidad, contenido. El binario puede
estar perfecto y el envío rechazarse
igual.

Android tiene su propia versión de esto, y es más dura de lo que parece. Lo vemos en la clase que viene.

<!-- página 24 -->

UNIDAD 7 · ANEXO
##### **Firma manual**

El camino anterior a EAS. Conviene conocerlo, no usarlo.

<!-- página 25 -->

UNIDAD 7 · ANEXO · FIRMA MANUAL
###### **Generar un keystore a mano**

keytool -genkeypair -v \
-keystore mi-app.jks \
-alias mi-app \
-keyalg RSA -keysize 2048 \
-validity 10000

También sale desde Android Studio, con **Build > Generate Signed Bundle / APK** . Pide ubicación, contraseña, alias y años
de validez.

**Al menos 25 años de validez.** Si el certificado vence, no se puede firmar la actualización — y ya vimos qué significa eso.

<!-- página 26 -->

UNIDAD 7 · ANEXO · FIRMA MANUAL
###### **Por qué no es el camino recomendado**

MANUAL ADMINISTRADO POR EAS

Un archivo crítico vive en una computadora.

Si esa persona se va del equipo, el archivo se va con ella.

La contraseña termina en un chat.

Para iOS, además, hace falta una Mac.

Las credenciales viven cifradas en el servidor.

Cualquier integrante autorizado compila.

Se pueden descargar cuando quieras.

Mismo flujo para Android y para iOS.

<!-- página 27 -->

UNIDAD 7
###### **Lo que sigue**

Íconos, splash y todo lo que la tienda mira antes que el código

Las dos cuentas de desarrollador, y qué exige cada una

**EAS Submit** : del binario a la ficha publicada

**EAS Update** : corregir un bug sin pasar por la tienda

Cómo se entrega el TP integrador

Documentación: docs.expo.dev/build

---

<a id="doc-19"></a>

## 19. Unidad 7 — Publicar y actualizar · Desarrollo para Móviles

> **Fuente:** `Unidad 7 — Publicar y actualizar.pdf` · **Páginas:** 28 · **Palabras:** 2.322 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
### **Unidad 7** **Publicar y actualizar**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · React 19.2

<!-- página 2 -->

UNIDAD 7
###### **Qué vamos a ver**

La clase anterior terminó con un binario firmado. Falta que llegue a alguien.

**Temas** **Objetivos**
Preparar la app: ícono, splash, ficha de tienda Poder subir una app a una tienda de punta a punta

Cuentas de desarrollador y sus requisitos

**EAS Submit** y los canales de prueba

**EAS Update** : actualizaciones por aire

Después de publicar: errores, uso y rendimiento

Saber qué se corrige sin volver a publicar y qué no

Enterarse de que la app se rompió sin que te lo cuenten

Dejar el TP integrador listo para entregar

<!-- página 3 -->

UNIDAD 7 · PARTE 1
##### **Preparar la app**

Lo que la tienda mira antes de mirar el código.

<!-- página 4 -->

UNIDAD 7 · PARTE 1 · PREPARAR LA APP **El ícono**

{ "icon": "./assets/images/icon.png", "android": { "adaptiveIcon": { "foregroundImage":foregroundImage":Image":mage":age":ge":":: "./assets/images/icon-frente.pngassets/images/icon-frente.pngssets/images/icon-frente.png/images/icon-frente.pngimages/icon-frente.pngages/icon-frente.pngges/icon-frente.png/icon-frente.pngicon-frente.pngcon-frente.pngon-frente.png-frente.pngfrente.png.pngpng", "monochromeImage": "./assets/images/icon-mono.png", "backgroundColor": "#0B3A5D" } } }

- "foregroundImage":foregroundImage":Image":mage":age":ge":":: "./assets/images/icon-frente.pngassets/images/icon-frente.pngssets/images/icon-frente.png/images/icon-frente.pngimages/icon-frente.pngages/icon-frente.pngges/icon-frente.png/icon-frente.pngicon-frente.pngcon-frente.pngon-frente.png-frente.pngfrente.png.pngpng",

**1024×1024, PNG, cuadrado exacto, sin transparencias ni esquinas redondeadas.** El sistema operativo recorta la forma que corresponda; EAS Build genera los demás tamaños.

<!-- página 5 -->

UNIDAD 7 · PARTE 1 · PREPARAR LA APP
###### **La pantalla de presentación**

{

"plugins": [

["expo-splash-screen", {

"image": "./assets/images/splash-icon.png",
"backgroundColor": "#FFFFFF",

"imageWidth": 200,
"dark": {

"image": "./assets/images/splash-icon-dark.png",
"backgroundColor": "#000000"

}
}]
]
}

**No se prueba en Expo Go ni en un development build.** Expo Go muestra el ícono de la app, y el development build
trae su propio splash. Hay que verlo en un build de preview  - de production .

<!-- página 6 -->

UNIDAD 7 · PARTE 1 · PREPARAR LA APP **El app.json de producción**

|Campo|Qué es|
|---|---|
|name|El nombre debajo del ícono, en el teléfono.|
|android.package<br>ios.bundleIdentifier|La identidad de la app:<br>ar.edu.uner.miapp.**No se puede cambiar nunca más**una vez<br>publicada.|
|version|La versión visible en la tienda.|
|permisos y textos de<br>uso|Los de la Unidad 4: cámara, ubicación. iOS exige explicarpara qué.|
|Elegir mal el identificado|r es el error irreversible de la unidad. Se decide una vez, con calma.|

<!-- página 7 -->

UNIDAD 7 · PARTE 1 · PREPARAR LA APP
###### **Android 16 o no hay envío**

**La fecha**

Desde el **31 de agosto de 2026**, Google Play rechaza apps
nuevas y actualizaciones que apunten a menos de **Android**
**16 (API 36)** .

**Dónde estamos**

Expo apunta a API 36 desde el **SDK 54** . Con SDK 57 el
template por defecto ya cumple: no hay que tocar nada.

Es la misma decisión que trajo el **edge-to-edge obligatorio** que vimos en la Unidad 3. Apuntar a una versión nueva de
Android no es solo un número: cambia cómo se comporta la app.

<!-- página 8 -->

UNIDAD 7 · PARTE 1 · PREPARAR LA APP
###### **La ficha de la tienda**

Es trabajo aparte del código, y suele subestimarse.

**Textos**

Nombre, descripción corta y larga,
palabras clave. Es lo que decide si
alguien la encuentra.

**Imágenes**

Capturas por tamaño de pantalla,
gráfico de cabecera, ícono de alta
resolución.

**Declaraciones**

Política de privacidad (URL obligatoria),
clasificación de contenido, qué datos
recolecta la app.

La política de privacidad es un requisito de las dos tiendas, aunque la app no recolecte nada. Hay que tenerla
publicada en una URL accesible.

<!-- página 9 -->

UNIDAD 7 · PARTE 2
##### **Las cuentas y el envío**

Qué cuesta cada tienda, qué exige, y cómo se sube el binario.

<!-- página 10 -->

UNIDAD 7 · PARTE 2 · LAS CUENTAS Y EL ENVÍO
###### **Las dos cuentas**

**Google Play**
#### **25 USD**

pago único, de por vida

Revisión más rápida. Varios canales de prueba.

**Apple App Store**
#### **99 USD**

por año, mientras publiques

Revisión humana más estricta. TestFlight incluido.

Sin cuenta se puede **construir y firmar** para Android, y repartir por distribución interna. Lo que no se puede es estar en
la tienda.

<!-- página 11 -->

UNIDAD 7 · PARTE 2 · LAS CUENTAS Y EL ENVÍO
###### **La barrera que nadie espera**

**12 testers · 14 días**

Una cuenta **personal** de Google Play creada después de
noviembre de 2023 tiene que correr una prueba cerrada con
al menos **12 personas distintas**, aceptadas y activas durante
**14 días seguidos**, antes de poder pedir acceso a producción.

**Detalles que importan**

Doce cuentas de Google reales, entradas por el link de
invitación.

Emuladores y cuentas duplicadas no cuentan.

Si alguien se sale, el reloj se reinicia.

Las cuentas de **organización** están exentas.

Traducción para el TP: **publicar en Play Store no entra en un cuatrimestre.** Por eso entregamos por distribución
interna.

<!-- página 12 -->

UNIDAD 7 · PARTE 2 · LAS CUENTAS Y EL ENVÍO
###### **EAS Submit en Android**

### Sube el último build de producción a Play Console
eas submit --platform android

### O todo junto: compilar y enviar
eas build --platform android --auto-submit

Antes hay que hacer dos cosas una sola vez: crear la app en Play Console, y darle a EAS una **clave de cuenta de**
**servicio** de Google para que suba en tu nombre.

El primer envío entra al canal de **prueba interna** y la app queda en borrador hasta que completes la ficha.

<!-- página 13 -->

UNIDAD 7 · PARTE 2 · LAS CUENTAS Y EL ENVÍO
###### **EAS Submit en iOS**

{

"submit": {

"production": {

"ios": { "ascAppId": "1234567890" }
}
}
}

eas submit --platform ios

El ascAppId es el **Apple ID** numérico que App Store Connect le asigna a la app. Aparece en App Information > General
Information.

Todo lo que se sube a la App Store pasa primero por **TestFlight** . No hay forma de saltearlo.

<!-- página 14 -->

UNIDAD 7 · PARTE 2 · LAS CUENTAS Y EL ENVÍO
###### **Los canales de prueba**

**Google Play** **Apple**
**Interna**   - hasta 100 personas, sin revisión, disponible en **TestFlight interno**   - hasta 100 miembros del equipo, sin
minutos. revisión.

**Cerrada** - por lista o por grupo. Es la de los 12 testers.

**Abierta** - cualquiera puede sumarse desde la ficha.

**Producción** - todo el mundo.

**TestFlight externo** - hasta 10.000 personas, con una
revisión previa más liviana.

**App Store** - revisión completa.

Los canales de prueba permiten lanzar por etapas: probás con pocos, mirás cómo anda, y recién después promovés la
misma build a producción.

<!-- página 15 -->

UNIDAD 7 · PARTE 3
##### **Actualizar sin pasar por la tienda**

EAS Update y el límite entre lo nativo y lo que se puede cambiar.

<!-- página 16 -->

UNIDAD 7 · PARTE 3 · ACTUALIZAR SIN PASAR POR LA TIENDA
###### **El problema**

Viernes a la noche. La app está publicada. Un usuario reporta que el botón de pagar tira error.

**Sin actualizaciones por aire**

Corregís una línea, compilás, subís, esperás la revisión, y aun
así el usuario tiene que ir a la tienda a actualizar.
Días, en el mejor caso.

**Con EAS Update**

Corregís la línea, publicás la actualización y la app la toma en
el próximo arranque.
Minutos.

<!-- página 17 -->

UNIDAD 7 · PARTE 3 · ACTUALIZAR SIN PASAR POR LA TIENDA
###### **Dos capas**

Una app compilada tiene una parte que no se puede tocar y otra que sí.

**Capa nativa — fija**

El código compilado, las librerías nativas, los permisos
declarados, la versión del SDK.
Cambiarla exige un build nuevo y pasar por la tienda.

**Capa de JavaScript — intercambiable**

Tus componentes, tus pantallas, los estilos, las imágenes del
bundle.
Esto es lo que reemplaza una actualización.

EAS Update reemplaza la capa de arriba dejando la de abajo intacta. Todo el mecanismo se reduce a garantizar que
las dos sean compatibles.

<!-- página 18 -->

UNIDAD 7 · PARTE 3 · ACTUALIZAR SIN PASAR POR LA TIENDA
###### **Publicar una actualización**

### Una vez por proyecto
npx expo install expo-updates
eas update:configure

### Después de esto hace falta UN build nuevo, que ya incluye la librería

### Cada vez que quieras publicar
eas update --channel production --message "Arreglo del botón de pagar"

El **canal** conecta builds con actualizaciones: un build compilado para production solo recibe lo publicado en ese
canal. Así se prueba una actualización en preview sin tocar a los usuarios.

<!-- página 19 -->

UNIDAD 7 · PARTE 3 · ACTUALIZAR SIN PASAR POR LA TIENDA
###### **runtimeVersion, el seguro**

Es la propiedad que garantiza que una actualización solo llegue a builds cuya capa nativa la soporta.

**Política** fingerprint

Calcula una huella de todo lo que
afecta la capa nativa. Cambia sola
cuando hace falta.

"1.0.0"

Manual. Vos la subís cada vez que
tocás algo nativo. Control total y olvidos
posibles.

**Política** appVersion

Sigue a version . Simple, pero si te
olvidás de subir la versión, quedan
desincronizadas.

Si publicás una actualización que usa una librería nativa que el build no tiene, la app **se cae al arrancar** . expoupdates intenta volver a la versión anterior, pero es un incidente real.

<!-- página 20 -->

UNIDAD 7 · PARTE 3 · ACTUALIZAR SIN PASAR POR LA TIENDA
###### **Qué se puede y qué no**

SÍ, POR AIRE NO: HACE FALTA BUILD NUEVO

Corregir un bug de JavaScript

Cambiar textos, traducciones, estilos

Reordenar o rediseñar pantallas

Cambiar imágenes del proyecto

Agregar o actualizar una librería nativa

Pedir un permiso nuevo

Subir de versión de Expo SDK

Cambiar ícono, splash o nombre de la app

Y sigue valiendo la regla de fondo: **las actualizaciones tienen que respetar las reglas de las tiendas.** Cambiar el
comportamiento de la app por aire para esquivar la revisión es motivo de baja.

<!-- página 21 -->

UNIDAD 7 · PARTE 3 · ACTUALIZAR SIN PASAR POR LA TIENDA
###### **Cuando la actualización sale mal**

**Lanzamiento gradual**

Publicás a un porcentaje de usuarios,
mirás los errores en el panel, y recién
después al resto.

**Republicar**

Volvés a publicar una actualización
anterior que funcionaba, encima de la
que falló. Como un commit nuevo, no
un borrado.

**Volver al binario**

Un rollback devuelve a los usuarios a la
versión que venía adentro del build
instalado.

Desde el SDK 55 las actualizaciones viajan como **diferencias** del bytecode de Hermes, no como el bundle entero: la
descarga baja alrededor de un 75 %.

<!-- página 22 -->

UNIDAD 7 · PARTE 4
##### **Después de publicar**

Ahora la app corre en teléfonos que no podés ver.

<!-- página 23 -->

UNIDAD 7 · PARTE 4 · DESPUÉS DE PUBLICAR
###### **Las tres preguntas**

En desarrollo tenías la consola, el depurador y el teléfono en la mano. En producción no tenés nada de eso: tenés que
**instrumentar la app para que te cuente** .

**¿Se rompe?**

Errores y cierres inesperados, con el
stack trace y el contexto del dispositivo.
Crash reporting — Sentry

**¿La usan?**

Cuánta gente la abre, con qué versión,
en qué plataforma, y qué pantallas
recorre.
Analítica — EAS Insights, PostHog

**¿Anda rápido?**

Cuánto tarda en arrancar y en
responder, en teléfonos reales y redes
reales.
Rendimiento — EAS Observe

Sin esto, la única fuente de información sobre una app publicada son las **reseñas de una estrella** . Llegan tarde, sin
stack trace y por escrito.

<!-- página 24 -->

UNIDAD 7 · PARTE 4 · DESPUÉS DE PUBLICAR
###### **Sentry: enterarte de que se rompió**

npx @sentry/wizard@latest -i reactNative

Instala @sentry/react-native, agrega su plugin de Metro y su config plugin al app.json . En el código, una línea al
arrancar:

import * as Sentry from '@sentry/react-native';

Sentry.init({ dsn: process.env.EXPO_PUBLIC_SENTRY_DSN });

export default Sentry.wrap(RootLayout);

**Los source maps son el punto entero.** Un build de release está minificado: sin ellos el error llega como a.b is not
a function (index.bundle:1:84213) . EAS Build los sube solo; después de un eas update hay que subirlos a mano.

<!-- página 25 -->

UNIDAD 7 · PARTE 4 · DESPUÉS DE PUBLICAR
###### **Analítica y rendimiento**

**Lo que ya tenés en EAS**

**EAS Insights** muestra uso por plataforma, por versión de
tienda y en el tiempo. Sale de los pedidos de EAS Update;
agregando expo-insights se vuelve preciso.
**EAS Observe** mide el arranque en frío, el tiempo hasta el
primer dibujo y hasta que la app responde, en sesiones
reales.

**Si necesitás más**

**PostHog** - eventos de producto, feature flags y repetición de
sesión; se integra desde EAS CLI y etiqueta los eventos por
release.
**LogRocket**, **Vexo**, **BugSnag** - alternativas con
documentación propia en Expo.

Todo esto se cruza con lo de la parte anterior: los eventos y los errores quedan **etiquetados por canal y por ID de**
**actualización** . Eso es lo que te deja responder «¿esto empezó con el update de ayer?» — y decidir si hay que
revertirlo.

<!-- página 26 -->

UNIDAD 7 · PARTE 5
##### **La entrega del TP**

Cómo se aplica todo esto al trabajo integrador.

<!-- página 27 -->

UNIDAD 7 · PARTE 5 · LA ENTREGA DEL TP
###### **Cómo se entrega el integrador**

### Perfil preview: APK de release, instalable, sin cuenta de tienda
eas build --platform android --profile preview

**Qué se entrega** **Qué tiene que poder hacer la cátedra**
El **link del build** que devuelve EAS. Abrir el link desde un Android e instalar.

El repositorio, con el eas.json incluido.

Ícono y splash propios ya configurados.

Usar la app **sin** Metro ni la computadora de nadie.

Ver el nombre y el ícono del grupo en el teléfono.

No se pide publicar en Play Store: por la regla de los 12 testers, no entra en el cuatrimestre.

<!-- página 28 -->

UNIDAD 7
###### **Documentación**

docs.expo.dev/build — EAS Build y eas.json

docs.expo.dev/submit — EAS Submit

docs.expo.dev/eas-update — actualizaciones y runtimeVersion

docs.expo.dev/distribution — buenas prácticas de tienda

docs.expo.dev/monitoring/services — Sentry, Insights, Observe y el resto

---

<a id="doc-20"></a>

## 20. Reservas Deportivas - Villaguay

> **Fuente:** `05 - Reservas Deportivas.pdf` · **Páginas:** 11 · **Palabras:** 2.584 · **Imágenes:** 0

<!-- página 1 -->

### **Reservas Deportivas**

**Dirección de Deportes de Villaguay — Pedido de aplicación móvil**

_Documento redactado por Nahuel Ojeda, director de Deportes de la Municipalidad de Villaguay, Entre_
_Ríos, para el equipo de desarrollo._

#### **Cómo llegamos hasta acá**

La Municipalidad tiene once espacios deportivos: dos canchas de fútbol 5 con césped sintético en el
Polideportivo Municipal, una de fútbol 11, tres de básquet, dos de vóley, dos de tenis en el Parque Berduc
y el gimnasio cerrado. Los usan clubes, escuelas, grupos de amigos que juegan todos los martes y gente
que aparece un sábado a la tarde.

El sistema de reservas es mi teléfono. La gente me escribe por WhatsApp, yo miro una libreta que tengo
en el escritorio, contesto si hay lugar y anoto el nombre. Cuando no estoy, contesta Marcelo, el encargado
del Polideportivo, que tiene su propia libreta. Ya se imaginan cómo termina esto.

El mes pasado pasaron estas tres cosas:

- Dos grupos aparecieron el mismo viernes a las 21 para la misma cancha. Yo le había dicho que sí a

uno y Marcelo al otro. Terminaron jugando ocho contra ocho en una cancha de fútbol 5 porque no
había otra.

- El sábado de la lluvia, la cancha 2 quedó impracticable. No teníamos forma de avisarles a los seis

grupos que tenían turno ese día. Vinieron todos.

- Revisé la libreta de un mes entero: el 30% de los turnos reservados no se usó y nadie avisó. Son

canchas vacías que alguien más quería.

Lo que necesito es que la gente vea qué hay libre y reserve sola, que le llegue un recordatorio, que
pueda cancelar con un botón, y que el día del turno entre mostrando algo que Marcelo pueda verificar en
la puerta.

#### **Qué necesito que la app haga**

**1. Los espacios**

- Ver el listado de los once espacios, con foto, deporte, superficie y si tiene luz para jugar de noche.

- Filtrar por deporte y por complejo.

- Entrar a la ficha y ver las fotos, las características, el precio por hora y las reglas del lugar.

- Que cada espacio pueda tener un **video corto**, de veinte o treinta segundos, recorriendo la cancha.

La gente pregunta siempre cómo está el piso y si el sintético está gastado; con un video se termina la
discusión.

- Ver dónde queda cada complejo en el mapa y poder ir hasta ahí.

<!-- página 2 -->

**2. La disponibilidad**

Esta es la pantalla más importante de todas.

- Elegir un espacio y un día, y ver la grilla de turnos de esa jornada.

- Los turnos son de una hora, de 8:00 a 24:00. Que se vea claro cuál está libre, cuál ocupado y cuál

bloqueado por mantenimiento.

- Poder mirar los próximos siete días.

- Que un turno que ya pasó no se pueda reservar, aunque figure libre.

**Ojo con las reservas fijas.** Hay grupos que tienen la cancha todos los martes a las 21 desde hace
años, y clubes con horarios semanales para entrenar. Eso ocupa el turno todas las semanas sin que
nadie lo reserve cada vez. Si la app no lo contempla, la mitad de la grilla va a mostrar libre lo que en
realidad está tomado, y volvemos al problema del principio.

**3. Reservar y mis reservas**

- Reservar un turno libre en dos toques, indicando el deporte y cuántos van a ser.

- Ver mis reservas, separadas entre las que vienen y las que ya pasaron.

- Cancelar una reserva. **Hasta cuatro horas antes se cancela sola; después hay que avisarnos.**

- Que quien cancela tarde repetidas veces quede marcado. No quiero castigar a nadie todavía, pero

quiero saberlo.

- Un máximo de tres reservas activas por persona, para que no acaparen los sábados.

**4. El ingreso el día del turno**

- Que la reserva muestre un **código QR** en pantalla.

- Que Marcelo, desde su cuenta de encargado, lo escanee en la puerta y quede registrado que llegaron

y a qué hora.

- Que si el código no corresponde a ese día o a esa cancha, la app lo diga con claridad.

- Que el encargado pueda marcar un turno como _no se presentó_ .

**5. Los recordatorios y avisos**

- Un recordatorio dos horas antes del turno.

- Un aviso si nosotros tenemos que suspender o mover el turno, por lluvia o por mantenimiento.

- Un aviso cuando se libera un turno de un espacio que la persona marcó como favorito.

**6. Lo que manejamos nosotros**

La misma app, con cuenta de encargado o de administrador:

- Bloquear turnos o días enteros por mantenimiento o por lluvia, con un motivo escrito.

- Cargar y editar las reservas fijas.

- Ver la agenda del día de todos los espacios.

- Escanear el QR y marcar presentes y ausentes.

- Cambiar el precio por hora de un espacio.

<!-- página 3 -->

#### **Cómo me imagino que se usa**

###### **La grilla de un espacio**

```
+-----------------------------------+
| <  Cancha 2 - Futbol 5       [*]  |
+-----------------------------------+
|  < Sabado 19 de septiembre  >     |
+-----------------------------------+
|  08:00  libre                     |
|  09:00  libre                     |
|  ...                              |
|  18:00  OCUPADO                   |
|  19:00  libre        $ 12.000     |
|  20:00  MANTENIMIENTO             |
|  21:00  FIJO - Grupo del martes   |
|  22:00  libre        $ 12.000     |
+-----------------------------------+
|      [   R E S E R V A R   ]      |
+-----------------------------------+
```

###### **Mi reserva**

```
+-----------------------------------+
| <  Mi reserva                     |
+-----------------------------------+
|  Cancha 2 - Futbol 5              |
|  Sabado 19/09  de 19 a 20 hs      |
|  Polideportivo Municipal          |
|  $ 12.000 - se paga en el lugar   |
+-----------------------------------+
|      [  codigo QR de ingreso ]    |
|                                   |
|   Mostraselo al encargado         |
+-----------------------------------+
|  [ Como llegar ]                  |
|  [ Cancelar reserva ]             |
|   Se puede cancelar sin aviso     |
|   hasta las 15:00 de hoy          |
+-----------------------------------+
```

#### **Cosas importantes para cómo lo vamos a usar**

- **El QR se muestra en la puerta de la cancha** , donde la señal es mala. La reserva y su código tienen que estar guardados en el teléfono y verse sin conexión.

- **Reservar tiene que ser más rápido que mandarme un WhatsApp.** Si no, me siguen escribiendo.

- **No pidan cuenta para mirar la disponibilidad.** La cuenta hace falta recién para reservar.

- **Si niega la ubicación** , que igual pueda ver todo; la ubicación es sólo para el mapa y para saber qué complejo tiene más cerca.

- **Se usa de noche y a la intemperie.** Que se lea con poca luz y con el modo oscuro.

- **No cobramos por la app.** El turno se paga en el lugar. La app muestra el precio, nada más.

- **Android y iPhone** , con mayoría de Android.

#### **Lo que no entra en esta primera versión**

- Pagos y señas online.

3 / 11

<!-- página 4 -->

- Torneos, fixtures y tablas de posiciones.

- Armado de equipos y búsqueda de jugadores para completar.

- Canchas privadas de la ciudad. Por ahora solo las municipales.

- Alquiler de pecheras, pelotas y demás.

#### **Cómo quiero que trabajemos**

- **No sé de programación.** Si algo de lo que pedí no se puede o es carísimo, díganmelo.

- **Prefiero que pregunten ahora.** Sobre todo con el tema de las reservas fijas, que es donde más me la puedo pasar por alto explicando.

- **Este documento tiene huecos.** Cuando los encuentren, avisen en vez de decidir por su cuenta.

- **Voy a pedir cambios.** Cuando lo haga, díganme qué se cae o qué se atrasa.

- **Muéstrenme algo temprano** , aunque sea feo y con datos inventados.

#### **Algunas cuestiones técnicas que me pidieron incluir**

El equipo docente me pidió que deje escritas algunas definiciones técnicas, para que no haya malentendidos.

##### **Con qué se construye**

|**Qué**|**Con qué**|
|---|---|
|Framework|React Native con Expo|
|Lenguaje|TypeScript|
|Navegación|Expo Router|
|Estilos|`StyleSheet`.Unistyles o NativeWind son opcionales|
|Entrega|Build de producción con EAS|

4 / 11

<!-- página 5 -->

##### **Capacidades del dispositivo que tiene que usar**

|**Capacidad**|**Paquete**|**Para qué en esta app**|
|---|---|---|
|Cámara|`expo-camera`(<br>`CameraView`)|El encargado escanea el QR de la reserva en la<br>puerta|
|Galería|`expo-image-picker`|Subir fotos del estado de una cancha|
|Ubicación y<br>mapa|`expo-location` +<br>`react-native-maps`|Complejos en el mapa y cómo llegar|
|Notificaciones|`expo-notifications`|Recordatorio del turno y aviso de suspensión|
|Persistencia y<br>red|`expo-sqlite`,<br>`expo-sqlite/kv-store`,<br>`expo-network`|Reservas y códigos guardados para verlos sin señal;<br>catálogo de espacios; sesión|
|Seguridad|`expo-secure-store` +<br>`expo-local-`<br>`authentication`|Token de sesión guardado; el encargado reingresa con<br>huella antes de escanear|
|Sensores o<br>háptica|`expo-haptics`,<br>`expo-sensors`|Vibración distinta al validar un ingreso correcto y uno<br>inválido|
|Sistema de<br>archivos|`expo-file-system`|Guardar el video y las fotos de cada cancha para<br>verlos sin datos|
|Multimedia|`expo-video`|Reproducir el recorrido en video de la cancha|

**Tres cosas que la documentación vieja de internet dice mal.** <mark>`expo-av`</mark> no existe más: el audio es <mark>`expo-audio`</mark> y el video, <mark>`expo-video` .</mark> La API vieja de <mark>`expo-file-system`</mark> tira error en tiempo de ejecución: se usa <mark>`File` ,</mark> <mark>`Directory`</mark> y <mark>`Paths` .</mark> Los íconos son <mark>`@react-native-vector-icons/ ionicons` ,</mark> no <mark>`@expo/vector-icons` .</mark>

##### **Cómo va a venir la información**

La API la provee la cátedra y va a estar disponible más adelante en el cuatrimestre. Hasta entonces, la app se construye contra datos inventados. Reglas para que el cambio después sea barato:

- Los tipos de este documento se escriben una sola vez en <mark>`src/tipos/`</mark> y no se tocan cuando llegue la API.

- Los datos falsos van en <mark>`src/mocks/` ,</mark> tipados con esos mismos tipos.

- Ninguna pantalla importa el mock directamente. Toda lectura y escritura pasa por una capa de servicios ( <mark>`src/servicios/reservas.ts` )</mark> que hoy devuelve el mock y mañana hace <mark>`fetch` .</mark>

- Los servicios son asíncronos desde el primer día.

- Los mocks tienen que incluir los casos feos: un día entero bloqueado por lluvia, una grilla completa sin turnos libres, un espacio sin video, una reserva cancelada, una fija que ocupa todos los martes, y un error de red.

La respuesta de la API va a tener siempre esta forma:

```
// éxito
{ "datos": [ ... ], "meta": { "total": 11, "pagina": 1, "porPagina": 20 } }
// error
{ "error": { "codigo": "TURNO_OCUPADO", "mensaje": "Ese turno ya fue reservado." } }
```

5 / 11

<!-- página 6 -->

Convenciones de los datos, sin excepción:

- Los identificadores son **cadenas de texto**, no números.

- Las fechas y horas viajan como texto en **ISO 8601 con zona** . Un día suelto, sin hora, es <mark>`"AAAA-MM-`</mark>

<mark>`DD"`</mark> <mark>.</mark>

- Las claves van en <mark>`camelCase`</mark> <mark>.</mark>

- Un campo que puede no tener valor viene como <mark>`null`</mark> <mark>,</mark> no ausente y no como cadena vacía.

- Los precios son números en pesos por hora.

- La sesión viaja en la cabecera <mark>`Authorization: Bearer <token>`</mark> <mark>.</mark> El token se guarda en <mark>`expo-`</mark>

<mark>`secure-store`</mark> <mark>,</mark> nunca en <mark>`kv-store`</mark> <mark>.</mark>

<!-- página 7 -->

#### **Resumen — qué entidades maneja la app**

##### **Espacio**

|**Propiedad**|**Tipo**|**Ejemplo**|
|---|---|---|
|`id`|`string`|`"esp-02"`|
|`nombre`|`string`|`"Cancha 2 — Fútbol 5"`|
|`deporteId`|`string`|`"dep-futbol5"`|
|`complejo`|`string`|`"Polideportivo Municipal"`|
|`superficie`|`string`|`"césped sintético"`|
|`techado`|`boolean`|`false`|
|`iluminacion`|`boolean`|`true`|
|`capacidad`|`number`|`10`|
|`precioPorHora`|`number`|`12000`|
|`coordenadas`|`Coordenadas`|`{ latitud: -31.86, longitud: -59.02 }`|
|`imagenes`|`string[]`|`["https://.../cancha2.jpg"]`|
|`videoUrl`|`string | null`|recorrido de 30 s|
|`reglas`|`string`|`"No se permite calzado con tapones de`<br>`aluminio"`|
|`activo`|`boolean`|`true`|

```
export interface Coordenadas {
  latitud: number;
  longitud: number;
}
```

```
export interface Espacio {
  id: string;
  nombre: string;
  deporteId: string;
  complejo: string;
  superficie: string;
  techado: boolean;
  iluminacion: boolean;
  capacidad: number;
  precioPorHora: number;
  coordenadas: Coordenadas;
  imagenes: string[];
  videoUrl: string | null;
  reglas: string;
  activo: boolean;
}
```

7 / 11

<!-- página 8 -->

- `{ "id": "esp-02", "nombre": "Cancha 2 — Fútbol 5", "deporteId": "dep-futbol5", "complejo": "Polideportivo Municipal", "superficie": "césped sintético", "techado": false, "iluminacion": true, "capacidad": 10, "precioPorHora": 12000, "coordenadas": { "latitud": -31.8642, "longitud": -59.0281 }, "imagenes": ["https://api.villaguay.gob.ar/img/cancha2.jpg"], "videoUrl": "https://api.villaguay.gob.ar/v/cancha2.mp4", "reglas": "No se permite calzado con tapones de aluminio.", "activo": true }`

- `"deporteId": "dep-futbol5", "complejo": "Polideportivo Municipal", "superficie": "césped sintético", "techado": false, "iluminacion": true, "capacidad": 10, "precioPorHora": 12000,`

- `"coordenadas": { "latitud": -31.8642, "longitud": -59.0281 },`

- `"imagenes": ["https://api.villaguay.gob.ar/img/cancha2.jpg"],`

##### **Deporte**

|**Propiedad**|**Tipo**|**Ejemplo**|
|---|---|---|
|`id`|`string`|`"dep-futbol5"`|
|`nombre`|`string`|`"Fútbol 5"`|
|`icono`|`string`|`"football-outline"`|
|`color`|`string`|`"#2E7D32"`|

```
export interface Deporte {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}
```

```
{ "id": "dep-futbol5", "nombre": "Fútbol 5",
  "icono": "football-outline", "color": "#2E7D32" }
```

##### **Turno**

Un turno es una hora concreta de un espacio en un día concreto. Es lo que la grilla dibuja.

|**Propiedad**|**Tipo**|**Ejemplo**|
|---|---|---|
|`id`|`string`|`"tur-0219-19"`|
|`espacioId`|`string`|`"esp-02"`|
|`fecha`|`string`|`"2026-09-19"`|
|`inicio`|`string`|`"19:00"`|
|`fin`|`string`|`"20:00"`|
|`estado`|`EstadoTurno`|`"libre"`|
|`reservaId`|`string | null`|`null` si está libre|
|`motivoBloqueo`|`string | null`|`"Cancha anegada"`|
|`precio`|`number`|`12000`|

8 / 11

<!-- página 9 -->

```
export type EstadoTurno = "libre" | "reservado" | "fijo" | "mantenimiento";
export interface Turno {
  id: string;
  espacioId: string;
  fecha: string;         // "AAAA-MM-DD"
  inicio: string;        // "HH:MM"
  fin: string;
  estado: EstadoTurno;
  reservaId: string | null;
  motivoBloqueo: string | null;
  precio: number;
}
```

```
{ "id": "tur-0219-19", "espacioId": "esp-02", "fecha": "2026-09-19",
  "inicio": "19:00", "fin": "20:00", "estado": "libre",
  "reservaId": null, "motivoBloqueo": null, "precio": 12000 }
```

##### **Reserva**

|**Propiedad**|**Tipo**|**Ejemplo**|
|---|---|---|
|`id`|`string`|`"res-1180"`|
|`turnoId`|`string`|`"tur-0219-19"`|
|`espacioId`|`string`|`"esp-02"`|
|`usuarioId`|`string`|`"usr-207"`|
|`cantidadPersonas`|`number`|`10`|
|`codigoQr`|`string`|`"VGY-1180-0219-19"`|
|`estado`|`EstadoReserva`|`"confirmada"`|
|`ingresoEn`|`string | null`|cuándo escaneó el encargado|
|`creadaEn`|`string` (ISO)|`"2026-09-16T21:04:00-03:00"`|
|`cancelableHasta`|`string` (ISO)|`"2026-09-19T15:00:00-03:00"`|

```
export type EstadoReserva =
  | "confirmada" | "cancelada" | "cumplida" | "ausente";
```

```
export interface Reserva {
  id: string;
  turnoId: string;
  espacioId: string;
  usuarioId: string;
  cantidadPersonas: number;
  codigoQr: string;
  estado: EstadoReserva;
  ingresoEn: string | null;
  creadaEn: string;
  cancelableHasta: string;
}
```

9 / 11

<!-- página 10 -->

- `{ "id": "res-1180", "turnoId": "tur-0219-19", "espacioId": "esp-02", "usuarioId": "usr-207", "cantidadPersonas": 10, "codigoQr": "VGY-1180-0219-19", "estado": "confirmada", "ingresoEn": null, "creadaEn": "2026-09-16T21:04:00-03:00", "cancelableHasta": "2026-09-19T15:00:00-03:00" }`

- `"id": "res-1180", "turnoId": "tur-0219-19", "espacioId": "esp-02", "usuarioId": "usr-207", "cantidadPersonas": 10,`

##### **ReservaFija**

|**Propiedad**|**Tipo**|**Ejemplo**|
|---|---|---|
|`id`|`string`|`"fij-07"`|
|`espacioId`|`string`|`"esp-02"`|
|`titular`|`string`|`"Grupo de los martes"`|
|`dia`|`0..6`|`2` (martes)|
|`inicio`|`string`|`"21:00"`|
|`fin`|`string`|`"22:00"`|
|`desde`|`string`|`"2026-03-01"`|
|`hasta`|`string | null`|`null` si no tiene fin|
|`activa`|`boolean`|`true`|

```
export interface ReservaFija {
  id: string;
  espacioId: string;
  titular: string;
  dia: 0 | 1 | 2 | 3 | 4 | 5 | 6;   // 0 = domingo
  inicio: string;
  fin: string;
  desde: string;
  hasta: string | null;
  activa: boolean;
}
```

```
{ "id": "fij-07", "espacioId": "esp-02", "titular": "Grupo de los martes",
  "dia": 2, "inicio": "21:00", "fin": "22:00",
  "desde": "2026-03-01", "hasta": null, "activa": true }
```

10 / 11

<!-- página 11 -->

##### **Usuario**

|**Propiedad**|**Tipo**|**Ejemplo**|
|---|---|---|
|`id`|`string`|`"usr-207"`|
|`nombre`|`string`|`"Emiliano Ruiz"`|
|`email`|`string`|`"emiliano@mail.com"`|
|`telefono`|`string`|`"3455-401122"`|
|`rol`|`Rol`|`"jugador"`|
|`espaciosFavoritos`|`string[]`|`["esp-02"]`|
|`cancelacionesTardias`|`number`|`1`|
|`ausencias`|`number`|`0`|

```
export type Rol = "jugador" | "encargado" | "administrador";
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: Rol;
  espaciosFavoritos: string[];
  cancelacionesTardias: number;
  ausencias: number;
}
```

```
{ "id": "usr-207", "nombre": "Emiliano Ruiz", "email": "emiliano@mail.com",
  "telefono": "3455-401122", "rol": "jugador",
  "espaciosFavoritos": ["esp-02"], "cancelacionesTardias": 1, "ausencias": 0 }
```

**Por qué los turnos y las fijas son cosas distintas.** Una reserva fija no es un turno: es una regla que ocupa el mismo turno todas las semanas. La grilla de un día se arma cruzando los turnos reservados con las fijas vigentes y con los bloqueos de mantenimiento. Resolver ese cruce bien es la parte difícil de este proyecto, y es donde se decide si la app sirve o no.

_"Una cancha vacía un sábado a la noche es plata que no vuelve, y alguien que se quedó sin jugar."_ — Nahuel, Dirección de Deportes de Villaguay

11 / 11

---

<a id="doc-21"></a>

## 21. TRABAJO FINAL INTEGRADOR

> **Fuente:** `TRABAJO FINAL INTEGRADOR.pdf` · **Páginas:** 3 · **Palabras:** 735 · **Imágenes:** 1

<!-- página 1 -->

![Imagen de la página 1](assets/trabajo-final-integrador/p0001-00.png)

**Trabajo Integrador — Entrega Final**

#### **DESARROLLO PARA MÓVILES  - 2026 - 2do cuatrimestre**

#### **TECNICATURA UNIVERSITARIA EN DESARROLLO WEB**

#### **OBJETIVO:**

- Desarrollar y entregar la versión final de la aplicación móvil que pidió el cliente en el **PRD asignado al grupo** , construida con **React Native y Expo** . La aplicación tiene que integrar servicios del dispositivo, consumo de la API de la cátedra, persistencia local y resguardo de credenciales, y entregarse como un **build instalable** , no como código para compilar.

#### **CONSIGNAS DE ENTREGA:**

##### **1. Formato y modalidad**

- a. Grupal, con los mismos integrantes declarados en la.

- b. Se carga en la sección correspondiente del **Campus Virtual UNER** , con estas dos cosas:

  - i. **Link del build.** APK de release generado con el perfil `preview` : `eas build --platform android --profile preview` . Tiene que poder instalarse y usarse **sin Metro y sin la computadora de nadie** .

  - ii. **Código fuente.** Repositorio Git (preferido) o archivo .zip. Incluir `eas.json` y `app.json` . No incluir `node_modules` .

DESARROLLO PARA MÓVILES - ACTIVIDAD N° 3

<!-- página 2 -->

c. Fecha límite: la informada en el Campus Virtual.
d. **Hagan el primer build de preview al menos una semana antes.** El

primer build siempre falla por algo —un permiso, un asset, un
identificador— y el cupo mensual es limitado.

**2. Defensa oral (obligatoria)**
a. Instancia grupal de 15 a 20 minutos, en la fecha que informe la

cátedra.
b. Se demuestra la app funcionando **en un teléfono**, con Expo Go o con

el APK entregado. Lo que se mira es la app andando, no desde dónde
corre.
c. **Cada integrante explica la parte que desarrolló** y responde

preguntas sobre su código.
d. Se pueden usar asistentes de IA durante el desarrollo. **En la defensa**

**no.** Lo que se evalúa es que puedan explicar cada línea de lo que
entregaron.
e. **Sin defensa no hay integrador aprobado**, aunque la entrega esté

completa.

#### **EJERCICIO:**

### **Aplicación final**

**Requisitos mínimos.** Cada uno de estos puntos se verifica sobre la app entregada.
No son ejemplos ni sugerencias.

**1. Pantallas y navegación.** Las pantallas que haga falta para cubrir lo que pide
el PRD, conectadas con **Expo Router** . El alcance lo fija el cliente, no un
número mínimo.

**2. Autenticación.** Registro e ingreso, con sesión que sobrevive al cierre de la
app. El token va en `expo-secure-store` . El reingreso se resuelve con `expo-`
`local-authentication` (huella o rostro), con alternativa para el dispositivo
que no la tenga.

________________________________________________________________________

DESARROLLO PARA MÓVILES - ACTIVIDAD N° 3

<!-- página 3 -->

**3. Consumo de la API.** La aplicación consume la API provista por la cátedra
detrás de una capa de servicios propia. Los estados de **carga, vacío y error**
tienen que verse en pantalla.

**4. Cámara y sistema de archivos.** Uso de `expo-camera` —foto y lectura de
códigos QR cuando el PRD lo pida— o `expo-image-picker`, y guardado y
lectura en el dispositivo con la **API nueva** de `expo-file-system` ( `File`,
`Directory`, `Paths` ).

**5. Ubicación y mapas.** `expo-location` junto con `react-native-maps` . Si el
usuario **niega el permiso**, la app tiene que seguir siendo usable.

**6. Notificaciones locales.** Con `expo-notifications`, disparadas por un
hecho real de la aplicación, no por un botón de prueba.

**7. Persistencia y conectividad.** `expo-sqlite` para los datos y `expo-`
`sqlite/kv-store` para preferencias y sesión. La app tiene que **abrir y**
**mostrar algo sin conexión**, y avisar el estado de la red con `expo-network` .

**8. Sensores o háptica.** Al menos un uso justificado de `expo-sensors`  - `expo-`
`haptics`, que aporte algo a la experiencia.

**9. Multimedia.** Cuando el PRD pida audio o video —audioguías, grabaciones,
clips—, se resuelve con `expo-audio`    - `expo-video`, con controles de
reproducción a la vista.

**10. Identidad de la aplicación.** Ícono y pantalla de presentación propios, y
nombre del producto. El ícono va en PNG cuadrado de 1024×1024, sin
transparencias.

**Sobre las dudas.** El PRD tiene huecos y contradicciones, igual que un pedido real.
Preguntar a tiempo es parte del trabajo y suma; suponer en silencio y entregar otra
cosa, no.

#### **CONDICIONES DE APROBACIÓN:**

- El integrador se **aprueba o no se aprueba** : no lleva nota. Se aprueba
cuando la app resuelve lo que pide el PRD, están los diez requisitos mínimos
y **todos los integrantes** defendieron su parte. Una entrega que no llega se
puede rehacer una vez.

________________________________________________________________________

DESARROLLO PARA MÓVILES - ACTIVIDAD N° 3

---
