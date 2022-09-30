export function fechaFormateada(fecha) {

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const fechaObj = new Date(fecha)

    const mes = fechaObj.getMonth()
    const dia = fechaObj.getDate() + 2
    const year = fechaObj.getFullYear()

    const fechaUTC = new Date(Date.UTC(year, mes, dia))
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones)
    return fechaFormateada
}

export function deshabilitarFechasAnteriores() {

    let fecha = new Date();
    let anio = fecha.getFullYear();
    let dia = fecha.getDate();
    let _mes = fecha.getMonth(); //viene con valores de 0 al 11

    _mes = _mes + 1; //ahora lo tienes de 1 al 12

    if (_mes < 10) {
        var mes = "0" + _mes;
    }
    else {
        var mes = _mes.toString;
    }

    document.querySelector("#fecha").min = anio + '-' + mes + '-' + dia;
}
