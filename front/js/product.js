/*Récupération de l'ID(Params) du produit*/
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

//Get API from server 
fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then(prd => handlePrd(prd))


function handlePrd(prd) {
    const { altTxt, colors, description, imageUrl, name, price, _id } = prd
    makeImage(imageUrl, altTxt);
    makeName(name);
    makePrice(price);
    makeDescription(description);
}

function makeImage(imageUrl, altTxt) {
    const prdImage = document.createElement("img")
    prdImage.src = imageUrl
    prdImage.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(prdImage) 
}

function makeName(name) {
    const prdName = document.getElementById("title")
    prdName.innerText = name
}

function makePrice(price) {
    const prdPrice = document.getElementById("price")
    prdPrice.innerText = price
}

function makeDescription(description) {
    const prdDescription = document.getElementById("description")
    prdDescription.innerText = description
}