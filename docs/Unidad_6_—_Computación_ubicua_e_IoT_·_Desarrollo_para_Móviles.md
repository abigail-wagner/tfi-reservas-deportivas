---
title: "Unidad 6 — Computación ubicua e IoT · Desarrollo para Móviles"
source: "Unidad 6 — Computación ubicua e IoT · Desarrollo para Móviles.pdf"
pages: 19
words: 1511
images: 0
creator: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36 Edg/155.0.0.0"
producer: "Skia/PDF m155"
pdf_created: "2026-10-12 17:56:39"
converted: "2026-10-27"
---

# Unidad 6 — Computación ubicua e IoT · Desarrollo para Móviles

> **Fuente:** `Unidad 6 — Computación ubicua e IoT · Desarrollo para Móviles.pdf` · **Páginas:** 19 · **Palabras:** 1.511 · **Imágenes:** 0

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S ITA R I A E N D E S A R R O L LO W E B · F C A D · U N E R
## **Unidad 6** **Computación ubicua e IoT**

Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

Expo SDK 57 · React Native 0.86

<!-- página 2 -->

UNIDAD 6
##### **Qué vamos a ver**

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
### **Computación ubicua**

Cuando la computadora deja de parecer una computadora.

<!-- página 4 -->

UNIDAD 6 · PARTE 1 · COMPUTACIÓN UBICUA
##### **La idea**
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
##### **Las escalas**

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
##### **Ambientes inteligentes**

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
### **Internet de las cosas**

La forma concreta que tomó la idea.

<!-- página 8 -->

UNIDAD 6 · PARTE 2 · INTERNET DE LAS COSAS
##### **Qué es**
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
##### **La arquitectura por capas**

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
##### **El problema de las direcciones**

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
##### **Los cuatro retos**

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
### **La app dentro del sistema**

Los dos caminos por los que el celular habla con un dispositivo.

<!-- página 13 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
##### **Directo o por la nube**

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
##### **BLE desde Expo**

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
##### **Lo que complica al BLE**

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
##### **Por la nube: una plataforma IoT**

**ThingsBoard** es una plataforma de código abierto que ocupa la capa de middleware: recibe telemetría por MQTT, HTTP

- CoAP, la almacena, permite definir reglas y la expone por API REST.

**Qué te ahorra** **Qué le pedís desde la app**

Ingesta y almacenamiento de telemetría. Nada nuevo: es **una API REST** . Lo mismo que hicimos en la Unidad 5 con
Fetch y TanStack Query.

Motor de reglas: «si supera 30 °C, avisá».

Gestión de miles de dispositivos.

<!-- página 17 -->

UNIDAD 6 · PARTE 3 · LA APP DENTRO DEL SISTEMA
##### **Consumirla es lo de siempre**

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
##### **Qué aporta el celular**

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
#### **Para llevarse**

La computación ubicua es cómputo que **deja de verse** ; IoT es su forma concreta.

Una app móvil ocupa la **capa de aplicación** : es la cara visible de un sistema mucho más grande.

Dos caminos: **BLE** para lo que está cerca, **API** para todo lo demás.

Los dos necesitan lo de la otra mitad de esta unidad: **seguridad** .

thingsboard.io - github.com/dotintent/react-native-ble-plx
