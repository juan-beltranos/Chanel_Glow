
document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    getProductos()
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

    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    products.forEach(product => {

        console.log(product);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.images[0].url}" alt="${product.name}">
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-price">$${product.dropshipper.price}</p>
                <a href="https://tatianaestetica.rocketfy.co/producto/${product.slug}" target="_blank" class="card-button">Comprar</a>
            </div>
        `;

        container.appendChild(card);
    });
}

