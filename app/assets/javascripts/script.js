<!--guitar hero launchpad/DDR launchpad-->
$(document).ready(function(){
    
    loadSounds(sound1Srcs, sounds1, 1);
    loadSounds(sound4Srcs, sounds4, 4);
    loadSounds(sound2Srcs, sounds2, 2);
    
    $(window).resize(function(){
        reformat();
    });
});

function loadSounds(srcArr, soundArr, chain){
    for(var i = 0; i < srcArr.length; i++){
        soundArr.push(null);
    }

    for(var i = 0; i < srcArr.length; i++){
        if(srcArr[i] == ""){
            checkLoaded();
        }
        else{
            requestSound(i, srcArr, soundArr, chain);
        }
    }
}

function requestSound(i, srcArr, soundArr, chain){
    setTimeout(function(){
        $.ajax({
            type: "POST",
            url: "/get_asset_path",
            data: {file_name: srcArr[i], sindex: i, chain: chain},
            success: function(data, textStatus, jqXHR) {
              //console.log(data);
              // console.log(textStatus);
              // console.log(jqXHR);
              var tempi = parseInt(data.sindex);
              soundArr[tempi] = new Howl({urls: [data.asset_path]});
              checkLoaded();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error=" + errorThrown);
                //$(".soundPack").html("There was an error. Please Reload the page");
                if(errorThrown == "Request Time-out")
                    requestSound(i, srcArr, soundArr, chain);
                else
                    $("#error_msg").html("There was an error. Please reload the page");
            }
        });
    },i*50);
}

function checkLoaded(){
    numLoaded++;
    $(".soundPack").html("Loading sounds ("+numLoaded+"/"+(4*12*numSoundPacks)+"). This should only take a few seconds");
    if(numLoaded == 4*12*numSoundPacks){
        combSounds = [sounds1, sounds4, sounds2];
        loadKeyboard();
    }
}

function loadKeyboard(){
    for(var i = 0; i < 4; i++){
        $(".buttons").append('<div class="button-row"></div>');
        for(var j = 0; j < 12; j++){
            var press = false;
            if(pressures[0].indexOf((i*12+j)) != -1)
                press = true;
            var str = String.fromCharCode(keyPairs[i*12+j]);
            if(keyPairs[i*12+j] == 13)
                str = "\\n"
            if(keyPairs[i*12+j] == 16)
                str = "\\s"
            $(".button-row:last").append('<div class="button button-'+(i*12+j)+'" pressure="'+press+'" released="true">'+str+'</div>');
            $('.button-'+(i*12+j)+'').css("background-color", $('.button-'+(i*12+j)+'').attr("pressure") == "true" ? "lightgray" : "white");
        }
    }
    
    $(".soundPack").html("Sound Pack: "+curSound);
    
    $(".button").click(function(){
       $(this).attr("pressure", $(this).attr("pressure") == "false" ? "true" : "false");
       $(this).css("background-color", $(this).attr("pressure") == "true" ? "lightgray" : "white");
    });
    
    $(document).keydown(function(e){
        console.log(e.keyCode);
        if(e.keyCode == 39){
            curSound = 1;
            $(".soundPack").html("Sound Pack: "+curSound);
            switchSoundPack();
        }
        else if(e.keyCode == 37){
            curSound = 0;
            $(".soundPack").html("Sound Pack: "+curSound);
            switchSoundPack();
        }
        else if(e.keyCode == 38){
            curSound = 2;
            $(".soundPack").html("Sound Pack: "+curSound);
            switchSoundPack();
        }
        else{
            //console.log(e.keyCode);
            if($(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("released") == "true" && combSounds[curSound][keyPairs.indexOf(e.keyCode)] != null){
                combSounds[curSound][keyPairs.indexOf(e.keyCode)].play();
                kdRecordInput(e.keyCode);
            }
            $(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("released","false");
            $(".button-"+(keyPairs.indexOf(e.keyCode))+"").css("background-color","rgb(255,160,0)");
        }
        
        kdRecordInputSwitch(e.keyCode);
    });
    $(document).keyup(function(e){
        if($(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("pressure") == "true" && combSounds[curSound][keyPairs.indexOf(e.keyCode)] != null)
            combSounds[curSound][keyPairs.indexOf(e.keyCode)].stop();
        $(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("released","true");
        $(".button-"+(keyPairs.indexOf(e.keyCode))+"").css("background-color", $(".button-"+(keyPairs.indexOf(e.keyCode))+"").attr("pressure") == "true" ? "lightgray" : "white");
    
        kuRecordInput(e.keyCode); 
    });
    
        
    setupEditor();
    
    reformat();
    $("#editor_canvas").attr({"width": $(".buttons").width()+"px", "height": "250px"});
    
    edcWidth = parseInt($("#editor_canvas").attr("width"));
    edcHeight = parseInt($("#editor_canvas").attr("height"));
    setupToolBar();
}

function switchSoundPack(){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 12; j++){
            var press = false;
            if(pressures[curSound].indexOf((i*12+j)) != -1)
                press = true;
            $('.button-'+(i*12+j)+'').attr("pressure", ""+press+"");
            $('.button-'+(i*12+j)+'').css("background-color", $('.button-'+(i*12+j)+'').attr("pressure") == "true" ? "lightgray" : "white");
        }
    }
}

function keyTap(keycode, duration){
    console.log("yes,"+keycode+","+duration);
    $(document).trigger(jQuery.Event( 'keydown', { which: keycode, keyCode: keycode } ));
    setTimeout(function(){
        $(document).trigger(jQuery.Event( 'keyup', { which: keycode, keyCode: keycode } ));
    },duration);
}

function reformat(){
    $(".buttons").css("margin", "0");
    $(".buttons").css("margin","0 "+(($("body").innerWidth()-$(".buttons").width()-30)/2)+"px");
    
    $("#editor_canvas").css("margin", "10px "+(($("body").innerWidth()-$(".buttons").width()-30)/2)+"px");
}