let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
let contenedor = document.getElementById("carrito");
const carritoTotal = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.stock), 0);
let vaciarCarrito = document.getElementById("boton_vaciar");
let btnComprar = document.getElementById("boton_comprar");
function armarCarrito(){
    const promesa = new Promise((resolve,reject) =>{
        setTimeout(()=>{carrito.length > 0 ? resolve(carrito) : reject(new Error("Carrito Vacio"))},0)
    })
     promesa
            .then(carrito =>
                (carrito.forEach(producto => {
                    console.log("entre then (Carrito con algun producto)")
                    contenedor.innerHTML += `<div class="itemCarrito" id="${producto.id}">
                    <img src=".${producto.miniatura}" class = "imgCarrito">
                    <p class="pNombreProducto">${producto.nombre}</p>
                    <p class="pCarrito">$${producto.precio}</p>
                    <p class="pCarrito">${producto.stock}</p>
                    <p class="pCarrito">$${producto.stock * producto.precio}</p>
                    </div>
                    <hr>
                    `;
                }),
                contenedor.innerHTML += `<div class = "totalCarrito"><p class = "totalTexto">Total Carrito: $${carritoTotal}</p></div>
                <div class="botonesCarrito">
                <input type="button" id="boton_vaciar" value="Vaciar carrito">
                <input type="button" id="boton_comprar" value="Comprar">
                </div>
                `)
            )
            .then(carrito =>
                (vaciarCarrito = document.getElementById("boton_vaciar"),
                vaciarCarrito.addEventListener("click", borrarCarrito),
                btnComprar = document.getElementById("boton_comprar"),
                btnComprar.addEventListener("click", comprarCarrito)))
            .catch(reject =>
            (console.log("entre catch (Carrito vacio)"),
            contenedor.innerHTML = `<div class="itemVacio">
            <p class="pNombreProducto">Carrito Vacio =(</p>  
            </div> 
            `))
}
// Cambie la funcion armarCarrito por una funcion con promesa.

/*function armarCarrito(lista) {
    if (carrito.length === 0) {
        //contenedor.classList.add("carritoVacio")
        contenedor.innerHTML = `<div class="itemVacio">
            <p class="pNombreProducto">Carrito Vacio =(</p>  
            </div>
            `;

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
            `;
        })
        contenedor.innerHTML += `<div class = "totalCarrito"><p class = "totalTexto">Total Carrito: $${carritoTotal}</p></div>
        <div class="botonesCarrito">
        <input type="button" id="boton_vaciar" value="Vaciar carrito">
        <input type="button" id="boton_comprar" value="Comprar">
        </div>
        `;
        vaciarCarrito.addEventListener("click", borrarCarrito);
        comprar.addEventListener("click", comprarCarrito);
    }
}*/

function borrarCarrito() {
    carrito.forEach(producto => {
        if (listaProductos.findIndex(productos => (productos.id === producto.id)) >= 0) {
            listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock += producto.stock;
            localStorage.setItem("productos", JSON.stringify(listaProductos));
            console.log(listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock);
        }
    })
    localStorage.removeItem("carrito");
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    armarCarrito();
}

function comprarCarrito() {
    carrito.forEach(producto => {
        if (listaProductos.findIndex(productos => (productos.id === producto.id)) >= 0) {
            listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock += producto.stock;
            localStorage.setItem("productos", JSON.stringify(listaProductos));
            console.log(listaProductos[(listaProductos.findIndex(productos => (productos.id === producto.id)))].stock);
        }
    })
    localStorage.removeItem("carrito");
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        
    armarCarrito();
    /*Swal.fire(
        "Gracias por su compra!",
        "",
        imageURL: "../images/ryzen7.png",
        "success"
      )*/

      Swal.fire({
        title: 'Compra Realizada!',
        text: "Gracias por su compra!",
        //icon: 'success',
        imageUrl: "../images/iconoCompras.png",
        confirmButtonText: 'OK'
      })
}

armarCarrito();