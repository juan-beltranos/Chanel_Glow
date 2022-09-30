export function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    
    const alertaPrevia = document.querySelector('.alerta')
    if (alertaPrevia)  alertaPrevia.remove()
    
    const alerta = document.createElement('DIV')
    alerta.textContent = mensaje
    alerta.classList.add('alerta')
    alerta.style.marginTop = "20px"
    alerta.classList.add(tipo)

    const referencia = document.querySelector(elemento)
    referencia.appendChild(alerta)

    if (desaparece) {
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
   
}