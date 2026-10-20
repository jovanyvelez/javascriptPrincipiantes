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
