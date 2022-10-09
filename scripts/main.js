const iva = 1.21;
const carrito = [];

/*Declaracion clase producto*/
class Producto {
    constructor(nombre, categoria, precio, stock) {
        this.nombre = nombre;
        this.categoria = categoria;
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
            carrito.push(new Producto(this.nombre, this.categoria, this.precio, cantidadNumero))  //agrego el objeto comprado al carrito.
            this.stock -= cantidadNumero;
            this.precio = precioOriginal; // devuelvo el precio original al producto.

        } else {
            alert("No tenemos stock disponible. Disculpe las molestias");
        }
    };
}
/*Funcion Para sacar el valor total del carrito*/
function valorCarrito(carrito) {
    const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.stock), 0) * 1.21;
    alert("el valor total de la compra es de: $" + totalCarrito)
    return (totalCarrito)
}
/*Declaracion productos nuevos*/
const producto1 = new Producto("Intel", "Procesador", 300, 50);
const producto2 = new Producto("Amd", "Procesador", 150, 50);
const producto3 = new Producto("Nvidia", "Placa de video", 650, 50);
const producto4 = new Producto("Amd", "Placa de video", 335, 50);
const producto5 = new Producto("Kingstone", "Memoria ram", 260, 50);
const producto6 = new Producto("Segate", "Electronica", 180, 50);

/*Inicio Definicion componentes PC y funciones para ingresar mas de 1 elemento*/
function ingresarProcesador(marca,cantidad) {
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

function ingresarPlaca(marca,cantidad) {
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

function ingresarMemoria(marca,cantidad) {
    let memoriaNueva = marca.toLowerCase();
    while ((memoriaNueva != "kingstone") && (memoriaNueva != "segate")) {
        memoriaNueva = prompt("elija una marca de memoria ram valida. kingstone($260) o segate($180)?").toLowerCase();
    }
    if (memoriaNueva === "kingstone") {
        producto5.comprar(cantidad)
    } else {
        producto6.comprar(cantidad)
    }
}
/*Mostrar los componentes elegidos en armar pc.*/
function mostrarPc() {
    console.log("procesador: " + carrito[0].nombre + " placa de video: " + carrito[1].nombre + " Memoria ram: " + carrito[2].nombre);
}


/*Inicio Funcio para armar una pc*/
function armarPc() {
    let procesadorPc = prompt("elija su marca de procesador. intel ($300) o amd($150)?").toLowerCase();
    ingresarProcesador(procesadorPc,1);
    let placaPc = prompt("elija su marca de placa de video. nvidia($650) o amd($335)?").toLowerCase();
    ingresarPlaca(placaPc,1);
    let memoriaPc = prompt("elija su marca de memoria ram. kingstone($260) o segate($180)?").toLowerCase();
    ingresarMemoria(memoriaPc,1);
}
/*Fin Funcio para armar una pc*/

/*funcion para comprar diferentes componentes y cantidades*/

function comprarComponentes(){
    let agregarMas = "si" 
    let opcionComprar
    while (agregarMas === "si") {
        opcionComprar = parseInt(prompt("que quiere comprar? 1)Procesador 2)Placa de video 3)Memoria ram 4)Salir"));
        while (opcionComprar != 1 && opcionComprar != 2 && opcionComprar != 3 && opcionComprar != 4) {
          alert("Ingrese un valor valido");
          opcionComprar = parseInt(prompt("que quiere comprar? 1)Procesador 2)Placa de video 3)Memoria ram"));
        }
        if(opcionComprar === 1){
            let opcionProcesador = prompt("elija una marca de procesador. intel($300) o amd($150)?").toLowerCase();
            let cantidadComprar = parseInt(prompt("cuantos unidades quieres comprar?"));
            ingresarProcesador(opcionProcesador,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
  }
        } if (opcionComprar ===2){
            let opcionPlaca = prompt("elija una marca de placa de video. Nvidia($650) o Amd($335)?").toLowerCase();
            let cantidadComprar = parseInt(prompt("cuantos unidades quieres comprar?"));
            ingresarPlaca(opcionPlaca,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
  }
        } if (opcionComprar === 3) {
            let opcionMemoria = prompt("elija una marca de memoria Ram. kingstone($260) o segate($180)?").toLowerCase();
            let cantidadComprar = parseInt(prompt("cuantos unidades quieres comprar?"));
            ingresarMemoria(opcionMemoria,cantidadComprar);
            agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
            while (agregarMas != "si" && agregarMas != "no") {
                alert("Valor ingresado no valido. Ingrese si o no.");
                agregarMas = prompt("Desea agregar mas productos? si/no").toLowerCase();
  }
        } if (opcionComprar === 4){
            break
        }
    }
    valorCarrito(carrito);
    alert("Gracias, vuelva pronto!.");
}

/*funcion para comprar pc*/

function comprarPc() {
    let inputComprar = parseInt(prompt("Desea: 1)Armar una computadora 2)Comprar Componentes 3)Salir"));
    while (inputComprar != 1 && inputComprar != 2 && inputComprar != 3) {
        alert("Valor ingresado no valido.");
        inputComprar = parseInt(prompt("Desea: 1)Armar una computadora 2)Comprar Componentes 3)Salir"));
    }
    if (inputComprar === 1) {
        armarPc();
        mostrarPc();
        valorCarrito(carrito);
    } if(inputComprar === 2){
        comprarComponentes();
    } else {
        alert("Gracias, vuelva pronto!.");
    }
}

setTimeout(comprarPc, 100);  