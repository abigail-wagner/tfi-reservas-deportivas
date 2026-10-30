---
title: "Unidad 1 — Entorno de desarrollo · Desarrollo para Móviles"
source: "U01 - Entorno de desarrollo.pdf"
pages: 26
words: 2135
images: 1
creator: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36"
producer: "Skia/PDF m151"
pdf_created: "2026-08-13 15:44:15"
converted: "2026-10-27"
---

# Unidad 1 — Entorno de desarrollo · Desarrollo para Móviles

> **Fuente:** `U01 - Entorno de desarrollo.pdf` · **Páginas:** 26 · **Palabras:** 2.135 · **Imágenes:** 1

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
## **Unidad 1** **Entorno de desarrollo**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86 · JDK 17

<!-- página 2 -->

UNIDAD 1
##### **De qué se trata esta clase**

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
##### **El mapa: qué instala qué**

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
### **Las herramientas base**

Node, el editor y el control de versiones.

<!-- página 5 -->

UNIDAD 1 · PARTE 1 · LAS HERRAMIENTAS BASE
##### **Node.js**

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
##### **El editor**

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
### **El SDK de Android**

JDK, Android Studio y las variables que los conectan.

<!-- página 9 -->

UNIDAD 1 · PARTE 2 · EL SDK DE ANDROID
##### **Por qué hace falta el JDK**
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
##### **Instalar el JDK**

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
##### **Android Studio: qué instala en realidad**

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
##### **SDK Manager**

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
##### **Variables de entorno**

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
##### **Definirlas**

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
### **Dónde va a correr la app**

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
##### **Aceleración por hardware**

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
##### **Tu propio celular**

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
##### **Expo Go**

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
##### **iOS y la Mac**

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
### **Control final**

Cómo saber que quedó bien, y qué mirar cuando no.

<!-- página 24 -->

##### UNIDAD 1 · PARTE 4 · CONTROL FINAL **Checklist**

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
##### **Los problemas de siempre**

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
#### **Lo que sigue**

Crear el proyecto y correrlo: **deck principal de la Unidad 1**, Parte 3.

Cuándo Expo Go deja de alcanzar y aparece el development build: misma parte.

Firmar y publicar, con `keytool` y EAS: **Unidad 7** .

Documentación: `docs.expo.dev/get-started/set-up-your-environment`
```
developer.android.com/tools/variables

```
