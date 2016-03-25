$(document).ready(function(){
    var keyboard = Keyboard_Space.initKeyboard(true);
    
    $(window).resize(function(){
        $(".buttons").css("margin", "0");
        var margin = (($("body").innerWidth()-$(".buttons").width()-30)/2);
        if(margin < 0)
            margin = 0;
        $(".buttons").css("margin","0 "+margin+"px");
    });
    
});