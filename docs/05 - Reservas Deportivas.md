---
title: "Reservas Deportivas - Villaguay"
source: "05 - Reservas Deportivas.pdf"
pages: 11
words: 2584
images: 0
producer: "WeasyPrint 69.0"
converted: "2026-10-27"
---

# Reservas Deportivas - Villaguay

> **Fuente:** `05 - Reservas Deportivas.pdf` · **Páginas:** 11 · **Palabras:** 2.584 · **Imágenes:** 0

<!-- página 1 -->

## **Reservas Deportivas**

**Dirección de Deportes de Villaguay — Pedido de aplicación móvil**

_Documento redactado por Nahuel Ojeda, director de Deportes de la Municipalidad de Villaguay, Entre_
_Ríos, para el equipo de desarrollo._

### **Cómo llegamos hasta acá**

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

### **Qué necesito que la app haga**

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

### **Cómo me imagino que se usa**

##### **La grilla de un espacio**

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

##### **Mi reserva**

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

### **Cosas importantes para cómo lo vamos a usar**

- **El QR se muestra en la puerta de la cancha** , donde la señal es mala. La reserva y su código tienen que estar guardados en el teléfono y verse sin conexión.

- **Reservar tiene que ser más rápido que mandarme un WhatsApp.** Si no, me siguen escribiendo.

- **No pidan cuenta para mirar la disponibilidad.** La cuenta hace falta recién para reservar.

- **Si niega la ubicación** , que igual pueda ver todo; la ubicación es sólo para el mapa y para saber qué complejo tiene más cerca.

- **Se usa de noche y a la intemperie.** Que se lea con poca luz y con el modo oscuro.

- **No cobramos por la app.** El turno se paga en el lugar. La app muestra el precio, nada más.

- **Android y iPhone** , con mayoría de Android.

### **Lo que no entra en esta primera versión**

- Pagos y señas online.

3 / 11

<!-- página 4 -->

- Torneos, fixtures y tablas de posiciones.

- Armado de equipos y búsqueda de jugadores para completar.

- Canchas privadas de la ciudad. Por ahora solo las municipales.

- Alquiler de pecheras, pelotas y demás.

### **Cómo quiero que trabajemos**

- **No sé de programación.** Si algo de lo que pedí no se puede o es carísimo, díganmelo.

- **Prefiero que pregunten ahora.** Sobre todo con el tema de las reservas fijas, que es donde más me la puedo pasar por alto explicando.

- **Este documento tiene huecos.** Cuando los encuentren, avisen en vez de decidir por su cuenta.

- **Voy a pedir cambios.** Cuando lo haga, díganme qué se cae o qué se atrasa.

- **Muéstrenme algo temprano** , aunque sea feo y con datos inventados.

### **Algunas cuestiones técnicas que me pidieron incluir**

El equipo docente me pidió que deje escritas algunas definiciones técnicas, para que no haya malentendidos.

#### **Con qué se construye**

|**Qué**|**Con qué**|
|---|---|
|Framework|React Native con Expo|
|Lenguaje|TypeScript|
|Navegación|Expo Router|
|Estilos|`StyleSheet`.Unistyles o NativeWind son opcionales|
|Entrega|Build de producción con EAS|

4 / 11

<!-- página 5 -->

#### **Capacidades del dispositivo que tiene que usar**

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

#### **Cómo va a venir la información**

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

### **Resumen — qué entidades maneja la app**

#### **Espacio**

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

#### **Deporte**

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

#### **Turno**

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

#### **Reserva**

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

#### **ReservaFija**

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

#### **Usuario**

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
