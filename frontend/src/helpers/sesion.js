import { api } from '../api/barberAPI.js'

export function validarSesion() {

    if (localStorage.length <= 0) {
        window.location.href = "/"
    }
}

export function cerrarSesion() {

    const btnLogout = document.querySelector('#cerrar-sesion')

    btnLogout.addEventListener('click', async () => {

        try {
            const resultado = await fetch(`${api}/logout`);

            const respuesta = await resultado.status;
            console.log(respuesta);

            if (respuesta == 200) {
                localStorage.clear()
                window.location.href = "/"
            }
        } catch (error) {
            console.log(error);
        }
    })
}