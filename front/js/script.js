//Get de l'API
const url = "http://localhost:3000/api/products";

fetch(url)
.then(response => response.json())
.then(data => {
    const product = data[0];

//Création du bloc parent -> Lien vers le produit
const newA = document.createElement("a");
newA.href = "./product.html?id=productId";
const sectionProducts = document.getElementById("items");
sectionProducts.appendChild(newA);

console.log(sectionProducts)

//Remplissage des images et infos du produit
const article = document.createElement("article");
newA.appendChild(article);

const imgElt = document.createElement("img");
imgElt.src = product.imageUrl;

const nameElt = document.createElement("h3");
nameElt.innerText = product.name;

const descriptionElt = document.createElement("p");
descriptionElt.innerText = product.description;

article.appendChild(imgElt);
article.appendChild(nameElt);
article.appendChild(descriptionElt);


console.log(data)
})
