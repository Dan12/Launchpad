function moveZoomSlider(mx, my){
  if(current_tool == 0 && mx >= editor_tools[0].x && mx <= editor_tools[0].x+editor_tools[0].w && my >= editor_tools[0].y && my <= editor_tools[0].y+editor_tools[0].h){
    playback_speed = mapValue(mx, editor_tools[0].x, editor_tools[0].x+editor_tools[0].w, playback_speedEx[0], playback_speedEx[1], true);
    playback_speed = Math.floor(playback_speed*10)/10;
  }
}

function movePlaybackSlider(mx, my){
  if(current_tool == 1 && mx >= editor_tools[1].x && mx <= editor_tools[1].x+editor_tools[1].w && my >= editor_tools[1].y && my <= editor_tools[1].y+editor_tools[1].h){
    tickScale = Math.floor(mapValue(mx, editor_tools[1].x, editor_tools[1].x+editor_tools[1].w, tickScaleEx[0], tickScaleEx[1], true));
    if(tickScale > 100){
      tickScale = Math.floor(tickScale/50)*50;
    }
    else{
      tickScale = Math.floor(tickScale/10);
      tickScale = tickScale*10;
    }
    if(toPix(cursor_at)+xOffset > edcWidth-cellWidth || toPix(cursor_at)+xOffset < 0)
      xOffset=edcWidth/2-toPix(cursor_at);
  }
}

function startRecording(){
  recordStartTime = new Date().getTime()-cursor_at;
  setTimeout(recordLoop, recordResolution);
}

function kdRecordInput(kc){
  if(current_tool == 7 && keyCodes.indexOf(kc) != -1)
    current_song.push({kc: kc, dn: (new Date().getTime())+"t", p: (new Date().getTime()) - recordStartTime});
}

function kuRecordInput(kc){
  if(current_tool == 7 && keyCodes.indexOf(kc) != -1){
    for(var i = current_song.length-1; i >= 0; i--){
      var e = current_song[i];
      if(e.kc == kc && (typeof e.dn == "string") && e.dn.charAt(e.dn.length-1) == 't'){
        e.dn = (new Date().getTime())-parseFloat(e.dn);
        break;
      }
    }
  }
}

function kdRecordInputSwitch(kc){
  if((kc == 37 || kc == 38 || kc == 39 || kc == 40) && current_tool == 7)
    current_song.push({kc: kc, dn: 50, p: (new Date().getTime()) - recordStartTime});
}

function recordLoop(){
  cursor_at += recordResolution;
  drawLayout();
  diff = (new Date().getTime() - recordStartTime)-cursor_at;
  if(current_tool == 7 && diff > -recordResolution)
    setTimeout(recordLoop, (recordResolution - diff));
  else
    recordStartTime = null;
}

function scrub(mx, my){
  cursor_at = toMs(-xOffset+mx-cellWidth);
}

function scrubOffset(mx){
  if(mx > edcWidth-10)
    xOffset-=40;
  if(mx < cellWidth+10)
    xOffset+=40;
}

function startPlaying(){
  playingStartTime = new Date().getTime()-cursor_at;
  cursor_at = Math.floor(cursor_at/playingResolution)*playingResolution
  setTimeout(playLoop, playingResolution);
}

function playLoop(){
  cursor_at += playingResolution;
  current_song.forEach(function(e, i, a){
    var deresP = Math.floor(e.p/playingResolution)*playingResolution;
    if(cursor_at == deresP){
      keyTap(e.kc, e.dn);
    }
  });
  drawLayout();
  diff = (new Date().getTime() - playingStartTime)-cursor_at;
  if(current_tool == 8 && diff > -playingResolution && cursor_at < maxWidth)
    setTimeout(playLoop, (playingResolution - diff));
  else
    playingStartTime = null;
}

function playbackOffsetUpdate(){
  if(cursor_at >= maxWidth && current_tool != 8){
    maxWidth+=tickScale;
  }
}

function saveSong(){
  if(loaded_song_id == -1)
    loaded_song_name = prompt("Enter song name");
  $.ajax({
    type: "POST",
    url: "/create_song",
    data: {song_data: current_song, id: loaded_song_id, name: loaded_song_name},
    success: function(data, textStatus, jqXHR) {
      // console.log(data);
      // console.log(textStatus);
      // console.log(jqXHR);
      // console.log(data.data.song_data);
      if(data.data == "null")
        alert("Not Saved, try again");
      if(data.data == "nli"){
        alert("You must be logged in");
        if(confirm("Go to login page?"))
          $("#login_form").css("display", "block")
      }
      else{
        song_data = data.data.song_data;
        loaded_song_id = data.data.id
        loaded_song_name = data.data.name
        drawLayout();
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error=" + errorThrown);
        alert("Not Saved, try again");
    }
  });
}

function moveMouseDown(){
  if(selected.length == 0){
    current_song.forEach(function(e, i, a){
      if(mouseX >= toPix(e.p)+xOffset && mouseX <= toPix(e.p)+xOffset+toPix(e.dn) && mouseY >= keyCodes.indexOf(e.kc)*cellHeight+yOffset && mouseY <= (keyCodes.indexOf(e.kc)+1)*cellHeight+yOffset){
        singleSelected = e;
      }
    });
  }
  selectedPrevX = mouseX;
  selectedPrevY = mouseY;
}

function moveMouseMove(){
  if(mouseDown){
    var rowdiff = 0;
    if(Math.floor((selectedPrevY-xOffset)/cellHeight) != Math.floor((mouseY-xOffset)/cellHeight))
      rowdiff = Math.floor((mouseY-xOffset)/cellHeight)-Math.floor((selectedPrevY-xOffset)/cellHeight);
    var tdiff = toMs(mouseX-selectedPrevX);
    if(singleSelected != null){
      var newind = keyCodes.indexOf(singleSelected.kc)+rowdiff;
      if(newind >= 0 && newind < keyCodes.length)
        singleSelected.kc = keyCodes[newind];
      singleSelected.p+=tdiff;
      if(singleSelected.p < 0)
        singleSelected.p = 0;
      if(singleSelected.p > maxWidth)
        maxWidth+=tickScale;
    }
    selected.forEach(function(e, i, a){
      
    });
  }
  selectedPrevX = mouseX;
  selectedPrevY = mouseY;
}

function loadSongs(){
  $.ajax({
    type: "POST",
    url: "/view_all_songs",
    data: {},
    success: function(data, textStatus, jqXHR) {
      console.log(data);
      // console.log(textStatus);
      // console.log(jqXHR);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error=" + errorThrown);
        alert("There was an error");
    }
  });
}

function moveMouseUp(){
  singleSelected = null;
}

function toolFunctionManager(){
  if(current_tool == 7 && recordStartTime == null)
    startRecording();
  if(current_tool == 8 && playingStartTime == null)
    startPlaying();
  if(current_tool == 12){
    saveSong();
    current_tool = 2;
  }
  if(current_tool == 13){
    loadSongs();
    current_tool = 2;
  }
}

function toolMouseDownManager(mx, my){
  if(current_tool == 2)
    scrub(mx, my);
  if(current_tool == 5)
    moveMouseDown();
}

function toolMouseUpManager(mx, my){
  if(current_tool == 5)
    moveMouseUp();
}

function toolMouseMoveManager(mx, my){
  if(current_tool == 2 && mouseDown)
    scrub(mx, my);
  if(current_tool == 5)
    moveMouseMove();
}

function toolOffsetManager(mx, my){
  if(current_tool == 2){
    scrubOffset(mx);
    scrub(mx, my);
  }
}

function toPix(ms){
  return (ms/tickScale)*tickWidth;
}

function toMs(pix){
  return (pix/tickWidth)*tickScale;
}