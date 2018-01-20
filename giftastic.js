$(document).ready(function() {

var topics = ["Happy", "Sad", "Anxious", "Angry", "Sleepy", "Witty", "Hot", "Crazy", "Excited"];


 
    function displayMoodGif() {

    var mood = $(this).attr("data-name");
    console.log(mood);

    var queryURL = "https://api.giphy.com/v1/search?q=" + mood + "&api_key=49fNGiTIkHzMvqZ59HcoBOxVx0XF71kk&limit=10";
  

      $.ajax({
            url: queryURL,
            method: "GET",
            dataType: 'jsonp',
      }).done(function(response) {
            console.log(queryURL);

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
          
            var moodDiv = $("<div class='col-md-4'>");

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var AnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var moodImage = $("<img>");
          

            moodImage.attr("src", staticSrc);
            moodImage.addClass("moodGiphy");
            moodImage.attr("data-state", "still");
            moodImage.attr("data-still", staticSrc);
          moodImage.attr("data-animate", AnimatedSrc);
          moodDiv.append(p);
            moodDiv.append(moodImage);
            $("#gifArea").prepend(moodDiv);

          }
      });
  }

  
    $("#add-mood").on("click", function(event) {
        event.preventDefault();
        var newMood = $("#mood-input").val().trim();
        topics.push(newMood);
        console.log(topics);
        $("#mood-input").val('');
        displayButtons();
    });

  
    function displayButtons() {
      $("#buttons-view").empty();
      for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
          a.attr("id", "buttons-view");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
        $("#buttons-view").append(a);
      }
    }
  displayButtons();

  
  $(document).on("click", "#buttons-view", displayMoodGif);

  
  $(document).on("click", ".moodGiphy", gifMovements);



     
  function gifMovements() {
     var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  };

});