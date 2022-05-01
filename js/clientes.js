// Variables y constante
let id_token = "";
const eventoOnClick = "click";
let arrayImagenes = new Array();
recuperoEvento();

// function loginOath() {
//     if (id_token = "") {
//         let miDiv = document.getElementById("divOnSigIn")
//         miDiv.style = style = "display: inline;"
//         onSignIn()
//     }else {onSignOut()}
// }

// function onSignIn(googleUser) {
//     try {
//         var profile = googleUser.getBasicProfile();
//         console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//         console.log('Name: ' + profile.getName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//         id_token = googleUser.getAuthResponse().id_token;
//         console.log(id_token);
//     } catch {}
// }

// function onSignOut(googleUser) {
//     id_token = ""
//     var auth2 = api.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log("User Sign Out");
//     });
// }


// funcion para simular un dowload de imagen
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
    let usuario = ""
    let contra = ""

    Swal
        .fire({
            title: "Ingrese su usuario",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                usuario = resultado.value;
                /// pido contraseña
                Swal
                    .fire({
                        title: "Ingrese su contraseña",
                        input: "text",
                        showCancelButton: true,
                        confirmButtonText: "Guardar",
                        cancelButtonText: "Cancelar",
                    })
                    .then(resultado => {
                        if (resultado.value) {
                            contra = resultado.value;

                            if (login(usuario, contra)) {
                                mostrarEvento(new Cliente(usuario));
                            } else {
                                alert("ingrese usuario y contraseña por favor")
                                // Swal.fire({
                                //     icon: 'error',
                                //     text: 'ingrese NO permitido!',
                                //   })
                            }
                        }
                    });

            }
        });
}
// function recuperoEvento() {

//     let usuario = prompt("Ingrese su usuario:");
//     let contra = prompt("Ingrese su contraseña:");

//     if (login(usuario, contra)) {
//         clienteFactory();
//         MostrarEvento(new Cliente(usuario));
//     } else {
//         alert("ingrese usuario y contraseña por favor")
//     }
// }

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
        return (pusuario == dbuser || pcontrasenia == dbpass ? true : false)
    } else {
        return false
        //alert("ingrese usuario y contraseña por favor")
    }
}

//Funcion para cargar y mostarr evento
function mostrarEvento(pCliente) {
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
        msg = msg + `con un total de <strong>${contadorImagenes}</strong> imagenes, para verlas haga click <button type='button' class='btn btn-link' id='btnVerImagenes${unevento.eventoID}' onclick=cargarImagenes()>Aqui</button></div></div></div></div>`
        //Agrego el acordion
        parrafo = document.createElement("p");
        parrafo.innerHTML = msg;
        seccionCliente.append(parrafo);

    })
    //FIN clico por  eventos
    // retorno de la funcion

    return msg
}
