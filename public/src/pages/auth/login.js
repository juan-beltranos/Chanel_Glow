import { api } from '../../api/barberAPI.js';
import { mostrarAlerta } from '../../components/Alert.js'

const btnLogin = document.querySelector('#login')

// Listeners
btnLogin.addEventListener('click', login)

async function login(e) {
    e.preventDefault();

    const correo = document.querySelector('#email').value
    const contraseña = document.querySelector('#contraseña').value

    if (correo === "" || contraseña === "") return mostrarAlerta('Correo y contraseña obligatorios', 'error', '.formulario')
    
    const datos = new FormData();

    datos.append('email', correo);
    datos.append('contraseña', contraseña);

    try {
        // Petición hacia la api
        const respuesta = await fetch(`${api}/login`, {
            method: 'POST',
            body: datos,
        });

        const resultado = await respuesta.json();

        if (resultado.tipo === 'error') return mostrarAlerta(resultado.mensaje, 'error', '.formulario')

        if (resultado.login) {
            localStorage.setItem('user', `${resultado.nombre} ${resultado.apellido}`)
            localStorage.setItem('id', resultado.id_user)
            mostrarAlerta('Inicio de sesion exitoso', 'exito', '.formulario')
            if (resultado.admin === '1') {
                setTimeout(() => {window.location.href = "/src/pages/admin/admin.html"}, 1500);
            } else {
                setTimeout(() => {window.location.href = "/src/pages/citas/citas.html"}, 1500);
            }
        }

    } catch (error) {
        console.log(error);
    }

}