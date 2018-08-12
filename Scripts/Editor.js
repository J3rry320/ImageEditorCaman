$(document).ready(() => {



    $("#File").change((e) => {
        let fileToEdit = null;
        let files = e.target.files[0]
        var name = files.name;
        var reader = new FileReader();
        reader.onload = function (e) {
            fileToEdit = e.target.result;
$(".custom-file-label").text(name)
        }
        reader.onerror = function (event) {
            alert("ERROR: " + event.target.error.code);
        };
        reader.readAsDataURL(files);


        $("#Upload").bind("click", () => {
            let editor = $('#target').croppie({
                viewport: {
                    width: 100,
                    height: 100,
                },
                custimClass: "img-fluid",
                boundary: {
                    width: 200,
                    height: 200
                },
                showZoomer: true,
                enableResize: true,
                enableOrientation: true
            });
            editor.croppie('bind', {
                url: fileToEdit,
                orientation: 7,

            });


            console.log(editor.croppie("get"))
            $("#Corp").bind("click", () => {
                editor.croppie('result', 'base64', "original", "jpeg").then(function (html) {
                    $("#resultImage").attr("src", html)
                });
                // editor.croppie("destroy")
            })
        })

    })


    //Croppie Init

})





$('#target').on('update.croppie', function (ev, cropData) {
    console.log(ev, cropData)
});