let procesador;
let precioProcesador = 0;
let placa;
let precioPlaca = 0;
let memoria;
let precioMemoria = 0;
const iva = 1.21;
/*Inicio Definicion componentes PC y funciones para ingresar o cambiar 1 componente*/
function ingresarProcesador(marca) {
    let procesadorNuevo = marca.toLowerCase()
    while ((procesadorNuevo != "amd") && (procesadorNuevo != "intel")) {
        procesadorNuevo = prompt("eliga una marca de procesador valida. intel($300) o amd($150)?").toLowerCase();
    }
    if (procesador === procesadorNuevo) {
        alert("Es el mismo procesador que ya tenias.")
    } else {
        if(procesadorNuevo === "intel"){
            precioProcesador = 300
        } else{
            precioProcesador = 150
        }
        procesador = procesadorNuevo;
        alert("Se agrego un procesador marca " + procesadorNuevo);
    }
}

function ingresarPlaca(marca) {
    let placaNueva = marca.toLowerCase()
    while ((placaNueva != "nvidia") && (placaNueva != "amd")) {
        placaNueva = prompt("eliga una marca de placa de video valida. nvidia($650) o amd($335)?").toLowerCase();
    }
    if (placa === placaNueva) {
        alert("Es la misma placa de video que ya tenias.")
    } else {
        if(placaNueva === "nvidia"){
            precioPlaca = 650
        } else{
            precioPlaca = 335
        }
        placa = placaNueva;
        alert("se agrego una placa de video marca " + placaNueva);
    }
}

function ingresarMemoria(marca) {
    let memoriaNueva = marca.toLowerCase();
    while ((memoriaNueva != "kingstone") && (memoriaNueva != "segate")) {
        memoriaNueva = prompt("eliga una marca de memoria ram valida. kingstone($260) o segate($180)?").toLowerCase();
    }
    if (memoria === memoriaNueva) {
        alert("Es la misma memoria ram que ya tenias.")
    } else {
        if(memoriaNueva === "kingstone"){
            precioMemoria = 260
        } else{
            precioMemoria = 180
        }
        memoria = memoriaNueva;
        alert("se agrego una memoria ram marca " + memoriaNueva);
    }
}

function mostrarPc() {
  console.log("procesador: " + procesador + " placa de video: " + placa + " Memoria ram: " + memoria);
}
/*Fin Definicion componentes PC*/

/*Inicio Funcio para armar una pc*/
function armarPc(){
    let procesadorPc = prompt("eliga su marca de procesador. intel ($300) o amd($150)?").toLowerCase();
    ingresarProcesador(procesadorPc)
    let placaPc = prompt("eliga su marca de placa de video. nvidia($650) o amd($335)?").toLowerCase();
    ingresarPlaca(placaPc)
    let memoriaPc = prompt("eliga su marca de memoria ram. kingstone($260) o segate($180)?").toLowerCase();
    ingresarMemoria(memoriaPc)
}
/*Fin Funcio para armar una pc*/

/*Inicio Funciones para sacar precio co y sin iva*/
function precio(){
    let precioSinIva = 0
    if (precioProcesador!= 0 && precioPlaca !=0 && precioMemoria != 0){
        precioSinIva = precioProcesador + precioPlaca + precioMemoria
        return(precioSinIva)
    } else{
        alert("No se puede saber el precio si no se arma la pc!")
        return(precioSinIva)
    }
}

function precioFinal(){
    let precioFinalConIva = 0;
    return(precioFinalConIva = (precio()*iva))
}
/*Fin Funciones para sacar precio co y sin iva*/
/*funcion para comprar pc*/
function comprarPc(){
    let inputComprar = prompt("Desea armar una computadora? si/no").toLowerCase();
    while(inputComprar != "si" && inputComprar != "no"){
        alert("Valor ingresado no valido. Ingrese si o no.")
        inputComprar = prompt("Desea armar una computadora? si/no").toLowerCase();
    }
    if(inputComprar ==="si"){
        armarPc();
        mostrarPc()
        alert("El precio final de su pc con iva incluido es: " + precioFinal());
    } else {
        alert("Vayase a cagar.")
    }
}
setTimeout(comprarPc,100)