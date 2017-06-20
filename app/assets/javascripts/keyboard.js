var Keyboard_Space = new function(){

    this.initKeyboard = function(testing){
        testmode = testing;
        return new Keyboard();
    }
    
    var Keyboard = function(){
        for(var i = 0; i < numChains; i++)
            currentSounds.push([]);
            
        var this_obj = this;
        Zip_Space.loadZip(currentSongData["filename"], function() {
            this_obj.loadSounds(currentSongData["mappings"]["chain1"], currentSounds[0], 1);
            this_obj.loadSounds(currentSongData["mappings"]["chain2"], currentSounds[1], 2);
            this_obj.loadSounds(currentSongData["mappings"]["chain3"], currentSounds[2], 3);
            this_obj.loadSounds(currentSongData["mappings"]["chain4"], currentSounds[3], 4);
            
            this_obj.backend = BackendSpace.init();
            
            this_obj.keyboardUI = Keyboard_UI_Space.initKeyboardUI();
            
            console.log("New keyboard created");  
        })
    }
    
    // link the keyboard and the editor
    Keyboard.prototype.linkEditor = function(editor){
        this.editor = editor;
        var mainObj = this;
        setTimeout(function(){mainObj.editor.setBPM(currentSongData.bpm)},500);
    }
    
    Keyboard.prototype.getCurrentSounds = function(){
        return currentSounds;
    }
    
    // loads sounds from srcArray for given chain into soundArr
    Keyboard.prototype.loadSounds = function(srcArr, soundArr, chain){
        for(var i = 0; i < srcArr.length; i++)
            soundArr.push(null);
    
        for(var i = 0; i < srcArr.length; i++){
            if(srcArr[i] == "")
                this.checkLoaded();
            else
                this.requestSound(i, srcArr, soundArr, chain);
        }
    }
    
    // makes request for sounds
    // if offline version, gets from local files
    // if online version, gets from public folder
    Keyboard.prototype.requestSound = function(i, srcArr, soundArr, chain){
        var thisObj = this;
        soundArr[i] = new Howl({
            // for online version
            urls: [Zip_Space.dataArray['sounds/chain'+chain+'/'+srcArr[i]+'.mp3']],
            // old
            // urls: [currentSongData["soundUrls"]["chain"+chain][srcArr[i]].replace("www.dropbox.com","dl.dropboxusercontent.com").replace("?dl=0","")],
            // for offline version
            // urls: ["audio/chain"+chain+"/"+srcArr[i]+".mp3"],
            onload: function(){
                thisObj.checkLoaded();
            },
            onloaderror: function(id, error){
                console.log('error: '+id)
                console.log(error);
                console.log('sounds/chain'+chain+'/'+srcArr[i]+'.mp3');
                $("#error_msg").html("There was an error. Please try clearing your browser's cache and reload the page.");
            }
        });
    }
    
    // checks if all of the sounds have loaded
    // if they have, load the keyboard
    Keyboard.prototype.checkLoaded = function(){
        numSoundsLoaded++;
        $(".soundPack").html("Loading sounds ("+numSoundsLoaded+"/"+(4*12*numChains)+")");
        if(numSoundsLoaded == 4*12*numChains){
            loadingSongs = false;
            this.keyboardUI.loadKeyboard(this, currentSongData, currentSoundPack);
        }
    }
    
    Keyboard.prototype.getKeyInd = function(kc){
        var keyInd = keyPairs.indexOf(kc);
        if(keyInd == -1)
            keyInd = backupPairs.indexOf(kc);
            
        return keyInd;
    }
    
    Keyboard.prototype.switchSoundPackCheck = function(kc){
        // up
        if(kc == 39){
            this.switchSoundPack(3);
            return true;
        }
        // left
        else if(kc == 37){
            this.switchSoundPack(0);
            return true;
        }
        // down
        else if(kc == 38){
            this.switchSoundPack(1);
            return true;
        }
        // right
        else if(kc == 40){
            this.switchSoundPack(2);
            return true;
        }
    }
    
    // switch sound pack and update pressures
    Keyboard.prototype.switchSoundPack = function(sp){
        // release all keys
        for(var i = 0; i < 4; i++)
            for(var j = 0; j < 12; j++)
                if($(".button-"+(i*12+j)+"").attr("released") == "false")
                    this.releaseKey(keyPairs[i*12+j]);
        
        // set the new soundpack
        currentSoundPack = sp;
        
        $(".sound_pack_button").css("background-color","white");
        $(".sound_pack_button_"+(currentSoundPack+1)).css("background-color","rgb(255,160,0)");
        $(".soundPack").html("Sound Pack: "+(currentSoundPack+1));
        // set pressures for buttons in new sound pack
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
    
    // key released
    // stop playing sound if holdToPlay
    Keyboard.prototype.releaseKey = function(kc){
        var keyInd = this.getKeyInd(kc);
        if(currentSounds[currentSoundPack][keyInd] != null){
            this.midiKeyUp(kc);
            
            // send key code to MIDI editor
            this.editor.recordKeyUp(kc);
        }
    }
    
    Keyboard.prototype.midiKeyUp = function(kc){
        if(this.switchSoundPackCheck(kc)){
            // do nothing
        }
        else{
            var kcInd = this.getKeyInd(kc);
            if(currentSounds[currentSoundPack][kcInd] != null){
                if($(".button-"+(kcInd)+"").attr("pressure") == "true")
                    currentSounds[currentSoundPack][kcInd].stop();
                $(".button-"+(kcInd)+"").attr("released","true");
                // holdToPlay coloring, turned off for now

                // Removes Style Attribute to clean up HTML
                $(".button-"+(kcInd)+"").removeAttr("style");

                if($(".button-"+(kcInd)+"").hasClass("pressed") == true)
                	$(".button-"+(kcInd)+"").removeClass("pressed");

                //$(".button-"+(kcInd)+"").css("background-color", $(".button-"+(kcInd)+"").attr("pressure") == "true" ? "lightgray" : "white");
            }
        }
    }
    
    // play the key by finding the mapping,
    // stopping all sounds in key's linkedArea
    // and then playing sound
    Keyboard.prototype.playKey = function(kc){
        var keyInd = this.getKeyInd(kc);
        if(currentSounds[currentSoundPack][keyInd] != null){
            this.midiKeyDown(kc);
            
            // send key code to midi editor
            this.editor.recordKeyDown(kc);
        }
    }
    
    Keyboard.prototype.midiKeyDown = function(kc){
        if(this.switchSoundPackCheck(kc)){
            // do nothing
        }
        else{
            var kcInd = this.getKeyInd(kc);
            if(currentSounds[currentSoundPack][kcInd] != null){
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
                $(".button-"+(kcInd)+"").addClass("pressed");
                $(".button-"+(kcInd)+"").attr("released","false");
                //$(".button-"+(kcInd)+"").css("background-color","rgb(255,160,0)");
            }
        }
    }
    
    // shows and formats all of the UI elements
    Keyboard.prototype.initUI = function(){
        // create new editor and append it to the body element
        if(testmode)
            BasicMIDI.init("#editor_container_div", this, 170);
        else
            MIDI_Editor.init("#editor_container_div", this, 170);
        
        // info and links buttons
        // $(".click_button").css("display", "inline-block");
        
        for(var s in songDatas)
            $("#songs_container").append("<div class='song_selection' songInd='"+s+"'>"+songDatas[s].song_name+"</div>");
        $("[songInd='"+currentSongInd+"']").css("background-color","rgb(220,220,220)");
        
        var mainObj = this; 
        
        $(".song_selection").click(function() {
            var tempS = parseInt($(this).attr("songInd"));
            if(tempS != currentSongInd && !loadingSongs){
                loadingSongs = true;
                currentSongInd = tempS
                currentSongData = songDatas[currentSongInd];
                $(".song_selection").css("background-color","white");
                $("[songInd='"+currentSongInd+"']").css("background-color","rgb(220,220,220)");
                
                $(".button-row").remove();
                
                for(var i = 0; i < currentSounds.length; i++){
                    for(var k = 0; k < currentSounds[i].length; k++){
                        if(currentSounds[i][k] != null)
                            currentSounds[i][k].unload();
                    }
                }
                currentSounds = [];
                for(var i = 0; i < numChains; i++)
                    currentSounds.push([]);
                    
                mainObj.editor.notesLoaded([],-1);
                
                mainObj.editor.setBPM(currentSongData.bpm)
                
                numSoundsLoaded = 0;
                Zip_Space.loadZip(currentSongData["filename"], function() {
                    mainObj.loadSounds(currentSongData["mappings"]["chain1"], currentSounds[0], 1);
                    mainObj.loadSounds(currentSongData["mappings"]["chain2"], currentSounds[1], 2);
                    mainObj.loadSounds(currentSongData["mappings"]["chain3"], currentSounds[2], 3);
                    mainObj.loadSounds(currentSongData["mappings"]["chain4"], currentSounds[3], 4);
                })
                
            }
        });
    }
    
    // send request to server to save the notes to the corresponding projectId (pid)
    Keyboard.prototype.saveNotes = function(notes, pid){
        var saveNote = [];
        for(var n in notes)
            saveNote.push({"note":notes[n].note, "beat":notes[n].beat, "length":notes[n].length});
        //console.log(saveNote);
        this.backend.saveSong(JSON.stringify(saveNote), pid, this.editor, currentSongData.song_number);
    }
    
    // ask the user for the project they would like to load and then load that project from the server
    // send back a notes array of the loaded project with note,beat,and length and the project id
    Keyboard.prototype.loadNotes = function(){
        this.backend.loadSongs(this.editor, currentSongData.song_number);
    }
    
    // current soundpack (0-3)
    var currentSoundPack = 0;
    // number of sounds loaded
    var numSoundsLoaded = 0;
    // howl objects for current song
    var currentSounds = [];
    // reference to current song data
    var songDatas = [equinoxData, animalsData, electroData, ghetData, kyotoData, aeroData];
    var currentSongInd = 0;
    var currentSongData = equinoxData;
    // number of chains
    var numChains = 4;
    
    var testmode = false;
    
    var loadingSongs = true;

}

// Global Variables
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