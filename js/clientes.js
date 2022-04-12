// Variables y constante
const eventoOnClick = "click";
recuperoEvento();




//Funcion para armar las coleciones de objetos de un evento ficticio
function recuperoEvento() {

    let usuario = prompt("Ingrese su usuario:");
    let contra = prompt("Ingrese su contraseña:");

    if (login(usuario, contra)) {
        miCliente = new Cliente();
        miCliente.getByCliente(1);
        MostrarEvento(miCliente);
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
    
    let contadorImagenes=0;
    let msg = `Estimado/a Sr/a ${pCliente.nombreApellido} ` 
    let seccionCliente = document.getElementById("seccionCliente");

    let article = document.createElement("article");
    article.innerHTML = msg + " Usted nos ha contratado para los siguientes eventos: ";
    seccionCliente.append(article);
    article.className = "h3 aleTitulos";


    //Inicio clico por  eventos
    pCliente.eventos.forEach(unevento => {
    //todo va en un acordion
        msg = `<div class='accordion' id='accordionExample'><div class='accordion-item'>  <h2 class='accordion-header' id='headingOne'>    <button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'> Evento nro:      ${unevento.eventoID}    </button>  </h2>  <div id='collapseOne' class='accordion-collapse collapse show' aria-labelledby='headingOne' data-bs-parent='#accordionExample'>    <div class='accordion-body'>Este evento se ha realizado en :${unevento.locacion}; con un precio de $ARG: ${unevento.precio} y con fecha de contratación: ${unevento.fechaContratacion}. con las siguientes fechas/locaciones:`

        //Inicio clico por  fechas de evento
        unevento.fechas.forEach(unafecha => {
            msg = msg + `\n`+ ` ${unafecha.fecha}/${unafecha.locacion} `
            contadorImagenes=contadorImagenes + (unafecha.imagenes.length)
            //Inicio clico por Imagenes
            unafecha.imagenes.forEach(unaimagen => {
                //msg = msg + "\n\t\t" + " con las siguientes imagenes: " + unaimagen.descripcion

            })
            //FIN clico por Imagenes
        })
        //FIN clico por  fechas de evento
    })
    //FIN clico por  eventos
    msg = msg + `con un total de <strong>${contadorImagenes} </strong>imagenes, para verlas haga click aqui</div></div></div></div>`
    
    //Agrego el acordion
    let parrafo = document.createElement("p");
    parrafo.innerHTML = msg;
    seccionCliente.append(parrafo);
    return msg
}