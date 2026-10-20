let mostrarImagen = false;

let imagen = document.querySelector("img");

let boton = document.querySelector("button");


boton.addEventListener("click", function () {
    
        if (!mostrarImagen) {
            boton.textContent = "Ocultar Imagen";
            imagen.src = "imagenes/gato_001.jpg";
            imagen.alt = "Gato";
            mostrarImagen = true;
        } else {
            boton.textContent = "Mostrar Imagen";
            imagen.src = "";
            imagen.alt = "";
            mostrarImagen = false;
        }
    }
);

imagen.addEventListener("mouseenter", function () {

    imagen.src = "imagenes/perro_001.jpg";
    imagen.alt = "Perro";

});

imagen.addEventListener("mouseleave", () => {
    imagen.src = "imagenes/gato_001.jpg";
    imagen.alt = "Gato";

});
