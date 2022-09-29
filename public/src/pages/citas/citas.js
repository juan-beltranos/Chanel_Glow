import { api } from '../../api/barberAPI.js'

let paso = 1
let pasoIncial = 1
let pasoFinal = 3

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion();
    tabs();
    botonesPaginador()
    paginaSiguiente()
    paginaAnterior()

    getServicios()
}

function mostrarSeccion() {

    //  Ocultar la seccion que tenga la clase mostrar
    const seccionAnterior = document.querySelector('.mostrar')
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar')
    }

    // Seleccionar la seccion con el paso
    const seccion = document.querySelector(`#paso-${paso}`)
    seccion.classList.add('mostrar')

    // Borra la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual')
    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`)
    tab.classList.add('actual')
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button')
    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso)
            mostrarSeccion()
            botonesPaginador()
        })
    })
}

function botonesPaginador() {
    const pagAnterior = document.querySelector('#anterior')
    const pagSiguiente = document.querySelector('#siguiente')

    if (paso === 1) {
        pagAnterior.classList.add('ocultar-paginador')
        pagSiguiente.classList.remove('ocultar-paginador')

    } else if (paso === 3) {
        pagAnterior.classList.remove('ocultar-paginador')
        pagSiguiente.classList.add('ocultar-paginador')

    } else {
        pagAnterior.classList.remove('ocultar-paginador')
        pagSiguiente.classList.remove('ocultar-paginador')
    }
    mostrarSeccion()
}

function paginaSiguiente() {

    const paginaAnterior = document.querySelector('#anterior')
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoIncial) return
        paso--;
        botonesPaginador()
    })

}

function paginaAnterior() {
    const paginaSiguiente = document.querySelector('#siguiente')
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return
        paso++;
        botonesPaginador()
    })
}

// API CRUD
async function getServicios() {

    try {
        const resultado = await fetch(`${api}/servicios`)
        const servicios = await resultado.json()
        mostrarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {

        const { id, nombre, precio } = servicio

        const nombreServicio = document.createElement('P')
        nombreServicio.classList.add('nombre-servicio')
        nombreServicio.textContent = nombre

        const precioServicio = document.createElement('P')
        precioServicio.classList.add('precio-servicio')
        precioServicio.textContent = `$${precio}`

        const servicioDiv = document.createElement('DIV')
        servicioDiv.classList.add('servicio')
        servicioDiv.dataset.idServicio = id
        servicioDiv.onclick = function () { seleccionarServicio(servicio) }

        servicioDiv.appendChild(nombreServicio)
        servicioDiv.appendChild(precioServicio)

        document.querySelector('#servicios').appendChild(servicioDiv)

    })
}

function seleccionarServicio(servicio) {
    const { servicios } = cita
    cita.servicios = [...servicios, servicio]

    console.log(cita);

}