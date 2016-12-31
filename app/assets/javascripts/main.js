$(document).ready(function(){
    Zip_Space.initialize();
    
    keyboard = Keyboard_Space.initKeyboard(true);
    
    $(window).resize(function(){
        $(".buttons").css("margin", "0");
        var margin = (($("body").innerWidth()-$(".buttons").width()-30)/2);
        if(margin < 0)
            margin = 0;
        if(margin < 180)
            margin = 180;
        $(".buttons").css("padding","0 "+margin+"px");
    });
    
    // adMessage();
    
});

var keyboard = undefined;