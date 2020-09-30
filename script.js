var arrAnimals = ["Dog", "Cat", "Duck", "Bee", "Sheep", "Cow", "Bunny", "Horse", "Pig", "Llama"]
for (var i = 0; i < arrAnimals.length; i++) {
    $("#animal-buttons").append("<button type=submit>" + arrAnimals[i] + "</button>");
}
$(document).ready(function (e) {
    // Start your code from here


    $("#add-animal").click(function (e) {
        e.preventDefault();
        var newButton = $("#animal-input").val();
        arrAnimals.push(newButton);

        $("#animal-buttons").append("<button type=submit>" + newButton + "</button>");

    });

    $(document).on("click", "button", function (e) {
        //borrar los que ya tengo puestos

        var s = $("#animals")
        s.find(".animal-item").remove();

        var buttonText = $(this).text()
        $.ajax({
            url: `https://api.giphy.com/v1/gifs/search?q=${buttonText}&api_key=wAInFvOGfdYuYo4CD0brIgSPILiyFcXA&limit=10`,
            success: function (ans) {
                for (i in ans.data) {
                    var animalDiv = $("<div class=animal-item>")
                    var rating = ans.data[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    foto = $("<img>");
                    foto.attr("src", ans.data[i].images.fixed_height_still.url);
                    foto.attr("foto-still", ans.data[i].images.fixed_height_still.url);

                    foto.attr("foto-move", ans.data[i].images.fixed_height.url);
                    foto.attr("en-movimiento", "no");
                    foto.addClass("animal-image");
                    //$("#animals").append(`<div><p>Rating: ${ans.data[i].rating}</p> ${foto}</div>`)
                    animalDiv.append(p);
                    animalDiv.append(foto);
                    $("#animals").append(animalDiv);

                }
            },
            error: function () {
                alert("No se pudieron obtener los gifs :(");
            },
        });
    });


    //funcion de cambiar el valor de still a movimiento
    $("body").on("click", "img", function (e) {
        var seMueve = $(this).attr("en-movimiento");

        if (seMueve === "no") {
            $(this).attr("src", $(this).attr("foto-move"))
            $(this).attr("en-movimiento", "si")
        } else {
            $(this).attr("src", $(this).attr("foto-still"));
            $(this).attr("en-movimiento", "no");
        }
    });

});






