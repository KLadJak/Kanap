//récupération du local storage
const localStorage = window.localStorage;
const cart = []
getCart(itemsList)
totalCart(itemsList)

function getCart() {
for (let i = 0; i < localStorage.length; i++) {
    const items = localStorage.getItem(localStorage.key(i));
    const itemsList = JSON.parse(items);
    cart.push(itemsList);
    }
}

function totalCart(itemsList) {
    const section = document.getElementById('cart__items');
    const { article, divImage, image } = section;

    const blocArticle = makeArticle(itemsList)
    const blocdivImg = makeDivImage(itemsList)
    const blocImage = makeImage(itemsList)

section.appendChild(blocArticle);
article.appendChild(blocdivImg);
divImage.appendChild(blocImage);

}

//Bloc article avec id + color du  produit
function makeArticle(cart) {
    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.dataset.id = cart[0].id;
    article.dataset.color = cart[0].color;
    return article;
}

//Fonction de création div image
function makeDivImage() {
    //const blocArticle = document.querySelector('.cart__item');
    const divImage = document.createElement('div');
    divImage.classList.add('cart__item__img');
    return divImage;
    
}
//Fonction images du produit dans le cart
function Makeimages(cart) {
    //const section = document.querySelector('.cart__item__img');
    const image = document.createElement('img');
        image.src = cart[0].image;
        image.alt = cart[0].name;
    return image;
    
}

