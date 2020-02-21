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

    function makeProductItem($template, product) {
        $template
            .querySelector('.col-md-4')
            .setAttribute('productId', product.id);
        $template.querySelector('.product-name').textContent = product.name;
        $template
            .querySelector('.card-img-top')
            .setAttribute('src', 'images/' + product.picture[0]);
        $template.querySelector('img').setAttribute('alt', product.name);
        $template.querySelector('.product-price').textContent = parseFloat(product.price).toFixed(2);
        $template.querySelector('.card-text').textContent = product.description;
        
        return $template;
    }

    const template = document.getElementById('productItem').content;

    data.forEach(function(el) {
        document
            .querySelector('.showcase')
            .append(makeProductItem(template, el).cloneNode(true));
    });

    const content = document.getElementById('cartItem').content;

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

    let addToCarts = document.querySelectorAll('.add-to-cart');

    function addProductToCart(content, item) {
        content.querySelector('.item-title').textContent = item.querySelector(
            '.product-name'
        ).textContent;

        content.querySelector('.item-price').textContent = item.querySelector(
            '.product-price'
        ).textContent;

        content
            .querySelector('.item-price')
            .setAttribute(
                'price',
                item.querySelector('.product-price').textContent
            );

        content.querySelector('.item-img').style.backgroundImage =
            'url(' + item.querySelector('img').getAttribute('src') + ')';
        return content;
    }

    addToCarts.forEach(function(addToCart) {
        addToCart.addEventListener('click', function() {
            this.closest('.card').firstElementChild.style.transform =
                'rotateY(180deg)';
            document
                .querySelector('.cart-items')
                .append(
                    document.importNode(
                        addProductToCart(content, this.closest('.card')),
                        true
                    )
                );
            changeTotal();
        });
        
    });

})();
