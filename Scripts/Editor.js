$(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip()

    const Cropper = (target, options) => {

        return $(`#${target}`).croppie({
            viewport: {
                width: 300,
                height: 150,
            },
            customClass: "img-fluid",
            boundary: {
                width: options.width,
                height: options.height
            },
            showZoomer: true,
            enableResize: true,
            enableOrientation: true,
            mouseWheelZoom: false
        });

    }

    const Rotate = (target, value) => {
        target.croppie('bind', {
            url: value.src,
            orientation: value.value,

        });
    }
    const Editor = (selector, html, callback) => {
        Caman(selector, html, callback)
    }


    $("#File").change((e) => {
        let files = e.target.files[0]
        let Images = new Image()
        let reader = new FileReader();
        reader.onload = function (e) {
            Images.src = e.target.result;

            var name = files.name;
            var patt1=/\.[0-9a-z]+$/i;
            let extension=name.match(patt1)
            let nameToDisplay=name.slice(0,7)



            $(".custom-file-label").text(nameToDisplay+extension)

        }
        reader.onerror = function (event) {
            alert("ERROR: " + event.target.error.code);
        };
        if (files) reader.readAsDataURL(files);
        else alert("Error Loading The Files")

        let height = null;
        let width = null;

        Images.onload = function () {
            height = Images.height;
            width = Images.width
        }




        $("#Upload").bind("click", () => {
            $("#step1").hide()
            $("#step2").removeClass("hidden")
            let editor = Cropper("target", {
                width: width / 1.5,
                height: height / 2,

            })
            editor.croppie('bind', {
                url: Images.src,
                orientation: 1,

            });

            $("#undoRotate").bind("click", () => {
                Rotate(editor, {
                    src: Images.src,
                    value: 1
                })
            })
            $("#Filter").bind("click", () => {
                $("#EditorPane").hide();
                $("#filterTab").show();
            })
            $("#Settings").bind("click", () => {
                $("#EditorPane").hide();
                $("#settingsPane").show()
            })
            $("#closeSettings").bind("click", () => {
                $("#EditorPane").show();
                $("#settingsPane").hide()
            })
            $("#closeFilter").bind("click", () => {
                $("#EditorPane").show();
                $("#filterTab").hide()
            })
            //TODO Cannot Initialize Croppy Again Do It Mannualy
           /* $("#CorpAgain").bind("click", () => {
                editor.croppie("destroy")
                $("#EditorPane").hide();
                let canvas = $("#Retouched").get(0);
                let newImage = new Image()
                newImage.src = canvas.toDataURL()
                let width = null;
                let height = null;
                newImage.onload = function () {
                    width = newImage.width;
                    height = newImage.height;
                }

                let Neweditor = Cropper("Retouched", {
                    width: width,
                    height: height
                })
                Neweditor.croppie('bind', {
                    url: newImage.src,
                    orientation: 1,

                });
                Neweditor.croppie('result', 'base64', "original", "jpeg").then((html) => {
                    $("#EditorPane").show();
                    Editor("#Editor", html, function () {

                        this.render();


                    })
                    Editor("#Retouched", html, function () {

                        this.render();


                    })
                })

            })*/
            $("#Download").bind("click", () => {

            })

            //Will be improved
            $("#Rotate").bind("click", () => {

                let valueToPass = Math.floor(Math.random() * 8)
                if (valueToPass == 0 || valueToPass == 1) valueToPass == 2
                console.log(valueToPass)
                Rotate(editor, {
                    src: Images.src,
                    value: valueToPass
                })

            })
            $("#Corp").bind("click", () => {

                $("#buttonInStep2").addClass("hidden")
                $("#step3").removeClass("hidden")

                editor.croppie('result', 'base64', "original", "jpeg").then(function (html) {
                    editor.
                    croppie("destroy")
                    $(".Undo").bind("click", () => {
                        Editor("#Retouched", html, function () {
                            this.revert().render()
                        })
                    })
                    Editor("#Editor", html, function () {

                        this.render();


                    })
                    Editor("#Retouched", html, function () {

                        this.render();


                    })

                    editor.croppie("destroy")
                    $("#sinCity").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.sinCity().render()


                        });
                    })
                    $("#Lomo").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.lomo().render()


                        });
                    })
                    $("#herMajesty").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.herMajesty().render()


                        });
                    })
                    $("#Vintage").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.vintage().render()


                        });
                    })
                    $("#Grungy").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.grungy().render()


                        });
                    })
                    $("#Nostalgia").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.nostalgia().render()


                        });
                    })
                    $("#CrossProcess").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.crossProcess().render()


                        });
                    })
                    $("#HazyDays").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.hazyDays().render()


                        });
                    })
                    $("#Brightness").change(() => {

                        Editor("#Retouched", html, function () {

                            this.brightness($("#Brightness").val()).render()


                        });

                    });
                    $("#Clip").change(() => {

                        Editor("#Retouched", html, function () {

                            this.clip($("#Clip").val()).render()


                        });

                    });
                    $("#Gamma").change(() => {

                        Editor("#Retouched", html, function () {

                            this.gamma($("#Gamma").val()).render()


                        });

                    });
                    $("#Hue").change(() => {

                        Editor("#Retouched", html, function () {

                            this.hue($("#Hue").val()).render()


                        });

                    });
                    $("#Noise").change(() => {

                        Editor("#Retouched", html, function () {

                            this.noise($("#Noise").val()).render()


                        });

                    });
                    $("#Sepia").change(() => {

                        Editor("#Retouched", html, function () {

                            this.sepia($("#Sepia").val()).render()


                        });

                    });
                    $("#Sharpen").change(() => {

                        Editor("#Retouched", html, function () {

                            this.sharpen($("#Sharpen").val()).render()


                        });

                    });
                    $("#Contrast").change(() => {

                        Editor("#Retouched", html, function () {

                            this.contrast($("#Contrast").val()).render()

                        });

                    });
                    $("#Vibrance").change(() => {

                        Editor("#Retouched", html, function () {

                            this.vibrance($("#Vibrance").val()).render()

                        });
                    });
                    $("#stackBlur").change(() => {

                        Editor("#Retouched", html, function () {

                            this.stackBlur($("#stackBlur").val()).render()

                        });
                    });
                    $("#Saturation").change(() => {

                        Editor("#Retouched", html, function () {

                            this.saturation($("#Saturation").val()).render()

                        });
                    });
                    $("#Exposure").change(() => {

                        Editor("#Retouched", html, function () {

                            this.exposure($("#Exposure").val()).render()

                        });
                    });


                });



            })



        })

    })


    /* let variable= $('#target').on('update.croppie', function (ev, cropData) {
          console.log(ev, cropData)
          return cropData[1]
      });*/

    //Croppie Init

})