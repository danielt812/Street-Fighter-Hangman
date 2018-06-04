//OBJECTS
//=================================================================
var balrog = 
{
    "name": "balrog",
    "image": "balrogsprite.gif",
    "sound": "balrogmusic.mp3",
}

var blanka = 
{
    "name": "blanka",
    "image": "blankasprite.gif",
    "sound": "blankamusic.mp3",
}

var cammy = 
{
    "name": "cammy",
    "image": "cammysprite.gif",
    "sound": "cammymusic.mp3",
}

var chunLi = 
{
    "name": "chun li",
    "image": "chunlisprite.gif",
    "sound": "chunlimusic.mp3",
}

var deeJay = 
{
    "name": "dee jay",
    "image": "deejaysprite.gif",
    "sound": "deejaymusic.mp3",
}

var dhalsim = 
{
    "name": "dhalsim",
    "image": "dhalsimsprite.gif",
    "sound": "dhalsimmusic.mp3",
}

var eHonda = 
{
    "name": "e honda",
    "image": "ehondasprite.gif",
    "sound": "ehondamusic.mp3",
}

var feiLong = 
{
    "name": "fei long",
    "image": "feilongsprite.gif",
    "sound": "feilongmusic.mp3",
}

var guile = 
{
    "name": "guile",
    "image": "guilesprite.gif",
    "sound": "guilemusic.mp3",
}

var ken = 
{
    "name": "ken",
    "image": "kensprite.gif",
    "sound": "kenmusic.mp3",
}

var mbison = 
{
    "name": "mbison",
    "image": "mbisonsprite.gif",
    "sound": "mbisonmusic.mp3",
}

var ryu = 
{
    "name": "ryu",
    "image": "ryusprite.gif",
    "sound": "ryumusic.mp3",
}

var sagat = 
{
    "name": "sagat",
    "image": "sagatsprite.gif",
    "sound": "sagatmusic.mp3",
}

var thawk = 
{
    "name": "t hawk",
    "image": "thawksprite.gif",
    "sound": "thawkmusic.mp3",
}

var vega = 
{
    "name": "vega",
    "image": "vegasprite.gif",
    "sound": "vegamusic.mp3",
}

var zangief = 
{
    "name": "zangief",
    "image": "zangiefsprite.gif",
    "sound": "zangiefmusic.mp3",
}


//GLOBAL VARIABLES
//================================================================
var wordBank = [balrog, blanka, cammy, chunLi, deeJay, dhalsim, eHonda, feiLong, guile, ken, mbison, ryu, sagat, thawk, vega, zangief];
var totalWordBankLength = wordBank.length;
var wins = 0;
var randWordName = '';
var randWord = '';
var guessesLeft = randWord.length + 3;
var underScore = [];
var userGuess = [];
var userWrongGuess = [];

//FUNCTIONS
//=================================================================
//This function will be used to start game and reset counters/arrays
function main() 
{

    //Choose a word at random from wordBank.
    randWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    randWordName = randWord.name;
    console.log(randWordName);
    
     
     

    //These variables will be reset to their original value after win/loss.
    guessesLeft = randWordName.length + 3;
    userGuess = [];
    userWrongGuess = [];
    underScore = [];

    //Create underscores based on length of random word with for loop.
    for (var i = 0; i < randWordName.length; i++) 
    {
        //This if/else statement will make sure spaces in wordBank do not get underscore value.
        if (randWordName[i] === " ")
        {
            underScore.push(" ");
        }
        else {
            underScore.push(" _ ");
        }
    }
    //Push changes from js to html.
    document.getElementById("guessesRemaining").textContent = guessesLeft;
    //.join used make array index appear as a string in html
    document.getElementById("currentWord").textContent = underScore.join('');
    document.getElementById("wrongGuess").textContent = userWrongGuess;
    document.getElementById("gameWins").textContent = wins;
}

//This function will be used to compare userGuess to randWord.
function compareUserInput(letter) 
{
    console.log(letter);
    //This if statement will make sure that letters pressed more than once in a round won't count against user.
    if (userGuess.indexOf(letter) === -1)
    {
        //If letter chosen is not in userGuess array, push letter into userGuess.
        userGuess.push(letter);
        //Use For loop to check if index of randWord matches letter input choosen.
        for (var i = 0; i < randWordName.length; i++)
        {
            //Convert user input to lowercase incase they use capital letters.
            if(randWordName[i] === letter.toLowerCase())
            {
                //If index of underScore matches letter user inputs, then change value of underscore to letter of random assigned word.
                underScore[i] = randWordName[i];
            }
        }
        //Push changes from js to html.
        document.getElementById("currentWord").textContent = underScore.join('').toUpperCase();
        //Run next function to make changes based on wrong guesses by user.
        wrongGuess(letter);
    }
}

//This function will be used if userGuess does not match randWord
function wrongGuess(letter)
{
    //Need to make sure lowercase and uppercase value of userGuess is treated the same.
    if (underScore.indexOf(letter.toLowerCase()) === -1 
        && 
        underScore.indexOf(letter.toUpperCase()) === -1) 
    {
        //Decrease user guesses by one.
        guessesLeft--;
        //Push wrong guess into array.
        userWrongGuess.push(letter);
        //Push changes from js to html.
        document.getElementById("wrongGuess").textContent = userWrongGuess.join(' ').toUpperCase();
        document.getElementById("guessesRemaining").textContent = guessesLeft;
    }
    //Run next function to determine win or loss condition.
    checkWinLoss();
}

//This function checks whether we meet our win or loss condition.
function checkWinLoss() 
{
    //If randWord matches values of underScore after being converted to userGuess, give user a win.
    //.join used to treat underScore array as a string.
    if (randWordName.toLowerCase() === underScore.join('').toLowerCase())
    {
        wins++;
        document.getElementById("gameWins").textContent = wins;
        objImages();
        objSound();
        var completedWord = wordBank.indexOf(randWord)
        //Removes completed words from wordBank
        wordBank.splice(completedWord, 1);
        console.log(wordBank);
        if(wins == totalWordBankLength)
        {
            setTimeout(function()
            {
                restart();
            }, 5000);
        }
        else
        {
        main();
        }
    }
    //If user guesses drops to 0 reset game.
    else if (guessesLeft === 0) {
        main();
    }
}

//This function will add an image to html when called on
function objImages()
{   
    //Grab reference to element in html
    var objImageDiv = document.getElementById("objImage");
    //Remove original image in this div
    objImageDiv.innerHTML = '';
    //Manipulate DOM to create image tag in html
    var imageElement = document.createElement("img");
    imageElement.src = 'assets/images/' + randWord.image;
    imageElement.className = 'img-responsive imgGif';
    imageElement.alt = randWord.name;
    //Append image to html
    objImageDiv.appendChild(imageElement)
}

//This function will play music after a win condition is met.
function objSound()
{   
    //Grab reference to element in html
    var audioElement = document.getElementById("objSound");
    //Link sound file to object
    audioElement.src = 'assets/sounds/' + randWord.sound;
    //Set autoplay to true
    audioElement.autoplay = true;
}

function restart()
{
    //Grab reference to html
    var objImageDiv = document.getElementById("objImage");
    //Manipulate DOM to create restart button
    var restartButton = document.createElement("h2");
    restartButton.setAttribute("id", "restart");
    restartButton.textContent = "Play Again?"
    restartButton.addEventListener("click", function()
    {
        window.location.reload()
    })
    //Append div to html
    objImageDiv.appendChild(restartButton)
}

//EVENT HANDLERS
//===================================================================
//Onkeyup function will pass to letter input argument to compareUserInput parameter.
document.onkeyup = function(event) {
    //Only stores values from A to Z
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        compareUserInput(event.key);
    }
}

// Run main function
main()