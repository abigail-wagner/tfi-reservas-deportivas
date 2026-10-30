---
title: "P01 - Instalación Entorno de Desarrollo"
source: "P01 - Instalación Entorno de Desarrollo.pdf"
pages: 64
words: 2846
images: 61
creator: "Google"
converted: "2026-10-27"
---

# P01 - Instalación Entorno de Desarrollo

> **Fuente:** `P01 - Instalación Entorno de Desarrollo.pdf` · **Páginas:** 64 · **Palabras:** 2.846 · **Imágenes:** 61

<!-- página 1 -->

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-00.png)

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-01.png)

## **Desarrollo para dispositivos móviles**

Instalación Entorno de Desarrollo

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-04.png)

![Imagen de la página 1](assets/p01-instalacion-entorno-de-desarrollo/p0001-05.png)

Facultad de Cs. de la Administración - UNER

<!-- página 2 -->

## Pre-Requisitos Instalación del Entorno de Desarrollo

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

## OPEN JDK

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

## Instalación Android Studio

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

##### Instalación Android Studio

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

##### Instalación Android Studio

![Imagen de la página 39](assets/p01-instalacion-entorno-de-desarrollo/p0039-01.png)

<!-- página 40 -->

Instalación Android Studio

![Imagen de la página 40](assets/p01-instalacion-entorno-de-desarrollo/p0040-01.png)

<!-- página 41 -->

## EXPO

<!-- página 42 -->

###### Expo

##### **Expo**

- Expo es una plataforma y framework para construir aplicaciones móviles multiplataforma (Android e iOS)
usando React Native. Simplifica el proceso de desarrollo proporcionando herramientas, librerías y
servicios que agilizan la creación, prueba y despliegue de aplicaciones.

##### **Expo Go**

- Expo Go es una aplicación móvil (disponible para Android e iOS) que funciona como un entorno de
pruebas rápido para experimentar y testear aplicaciones basadas en Expo.

Permite a los desarrolladores previsualizar e iterar sobre sus proyectos sin necesidad de configurar un
entorno completo de desarrollo ni compilar binarios nativos.

##### **Expo Cli**

- Proporciona comandos para inicializar, compilar y publicar aplicaciones, además de interactuar con los
servicios de Expo como los servidores de compilación y las actualizaciones OTA (Over The Air).

<!-- página 43 -->

###### Expo

##### **Instalar Expo GO en Dispositivo Movil**

Aplicación móvil que permite ejecutar proyectos de React Native creados con Expo sin necesidad de
compilar código nativo ni usar Android Studio o Xcode.

- Buscar "Expo Go" en Play Store o App Store.

- Instalar la app.

<!-- página 44 -->

Expo

#### **Crear un nuevo Proyecto**

● rpeta del proyecto:

● Ejecutar:

![Imagen de la página 44](assets/p01-instalacion-entorno-de-desarrollo/p0044-04.png)

![Imagen de la página 44](assets/p01-instalacion-entorno-de-desarrollo/p0044-05.png)

![Imagen de la página 44](assets/p01-instalacion-entorno-de-desarrollo/p0044-06.png)

<!-- página 45 -->

Expo

#### **Crear un nuevo Proyecto**

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-02.png)

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-03.png)

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-04.png)

![Imagen de la página 45](assets/p01-instalacion-entorno-de-desarrollo/p0045-05.png)

<!-- página 46 -->

Expo

#### **Crear un nuevo Proyecto**

![Imagen de la página 46](assets/p01-instalacion-entorno-de-desarrollo/p0046-02.png)

<!-- página 47 -->

Expo

#### **Crear un nuevo Proyecto**

![Imagen de la página 47](assets/p01-instalacion-entorno-de-desarrollo/p0047-02.png)

<!-- página 48 -->

Expo

#### **Crear un nuevo Proyecto**

![Imagen de la página 48](assets/p01-instalacion-entorno-de-desarrollo/p0048-02.png)

<!-- página 49 -->

Expo

#### **Ejecutar la App**

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

#### **EAS (Expo Aplication Services)  Buld (Development Build)**

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

##### **Elegir el tipo de build**

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

#### **Ejecutar la build**

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
