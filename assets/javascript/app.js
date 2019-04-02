$(document).ready(function() {
    // console.log('Page Ready!');

    const queries = ["Llamas", "Raccoons", "Pandas", "Loris", "Lemurs"];
    // console.log(queries);

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < queries.length; i++)  {

            const newButton = $("<button>");
            newButton.addClass("animal-button btn-dark");
            newButton.attr("data-animal", queries[i]);
            newButton.text(queries[i]);

            $("#button-area").append(newButton);
        }
    }

    renderButtons();

    $("#search-button").on("click", function(event) {
        event.preventDefault();
        queries.push($("#input-animal").val().trim())
        $("#button-area").empty();
        renderButtons();
     
        $("#input-animal").val("")
    });

    $(".animal-button").on("click", function() {
    // console.log("CLICK CLICK");

    const animalName = $(this).attr("data-animal");
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&key=NWSi6hzZ4d8qNSQo03XgsTc82qbD6pEX";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response)
               const results = response.data;

                for (var i = 0; i < results.length; i++) {

                    const animalDiv = $("<div class='animalDiv'>");
                    const p = $("<p>").text("Rating: " + results[i].rating);
                    const animalImage = $("<img>").attr('src', results[i].images.fixed_height.url);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
        
                    $("#gif-area").prepend(animalDiv);
                  }
            })
    })



        
        
});