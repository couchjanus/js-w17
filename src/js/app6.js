import { data } from './data.js';

function el(selector) {
    return document.querySelector(selector);
}

function openCart() {
    el(".sidebar").classList.add("active");
    el(".overlay").classList.add("active")
}

function closeCart() {
    el(".sidebar").classList.remove("active");
    el(".overlay").classList.remove("active");
}


function changeTotal() {
    let price = 0;
    let itemPrices = document.querySelectorAll('.item-price');
    itemPrices.forEach(function (item) {
      price += parseFloat(item.innerText);
    });
  
    price = Math.round(price * 100) / 100;
    let tax = Math.round(price * 0.05 * 100) / 100;
    let shipping = parseFloat(document.querySelector(".shipping span").innerText);
    let fullPrice = Math.round((price + tax + shipping) * 100) / 100;
  
    if (price == 0) {
      fullPrice = 0;
    }
  
    document.querySelector(".subtotal span").innerText = price;
    document.querySelector(".tax span").innerText = tax;
    document.querySelector(".total span").innerText = fullPrice;
}

function slideItem(content, item, i) {
    content.querySelector('.carousel-detail-item').setAttribute('productId', item.id);
    
    content.querySelector('.carousel-item__title').textContent = item.name;
    content.querySelector('.carousel-item__subtitle').textContent =
        item.subtitle[i];

    content.querySelector('.carousel-item__description').textContent =
        item.description;

    content.querySelector('.carousel-item__image').style.backgroundImage =
        'url(images/' + item.picture[i] + ')';

    return content;
}

function carousel(dataItem) {
    let carouselItem = el('#carouselItem').content;

    let detailTemplate = el('#productDetail').content;

    for (let i = 0; i < dataItem.picture.length; i++) {
        detailTemplate
            .querySelector('.carousel-detail')
            .append(
                document.importNode(
                    slideItem(carouselItem, dataItem, i),
                    true
                )
            );
    }

    el('.showcase').replaceWith(document.importNode(detailTemplate, true));

    document
        .querySelectorAll('.carousel-detail-item')[0]
        .classList.add('active-slide');

    var total = document.querySelectorAll('.carousel-detail-item').length;

    var current = 0;
    moveLR('#moveRight', 1);
    moveLR('#moveLeft', -1);

    let addToCart = document.querySelector('.add-to-cart');
    let template = document.getElementById('cartItem').content;

    addToCart.addEventListener('click', function() {
        document.querySelector('.cart-items').append(document.importNode(addProductToCart(template, data[this.closest('.carousel-detail-item').getAttribute('productId')]), true));
        changeTotal();
    });

    function moveLR(eId, step) {
        el(eId).addEventListener('click', function() {
            let prev_next = current;
            current = current + step;
            setSlide(prev_next, current);
        });
    }

    function setSlide(prev, next) {
        let slide = current;
        if (next > total - 1) {
            slide = 0;
            current = 0;
        }
        if (next < 0) {
            slide = total - 1;
            current = total - 1;
        }
        document
            .querySelectorAll('.carousel-detail-item')
            [prev].classList.remove('active-slide');
        document
            .querySelectorAll('.carousel-detail-item')
            [slide].classList.add('active-slide');
    }
}

function addProductToCart(content, item) {
    content.querySelector('.item-title').textContent = item.name;
    content.querySelector('.item-price').textContent = item.price;
    content.querySelector('.item-price').setAttribute('price', item.price);
    content.querySelector('.item-img').style.backgroundImage ="url(images/" + item.picture[0];
    return content;
}


function makeProductItem($template, product) {
    $template.querySelector('.col-md-4').setAttribute('productId', product.id);
    $template.querySelector('.product-name').textContent = product.name;
    $template.querySelector('.card-img-top').setAttribute('src', 'images/' + product.picture[0]);
    $template.querySelector('img').setAttribute('alt', product.name);
    $template.querySelector('.product-price').textContent = parseFloat(product.price).toFixed(2);
    $template.querySelector('.card-text').textContent = product.description;
    return $template;
}


(function () {
    el("#sidebarCollapse").addEventListener('click', function () {
        openCart();
    });
    el(".dismiss").addEventListener('click', function () {
        closeCart();
    });
    el(".overlay").addEventListener('click', function () {
        closeCart();
    });

    const content = document.getElementById('cartItem').content;

    const template = document.getElementById('productItem').content;

    data.forEach(function(el) {
        document
            .querySelector('.showcase')
            .append(makeProductItem(template, el).cloneNode(true));
    });

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
    
    // ---------------------Step 5-------------------------------
    let addToCarts = document.querySelectorAll('.add-to-cart');

    addToCarts.forEach(function(addToCart) {
        addToCart.addEventListener('click', function() {
            
            document.querySelector('.cart-items').append(document.importNode(addProductToCart(content, 
            data[this.closest('.col-md-4').getAttribute('productId')]), true));

            changeTotal();

            let imgItem = this.closest('.card').querySelector('img');
            let rectOrigin = imgItem.getBoundingClientRect();
            let leftStart = rectOrigin.left + 'px';
            let topStart = rectOrigin.top + 'px';
            let win = this.closest('.card').querySelector('.win');
            if (imgItem) {
                let imgClone = imgItem.cloneNode(true);
                imgClone.classList.add('offset-img');
                document.body.appendChild(imgClone);
                imgItem.style.transform = 'rotateY(180deg)';
                win.style.display = 'block';
                let rect = document
                        .querySelector('#sidebarCollapse')
                        .getBoundingClientRect();

                let toLeft = rect.left - 50 + 'px';
                let toTop = rect.top - 50 + 'px';
                
                imgClone.animate(
                        [
                            {
                                transform:
                                    'translate3D(' +
                                    leftStart +
                                    ',' +
                                    topStart +
                                    ', 0)',
                            },
                            {
                                transform:
                                    'translate3D(' +
                                    toLeft +
                                    ',' +
                                    toTop +
                                    ',0) perspective(500px) scale3d(0.1, 0.1, 0.2)',
                            },
                        ],
                        {
                            duration: 2000,
                        }
                    )
                    .onfinish = function() {
                        imgClone.remove();
                        imgItem.style.transform = 'rotateY(0deg)';
                        win.style.display = 'none';
                    };
            }

        });
    });
    // ----------------------------------------------------
    const viewDetails = document.querySelectorAll('.view-detail');
    viewDetails.forEach(function(element) {
        element.addEventListener('click', function() {
            let dataId = this.closest('.col-md-4').getAttribute('productId');
            carousel(data[dataId]);
        });
    });
})();
