let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    //DATOS OBLIGATORIOS Nombre evento + cantidad Fotos y cantidad Videos + fecha de evento

    //Cancelamos el comportamiento del evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento
    let form = e.target
    //Obtengo el valor del primero hijo <input type="text">

    if (validarObligatorios([form.inputNombre.value, form.inputCantFotos.value, form.inputCantVideos.value, form.inputFechaDesde.value])) {
        if (validarNumero(form.inputCantFotos.value) == false) {
            alert(`La cantidad de fotos ingresada ${form.inputCantFotos.value} debe ser númerico`)
            form.inputCantFotos.focus();
        } else {
            if (validarFecha(form.inputFechaDesde.value) == false) {
                alert(`La fecha desde ingresada ${form.inputFechaDesde.value} debe ser fecha`)
                form.inputFechaDesde.focus();
            } else {
                if (validarNumero(form.inputCantVideos.value) == false) {
                    alert(`La cantidad de videos ingresada ${form.inputCantVideos.value} debe ser númerico`)
                    form.inputCantVideos.focus();
                } else {
                    if (form.inputFechaHasta.value.length > 0) {
                        if (validarFecha(form.inputFechaHasta.value) == false) {
                            alert(`La fecha hasta ingresada ${form.inputFechaHasta.value} debe ser fecha`)
                            form.inputFechaHasta.focus();
                        }
                    } else {
                        const miPresupuesto = new Presupuesto(form.inputFechaDesde.value, form.inputFechaHasta.value, form.inputCantFotos.value, form.inputCantVideos.value, form.inputDescripcion.value, form.inputObservacion.value, form.inputNombre.value, form.inputLocacion.value)
                        let miPrecio = miPresupuesto.ImporteFinal()
                        alert(`Gracias por su interes, el presupuesto tiene un valor de $ARS${miPrecio}!!`)

                        //convierto a cliente objeto a cliente json
                        const miPresupuestoJSON = JSON.stringify(miPresupuesto)
                        //guardo el clienteJson en localStorege
                        localStorage.setItem("miPresupuesto", miPresupuestoJSON);
                        this.submit()
                    }
                }
            }
        }
    }
};


function validarNumero(pDato) {
    //funcion q valida el dato de ingreso como numerico
    if (isNaN(pDato)) {
        return false
    } else {
        return true
    }
}

function validarFecha(pDato) {
    //funcion q valida el dato de ingreso como fecha
    let dtRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if (dtRegex.test(pDato) == false && pDato != null) {
        return false
    } else {
        return true
    }
}

function validarObligatorios(pArrayObligarotios) {
    //funcion q valida el array de entrada q sea distinto de vacio
    let valorRetorno = true;
    for (let index = 0; index < pArrayObligarotios.length; index++) {
        if (pArrayObligarotios[index].length == 0) {
            switch (index) {
                case 0:
                    alert("Nombre de evento es obligatorio !!");
                    valorRetorno = false;
                    break
                case 1:
                    alert("La cantidad de fotos es obligatorio !!");
                    valorRetorno = false;
                    break
                case 2:
                    alert("La cantidad de videos es obligatorio !!");
                    valorRetorno = false;
                    break
                case 3:
                    alert("La fecha de evento es obligatoria !!");
                    valorRetorno = false;
                    break
            }
        }
    }
    return valorRetorno
}