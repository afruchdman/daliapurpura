


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