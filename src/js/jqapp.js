import $ from "jquery";

$(function () {

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
    });

    $(".add-to-cart").each(function(index, element){
        $(element).on('click', function (e) {
            let y = 180;
            $(e.target).parents('.card').find('img').css('transform','rotateY(' + y + 'deg)');
        });
    });
    
    $(".minus").click(function() {
        let price = parseFloat($(this).parent().next().find($('.item-price')).text());
        var val = parseInt($(this).siblings('.quontity').text());
        if (val > 1) {
            val--;
            $(this).siblings('.quontity').text(val);
        }
        $(this).parents().find($('.item-prices')).text(parseFloat(price*val).toFixed(2));
    });
    
    $(".plus").click(function() {
        let price = parseFloat($(this).parent().next().find($('.item-price')).text());
        var val = parseInt($(this).siblings('.quontity').text());
        val++;
        $(this).prev().text(val);
        $(this).parents().find($('.item-prices')).text(parseFloat(price*val).toFixed(2));
    });

    $('.view-detail').on('click', function () {
        $('.product-name').css('color', 'green');
        $('.product-description').css('color', 'blue');
    });
     
});