import { data } from './data.js';

import {el} from './shared/functions';

import {closeCart, changeTotal, carousel, makeProductItem, moveToCart} from './shared/cart';

import {initStorage, getProducts} from './shared/stor';

function productInCart(content, item) {
    content.querySelector('.cart-item').setAttribute('id', item.id);
    content.querySelector('.item-title').textContent = item.name;
    content.querySelector('.item-price').textContent = item.price;
    content.querySelector('.quontity').textContent = item.amount;
    content.querySelector('.item-price').setAttribute('price', item.price);
    content.querySelector('.item-img').style.backgroundImage= 'url('+ item.picture+")";
    content.querySelector('.item-price').innerText = parseFloat(item.price * item.amount).toFixed(2);
    return content;
}

function showCart() {
    let shoppingCart = getProducts();

    if (shoppingCart.length == 0) {
        console.log("Your Shopping Cart is Empty!");
        return;
    }
    document.querySelector(".cart-items").innerHTML = '';
    shoppingCart.forEach(function (item) {
        let template = document.getElementById("cartItem").content;
        document.querySelector(".cart-items").append(document.importNode(productInCart(template, item), true));
    });
}

function openCart() {
    showCart()
    el(".sidebar").classList.add("active");
    el(".overlay").classList.add("active")
}

class Product {
    constructor(id, name, price, picture, amount){
          this.id = id;
          this.name = name;
          this.price = price;
          this.picture = picture;
          this.amount = amount;
    }
}

function saveCartToStore(product) {
    let tmpProducts = getProducts();
    console.log(tmpProducts);
    tmpProducts.push(new Product(product.id, product.name, product.price, product.picture, 1));
    window.localStorage.setItem("basket", JSON.stringify(tmpProducts));
    console.log(getProducts());
}

function getProduct(item) {
    return {
        id: item.id,
        price:item.price,
        name:item.name,
        picture:"images/"+item.picture[0]
	}    
}


(function () {

    el('#sidebarCollapse').addEventListener('click', () => openCart());
    el('.dismiss').addEventListener('click', () => closeCart());
    el('.overlay').addEventListener('click', () => closeCart());
    
    const template = el('#productItem').content;
    const content = el('#cartItem').content;

    // ---------------------Step 1-----------------------------------

    // Make Product Item
    data.forEach((item) => {
        el('.showcase').append(makeProductItem(template, item).cloneNode(true));
    });

    initStorage();
    
    if (localStorage) {
        console.log("It's basket storage");
    }


    document.querySelector('.cart-items').addEventListener(
        'click',
        function(e) {
            if (e.target && e.target.matches('.remove-item')) {
                e.target.parentNode.parentNode.remove();
                changeTotal();
            }
            if (e.target && e.target.matches('.plus')) {
                let el = e.target;
                let price = parseFloat(
                    el.parentNode.nextElementSibling
                        .querySelector('.item-price')
                        .getAttribute('price')
                );

                let val = parseInt(el.previousElementSibling.innerText);
                val++;
                el.previousElementSibling.innerText = val;

                el.parentNode.nextElementSibling.querySelector(
                    '.item-price'
                ).innerText = parseFloat(price * val).toFixed(2);
                
                changeTotal();
            }

            if (e.target && e.target.matches('.minus')) {
                let el = e.target;
                let price = parseFloat(
                    el.parentNode.nextElementSibling
                        .querySelector('.item-price')
                        .getAttribute('price')
                );
                let val = parseInt(el.nextElementSibling.innerText);
                if (val > 1) {
                    val--;
                    el.nextElementSibling.innerText = val;
                }
                el.parentNode.nextElementSibling.querySelector(
                    '.item-price'
                ).innerText = parseFloat(price * val).toFixed(2);

                changeTotal();
            }
        },
        false
    );
    

    // ---------------------add-to-cart------------------------------

    let addToCarts = document.querySelectorAll('.add-to-cart');

    addToCarts.forEach(function(addToCart) {
        addToCart.addEventListener('click', function() {
            
            let id = this.closest('.col-md-4').getAttribute('productId');
            let dataItem = data[id];

            // создадим объект
            let product = getProduct(dataItem);
            saveCartToStore(product);

            let imgItem = this.closest('.card').querySelector('img');
            let win = this.closest('.card').querySelector('.win');
            moveToCart(imgItem, win);

        });
    });
    // ----------------------view-detail------------------------------
    const viewDetails = document.querySelectorAll('.view-detail');
    viewDetails.forEach(function(element) {
        element.addEventListener('click', function() {
            let dataId = this.closest('.col-md-4').getAttribute('productId');
            carousel(data[dataId]);
        });
    });
})();
