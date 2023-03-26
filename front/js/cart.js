// const cartArray = []
const cartGet = localStorage.getItem("cart");
const cartObject = JSON.parse(cartGet);
// cartArray.push(cartObject)

//fetch API
function fetchAPI() {
  cartObject.map(product => {
   return fetch(`http://localhost:3000/api/products/${product.id}`)
    .then((response) => response.json())
    .then((data) => displayItems(data, product));
  })
}

//Fonction de display des items Cart
function displayItems(data, product) {
    const fnctArticle = makeArticle(product);
    const fnctDivContent = makeDivContent();
    const fnctDivInfo = makeDivInfo(data, product);
    const fnctDivConSet = makeDivContainerSettings();
    const fnctImgCart = makeImgCart(data);
    const fnctDivQty = makeDivQty(product);
    const fnctDeleteItem = makeDeleteItem(product);

    const section = document.querySelector("#cart__items");

    section.appendChild(fnctArticle);
    fnctArticle.appendChild(fnctImgCart);
    fnctArticle.appendChild(fnctDivContent);
    fnctDivContent.appendChild(fnctDivInfo);
    fnctDivContent.appendChild(fnctDivConSet);
    fnctDivConSet.appendChild(fnctDivQty);
    fnctDivConSet.appendChild(fnctDeleteItem);
}

//Fonction création Article
function makeArticle(product) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = product.id;
  article.dataset.color = product.color;
  return article;
}

//Fonction incrémentation image produit
function makeImgCart(data) {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
      const image = document.createElement("img");
      image.src = data.imageUrl;
      image.alt = data.altTxt;
      div.appendChild(image);
  return div;
}

//Fonction création div container pour infos produit
function makeDivContent() {
  const divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");
  return divContent;
}

//Fonction création div infos produit
function makeDivInfo(data, product) {
  const divInfo = document.createElement("div");
  divInfo.classList.add("cart__item__content__description");
  const nameItem = document.createElement("h2");
  nameItem.textContent = data.name;
  const color = document.createElement("p");
  color.textContent = product.color;
  const priceItem = document.createElement("p");
  priceItem.textContent = data.price + "€";
  divInfo.appendChild(nameItem);
  divInfo.appendChild(priceItem);
  divInfo.appendChild(color);
  return divInfo;
}

//Fonction création div container pour quantités
function makeDivContainerSettings() {
  const divContainerSettings = document.createElement("div");
  divContainerSettings.classList.add("cart__item__content__settings");
  return divContainerSettings;
}

//Fonction création input quantity
function makeDivQty(product) {
  const divQty = document.createElement("div");
  divQty.classList.add("cart__item__content__settings__quantity");
  const qtyItem = document.createElement("p");
  qtyItem.textContent = "Qté : ";
  divQty.appendChild(qtyItem);
  const inputQty = document.createElement("input");
  inputQty.type = "number";
  inputQty.classList.add("itemQuantity");
  inputQty.name = "itemQuantity";
  inputQty.min = "1";
  inputQty.max = "100";
  inputQty.value = product.quantity;
  divQty.appendChild(inputQty);
  inputQty.addEventListener("change", () => addLs(product, inputQty.value))
  return divQty;
}
//Fonction de changement de la value de quantity
function addLs(product, inputQty) {
  const itemUpdate = cartObject.find(itemUpdated => itemUpdated === product)
  itemUpdate.quantity = Number(inputQty)
//Push de la nouvelle valeur quantity vers le Local Storage
  localStorage.setItem("cart", JSON.stringify(cartObject))
}

//Fonction limite de quantité totale
// function reducer(ls) {
//   let sommeQty = ls.reduce((accumulateur, element) => {
//     return accumulateur + element.quantity
//   }, 0)
//   if (sommeQty > 100) {
//     return alert("Vous ne pouvez pas ajouter plus de 100 produits");
//   }
//   //si quantité < 100 -> Message d'alerte + ajout du produit par accumulation
//   else  {
//     localStorage.setItem("cart", JSON.stringify(ls));
//     alert("Votre produit a été ajouté à votre panier");
//   }
// }

//Fonction de suppression d'un item dans la clé "cart" du Ls
function makeDeleteItem(product) {
  const divContainerDelete = document.createElement("div");
  divContainerDelete.classList.add("cart__item__content__settings__delete");
  const deleteItems = document.createElement("p");
  deleteItems.classList.add("deleteItem");
  deleteItems.textContent = "Supprimer";
  divContainerDelete.addEventListener("click", () => {
    const itemToDelete = cartObject.find((item) => item === product)
    console.log(itemToDelete)
    cartObject.splice(itemToDelete, 1)
    console.log(cartObject.lenght)
  })
  divContainerDelete.appendChild(deleteItems);
  return divContainerDelete;
}

fetchAPI();
