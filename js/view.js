//Capturamos los datos con los que vamos a interactuar en el dom (grid,carrito, bottones)

//grid productos
const sectionGrid = document.querySelector('#product .grid');

//icono carrito
const cart = document.getElementById('cart')

cart.addEventListener("click", () => {
    alert("¡Ícono clicado!");
});
/* const buttons = document.querySelectorAll('.flex button'); //array de botones */


const carrito = [];

// Función pintar el carrito
function printCarrito() {
    const cartContainer = document.getElementById('carrito');
    cartContainer.innerHTML = ''; //Limpie el carrito antes de volver a pintarlo */

    carrito.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.nombre} - ${product.precio} €`;
        cartContainer.appendChild(li);
    });

}

//FUNCIÓN PARA CREAR EVENTO DEL BOTON QUE AÑADE EL PRODUCTO AL CARRITO
function addProduct(event) {
    let id = Number(event.target.dataset.productid);
    let productAdd = products.find(product => product.id === id);
    carrito.push(productAdd);
    console.log(productAdd);
    printCarrito();
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