# Manual de JavaScript: entiende tu primer proyecto interactivo

**Para quién es este manual:** para ti, que ya sabes crear páginas con HTML y darles estilo con CSS, pero nunca has escrito JavaScript.

**Qué vas a conseguir:** leer `aprendo.js` de arriba abajo, explicar qué hace cada línea, modificarlo sin miedo y saber qué hacer cuando algo falla.

**La regla de oro:** no memorices. Programar es leer, predecir, probar y corregir. Ten el proyecto abierto mientras lees: este manual está pensado para hacerse, no solo para leerse.

---

## Cómo usar este manual

1. Abre la carpeta del proyecto en tu editor de código.
2. Abre `index.html` en el navegador.
3. Lee una sección y vuelve al código para comprobar lo que dice.
4. Haz los experimentos de la sección 14: ahí es donde de verdad se aprende.
5. Cuando algo no funcione, no lo borres todo: lee el error de la consola. Los errores son pistas, no castigos.

Si en algún momento ves una palabra que no entiendes, busca su definición en el glosario del final. No hace falta que lo sepas todo de memoria para seguir leyendo.

---

## Índice

1. HTML, CSS y JavaScript: tres trabajos distintos
2. Qué es JavaScript y cómo se conecta con tu HTML
3. El DOM: el mapa vivo de tu página
4. Variables: cajas con nombre
5. Tipos de datos: qué puede guardar una caja
6. Objetos y propiedades: el punto mágico
7. Funciones: recetas que se ejecutan cuando tú quieres
8. Eventos: reaccionar a lo que hace el usuario
9. Condicionales: tomar decisiones con `if` / `else`
10. El código completo, línea por línea
11. La película completa: qué pasa en cada momento
12. Cómo se conectan los tres archivos
13. Cómo ejecutar y depurar tu página
14. Experimentos guiados
15. Mejora del proyecto: una sola fuente de verdad
16. Comprueba que lo entendiste (preguntas y retos)
17. Errores comunes y cómo leerlos
18. Chuleta de sintaxis
19. Glosario
20. Qué aprender después
21. La idea más importante (resumen final)

---

## Mapa del proyecto

```text
test-javascritp/
├── index.html      -> la estructura y el contenido de la página
├── style.css       -> la apariencia: bordes, colores, espacios
├── aprendo.js      -> el comportamiento: lo que hace la página
└── imagenes/
    ├── gato_001.jpg
    └── perro_001.jpg
```

Cada archivo tiene un trabajo distinto:

| Archivo | Su trabajo | Ejemplo |
|---|---|---|
| `index.html` | Dice **qué hay** en la página | Un título, un párrafo, un botón y una imagen |
| `style.css` | Dice **cómo se ve** | Bordes, tamaño, colores |
| `aprendo.js` | Dice **qué hace** | Al hacer clic, mostrar u ocultar una imagen |

---

## 1. HTML, CSS y JavaScript: tres trabajos distintos

Imagina que estás creando un videojuego:

- **HTML** es el escenario y los objetos que existen: la pantalla, los botones, los personajes.
- **CSS** son los gráficos, la ropa y la iluminación: cómo se ve todo.
- **JavaScript** es el cerebro y las reglas: qué ocurre cuando pulsas un botón, cuando te acercas a algo o cuando ganas una partida.

En una página web pasa lo mismo:

| Lenguaje | La pregunta que responde |
|---|---|
| HTML | ¿Qué elementos existen? |
| CSS | ¿Cómo se ven esos elementos? |
| JavaScript | ¿Qué hacen y cómo cambian? |

Tú ya sabes que un botón se escribe así:

```html
<button>Mostrar Imagen</button>
```

HTML crea el botón y CSS podría darle color. Pero HTML y CSS, por sí solos, no pueden decidir que al pulsarlo aparezca una foto. Eso es trabajo de JavaScript.

### La idea más importante de todo el manual

JavaScript **no cambia los archivos** `index.html`, `style.css` ni las fotos. Lo que hace es cambiar la **copia viva de la página** que el navegador tiene en memoria. Esa copia viva se llama **DOM**.

Es como si el navegador construyera una maqueta de tu HTML al abrir la página. JavaScript puede mover las piezas de la maqueta, pero el plano original (tu archivo) sigue igual. Si recargas la página, la maqueta se construye de nuevo desde el principio.

> **Ojo:** cuando en este manual decimos "cambiar la página", nos referimos a la página que está abierta en ese momento, no al archivo guardado en tu computadora.

---

## 2. Qué es JavaScript y cómo se conecta con tu HTML

JavaScript es un lenguaje de programación. Sirve para dar instrucciones al navegador: guardar datos, tomar decisiones, reaccionar a clics, hacer cuentas, cambiar elementos y mucho más. No tiene nada que ver con Java, aunque el nombre se parezca.

Lo mejor de todo es que **no necesitas instalar nada**. Tu navegador ya incluye un motor que entiende JavaScript. Chrome, Firefox, Edge, Safari y Opera pueden ejecutarlo.

En este proyecto, el JavaScript está en un archivo separado llamado `aprendo.js`. Para que el navegador lo cargue, el HTML lo llama desde la etiqueta `<head>`:

```html
<link rel="stylesheet" href="style.css">
<script src="aprendo.js" defer></script>
```

Fíjate en las diferencias:

- El CSS se enlaza con `<link rel="stylesheet" href="...">`.
- El JavaScript se enlaza con `<script src="..."></script>`.
- `defer` le dice al navegador: "descarga el archivo, pero no lo ejecutes hasta que hayas terminado de leer todo el HTML".
- La palabra `defer` es la razón por la que el script puede estar en el `<head>` y aun así encontrar el botón y la imagen del `<body>`.

Más adelante veremos qué pasaría si quitamos `defer`.

---

## 3. El DOM: el mapa vivo de tu página

Cuando el navegador termina de leer `index.html`, convierte las etiquetas en un árbol de objetos. Ese árbol es el **DOM** (Document Object Model, o "modelo de objetos del documento").

El DOM de este proyecto se parece a esto:

```text
document
└── html
    ├── head
    │   ├── title
    │   ├── link (style.css)
    │   └── script (aprendo.js)
    └── body
        └── div.articulo
            ├── h1
            ├── p
            ├── button
            ├── hr
            └── img
```

`document` es el objeto que representa toda la página. Es el punto de entrada para buscar cualquier elemento.

### Seleccionar elementos con CSS

Para trabajar con un elemento, primero hay que encontrarlo. JavaScript tiene una herramienta perfecta para eso:

```js
document.querySelector("img");
```

`querySelector` significa "consulta el selector". Recibe un **selector de CSS**, el mismo tipo de selector que ya usas en `style.css`, y devuelve el **primer** elemento que coincida.

Si algún día necesitas **todos** los elementos que coinciden (por ejemplo, todas las imágenes de una galería), existe `document.querySelectorAll("img")`, que devuelve una lista. En este proyecto solo hay una imagen y un botón, así que `querySelector` es suficiente.

Ejemplos de selectores que ya conoces:

| Selector | Busca |
|---|---|
| `"img"` | La primera etiqueta `<img>` |
| `"button"` | El primer `<button>` |
| `".articulo"` | El primer elemento con `class="articulo"` |
| `"#mi-id"` | El elemento con `id="mi-id"` |
| `"div p"` | Un párrafo dentro de un div |

`querySelector("img")` no devuelve una copia del HTML. Devuelve un **objeto elemento**: un control remoto que representa esa etiqueta real en la página. Si cambias una propiedad de ese objeto, la página cambia.

> **Analogía:** el DOM es una escuela enorme. `querySelector` es preguntar en la oficina: "¿me das el primer estudiante que cumpla esta condición?". Lo que te devuelven no es un clon del estudiante: es una forma de comunicarte con el estudiante de verdad.

### ¿Qué pasa si no encuentra nada?

Si no hay ningún elemento que coincida, `querySelector` devuelve `null`. `null` significa "nada" o "no hay objeto". Esto será importante cuando veamos errores: si intentas usar un `null` como si fuera un elemento, JavaScript se queja.

### Pruébalo tú

Abre la página, pulsa `F12` (o `Ctrl + Shift + I`) y entra en la pestaña **Console**. Escribe esto y pulsa Enter:

```js
document.querySelector("button").textContent
```

Deberías ver el texto `"Mostrar Imagen"`. Ahora prueba:

```js
document.querySelector("h1").textContent
```

Verás `"!Hola Mundo"`. Acabas de usar JavaScript para leer la página en vivo. Si escribes:

```js
document.querySelector("h1").textContent = "Estoy probando"
```

el título cambia delante de tus ojos. Pero no te preocupes: el archivo `index.html` no ha cambiado. Si recargas, todo vuelve a como estaba.

---

## 4. Variables: cajas con nombre

Una **variable** es una caja en la memoria donde guardas un valor para usarlo después. La caja tiene un nombre, y dentro puedes meter un número, un texto, un elemento de la página, etc.

Así se crea una variable:

```js
let imagen = document.querySelector("img");
```

Vamos a descomponer esa línea:

| Parte | Qué hace |
|---|---|
| `let` | Crea una caja nueva |
| `imagen` | Es el nombre de la caja |
| `=` | Guarda lo que hay a la derecha dentro de la caja |
| `document.querySelector("img")` | Busca la imagen y devuelve su objeto |

Primero se calcula lo de la derecha, y luego se guarda en la caja de la izquierda.

Ahora, cada vez que escribas `imagen`, estarás hablando de ese elemento `<img>` de la página. No tienes que volver a buscarlo.

```js
let boton = document.querySelector("button");
```

Con esta línea guardas el botón en otra caja.

### `let` y `const`

Hay dos formas modernas de crear variables:

```js
let edad = 15;        // se puede cambiar después
const nombre = "Ana"; // NO se puede reasignar
```

- `let` se usa cuando el valor de la caja va a cambiar.
- `const` se usa cuando la caja siempre va a contener lo mismo.

En el proyecto se usa `let` para `imagen` y `boton`. En realidad, esas cajas nunca se reasignan: siempre guardan el mismo elemento. Por eso también sería correcto escribirlo así:

```js
const imagen = document.querySelector("img");
const boton = document.querySelector("button");
```

> **Detalle importante:** `const` no significa que el elemento no pueda cambiar. Significa que la **caja** no puede apuntar a otro elemento. Sí puedes cambiar las propiedades del objeto que hay dentro:
>
> ```js
> const imagen = document.querySelector("img");
> imagen.src = "imagenes/gato_001.jpg"; // Esto sí está permitido
> ```
>
> `const` protege la etiqueta de la caja, no el contenido de la caja.

### Reglas para nombrar variables

- Pueden tener letras, números, `_` y `$`.
- No pueden empezar por un número.
- No pueden tener espacios.
- Distinguen mayúsculas de minúsculas: `imagen` no es lo mismo que `Imagen`.
- Se recomienda usar `camelCase`: `botonPerro`, `imagenActual`, `contadorDeClics`.
- Es mejor usar nombres que expliquen qué contienen. `x` funciona, pero `boton` se entiende mucho mejor.

---

## 5. Tipos de datos: qué puede guardar una caja

JavaScript puede guardar distintos tipos de valores. Estos son los que aparecen en este proyecto:

| Tipo | Qué es | Ejemplos |
|---|---|---|
| **String** (cadena de texto) | Un texto entre comillas | `"Mostrar Imagen"`, `"imagenes/gato_001.jpg"`, `"Gato"` |
| **Number** (número) | Un valor numérico | `300`, `15`, `3.14` |
| **Boolean** (booleano) | Solo puede ser verdadero o falso | `true`, `false` |
| **null** | "No hay ningún valor" | El resultado de un `querySelector` que no encuentra nada |
| **undefined** | "Todavía no tiene valor" | Una variable creada pero sin asignar |
| **Object** (objeto) | Una cosa con propiedades y acciones | Un elemento del DOM, el objeto de un evento |

### Los textos van entre comillas

```js
let saludo = "Hola";
let ruta = "imagenes/gato_001.jpg";
```

Las comillas no forman parte del texto: solo marcan dónde empieza y dónde termina. Puedes usar comillas dobles `"..."`, simples `'...'` o acentos graves `` `...` ``.

Esto es importante en el proyecto:

```js
boton.textContent === "Mostrar Imagen"
```

La comparación es **exacta**. Debe coincidir cada letra, cada espacio y cada mayúscula:

- `"Mostrar Imagen"` es distinto de `"Mostrar imagen"`.
- `"Mostrar Imagen"` es distinto de `"Mostrar  Imagen"` (dos espacios).
- `"Mostrar Imagen"` es distinto de `"Mostrar Imagen "` (un espacio al final).

### Números y booleanos

```js
let ancho = 300;
let estaVisible = false;
let esMayorDeEdad = true;
```

Los booleanos se usan para decisiones: "si esto es verdadero, haz aquello".

### Comparar valores

Para comparar se usa `===`:

```js
15 === 15        // true
"Gato" === "Gato" // true
"15" === 15      // false, porque uno es texto y el otro es número
```

| Operador | Significado |
|---|---|
| `===` | Es igual en valor y en tipo |
| `!==` | Es distinto en valor o en tipo |
| `>` | Mayor que |
| `<` | Menor que |
| `>=` | Mayor o igual que |
| `<=` | Menor o igual que |

> **Mucho cuidado:** `=` no es "igual a". `=` guarda un valor. Para comparar se usa `===`. Ya hablaremos de esto otra vez, porque es uno de los errores más comunes al empezar.

---

## 6. Objetos y propiedades: el punto mágico

Un **objeto** es una cosa que tiene características y acciones. Imagina la ficha de un personaje de videojuego:

```text
nombre: "Kai"
vida: 100
fuerza: 25
```

En JavaScript, esas características se llaman **propiedades** y se leen con un punto:

```js
jugador.nombre
jugador.vida
```

Un elemento HTML también es un objeto. Sus propiedades son cosas como su texto, su dirección de imagen o su descripción.

```js
boton.textContent // el texto que hay dentro del botón
imagen.src        // la dirección de la imagen
imagen.alt        // el texto alternativo de la imagen
```

### Leer una propiedad y escribir una propiedad

```js
console.log(boton.textContent); // LEER: muestra el texto actual
boton.textContent = "Nuevo texto"; // ESCRIBIR: cambia el texto
```

Cuando escribes en una propiedad, la página se actualiza al instante. Esto es el corazón de la interactividad.

### Comparación con los atributos HTML

Estas propiedades están conectadas con los atributos que ya conoces:

| HTML | JavaScript |
|---|---|
| `<button>Mostrar Imagen</button>` | `boton.textContent` |
| `<img src="imagenes/gato_001.jpg">` | `imagen.src` |
| `<img alt="Gato">` | `imagen.alt` |
| `<img width="300">` | `imagen.width` |

`textContent` es especial: no es un atributo, es el texto que está entre la etiqueta de apertura y la de cierre.

### Propiedades y métodos

Una **propiedad** es un valor que el objeto tiene. Un **método** es una acción que el objeto puede realizar. Los métodos se reconocen porque llevan paréntesis al final.

| En el proyecto | Tipo | Qué hace |
|---|---|---|
| `boton.textContent` | Propiedad | Lee o cambia el texto del botón |
| `imagen.src` | Propiedad | Lee o cambia la imagen que se muestra |
| `imagen.alt` | Propiedad | Lee o cambia el texto alternativo |
| `boton.addEventListener(...)` | Método | Registra una reacción a un evento |
| `document.querySelector(...)` | Método | Busca un elemento en la página |

---

## 7. Funciones: recetas que se ejecutan cuando tú quieres

Una **función** es un grupo de instrucciones con un nombre, o sin él, que puedes ejecutar cuando quieras. Es como una receta de cocina: la receta no cocina sola; hay que decirle cuándo empezar.

```js
function saludar(nombre) {
  console.log("Hola, " + nombre);
}
```

Eso **define** la función, pero no la ejecuta. Para ejecutarla hay que llamarla:

```js
saludar("Ana"); // Ahora sí se ejecuta y muestra "Hola, Ana"
```

- `nombre` es un **parámetro**: un hueco que la función rellena cuando la llamas.
- `"Ana"` es el **argumento**: el valor concreto que le pasas.
- Las llaves `{}` contienen las instrucciones de la función.

### Funciones anónimas

Una función no necesita nombre. Puedes crearla directamente donde la necesitas:

```js
function (evento) {
  // instrucciones
}
```

Esto se llama **función anónima**. En el proyecto aparece dentro de `addEventListener`.

### Funciones flecha

Hay otra forma más corta de escribir funciones, llamada **función flecha**:

```js
() => {
  // instrucciones
}
```

Se lee así:

- `()` son los parámetros. Si está vacío, la función no recibe ninguno.
- `=>` significa "entonces haz esto".
- `{}` contiene las instrucciones.

Si la función recibe un solo parámetro, puedes quitar los paréntesis:

```js
evento => {
  // instrucciones
}
```

Si no recibe parámetros, los paréntesis son obligatorios:

```js
() => {
  // instrucciones
}
```

En este proyecto se usan las dos formas:

```js
// Forma tradicional, con la palabra function
boton.addEventListener("click", function (evento) {
  // ...
});

// Forma flecha, sin la palabra function
imagen.addEventListener("mouseleave", () => {
  // ...
});
```

Para lo que hacemos aquí, las dos formas funcionan igual. Lo importante es que sepas reconocerlas. El autor mezcló ambos estilos; es válido, pero en un proyecto real conviene ser constante.

### El parámetro `evento`

Cuando el navegador llama a tu función por un evento, le pasa un objeto con información sobre lo que ocurrió. Ese objeto suele llamarse `evento` o `event`:

```js
boton.addEventListener("click", function (evento) {
  console.log(evento.type);   // "click"
  console.log(evento.target); // el elemento que recibió el clic
});
```

En el código del proyecto, `evento` aparece como parámetro pero no se usa dentro de la función. Eso es totalmente válido: el navegador lo pasa igualmente. Si no lo necesitas, puedes escribir `function ()` o `() =>` y no nombrarlo.

### ¿Cuándo se ejecuta una función?

Esta es una de las ideas más importantes:

- Cuando **defines** una función, no se ejecuta.
- Cuando la **llamas** con paréntesis, se ejecuta.
- Cuando la pasas a `addEventListener`, se ejecuta **después**, cada vez que ocurra el evento.

A eso se le llama **callback**: una función que le entregas a otra para que la llame más tarde.

> **Analogía:** es como dejarle una nota a un amigo: "cuando llegue el paquete, llámame". No estás llamando en ese momento; estás dejando instrucciones para el futuro. `addEventListener` es el amigo que guarda la nota y la ejecuta cuando el evento ocurre.

---

## 8. Eventos: reaccionar a lo que hace el usuario

Un **evento** es algo que ocurre en la página: un clic, el movimiento del ratón, una tecla, el envío de un formulario, etc.

JavaScript puede **escuchar** esos eventos y reaccionar con una función. La herramienta es:

```js
elemento.addEventListener("tipoDeEvento", función);
```

Se lee: "elemento, añade un escucha para el evento `tipoDeEvento`; cuando ocurra, ejecuta esta función".

En el proyecto hay tres eventos:

| Evento | Cuándo ocurre | Qué hace el código |
|---|---|---|
| `click` | Se hace clic en el botón | Muestra u oculta la imagen |
| `mouseenter` | El puntero entra en la imagen | Cambia a la foto del perro |
| `mouseleave` | El puntero sale de la imagen | Vuelve a la foto del gato |

Otros eventos que existen:

| Evento | Cuándo ocurre |
|---|---|
| `input` | El usuario escribe en un campo |
| `keydown` | Se pulsa una tecla |
| `submit` | Se envía un formulario |
| `dblclick` | Doble clic |
| `mousemove` | El ratón se mueve |
| `load` | Algo termina de cargar |

### El navegador es quien llama a tu función

Tú no escribes `boton.click()` en el código. Solo registras la reacción. El navegador se encarga de llamar a tu función cuando el usuario hace clic.

Esto cambia la forma de leer el programa: no es una película que se ejecuta de arriba abajo una sola vez. Es un conjunto de instrucciones que **esperan** a que ocurran cosas.

### El evento `click` también funciona con el teclado

Esto es importante: cuando un `<button>` tiene el foco y el usuario pulsa `Enter` o la barra espaciadora, el navegador también dispara un evento `click`. Por eso usar un botón de verdad es mejor que usar un `div` con un clic: el botón ya funciona con el teclado y es accesible.

### El objeto del evento

Cada vez que ocurre un evento, el navegador crea un objeto con información útil:

```js
boton.addEventListener("click", (evento) => {
  console.log(evento.type);   // "click"
  console.log(evento.target); // el botón que se pulsó
});
```

En el código del proyecto no se usa, pero está disponible. Es como un informe de lo que pasó.

### Un detalle sobre `mouseenter` y `mouseleave`

Existen también `mouseover` y `mouseout`, que se parecen, pero se disparan de forma un poco diferente cuando hay elementos dentro de otros. Para este proyecto, `mouseenter` y `mouseleave` son los adecuados porque queremos reaccionar solo a entrar o salir del área de la imagen.

---

## 9. Condicionales: tomar decisiones con `if` / `else`

Un **condicional** permite que el programa elija entre dos caminos:

```js
if (condición) {
  // Esto se ejecuta si la condición es true
} else {
  // Esto se ejecuta si la condición es false
}
```

`if` significa "si". `else` significa "si no".

La condición es una expresión que da como resultado `true` (verdadero) o `false` (falso). Por ejemplo:

```js
if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}
```

En el proyecto, la condición es:

```js
if (boton.textContent === "Mostrar Imagen") {
```

Traducido al español: "si el texto del botón es exactamente `Mostrar Imagen`, haz lo siguiente".

### Solo se ejecuta un camino

Cuando el navegador llega a un `if`:

1. Evalúa la condición.
2. Si es `true`, ejecuta el bloque del `if` y **se salta** el `else`.
3. Si es `false`, **se salta** el bloque del `if` y ejecuta el `else`.

### El error clásico: `=` contra `===`

```js
if (boton.textContent = "Mostrar Imagen") {
  // ¡Mal!
}
```

Eso no compara: **asigna** el texto y además la condición se considera verdadera, así que el `if` siempre se ejecuta. La forma correcta es:

```js
if (boton.textContent === "Mostrar Imagen") {
  // Bien
}
```

| Operador | Qué hace |
|---|---|
| `=` | Guarda un valor en una variable o propiedad |
| `===` | Compara valor y tipo |
| `==` | Compara con conversiones automáticas; evítalo al empezar |

### Usar el texto del botón como memoria

Fíjate en algo curioso: el código no guarda en una variable si la imagen está visible o no. Usa el **texto del botón** como memoria:

- Si el botón dice `"Mostrar Imagen"`, el código asume que la imagen está oculta.
- Si dice otra cosa, asume que está visible.

Funciona, pero es frágil. Si alguien cambia el texto del botón por otro, o lo traduce a otro idioma, la lógica se rompe. Más adelante veremos una versión mejor con una variable de estado.

> **Idea clave:** el **estado** es la información que el programa necesita recordar entre una acción y otra. Aquí el estado está escondido en el texto del botón.

---

## 10. El código completo, línea por línea

Este es el contenido de `aprendo.js`:

```js
let imagen = document.querySelector("img");

let boton = document.querySelector("button");


boton.addEventListener("click", function (evento) {
    
        if (boton.textContent === "Mostrar Imagen") {
            boton.textContent = "Ocultar Imagen";
            imagen.src = "imagenes/gato_001.jpg";
            imagen.alt = "Gato";
        } else {
            boton.textContent = "Mostrar Imagen";
            imagen.src = "";
            imagen.alt = "";
        }
    }
);

imagen.addEventListener("mouseenter", function (evento) {

    imagen.src = "imagenes/perro_001.jpg";
    imagen.alt = "Perro";

});

imagen.addEventListener("mouseleave", () => {
    imagen.src = "imagenes/gato_001.jpg";
    imagen.alt = "Gato";

});
```

Ahora vamos a recorrerlo con calma. Puedes abrir el archivo en tu editor y seguir las líneas.

### Línea 1: conseguir la imagen

```js
let imagen = document.querySelector("img");
```

- `let` crea una variable.
- `imagen` es el nombre que le damos.
- `document.querySelector("img")` busca el primer `<img>` de la página.
- El resultado se guarda en la variable.

En esta línea **no se muestra ninguna imagen**. Solo se guarda el control remoto del elemento `<img>` para poder usarlo después.

### Línea 3: conseguir el botón

```js
let boton = document.querySelector("button");
```

Igual que antes, pero ahora buscamos el primer `<button>`.

> **Cuidado con el orden:** `querySelector` devuelve el **primer** elemento que encuentra. Si algún día agregas otro botón antes que este en el HTML, la variable `boton` apuntará al nuevo, no al que esperabas. Lo mismo pasa con la imagen.

### Líneas 6 a 18: programar el botón

```js
boton.addEventListener("click", function (evento) {
```

Esta línea no ejecuta la función. Lo que hace es **registrar** una reacción:

- `boton` es el elemento que va a escuchar.
- `.addEventListener` es el método que registra la escucha.
- `"click"` es el tipo de evento.
- `function (evento) { ... }` es la función que se ejecutará cuando ocurra el clic.

La función se guarda para el futuro. Se ejecutará **cada vez** que alguien haga clic en el botón.

> **Predice:** al cargar la página, ¿se ejecuta la función del clic? No. Solo se registra. La función espera a que el usuario haga clic.

#### Línea 8: la decisión

```js
if (boton.textContent === "Mostrar Imagen") {
```

Aquí el programa lee el texto actual del botón y lo compara con `"Mostrar Imagen"`.

- Al principio, el HTML dice `<button>Mostrar Imagen</button>`, así que la condición es `true`.
- Si el botón dijera `"Ocultar Imagen"`, la condición sería `false`.

#### Líneas 9 a 11: el camino de "mostrar"

```js
boton.textContent = "Ocultar Imagen";
imagen.src = "imagenes/gato_001.jpg";
imagen.alt = "Gato";
```

Si la condición es verdadera, se hacen tres cambios:

1. El texto del botón pasa a `"Ocultar Imagen"`. Ahora el botón describe la próxima acción: si lo vuelves a pulsar, ocultará la imagen.
2. La imagen recibe la ruta `imagenes/gato_001.jpg`. El navegador carga y muestra esa foto.
3. El texto alternativo pasa a `"Gato"`. Este texto lo leen los lectores de pantalla y aparece si la imagen no se puede cargar.

La ruta `imagenes/gato_001.jpg` es **relativa al archivo `index.html`**: significa "entra en la carpeta `imagenes` y busca el archivo `gato_001.jpg`". No es relativa a `aprendo.js`, aunque los dos estén en la misma carpeta.

#### Líneas 12 a 16: el camino de "ocultar"

```js
} else {
    boton.textContent = "Mostrar Imagen";
    imagen.src = "";
    imagen.alt = "";
}
```

Si la condición es falsa, se ejecuta el `else`:

1. El botón vuelve a decir `"Mostrar Imagen"`.
2. La imagen recibe una dirección vacía (`""`). Al no tener una imagen que mostrar, la foto desaparece de la vista.
3. El texto alternativo también se vacía, porque ya no hay imagen que describir.

El elemento `<img>` **sigue existiendo** en la página. No se borra del HTML. Simplemente se queda sin imagen que mostrar.

> **Nota:** vaciar `src` no elimina la etiqueta, solo le quita la dirección. En algunos navegadores puede quedar un pequeño hueco o un icono de imagen rota. Más adelante veremos alternativas más limpias, como `hidden` o una clase de CSS.

> **Detalle fino:** el orden importa. Primero se lee el texto en la línea 8 y después se cambia en la línea 9. Si cambiaras el texto antes de leerlo, la condición se evaluaría con el texto nuevo y la lógica sería distinta.

#### Línea 18: cerrar la llamada

```js
);
```

El `});` del final cierra la función y la llamada a `addEventListener`. La indentación (los espacios al principio de las líneas) está un poco desordenada, pero a JavaScript le da igual: los espacios y los saltos de línea no cambian el resultado. Sirven para que las personas podamos leer el código. Con el tiempo, aprenderás a mantener una indentación ordenada.

### Líneas 20 a 25: entrar con el ratón

```js
imagen.addEventListener("mouseenter", function (evento) {

    imagen.src = "imagenes/perro_001.jpg";
    imagen.alt = "Perro";

});
```

- `imagen` es el elemento que escucha.
- `"mouseenter"` es el evento que ocurre cuando el puntero entra en el área de la imagen.
- La función cambia la imagen al perro y actualiza el texto alternativo.

No hay ningún `if` aquí. El código asume que, si el ratón entra en la imagen, la imagen está visible y se está mostrando el gato. En ese caso, cambiarla al perro tiene sentido.

### Líneas 27 a 31: salir con el ratón

```js
imagen.addEventListener("mouseleave", () => {
    imagen.src = "imagenes/gato_001.jpg";
    imagen.alt = "Gato";

});
```

- `"mouseleave"` ocurre cuando el puntero sale del área de la imagen.
- La función vuelve a poner la foto del gato.
- Aquí se usa una función flecha `() => { ... }` en lugar de `function (evento) { ... }`. Las dos formas son equivalentes en este caso; la flecha es más corta.
- Como no se usa el objeto del evento, no hay parámetro.

### Lo que el código NO hace

Es tan importante saber qué hace un programa como saber qué no hace:

- **No descarga ni crea las imágenes.** Solo cambia la dirección (`src`) para que el navegador muestre archivos que ya existen en la carpeta `imagenes`.
- **No modifica los archivos del proyecto.** Todo ocurre en la copia viva de la página.
- **No ejecuta las funciones de los eventos al cargar.** Solo las registra.
- **No comprueba si la imagen oculta puede recibir el ratón.** Más adelante veremos un caso límite relacionado con esto.
- **No usa una variable para recordar si la imagen está visible.** Usa el texto del botón como memoria.
- **No borra la etiqueta `<img>`.** Solo le quita el contenido de `src` y `alt`.

### Cosas sutiles que conviene notar

1. **El texto debe coincidir exactamente.** Si el HTML dice `"Mostrar Imagen"` con mayúscula, todo funciona. Si dice `"Mostrar imagen"`, la condición nunca será verdadera al principio.
2. **La imagen oculta normalmente no muestra contenido**, así que no hay una imagen visible con la que interactuar. Por eso el `mouseenter` casi nunca se dispara cuando está oculta. Pero el código no comprueba la visibilidad: si por algún motivo el evento se disparara, aparecería el perro aunque el botón dijera `"Mostrar Imagen"`.
3. **El botón dice la acción, no el estado.** Cuando la imagen está oculta, dice `"Mostrar Imagen"`; cuando está visible, dice `"Ocultar Imagen"`. No dice "imagen oculta" ni "imagen visible". Esto es una convención común en los botones.
4. **Hay dos formas de función.** `function (evento) {}` y `() => {}` son dos maneras de escribir lo mismo para este proyecto. No te preocupes si al principio una te parece más rara.

---

## 11. La película completa: qué pasa en cada momento

Vamos a seguir la página desde que se abre hasta que el usuario interactúa.

### Al cargar la página

1. El navegador lee `index.html`.
2. Encuentra el `<script src="aprendo.js" defer>`, descarga el archivo y espera a terminar de leer el HTML.
3. Ejecuta `aprendo.js` de arriba abajo:
   - Guarda la imagen en la variable `imagen`.
   - Guarda el botón en la variable `boton`.
   - Registra la reacción al clic.
   - Registra la reacción a `mouseenter`.
   - Registra la reacción a `mouseleave`.
4. Las funciones de los eventos **no se ejecutan todavía**.
5. La página muestra el estado inicial del HTML: el botón dice `"Mostrar Imagen"` y la imagen no tiene `src`, así que no se ve.

### La tabla de estados

| Momento | El botón dice | Archivo que se muestra | Lo que ves |
|---|---|---|---|
| Al cargar | Mostrar Imagen | Ninguno | Nada |
| Clic 1 | Ocultar Imagen | `gato_001.jpg` | Un gato |
| Entra el puntero en la imagen | Ocultar Imagen | `perro_001.jpg` | Un perro |
| Sale el puntero de la imagen | Ocultar Imagen | `gato_001.jpg` | Un gato |
| Clic 2 | Mostrar Imagen | Ninguno | Nada |
| Clic 3 | Ocultar Imagen | `gato_001.jpg` | Un gato |

### Paso a paso

**Clic 1.** El usuario pulsa el botón. El navegador llama a la función del clic. La condición lee `"Mostrar Imagen"`, que coincide, así que entra en el `if`. El botón pasa a decir `"Ocultar Imagen"` y la imagen muestra el gato.

**El puntero entra en la imagen.** Se dispara `mouseenter`. La imagen cambia al perro. El botón no cambia: sigue diciendo `"Ocultar Imagen"`, porque esa sigue siendo la acción disponible.

**El puntero sale de la imagen.** Se dispara `mouseleave`. La imagen vuelve al gato.

**Clic 2.** El usuario pulsa otra vez. La función se ejecuta de nuevo desde el principio. Ahora el texto del botón es `"Ocultar Imagen"`, así que la condición es falsa y entra en el `else`. El botón vuelve a `"Mostrar Imagen"` y la imagen se vacía. La foto desaparece.

**Clic 3.** La condición vuelve a ser verdadera y aparece el gato otra vez.

### Predice antes de comprobarlo

- ¿Qué texto tendrá el botón después de tres clics? → `"Ocultar Imagen"`, porque cada clic alterna entre mostrar y ocultar, y el tercero muestra la imagen.
- ¿La imagen cambia de archivo en el disco? → No. Solo cambia la dirección que el navegador está mostrando.
- ¿Qué pasa si el usuario nunca toca el botón? → La imagen no se ve, porque empieza con `src=""`.
- ¿Qué pasa si el usuario pasa el ratón por donde estaría la imagen antes de mostrarla? → Normalmente nada, porque la imagen sin `src` no muestra contenido. Pero el código no comprueba la visibilidad, así que si el evento llegara a dispararse podría aparecer el perro mientras el botón dice `"Mostrar Imagen"`. Esa es una de las razones por las que mejoraremos el código.

---

## 12. Cómo se conectan los tres archivos

Este proyecto funciona porque el HTML, el CSS y el JavaScript cumplen un **contrato** entre ellos. Si una parte cambia, las otras pueden dejar de funcionar.

### El contrato del HTML con el JavaScript

El JavaScript espera encontrar:

- Un `<button>` cuyo texto inicial sea exactamente `"Mostrar Imagen"`.
- Un `<img>` con `src` vacío al principio.
- Los archivos `imagenes/gato_001.jpg` e `imagenes/perro_001.jpg` en las rutas indicadas.
- Que el script se ejecute después de que el HTML exista (por eso usamos `defer`).

El HTML del proyecto cumple ese contrato:

```html
<button>Mostrar Imagen</button>
<hr>
<img src="" alt="" width="300">
```

### ¿Qué pasaría sin `defer`?

Imagina que quitamos `defer`:

```html
<script src="aprendo.js"></script>
```

El navegador encuentra el script en el `<head>` y lo ejecuta **antes** de leer el `<body>`. En ese momento, la imagen y el botón todavía no existen. Entonces:

```js
document.querySelector("img")   // null
document.querySelector("button") // null
```

La primera línea no da error, porque `null` es un valor válido. Pero al llegar a:

```js
boton.addEventListener("click", ...)
```

JavaScript intenta usar `null` como si fuera un botón y lanza un error parecido a:

```text
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
```

El script se detiene y nada funciona. `defer` evita justo eso: espera a que el HTML esté completo antes de ejecutar.

También podrías poner el script al final del `<body>`, sin `defer`. Las dos soluciones son válidas. `defer` en el `<head>` es una costumbre moderna y ordenada.

### El contrato del CSS

El CSS tiene dos reglas:

```css
.articulo {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 20px 0;
}

.parrafo {
    color: #333;
    font-size: 16px;
    line-height: 1.5;
}
```

La primera se aplica al `<div class="articulo">` y funciona.

La segunda **no se aplica** porque el HTML tiene esto:

```html
<p>Esta es mi primera página interactiva</p>
```

El párrafo no tiene `class="parrafo"`. Para que la regla funcione, habría que escribir:

```html
<p class="parrafo">Esta es mi primera página interactiva</p>
```

Esto no tiene nada que ver con JavaScript, pero es un buen recordatorio: en CSS, el selector `.parrafo` solo encuentra elementos cuya `class` sea exactamente `parrafo`.

### Otros detalles del HTML

- El `<h1>` dice `!Hola Mundo` con el signo `!` al principio. En español, la forma correcta sería `¡Hola Mundo!`. No afecta al JavaScript, pero es bueno cuidar los detalles.
- El `<img>` tiene `width="300"`, así que cuando aparece la imagen mide 300 píxeles de ancho. La altura se ajusta sola para mantener la proporción.
- El `<hr>` dibuja una línea horizontal entre el botón y la imagen.

### Reglas de oro de las rutas

- `src="aprendo.js"` busca el archivo en la misma carpeta que `index.html`.
- `src="imagenes/gato_001.jpg"` busca dentro de la carpeta `imagenes`.
- Las rutas distinguen mayúsculas de minúsculas en muchos servidores: `Gato_001.jpg` no es lo mismo que `gato_001.jpg`.
- Si mueves `index.html` a otra carpeta sin mover las imágenes, las rutas dejan de funcionar.
- Los nombres deben estar bien escritos: una letra mal y el navegador no encuentra el archivo.

---

## 13. Cómo ejecutar y depurar tu página

### Abrir el proyecto

La forma más sencilla es hacer doble clic en `index.html`. Se abrirá en tu navegador y funcionará, porque todos los archivos están en la misma carpeta.

También puedes usar la extensión **Live Server** de tu editor o un servidor local. Por ejemplo, si tienes Python instalado:

```bash
python3 -m http.server 8000
```

Y luego visitar `http://localhost:8000` en el navegador. Para este proyecto no es obligatorio, pero te servirá cuando empieces a usar archivos más grandes o peticiones a servidores.

### Abrir la consola

La consola es la herramienta más importante para programar:

- En Windows y Linux: `F12` o `Ctrl + Shift + I`.
- En Mac: `Cmd + Option + I`.
- También puedes hacer clic derecho en la página y elegir **Inspeccionar** o **Inspect**.

Dentro de las herramientas de desarrollo, busca la pestaña **Console**.

En la consola puedes:

- Ver los errores en rojo.
- Ver los mensajes que tú mismo escribas con `console.log`.
- Escribir JavaScript y probarlo al instante.
- Inspeccionar los elementos de la página en la pestaña **Elements**.

### `console.log`: hablar contigo mismo

`console.log` imprime un mensaje en la consola. No se lo muestra al visitante de la página: es una herramienta para ti, para entender qué está pasando.

```js
console.log("El script se cargó");
console.log("Texto del botón:", boton.textContent);
console.log("La imagen es:", imagen.src);
```

Puedes ponerlo dentro de una función para ver cuándo se ejecuta:

```js
boton.addEventListener("click", function (evento) {
  console.log("¡Hiciste clic!");
  console.log("El botón dice:", boton.textContent);

  if (boton.textContent === "Mostrar Imagen") {
    // ...
  }
});
```

Si quieres mostrar algo al usuario, usa `alert(...)`; si quieres investigar tú, usa `console.log(...)`. No dejes `alert` en una página real: es molesto.

### Cómo leer un error

Un error típico en la consola se ve así:

```text
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at aprendo.js:6
```

- `Uncaught TypeError` indica el tipo de error.
- `Cannot read properties of null` significa que algo era `null` y el código intentó usar una propiedad o método de ese `null`.
- `reading 'addEventListener'` te dice qué se estaba intentando hacer.
- `at aprendo.js:6` te dice el archivo y la línea aproximada.

En este caso, la causa probable es que `boton` era `null`: el selector no encontró el botón, o el script se ejecutó antes de que el HTML existiera.

Tipos de errores que verás a menudo:

| Mensaje | Significado probable |
|---|---|
| `TypeError: Cannot read properties of null` | Un `querySelector` no encontró nada, o el HTML aún no estaba listo |
| `ReferenceError: x is not defined` | Usaste una variable que no existe (nombre mal escrito) |
| `SyntaxError: Unexpected token` | Hay un error de escritura: falta un paréntesis, una llave o una comilla |
| `Failed to load resource: 404` | Una ruta de archivo no existe |
| `Uncaught TypeError: x is not a function` | Intentaste llamar como función algo que no lo es |

### El error detiene el script

Si hay un error mientras el script se ejecuta de arriba abajo (por ejemplo, en la línea 6), las líneas siguientes no se ejecutan. Por eso, cuando "nada funciona", lo primero es mirar la consola: puede haber un solo error al principio que esté impidiendo todo lo demás.

Si el error ocurre dentro de una función de evento, se interrumpe esa ejecución concreta. El listener sigue registrado y se volverá a ejecutar en el próximo evento (y probablemente volverá a fallar si no lo corriges).

### Consejos para depurar

1. Guarda el archivo antes de recargar.
2. Recarga con `F5` o `Ctrl + R`.
3. Abre la consola y mira si hay errores en rojo.
4. Usa `console.log` para comprobar qué valores tienen las variables.
5. Comprueba que los nombres de archivos y las rutas estén bien escritos.
6. Si cambiaste el HTML, revisa que los selectores sigan encontrando los elementos correctos.
7. Si algo funciona en la consola pero no en el archivo, revisa que hayas guardado los cambios.

---

## 14. Experimentos guiados

La mejor forma de aprender es cambiar el código y observar qué pasa. Haz estos experimentos de uno en uno. Si algo se rompe, vuelve atrás y compara.

### Experimento 1: ver el evento en la consola

Añade esta línea al principio de la función del clic:

```js
boton.addEventListener("click", function (evento) {
  console.log("Clic detectado. El botón dice:", boton.textContent);
  console.log("Tipo de evento:", evento.type);

  if (boton.textContent === "Mostrar Imagen") {
    // ...
  }
});
```

Abre la consola y haz clic. Verás el texto del botón **antes** de que el código lo cambie, porque el `console.log` está antes del `if`. Prueba a mover el `console.log` después del `if/else` y compara.

**Qué aprendes:** el orden de las líneas importa, y el objeto `evento` contiene información real.

### Experimento 2: cambiar los textos y las fotos

Cambia `"Mostrar Imagen"` por `"Ver foto"` y `"Ocultar Imagen"` por `"Esconder foto"`. Debes cambiarlo en **todas** las apariciones: en el texto inicial del botón en el HTML, en la condición del `if` y en las asignaciones. También puedes cambiar las rutas por otras imágenes que tengas.

**Qué aprendes:** el texto del botón es parte de la lógica. Si cambias una aparición y olvidas otra, el comportamiento se vuelve extraño. Esta es una buena razón para usar una variable de estado, como veremos en la sección 15.

### Experimento 3: cambiar el estilo con JavaScript

Añade un borde naranja cuando el puntero entre en la imagen y quítalo cuando salga:

```js
imagen.addEventListener("mouseenter", function (evento) {
  imagen.src = "imagenes/perro_001.jpg";
  imagen.alt = "Perro";
  imagen.style.border = "4px solid orange";
});

imagen.addEventListener("mouseleave", () => {
  imagen.src = "imagenes/gato_001.jpg";
  imagen.alt = "Gato";
  imagen.style.border = "none";
});
```

**Qué aprendes:** `imagen.style` es un objeto con propiedades CSS. JavaScript puede cambiar la apariencia además del contenido. Es como escribir CSS en vivo.

### Experimento 4: contar clics

Añade un contador **fuera** de la función, para que no se reinicie en cada clic:

```js
let clics = 0;

boton.addEventListener("click", () => {
  clics = clics + 1;
  console.log("Has hecho clic", clics, "veces");
});
```

Coloca este bloque después del código que ya tienes. Observa que el clic sigue mostrando y ocultando la imagen: los dos listeners se suman, no se reemplazan.

**Qué aprendes:** una variable declarada fuera de la función conserva su valor entre llamadas. Si la declaras dentro, se reinicia cada vez. También aprendes que un elemento puede tener varios listeners para el mismo evento.

### Experimento 5: empezar con la imagen visible

Cambia el HTML para que la página empiece mostrando el gato:

```html
<button>Ocultar Imagen</button>
<hr>
<img src="imagenes/gato_001.jpg" alt="Gato" width="300">
```

Ahora, al cargar, el botón dice `"Ocultar Imagen"` y la imagen ya se ve. El primer clic entrará en el `else` y ocultará la imagen. Prueba también a pasar el ratón por la imagen desde el principio.

**Qué aprendes:** el JavaScript no decide el estado inicial por sí solo; el estado inicial viene del HTML. El código y el HTML deben estar de acuerdo.

---

## 15. Mejora del proyecto: una sola fuente de verdad

El código original funciona, pero tiene una debilidad: usa el texto visible del botón como memoria. Eso mezcla dos cosas distintas:

- Lo que el programa **sabe** (si la imagen está visible).
- Lo que el usuario **ve** (el texto del botón).

Cuando mezclas estas dos cosas, cualquier cambio en el diseño o en el idioma puede romper la lógica. La solución profesional es guardar el estado en una variable y dejar que el texto del botón sea solo una consecuencia.

Esta es una versión mejorada:

```js
const imagen = document.querySelector("img");
const boton = document.querySelector("button");

let visible = false;

function mostrarImagen() {
  visible = true;
  boton.textContent = "Ocultar Imagen";
  imagen.src = "imagenes/gato_001.jpg";
  imagen.alt = "Gato";
}

function ocultarImagen() {
  visible = false;
  boton.textContent = "Mostrar Imagen";
  imagen.src = "";
  imagen.alt = "";
}

boton.addEventListener("click", () => {
  if (visible) {
    ocultarImagen();
  } else {
    mostrarImagen();
  }
});

imagen.addEventListener("mouseenter", () => {
  if (visible) {
    imagen.src = "imagenes/perro_001.jpg";
    imagen.alt = "Perro";
  }
});

imagen.addEventListener("mouseleave", () => {
  if (visible) {
    imagen.src = "imagenes/gato_001.jpg";
    imagen.alt = "Gato";
  }
});
```

### Qué cambió y por qué

1. **`visible` es la fuente de verdad.** Es un booleano que dice si la imagen está visible. El texto del botón ya no se usa para decidir.
2. **`mostrarImagen()` y `ocultarImagen()` tienen nombres.** Cada función hace una cosa y se entiende su intención. Además, pueden reutilizarse.
3. **El clic consulta `visible`.** Si es `true`, oculta; si es `false`, muestra. Ya no depende de que el texto sea exacto.
4. **Los eventos del ratón comprueban `visible`.** Si la imagen está oculta, no cambian nada. Así se evita el caso límite en el que un evento pudiera mostrar el perro mientras el botón dice `"Mostrar Imagen"`.
5. **Los elementos son `const`.** La caja no cambia de elemento; solo cambian sus propiedades.

### Cómo se lee ahora el flujo

- Al cargar: `visible` es `false`, el botón dice `"Mostrar Imagen"` (esto lo pone el HTML) y la imagen está vacía.
- Clic: como `visible` es `false`, se llama a `mostrarImagen()`. `visible` pasa a `true`, el botón dice `"Ocultar Imagen"` y aparece el gato.
- Entrar con el ratón: como `visible` es `true`, se muestra el perro.
- Salir con el ratón: como `visible` es `true`, vuelve el gato.
- Clic: como `visible` es `true`, se llama a `ocultarImagen()`. `visible` pasa a `false`, el botón dice `"Mostrar Imagen"` y la imagen se vacía.
- Entrar con el ratón estando oculta: la condición `if (visible)` es falsa, así que no se cambia nada.

> **Idea avanzada:** si quieres ocultar la imagen de una forma más limpia, puedes usar `imagen.hidden = true` o una clase de CSS como `.oculta { display: none; }` en lugar de vaciar `src`. Eso hace que la imagen no ocupe espacio y no pueda recibir eventos. Es un buen siguiente paso, pero primero domina el estado con una variable.

---

## 16. Comprueba que lo entendiste

Intenta responder antes de abrir las respuestas. No pasa nada si fallas: vuelve a la sección correspondiente y compara.

### Preguntas de comprensión

1. ¿Qué hace `document.querySelector("img")` exactamente?
2. ¿Por qué el script lleva `defer`?
3. ¿Cuántas veces se ejecuta la función del clic si el usuario hace tres clics?
4. ¿Por qué al principio no se ve ninguna imagen?
5. ¿Qué cambia el evento `mouseenter` y qué cambia `mouseleave`?
6. ¿El archivo `gato_001.jpg` se modifica cuando aparece en la página?
7. ¿Qué pasa si cambias el texto inicial del botón a `"Mostrar imagen"` con "i" minúscula?
8. ¿Qué pasa si agregas un segundo `<img>` antes del actual en el HTML?

<details>
<summary>Ver respuestas</summary>

1. Busca el primer elemento `<img>` del DOM y lo devuelve como un objeto. Si no encuentra ninguno, devuelve `null`.
2. Porque el script está en el `<head>` y debe esperar a que el HTML del `<body>` esté construido. Sin `defer`, `querySelector` no encontraría el botón ni la imagen.
3. Tres veces. La función se registra una sola vez, pero se ejecuta en cada clic.
4. Porque el HTML tiene `<img src="" alt="" width="300">`: la dirección de la imagen está vacía, así que no hay nada que mostrar.
5. `mouseenter` cambia la imagen al perro; `mouseleave` vuelve a la imagen del gato.
6. No. Solo cambia la propiedad `src` de la copia viva de la página. El archivo del disco no se toca.
7. La condición del primer clic será falsa, porque `"Mostrar imagen"` no es exactamente `"Mostrar Imagen"`. El código entrará en el `else`: pondrá el texto `"Mostrar Imagen"` y vaciará la imagen. El primer clic parecerá no hacer nada, pero corregirá el texto. A partir del segundo clic funcionará normalmente.
8. `querySelector("img")` devuelve el primer `<img>`, así que el código controlaría el nuevo elemento y la imagen original se quedaría sin cambios. La misma idea se aplica a los botones: `querySelector("button")` toma el primero.

</details>

### Retos de programación

#### Reto 1: cambiar el título

Haz que el `<h1>` diga `"¡Mira el gato!"` cuando la imagen se muestre y `"¡Hola Mundo!"` cuando se oculte.

<details>
<summary>Ver una solución</summary>

Primero consigue el título, igual que hiciste con la imagen y el botón:

```js
const titulo = document.querySelector("h1");
```

Después cambia su `textContent` dentro de las dos ramas del `if`:

```js
boton.addEventListener("click", function (evento) {
  if (boton.textContent === "Mostrar Imagen") {
    boton.textContent = "Ocultar Imagen";
    imagen.src = "imagenes/gato_001.jpg";
    imagen.alt = "Gato";
    titulo.textContent = "¡Mira el gato!";
  } else {
    boton.textContent = "Mostrar Imagen";
    imagen.src = "";
    imagen.alt = "";
    titulo.textContent = "¡Hola Mundo!";
  }
});
```

Fíjate en que `titulo` se declara junto a las otras variables, antes de usarlo.

</details>

#### Reto 2: un borde al hacer doble clic

Haz que al hacer doble clic en la imagen aparezca un borde rojo de 4 píxeles.

<details>
<summary>Ver una solución</summary>

Añade este listener:

```js
imagen.addEventListener("dblclick", () => {
  imagen.style.border = "4px solid red";
});
```

`dblclick` es el evento de doble clic. `imagen.style.border` es la propiedad CSS `border` escrita desde JavaScript.

</details>

#### Reto 3: contar los clics

Muestra en la consola cuántas veces se ha pulsado el botón, sin romper la funcionalidad de mostrar y ocultar.

<details>
<summary>Ver una solución</summary>

Añade un contador fuera de la función y un listener adicional:

```js
let clics = 0;

boton.addEventListener("click", () => {
  clics = clics + 1;
  console.log("Has hecho clic", clics, "veces");
});
```

La variable `clics` se declara fuera para que no se reinicie en cada clic. El listener nuevo se suma al que ya existía; no lo reemplaza. Si el contador estuviera dentro de la función, se reiniciaría en cada clic y siempre mostraría 1.

</details>

#### Reto 4: un segundo botón

Agrega un botón con `id="boton-perro"` que muestre siempre la foto del perro.

<details>
<summary>Ver una solución</summary>

En el HTML, añade el botón después del botón original:

```html
<button>Mostrar Imagen</button>
<button id="boton-perro">Ver perro</button>
```

En JavaScript:

```js
const botonPerro = document.querySelector("#boton-perro");

botonPerro.addEventListener("click", () => {
  imagen.src = "imagenes/perro_001.jpg";
  imagen.alt = "Perro";
});
```

El selector `#boton-perro` busca por `id`. Es importante que el botón nuevo esté **después** del original para que `querySelector("button")` siga encontrando primero el botón de mostrar/ocultar.

**Reflexión:** si la imagen está oculta y pulsas "Ver perro", el perro aparece, pero el botón original todavía dice `"Mostrar Imagen"`. No se rompe nada, pero el estado de la interfaz queda confuso. Este es otro ejemplo de por qué conviene tener una variable de estado que coordine todo.

</details>

---

## 17. Errores comunes y cómo leerlos

| Lo que ves | Por qué ocurre | Cómo arreglarlo |
|---|---|---|
| `Cannot read properties of null (reading 'addEventListener')` | `querySelector` no encontró el elemento, o el script se ejecutó antes de que el HTML existiera | Revisa el selector y usa `defer`, o coloca el script al final del `<body>` |
| No pasa nada al hacer clic | El listener no se registró por un error anterior, el selector apunta a otro elemento o el nombre del evento está mal | Mira la consola y comprueba que no haya errores rojos |
| La imagen no cambia de archivo | Error de escritura en la propiedad, por ejemplo `imagen.scr` en lugar de `imagen.src` | Revisa la ortografía; JavaScript no avisa de propiedades inventadas |
| La condición nunca se cumple | El texto no coincide exactamente: cambian mayúsculas, espacios o acentos | Usa `console.log(boton.textContent)` para ver el texto real |
| `if (x = "algo")` siempre entra | Usaste `=` (asignación) en lugar de `===` (comparación) | Cambia a `===` |
| La imagen no aparece | La ruta está mal, el archivo no existe o el nombre tiene otra mayúscula | Revisa la carpeta `imagenes` y escribe la ruta exacta |
| `Failed to load resource: 404` | El navegador no encuentra un archivo | Comprueba la ruta en el HTML o en `src` |
| El script entero deja de funcionar | Un error detiene la ejecución de las líneas siguientes | Corrige el primer error de la consola |
| El CSS de `.parrafo` no se aplica | El `<p>` no tiene `class="parrafo"` | Añade la clase en el HTML |
| Ves el código antiguo después de cambiarlo | No guardaste el archivo o no recargaste la página | Guarda y recarga con `F5` o `Ctrl + R` |
| `evento is not defined` | Usaste una variable que no existe o escribiste mal su nombre | Revisa mayúsculas, guiones y nombres |

### Cómo evitar la mayoría de estos errores

- Escribe los nombres de las propiedades con cuidado: `src`, `alt`, `textContent`, `addEventListener`.
- Usa `console.log` para comprobar los valores antes de suponer.
- Cambia una cosa a la vez y prueba.
- Lee el error completo, no solo la primera palabra.
- Si algo funcionaba y dejó de hacerlo, piensa qué fue lo último que cambiaste.

---

## 18. Chuleta de sintaxis

Esta tabla resume lo que aparece en el proyecto y lo que puedes usar para practicar.

| Quiero... | Se escribe... | Ejemplo |
|---|---|---|
| Crear una variable que puede cambiar | `let nombre = valor;` | `let visible = false;` |
| Crear una variable que no se reasigna | `const nombre = valor;` | `const boton = document.querySelector("button");` |
| Guardar un valor | `=` | `boton.textContent = "Hola";` |
| Comparar valor y tipo | `===` | `if (texto === "Gato")` |
| Comprobar que es distinto | `!==` | `if (texto !== "Gato")` |
| Tomar una decisión | `if (condición) { ... } else { ... }` | Ver el proyecto |
| Escribir una función tradicional | `function nombre() { ... }` | `function mostrar() { ... }` |
| Escribir una función flecha | `() => { ... }` | `() => { ... }` |
| Buscar un elemento | `document.querySelector("selector")` | `document.querySelector("img")` |
| Leer el texto de un elemento | `elemento.textContent` | `boton.textContent` |
| Cambiar el texto | `elemento.textContent = "..."` | `boton.textContent = "Ocultar Imagen";` |
| Cambiar una imagen | `elemento.src = "ruta"` | `imagen.src = "imagenes/gato_001.jpg";` |
| Cambiar el texto alternativo | `elemento.alt = "..."` | `imagen.alt = "Gato";` |
| Cambiar un estilo | `elemento.style.propiedad = "valor"` | `imagen.style.border = "4px solid red";` |
| Escuchar un evento | `elemento.addEventListener("evento", función)` | `boton.addEventListener("click", ...)` |
| Escribir en la consola | `console.log(...)` | `console.log("Hola");` |
| Añadir varios valores a la consola | `console.log(a, b, c)` | `console.log("Clic:", clics);` |

### Dos detalles de estilo

- **Comentarios:** todo lo que va después de `//` en una línea es un comentario. El navegador lo ignora y sirve para explicar el código a las personas.
- **Punto y coma:** las instrucciones suelen terminar con `;`. JavaScript a veces puede funcionar sin ellos, pero usarlos es una buena costumbre y hace que el código sea más claro.

### Selectores que puedes usar en `querySelector`

| Selector | Busca |
|---|---|
| `"button"` | El primer botón |
| `".articulo"` | El primer elemento con esa clase |
| `"#boton-perro"` | El elemento con ese id |
| `"div p"` | Un párrafo dentro de un div |
| `"img"` | La primera imagen |

---

## 19. Glosario

**Argumento:** el valor concreto que le pasas a una función cuando la llamas. En `saludar("Ana")`, el argumento es `"Ana"`.

**Booleano (boolean):** un valor que solo puede ser `true` o `false`. Se usa para decisiones.

**Callback:** una función que se pasa como argumento a otra función para que se ejecute más tarde. Las funciones de `addEventListener` son callbacks.

**Consola:** herramienta del navegador donde puedes ver errores y mensajes, y probar código JavaScript.

**DOM:** la representación en memoria de la página HTML. Es lo que JavaScript puede leer y modificar.

**Evento:** algo que ocurre en la página, como un clic, el movimiento del ratón o la pulsación de una tecla.

**Función:** un grupo de instrucciones que se puede ejecutar cuando se llama. Puede recibir parámetros y devolver un valor.

**Método:** una función que pertenece a un objeto. Se llama con un punto y paréntesis, por ejemplo `boton.addEventListener(...)`.

**null:** un valor que significa "no hay nada". `querySelector` devuelve `null` cuando no encuentra un elemento.

**Objeto:** una estructura que agrupa propiedades y métodos. Un elemento HTML y un evento son objetos.

**Parámetro:** el nombre que aparece en la definición de una función para recibir un valor. En `function saludar(nombre)`, el parámetro es `nombre`.

**Propiedad:** un valor que pertenece a un objeto. Se accede con un punto, por ejemplo `imagen.src`.

**Selector:** una forma de describir qué elemento quieres, igual que en CSS. `querySelector` usa selectores CSS.

**String (cadena):** un texto entre comillas, como `"Gato"`.

**undefined:** el valor que tiene una variable que fue creada pero nunca recibió un valor.

**Variable:** una caja con nombre donde guardas un valor para usarlo después.

**defer:** atributo del `<script>` que indica al navegador que espere a que el HTML esté completo antes de ejecutar el archivo. Solo funciona con scripts externos (los que tienen `src`).

---

## 20. Qué aprender después

Ya sabes lo esencial para leer este proyecto. Estos son buenos siguientes pasos:

1. **Arrays y bucles.** Sirven para trabajar con listas de cosas, por ejemplo varias imágenes o varios botones.
2. **Funciones que devuelven valores.** Ya has visto funciones que cambian la página; también existen funciones que calculan y devuelven un resultado con `return`.
3. **Objetos con tus propios datos.** Practica creando objetos como `{ nombre: "Gato", edad: 3 }`.
4. **`classList`.** Permite añadir, quitar y alternar clases CSS desde JavaScript. Es una forma muy limpia de cambiar estilos.
5. **Formularios.** Aprende a leer lo que el usuario escribe en un `<input>`.
6. **`localStorage`.** Sirve para guardar datos en el navegador aunque se recargue la página.
7. **`fetch` y APIs.** Permite pedir datos a internet. Es el paso siguiente a las páginas completamente locales.
8. **Frameworks y librerías.** Cuando domines JavaScript básico, podrás explorar herramientas como React, Vue o Svelte. No las necesitas para este proyecto.

### Ideas de proyectos para practicar

- Una galería con varios botones para cambiar de imagen.
- Un cuestionario con preguntas y respuestas.
- Una lista de tareas que se puedan añadir y tachar.
- Una calculadora sencilla.
- Un juego de adivinar un número con pistas de "más alto" o "más bajo".

### Consejos finales

- Lee los errores: casi siempre te dicen qué línea revisar.
- Prueba en la consola antes de cambiar el archivo.
- Haz cambios pequeños y comprueba el resultado.
- No tengas miedo de romper el código: puedes volver a copiarlo o deshacer con `Ctrl + Z`.
- Explica el código a otra persona. Si puedes explicarlo, lo entiendes.
- La documentación de MDN (Mozilla Developer Network) es una de las mejores fuentes para consultar JavaScript.

---

## 21. La idea más importante

Casi todo el JavaScript de este proyecto sigue cuatro pasos:

```text
1. SELECCIONAR  -> document.querySelector("...")
2. ESCUCHAR     -> addEventListener("click", función)
3. DECIDIR      -> if (condición) { ... } else { ... }
4. CAMBIAR      -> elemento.propiedad = nuevoValor
```

Y una idea que te acompañará siempre:

> **El estado es la memoria del programa.** Si el programa necesita recordar algo entre una acción y otra, guárdalo en una variable. El texto del botón, una imagen y un borde pueden cambiar, pero la variable te dice la verdad sobre lo que está pasando.

Si has llegado hasta aquí y puedes explicar qué hacen las líneas de `aprendo.js`, ya no eres solo alguien que sabe HTML y CSS: también sabes leer y escribir tu primer JavaScript. Ahora toca practicar, romper cosas y volver a arreglarlas.
