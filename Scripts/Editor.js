$(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip()



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
            $("#step1").hide()
            $("#step2").removeClass("hidden")
            let editor = $('#target').croppie({
                viewport: {
                    width: 300,
                    height: 150,
                },
                customClass: "img-fluid",
                boundary: {
                    width: 400,
                    height: 200
                },
                showZoomer: true,
                enableResize: true,
                enableOrientation: true
            });
            editor.croppie('bind', {
                url: fileToEdit,
                orientation: 1,

            });


            $("#Corp").bind("click", () => {

                $("#buttonInStep2").addClass("hidden")
                $("#step3").removeClass("hidden")

                editor.croppie('result', 'base64', "original", "jpeg").then(function (html) {
                    console.log(html)
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

            const Editor = (selector, html, callback) => {
                Caman(selector, html, callback)
            }

        })

    })


    /* let variable= $('#target').on('update.croppie', function (ev, cropData) {
          console.log(ev, cropData)
          return cropData[1]
      });*/

    //Croppie Init

})