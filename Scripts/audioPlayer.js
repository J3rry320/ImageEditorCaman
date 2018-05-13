var soundToPlay = new Howl(
    {
        src: []
    }
)
var selector = document.querySelector("audioInput");
selector.addEventListener("change", addAudio,false)
function addAudio(event) {
    var files = event.target.files
    var outputFiles = []
    for (x in files) {
        outputFiles.push(files[x])
    }
    return outputFiles

}
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', addAudio, false);

