$(document).ready(function(){
    for(var i = 0; i < 4; i++){
        $(".buttons").append('<div class="button-row"></div>');
        for(var j = 0; j < 12; j++){
            var press = false;
            if(pressure.indexOf((i+j*4)) != -1)
                press = true
            var str = String.fromCharCode(keyPairs[i+j*4]);
            if(keyPairs[i+j*4] == 13)
                str = "\\n"
            $(".button-row:last").append('<div class="button button-'+(i+j*4)+'" pressure="'+press+'" released="true">'+str+'</div>');
            $('.button-'+(i+j*4)+'').css("background-color", $('.button-'+(i+j*4)+'').attr("pressure") == "true" ? "lightgray" : "white");
        }
    }
    
    reformat();
    $(window).resize(function(){
        console.log("resize");
        reformat();
    });
    
    $(".button").click(function(){
       $(this).attr("pressure", $(this).attr("pressure") == "false" ? "true" : "false");
       $(this).css("background-color", $(this).attr("pressure") == "true" ? "lightgray" : "white");
    });
    
    $(document).keydown(function(e){
        //console.log(e.keyCode);
        if($(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("released") == "true")
            combSounds[curSound][keyPairs.indexOf(e.keyCode)].play();
        $(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("released","false");
        $(".button-"+(keyPairs.indexOf(e.keyCode))+"").css("background-color","rgb(255,160,0)");
    });
    $(document).keyup(function(e){
        if($(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("pressure") == "true")
            combSounds[curSound][keyPairs.indexOf(e.keyCode)].stop();
        $(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("released","true");
        $(".button-"+(keyPairs.indexOf(e.keyCode))+"").css("background-color", $(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("pressure") == "true" ? "lightgray" : "white");
    });
});

function reformat(){
    $(".buttons").css("margin","0 "+(($("body").innerWidth()-$(".buttons").width())/2)+"px");
}

keyPairs = [49,81,65,90,50,87,83,88,51,69,68,67,52,82,70,86,53,84,71,66,54,89,72,78,55,85,74,77,56,73,75,188,57,79,76,190,48,80,186,191,189,219,222,16,187,221,13,-1];
sounds = [
    new Howl({urls: ['/assets/chain1/a0.wav']}),
    new Howl({urls: ['/assets/chain1/a0.wav']}),
    new Howl({urls: ['/assets/chain1/a3.wav']}),
    new Howl({urls: ['/assets/chain1/a3.wav']}),
    new Howl({urls: ['/assets/chain1/a4.wav']}),
    new Howl({urls: ['/assets/chain1/a5.wav']}),
    new Howl({urls: ['/assets/chain1/a6.wav']}),
    new Howl({urls: ['/assets/chain1/a7.wav']}),
    new Howl({urls: ['/assets/chain1/a8.wav']}),
    new Howl({urls: ['/assets/chain1/a9.wav']}),
    new Howl({urls: ['/assets/chain1/a10.wav']}),
    new Howl({urls: ['/assets/chain1/a11.wav']}),
    new Howl({urls: ['/assets/chain1/a12.wav']}),
    new Howl({urls: ['/assets/chain1/a13.wav']}),
    new Howl({urls: ['/assets/chain1/a14.wav']}),
    new Howl({urls: ['/assets/chain1/a15.wav']}),
    new Howl({urls: ['/assets/chain1/b0.wav']}),
    new Howl({urls: ['/assets/chain1/b1.wav']}),
    new Howl({urls: ['/assets/chain1/b2.wav']}),
    new Howl({urls: ['/assets/chain1/b3.wav']}),
    new Howl({urls: ['/assets/chain1/b4.wav']}),
    new Howl({urls: ['/assets/chain1/b5.wav']}),
    new Howl({urls: ['/assets/chain1/b6.wav']}),
    new Howl({urls: ['/assets/chain1/b7.wav']}),
    new Howl({urls: ['/assets/chain1/b8.wav']}),
    new Howl({urls: ['/assets/chain1/b9.wav']}),
    new Howl({urls: ['/assets/chain1/b10.wav']}),
    new Howl({urls: ['/assets/chain1/b11.wav']}),
    new Howl({urls: ['/assets/chain1/b12.wav']}),
    new Howl({urls: ['/assets/chain1/b13.wav']}),
    new Howl({urls: ['/assets/chain1/b14.wav']}),
    new Howl({urls: ['/assets/chain1/b15.wav']}),
    new Howl({urls: ['/assets/chain1/b12.wav']}),
    new Howl({urls: ['/assets/chain1/d1.wav']}),
    new Howl({urls: ['/assets/chain1/d0.wav']}),
    new Howl({urls: ['/assets/chain1/d12.wav']}),
    new Howl({urls: ['/assets/chain1/d5.wav']}),
    new Howl({urls: ['/assets/chain1/d2.wav']}),
    new Howl({urls: ['/assets/chain1/d5.wav']}),
    new Howl({urls: ['/assets/chain1/d8.wav']}),
    new Howl({urls: ['/assets/chain1/d3.wav']}),
    new Howl({urls: ['/assets/chain1/d3.wav']}),
    new Howl({urls: ['/assets/chain1/d9.wav']}),
    new Howl({urls: ['/assets/chain1/d4.wav']}),
    new Howl({urls: ['/assets/chain1/d1.wav']}),
    new Howl({urls: ['/assets/chain1/d2.wav']}),
    new Howl({urls: ['/assets/chain1/d1.wav']}),
    new Howl({urls: ['/assets/chain1/d1.wav']})
    ];

sounds1 = [
    new Howl({urls: ['/assets/chain4/c0.wav']}),
    new Howl({urls: ['/assets/chain4/c1.wav']}),
    new Howl({urls: ['/assets/chain4/c2.wav']}),
    new Howl({urls: ['/assets/chain4/c3.wav']}),
    new Howl({urls: ['/assets/chain4/c12.wav']}),
    new Howl({urls: ['/assets/chain4/c13.wav']}),
    new Howl({urls: ['/assets/chain4/c14.wav']}),
    new Howl({urls: ['/assets/chain4/c15.wav']}),
    new Howl({urls: ['/assets/chain4/d2.wav']}),
    new Howl({urls: ['/assets/chain4/d3.wav']}),
    new Howl({urls: ['/assets/chain4/d2.wav']}),
    new Howl({urls: ['/assets/chain4/d3.wav']}),
    new Howl({urls: ['/assets/chain4/d6.wav']}),
    new Howl({urls: ['/assets/chain4/d7.wav']}),
    new Howl({urls: ['/assets/chain4/d6.wav']}),
    new Howl({urls: ['/assets/chain4/d7.wav']}),
    new Howl({urls: ['/assets/chain4/d9.wav']}),
    new Howl({urls: ['/assets/chain4/d9.wav']}),
    new Howl({urls: ['/assets/chain4/d10.wav']}),
    new Howl({urls: ['/assets/chain4/d11.wav']}),
    new Howl({urls: ['/assets/chain4/d12.wav']}),
    new Howl({urls: ['/assets/chain4/d13.wav']}),
    new Howl({urls: ['/assets/chain4/d14.wav']}),
    new Howl({urls: ['/assets/chain4/d15.wav']}),
    ];
    
combSounds = [sounds, sounds1];

curSound = 0;
    
pressure = [16,17,18,19,20,21,22,23,24,26,28,30,32,34,38,42];