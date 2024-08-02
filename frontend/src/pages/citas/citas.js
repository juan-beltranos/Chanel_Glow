import { api } from "../../api/barberAPI.js";
import { mostrarAlerta } from "../../components/Alert.js";
import { fechaFormateada, deshabilitarFechasAnteriores } from "../../helpers/fechas.js";
import { validarSesion, cerrarSesion } from "../../helpers/sesion.js";

import Swal from 'sweetalert2'

let paso = 1;
let pasoIncial = 1;
let pasoFinal = 3;

let idUsuario = null

const cita = {
    nombre: "",
    fecha: "",
    hora: "",
    servicios: [],
};

const listadoCitas = document.querySelector('.listado-citas');

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
    getCitasCliente()
    seleccionarFecha();
    deshabilitarFechasAnteriores();
    seleccionarHora();
    mostrarResumen();
    validarUsuario()
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

    getCitasCliente()
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
    } else if (paso === 4) {
        pagAnterior.classList.add("ocultar-paginador");
        pagSiguiente.classList.add("ocultar-paginador");
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
        precioServicio.textContent = `$${formatearPrecio(precio)}`;

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
    console.log(servicio);
    
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

function formatearPrecio(precio) {
    return Number(precio).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function mostrarResumen() {
    cita.nombre = document.querySelector('#nombre').value

    const resumen = document.querySelector(".contenido-resumen");

    // Limpia contenido de resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    
    if (Object.values(cita).includes("") || cita.servicios.length === 0) {
        return mostrarAlerta(
            "Faltan datos o servicios",
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

    let totalPrecio = 0;

    servicios.forEach((servicio) => {
        const { precio, nombre } = servicio;

        totalPrecio += Number(precio);

        const contenedorServicio = document.createElement("DIV");
        contenedorServicio.classList.add("contenedor-servicios");

        const txtServicio = document.createElement("P");
        txtServicio.textContent = nombre;

        const precioServicio = document.createElement("P");
        precioServicio.innerHTML = `<span>Precio:</span> ${formatearPrecio(precio)}`;

        contenedorServicio.appendChild(txtServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    // Mostrar el total de los precios
    const totalServicios = document.createElement("P");
    totalServicios.classList.add("total-servicios");
    totalServicios.innerHTML = `<span>Total a pagar:</span> ${formatearPrecio(totalPrecio)}`;
    resumen.appendChild(totalServicios);

    // Header de cita resumen
    const headerCita = document.createElement("H2");
    headerCita.textContent = "Resumen de Cita";
    resumen.appendChild(headerCita);

    const nombreCliente = document.createElement("P");
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    const fechaCita = document.createElement("P");
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada(fecha)}`;

    const horaCita = document.createElement("P");
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    // Botón para reservar cita
    const divBoton = document.createElement("DIV");
    divBoton.classList.add("txt-center");
    divBoton.style.marginBottom = "20px";
    const botonReservar = document.createElement("BUTTON");
    botonReservar.classList.add("boton");
    botonReservar.textContent = "Reservar Cita";
    divBoton.appendChild(botonReservar);
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(divBoton);
}

async function reservarCita() {


    // Crear el usuario
    if (!localStorage.getItem('id')) { idUsuario = await crearUsuario() }

    // reservar la cita con el usuario creado anteriormente

    const { fecha, hora, servicios } = cita

    const idServicios = servicios.map(servicio => servicio.id)

    const datos = new FormData();


    datos.append("fecha", fecha);
    datos.append("hora", hora);
    datos.append("usuarioId", localStorage.getItem('id') ? localStorage.getItem('id') : idUsuario);
    datos.append("servicios", idServicios.toString());

    try {
        const respuesta = await fetch(`${api}/citas`, { method: "POST", body: datos });
        const resultado = await respuesta.json();

        if (resultado.respuesta.tipo === 'exito') {
            Swal.fire(
                'Muy bien!',
                resultado.respuesta.mensaje,
                'success'
            ).then(() => {
                paso = 4
                mostrarSeccion()
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

async function getCitasCliente() {

    try {
        const resultado = await fetch(`${api}/citasClientes?id_cliente=${localStorage.getItem('id') ? localStorage.getItem('id') : idUsuario}`);
        const citas = await resultado.json();
        if (citas.length === 0) return mostrarAlerta('No has reservado una cita aun', 'error', '.listado-citas', false)
        mostrarCitas(citas);
    } catch (error) {
        console.log(error);
    }

}

function mostrarCitas(citas) {
    listadoCitas.innerHTML = '';

    let idCita = null;
    let totalPrecio = 0;
    let ul = null;
    let DivAcciones = null;

    citas.forEach(cita => {
        const { precio, fecha, hora, servicio, id } = cita;

        // Si el id de la cita actual es diferente del idCita almacenado
        if (idCita !== id) {
            // Si ya existe una ul, añadimos el total y el botón de cancelar a la cita anterior
            if (ul) {
                const totalServicios = document.createElement("P");
                totalServicios.classList.add("total-servicios");
                totalServicios.innerHTML = `<span>Total a pagar:</span> ${formatearPrecio(totalPrecio)}`;

                const btnCancelarCita = document.createElement('BUTTON');
                btnCancelarCita.textContent = 'Cancelar cita';
                btnCancelarCita.classList.add('btn-eliminar');
                btnCancelarCita.style.height = 'auto';
                btnCancelarCita.addEventListener('click', function () { cancelarCita(idCita) });

                DivAcciones.appendChild(totalServicios);
                DivAcciones.appendChild(btnCancelarCita);

                ul.appendChild(DivAcciones);
                listadoCitas.appendChild(ul);
            }

            // Reseteamos los valores para la nueva cita
            totalPrecio = 0; // Reiniciar total de precio
            idCita = id; // Actualizar el ID de la cita

            // Crear nueva lista y div de acciones
            ul = document.createElement('UL');
            ul.classList.add('citas');

            const li = document.createElement('LI');
            li.innerHTML = `
                <p>ID: <span>${id}</span></p>
                <p>Hora: <span>${hora}</span></p>
                <p>Fecha: <span>${fechaFormateada(fecha)}</span></p>
                <h2>Servicios</h2>
            `;
            ul.appendChild(li);

            DivAcciones = document.createElement('DIV');
            DivAcciones.classList.add('opciones');
        }

        // Añadir el servicio actual a la lista de servicios
        totalPrecio += Number(precio); // Sumar el precio al total
        const servicioTxt = document.createElement('P');
        servicioTxt.classList.add('servicioCita');
        servicioTxt.textContent = `${servicio} : ${formatearPrecio(precio)}`;
        DivAcciones.appendChild(servicioTxt);
    });

    // Añadir el total y el botón de cancelar para la última cita
    if (ul) {
        const totalServicios = document.createElement("P");
        totalServicios.classList.add("total-servicios");
        totalServicios.innerHTML = `<span>Total a pagar:</span> ${formatearPrecio(totalPrecio)}`;

        const btnCancelarCita = document.createElement('BUTTON');
        btnCancelarCita.textContent = 'Cancelar cita';
        btnCancelarCita.classList.add('btn-eliminar');
        btnCancelarCita.style.height = 'auto';
        btnCancelarCita.addEventListener('click', function () { cancelarCita(idCita) });

        DivAcciones.appendChild(totalServicios);
        DivAcciones.appendChild(btnCancelarCita);

        ul.appendChild(DivAcciones);
        listadoCitas.appendChild(ul);
    }
}

async function cancelarCita(id) {

    Swal.fire({
        title: 'Estas seguro/a de cancelar la cita?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const respuesta = await fetch(`${api}/citas/eliminar?id=${id}`, { method: "POST" });
                const resultado = await respuesta.json();
                Swal.fire(
                    'Muy bien!',
                    resultado.mensaje,
                    'success'
                ).then(() => {
                    window.location.reload()
                })
            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cancelar la cita',
                })
            }

        }
    })

}

async function crearUsuario() {

    const nombre = document.querySelector('#nombre').value
    const apellido = document.querySelector('#apellido').value
    const telefono = document.querySelector('#telefono').value
    const correo = document.querySelector('#email').value


    if (nombre === "" || apellido === "" || telefono === "" || correo === "") return mostrarAlerta('Todos los campos son obligatorios', 'error', '.formulario')


    const datos = new FormData();

    datos.append('nombre', nombre);
    datos.append('apellido', apellido);
    datos.append('email', correo);
    datos.append('contraseña', telefono);
    datos.append('telefono', telefono);
    datos.append('admin', 0);
    datos.append('confirmado', 0);
    datos.append('token', '');

    try {
        
        const respuesta = await fetch(`${api}/usuarios`, { method: 'POST', body: datos });
        const resultado = await respuesta.json();

        if (resultado.tipo === 'error') {
            return console.log('Error creando el usuario');
        } else {
            console.log('Usuario creado correctamente');
            return resultado.usuario_id.id
        }

    } catch (error) {
        console.log(error);
    }

}

async function validarUsuario() {

    const nombre = document.querySelector('#nombre')
    const barra = document.querySelector('.barra')

    const apellido = document.querySelector('#campoApellido')
    const telefono = document.querySelector('#campoTelefono')
    const correo = document.querySelector('#campoCorreo')

    if (localStorage.getItem('id')) {
        apellido.style.display = "none"
        telefono.style.display = "none"
        correo.style.display = "none"
        nombre.disabled = true
    } else {
        barra.style.display = "none"
    }

}