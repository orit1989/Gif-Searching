var dances = ["Hip Hop Dancing", "Salsa Dancing", "Tango", "Ballet", "Break Dance"];

$(document).on('click', '.dance', function () {
    $("#gifs-appear-here").empty();


    var dance2 = $(this).attr("data-dance");


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dance2 + "&api_key=CkqaY7Ki8HSszfuoC1ThzAebps3k7AQ0&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(response);


        for (var i = 0; i < results.length; i++) {


            if (true) {

                var gifDiv = $("<div class='item'>");


                var rating = results[i].rating;


                var p = $("<p>").text("Rating: " + rating);


                var danceImage = $("<img>");

                danceImage.attr("src", results[i].images.fixed_height_still.url);


                danceImage.attr('data-still', results[i].images.fixed_height_still.url);
                danceImage.attr('data-animate', results[i].images.fixed_height.url);
                danceImage.attr('data-state','still');


                gifDiv.append(p);
                gifDiv.append(danceImage);


                $("#gifs-appear-here").prepend(gifDiv);

            }
        }

    });
})


function renderButtons() {

    $("#dances-view").empty();


    for (var i = 0; i < dances.length; i++) {


        var a = $("<button>");

        a.addClass("dance");

        a.attr("data-dance", dances[i]);

        a.text(dances[i]);

        $("#dances-view").append(a);
    }
};


$("#add-dance").on("click", function (event) {

    event.preventDefault();

    var dance = $("#dance-input").val().trim();

    dances.push(dance);

    console.log(dance);


    renderButtons();
});


$(document).on('click', 'img', function () {


    if ($(this).attr('data-state') == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});


renderButtons();