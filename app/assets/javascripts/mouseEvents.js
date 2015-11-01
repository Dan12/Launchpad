function setupMouseInputs(){
  editor_canvas.addEventListener('mousewheel',function(event){
    event.preventDefault();
    xOffset-=event.deltaX;
    yOffset-=event.deltaY;
    drawLayout();
  });
  
  $("#toggle_editor_container").click(function(){
    $("#editor_container").toggle("display", function(){
      drawLayout(); reformat();
      $("#toggle_editor_container").html($("#editor_container").css("display") == "none" ? "Open Editor" : "Close Editor");
    });
  });
  
  $("#submit_login").click(function() {
      $.ajax({
        type: "POST",
        url: "/login",
        data: {username: $("#login_username").val(), password: $("#login_password").val()},
        success: function(data, textStatus, jqXHR) {
          console.log(data);
          // console.log(textStatus);
          // console.log(jqXHR);
          if(data.message == "success")
            $("#login_form").css("display", "none");
          else
            alert("There was an error");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error=" + errorThrown);
            alert("There was an error");
        }
      });
  });
  
  $("#editor_canvas").mousemove(function(e){
    elementOver = null;
    mouseX = e.pageX - $("#editor_canvas").offset().left;
    mouseY = e.pageY - $("#editor_canvas").offset().top;
    
    editor_tools.forEach(function(e, i, a){
      if(mouseX >= e.x && mouseX <= e.x+e.w && mouseY >= e.y && mouseY <= e.y+e.h)
        elementOver = {e: e, mx: mouseX, my: mouseY};
    });
    
    movePlaybackSlider(mouseX, mouseY);
    moveZoomSlider(mouseX, mouseY);
    
    toolMouseMoveManager(mouseX, mouseY);
    
    drawLayout();
  });
  
  $("#editor_canvas").mousedown(function(e){
    mouseX = e.pageX - $("#editor_canvas").offset().left;
    mouseY = e.pageY - $("#editor_canvas").offset().top;
    mouseDown = true;
    if(mouseY > edcHeight-toolbarHeight){
      editor_tools.forEach(function(e, i, a){
        if(mouseX >= e.x && mouseX <= e.x+e.w && mouseY >= e.y && mouseY <= e.y+e.h){
          current_tool = i;
          toolFunctionManager();
        }
      });
    }
    else{
      toolMouseDownManager(mouseX, mouseY);
      var mouseChecker = setInterval(function(){
        if(!mouseDown)
          clearInterval(mouseChecker);
        toolOffsetManager(mouseX, mouseY);
        drawLayout();
      },100);
    }
    drawLayout();
  });
  
  $("#editor_canvas").mouseup(function(e){
    mouseX = e.pageX - $("#editor_canvas").offset().left;
    mouseY = e.pageY - $("#editor_canvas").offset().top;
    mouseDown = false;
    if(current_tool == 0 || current_tool == 1)
      current_tool = 2;
    toolMouseUpManager(mouseX, mouseY);  
    drawLayout();
  });
  
  $("#editor_canvas").mouseleave(function(){
    mouseDown = false;
    drawLayout();
  });
}

function checkOffsets(){
  if(xOffset > 0)
    xOffset = 0;
  if(xOffset < -(maxWidth/tickScale)*tickWidth+edcWidth/2)
    xOffset = -(maxWidth/tickScale)*tickWidth+edcWidth/2;
  if(yOffset > scrubbing_bar_height)
    yOffset = scrubbing_bar_height;
  if(yOffset < -cellHeight*numButtons+edcHeight-toolbarHeight)
    yOffset = -cellHeight*numButtons+edcHeight-toolbarHeight;
}