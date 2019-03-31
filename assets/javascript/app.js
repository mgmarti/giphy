$(document).ready(function() {
    console.log('Page Ready!');

    var queries = ["Llamas", "Raccoons", "Pandas", "Tarsiers", "Lemurs"];
    console.log(queries);

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < queries.length; i++)  {

            var newButton = $("<button>");
            newButton.addClass("animal-button");
            newButton.attr("data-name", queries[i]);
            newButton.text(queries[i]);

            $("#button-area").append(newButton);
        }
    }

    renderButtons();



});