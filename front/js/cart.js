function getLsUser() {
  let cart = localStorage.getItem("cart");
  let cartObject = JSON.parse(cart);
  displayItems(cartObject);
}

//fetch API
function fetchAPI() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => getDataProducts(data));
}

//Fonction de display des items Cart
function displayItems(cartObject) {
  cartObject.forEach((cartObject) => {
    const fnctArticle = makeArticle(cartObject);
    const fnctImgCart = makeImgCart();
    const fnctDivContent = makeDivContent(cartObject);
    const fnctDivInfo = makeDivInfo(cartObject);
    const fnctDivConSet = makeDivContainerSettings()
    const fnctDivQty = makeDivQty(cartObject)

    const section = document.querySelector("#cart__items");
    
    section.appendChild(fnctArticle);
    fnctArticle.appendChild(fnctImgCart);
    fnctArticle.appendChild(fnctDivContent);
    fnctDivContent.appendChild(fnctDivInfo);
    fnctDivContent.appendChild(fnctDivConSet)
    fnctDivConSet.appendChild(fnctDivQty);
  });
}

//Fonction création Article
function makeArticle(cartObject) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = cartObject.id;
    article.dataset.color = cartObject.color;
    return article;
}

//Fonction incrémentation image produit
function makeImgCart() {
  const div = document.createElement("div");
  div.classList.add("cart__item__img");
  //const dataId = document.querySelector('article[data-id=""]');
  const image = document.createElement("img");
  image.src = "../images/logo.png";
  image.alt = "altTxt";
  div.appendChild(image);
  return div;
}

//Fonction création div container pour infos produit
function makeDivContent(cartObject) {
    const divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");
    makeDivInfo(cartObject);
    return divContent;
}

//Fonction création div infos produit
function makeDivInfo(cartObject) {
  const divInfo = document.createElement("div");
  divInfo.classList.add("cart__item__content__description");
  const nameItem = document.createElement("h2");
  nameItem.textContent = "name";
  const color = document.createElement("p");
  color.textContent = cartObject.color;
  const priceItem = document.createElement("p");
  priceItem.textContent = "Number(price)";
  divInfo.appendChild(nameItem);
  divInfo.appendChild(priceItem);
  divInfo.appendChild(color);
  return divInfo;
}

function makeDivContainerSettings() {
  const divContainerSettings = document.createElement("div");
  divContainerSettings.classList.add("cart__item__content__settings")
  return divContainerSettings;
}

function makeDivQty(cartObject) {
  const divQty = document.createElement("div");
  divQty.classList.add("cart__item__content__settings__quantity")
  const qtyItem = document.createElement("p");
  qtyItem.textContent = "Qté : ";
  const inputQty = document.createElement("input");
  inputQty.type = "number";
  inputQty.classList.add("itemQuantity")
  inputQty.name = "itemQuantity"
  inputQty.min = "1"
  inputQty.max = "100";
  inputQty.value = cartObject.quantity
  divQty.appendChild(inputQty)
  return divQty;
}
getLsUser();
