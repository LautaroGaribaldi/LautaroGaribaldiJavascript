let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let listaProductos = JSON.parse(localStorage.getItem("productos")) || []
let contenedor = document.getElementById("carrito")
//let vaciarCarrito = document.getElementById("boton_vaciar")

function armarCarrito(lista) {
    if (carrito.length === 0) {
        //contenedor.classList.add("carritoVacio")
        contenedor.innerHTML = `<div class="itemVacio">
            <p class="pNombreProducto">Carrito Vacio =(</p>  
            </div>
            `

    } else {
        lista.forEach(producto => {
            contenedor.innerHTML += `<div class="itemCarrito" id="${producto.id}">
            <img src=".${producto.miniatura}" class = "imgCarrito">
            <p class="pNombreProducto">${producto.nombre}</p>
            <p class="pCarrito">$${producto.precio}</p>
            <p class="pCarrito">${producto.stock}</p>
            <p class="pCarrito">$${producto.stock * producto.precio}</p>
            </div>
            <hr>
            `
        })
        const carritoTotal = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.stock), 0)
        contenedor.innerHTML += `<div class = "totalCarrito"><p class = "totalTexto">Total Carrito: $${carritoTotal}</p></div>
        <div class="botonesCarrito">
        <input type="button" id="boton_vaciar" value="Vaciar carrito">
        <input type="button" id="boton_comprar" value="Comprar">
        </div>
        `
        let vaciarCarrito = document.getElementById("boton_vaciar")
        let comprar = document.getElementById("boton_comprar")
        vaciarCarrito.addEventListener("click", borrarCarrito)
        comprar.addEventListener("click", comprarCarrito)
    }
}

function borrarCarrito() {
    carrito.forEach(producto => {
        if (listaProductos.findIndex(productos => (productos.id === producto.id)) >= 0) {
            listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock += producto.stock
            localStorage.setItem("productos", JSON.stringify(listaProductos))
            console.log(listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock)
        }
    })
    localStorage.removeItem("carrito")
    carrito = JSON.parse(localStorage.getItem("carrito")) || []
    armarCarrito(carrito)
}

function comprarCarrito() {
    carrito.forEach(producto => {
        if (listaProductos.findIndex(productos => (productos.id === producto.id)) >= 0) {
            listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock += producto.stock
            localStorage.setItem("productos", JSON.stringify(listaProductos))
            console.log(listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock)
        }
    })
    localStorage.removeItem("carrito")
    carrito = JSON.parse(localStorage.getItem("carrito")) || []
    armarCarrito(carrito)
    mostrarAlerta()
}

function mostrarAlerta() {
    document.getElementById("alerta").classList.remove("alertaBorrar")  //saco class que deja opacidad 0%.
    document.getElementById("alerta").innerHTML = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Gracias por su compra!.</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
                    `                                                   // Genero la ventana modal.
    document.getElementById("alerta").classList.add("alertaMostrar")// agrego class para mostrar la ventana 100% opacidad.
    setTimeout(cerrarAlerta, 3000);                     // luego de 3 segundos borro la ventana modal.
}

function cerrarAlerta() {
    document.getElementById("alerta").classList.add("alertaBorrar")
    setTimeout(borrarAlerta, 3000)
}

function borrarAlerta() {
    document.getElementById("alerta").innerHTML = ""
}

//vaciarCarrito.addEventListener("click",borrarCarrito) // boton buscar

armarCarrito(carrito)