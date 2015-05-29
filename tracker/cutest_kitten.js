$(function() {

  $.ajax({
    url: "https://api.imgur.com/3/album/9r2Cn",
    headers: {
      Authorization: "Client-ID 990751fa0cd55cc"
    }
  })
    .done(function(response) {
      var kittens = [];
      var kittenImages = response.data.images;

      for (var i = 0; i < kittenImages.length; i++) {
        kittens.push(new Photo(i));
      }

      tracker.selectKittens(kittenImages);
      tracker.addWin(kittens);
      tracker.newVote(kittenImages);
    })

  function Photo() {
    this.votes = 0;
  }

  var tracker = {
    choice1: "",
    choice2: "",

    generateRandom: function(images) {
      return Math.floor(Math.random() * images.length);
    },

    selectKittens: function(images) {
      tracker.choice1 = tracker.generateRandom(images);
      tracker.choice2 = tracker.generateRandom(images);

      while (tracker.choice1 === tracker.choice2) {
        tracker.choice2 = tracker.generateRandom(images);
      }

      $("img#choice1").attr("src", function() {
        return images[tracker.choice1].link;
      })
      $("img#choice2").attr("src", function() {
        return images[tracker.choice2].link;
      })
    },

    addWin: function(kittens) {
      $("img").on("click", function() {
        kittens[tracker[this.id]].votes++;

        $(this).addClass("win");

        $("h3#vote1").text("Total Votes: " + kittens[tracker.choice1].votes);
        $("h3#vote2").text("Total Votes: " + kittens[tracker.choice2].votes);
      })
    },

    newVote: function(images) {
      $("h3#new-vote").on("click", function() {
        tracker.selectKittens(images);

        $("img.win").removeClass("win");

        $("h3#vote1").text("I'm the cutest!");
        $("h3#vote2").text("No, you're not! I am!");
      })
    }
  }

  console.log();

});
