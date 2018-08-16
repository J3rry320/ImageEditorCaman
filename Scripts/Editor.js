$(document).ready(() => {


    const Cropper = (target, option) => {

        return $(`#${target}`).croppie({
            viewport: {
                width: 200,
                height: 200,
            },
            customClass: "img-fluid",
            boundary: {
                width: option.width,
                height: option.height,
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
    let Images = new Image()
    let reader = new FileReader();

    $("#File").change((e) => {
        let files = e.target.files[0]

        reader.onload = function (e) {
            Images.src = e.target.result;

            var name = files.name;
            var patt1 = /\.[0-9a-z]+$/i;
            let extension = name.match(patt1)
            let nameToDisplay = name.slice(0, 7)



            $(".custom-file-label").text(nameToDisplay + extension)

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
                width: width / 1.25,
                height: height / 2
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
                $('html,body').animate({
                    scrollTop: $("#filterTab").offset().top
                }, 1000);
            })
            $("#Settings").bind("click", () => {
                $("#EditorPane").hide();
                $("#settingsPane").show();
                $('html,body').animate({
                    scrollTop: $("#settingsPane").offset().top
                }, 1000);
            })
            $("#closeSettings").bind("click", () => {
                $("#EditorPane").show();
                $("#settingsPane").hide();
                $('html,body').animate({
                    scrollTop: $("#EditorPane").offset().top
                }, 1000);
            })
            $("#closeFilter").bind("click", () => {
                $("#EditorPane").show();
                $("#filterTab").hide();
                $('html,body').animate({
                    scrollTop: $("#EditorPane").offset().top
                }, 1000);
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
                        $(".Undo").hide();
                        $(".alert-undo").show()
                        $(".UNDO").bind("click", (e) => {
                            e.preventDefault();
                            Editor("#Retouched", html, function () {
                                this.revert().render()
                            })
                            $(".alert-undo").hide();
                            $(".Undo").show();
                        })

                    })
                    Editor("#Editor", html, function () {

                        this.render();


                    })
                    Editor("#Retouched", html, function () {

                        this.render();


                    })
                    //Download Button
                    $("#Download").bind("click", () => {
                        let ImagetoReturn = null;

                        Editor("#Retouched", html, function () {
                            this.render(function () {
                                ImagetoReturn = this.toBase64();
                                let b = $('<a></a>')
                                b.attr("href", ImagetoReturn)
                                b.attr("download", "Refined")
                                b.addClass("finalDownload")
                                $("#step3").append(b)


                                b[0].click()
                                b.remove();
                                location.reload(false)

                            });

                        })

                    })

                    editor.croppie("destroy")
                    $("#sinCity").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.sinCity().render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    })
                    $("#Lomo").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.lomo().render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    })
                    $("#herMajesty").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.herMajesty().render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
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
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    })
                    $("#Nostalgia").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.nostalgia().render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    })
                    $("#CrossProcess").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.crossProcess().render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    })
                    $("#HazyDays").bind("click", () => {
                        Editor("#Retouched", html, function () {

                            this.hazyDays().render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    })
                    $("#Brightness").change(() => {

                        Editor("#Retouched", html, function () {

                            this.brightness($("#Brightness").val()).render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Clip").change(() => {

                        Editor("#Retouched", html, function () {

                            this.clip($("#Clip").val()).render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Gamma").change(() => {

                        Editor("#Retouched", html, function () {

                            this.gamma($("#Gamma").val()).render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Hue").change(() => {

                        Editor("#Retouched", html, function () {

                            this.hue($("#Hue").val()).render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Noise").change(() => {

                        Editor("#Retouched", html, function () {

                            this.noise($("#Noise").val()).render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Sepia").change(() => {

                        Editor("#Retouched", html, function () {

                            this.sepia($("#Sepia").val()).render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Sharpen").change(() => {

                        Editor("#Retouched", html, function () {

                            this.sharpen($("#Sharpen").val()).render()


                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Contrast").change(() => {

                        Editor("#Retouched", html, function () {

                            this.contrast($("#Contrast").val()).render()

                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);

                    });
                    $("#Vibrance").change(() => {

                        Editor("#Retouched", html, function () {

                            this.vibrance($("#Vibrance").val()).render()

                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    });
                    $("#stackBlur").change(() => {

                        Editor("#Retouched", html, function () {

                            this.stackBlur($("#stackBlur").val()).render()

                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    });
                    $("#Saturation").change(() => {

                        Editor("#Retouched", html, function () {

                            this.saturation($("#Saturation").val()).render()

                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
                    });
                    $("#Exposure").change(() => {

                        Editor("#Retouched", html, function () {

                            this.exposure($("#Exposure").val()).render()

                        });
                        $('html,body').animate({
                            scrollTop: $("#Retouched,#Editor").offset().top
                        }, 1000);
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