
const Productos = []

class Bows {

    constructor(article, price, img) {

        this.article = article
        this.price = price
        this.img = img
    }
}

const producto1 = new Bows("Virus T", "3000000(US)$", "../img/virustnew.jpg")
const producto2 = new Bows("Virus G", "5950000(US)$", "../img/virusgnew.jpg")
const producto3 = new Bows("Uroboros", "4100000(US)$", "../img/uroborosnew.jpg")
const producto4 = new Bows("The Plague", "3800000(US)$", "../img/plaguenew.jpg")
const producto5 = new Bows("Virus T-Abyss", "6500000(US)$", "../img/tabyss.jpg")
const producto6 = new Bows("P30", "1200000(US)$", "../img/p30.jpg")

Productos.push(producto1, producto2, producto3, producto4, producto5, producto6)


let generalRow = document.querySelector('.items')

Productos.forEach((producto) => {
    let createDiv = document.createElement('div')

    let rowContent = `
        <div class="item shadow mb-4 chancuco">
            <h3 class="item-title">${producto.article}</h3>
            <img class="item-image chancuco" src="${producto.img}">

            <div class="item-details">
                <h4 class="item-price">${producto.price}</h4>
                <button class="item-button btn btn-primary addToCart">ADD TO CART</button>
            </div>
        </div>
`
    createDiv.innerHTML = rowContent
    generalRow.append((createDiv))

})



//Agregar al carrito
let addToCart = document.querySelectorAll('.addToCart')
addToCart.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addCartPointer)
})

//Finalizar compra
let buyButton = document.querySelector('.buyButton');
buyButton.addEventListener('click', finishBuy);

let generalCart = document.querySelector('.generalCart')

//Funcion creacion de variables y agregar al carrito
function addCartPointer(event){
    let button = event.target
    let item = button.closest('.item')

    let itemTitle = item.querySelector(".item-title").textContent
    let itemPrice = item.querySelector(".item-price").textContent
    let itemImage = item.querySelector(".item-image").src
    addItemToCart(itemTitle, itemPrice, itemImage)
}

//funcion agregar los items, no duplicacion, remover items y evitar negativos
function addItemToCart(title, price, image){

    let generalTitle = generalCart.getElementsByClassName('generalTitle');
    for (let i = 0; i < generalTitle.length; i++) {
        
        if (generalTitle[i].innerText === title) {

            let cartSum = generalTitle[i].parentElement.parentElement.parentElement.querySelector( '.cartSum');
            cartSum.value++;
            updateCart();
            return;
        }
    
    }
      

    let generalDiv = document.createElement('div')
    let cartContent = `
    
    <div class="row generalItems">
                        <div class="col-6">
                            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                                <img src=${image} class="shopping-cart-image">
                                <h6 class=" generalTitle text-truncate ml-3 mb-0">${title}
                                </h6>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                                <p class="item-price mb-0 generalPrice">${price}</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div
                                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                                <input class="shopping-cart-quantity-input cartSum" type="number"
                                    value="1">
                                <button class="btn btn-danger buttonDelete" type="button">X</button>
                            </div>
                        </div>
                    </div>
    ` 

    generalDiv.innerHTML = cartContent
    generalCart.append(generalDiv)
    //remover el item
    generalDiv.querySelector('.buttonDelete').addEventListener('click', removeItem);
    //Arreglar negativo
    generalDiv.querySelector('.cartSum').addEventListener('change', fixNegative)
    
    updateCart()

}

// Funcion actualizar precios(multiplicar y suma al total)
function updateCart() {
    let total = 0
    let finalPrice = document.querySelector('.finalPrice')

    let generalItems = document.querySelectorAll('.generalItems')

    generalItems.forEach((generalItem) => {
        let generalPrice = generalItem.querySelector('.generalPrice')
        let textPrice = parseInt(generalPrice.textContent.replace('(US)$', ''))
        let generalSum = generalItem.querySelector('.cartSum')
        let sumValue = parseInt(generalSum.value)
        total = total + textPrice * sumValue
        
    })
    finalPrice.innerHTML = `${total}(US)$`

    
}

//Funcion remover el producto
function removeItem(event) {
    let buttonClicked = event.target;
    buttonClicked.closest('.generalItems').remove();
    updateCart();
}
//Funcion arreglar negativos
function fixNegative(event){
    let input = event.target
    input.value <= 0 ? (input.value = 1) : null
    updateCart()
}

//Funcion finalizar compra
function finishBuy() {
    generalCart.innerHTML = ""
    updateCart()
    Swal.fire({
        title : "Purchase complete",
        text : 'Welcome to Umbrella Corp',
        imageUrl : '../img/logo-min.png',
        imageWidht: 400,
        imageHeight : 200,
        confirmButtontText: '/*-+',
        background : 'black'
    })
}
