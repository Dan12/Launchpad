var Zip_Space = new function(){
  this.dataArray = {};
  
  this.initialize = function() {
    zip.workerScripts = {
      inflater: ['zip/src/z-worker.js', 'zip/src/inflate.js']
    }; 
  }
  
  // recursively iterate over the entries
  interateEntries = function(entries, i, reader, callback){
    if(i < entries.length){
      if(entries[i].directory)
        interateEntries(entries, i+1, reader, callback);
      else if(entries[i].filename.endsWith('.mp3')) {
        entries[i].getData(new zip.Data64URIWriter('audio/mp3'), function(data) {
          Zip_Space.dataArray[entries[i].filename] = data;
          interateEntries(entries, i+1, reader, callback);
        });
      } else {
        interateEntries(entries, i+1, reader, callback);
      }
    } else {
      reader.close(function() {
        callback();
      });
    }
  }
  
  this.loadZip = function(name, callback){
    this.dataArray = {};
    var xhr = new XMLHttpRequest()
    xhr.open("GET", `zip/sounds/${name}.zip`)
    xhr.responseType = "blob"
    xhr.onload = function(){
        // console.log(xhr.response)
        zip.createReader(new zip.BlobReader(xhr.response), function(reader) {
          $(".soundPack").html("Extracting Sounds...");
          // get all entries from the zip
          reader.getEntries(function(entries) {
            interateEntries(entries, 1, reader, callback);
          });
        }, function(error) {
          console.log(error);
          $("#error_msg").html("There was a critical error. Please check back later.");
        });
    }
    xhr.send()
    $(".soundPack").html("Loading main sound file...");
  }
}