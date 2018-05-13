
var selector = document.querySelector("audioInput");
selector.addEventListener("change", addAudio, false)
function addAudio(event) {
    var files = event.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {


        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var soundToPlay = new Howl(
                    {
                        src: theFile
                    }
                )

            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);

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

   
}


