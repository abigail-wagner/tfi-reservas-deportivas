---
title: "Unidad 7 — Construir la aplicación · Desarrollo para Móviles"
source: "Unidad 7 — Construir la aplicación · Desarrollo para Móviles.pdf"
pages: 27
words: 2102
images: 0
creator: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36 Edg/155.0.0.0"
producer: "Skia/PDF m155"
pdf_created: "2026-10-24 12:18:38"
converted: "2026-10-27"
---

# Unidad 7 — Construir la aplicación · Desarrollo para Móviles

> **Fuente:** `Unidad 7 — Construir la aplicación · Desarrollo para Móviles.pdf` · **Páginas:** 27 · **Palabras:** 2.102 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S ITA R I A E N D E S A R R O L LO W E B · F C A D · U N E R
## **Unidad 7** **Construir la aplicación**

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
#### **Del proyecto al binario**

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
#### **EAS Build**

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

## 1. La herramienta de línea de comandos de EAS
npm install --global eas-cli

## 2. Iniciar sesión con la cuenta de Expo (la misma de Expo Go)
eas login

## 3. Preparar el proyecto: crea eas.json
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

### **15 + 15**

### **45 min**

tiempo máximo

### **1**

build a la vez
(concurrencia)

### **baja**

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
#### **iOS sin tener una Mac**

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
#### **Firma manual**

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
##### **Lo que sigue**

Íconos, splash y todo lo que la tienda mira antes que el código

Las dos cuentas de desarrollador, y qué exige cada una

**EAS Submit** : del binario a la ficha publicada

**EAS Update** : corregir un bug sin pasar por la tienda

Cómo se entrega el TP integrador

Documentación: docs.expo.dev/build
