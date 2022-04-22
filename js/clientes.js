// Variables y constante
const eventoOnClick = "click";
let arrayImagenes = new Array();
recuperoEvento();

// fucion para simular un dowload de imagen
function download() {
    var a = document.createElement("a");
    a.href = "./imagenes", "Codesource_Logo.png";
    a.setAttribute("download", "tusImagenes.zip");
    a.click();
}



//Funcion para abrir las imagenes
function cargarImagenes() {
    let seccionImagenes = document.getElementById("seccionImagenes");
    if (seccionImagenes.className == "container-xxl my-5 p-3") {
        seccionImagenes.className = "visually-hidden-focusable"
    } else {
        seccionImagenes.className = "container-xxl my-5 p-3"
        /// agrego evento al boton para cargar imagenes
        document.getElementById("btnDescargaCompleta").addEventListener("click", download);

    };
}

//Funcion para armar las coleciones de objetos de un evento ficticio
function recuperoEvento() {

    let usuario = prompt("Ingrese su usuario:");
    let contra = prompt("Ingrese su contraseña:");

    if (login(usuario, contra)) {
        clienteFactory();
        MostrarEvento(new Cliente(usuario));
    } else {
        alert("ingrese usuario y contraseña por favor")
    }
}

function login(pusuario, pcontrasenia) {
    let dbuser = 'a';
    let dbpass = 'a';
    let dbintentos = 3;

    if (!(pusuario == '' && pcontrasenia == '')) {
        while (dbintentos > 0 && (pusuario !== dbuser || pcontrasenia !== dbpass)) {
            pusuario = prompt("Ingrese su usuario:");
            pcontrasenia = prompt("Ingrese su contraseña:");
            dbintentos--;
            if (dbintentos == 0) {
                alert("Ingreso no permitido")
            }
        }
        if (pusuario == dbuser || pcontrasenia == dbpass) {
            return true
            //            recuperoEvento();
        }
    } else {
        return false
        //alert("ingrese usuario y contraseña por favor")
    }
}

//Funcion para cargar y mostarr evento
function MostrarEvento(pCliente) {
    let parrafo;
    let contadorImagenes = 0;
    let msg = `Estimado/a Sr/a ${pCliente.nombreApellido} `
    let seccionCliente = document.getElementById("seccionCliente");

    let article = document.createElement("article");
    article.innerHTML = msg + " Usted nos ha contratado para los siguientes eventos: ";
    seccionCliente.append(article);
    article.className = "h3 aleTitulos";


    //Inicio clico por  eventos
    pCliente.eventos.forEach(unevento => {
        //todo va en un acordion
        msg = `<div class='accordion' id='accordionExample${unevento.eventoID}'><div class='accordion-item'>  <h2 class='accordion-header' id='headingOne${unevento.eventoID}'>    <button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='false' aria-controls='collapseOne'> Evento nro:      <strong>${unevento.eventoID}</strong>    </button>  </h2>  <div id='collapseOne' class='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>    <div class='accordion-body'>Este evento se ha realizado en :${unevento.locacion}; con un precio de $ARG: ${unevento.precio} y con fecha de contratación: ${unevento.fechaContratacion}. con las siguientes fechas/locaciones:`

        //Inicio clico por  fechas de evento
        unevento.fechas.forEach(unafecha => {
            msg = msg + `<p>` + ` ${unafecha.fecha} en la siguiente locación: ${unafecha.locacion} ` + "</p>"
            contadorImagenes = contadorImagenes + (unafecha.imagenes.length)
            //Inicio clico por Imagenes
            unafecha.imagenes.forEach(unaimagen => {
                arrayImagenes.push(unaimagen.imagenID)
                //msg = msg + "\n\t\t" + " con las siguientes imagenes: " + unaimagen.descripcion

            })
            //FIN clico por Imagenes
        })
        //FIN clico por  fechas de evento
        msg = msg + `con un total de <strong>${contadorImagenes}</strong> imagenes, para verlas haga click <button type='button' class='btn btn-link' id='btnVerImagenes'>Aqui</button></div></div></div></div>`
        //Agrego el acordion
        parrafo = document.createElement("p");
        parrafo.innerHTML = msg;
        seccionCliente.append(parrafo);
        
        })
    //FIN clico por  eventos
    // retorno de la funcion
    document.getElementById("btnVerImagenes").addEventListener("click", cargarImagenes);
    
    return msg
}

function clienteFactory() {
    const c = {
        clienteID: "1",
        nombreApellido: "Alejandro Aarón Fruchdman",
        cuit: "20222972303",
        eventos: [{
            eventoID: "11",
            precio: "55458",
            fechaContratacion: "16/4/2020",
            locacion: "Ciudad de Mexico",
            fechas: [{
                fecha: "15/06/2021",
                horaDesde: "20:00",
                horaHasta: "23:59",
                locacion: "locacion de esta fecha",
                observacion: "observacion de fehca",
                imagenes: [{
                    imagenID: 4545,
                    fechaHora: "15:02",
                    duracion: "0",
                    objeto: "objeto",
                    descripcion: "descripcion de la foto"
                }, {
                    imagenID: 4546,
                    fechaHora: "15:08",
                    duracion: "120",
                    objeto: "objeto",
                    descripcion: "descripcion del video"
                }]
            }],
            presupuestos: [{
                fechaDesde: "02/05/2022",
                fechaHasta: "05/07/2022",
                fechaContrato: "01/06/2021",
                fechaPresupuesto: "31/05/2021",
                locacion: "Salones varios del cliente",
                precio: "500000",
                nombre: "Presupuesto para Ale",
                descripcion: "Prueba de evento",
                observaciones: "sin observaciones",
                cantidadFotos: "50",
                cantidadVideos: "200",
                tipo: "social",
                fechaDesde: "01/01/2002",
                fechaHasta: "31/05/2022",
                vendido: "false"
            }]
        }, {
            eventoID: "12",
            precio: "120222",
            fechaContratacion: "1/4/2021",
            locacion: "Ciudad de Bs.As",
            fechas: [{
                fecha: "15/06/2021",
                horaDesde: "20:00",
                horaHasta: "23:59",
                locacion: "locacion de esta fecha",
                observacion: "observacion de fehca",
                imagenes: [{
                    imagenID: 4545,
                    fechaHora: "15:02",
                    duracion: "0",
                    objeto: "objeto",
                    descripcion: "descripcion de la foto"
                }, {
                    imagenID: 4546,
                    fechaHora: "15:08",
                    duracion: "120",
                    objeto: "objeto",
                    descripcion: "descripcion del video"
                }]
            }, {
                fecha: "10/07/2021",
                horaDesde: "22:00",
                horaHasta: "23:09",
                locacion: "salon el loco",
                observacion: "sin observacion de fehca",
                imagenes: [{
                    imagenID: 4565,
                    fechaHora: "12:02",
                    duracion: "0",
                    objeto: "objeto",
                    descripcion: "descripcion de la foto"
                }, {
                    imagenID: 4566,
                    fechaHora: "15:18",
                    duracion: "1200",
                    objeto: "objeto",
                    descripcion: "descripcion del video"
                }, {
                    imagenID: 4567,
                    fechaHora: "15:19",
                    duracion: "1200",
                    objeto: "objeto",
                    descripcion: "descripcion del video"
                }, {
                    imagenID: 4568,
                    fechaHora: "15:20",
                    duracion: "1200",
                    objeto: "objeto",
                    descripcion: "descripcion del video"
                }, {
                    imagenID: 4569,
                    fechaHora: "15:21",
                    duracion: "1200",
                    objeto: "objeto",
                    descripcion: "descripcion del video"
                }, {
                    imagenID: 4570,
                    fechaHora: "15:00",
                    duracion: "1200",
                    objeto: "objeto",
                    descripcion: "descripcion del video"
                }]
            }],
            presupuestos: [{
                fechaDesde: "02/05/2022",
                fechaHasta: "05/07/2022",
                fechaContrato: "01/06/2021",
                fechaPresupuesto: "31/05/2021",
                locacion: "Salones varios del cliente",
                precio: "500000",
                nombre: "Presupuesto para Ale",
                descripcion: "Prueba de evento",
                observaciones: "sin observaciones",
                cantidadFotos: "50",
                cantidadVideos: "200",
                tipo: "social",
                fechaDesde: "01/01/2002",
                fechaHasta: "31/05/2022",
                vendido: "false"
            }, {
                fechaDesde: "03/05/2022",
                fechaHasta: "08/07/2022",
                fechaContrato: "09/08/2021",
                fechaPresupuesto: "31/05/2021",
                locacion: "Salones varios del cliente",
                precio: "500001",
                nombre: "Presupuesto para alguien",
                descripcion: "Prueba de evento 2",
                observaciones: "sin observaciones",
                cantidadFotos: "50",
                cantidadVideos: "200",
                tipo: "laboral",
                fechaDesde: "01/01/2002",
                fechaHasta: "31/05/2022",
                vendido: "true"
            }]
        }]
    }
    //convierto a cliente objeto a cliente json
    const clienteJSON = JSON.stringify(c)
    //guardo el clienteJson en localStorege
    localStorage.setItem("cliente", clienteJSON);
}