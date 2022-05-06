
//Funcion que carga el json de clientes y eventos para pagina de clientes
async function clienteFactory() {
    await fetch("../js/eventos.json")
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("cliente", JSON.stringify(data));
        }).catch((error) => {
            console.log(error);
        });
}

//Clase de presupuestos
class Presupuesto {
    fechaContrato;
    fechaPresupuesto;
    locacion;
    precio;
    nombre;
    descripcion;
    observaciones;
    cantidadFotos;
    cantidadVideos;
    tipo;
    fechaDesde;
    fechaHasta;
    vendido;
    nombre;
    locacion;

    //constructor de Presupuestos
    constructor(pfechaDesde, pfechaHasta, pcantidadFotos, pcantidadVideos, pdescripcion, pobservaciones, pnombre, plocacion) {
        this.fechaContrato = null;
        this.fechaPresupuesto = Date.now;
        this.locacion = null;
        this.precio = null;
        this.nombre = null;
        this.descripcion = pdescripcion;
        this.observaciones = pobservaciones;
        this.cantidadFotos = pcantidadFotos;
        this.cantidadVideos = pcantidadVideos;
        this.tipo = null;
        this.fechaDesde = pfechaDesde;
        this.fechaHasta = pfechaHasta;
        this.vendido = false;
        this.nombre = pnombre;
        this.locacion = plocacion;
    };

    //Metodo que calcula el importe Bruto del evento, segun cantidad de fotos, de videos
    precioBruto() {
        let precio = 0;

        if (this.cantidadFotos == 0) {
            precio = 0;
        } else if (this.cantidadFotos > 0 && this.cantidadFotos <= 10) {
            precio = 100
        } else if (this.cantidadFotos > 10 && this.cantidadFotos <= 20) {
            precio = 200
        } else if (this.cantidadFotos > 20 && this.cantidadFotos <= 50) {
            precio = 400
        } else {
            precio = 700
        };

        if (this.cantidadVideos == 0) {
            precio = precio + 0
        } else if (this.cantidadVideos > 0 && this.cantidadVideos <= 10) {
            precio = precio + 500
        } else if (this.cantidadVideos > 10 && this.cantidadVideos <= 20) {
            precio = precio + 2000
        } else if (this.cantidadVideos > 20 && this.cantidadVideos <= 50) {
            precio = precio + 5000
        } else {
            precio = precio + 10000
        };

        return this.precio = precio;
    };
    //Metodo que calcula el importe con el IVA
    ImporteFinal() {
        this.precioBruto();
        this.precio = this.precio * 1.21;
        return this.precio;
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
    objeto; // este objeto seria la imagen o video en base64
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

//fecha
class Fecha {
    fecha;
    horaDesde;
    horaHasta;
    locacion;
    observacion;
    imagenes = new Array(); //este array tiene la colección de imagenes correspondientes a esa fecha de evento

    //Constructor de la clase
    constructor(phoraDesde, phoraHasta, pLocacion, pobservacion) {
        this.fecha = new Date();
        this.horaDesde = phoraDesde;
        this.horaHasta = phoraHasta;
        this.locacion = pLocacion;
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
    constructor(pusuario) {
        return this.getByCliente(pusuario)
    }

    //Constructor de la clase
    // constructor(pNombreApellido, pcuit) {
    //     this.clienteID = Math.trunc(Math.random() * 10000);
    //     this.NombreApellido = pNombreApellido;
    //     this.cuit = pcuit;
    //     // Recupero eventos del cliente
    //     this.eventos = this.getEventosByCliente(this.clienteID);
    // }

    getEventosByCliente(pclienteID) {
        //Se recuperan los eventos del cliente según pclienteID
        // El parametro pclienteID no lo utilizo aún, cuando tenga el reposotorio buscao por este dato
        let lista = new Array();
        //para simular el retorno hago new hardcode, solo retorno un evento para el cliente        
        lista.push(new Evento(100500, "07/04/2022", "Ciudad de bs. as."));
        return lista
    }

    getByCliente(pDNI) {
        //Se recuperan el cliente según DNI
        // El parametro pDNI no lo utilizo aún, cuando tenga el reposotorio buscao por este dato
        // retorno un cliente hardcodeado


        // this.clienteID = 1;
        // this.nombreApellido = "Alejandro Fruchdman"
        // this.cuit = 20222972303
        // this.eventos = this.getEventosByCliente(this.clienteID);

        const c = JSON.parse(localStorage.getItem("cliente"));
        if (c == null) {
            console.log("entro aca")
            setTimeout(() => {
                clienteFactory();
                c = JSON.parse(localStorage.getItem("cliente"));
            }, 5000)
        }
        return c ? c : null
    }

    findEventoByID(peventoID) {
        // Metodo que busca un determonado Id de evento
        // El parametro peventoID no lo utilizo aún, cuando tenga el reposotorio buscao por este dato

        let listaEventos = new Array();
        listaEventos = this.getEventosByCliente(this.clienteID) //Obtenemos la lista completa de eventos del cliente
        const miEvento = listaEventos.find(miE => miE.eventoID === peventoID) // busco en la lista el objeto con id igual al parametro de entrada    
        return miEvento;
    }

}

//Clase Evento
class Evento {
    eventoID;
    precio;
    fechaContratacion;
    locacion;
    fechas = new Array();
    presupuestos = new Array(); //Array para la colección de los presupuestos previos al evento.

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
    getPresupuestosByEvento(peventoID) {
        //Se recuperan los presupuestos del evento según peventoID
        // El parametro peventoIDID no lo utilizo aún, cuando tenga el reposotorio buscao por este dato

        let lista = new Array();
        lista.push(new Presupuesto("01/01/2000", "02/01/2000", 50, 10, "Presupuesto primero de evento"));
        return lista;
    }
    getFechasByEvento(peventoID) {
        let lista = new Array();
        //Se recuperan las fechas del evento según peventoID
        // El parametro peventoID no lo utilizo aún, cuando tenga el reposotorio buscao por este dato

        lista.push(new Fecha("21:00", "21:30", "el gran salon", "sin observacion"));
        lista.push(new Fecha("22:20", "24:00", "Otro salon", "lluvia todo ese dia"));
        lista.push(new Fecha("22:20", "23:20", "Parque centenario", "todo muy bien"));
        return lista
    }

}