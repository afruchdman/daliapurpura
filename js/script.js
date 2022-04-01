//Clase de presupuestos
class Presupuesto {
    //constructor de Presupuestos
    constructor(pfechaDesde, pfechaHasta, pcantidadFotos, pcantidadVideos, pdescripcion) {
        this.fechaDesde = null;
        this.fechaHasta = null;
        this.fechaContrato = null;
        this.fechaPresupuesto = Date.now;
        this.locacion = null;
        this.precio = null;
        this.nombre = null;
        this.descripcion = pdescripcion
        this.observaciones = null;
        this.cantidadFotos = pcantidadFotos;
        this.cantidadVideos = pcantidadVideos;
        this.tipo = null;
        this.fechaDesde = pfechaDesde;
        this.fechaHasta = pfechaHasta;
        this.vendido = false;
    };

    //Metodo que calcula el importe Bruto del evento, segun cantidad de fotos, de videos
    precioBruto() {
        let precio = 0;

        if (this.cantidadFotos == 0) {
            //console.log("0");
            precio = 0;
        } else if (this.cantidadFotos > 0 && this.cantidadFotos <= 10) {
            //console.log("a");
            precio = 100
        } else if (this.cantidadFotos > 10 && this.cantidadFotos <= 20) {
            //console.log("b");
            precio = 200
        } else if (this.cantidadFotos > 20 && this.cantidadFotos <= 50) {
            //console.log("c");
            precio = 400
        } else {
            //console.log("d");
            precio = 700
        };

        if (this.cantidadVideos == 0) {
            //console.log("00");
            precio = precio + 0
        } else if (this.cantidadVideos > 0 && this.cantidadVideos <= 10) {
            //console.log("e");
            precio = precio + 500
        } else if (this.cantidadVideos > 10 && this.cantidadVideos <= 20) {
            //console.log("f");
            precio = precio + 2000
        } else if (this.cantidadVideos > 20 && this.cantidadVideos <= 50) {
            //console.log("g");
            precio = precio + 5000
        } else {
            //console.log("h");
            precio = precio + 10000
        };

        return this.precio = precio;
    };

    //Metodo que calcula el importe con el IVA
    ImporteFinal() {
        this.precioBruto();
        //       //console.log(this.precio);
        this.precio = this.precio * 1.21;
    }

    //Metodo para marcar como vendido el evento
    vender() {
        this.vendido = true;
    }
};

//Funcion para ingresar dato y validar tipo de datos
function IngresarDato(pMsg, tipo) {
    let dtRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    let dato = prompt(pMsg);

    if (tipo == "NUMERO") {
        while (isNaN(dato)) {
            dato = prompt(`El dato debe ser númerico por favor! ${pMsg}`)
        }
    } else if (tipo == "FECHA") {
        //console.log(dato)
        //console.log(dtRegex.test(dato) == false && dato != null)
        while (dtRegex.test(dato) == false && dato != null) {
            dato = prompt(`El formato de fecha debe ser dd/mm/yyyy! ${pMsg}`)
        }
    }
    return dato;
}