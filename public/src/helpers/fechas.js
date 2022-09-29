export function fechaEspañol(fecha) {

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const fechaObj = new Date(fecha)

    const mes = fechaObj.getMonth()
    const dia = fechaObj.getDate() + 2
    const year = fechaObj.getFullYear()

    const fechaUTC = new Date(Date.UTC(year, mes, dia))
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones)
    return fechaFormateada
}