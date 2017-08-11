
(function(){
    $.fn.popError=function (error,time) {
    if($('.error-pop:visible')==true) return;
    $(this).append('<div  class="pop-tip-bg"></div><div class="error-pop bounchIn">'+error+'</div>');
    var xp=parseInt($('.error-pop').css('padding-left')), w=-(($('.error-pop').width()/2)+xp);
    if(time==undefined) time=2;
    $('.error-pop').css({marginLeft:w});
    var times=0;
    var timePlus=setInterval(function () {
        times++;
        if(times==time){
            $('.error-pop').addClass('bounchOut');
            setTimeout(function () {
                $('.pop-tip-bg,.error-pop').remove();
            },500);
            clearInterval(timePlus);
        }
    },1000);
}
}())
