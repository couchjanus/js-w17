'use strict';

// function initStorage() {
//   window.localStorage.getItem("basket") ?
//     window.localStorage.getItem("basket") :
//     window.localStorage.setItem("basket", '');
// }

function initStorage() {
  window.localStorage.getItem("basket") ?
    window.localStorage.getItem("basket") :
    window.localStorage.setItem("basket", JSON.stringify([]));
}

const data = [{
  id: 0,
  name: "Cool Cat",
  price: 77,
  picture: ["cat1.jpg", "cat4.jpg", "cat5.jpg", "cat6.jpg", "cat7.jpg"],
  subtitle: ["Mama mia!", "Je t'adore", "Beach cat", "Tropical cat", "White building cat"],
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus dignissimos, maxime ea excepturi veritatis itaque."
},
{
  id: 1,
  name: "Black Cat",
  price: 66,
  picture: ["cat2.jpg", "cat4.jpg", "cat5.jpg", "cat6.jpg", "cat7.jpg"],
  subtitle: ["Tropical cat", "Mama mia!", "Je t'adore", "Beach cat", "White building cat"],
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus dignissimos, maxime ea excepturi veritatis itaque."
},];

class Product {
  constructor(id, name, price, picture, amount){
        this.id = id;
        this.name = name;
        this.price = price;
        this.picture = picture;
        this.amount = amount;
  }
}

(function() {

  // Проверить, поддерживает ли браузер API sessionStorage и localStorage можно с помощью следующей строки:
  // if (window.sessionStorage && window.localStorage) {
  //   // объекты sessionStorage и localstorage поддерживаются
  //   console.log('объекты sessionStorage и localstorage поддерживаются');
  // } else {
  //   // объекты sessionStorage и localstorage не поддерживаются
  //   console.log('объекты sessionStorage и localstorage не поддерживаются');
  // }

  initStorage();
  
  // if (localStorage) {
