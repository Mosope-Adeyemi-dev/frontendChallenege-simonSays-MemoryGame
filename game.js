buttonColors = ['green','red','yellow','blue'];
gamePattern = [];  //stores the random colors generated
userClickedPattern = [];  //stores id of buttons user clicks
started = false; //to know if game has started;
var level = 0;  //games current level


function instructions(){
    alert(`This is a clone of the popular simon say's game \nIts major aim is to help children better their ability to commit things to memory.\nWhen you start the game, it will start off by showing you a color e.g blue \nOnce you press the blue button, it will show you another color, lets say green \nYou would now have to remember the sequence from the start of the game \nI.e you would have to press Blue first followed by the newly shown color which was blue, and so on\nThe goal is to remember the pattern\nHave fun playing!!`);
}



function nextSequence(){
    $("input").val("");
    var randomNumber = Math.floor((Math.random()*4));
    randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);  
            playSound(randomChosenColor);
            animatePress(randomChosenColor);  
    level++;  //increase level when 
    $("h1").text("level "+level);
}

$(".btn").click(function clickHandler(){
        var userChosenColor = $(this).attr("id");
            userClickedPattern.push(userChosenColor);
                playSound(userChosenColor);
                animatePress(userChosenColor); 
        checkAnswer(userClickedPattern.length - 1);      
});


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
        setTimeout( function () {
            $("#"+currentColor).removeClass("pressed");},200);
}


function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}


$(document).keydown(function (){
   
    if(!started){
        $("h1").text("level "+level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("good"); 
        console.log(userClickedPattern); console.log(gamePattern);
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
                userClickedPattern = [];
        }
    }
    else{
        startOver();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");  
        },200);
       playSound("wrong"); 
       $("h1").text("Game Over, Press Any Key To Restart");
      }
}
 
function startOver(){
level = 0;
gamePattern = [];
started = false;
userClickedPattern = [];
} 
