function setupEditor(){
  editor_canvas = document.getElementById("editor_canvas");
  edc = editor_canvas.getContext("2d");
  
  drawLayout();
  
  yOffset = scrubbing_bar_height;
  
  setupMouseInputs();
}

function setupMouseInputs(){
  editor_canvas.addEventListener('mousewheel',function(event){
    event.preventDefault();
    xOffset-=event.deltaX;
    yOffset-=event.deltaY;
    if(xOffset > 0)
      xOffset = 0;
    if(xOffset < -(maxWidth/tickScale)*tickWidth+edcWidth/2)
      xOffset = -(maxWidth/tickScale)*tickWidth+edcWidth/2;
    if(yOffset > scrubbing_bar_height)
      yOffset = scrubbing_bar_height;
    if(yOffset < -cellHeight*numButtons+edcHeight-toolbarHeight)
      yOffset = -cellHeight*numButtons+edcHeight-toolbarHeight;
    drawLayout();
  });
  
  $("#toggle_editor_container").click(function(){
    $("#editor_container").toggle("display", function(){drawLayout(); reformat();});
  });
  
  $("#editor_canvas").mousemove(function(e){
    elementOver = null;
    var mouseX = e.pageX - $("#editor_canvas").offset().left;
    var mouseY = e.pageY - $("#editor_canvas").offset().top;
    editor_tools.forEach(function(e, i, a){
      if(mouseX >= e.x && mouseX <= e.x+e.w && mouseY >= e.y && mouseY <= e.y+e.h)
        elementOver = {e: e, mx: mouseX, my: mouseY};
    });
    drawLayout();
  });
  
  $("#editor_canvas").mousedown(function(e){
    var mouseX = e.pageX - $("#editor_canvas").offset().left;
    var mouseY = e.pageY - $("#editor_canvas").offset().top;
    if(mouseY > edcHeight-toolbarHeight){
      editor_tools.forEach(function(e, i, a){
        if(mouseX >= e.x && mouseX <= e.x+e.w && mouseY >= e.y && mouseY <= e.y+e.h)
          current_tool = i;
      });
    }
    else{
      
    }
    drawLayout();
  });
  
  $("#editor_canvas").mouseleave(function(){
    drawLayout();
  });
}

function drawLayout(){
  //transform canvas
  edc.setTransform(1, 0, 0, 1, xOffset, yOffset);
  
  //clear current screen
  edc.clearRect(-xOffset,-yOffset,edcWidth, edcHeight);

  //set variables
  edc.strokeStyle = "black";
  edc.lineWidth = 1;
  edc.font = "16px arial";
  
  //draw white keys
  edc.fillStyle = "white";
  edc.fillRect(-xOffset,0,cellWidth,cellHeight*numButtons);
  edc.fillStyle = "black";
  edc.fillText(String.fromCharCode(keyCodes[0]), 4, (1)*cellHeight-4);
  for(var i = 1; i < numButtons; i++){
    edc.beginPath();
    edc.moveTo(-xOffset, i*cellHeight);
    edc.lineTo(-xOffset+edcWidth, i*cellHeight);
    edc.stroke();
    
    var drawString = String.fromCharCode(keyCodes[i]);
    if(keyCodes[i] == 13)
      drawString = "\\n";
    if(keyCodes[i] == 16)
      drawString = "\\s";
    edc.fillText(drawString, -xOffset+4, (i+1)*cellHeight-4);
  }
  
  //draw scrubbing bar
  edc.fillStyle = "lightgray";
  edc.fillRect(-xOffset, -yOffset, edcWidth, scrubbing_bar_height);
  
  edc.font = "12px arial";
  edc.fillStyle = "black";
  var tick = 0;
  for(var tickdraw = 0; tickdraw < (maxWidth/tickScale)*tickWidth; tickdraw+=tickWidth){
    edc.beginPath();
    edc.moveTo(cellWidth+tickdraw,-yOffset);
    edc.lineTo(cellWidth+tickdraw,-yOffset+edcHeight);
    edc.stroke();
    var numWrite = ""+tick;
    edc.fillText(numWrite, tickdraw-numWrite.length*8+cellWidth, -yOffset+scrubbing_bar_height-4);
    tick+=tickScale;
  }
  
  //draw scrubbing cursor
  edc.strokeStyle = "blue";
  edc.beginPath();
  edc.moveTo(cellWidth+cursor_at,-yOffset);
  edc.lineTo(cellWidth+cursor_at,-yOffset+edcHeight);
  edc.stroke();
  
  //draw toolbar
  edc.fillStyle = "lightgray";
  edc.fillRect(-xOffset, -yOffset+(edcHeight-toolbarHeight), edcWidth, toolbarHeight);
  
  //tools
  edc.fillStyle = "gray";
  editor_tools.forEach(function(e, i, a){
    if(i == current_tool)
      edc.fillStyle = "orange";
    edc.fillRect(-xOffset+e.x, -yOffset+e.y, e.w, e.h);
    if(i == current_tool)
      edc.fillStyle = "gray";
  });
  
  //playback speed
  edc.fillStyle = "darkgray";
  edc.fillStyle = "black";
  edc.fillText(""+playback_speed, -xOffset+edcWidth/9+4, -yOffset+(edcHeight-toolbarHeight)+toolbarHeight/1.5);
  
  drawOther();
}

function drawOther(){
  if(elementOver != null){
    edc.font = "16px arial";
    edc.fillStyle = "white";
    edc.fillRect(-xOffset+elementOver.mx, -yOffset+elementOver.my-24, elementOver.e.n.length*11, 24);
    edc.fillStyle = "black";
    edc.fillText(elementOver.e.n, -xOffset+elementOver.mx+4, -yOffset+elementOver.my-6);
  }
}

function setupToolBar(){
  editor_tools.push({n: "playback speed", x: edcWidth/80, y: (edcHeight-toolbarHeight)+toolbarHeight/4, w: edcWidth/10, h: toolbarHeight/2});
  for(var i = 0; i < tool_names.length; i++)
    editor_tools.push({n: tool_names[i], x: edcWidth/9+(edcWidth/15)*(i+1), y: (edcHeight-toolbarHeight)+toolbarHeight/4, w: toolbarHeight/2, h: toolbarHeight/2});
}