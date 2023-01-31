//récupération du local storage
const localStorage = window.localStorage;
const cart = []

function getCart() {
for (let i = 0; i < localStorage.length; i++) {
    const items = localStorage.getItem(localStorage.key(i));
    const itemsList = JSON.parse(items);
    cart.push(itemsList);
    }
}

//Bloc article avec id + color du  produit
function makeArticle(cart) {
    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.dataset.id = cart[0].id;
    article.dataset.color = cart[0].color;
    article.appendChild(blocdivImg);
    return article;
}

//Fonction de création div image
function makeDivImage() {
    const blocArticle = document.querySelector('.cart__item');
    const divImage = document.createElement('div');
    divImage.classList.add('cart__item__img');
    divImage.appendChild(blocArticle);
    return divImage;
    
}
//Fonction images du produit dans le cart
function Makeimages(cart) {
    const section = document.querySelector('.cart__item__img');
    const image = document.createElement('img');
        image.src = cart[0].image;
        image.alt = cart[0].name;
    return image;
    
}
getCart()
totalCart()

