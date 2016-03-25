var Keyboard_UI_Space = new function(){
    
    this.initKeyboardUI = function(){
        return new KeyboardUI();
    }
    
    var KeyboardUI = function(){}
    
    KeyboardUI.prototype.initUI = function(){
        // info, links, songs, and editor buttons
        $(".click_button").css("display", "inline-block");
        
        $(".click_button").click(function(){
            var thisObj = this;
            if($("#"+$(thisObj).attr("toggle_id")).css("display") == "none"){
                $(".toggle_container").css("display", "none");
                
                $("#"+$(thisObj).attr("toggle_id")).toggle(300, function(){
                    if($("#"+$(thisObj).attr("toggle_id")).css("display") == "block"){
                        $(thisObj).css("background-color","lightgray");
                        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 300);
                    }
                });
            }
            else{
                $("#"+$(thisObj).attr("toggle_id")).toggle(300, function(){
                    if($("#"+$(thisObj).attr("toggle_id")).css("display") == "block"){
                        $(thisObj).css("background-color","lightgray");
                        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }, 300);
                    }
                });
            }
            $(".click_button").css("background-color","white");
        });
    }
    
    // setup touchscreen, kind of works
    KeyboardUI.prototype.touchScreenSetup = function(keyboard){
        $(".button").bind("touchstart", function(){
           var num = parseInt($(this).attr("buttonnum"));
           keyboard.playKey(keyPairs[num]);
           event.preventDefault();
           return false;
        });
        
        $(".button").bind("touchend", function(){
           var num = parseInt($(this).attr("buttonnum"));
           keyboard.releaseKey(keyPairs[num]);
           event.preventDefault();
           return false;
        });
        
        $(".button").bind("touchcancel", function(){
           var num = parseInt($(this).attr("buttonnum"));
           keyboard.releaseKey(keyPairs[num]);
           event.preventDefault();
           return false;
        });
    }
    
    // creates elements for keyboard and appends them to the document
    KeyboardUI.prototype.loadKeyboard = function(keyboard, currentSounds, currentSongData, currentSoundPack){
        for(var i = 0; i < 4; i++){
            // create new row
            $(".buttons").append('<div class="button-row"></div>');
            // create 12 buttons per row
            for(var j = 0; j < 12; j++){
                var press = false;
                if(currentSongData["holdToPlay"]["chain"+(currentSoundPack+1)].indexOf((i*12+j)) != -1)
                    press = true;
                var str = ""+letterPairs[i*12+j];
                $(".button-row:last").append('<div class="button button-'+(i*12+j)+'" pressure="'+press+'" released="true" buttonnum='+(i*12+j)+'>'+str+'</div>');
                // holdToPlay coloring, turned off for now
                //$('.button-'+(i*12+j)+'').css("background-color", $('.button-'+(i*12+j)+'').attr("pressure") == "true" ? "lightgray" : "white");
            }
        }
        
        $(".soundPack").html("Sound Pack: "+(currentSoundPack+1));
        
        if(!loaded){
            $("#sound_pack_buttons").append('<div class="sound_pack_button sound_pack_button_2">^</div>');
            $("#sound_pack_buttons").append('<div class="sound_pack_button sound_pack_button_1"><</div>');
            $("#sound_pack_buttons").append('<div class="sound_pack_button sound_pack_button_3">v</div>');
            $("#sound_pack_buttons").append('<div class="sound_pack_button sound_pack_button_4">></div>');
            $(".sound_pack_button_"+(currentSoundPack+1)).css("background-color","rgb(255,160,0)");
            
            this.touchScreenSetup(keyboard);
            
            this.keyPressSetup(keyboard, currentSounds, currentSoundPack);
            
            keyboard.initUI();
            
            this.initUI();
            
            loaded = true;
        }
    }
    
    // setup keypress on document
    KeyboardUI.prototype.keyPressSetup = function(keyboard, currentSounds, currentSoundPack){
        $(document).keydown(function(e){
            //console.log(e.keyCode);
            if(keyboard.switchSoundPackCheck(e.keyCode)){
                // do nothing
                keyboard.playKey(e.keyCode);
            }
            else{
                if(!(e.ctrlKey || e.metaKey)){
                    // var keyInd = keyPairs.indexOf(e.keyCode);
                    // if(keyInd == -1)
                    //     keyInd = backupPairs.indexOf(e.keyCode);
                    var keyInd = keyboard.getKeyInd(e.keyCode);
                    //console.log(keyInd);
                    //console.log(e.keyCode);
                    if($(".button-"+(keyInd)+"").attr("released") == "true" && currentSounds[currentSoundPack][keyInd] != null){
                        keyboard.playKey(e.keyCode);
                    }
                    e.preventDefault();
                }
            }
        });
        
        $(document).keyup(function(e){
            if(keyboard.switchSoundPackCheck(e.keyCode)){
                // do nothing
                keyboard.releaseKey(e.keyCode);
            }
            else{
                if(!(e.ctrlKey || e.metaKey)){
                    // var keyInd = keyPairs.indexOf(e.keyCode);
                    // if(keyInd == -1)
                    //     keyInd = backupPairs.indexOf(e.keyCode);
                    var keyInd = keyboard.getKeyInd(e.keyCode);
                    if(currentSounds[currentSoundPack][keyInd] != null)
                        keyboard.releaseKey(e.keyCode);
                }
            }
        });
    }
    
    KeyboardUI.prototype.getKeyInd = function(kc){
        var keyInd = keyPairs.indexOf(kc);
        if(keyInd == -1)
            keyInd = backupPairs.indexOf(kc);
            
        return keyInd;
    }
    
    var loaded = false;
}