$(document).ready(() => {

    $("#confirmButton").hide()
    $("#inputGroupFile").change((e) => {
        let resultArr = []
        let newArr = []
        for (var i = 0; i < e.target.files.length; i++) {
            (function (file) {
                var name = file.name;
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(`<li>${name} <a  class="clearFiles btn  float-right">&#10006;</a> </li>`).appendTo("#fileList").addClass("list-group-item ")
                    $("#confirmButton").show()
                    resultArr.push(e.target.result)
                    newArr.push(file.name)
                }
                reader.onerror = function (event) {
                    alert("ERROR: " + event.target.error.code);
                };
                reader.readAsDataURL(file);
            })(e.target.files[i]);
        }

        $("#confirmButton").bind("click", () => {
            $("#landing").hide();
            $("#collageMaker").removeClass("hidden");
            for (let j = 0; j < resultArr.length; j++) {

                $(`<img>`).appendTo(".finalImage").attr("href", resultArr[j]).addClass(`Images${j}`).each((i, obj) => {

                    $(`.Images${j}>img`).attr("src", obj.href)
                })


            }
            let height_value = $("#height").val();
            let margin = $("#margin").val();
            let border = $("#border").val();
            let randomized = $("#defaultCheck").is(':checked');

            let radioButton = $('[name="exampleRadios"]').val();
            $("#margin").change(() => {
                margin = $("#margin").val();
                loaderFunction(height_value, margin, border, randomized)
            })
            $("#border").change(() => {
                border = $("#border").val();
                loaderFunction(height_value, margin, border, randomized)
            });
            $('#defaultCheck').change(() => {
                randomized = $("#defaultCheck").is(':checked')
                loaderFunction(height_value, margin, border, randomized)
            })
            $('[name="exampleRadios"]').change(function () {
                if ($("input[name='exampleRadios']:checked").val() == 'justify') {
                    radioButton = $("input[name='exampleRadios']:checked").val()
                    loaderFunction(height_value, margin, border, randomized, radioButton)
                }
                if ($("input[name='exampleRadios']:checked").val() == 'nojustify') {
                    radioButton = $("input[name='exampleRadios']:checked").val()
                    console.log(radioButton)
                    loaderFunction(height_value, margin, border, randomized, radioButton)
                }
                if ($("input[name='exampleRadios']:checked").val() == 'hide') {
                    radioButton = $("input[name='exampleRadios']:checked").val()
                    loaderFunction(height_value, margin, border, randomized, radioButton)
                }
            });

            $("#height").change(function () {
                height_value = $("#height").val();
                loaderFunction(height_value);

            })
            console.log(margin, border, randomized, radioButton,randomized  );

            const loaderFunction = (height, margin, border, random, radioButton) => {
                $(".finalImage").justifiedGallery({
                    rowHeight: height,
                    lastRow: radioButton,
                    margins: margin,
                    border: border,
                    rtl: true,
                    randomize: random,
                    sizeRangeSuffixes: {
                        'lt100': '_t',
                        'lt240': '_m',
                        'lt320': '_n',
                        'lt500': '',
                        'lt640': '_z',
                        'lt1024': '_b'
                    }
                });
            }
            loaderFunction(height_value, margin, border, randomized,radioButton);

            $('.finalImage').justifiedGallery().on('jg.complete', function (e) {

            });

        })

    })


    $("#basicExample").justifiedGallery({
        rowHeight: 130,
        lastRow: 'justify',
        margins: 0,
        rtl: true,
        randomize: true,
        sizeRangeSuffixes: {
            'lt100': '_t',
            'lt240': '_m',
            'lt320': '_n',
            'lt500': '',
            'lt640': '_z',
            'lt1024': '_b'
        }
    });
})