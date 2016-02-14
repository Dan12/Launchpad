//guitar hero launchpad/DDR launchpad
$(document).ready(function(){
    initKeyboard();
    
    $(window).resize(function(){
        $(".buttons").css("margin", "0");
        $(".buttons").css("margin","0 "+(($("body").innerWidth()-$(".buttons").width()-30)/2)+"px");
    });
    
    var player = new Player();
    
    BasicMIDI.init("body",player,"assets/");
});

var Player = function(){}

Player.prototype.linkEditor = function(editor){
    console.log(editor);
}