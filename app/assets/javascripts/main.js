//guitar hero launchpad/DDR launchpad
$(document).ready(function(){
    var keyboard = Keyboard_Space.initKeyboard();
    
    $(window).resize(function(){
        $(".buttons").css("margin", "0");
        $(".buttons").css("margin","0 "+(($("body").innerWidth()-$(".buttons").width()-30)/2)+"px");
    });
    
});