// BUSINESS LOGIC
function pigDice(userToStart,p1,p2) {
  this.userToStart = userToStart;
  this.player1 = p1;
  this.player2 = p2;
  this.userPlaying = userToStart;
}
pigDice.prototype.roundScore = 0;
pigDice.prototype.finalScore = 20;
pigDice.prototype.globalScore1 = 0;
pigDice.prototype.globalScore2 = 0;

//pigDice.prototype.userPlaying = this.userToStart;
pigDice.prototype.easyArray = [1,2,3,4,5,6];
pigDice.prototype.rollDice =  function() {
  //Generate a random number to select the item in the array
  var diceSelector = Math.floor(Math.random() * this.easyArray.length);
  //select an item from the array
  var dice = this.easyArray[diceSelector];
  $(".dice-image").show();
  $(".dice-image img").attr("src","../images/dice-" + dice + ".png");
  if(dice !== 1) {
  //add the dice to the round score
    this.roundScore+=dice;
    $(".roundScoreDisplay" + this.userPlaying).text(this.roundScore);
  } else {
    $(".dice-image").hide();
    alert("Oh no you got a 1");
    this.otherPlayer();
  }
}
pigDice.prototype.userNotPlaying = function() {
  var toReturn
  if(this.userPlaying === 1) {
    return 2
  } else {
    return 1
  }
}
pigDice.prototype.userNotStarting = function() {
  if (this.userToStart === 1) {
    return 2
  } else {
    return 1;
  }
}
pigDice.prototype.hold = function(){ 
  $(".dice-image").hide();
  if(this.userPlaying === 1) {
    this.globalScore1+=this.roundScore;
    $(".globalScoreDisplay1").text(this.globalScore1);
  } else {
    this.globalScore2+=this.roundScore;
    $(".globalScoreDisplay2").text(this.globalScore2);
  }
  this.winner();
}
pigDice.prototype.winner = function() {
  if(this.globalScore1 >= this.finalScore || this.globalScore2 >= this.finalScore) {
    $(".user" + this.userPlaying + "Win").text("Winner!!");
    if(this.userPlaying === 1) {
      $("#game-board h3").text("Winner: " + this.player1);
    } else {
      $("#game-board h3").text("Winner: " + this.player2);
    }
    $("#rematch").show();
    this.roundScore = 0;
    $(".roundScoreDisplay1").text(this.roundScore);
    $(".roundScoreDisplay2").text(this.roundScore);
    $(".player-roll").attr("disabled",true);
    $(".player-hold").attr("disabled",true);
  } else {
    this.otherPlayer();
  }
}
pigDice.prototype.otherPlayer = function() {
  $(".roundScoreDisplay" + this.userPlaying).text(0);
  if(this.userPlaying === 1) {
    $("#user1").addClass("notPlaying");
    $("#user2").removeClass("notPlaying");
    this.userPlaying = 2;
  } else {
    $("#user2").addClass("notPlaying");
    $("#user1").removeClass("notPlaying");
    this.userPlaying = 1;
  }
  this.playerSwitch();
  this.roundScore = 0;
}
pigDice.prototype.playerSwitch = function() {
  if(this.userPlaying === 2) {
    $("#current-player").text(this.player2);
  } else {
    $("#current-player").text(this.player1);
  }
}
pigDice.prototype.newGame  = function() {
  this.roundScore = 0;
  this.globalScore1 = 0;
  this.globalScore2 = 0;
  $(".roundScoreDisplay1").text(this.roundScore);
  $(".roundScoreDisplay2").text(this.roundScore);
  $(".globalScoreDisplay1").text(this.globalScore1);
  $(".globalScoreDisplay2").text(this.globalScore2);
  $(".player-roll").attr("disabled",false);
  $(".player-hold").attr("disabled",false);
}
pigDice.prototype.initial = function() {
  if(this.userToStart === 1) {
    $("#game-board h3").text("Current Player: " + this.player1);
  } else {
    $("#game-board h3").text("Current Player: " + this.player2);
  }
  $(".user1Win").text(this.player1);
  $(".user2Win").text(this.player2);
  $("#user" + this.userNotStarting()).addClass("notPlaying");
  $("#rematch").hide();
}

//USER INTERFACE LOGIC
$(document).ready(function() {
  $("#description h4").click(function() {
    $(".gameplay").slideToggle();
  })
  $("#playBtn").click(function() {
    $("#description").hide();
    $("#settings").show();
  })
  $("#starter").click(function(event) {
    event.preventDefault();
    var playerOne = $("#userOne").val().toUpperCase();
    var playerTwo = $("#userTwo").val().toUpperCase();
    var userStarting = parseInt($("input:radio[name=starter]:checked").val());
    game = new pigDice(userStarting,playerOne,playerTwo);
    $("#settings").hide();
    $("#game").show();
    game.initial();
  })
  $(".player-roll").click(function() {
    game.rollDice(); 
  })
  $(".player-hold").click(function() {
    game.hold();
    console.log(game.player2);
    if(game.userPlaying == 1) {
      $("#current-player").html(game.player1);
    } else {
      $("#current-player").html(game.player2);
    }
  })
  $("#reset").click(function() {
    location.reload();
  })
  $("#rematch").click(function() {
    game.initial();
    game.newGame();
  })
})