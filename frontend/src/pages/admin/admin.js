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
        });
    });
}

function nombreCliente() {
    document.querySelector("#nombreCliente").textContent = localStorage.getItem('user')
}

function getCitas() {
    const fechaCita = document.querySelector('#fechaCita')
    fechaCita.addEventListener('input', async function (e) {
        const fecha = e.target.value;
        try {
            const resultado = await fetch(`${api}/citas/filtro/${fecha}`); 
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

function mostrarServicios(servicios) {
    servicios.forEach((servicio) => {
        const { id, nombre, precio } = servicio;

        const precioFormateado = precio;

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
            modalFormulario('servicios', servicio);
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

function mostrarCitas(citas) {
    listadoCitas.innerHTML = '';

    let idCita = null;
    let ul = null;
    let li = null;
    let totalPrecio = 0;

    citas.forEach(cita => {
        const { cliente, precio, hora, servicio, telefono, id, email } = cita;

        // Si encontramos una nueva cita, creamos un nuevo <ul> y <li>
        if (idCita !== id) {
            // Si ya existe un <li>, lo añadimos al <ul> y luego añadimos el <ul> al listado
            if (li) {
                const totalServicios = document.createElement("P");
                totalServicios.classList.add("total-servicios");

                // Formatear el total de precios
                const totalPrecioFormateado = totalPrecio.toLocaleString('es-ES', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });

                totalServicios.innerHTML = `<span>Total a pagar:</span> ${totalPrecioFormateado}`;

                li.appendChild(totalServicios);
                ul.appendChild(li);
                listadoCitas.appendChild(ul);
            }

            // Reseteamos valores para la nueva cita
            totalPrecio = 0;
            idCita = id;

            // Crear nuevo <ul> y <li>
            ul = document.createElement('UL');
            ul.classList.add('citas');

            li = document.createElement('LI');
            li.innerHTML = `
                <p>ID: <span>${id}</span></p>
                <p>Hora: <span>${hora}</span></p>
                <p>Cliente: <span>${cliente}</span></p>
                <p>Correo: <span>${email}</span></p>
                <p>Telefono: <span>${telefono}</span></p>
                <h2>Servicios</h2>
            `;

            // Crear contenedor para el botón
            const botonContenedor = document.createElement('DIV');
            botonContenedor.classList.add('boton-contenedor');

            const botonLlenarPlanilla = document.createElement('BUTTON');
            botonLlenarPlanilla.textContent = 'Llenar planilla';
            botonLlenarPlanilla.classList.add('boton');
            botonLlenarPlanilla.addEventListener('click', function () { modalFormulario('cita', id) });

            botonContenedor.appendChild(botonLlenarPlanilla);
            li.appendChild(botonContenedor);
        }

        // Añadir servicio actual al <li>
        totalPrecio += parseFloat(precio.replace(/\./g, '')); // Sumar el precio al total
        const servicioTxt = document.createElement('P');
        servicioTxt.classList.add('servicioCita');
        servicioTxt.textContent = `${servicio} : ${precio}`;
        li.appendChild(servicioTxt);
    });

    // Añadir el total y el botón de cancelar para la última cita
    if (li) {
        const totalServicios = document.createElement("P");
        totalServicios.classList.add("total-servicios");

        // Formatear el total de precios
        const totalPrecioFormateado = totalPrecio.toLocaleString('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        totalServicios.innerHTML = `<span>Total a pagar:</span> ${totalPrecioFormateado}`;

        li.appendChild(totalServicios);

        ul.appendChild(li);
        listadoCitas.appendChild(ul);
    }
}

async function modalFormulario(tipo, datos) {
    let modalExistente = document.querySelector('.modal');
    let modal = document.createElement('DIV');
    modal.classList.add('modal');

    if (modalExistente) { return; }

    if (tipo === 'servicios') {
        const { nombre, precio, id } = datos;

        modal.innerHTML = `
            <form class="formulario actualizar-servicio">
                <h2>Actualizar Servicio</h2>
                <div class="campo">
                    <label for="nombreServicio">Nombre</label>
                    <input type="text" id="nombreServicioActualizado" value="${nombre}" placeholder="Nombre de tu servicio" />
                </div>
                <div class="campo">
                    <label for="precioServicio">Precio</label>
                    <input type="text" value="${precio}" id="precioServicioActualizado" placeholder="Precio de tu servicio" />
                </div>
                <div class="opciones">
                    <input type="submit" value="Actualizar" class="btn-editar" id="actualizar-servicio" />
                    <input type="button" value="Cancelar" class="btn-eliminar cerrar" id="cancelar-servicio" />
                </div>
            </form>
        `;

        // Evento para actualizar servicio
        modal.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-editar')) {
                e.preventDefault(); // Prevenir comportamiento por defecto solo en este caso
                actualizarServicio(id);
            }
        });

        // Evento para cerrar el modal
        modal.addEventListener('click', function (e) {
            if (e.target.classList.contains('cerrar')) {
                e.preventDefault();
                modal.remove();
            }
        });
    } else if (tipo === 'cita') {

        const idCita = datos;
        const idUsuario = localStorage.getItem('id');

        modal.innerHTML = `
            <form class="formulario datos-consulta">
                <h2>Datos de la Consulta</h2>
                <div class="campo">
                    <label class="text-white" for="nombre">Nombre</label>
                    <input type="text" id="nombre" placeholder="Nombre completo" />
                </div>
                <div class="campo">
                    <label class="text-white" for="fecha">Fecha</label>
                    <input type="date" id="fecha" />
                </div>
                <div class="campo">
                    <label class="text-white" for="cc">Cc.</label>
                    <input type="text" id="cc" placeholder="Cédula de ciudadanía" />
                </div>
                <div class="campo">
                    <label class="text-white" for="edad">Edad</label>
                    <input type="number" id="edad" placeholder="Edad" />
                </div>
                <div class="campo">
                    <label class="text-white" for="fechaNacimiento">Fecha de nacimiento</label>
                    <input type="date" id="fechaNacimiento" />
                </div>
                <div class="campo">
                    <label class="text-white" for="estadoCivil">Estado Civil</label>
                    <input type="text" id="estadoCivil" placeholder="Estado civil" />
                </div>
                <div class="campo">
                    <label class="text-white" for="contactoPersonal">Contacto personal</label>
                    <input type="text" id="contactoPersonal" placeholder="Contacto personal" />
                </div>
                <div class="campo">
                    <label class="text-white" for="motivoConsulta">Motivo de la consulta</label>
                    <input type="text" id="motivoConsulta" placeholder="Motivo de la consulta" />
                </div>
                <div class="campo">
                    <label class="text-white" for="patologiaActual">Patología actual</label>
                    <input type="text" id="patologiaActual" placeholder="Patología actual" />
                </div>
                <div class="campo">
                    <label class="text-white" for="fechaUltimoPeriodo">Fecha último periodo</label>
                    <input type="date" id="fechaUltimoPeriodo" />
                </div>
                <div class="campo">
                    <label class="text-white">Regularidad del periodo</label>
                    <div>
                        <input type="radio" id="regular" name="regularidadPeriodo" value="Regular" />
                        <label class="text-white" for="regular">Regular</label>
                        <input type="radio" id="irregular" name="regularidadPeriodo" value="Irregular" />
                        <label class="text-white" for="irregular">Irregular</label>
                    </div>
                </div>
                <div class="campo">
                    <label class="text-white" for="metodoPlanificacion">Método de planificación</label>
                    <input type="text" id="metodoPlanificacion" placeholder="Método de planificación" />
                </div>
                <div class="opciones">
                    <input type="submit" value="Guardar" class="btn-editar btn-guardar-consulta" id="guardar-consulta" />
                    <input type="button" value="Cancelar" class="btn-eliminar cerrar" id="cancelar-consulta" />
                </div>
            </form>
        `;

        // Evento para llenar planilla
        modal.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevenir el envío del formulario por defecto
            if (e.target.classList.contains('datos-consulta')) {
                llenarPlanilla(idCita, idUsuario);
            }
        });

        // Evento para cerrar el modal
        modal.addEventListener('click', function (e) {
            if (e.target.classList.contains('cerrar')) {
                e.preventDefault();
                modal.remove();
            }
        });
    }

    document.querySelector('body').appendChild(modal);
}

async function llenarPlanilla(idCita, idUsuario) {
    const nombre = document.querySelector('#nombre').value;
    const fecha = document.querySelector('#fecha').value;
    const cc = document.querySelector('#cc').value;
    const edad = document.querySelector('#edad').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    const estadoCivil = document.querySelector('#estadoCivil').value;
    const contactoPersonal = document.querySelector('#contactoPersonal').value;
    const motivoConsulta = document.querySelector('#motivoConsulta').value;
    const patologiaActual = document.querySelector('#patologiaActual').value;
    const fechaUltimoPeriodo = document.querySelector('#fechaUltimoPeriodo').value;
    const regularidadPeriodo = document.querySelector('input[name="regularidadPeriodo"]:checked').value;
    const metodoPlanificacion = document.querySelector('#metodoPlanificacion').value;

    const datos = new FormData();
    datos.append("usuario_id", idUsuario);
    datos.append("cita_id", idCita);
    datos.append("nombre", nombre);
    datos.append("fecha", fecha);
    datos.append("cc", cc);
    datos.append("edad", edad);
    datos.append("fechaNacimiento", fechaNacimiento);
    datos.append("estadoCivil", estadoCivil);
    datos.append("contactoPersonal", contactoPersonal);
    datos.append("motivoConsulta", motivoConsulta);
    datos.append("patologiaActual", patologiaActual);
    datos.append("fechaUltimoPeriodo", fechaUltimoPeriodo);
    datos.append("regularidadPeriodo", regularidadPeriodo);
    datos.append("metodoPlanificacion", metodoPlanificacion);

    try {
        const respuesta = await fetch(`${api}/planilla`, {
            method: "POST",
            body: datos
        });
        const resultado = await respuesta.json();

        if (resultado.tipo === 'error') {
            mostrarAlerta(resultado.msg, 'error', '.formulario');
        } else {
            Swal.fire(
                'Muy bien!',
                resultado.mensaje,
                'success'
            ).then(() => {
                window.location.reload();
            });
        }

    } catch (error) {
        console.error('Error al guardar la planilla:', error);
    }
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
                text: 'Hubo un error al crear el servicio',
            })
        }
    })

}

async function eliminarServicio(servicioId) {

    try {
        const respuesta = await fetch(`${api}/servicios/eliminar/${servicioId}`, { method: "POST" });
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
            text: 'Hubo un error al eliminar el servicio, Existen citas realizadas con este servicio',
        })
    }
}

async function actualizarServicio(id) {

    const nombreServicio = document.querySelector('#nombreServicioActualizado').value
    const precioServicio = document.querySelector('#precioServicioActualizado').value
    const datos = new FormData();

    datos.append("nombre", nombreServicio);
    datos.append("precio", precioServicio);

    try {
        const respuesta = await fetch(`${api}/servicios/actualizar/${id}`, {
            method: "POST",
            body: datos
        });
        const resultado = await respuesta.json();

        if (resultado.tipo === 'error') {
            mostrarAlerta(resultado.msg, 'error', '.formulario')
        } else {
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
            text: 'Hubo un error al actualizar el servicio',
        })
    }

}

