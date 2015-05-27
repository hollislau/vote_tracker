$(function() {

  var Photo = function () {
    this.votes = 0;
  }

  var kittens = [];

  for (var i = 0; i < 14; i++) {
    kittens.push(new Photo(i));
  }

  var tracker = {
    choice1: "",
    choice2: "",
    generateRandom: function() {
      return Math.floor(Math.random() * 14);
    },

    selectKittens: function() {
      tracker.choice1 = tracker.generateRandom();
      tracker.choice2 = tracker.generateRandom();

      while (tracker.choice1 === tracker.choice2) {
        tracker.choice2 = tracker.generateRandom();
      }

      $("img#choice1").attr("src", function() {
        return "images/" + tracker.choice1 + ".jpg";
      })
      $("img#choice2").attr("src", function() {
        return "images/" + tracker.choice2 + ".jpg";
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

  tracker.selectKittens();
  tracker.addWin();
  tracker.newVote();

});
