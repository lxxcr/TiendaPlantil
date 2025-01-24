//Capturamos los datos con los que vamos a interactuar en el dom (grid,carrito, bottones(paginación)(opcional))

/* const buttons = document.querySelectorAll('.flex button'); //array de botones */


//grid productos
const sectionGrid = document.querySelector('#product .grid');

//icono carrito
const cartIcon = document.getElementById('cartIcon');

cartIcon.addEventListener("click", () => {
    document.getElementById('cart').classList.toggle('active')
});
const carrito = document.querySelector(' #cart .carrito');





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
        // Crear un nuevo item
        cartItem = document.createElement('li');
        cartItem.dataset.id = product.id;
        cartItem.innerHTML = `${product.nombre} - <span class="quantity">1</span> x ${product.precio} € = <span class="total">${product.precio} €</span><button class="btn-increase">+</button><button class="btn-decrease">-</button><button class="btn-remove">Eliminar</button>`;


        // Asociar eventos a los botones
        cartItem.querySelector('.btn-increase').addEventListener('click', () => increaseQuantity(product.id));
        cartItem.querySelector('.btn-decrease').addEventListener('click', () => decreaseQuantity(product.id));
        cartItem.querySelector('.btn-remove').addEventListener('click', () => removeProduct(product.id));

        cartContainer.appendChild(cartItem);
    }
}

//FUNCIÓN PARA CREAR EVENTO DEL BOTON QUE AÑADE EL PRODUCTO AL CARRITO
function addProduct(event) {
    const id = Number(event.target.dataset.productid);
    const productAdd = products.find(product => product.id === id);

    const cartContainer = document.getElementById('cartItem');

    printCartItem(cartContainer, productAdd);
    calculateTotal();
}

//Función para borrar Item(producto) del carrito

function removeProduct(id) {
    const cartContainer = document.getElementById('cart');
    const cartItem = cartContainer.querySelector(`[data-id='${id}']`);
    cartItem.remove();
    calculateTotal();
}

//Función para aumentar la cantidad de un producto

function increaseQuantity(id) {
    const cartContainer = document.getElementById('cart');
    const cartItem = cartContainer.querySelector(`[data-id='${id}']`);

    if (cartItem) {
        const quantitySpan = cartItem.querySelector('.quantity');
        const totalSpan = cartItem.querySelector('.total');
        const newQuantity = Number(quantitySpan.textContent) + 1;

        quantitySpan.textContent = newQuantity;
        totalSpan.textContent = `${newQuantity * products.find(product => product.id === id).precio} €`;
        console.log(totalSpan.textContent);

    } else {
        console.error('Producto no encontrado.');
    }
    calculateTotal();
}

//Funcion para disminuir la cantidad de un producto

function decreaseQuantity(id) {
    const cartContainer = document.getElementById('cart');
    const cartItem = cartContainer.querySelector(`[data-id='${id}']`);

    if (cartItem) {
        const quantitySpan = cartItem.querySelector('.quantity');
        const totalSpan = cartItem.querySelector('.total');
        const newQuantity = Number(quantitySpan.textContent) - 1;

        if (newQuantity > 0) {
            quantitySpan.textContent = newQuantity;
            totalSpan.textContent = `${newQuantity * products.find(product => product.id === id).precio} €`;
        } else {
            removeProduct(id);
        }

    } else {
        console.error('Producto no encontrado.');
    }
    calculateTotal();
}

//Función para calcular el total del valor del producto

function calculateTotal() {
    const cartTotal = document.getElementById('total');
    const cartItems = document.querySelectorAll('#cart li');
    let total = 0;


    cartItems.forEach(item => {
        const totalSpan = item.querySelector('.total');
        total += parseFloat(totalSpan.textContent.replace(' €', ''));
    });

    cartTotal.textContent = `Total: ${total.toFixed(2)} €`; // Mostrar con 2 decimales
}



//Funcion para borrar todo el carrito


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