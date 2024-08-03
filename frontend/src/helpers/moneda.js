export function formatearPrecio(precio) {
    if (precio.includes('.')) return precio;
    return precio.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}