import { api } from '../../api/barberAPI.js';
import { mostrarAlerta } from '../../components/Alert.js'

const btnRegistro = document.querySelector('#registro')

// Listeners
btnRegistro.addEventListener('click', login)

async function login(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value
    const apellido = document.querySelector('#apellido').value
    const telefono = document.querySelector('#telefono').value
    const correo = document.querySelector('#email').value
    const contraseña = document.querySelector('#contraseña').value
    const contraseña2 = document.querySelector('#contraseña2').value

    if (nombre === "" || apellido === "" || telefono === "" || correo === "" || contraseña === "" || contraseña2 === "") return mostrarAlerta('Todos los campos son obligatorios', 'error', '.formulario')

    if (contraseña !== contraseña2) return mostrarAlerta('Las contraseñas no son iguales', 'error', '.formulario')


    const datos = new FormData();

    datos.append('nombre', nombre);
    datos.append('apellido', apellido);
    datos.append('email', correo);
    datos.append('contraseña', contraseña);
    datos.append('telefono', telefono);
    datos.append('admin', 0);
    datos.append('confirmado', 0);
    datos.append('token', '');

    try {
        // Petición hacia la api
        const respuesta = await fetch(`${api}/usuarios`, {
            method: 'POST',
            body: datos,
        });

        const resultado = await respuesta.json();


        if (resultado.tipo === 'error') {
            return mostrarAlerta(resultado.mensaje, 'error', '.formulario')
        } else {
            mostrarAlerta(resultado.mensaje, 'exito', '.formulario')
            setTimeout(() => { window.location.href = "/index.html" }, 2000);
        }

    } catch (error) {
        console.log(error);
    }

}