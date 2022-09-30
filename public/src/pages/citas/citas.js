import { api } from "../../api/barberAPI.js";
import { mostrarAlerta } from "../../components/Alert.js";
import { fechaFormateada, deshabilitarFechasAnteriores } from "../../helpers/fechas.js";
import { validarSesion , cerrarSesion} from "../../helpers/sesion.js";

import Swal from 'sweetalert2'

let paso = 1;
let pasoIncial = 1;
let pasoFinal = 3;

const cita = {
    nombre: "",
    fecha: "",
    hora: "",
    servicios: [],
};

document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    validarSesion()

    mostrarSeccion();
    tabs();
    botonesPaginador();
    paginaSiguiente();
    paginaAnterior();
    getServicios();
    nombreCliente();
    seleccionarFecha();
    deshabilitarFechasAnteriores();
    seleccionarHora();
    mostrarResumen();
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

function paginaSiguiente() {
    const paginaAnterior = document.querySelector("#anterior");
    paginaAnterior.addEventListener("click", function () {
        if (paso <= pasoIncial) return;
        paso--;
        botonesPaginador();
    });
}

function paginaAnterior() {
    const paginaSiguiente = document.querySelector("#siguiente");
    paginaSiguiente.addEventListener("click", function () {
        if (paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    });
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

        const nombreServicio = document.createElement("P");
        nombreServicio.classList.add("nombre-servicio");
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement("P");
        precioServicio.classList.add("precio-servicio");
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement("DIV");
        servicioDiv.classList.add("servicio");
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio);
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector("#servicios").appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    // Comprobar si un servicio ya fue agregado
    if (servicios.some((agregado) => agregado.id === id)) {
        cita.servicios = servicios.filter((agregado) => agregado.id !== id);
        divServicio.classList.remove("seleccionado");
    } else {
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add("seleccionado");
    }
}

function nombreCliente() {
    document.querySelector("#nombre").value = localStorage.getItem('user')
    document.querySelector("#nombreCliente").textContent = localStorage.getItem('user')
    cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector("#fecha");
    inputFecha.addEventListener("input", function (e) {
        const dia = new Date(e.target.value).getUTCDay();

        if ([0].includes(dia)) {
            e.target.value = "";
            mostrarAlerta("Los domingos no abrimos.", "error", ".formulario");
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    const inputHora = document.querySelector("#hora");
    inputHora.addEventListener("input", function (e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if (hora < 9 || hora > 18) {
            e.target.value = "";
            mostrarAlerta("hora no valida, cerrado", "error", ".formulario");
        } else {
            cita.hora = e.target.value;
        }
    });
}

function mostrarResumen() {
    const resumen = document.querySelector(".contenido-resumen");

    // Limpia contenido de resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes("") || cita.servicios.length === 0) {
        return mostrarAlerta(
            "faltan datos o servicios",
            "error",
            ".contenido-resumen",
            false
        );
    }

    const { nombre, fecha, hora, servicios } = cita;

    // Header servicios resumen
    const headerServicios = document.createElement("H2");
    headerServicios.textContent = "Resumen de Servicios";
    resumen.appendChild(headerServicios);

    servicios.forEach((servicio) => {
        const { id, precio, nombre } = servicio;

        const contenedorServicio = document.createElement("DIV");
        contenedorServicio.classList.add("contenedor-servicios");

        const txtServicio = document.createElement("P");
        txtServicio.textContent = nombre;

        const precioServicio = document.createElement("P");
        precioServicio.innerHTML = `<span>Precio:</span> ${precio}`;

        contenedorServicio.appendChild(txtServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    // Header servicios resumen
    const headerCita = document.createElement("H2");
    headerCita.textContent = "Resumen de Cita";
    resumen.appendChild(headerCita);

    const nombreCliente = document.createElement("P");
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    const fechaCita = document.createElement("P");
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada(fecha)}`;

    const horaCita = document.createElement("P");
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    // Boton reservar cita
    const divBotton = document.createElement("DIV");
    divBotton.classList.add("txt-center");
    divBotton.style.marginBottom = "20px";
    const botonReservar = document.createElement("BUTTON");
    botonReservar.classList.add("boton");
    botonReservar.textContent = "Reservar Cita";
    divBotton.appendChild(botonReservar);
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(divBotton);
}

async function reservarCita() {

    const { fecha, hora, servicios } = cita

    const idServicios = servicios.map(servicio => servicio.id)

    const datos = new FormData();

    datos.append("fecha", fecha);
    datos.append("hora", hora);
    datos.append("usuarioId", localStorage.getItem('id'));
    datos.append("servicios", idServicios.toString());

    try {
        const respuesta = await fetch(`${api}/citas`, {
            method: "POST",
            body: datos
        });
        const resultado = await respuesta.json();

        if (resultado.respuesta.tipo === 'exito') {
            Swal.fire(
                'Muy bien!',
                resultado.respuesta.mensaje,
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

}
