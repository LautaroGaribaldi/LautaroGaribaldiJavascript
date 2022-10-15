let inputComprar
let aux = 0
const iva = 1.21;
const carrito = [];
const div = document.getElementById("contenedor")
const filtro = document.getElementById("nombre")
const card = document.getElementsByClassName("card")

/*Declaracion clase producto*/
class Producto {
    constructor(id, nombre, categoria, imagen, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
    }
    descuento() {
        if (this.precio > 1000) {
            this.precio = this.precio * 0.9;
        }
    }
    comprar(cantidad) {
        let cantidadNumero = parseInt(cantidad);
        let precioOriginal = this.precio;
        if (this.stock > 0) {
            while (cantidadNumero > this.stock || cantidadNumero <= 0 || Number.isNaN(cantidadNumero)) {
                alert("ingrese una cantidad valida. Stock disponible: " + this.stock);
                cantidadNumero = parseInt(prompt("Ingrese nueva cantidad a pedir."));
            }
            this.descuento();
            alert("Se realizo su pedido de " + cantidadNumero + " unidades del producto " + this.nombre);
            alert("El precio por esas unidades es de " + (this.precio * cantidadNumero));
            if (carrito.findIndex(producto => (producto.id === this.id)) >= 0) {
                carrito[carrito.findIndex(producto => (producto.id === this.id))].stock += cantidadNumero // verifico si ya hay un producto agregado de ese tipo sino hago push.
            } else { carrito.push(new Producto(this.id, this.nombre, this.categoria, this.precio, cantidadNumero)) }  //agrego el objeto comprado al carrito.
            this.stock -= cantidadNumero;
            this.precio = precioOriginal; // devuelvo el precio original al producto.

        } else {
            alert("No tenemos stock disponible. Disculpe las molestias");
        }
    };
}
/*Funcion Para sacar el valor total del carrito*/
function valorCarrito(carrito) {
    const totalCarrito = (carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.stock), 0) * 1.21).toFixed(2);
    alert("el valor total de la compra es de: $" + totalCarrito)
    return (totalCarrito)
}

/*Declaracion productos nuevos*/
const producto1 = new Producto(01, "Procesador Intel i9", "Procesador","./images/i9.jpg", 300, 50);
const producto2 = new Producto(02, "Procesador Amd Ryzen 7", "Procesador","./images/ryzen7.png", 150, 50);
const producto3 = new Producto(03, "Placa de video Nvidia RTX2060", "Placa de video","./images/rtx2060.jpg", 650, 50);
const producto4 = new Producto(04, "Placa de video Amd RX6700XT", "Placa de video","./images/rx6700xt.jpg", 335, 50);
const producto5 = new Producto(05, "Memoria ram Kingstone", "Memoria ram","./images/kingstone.jpg", 260, 50);
const producto6 = new Producto(06, "Memoria ram Adata", "Memoria ram","./images/adata.jpg", 180, 50);
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [producto1, producto2, producto3, producto4, producto5, producto6]




/*Funcion Crear nuevos productos*/

function crearProducto() {
    listaProductos.forEach(producto => { if (producto.id > aux) { aux = producto.id } }) // guardo en variable auxiliar el ultimo id asignado
    let id = aux + 1;
    let nombre = prompt("Cual es el nombre del producto?").toLowerCase();
    let categoria = prompt("Cual es la categoria del producto?").toLowerCase();
    let precio = parseFloat(prompt("Cual es el precio del producto?"));
    while (precio <= 0 || Number.isNaN(precio)) {
        alert("ingrese una precio valido.");
        precio = parseFloat(prompt("Cual es el precio del producto?"));
    }
    let stock = parseFloat(prompt("Cual es el stock del producto?"));
    while (stock <= 0 || Number.isNaN(stock)) {
        alert("ingrese una cantidad valida");
        stock = parseInt(prompt("Cual es el stock del producto?"));
    }
    let productoNuevo = new Producto(id, nombre, categoria, precio, stock)
    listaProductos.push(productoNuevo)
    localStorage.setItem("productos",JSON.stringify(listaProductos))
    alert("Producto " + nombre + " Creado.")
}
/*Inicio Definicion componentes PC y funciones para ingresar mas de 1 elemento*/
function ingresarProcesador(marca, cantidad) {
    let procesadorNuevo = marca.toLowerCase();
    while ((procesadorNuevo != "amd") && (procesadorNuevo != "intel")) {
        procesadorNuevo = prompt("elija una marca de procesador valida. intel($300) o amd($150)?").toLowerCase();
    }
    if (procesadorNuevo === "intel") {
        producto1.comprar(cantidad)
    } else {
        producto2.comprar(cantidad)
    }

}

function ingresarPlaca(marca, cantidad) {
    let placaNueva = marca.toLowerCase();
    while ((placaNueva != "nvidia") && (placaNueva != "amd")) {
        placaNueva = prompt("elija una marca de placa de video valida. nvidia($650) o amd($335)?").toLowerCase();
    }
    if (placaNueva === "nvidia") {
        producto3.comprar(cantidad)

    } else {
        producto4.comprar(cantidad)
    }
}

function ingresarMemoria(marca, cantidad) {
    let memoriaNueva = marca.toLowerCase();
    while ((memoriaNueva != "kingstone") && (memoriaNueva != "segate")) {
        memoriaNueva = prompt("elija una marca de memoria ram valida. kingstone($260) o adata($180)?").toLowerCase();
    }
    if (memoriaNueva === "kingstone") {
        producto5.comprar(cantidad)
    } else {
        producto6.comprar(cantidad)
    }
}
/*Mostrar los componentes elegidos en armar pc.*/
function mostrarPc() {
    carrito.forEach(producto => console.log(producto.categoria + " " + producto.nombre + " " + " " + producto.stock));
}


/*Inicio Funcio para armar una pc*/
function armarPc() {
    let procesadorPc = prompt("elija su marca de procesador. intel ($300) o amd($150)?").toLowerCase();
    ingresarProcesador(procesadorPc, 1);
    let placaPc = prompt("elija su marca de placa de video. nvidia($650) o amd($335)?").toLowerCase();
    ingresarPlaca(placaPc, 1);
    let memoriaPc = prompt("elija su marca de memoria ram. kingstone($260) o adata($180)?").toLowerCase();
    ingresarMemoria(memoriaPc, 1);
}
/*Fin Funcio para armar una pc*/

/*funcion para comprar diferentes componentes y cantidades*/

function comprarComponentes() {
    let agregarMas = "si"
    let opcionComprar
    while (agregarMas === "si") {
        opcionComprar = parseInt(prompt("que quiere comprar? 1)Procesador 2)Placa de video 3)Memoria ram 4)Salir"));
        while (opcionComprar != 1 && opcionComprar != 2 && opcionComprar != 3 && opcionComprar != 4) {
            alert("Ingrese un valor valido");
            opcionComprar = parseInt(prompt("que quiere comprar? 1)Procesador 2)Placa de video 3)Memoria ram"));
        }
        if (opcionComprar === 1) {
            let opcionProcesador = prompt("elija una marca de procesador. intel($300) o amd($150)?").toLowerCase();
            let cantidadComprar = parseInt(prompt("cuantos unidades quieres comprar?"));
            ingresarProcesador(opcionProcesador, cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            }
        } if (opcionComprar === 2) {
            let opcionPlaca = prompt("elija una marca de placa de video. Nvidia($650) o Amd($335)?").toLowerCase();
            let cantidadComprar = parseInt(prompt("cuantos unidades quieres comprar?"));
            ingresarPlaca(opcionPlaca, cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            }
        } if (opcionComprar === 3) {
            let opcionMemoria = prompt("elija una marca de memoria Ram. kingstone($260) o adata($180)?").toLowerCase();
            let cantidadComprar = parseInt(prompt("cuantos unidades quieres comprar?"));
            ingresarMemoria(opcionMemoria, cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            }
        } if (opcionComprar === 4) {
            break
        }
    }
    valorCarrito(carrito);
}

function mayuscula (palabra){
    let capital = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    return(capital)
}

function armarCard (lista){
    lista.forEach(producto => {
        div.innerHTML += `<div class="card productos_estilo" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Comprar</a>
                        </div>
                        </div>
                        `
    })
}
/*Defino los productos standar de la web*/
function mostrarProductos() {
    let listaFiltro = listaProductos.filter(producto => producto.nombre.includes(filtro.value)) //filtro in line
    if (listaFiltro.length == 0) {
        listaFiltro = listaProductos.filter(producto => producto.nombre.includes(mayuscula(filtro.value))) // verifico si puso la primera letra mayuscula
        if (listaFiltro.length == 0) {
            listaFiltro = listaProductos.filter(producto => producto.nombre.includes(filtro.value.toLowerCase())) // verifico si no uso mayusculas
            if (listaFiltro.length == 0) {
                div.innerHTML = `<img src="./images/productoNoEncontrado.jpg">`
            } else{
                listaFiltro = listaProductos.filter(producto => producto.nombre.includes(filtro.value.toLowerCase())) // sino filtro , limpio el div y ingreso cada item del array filtrado
        div.innerHTML = ""
        armarCard(listaFiltro)
            }
        } else {
            listaFiltro = listaProductos.filter(producto => producto.nombre.includes(mayuscula(filtro.value))) // sino filtro , limpio el div y ingreso cada item del array filtrado
        div.innerHTML = ""
        armarCard(listaFiltro)
        }
    } else {
        listaFiltro = listaProductos.filter(producto => producto.nombre.includes(filtro.value)) // sino filtro , limpio el div y ingreso cada item del array filtrado
        div.innerHTML = ""
        armarCard(listaFiltro)
    }
}
listaProductos.forEach(producto => {
    div.innerHTML += `<div class="card productos_estilo" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                    </div>
                    `
})

filtro.addEventListener("keyup",mostrarProductos)

/*funcion para comprar pc*/

function comprarPc() {
    do {
        if (JSON.parse(localStorage.getItem("productos")) == null){
            localStorage.setItem("productos",JSON.stringify(listaProductos))
        }
        inputComprar = parseInt(prompt("Desea: 1)Armar una computadora 2)Comprar Componentes 3)Ver total de compras 4)Crear producto 5)Salir"));
        while (inputComprar != 1 && inputComprar != 2 && inputComprar != 3 && inputComprar != 4 && inputComprar != 5) {
            alert("Valor ingresado no valido.");
            inputComprar = parseInt(prompt("Desea: 1)Armar una computadora 2)Comprar Componentes 3)Salir"));
        }
        if (inputComprar === 1) {
            armarPc();
            mostrarPc();
            valorCarrito(carrito); // agregar solo valor carrito al salir (3) y solo si el carrito no es vacio. 
        } if (inputComprar === 2) {
            comprarComponentes();
        } if (inputComprar === 3) {
            valorCarrito(carrito);
        } if (inputComprar === 4) {
            crearProducto();
        }
    } while (inputComprar !== 5)
    alert("Gracias, vuelva pronto!.");
}


setTimeout(comprarPc, 100);
