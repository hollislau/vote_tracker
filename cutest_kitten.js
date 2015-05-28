$(function() {

  var kittens = [];
  var kittenLinks;

  var Photo = function () {
    this.votes = 0;
  }

  var tracker = {
    choice1: "",
    choice2: "",

    generateRandom: function() {
      return Math.floor(Math.random() * kittenLinks.length);
    },

    selectKittens: function() {
      tracker.choice1 = tracker.generateRandom();
      tracker.choice2 = tracker.generateRandom();

      while (tracker.choice1 === tracker.choice2) {
        tracker.choice2 = tracker.generateRandom();
      }

      $("img#choice1").attr("src", function() {
        return kittenLinks[tracker.choice1].link;
      })
      $("img#choice2").attr("src", function() {
        return kittenLinks[tracker.choice2].link;
      })
    },

    addWin: function() {
      $("img").on("click", function() {
        kittens[tracker[this.id]].votes++;

        $(this).addClass("win");

        $("h3#vote1").text("Total Votes: " + kittens[tracker.choice1].votes);
        $("h3#vote2").text("Total Votes: " + kittens[tracker.choice2].votes);
      })
    },

    newVote: function() {
      $("h3#new-vote").on("click", function() {
        tracker.selectKittens();

        $("img.win").removeClass("win");

        $("h3#vote1").text("I'm the cutest!");
        $("h3#vote2").text("No, you're not! I am!");
      })
    }
  }

  var loadImages = function() {
    $.ajax({
      url: "https://api.imgur.com/3/album/9r2Cn",
      headers: {
        Authorization: "Client-ID 990751fa0cd55cc"
      }
    })
      .done(function(data) {
        kittenLinks = data.data.images;

        for (var i = 0; i < kittenLinks.length; i++) {
          kittens.push(new Photo(i));
        }

        tracker.selectKittens();
      })
  }

  loadImages();
  tracker.addWin();
  tracker.newVote();

  console.log();

});
