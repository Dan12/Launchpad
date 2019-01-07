var BackendSpace = new function(){

  this.init = function(){
    return new BackendComm();
  }

  var BackendComm = function(){
    $("#close_layover").click(function(){
      $("#gray_background").css("display","none");
      $("#login_form").css("display","none");
      $("#load_songs").css("display","none");
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
          if(data.message == "success"){
            $("#login_form").css("display", "none");
            $("#gray_background").css("display", "none");
          }
          else
            alert("There was an error");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error=" + errorThrown);
            alert("There was an error");
        }
      });
    });
  }
  
  BackendComm.prototype.saveSong = function(notes, pid, editor, song_number){
    alert("Saving songs not yet supported");
    /*
    var loadSongName = "";
    setTimeout(function(){
      if(pid == -1)
        loadSongName = prompt("Enter song name");
      $.ajax({
        type: "POST",
        url: "/create_song",
        data: {song_data: notes, id: pid, name: loadSongName, songNum: song_number},
        success: function(data, textStatus, jqXHR) {
          // console.log(data);
          // console.log(textStatus);
          // console.log(jqXHR);
          // console.log(data.data.song_data);
          if(data.data == "null")
            alert("Not Saved, try again");
          else if(data.data == "nil"){
            alert("You must be logged in");
            $("#gray_background").css("display","block");
            $("#login_form").css("display", "block");
          }
          else{
            alert("Song successfully saved");
            // send project id back to editor (if new project, will be new pid)
            editor.notesSaved(data.data);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error=" + errorThrown);
          alert("Not Saved, try again");
        }
      });
    },100);
    */
  }
  
  BackendComm.prototype.loadSongs = function(editor, song_number){
    $.ajax({
      type: "POST",
      url: "/view_all_songs",
      data: {songNum: song_number},
      success: function(data, textStatus, jqXHR) {
        // console.log(data);
        // console.log(textStatus);
        // console.log(jqXHR);
        $("#gray_background").css("display", "block");
        $("#load_songs").css("display", "block");
        $(".loaded_song").remove();
        data.data.forEach(function(e, i, a){
          $("#load_songs").append('<div class="loaded_song" song_ind="'+i+'">'+e.name+'</div>');
        });
        $(".loaded_song").click(function(){
          $("#gray_background").css("display", "none");
          $("#load_songs").css("display", "none");
          var ind = parseInt($(this).attr("song_ind"));
          var tempinput = JSON.parse(data.data[ind].song_data);
          editor.notesLoaded(tempinput,parseInt(data.data[ind].id));
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error=" + errorThrown);
          alert("There was an error");
      }
    });
  }

}