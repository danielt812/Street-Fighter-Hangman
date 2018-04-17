//GLOBAL VARIABLES
//=============================================================
//Holds all words
var wordBank = ['ryu', 'ken', 'chun li', 'sagat'];
//Define valid inputs
var alphabetValues = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// Generate random word from wordBank variable
//var randWord = wordBank[Math.floor(Math.random() * wordBank.length)]
var randWord = "";
//Holds letters in word
var lettersInWord = []
//Holds number of strings in word
var numWord = 0;
//Holds underscores for random word
var underScores = [];
//Holds user guesses
var userGuesses = [];
//Holds wrong user guesses
var wrongLetter = [];
//Counters
var wins = 0;
var loss = 0;
var guessesLeft = randWord.length + 5;
var rightGuessCounter = 0;

//FUNCTIONS
//==================================================================
//This function starts game
function main (){
    //Choose word randomly from wordBank variable
    randWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    //Split random word into individual strings
    lettersInWord = randWord.split('');
    //Retrieve number of blanks
    numWord = lettersInWord.length;
    //Change numWord value to "_"'s
    for(var i = 0; i < numWord; i++)
        {
        underScores.push('_');
        //Change html to display "_"'s
        document.getElementById('currentWord').innerHTML = underScores;
        }
    //Changes to html
    document.getElementById('gameWins').innerHTML = wins;
    document.getElementById('guessesRemaining').innerHTML = guessesLeft;
    document.getElementById('wrongGuesses').innerHTML = wrongLetter;
    //=================================================================
    //Console testing
    console.log(randWord);
    console.log(lettersInWord);
    console.log(underScores);
}

function compare(userKey) {
    console.log("key pressed");
    //If letter user types matches letter in random word perform this function
    if(randWord.indexOf(userKey) > -1)
    {
        for(var i = 0; i < underScores; i++)
        {
            //Replace underscore with user input if guess correct
            if(lettersInWord[i] === userKey)
            {
                rightGuessCounter++;
                underScores = userKey;
                document.getElementById('currentWord').innerHTML = underScores;
            }
            
        }
    }

}



//Main function
main()
// Track user keystrokes
document.onkeyup = function(event) {
    userGuesses = event.key;
    // Check if letter guessed exist in randomword
    if(randWord.indexOf(userGuesses) > -1)
    {
        for(var i = 0; i < randWord.length; i++){
            // If user guess equals index value of underscore. Replace underscore with userguess
            if(randWord[i] === userGuesses){
                underScores[i] = userGuesses;
            }
        }
    }
            // If user guess does not equal index value of underscore. Push wrong guess to wrongLetter array and deduct a point
    else {
        wrongLetter.push(userGuesses);
        guessesLeft--;
    }
}
