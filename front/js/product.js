/*Récupération de l'ID(Params) du produit*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//Get API from server
function getAPI() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((prd) => getPrd(prd));
}

//Fonction array produit
function getPrd(prd) {
  const { altTxt, colors, description, imageUrl, name, price } = prd;
  makeImage(imageUrl, altTxt);
  makeName(name);
  makePrice(price);
  makeDescription(description);
  makeOption(colors);
}

//Fonction incrémentation image produit
function makeImage(imageUrl, altTxt) {
  const prdImage = document.createElement("img");
  prdImage.src = imageUrl;
  prdImage.alt = altTxt;
  const parent = document.querySelector(".item__img");
  parent.appendChild(prdImage);
}

//Fonction incrémentation nom produit
function makeName(name) {
  const prdName = document.getElementById("title");
  prdName.innerText = name;
  return name;
}

//Fonction incrémentation prix
function makePrice(price) {
  const prdPrice = document.getElementById("price");
  prdPrice.innerText = price;
}

//Fonction incrémentation description
function makeDescription(description) {
  const prdDescription = document.getElementById("description");
  prdDescription.innerText = description;
}

//Fonction incrémentation option de couleurs + boucle
function makeOption(color) {
  color.forEach((color) => {
    const eltOption = document.createElement("option");
    eltOption.value = color;
    eltOption.textContent = color;
    const colors = document.querySelector("#colors");
    colors.appendChild(eltOption);
  });
}

//Fonction eventListener du panier user
function getUserCart() {
  const button = document.querySelector("#addToCart");
  if (button != null) {
    button.addEventListener("click", addLocalStorageCart);
  }
}

//Fonction d'ajout dans le ls par saisie user (quantité + couleur)
function addLocalStorageCart() {
  const quantity = document.querySelector("#quantity").value;
  const color = document.querySelector("#colors").value;
  if (isCardIsInvalide(quantity, color)) {
    return;
  }
  else {
    saveCart(color, quantity, id);
  }
}

//Si quantité null -> Message d'alerte
function isCardIsInvalide(quantity, color) {
  if (color === "" || quantity.length === 0 || quantity === "0") {
    alert("Veuillez remplir tous les champs");
    return true;
  }
  //Si quantité invalide -> Message d'alerte
  const itemQty = document.querySelector("input");
  if (itemQty.value > Number(100) || itemQty.value < Number(1)) {
    alert(
      "Vous ne pouvez pas ajouter plus de 100 produits ou une quantité inférieur à 1"
    );
    return true;
  }
}

//Fonction ajout d'un item au panier
function saveCart(color, quantity, id) {
  //Elements du array
  let dataCart = {
    id: id,
    color: color,
    quantity: Number(quantity),
  };
  //mise en forme du JSON
  let ls = JSON.parse(localStorage.getItem("cart"));
  //addition de la quantité dans le localStorage
  if (ls) {
    let foundId = ls.find((qty) => qty.id === dataCart.id && qty.color === dataCart.color);
    //paramètre de comparaison et d'ajout produit par id + color
    if (foundId !== undefined) {
      foundId.quantity += Number(quantity);
      reducer(ls)
    }
      //si id produit différent, ajout d'un index dans le localStorage
    else {
      ls.push(dataCart);
      reducer(ls)
    }
  }
  //Si produit différent ou null, ajout dans le localStorage
  else {
    ls = [];
    ls.push(dataCart);
    localStorage.setItem("cart", JSON.stringify(ls));
    alert("Votre produit a été ajouté à votre panier");
  }
}

//Fonction limite de quantité totale
function reducer(ls) {
  let sommeQty = ls.reduce((accumulateur, element) => {
    return accumulateur + element.quantity
  }, 0)
  if (sommeQty > 100) {
    return alert("Vous ne pouvez pas ajouter plus de 100 produits");
  }
  //si quantité < 100 -> Message d'alerte + ajout du produit par accumulation
  else  {
    localStorage.setItem("cart", JSON.stringify(ls));
    alert("Votre produit a été ajouté à votre panier");
  }
}
getUserCart();
getAPI();
