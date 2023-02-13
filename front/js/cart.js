function getLsUser() {
  let cart = localStorage.getItem('cart');
  let cartObject = JSON.parse(cart)
  makeArticle(cartObject)
}

//fetch API
function fetchAPI() {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => getDataProducts(data));
  }
//
  /*function getDataProducts(data) {
    const { _id, altTxt, colors, description, imageUrl, name, price } = data;
    getLsUser()
    makeArticle()
    makeImgCart(altTxt, imageUrl)
  }*/

  function makeArticle(cartObject) {
    cartObject.forEach((cartObject) => {
      const section = document.querySelector("#cart__items")
      const article = document.createElement("article");
      article.classList.add("cart__item");
      article.dataset.id = cartObject.id;
      article.dataset.color = cartObject.color
      section.appendChild(article)
      return article
    })
    }
    /*function makeImgCart(altTxt, imageUrl) {

  }*/

//getDataProducts()
getLsUser()