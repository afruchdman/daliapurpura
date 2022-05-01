$(function () {
    $("#inputFechaDesde").datepicker({
        dateFormat: "dd/mm/yy"
    });
    $("#inputFechaHasta").datepicker({
        dateFormat: "dd/mm/yy"
    });

});



let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    //DATOS OBLIGATORIOS Nombre evento + cantidad Fotos y cantidad Videos + fecha de evento
    valorRetorno = true;
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento
    let form = e.target
    //Limpio los msg de warning
    apagarMsg(form)

    if (form.inputNombre.value.length == 0) {
        let l = document.getElementById("WarningInputNombre")
        l.className = "warningObligatorioOn"
        valorRetorno = false;
    }
    if (form.inputCantFotos.value.length == 0) {
        let l = document.getElementById("WarningInputCantFotos")
        l.className = "warningObligatorioOn"
        valorRetorno = false;
    }
    if (form.inputCantVideos.value.length == 0) {
        let l = document.getElementById("WarningInputCantVideos")
        l.className = "warningObligatorioOn"
        valorRetorno = false;
    }
    if (form.inputFechaDesde.value.length == 0) {
        let l = document.getElementById("WarningInputFechaDesde")
        l.className = "warningObligatorioOn"
        valorRetorno = false;
    }
    if (valorRetorno == true) {
        apagarMsg(form);

        if (validarNumero(form.inputCantFotos.value) == false) {

            let l = document.getElementById("WarningInputCantFotos")
            l.className = "warningObligatorioOn"
            l.innerText += `\n La cantidad de fotos ingresada debe ser numérico`
            form.inputCantFotos.focus();
        } else {
            if (validarNumero(form.inputCantVideos.value) == false) {
                let l = document.getElementById("WarningInputCantVideos")
                l.className = "warningObligatorioOn"
                l.innerText += `\n La cantidad de videos ingresada debe ser númerico`
                form.inputCantVideos.focus();
            } else {
                presupuestar(form)
            }
        }
    }
};

function apagarMsg(form) {
    let l = document.getElementById("WarningInputNombre")
    l.className = "warningObligatorioOff"

    l = document.getElementById("WarningInputCantFotos")
    l.className = "warningObligatorioOff"

    l = document.getElementById("WarningInputCantVideos")
    l.className = "warningObligatorioOff"

    l = document.getElementById("WarningInputFechaDesde")
    l.className = "warningObligatorioOff"
}

function presupuestar(form) {
    const miPresupuesto = new Presupuesto(form.inputFechaDesde.value, form.inputFechaHasta.value, form.inputCantFotos.value, form.inputCantVideos.value, form.inputDescripcion.value, form.inputObservacion.value, form.inputNombre.value, form.inputLocacion.value)
    let miPrecio = miPresupuesto.ImporteFinal()

    //alert(`Gracias por su interes, el presupuesto tiene un valor de $ARS${miPrecio}!!`)

    //convierto a cliente objeto a cliente json
    const miPresupuestoJSON = JSON.stringify(miPresupuesto)
    //guardo el clienteJson en localStorege
    localStorage.setItem("miPresupuesto", miPresupuestoJSON);

    Swal.fire({
            title: 'Presupuesto!',
            text: `Gracias por su interes, el presupuesto tiene un valor de $ARS${miPrecio}!!`,
            imageUrl: '../images/daliapurpura.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Icono de dalia purpura',
        })
        .then(resultado => {
            form.submit()
        });

}

function validarNumero(pDato) {
    try {
        //funcion q valida el dato de ingreso como numerico
        if (isNaN(pDato)) {
            return false
        } else {
            return true
        }
    } catch {
        return false
    }
}

function validarFecha(pDato) {
    //funcion q valida el dato de ingreso como fecha
    try {
        let dtRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (dtRegex.test(pDato) == false && pDato != null) {
            return false
        } else {
            return true
        }
    } catch {
        return flase
    }
}

function validarObligatorios(pform) {
    //funcion q valida el array de entrada q sea distinto de vacio
    try {
        let valorRetorno = true;


        if (pform.inputNombre.value.length == 0) {
            let l = document.getElementById("WarningInputNombre")
            l.className = "warningObligatorioOn"
            valorRetorno = false;
        }
        if (pform.inputCantFotos.value.length == 0) {
            let l = document.getElementById("WarningInputCantFotos")
            l.className = "warningObligatorioOn"
            valorRetorno = false;
        }
        if (pform.inputCantVideos.value.length == 0) {
            let l = document.getElementById("WarningInputCantVideos")
            l.className = "warningObligatorioOn"
            valorRetorno = false;
        }
        if (pform.inputFechaDesde.value.length == 0) {
            let l = document.getElementById("WarningInputFechaDesde")
            l.className = "warningObligatorioOn"
            valorRetorno = false;
        }

        return valorRetorno
    } catch {
        return false
    }
}