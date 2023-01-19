//Get API from server
fetch("http://localhost:3000/api/products")
.then(response => response.json())
.then(data => addProducts(data))


//Fonction globale regroupant les sous-fonctions pour chaque création d'objet
function addProducts(data) {
    data.forEach(canape => {
        
    const { _id, imageUrl, altTxt, name, description } = canape
        
    const fnctId = makeId(_id)
    const article = document.createElement("article")
    const fnctImage = makeImg(imageUrl, altTxt)
    const fnctName = makeName(name)
    const fnctDesc = makeDesc(description)
    
    appendChild(fnctId, article)
    article.appendChild(fnctImage)
    article.appendChild(fnctName)
    article.appendChild(fnctDesc)
})
}

function makeId(id) {
        const linkId = document.createElement("a")
        linkId.href = "./product.html?id=" + id
        return linkId
    }
    
    function appendChild(link, article) {
        const parentLinkId = document.querySelector("#items")
        parentLinkId.appendChild(link);
        link.appendChild(article)
    }
    
    function makeImg(imageUrl, altTxt) {
        const img = document.createElement("img")
        img.src = imageUrl
        img.alt = altTxt
        return img
    }
    function makeName(name) {
        const h3 = document.createElement("h3")
        h3.textContent = name
        h3.classList.add("productName")
        return h3
    }
    function makeDesc(desc) {
        const dscr = document.createElement("p")
        dscr.textContent = desc
        dscr.classList.add("productDescription")
        return dscr 
    }
    