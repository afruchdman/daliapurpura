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

//Clase Imagen
class Imagen {
    imagenID;
    fechaHora;
    duracion;
    objeto;// este objeto seria la imagen o video en base64
    descripcion;
    //Constructor de la clase
    constructor(pfechaHora, pduracion, pobjeto, pdescripcion) {
        this.imagenID = Math.trunc(Math.random() * 10000);
        this.fechaHora = pfechaHora;
        this.duracion = pduracion;
        this.objeto = pobjeto;
        this.descripcion = pdescripcion
    }

}

//fechaEvento
class FechaEvento {
    fecha;
    horaDesde;
    horaHasta;
    Locacion;
    observacion;
    imagenes = new Array(); //este array tiene la colección de imagenes correspondientes a esa fecha de evento

    //Constructor de la clase
    constructor(phoraDesde, phoraHasta, pLocacion, pobservacion) {
        this.fecha = new Date();
        this.horaDesde = phoraDesde;
        this.horaHasta = phoraHasta;
        this.Locacion = pLocacion;
        this.observacion = pobservacion;
        this.imagenes = this.getImagenesByFechaEvento(this.fecha)

    }
    getImagenesByFechaEvento(pfecha) {
        let lista = new Array();
        //Se recuperan las Imagenes de la fecha según pfecha
        lista.push(new Imagen("21:01", 120, "objetoVideo01", "video del novio y novia"));
        lista.push(new Imagen("21:05", 0, "objetoimagen01", "foto novio"));
        lista.push(new Imagen("22:00", 0, "objetoimagen02", "foto novia"));
        lista.push(new Imagen("22:30", 360, "objetoVideo02", "video del paisaje"));
        return lista;
    }
}

//Clase Cliente
class Cliente {
    clienteID;
    nombreApellido;
    cuit;
    eventos = new Array(); // array para la colección de los eventos del cliente.

    //Constructor de la clase
    constructor(pNombreApellido, pcuit) {
        this.clienteID = Math.trunc(Math.random() * 10000);
        this.NombreApellido = pNombreApellido;
        this.cuit = pcuit;
        // Recupero eventos del cliente
        this.eventos = this.getEventosByCliente(this.clienteID);
    }

    getEventosByCliente(pclienteID) {
        //Se recuperan los eventos del cliente según pclienteID
        let lista = new Array();
        //para simular el retorno hago new hardcode, solo retorno un evento para el cliente        
        lista.push(new Evento(100500, "07/04/2022", "Ciudad de bs. as."));
        return lista
    }

    getByCliente(pDNI) {
        //Se recuperan el cliente según DNI
        // retorno un cliente hardcodeado
        this.nombreApellido ="Alejandro Fruchdman"
        this.cuit = 20222972303
        return (this)
    }
    
    findEventoByID(peventoID){
        // Metodo que busca un determonado Id de evento
        let listaEventos=new Array();
        listaEventos = this.getEventosByCliente(this.clienteID) //Obtenemos la lista completa de eventos del cliente
        const miEvento=listaEventos.find(miE=>miE.eventoID === peventoID) // busco en la lista el objeto con id igual al parametro de entrada    
        return miEvento;
    }

}

//Clase Evento
class Evento {
    eventoID;
    precio;
    fechaContratacion;
    locacion;
    cliente;
    fechas = new Array();
    presupuestos = new Array();//Array para la colección de los presupuestos previos al evento.

    //Constructor
    constructor(pprecio, pfechaContratacion, plocacion) {
        this.eventoID = Math.trunc(Math.random() * 10000);
        this.precio = pprecio;
        this.fechaContratacion = pfechaContratacion;
        this.locacion = plocacion;
        //        this.cliente = new Cliente("Alejandro Fruchdman", 20222972303);
        this.presupuestos = this.getPresupuestosByEvento(this.eventoID)
        this.fechas = this.getFechasByEvento(this.eventoID)
    }
    getPresupuestosByEvento(peventoId) {
        //Se recuperan los presupuestos del evento según peventoID
        let lista = new Array();
        lista.push(new Presupuesto("01/01/2000", "02/01/2000", 50, 10, "Presupuesto primero de evento"));
        return lista;
    }
    getFechasByEvento(peventoID) {
        let lista = new Array();
        //Se recuperan las fechas del evento según peventoID
        lista.push(new FechaEvento("21:00", "21:30", "el gran salon", ""));
        lista.push(new FechaEvento("22:20", "24:00", "Otro salon", ""));
        lista.push(new FechaEvento("22:20", "23:20", "Parque centenario", ""));
        return lista
    }

}
