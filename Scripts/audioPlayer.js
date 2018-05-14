
function getAudioDetails(event) {
    function reader(file) {
        var reader = new FileReader();
       var result= reader.readAsDataURL(file);
        return result.result
    }
    var file = event.target.files[0];
var files=reader(file)
console.log(files)
    var result = songToLaod.result;
    console.log(result)
    var sound = new Howl({
        src: file,
        autoplay: true,
        html5: true,
        volume: 0.5
    })
    sound.play()

    console.log(sound)
    jsmediatags.read(file, {
        onSuccess: function (tag) {
            console.log(tag)
        },
        onError: (error) => {
            console.log(error)
        }

    });
}

var selector = document.querySelector("#audioInput");
selector.addEventListener("change", getAudioDetails, false);
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', getAudioDetails, false);



