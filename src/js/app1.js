import {
    el
} from './shared/functions';

import {
    openCart,
    closeCart,
    showCart,
    getProduct,
    changeTotal,
    carousel,
    makeProductItem,
    moveToCart,
    saveCartToStore
} from './shared/cart';

import {
    initStorage,
    getProducts
} from './shared/stor';


function removeProduct(index) {
    let tmpProducts = getProducts();
    tmpProducts.splice(tmpProducts.indexOf(tmpProducts.find(x => x.id === +(index))), 1);
    window.localStorage.setItem("basket", JSON.stringify(tmpProducts));
}

function plusProduct(id) {
    let tmpProducts = getProducts();
    tmpProducts.forEach(elem => {
        if (elem.id === +(id)) {
            elem.amount += 1;
        }
    });
    window.localStorage.setItem("basket", JSON.stringify(tmpProducts));
}

function minusProduct(id) {
    let tmpProducts = getProducts();
    tmpProducts.forEach(elem => {
        if (elem.id === +(id)) {
            elem.amount -= 1;
        }
    });
    window.localStorage.setItem("basket", JSON.stringify(tmpProducts));
}


const url = 'https://my-json-server.typicode.com/couchjanus/db/products';
// const url = 'http://localhost:3000/products';

(function () {

    el('#sidebarCollapse').addEventListener('click', () => openCart());
    el('.dismiss').addEventListener('click', () => closeCart());
    el('.overlay').addEventListener('click', () => closeCart());

    const template = el('#productItem').content;
    const content = el('#cartItem').content;

    // ---------------------Step 1-----------------------------------
    fetch(url)
        .then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function (data) {

                // Make Product Item
                data.forEach((item) => {
                    el('.showcase').append(makeProductItem(template, item).cloneNode(true));
                });

                initStorage();


                // ---------------------add-to-cart------------------------------

                let addToCarts = document.querySelectorAll('.add-to-cart');

                addToCarts.forEach(function (addToCart) {
                    addToCart.addEventListener('click', function () {

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


                document.querySelector('.cart-items').addEventListener(
                    'click',
                    function (e) {
                        if (e.target && e.target.matches('.remove-item')) {
                            let index = e.target.closest('.cart-item').getAttribute('id');
                            removeProduct(index);
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

                            let id = el.closest('.cart-item').getAttribute('id');
                            plusProduct(id);
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

                            let id = el.closest('.cart-item').getAttribute('id');
                            let val = parseInt(el.nextElementSibling.innerText);
                            if (val > 1) {
                                val--;
                                el.nextElementSibling.innerText = val;
                                minusProduct(id);
                            }

                            el.parentNode.nextElementSibling.querySelector(
                                '.item-price'
                            ).innerText = parseFloat(price * val).toFixed(2);
                            changeTotal();

                        }
                    },
                    false
                );

                // =================Очистка всего хранилища================
                document.querySelector('.clear-cart').addEventListener('click', () => {
                    localStorage.removeItem('basket');
                    initStorage();
                    document.querySelector('.cart-items').innerHTML = '';
                    updateTotal();
                });


                // ----------------------view-detail------------------------------
                const viewDetails = document.querySelectorAll('.view-detail');
                viewDetails.forEach(function (element) {
                    element.addEventListener('click', function () {
                        let dataId = this.closest('.col-md-4').getAttribute('productId');
                        carousel(data[dataId]);
                    });
                });
            });
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
})();