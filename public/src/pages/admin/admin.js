import { api } from "../../api/barberAPI.js";
import { mostrarAlerta } from "../../components/Alert.js";
import { validarSesion, cerrarSesion } from "../../helpers/sesion.js";

import Swal from 'sweetalert2'

let paso = 1;
const listadoCitas = document.querySelector('.listado-citas');


document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    validarSesion()
    mostrarSeccion();
    tabs();
    nombreCliente();
    crearServicio()
    getCitas()
    getServicios()
    cerrarSesion()
}

function mostrarSeccion() {
    //  Ocultar la seccion que tenga la clase mostrar
    const seccionAnterior = document.querySelector(".mostrar");
    if (seccionAnterior) {
        seccionAnterior.classList.remove("mostrar");
    }

    // Seleccionar la seccion con el paso
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add("mostrar");

    // Borra la clase de actual al tab anterior
    const tabAnterior = document.querySelector(".actual");
    if (tabAnterior) {
        tabAnterior.classList.remove("actual");
    }

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add("actual");
}

function tabs() {
    const botones = document.querySelectorAll(".tabs button");
    botones.forEach((boton) => {
        boton.addEventListener("click", function (e) {
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const pagAnterior = document.querySelector("#anterior");
    const pagSiguiente = document.querySelector("#siguiente");

    if (paso === 1) {
        pagAnterior.classList.add("ocultar-paginador");
        pagSiguiente.classList.remove("ocultar-paginador");
    } else if (paso === 3) {
        pagAnterior.classList.remove("ocultar-paginador");
        pagSiguiente.classList.add("ocultar-paginador");
        mostrarResumen();
    } else {
        pagAnterior.classList.remove("ocultar-paginador");
        pagSiguiente.classList.remove("ocultar-paginador");
    }
    mostrarSeccion();
}

function nombreCliente() {
    document.querySelector("#nombreCliente").textContent = localStorage.getItem('user')
}

function getCitas() {
    const fechaCita = document.querySelector('#fechaCita')
    fechaCita.addEventListener('input', async function (e) {
        const fecha = e.target.value;
        try {
            const resultado = await fetch(`${api}/citasClientes?fecha=${fecha}`);
            const citas = await resultado.json();
            if (citas.length === 0) {
                listadoCitas.innerHTML = ''
                return mostrarAlerta('No hay citas en esta fecha', 'error', '.listado-citas')
            }
            mostrarCitas(citas);
        } catch (error) {
            console.log(error);
        }
    })

}

function mostrarCitas(citas) {
    listadoCitas.innerHTML = ''

    let idCita;

    citas.forEach(cita => {

        const { cliente, precio, hora, servicio, telefono, id, email } = cita;

        if (idCita !== id) {
            const ul = document.createElement('UL')
            const li = document.createElement('LI')
            ul.classList.add('citas')

            li.innerHTML = `
                <p>ID: <span>${id}</span></p>
                <p>Hora: <span>${hora}</span></p>
                <p>Cliente: <span>${cliente}</span></p>
                <p>Correo: <span>${email}</span></p>
                <p>Telefono: <span>${telefono}</span></p>
                <h2>Servicios</h2>
            `
            idCita = id

            ul.appendChild(li);
            listadoCitas.appendChild(ul)
        }

        const servicioTxt = document.createElement('P');
        servicioTxt.classList.add('servicioCita')
        servicioTxt.textContent = `${servicio} : ${precio}`
        console.log(precio);

        listadoCitas.appendChild(servicioTxt)

    })
}

async function getServicios() {
    try {
        const resultado = await fetch(`${api}/servicios`);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach((servicio) => {
        const { id, nombre, precio } = servicio;

        const contenedorDatos = document.createElement('DIV')
        contenedorDatos.classList.add('contenedor-datos')

        const nombreServicio = document.createElement("P");
        nombreServicio.classList.add("nombre-servicio");
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement("P");
        precioServicio.classList.add("precio-servicio");
        precioServicio.textContent = `$${precio}`;

        contenedorDatos.appendChild(nombreServicio)
        contenedorDatos.appendChild(precioServicio)

        const servicioDiv = document.createElement("DIV");
        servicioDiv.classList.add("servicio-admin");
        servicioDiv.dataset.idServicio = id;


        // Botones
        const contenedorBotones = document.createElement('DIV')
        const btnEditar = document.createElement('BUTTON')
        btnEditar.classList.add('btn-editar')
        btnEditar.textContent = 'Actualizar'
        btnEditar.onclick = function () {
            actualizarServicio(servicio.id);
        };

        const btnEliminar = document.createElement('BUTTON')
        btnEliminar.classList.add('btn-eliminar')
        btnEliminar.textContent = 'Eliminar'
        btnEliminar.onclick = function () {
            eliminarServicio(servicio.id);
        };

        contenedorBotones.appendChild(btnEditar)
        contenedorBotones.appendChild(btnEliminar)
        servicioDiv.appendChild(contenedorDatos);
        servicioDiv.appendChild(contenedorBotones);

        document.querySelector("#servicios").appendChild(servicioDiv);
    });
}

async function crearServicio() {

    const btnCrearServicio = document.querySelector('#crear-servicio')

    btnCrearServicio.addEventListener('click', async function () {

        const nombreServicio = document.querySelector('#nombreServicio').value
        const precioServicio = document.querySelector('#precioServicio').value

        const datos = new FormData();

        datos.append("nombre", nombreServicio);
        datos.append("precio", precioServicio);

        try {
            const respuesta = await fetch(`${api}/servicios`, {
                method: "POST",
                body: datos
            });
            const resultado = await respuesta.json();

            console.log(resultado);

            if (resultado.tipo === 'error') {
                mostrarAlerta(resultado.msg, 'error', '.formulario')
            } else {
                Swal.fire(
                    'Muy bien!',
                    resultado.mensaje,
                    'success'
                ).then(() => {
                    window.location.reload()
                })
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al guardar la cita',
            })
        }
    })

}

async function eliminarServicio(servicioId) {

    try {
        const respuesta = await fetch(`${api}/servicios/eliminar?id=${servicioId}`, { method: "POST" });
        const resultado = await respuesta.json();

        if (resultado.tipo === 'exito') {
            Swal.fire(
                'Muy bien!',
                resultado.mensaje,
                'success'
            ).then(() => {
                window.location.reload()
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al eliminar la cita',
        })
    }
}

async function actualizarServicio(servicioId) {
    console.log(servicioId);
}