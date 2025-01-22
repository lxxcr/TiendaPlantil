//Capturamos los datos con los que vamos a interactuar en el dom (grid,carrito, bottones)

//grid productos
const sectionGrid = document.querySelector('#product .grid');

/* //icono carrito
const cart = document.getElementById('cart')

cart.addEventListener("click", () => {
    alert("¡Ícono clicado!");
}); */
/* const buttons = document.querySelectorAll('.flex button'); //array de botones */


// Función pintar item(producto) carrito
function printCartItem(cartContainer, product) {
    let cartItem = cartContainer.querySelector(`[data-id='${product.id}']`);

    if (cartItem) {
        // Actualizar cantidad y total
        const quantitySpan = cartItem.querySelector('.quantity');
        const totalSpan = cartItem.querySelector('.total');
        const newQuantity = Number(quantitySpan.textContent) + 1;

        quantitySpan.textContent = newQuantity;
        totalSpan.textContent = `${newQuantity * product.precio} €`;
    } else {
        // Crear un nuevo elemento en el carrito
        cartItem = document.createElement('li');
        cartItem.dataset.id = product.id;
        cartItem.innerHTML = `${product.nombre} - <span class="quantity">1</span> x ${product.precio} € = <span class="total">${product.precio} €</span>`;
        cartContainer.appendChild(cartItem);
    }
}

//FUNCIÓN PARA CREAR EVENTO DEL BOTON QUE AÑADE EL PRODUCTO AL CARRITO
function addProduct(event) {
    const id = Number(event.target.dataset.productid);
    const productAdd = products.find(product => product.id === id);

    if (productAdd) {
        const cartContainer = document.getElementById('cart');
        printCartItem(cartContainer, productAdd);
        console.log(`Producto añadido: ${productAdd.nombre}`);
    } else {
        console.error('Producto no encontrado.');
    }

}

//Función pintar un producto
function printOneProduct(product, dom) {
    const article = document.createElement('article'); //<article></article>
    const figure = document.createElement('figure'); //<figure></figure>
    const img = document.createElement('img'); //<img src="" alt="">
    img.src = product.imagen
    img.alt = product.nombre

    const div = document.createElement('div'); //<div></div>
    div.classList.add('content'); //añadiendo clase del div
    div.innerHTML = `<h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                    <h6>${product.precio} &euro;</h6>`

    const button = document.createElement('button'); // <button></button>
    button.textContent = '+';
    button.addEventListener('click', addProduct); // Evento click
    button.dataset.productid = product.id; // Asociar el ID del producto

    figure.appendChild(img);  // img hijo de figure
    article.append(figure, div, button); //figure,div,button hijos de article
    dom.appendChild(article);
}

//1º pintar el listado completo de plantas
function printAllProducts(list, dom) {
    list.forEach(product => printOneProduct(product, dom))
}


printAllProducts(products, sectionGrid)  //inicializamos la función