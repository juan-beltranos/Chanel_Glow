import { api } from '../api/barberAPI.js';

const btnLogin = document.querySelector('#login')

// Listeners
btnLogin.addEventListener('click', login)

async function login(e) {
    e.preventDefault();
    
    const correo = document.querySelector('#email').value
    const contraseña = document.querySelector('#contraseña').value
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

        console.log(resultado);
      
        if (resultado.login) {
          window.location.href = "/src/pages/citas.html"
        }

    } catch (error) {
        console.log(error);
    }

}