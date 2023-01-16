//Get de l'API
const url = "http://localhost:3000/api/products";

fetch(url)
.then(response => response.json())
.then(json => console.log(json))

//Affichage du produit
for (let i = 0; i <= url.length; i += 1) {
    let products = document.createElement(url[i]);
    console.log(products);
}

