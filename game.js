
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var

function nextSequence() {

  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // animatePress(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


// $("body").click(function(){nextSequence()});

var started = false;
var level = 0;

$("body").keydown(function() {
  if(!started){
    nextSequence();
    started = true;
    $("#level-title").text("Level " + level);
  }
})


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

    var count = 0;
    for (var i = 0; i < gamePattern.length; i++) {
      if(gamePattern[i] === userClickedPattern[i]){
        count++;
      }
    }
    if(count === gamePattern.length){
      console.log("success");
      setTimeout(function(){
          nextSequence();
        }, 1000);
    }

  } else {
      console.log("wrong");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over");
      $("h2").text("(Press Any Key to Restart)")
      startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  pressed = false;
}


function playSound(name) {
  var audio = new Audio("sounds\\" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}
