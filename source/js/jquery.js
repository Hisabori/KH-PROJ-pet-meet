$(document).ready(function(){

    let floatPosition = parseInt($(".kh-floating").css('top'))
    $(window).scroll(function (){
        let currentTop = $(window).scrollTop();
        let bannerTop = currentTop + floatPosition +"px";

        $(".kh-floating").stop().animate({
            "top": bannerTop
        }, 500);
    }).scroll();

});


