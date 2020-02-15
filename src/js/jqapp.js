import $ from "jquery";
import { data } from './data.js';

function addProductToCart(content, item){
    content.find('.item-title').text(item.find(".product-name").text());
    content.find('.item-price').text(item.find(".product-price").text());
    content.find('.item-price').attr('price', item.find(".product-price").text());
    content.find('.item-img').css('background-image', "url("+item.find("img").attr('src')+")");
    
    content.find(".remove-item").on('click', function() {
        $(this).parents('.cart-item').remove();
    });

    content.find(".minus").on('click', function() {
        let price = parseFloat($(this).parent().siblings().find('.item-price').attr('price'));
        var val = parseInt($(this).siblings('.quontity').text());
        if (val > 1) {
            $(this).siblings('.quontity').text(--val);
        }
        $(this).parent().siblings().find('.item-price').text(parseFloat(price*val).toFixed(2));
    });
    
    content.find(".plus").on('click', function() {
        let price = parseFloat($(this).parent().siblings().find('.item-price').attr('price'));
        var val = parseInt($(this).siblings('.quontity').text());
        $(this).siblings('.quontity').text(++val);
        $(this).parent().siblings().find('.item-price').text(parseFloat(price*val).toFixed(2));
    });

    return content;
}

function makeProductItem($template, product) {
    $template.find('.product-name').text(product.name);
    $template
        .find('.card-img-top')
        .attr('src', 'images/' + product.picture);
    $template.find('img').attr('alt', product.name);
    $template.find('.product-price').text(product.price);
    $template.find('.view-detail').attr('data-productId', product.id);
    return $template;
}

$(function () {

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
    });


    const $template = $($('#cartItem').html());
    


    
    var template = $($('#productItem').html());
    
    for (let el of data) {
        $('.showcase')
            .append(makeProductItem(template.clone(), el));
    };

    $('.view-detail').on('click', function () {
        $('.product-name').css('color', 'green');
        $('.product-description').css('color', 'blue');
    });

    $(".add-to-cart").each(function(index, element){
        $(element).on('click', function (e) {
            $(e.target).parents('.card').find('img').css('transform','rotateY(180deg)');
            let template = $template.clone();
            $(".cart-items").append(addProductToCart(template, $(this).parents(".card")));
        });
    });

     
});