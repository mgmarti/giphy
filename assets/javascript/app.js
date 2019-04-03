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
        console.log(queries);
     
        $("#input-animal").val("")
    });

    $(document.body).on("click", ".animal-button", function() {
    console.log("CLICK CLICK");

    const animalName = $(this).attr("data-animal");
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&key=NWSi6hzZ4d8qNSQo03XgsTc82qbD6pEX&limit=8";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response)
               const results = response.data;

                for (var i = 0; i < results.length; i++) {

                    const animalDiv = $("<div class='animalDiv'>");
                    const p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                    const animalImage = $("<img>").attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-state", "still");
                    animalImage.attr("class", "gif");

                    animalDiv.append(p);
                    animalDiv.append(animalImage);
        
                    $("#gif-area").prepend(animalDiv);
                  }
            })
    })

    function changeState() {          

        const state = $(this).attr("data-state");
        const animate = $(this).attr("data-animate");
        const still = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }   
    }

    $(document).on("click", ".gif", changeState);
        
        
});