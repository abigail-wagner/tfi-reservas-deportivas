---
title: "Git — Control de versiones · Desarrollo para Móviles"
source: "U01 - Git - Control de versiones.pdf"
pages: 30
words: 2815
images: 13
creator: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36"
producer: "Skia/PDF m151"
pdf_created: "2026-08-13 15:43:54"
converted: "2026-10-27"
---

# Git — Control de versiones · Desarrollo para Móviles

> **Fuente:** `U01 - Git - Control de versiones.pdf` · **Páginas:** 30 · **Palabras:** 2.815 · **Imágenes:** 13

<!-- página 1 -->

T E C N I C AT U R A U N I V E R S I TA R I A E N D E S A R R O L L O W E B · F C A D · U N E R
## **Git** **Control de versiones**

Unidad 1 · Desarrollo para Móviles · 2026 — Segundo cuatrimestre

Prof. Titular: Lic. Franco Ruis Dias · JTP: Lic. Germán Cueva

<!-- página 2 -->

UNIDAD 1 · GIT · PARTE 1
### **Qué es y de dónde viene**

Por qué existe el control de versiones y cómo llegamos a Git.

<!-- página 3 -->

UNIDAD 1 · GIT · PARTE 1 · QUÉ ES Y DE DÓNDE VIENE
##### **Por qué control de versiones**

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
##### **De dónde viene Git**

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
### **El trabajo de todos los días**

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
##### **Leer el historial**

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
##### **Mensajes de commit**

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
### **Ramas, merges y conflictos**

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
##### **Conflictos**

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
### **Deshacer**

Qué hacer cuando algo salió mal, y qué no hacer nunca.

<!-- página 15 -->

UNIDAD 1 · GIT · PARTE 4 · DESHACER
##### **Deshacer antes del commit**

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
##### **Deshacer después del commit**

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

##### **Las tres formas, dibujadas**

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
##### **Cuando algo sale mal**

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
### **El repositorio remoto**

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
##### **Git no es GitHub**

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
### **Conectar con GitHub**

Autenticación, el flujo del equipo y qué no subir nunca al repositorio.

<!-- página 25 -->

UNIDAD 1 · GIT · PARTE 6 · CONECTAR CON GITHUB
##### **Autenticarse**

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
##### **El flujo del trabajo integrador**

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
##### **.gitignore en un proyecto Expo**

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
##### **Machete**

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
#### **Para la práctica**

Crear el repositorio del grupo y agregar a todos los integrantes.

Subir el proyecto de Expo con un `.gitignore` correcto.

Que cada integrante haga al menos un commit desde su rama.

Documentación: `git-scm.com/doc` - `docs.github.com`
