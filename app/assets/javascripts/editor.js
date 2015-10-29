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
}

function drawLayout(){
  edc.setTransform(1, 0, 0, 1, xOffset, yOffset);
  
  edc.clearRect(-xOffset,-yOffset,edcWidth, edcHeight);

  edc.strokeStyle = "black";
  edc.lineWidth = 1;
  edc.font = "16px arial";

  edc.fillStyle = "white";
  edc.fillRect(0,0,cellWidth,cellHeight*numButtons);
  edc.fillStyle = "black";
  edc.fillText(String.fromCharCode(keyCodes[0]), 4, (1)*cellHeight-4);
  for(var i = 1; i < numButtons; i++){
    edc.beginPath();
    edc.moveTo(-xOffset, i*cellHeight);
    edc.lineTo(-xOffset+edcWidth, i*cellHeight);
    edc.stroke();
    
    var drawString = String.fromCharCode(keyCodes[i]);
    if(keyCodes[i] == 13)
      drawString = "/n";
    if(keyCodes[i] == 16)
      drawString = "/s";
    edc.fillText(drawString, 4, (i+1)*cellHeight-4);
  }
  
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
  
  edc.strokeStyle = "blue";
  edc.beginPath();
  edc.moveTo(cellWidth+cursor_at,-yOffset);
  edc.lineTo(cellWidth+cursor_at,-yOffset+edcHeight);
  edc.stroke();
  
  edc.fillStyle = "lightgray";
  edc.fillRect(-xOffset, -yOffset+(edcHeight-toolbarHeight), edcWidth, toolbarHeight);
}