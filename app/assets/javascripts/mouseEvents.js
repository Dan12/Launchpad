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
    $("#editor_container").toggle("display", function(){
      drawLayout(); reformat();
      $("#toggle_editor_container").html($("#editor_container").css("display") == "none" ? "Open Editor" : "Close Editor");
    });
  });
  
  $("#editor_canvas").mousemove(function(e){
    elementOver = null;
    var mouseX = e.pageX - $("#editor_canvas").offset().left;
    var mouseY = e.pageY - $("#editor_canvas").offset().top;
    
    editor_tools.forEach(function(e, i, a){
      if(mouseX >= e.x && mouseX <= e.x+e.w && mouseY >= e.y && mouseY <= e.y+e.h)
        elementOver = {e: e, mx: mouseX, my: mouseY};
    });
    
    movePlaybackSlider(mouseX, mouseY);
    moveZoomSlider(mouseX, mouseY);
    
    drawLayout();
  });
  
  $("#editor_canvas").mousedown(function(e){
    var mouseX = e.pageX - $("#editor_canvas").offset().left;
    var mouseY = e.pageY - $("#editor_canvas").offset().top;
    if(mouseY > edcHeight-toolbarHeight){
      editor_tools.forEach(function(e, i, a){
        if(mouseX >= e.x && mouseX <= e.x+e.w && mouseY >= e.y && mouseY <= e.y+e.h)
          current_tool = i;
          toolFunctionManager();
      });
    }
    else{
      
    }
    drawLayout();
  });
  
  $("#editor_canvas").mouseup(function(e){
    var mouseX = e.pageX - $("#editor_canvas").offset().left;
    var mouseY = e.pageY - $("#editor_canvas").offset().top;
    if(current_tool == 0 || current_tool == 1)
      current_tool = 2;
      
      drawLayout();
  });
  
  $("#editor_canvas").mouseleave(function(){
    drawLayout();
  });
}