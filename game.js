var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var randomNumber;
var randomChosenColour;
function playSound(name){
var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
    randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");},100);
}
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started)
    {
    nextSequence();
        started=true;
    }
})
$(".btn").click(function(){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel)
{
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    } else {
      console.log("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");},200);
        level=0;
      $("h1").html("Game Over");
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      startover();
    }
}
function startover(){
  $("h1").html("Press A Key to Start");
  level=0;
  started=false;
  gamePattern=[];
}