//Capturamos los datos con los que vamos a interactuar en el dom (grid,carritobottones)


const sectionGrid = document.querySelector('#product .grid'); //grid productos

const cart = document.getElementById("cart")  //icono carrito

cart.addEventListener("click", () => {
    alert("¡Ícono clicado!");
});
/* const buttons = document.querySelectorAll('.flex button'); //array de botones */


//1º pintar el listado completo de plantas

/* <article>
    <figure>
        <img src="" alt="Planta 1">
    </figure>
    <div class="content">
        <h3>Nombre planta</h3>
        <h6>12.99 €</h6>
        <p>Descripcion</p>
    </div>
    <button>Añadir</button>
</article> */

function printOneProduct(product, dom) {
    const article = document.createElement('article'); //<article></article>
    const figure = document.createElement('figure'); //<figure></figure>
    const img = document.createElement('img'); //<img src="" alt="">
    img.src = product.imagen
    img.alt = product.nombre

    const div = document.createElement('div'); //<div></div>
    div.classList.add('content'); //añadiendo clase del div
    div.innerHTML = `<h3>${product.nombre}</h3>
                    <h6>${product.precio}</h6>
                    <p>${product.descripcion}</p>`

    figure.appendChild(img);  // img hijo de figure
    article.append(figure, div); //figure,div,button hijos de article
    dom.appendChild(article);
}

function printAllProducts(list, dom) {
    list.forEach(product => printOneProduct(product, dom))
}


printAllProducts(products, sectionGrid)  //inicializamos la función