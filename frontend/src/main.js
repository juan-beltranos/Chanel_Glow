import { api } from "./api/barberAPI.js";
import { mostrarAlerta } from "./components/Alert.js";
import { formatearPrecio } from "./helpers/moneda.js";

import Swal from 'sweetalert2'

let idUsuario = null

const cita = {
    nombre: "",
    fecha: "",
    hora: "",
    servicios: [],
};

(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    // $('#date').datetimepicker({
    //     format: 'L'
    // });
    // $('#time').datetimepicker({
    //     format: 'LT'
    // });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });


    // Pricing carousel
    $(".pricing-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        loop: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    getServicios();
    seleccionarHora()
    seleccionarFecha()
    reservarCita()
    getProductos()
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

async function getServicios() {
    try {
        const resultado = await fetch(`${api}/servicios`);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

async function crearUsuario() {

    const nombre = document.querySelector('#nombre').value
    const apellido = document.querySelector('#apellido').value
    const telefono = document.querySelector('#telefono').value
    const correo = document.querySelector('#email').value

    cita.nombre = nombre

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
            return { id: resultado.usuario_id.id, name: `${nombre} ${apellido}` }
        }

    } catch (error) {
        console.log(error);
    }

}

async function reservarCita() {

    document.querySelector('#reservarCita').addEventListener('click', async (e) => {
        e.preventDefault()

        // Crear el usuario
        const { id, name } = await crearUsuario()
        idUsuario = id

        // reservar la cita con el usuario creado anteriormente

        const { fecha, hora, servicios } = cita

        const idServicios = servicios.map(servicio => servicio.id)

        const datos = new FormData();

        datos.append("fecha", fecha);
        datos.append("hora", hora);
        datos.append("usuarioId", idUsuario);
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
                    window.location.href = `/pages/citas/citas.html?user=${idUsuario}&name=${name}`
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

async function getProductos() {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "SmrpHhFDyszEDBHihC4ZKXgv0UKTI3ENmMdtfAwNVoQ=");
    myHeaders.append("x-secret", "ff764d7066adf596297479b1d3e3e5e99eba1a60a7dc6659b030a22e40c22f69f6cc5f76bfbdeca0ce6b8d3233736dc74b1956d6de9f11827de5baeac9e2825c.8afaea0f168c4db7");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://ms-public-api.rocketfy.com/rocketfy/api/v1/products?limit=20", requestOptions);
        const result = await response.json();
        mostrarProductos(result);
    } catch (error) {
        console.error(error);
    }
}

function mostrarProductos(products) {
    console.log(products);
}