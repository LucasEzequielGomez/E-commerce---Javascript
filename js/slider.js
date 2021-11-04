window.addEventListener('load', function (){
    console.log('Se cargo?')
    let imagenes = [];

    imagenes [0] = 'https://i.ibb.co/4YXFnqk/1.jpg';
    imagenes [1] = 'https://i.ibb.co/0cGJ2JD/2.jpg';
    imagenes [2] = 'https://i.ibb.co/XWYm61R/3.jpg';

    let indiceImagenes = 0;

    function cambiarImagenes() {
        document.slider.src = imagenes[indiceImagenes]

        if (indiceImagenes < 2){
            indiceImagenes++;
        } else {
            indiceImagenes = 0;
        }
    };
    setInterval(cambiarImagenes, 3000)
});