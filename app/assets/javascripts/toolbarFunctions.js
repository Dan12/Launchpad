function moveZoomSlider(mx, my){
  if(current_tool == 0 && mx >= editor_tools[0].x && mx <= editor_tools[0].x+editor_tools[0].w && my >= editor_tools[0].y && my <= editor_tools[0].y+editor_tools[0].h){
    playback_speed = mapValue(mx, editor_tools[0].x, editor_tools[0].x+editor_tools[0].w, playback_speedEx[0], playback_speedEx[1], true);
    playback_speed = Math.floor(playback_speed*10);
    playback_speed = playback_speed/10;
  }
}

function movePlaybackSlider(mx, my){
  if(current_tool == 1 && mx >= editor_tools[1].x && mx <= editor_tools[1].x+editor_tools[1].w && my >= editor_tools[1].y && my <= editor_tools[1].y+editor_tools[1].h){
    tickScale = Math.floor(mapValue(mx, editor_tools[1].x, editor_tools[1].x+editor_tools[1].w, tickScaleEx[0], tickScaleEx[1], true));
    if(tickScale > 100){
      tickScale = Math.floor(tickScale/50);
      tickScale = tickScale*50;
    }
    else{
      tickScale = Math.floor(tickScale/10);
      tickScale = tickScale*10;
    }
  }
}

function startRecording(){
  recordStartTime = new Date().getTime();
  setTimeout(recordLoop(), recordResolution);
}

function kdRecordInput(kc){
  if(current_tool == 7 && keyCodes.indexOf(kc) != -1)
    current_song.push({kc: kc, dn: (new Date().getTime())+"t", p: (new Date().getTime()) - recordStartTime});
}

function kuRecordInput(kc){
  console.log(kc+","+current_tool+","+keyCodes.indexOf(kc));
  if(current_tool == 7 && keyCodes.indexOf(kc) != -1){
    for(var i = current_song.length-1; i >= 0; i--){
      var e = current_song[i];
      if(e.kc == kc && e.dn.charAt(e.dn.length-1) == 't'){
        e.dn = (new Date().getTime())-parseFloat(e.dn);
        console.log(current_song);
        break;
      }
    }
  }
}

function  kdRecordInputSwitch(kc){
  if(kc == 37 || kc == 38 || kc == 39 || kc == 40)
    current_song.push({kc: kc, dn: 50, p: current_time});
}

function recordLoop(){
  console.log("Loop");
  current_time+=recordResolution;
  cursor_at = (current_time/tickScale)*tickWidth;
  drawLayout();
  diff = (new Date().getTime() - recordStartTime) - current_time;
  if(current_tool == 7)
    setTimeout(recordLoop(), (recordResolution - diff));
}

function toolFunctionManager(){
  if(current_tool == 7 && recordStartTime == null){
    console.log("Here");
    startRecording();
  }
}