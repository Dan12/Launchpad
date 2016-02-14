function initKeyboard(){
    for(var i = 0; i < numChains; i++)
        currentSounds.push([]);
    
    loadSounds(currentSongData["mappings"]["chain1"], currentSounds[0], 1);
    loadSounds(currentSongData["mappings"]["chain2"], currentSounds[1], 2);
    loadSounds(currentSongData["mappings"]["chain3"], currentSounds[2], 3);
    loadSounds(currentSongData["mappings"]["chain4"], currentSounds[3], 4);
}

// loads sounds from srcArray for given chain into soundArr
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

// makes request for sounds
// if offline version, gets from local files
// if online version, gets from dropbox
function requestSound(i, srcArr, soundArr, chain){
    setTimeout(function(){
        //console.log(i+","+chain+","+srcArr[i]+","+soundUrls["chain"+chain][srcArr[i]]);
        soundArr[i] = new Howl({
            // for online version
            urls: [currentSongData["soundUrls"]["chain"+chain][srcArr[i]].replace("www.dropbox.com","dl.dropboxusercontent.com").replace("?dl=0","")],
            // for offline version
            // urls: ["audio/chain"+chain+"/"+srcArr[i]+".mp3"],
            onload: function(){
                checkLoaded();
            },
            onloaderror: function(){
                console.log("audio/chain"+chain+"/"+srcArr[i]+".mp3");
                console.log(i+","+chain+","+srcArr[i]+","+currentSongData["soundUrls"]["chain"+chain][srcArr[i]]);
                $("#error_msg").html("There was an error. Please reload the page");
            }
        });
    },i*50);
}

// checks if all of the sounds have loaded
// if they have, load the keyboard
function checkLoaded(){
    numSoundsLoaded++;
    $(".soundPack").html("Loading sounds ("+numSoundsLoaded+"/"+(4*12*numChains)+"). This should only take a few seconds.");
    if(numSoundsLoaded == 4*12*numChains){
        loadKeyboard();
    }
}

// creates elements for keyboard and appends them to the document
function loadKeyboard(){
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
    
    touchScreenSetup();
    
    keyPressSetup();
    
    initUI();
}

// setup keypress on document
function keyPressSetup(){
    $(document).keydown(function(e){
        //console.log(e.keyCode);
        // up
        if(e.keyCode == 39){
            currentSoundPack = 3;
            switchSoundPack();
        }
        // left
        else if(e.keyCode == 37){
            currentSoundPack = 0;
            switchSoundPack();
        }
        // down
        else if(e.keyCode == 38){
            currentSoundPack = 1;
            switchSoundPack();
        }
        // right
        else if(e.keyCode == 40){
            currentSoundPack = 2;
            switchSoundPack();
        }
        else{
            var keyInd = keyPairs.indexOf(e.keyCode);
            if(keyInd == -1)
                keyInd = backupPairs.indexOf(e.keyCode);
            //console.log(keyInd);
            //console.log(e.keyCode);
            if($(".button-"+(keyInd)+"").attr("released") == "true" && currentSounds[currentSoundPack][keyInd] != null){
                playKey(e.keyCode);
            }
            e.preventDefault();
        }
    });
    
    $(document).keyup(function(e){
        var keyInd = keyPairs.indexOf(e.keyCode);
        if(keyInd == -1)
            keyInd = backupPairs.indexOf(e.keyCode);
        if(currentSounds[currentSoundPack][keyInd] != null)
            releaseKey(e.keyCode);
    });
}

// setup touchscreen, kindof works
function touchScreenSetup(){
    $(".button").bind("touchstart", function(){
       var num = parseInt($(this).attr("buttonnum"));
       playKey(keyPairs[num]);
       event.preventDefault();
       return false;
    });
    
    $(".button").bind("touchend", function(){
       var num = parseInt($(this).attr("buttonnum"));
       releaseKey(keyPairs[num]);
       event.preventDefault();
       return false;
    });
    
    $(".button").bind("touchcancel", function(){
       var num = parseInt($(this).attr("buttonnum"));
       releaseKey(keyPairs[num]);
       event.preventDefault();
       return false;
    });
}

// key released
// stop playing sound if holdToPlay
function releaseKey(kc){
    var kcInd = keyPairs.indexOf(kc);
    if(kcInd == -1)
        kcInd = backupPairs.indexOf(kc);
    if($(".button-"+(kcInd)+"").attr("pressure") == "true")
        currentSounds[currentSoundPack][kcInd].stop();
    $(".button-"+(kcInd)+"").attr("released","true");
    // holdToPlay coloring, turned off for now
    $(".button-"+(kcInd)+"").css("background-color", "white");
    //$(".button-"+(kcInd)+"").css("background-color", $(".button-"+(kcInd)+"").attr("pressure") == "true" ? "lightgray" : "white");
}

// play the key by finding the mapping,
// stopping all sounds in key's linkedArea
// and then playing sound
function playKey(kc){
    var kcInd = keyPairs.indexOf(kc);
    if(kcInd == -1)
        kcInd = backupPairs.indexOf(kc);
    currentSounds[currentSoundPack][kcInd].stop();
    currentSounds[currentSoundPack][kcInd].play();
    
    // go through all linked Areas in current chain
    currentSongData["linkedAreas"]["chain"+(currentSoundPack+1)].forEach(function(el, ind, arr){
        // for ever linked area array
        for(var j = 0; j < el.length; j++){
            // if key code is in linked area array
            if(kcInd == el[j]){
                // stop all other sounds in linked area array
                for(var k = 0; k < el.length; k++){
                    if(k != j)
                        currentSounds[currentSoundPack][el[k]].stop();
                }
                break;
            }
        }
    });
    
    // set button color and attribute
    $(".button-"+(kcInd)+"").attr("released","false");
    $(".button-"+(kcInd)+"").css("background-color","rgb(255,160,0)");
}

// switch sound pack and update pressures
function switchSoundPack(){
    $(".soundPack").html("Sound Pack: "+(currentSoundPack+1));
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 12; j++){
            var press = false;
            if(currentSongData["holdToPlay"]["chain"+(currentSoundPack+1)].indexOf((i*12+j)) != -1)
                press = true;
            $('.button-'+(i*12+j)+'').attr("pressure", ""+press+"");
            // holdToPlay coloring, turned off for now
            //$('.button-'+(i*12+j)+'').css("background-color", $('.button-'+(i*12+j)+'').attr("pressure") == "true" ? "lightgray" : "white");
        }
    }
}

// shows and formats all of the UI elements
function initUI(){
    $(".soundPack").html("Sound Pack: "+(currentSoundPack+1));
    
    // info and links buttons
    $("#info_button").css("display", "inline-block");
    $("#info_button").click(function(){
        $("#info").toggle("display");
        $("#links").css("display","none");
        $("#editor_container").css("display", "none");
        $(".click_button").css("background-color","white");
        $(this).css("background-color","lightgray");
    });
    $("#links_button").css("display", "inline-block");
    $("#links_button").click(function(){
        $("#links").toggle("display");
        $("#editor_container").css("display","none");
        $("#info").css("display", "none");
        $(".click_button").css("background-color","white");
        $(this).css("background-color","lightgray");
    });
}

// TODO: convert keypairs to dictionarys/objects
// {49:0,50:1,51:2...}

// ascii key mappings to array index
var keyPairs = [49,50,51,52,53,54,55,56,57,48,189,187,
                81,87,69,82,84,89,85,73,79,80,219,221,
                65,83,68,70,71,72,74,75,76,186,222,13,
                90,88,67,86,66,78,77,188,190,191,16,-1];
            
// alternate keys for firefox
var backupPairs = [49,50,51,52,53,54,55,56,57,48,173,61,
                   81,87,69,82,84,89,85,73,79,80,219,221,
                   65,83,68,70,71,72,74,75,76,59,222,13,
                   90,88,67,86,66,78,77,188,190,191,16,-1];
               
// letter to show in each button
var letterPairs = ["1","2","3","4","5","6","7","8","9","0","-","=",
                   "Q","W","E","R","T","Y","U","I","O","P","[","]",
                   "A","S","D","F","G","H","J","K","L",";","'","\\n",
                   "Z","X","C","V","B","N","M",",",".","/","\\s","NA"];

// current soundpack (0-3)
var currentSoundPack = 0;
// number of sounds loaded
var numSoundsLoaded = 0;
// howl objects for current song
var currentSounds = [];
// reference to current song data
var currentSongData = equinoxData;
// number of chains
var numChains = 4;