let carritoDeCompras = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTipos = document.getElementById('selecTipos')

let stockProductos= [];

function recuperarStock() {
    let stock = JSON.parse(localStorage.getItem('stock'))
    if(stock){
        stock.forEach(el => stockProductos.push(el))
    }
}

$.getJSON('stock.json', function (data) {
    console.log(data)
    localStorage.setItem('stock', JSON.stringify(data))
    recuperarStock()
    mostrarProductos(data)
    recuperar()
})

class Productos{
    constructor(id,title,price,thumbnail,desc, cantidad){
        this.id= id;
        this.nombre= title;
        this.precio= price;
        this.img= thumbnail;
        this.desc= desc;
        this.cantidad = cantidad
    }
}

$.get('https://api.mercadolibre.com/sites/MLA/search?category=MLA1500&limit=30', function (data) {
    console.log(data)
    data.results.forEach(el=> stockProductos.push(
        new Productos(el.id,el.title,el.price,el.thumbnail,'sos el mejor',1)
    ))

    mostrarProductos(stockProductos)
})

async function setData() {
    const result = await fetch('stock.json')
    const data = await result.json()
    console.log(result);
    console.log(data);
  }

setData();

carritoDeCompras.forEach(function(producto){
    actualizarCarrito(producto, true)
})

/*
selecTipos.addEventListener('change',()=>{
    console.log(selecTalles.value)
    if(selecTipos.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(el => el.tipo == selecTipos.value))
    }b
})
*/
$('#selecTipos').on('change',()=>{
    if($('selecTipos').val() == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(el => el.tipo == $('#selecTipos').val()))
    }
})

mostrarProductos(stockProductos)
function mostrarProductos(array){
    $('#contenedor-productos').empty()
     for (const producto of array) {
         $('#contenedor-productos').append(`<div class="producto">
                                             <div class="card">
                                             <div class="card-image">
                                                 <img src="https://thumbs.gfycat.com/DearWellinformedDalmatian-size_restricted.gif" class="loader">
                                                 <img src=${producto.img} class="img-productos">
                                                 <span class="card-title">${producto.nombre}</span>
                                                 <a id="boton${producto.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                                             </div>
                                             <div class="card-content">
                                                 <p>${producto.desc}</p>
                                                 <p>Talle: ${producto.talle}</p>
                                                 <p> $${producto.precio}</p>
                                             </div>
                                         </div> 
                                     </div> `)

         $(`#boton${producto.id}`).click(()=>{
                 agregarAlCarrito(producto.id)
        })
     }
 }


function agregarAlCarrito(id) {

    let repetido = carritoDeCompras.find(prodR => prodR.id == id);

    if(repetido){
        repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">cantidad: ${repetido.cantidad}</p>`
        actualizarCarrito(repetido, false)
    } else{
        let productoAgregar = stockProductos.find(prod => prod.id == id);

        carritoDeCompras.push(productoAgregar);

        productoAgregar.cantidad = 1;
        actualizarCarrito(productoAgregar, true)
        
    }
    
    localStorage.setItem("carritoDeCompras", JSON.stringify(carritoDeCompras));
}


function actualizarCarrito(productoAgregar, primeraVez) {
   contadorCarrito.innerText = carritoDeCompras.reduce((acc, el)=> acc + el.cantidad,0);
   precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad),0)

   if (primeraVez) {
    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `<p>${productoAgregar.nombre}</p>
                    <p>Precio: ${productoAgregar.precio}</p>
                    <p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)

    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    botonEliminar.addEventListener('click', ()=>{
        botonEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id)
        actualizarCarrito()
    })
   }
}
