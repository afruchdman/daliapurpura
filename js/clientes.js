let dbuser = 'a';
let dbpass = 'a';
let dbintentos = 3;

function login(pusuario, pcontrasenia) {



    if (!(pusuario == '' && pcontrasenia == '')) {
        while (dbintentos > 0 && (pusuario !== dbuser || pcontrasenia !== dbpass)) {
            console.log((pusuario !== dbuser || pcontrasenia !== dbpass))
            pusuario = prompt("Ingrese su usuario:");
            pcontrasenia = prompt("Ingrese su contraseña:");
            dbintentos--;
            if (dbintentos == 0) {
                alert("Ingreso no permitido")
            }
        }
        if (pusuario == dbuser || pcontrasenia == dbpass) {
            recuperoEvento();
        }

    } else {
        alert("ingrese usuario y contraseña por favor")
    }
}

//Funcion para armar las coleciones de objetos de un evento ficticio
function recuperoEvento() {
    miCliente = new Cliente();
    miCliente.getByCliente(1);
    console.log(MostrarEvento(miCliente))
}

//Funcion para cargar y mostarr evento
function MostrarEvento(pCliente) {
    let msg = "Estimado Sr/a ";

    msg = msg + pCliente.nombreApellido

    pCliente.eventos.forEach(unevento => {
        msg = msg + "\n" + " su evento: " + unevento.eventoID
        unevento.fechas.forEach(unafecha => {
            msg = msg + "\n\t" + " Dispone de las siguientes locación: " + unafecha.Locacion
            msg = msg + " y fecha: " + unafecha.fecha;
            unafecha.imagenes.forEach(unaimagen => {
                msg = msg + "\n\t\t" + " con las siguientes imagenes: " + unaimagen.descripcion

            })
        })
    })
    return msg
}

