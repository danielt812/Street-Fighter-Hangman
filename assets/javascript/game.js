//*OBJECTS
//*=================================================================
function Fighter(display, name, image, portrait, theme) {
  (this.display = display),
    (this.name = name),
    (this.image = image),
    (this.portrait = portrait),
    (this.theme = theme);
}

var akuma = new Fighter(
  'akuma',
  'akuma',
  'akumasprite.gif',
  'akumaportrait.png',
  'akumamusic.mp3'
);

var balrog = new Fighter(
  'balrog',
  'balrog',
  'balrogsprite.gif',
  'balrogportrait.png',
  'balrogmusic.mp3'
);

var blanka = new Fighter(
  'blanka',
  'blanka',
  'blankasprite.gif',
  'blankaportrait.png',
  'blankamusic.mp3'
);

var cammy = new Fighter(
  'cammy',
  'cammy',
  'cammysprite.gif',
  'cammyportrait.png',
  'cammymusic.mp3'
);

var chunLi = new Fighter(
  'chun li',
  'chunli',
  'chunlisprite.gif',
  'chunliportrait.png',
  'chunlimusic.mp3'
);

var deeJay = new Fighter(
  'dee jay',
  'deejay',
  'deejaysprite.gif',
  'deejayportrait.png',
  'deejaymusic.mp3'
);

var dhalsim = new Fighter(
  'dhalsim',
  'dhalsim',
  'dhalsimsprite.gif',
  'dhalsimportrait.png',
  'dhalsimmusic.mp3'
);

var eHonda = new Fighter(
  'e honda',
  'ehonda',
  'ehondasprite.gif',
  'ehondaportrait.png',
  'ehondamusic.mp3'
);

var feiLong = new Fighter(
  'fei long',
  'feilong',
  'feilongsprite.gif',
  'feilongportrait.png',
  'feilongmusic.mp3'
);

var guile = new Fighter(
  'guile',
  'guile',
  'guilesprite.gif',
  'guileportrait.png',
  'guilemusic.mp3'
);

var ken = new Fighter(
  'ken',
  'ken',
  'kensprite.gif',
  'kenportrait.png',
  'kenmusic.mp3'
);

var mBison = new Fighter(
  'm bison',
  'mbison',
  'mbisonsprite.gif',
  'mbisonportrait.png',
  'mbisonmusic.mp3'
);

var ryu = new Fighter(
  'ryu',
  'ryu',
  'ryusprite.gif',
  'ryuportrait.png',
  'ryumusic.mp3'
);

var sagat = new Fighter(
  'sagat',
  'sagat',
  'sagatsprite.gif',
  'sagatportrait.png',
  'sagatmusic.mp3'
);

var tHawk = new Fighter(
  't hawk',
  'tHawk',
  'thawksprite.gif',
  'thawkportrait.png',
  'thawkmusic.mp3'
);

var vega = new Fighter(
  'vega',
  'vega',
  'vegasprite.gif',
  'vegaportrait.png',
  'vegamusic.mp3'
);

var zangief = new Fighter(
  'zangief',
  'zangief',
  'zangiefsprite.gif',
  'zangiefportrait.png',
  'zangiefmusic.mp3'
);

//*GLOBAL VARIABLES
//*================================================================
var wordBank = [
  akuma,
  balrog,
  blanka,
  cammy,
  chunLi,
  deeJay,
  dhalsim,
  eHonda,
  feiLong,
  guile,
  ken,
  mBison,
  ryu,
  sagat,
  tHawk,
  vega,
  zangief
];
var totalWordBankLength = wordBank.length;
var wins = 0;
var randWordName = '';
var randWord = '';
var randWordLength = '';
var guessesLeft = randWord.length;
var underScore = [];
var userGuess = [];
var userWrongGuess = [];

//*FUNCTIONS
//*=================================================================
// #This function will be used to start game and reset counters/arrays
function main() {
  // Choose a word at random from wordBank.
  randWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  randWordName = randWord.display;
  randWordLength = randWord.name;
  console.log(randWordName);

  // These variables will be reset to their original value after win/loss.
  guessesLeft = randWordLength.length + 1;
  userGuess = [];
  userWrongGuess = [];
  underScore = [];

  // Create underscores based on length of random word with for loop.
  for (var i = 0; i < randWordName.length; i++) {
    // This if/else statement will make sure spaces in wordBank do not get underscore value.
    if (randWordName[i] === ' ') {
      underScore.push(' ');
    } else {
      underScore.push(' _ ');
    }
  }
  // Push changes from js to html.
  document.getElementById('guessesRemaining').textContent = guessesLeft;
  // Join used make array index appear as a string in html
  document.getElementById('currentWord').textContent = underScore.join('');
  document.getElementById('wrongGuess').textContent = userWrongGuess;
  document.getElementById('gameWins').textContent = wins;
}

// #This function will be used to compare userGuess to randWord.
function compareUserInput(letter) {
  // This if statement will make sure that letters pressed more than once in a round won't count against user.
  if (userGuess.indexOf(letter) === -1) {
    // If letter chosen is not in userGuess array, push letter into userGuess.
    userGuess.push(letter);
    // Use For loop to check if index of randWord matches letter input choosen.
    for (var i = 0; i < randWordName.length; i++) {
      // Convert user input to lowercase incase they use capital letters.
      if (randWordName[i] === letter.toLowerCase()) {
        // If index of underScore matches letter user inputs, then change value of underscore to letter of random assigned word.
        underScore[i] = randWordName[i];
      }
    }
    // Push changes from js to html.
    document.getElementById('currentWord').textContent = underScore
      .join('')
      .toUpperCase();
    // Run next function to make changes based on wrong guesses by user.
    wrongGuess(letter);
  }
}

// #This function will be used if userGuess does not match randWord
function wrongGuess(letter) {
  // Need to make sure lowercase and uppercase value of userGuess is treated the same.
  if (
    underScore.indexOf(letter.toLowerCase()) === -1 &&
    underScore.indexOf(letter.toUpperCase()) === -1
  ) {
    // Decrease user guesses by one.
    guessesLeft--;
    // Push wrong guess into array.
    userWrongGuess.push(letter);
    // Push changes from js to html.
    document.getElementById('wrongGuess').textContent = userWrongGuess
      .join(' ')
      .toUpperCase();
    document.getElementById('guessesRemaining').textContent = guessesLeft;
  }
  // Run next function to determine win or loss condition.
  checkWinLoss();
}

// #This function checks whether we meet our win or loss condition.
function checkWinLoss() {
  // If randWord matches values of underScore after being converted to userGuess, give user a win.
  // Join used to treat underScore array as a string.
  if (randWordName.toLowerCase() === underScore.join('').toLowerCase()) {
    wins++;
    document.getElementById('gameWins').textContent = wins;
    fighterImage();
    fighterTheme();
    var completedWord = wordBank.indexOf(randWord);
    // Removes completed words from wordBank
    wordBank.splice(completedWord, 1);
    // Three seconds until next word available, Five seconds after game ends
    if (wins == totalWordBankLength) {
      setTimeout(function() {
        fighterPortrait();
        restart();
      }, 5000);
    } else {
      setTimeout(function() {
        main();
      }, 3000);
    }
  }
  // If user guesses drops to 0 reset game
  else if (guessesLeft === 0) {
    main();
  }
}

// #This function will add fighter image to html when called on
function fighterImage() {
  // Grab reference to element in html
  var fighterImageDiv = document.getElementById('fighterImage');
  //Remove original image in this div
  fighterImageDiv.innerHTML = '';
  // Manipulate DOM to create img tag in html
  var imageElement = document.createElement('img');
  imageElement.src = 'assets/images/' + randWord.image;
  imageElement.className = 'img-responsive imgGif';
  imageElement.alt = randWord.name;
  // Append image to html
  fighterImageDiv.appendChild(imageElement);
}

// #This function will add fighter portrait to html when called on
function fighterPortrait() {
  // Grab reference to element in html
  var fighterPortraitDiv = document.getElementById('fighterImage');
  //Remove original Portrait in this div
  fighterPortraitDiv.innerHTML = '';
  // Manipulate DOM to create img tag in html
  var PortraitElement = document.createElement('img');
  PortraitElement.src = 'assets/images/' + randWord.portrait;
  PortraitElement.className = 'img-responsive imgPng';
  PortraitElement.alt = randWord.name;
  //Append Portrait to html
  fighterPortraitDiv.appendChild(PortraitElement);
}

// #This function will play music after a win condition is met
function fighterTheme() {
  // Grab reference to element in html
  var audioElement = document.getElementById('fighterTheme');
  // Link audio file to object
  audioElement.src = 'assets/audio/' + randWord.theme;
  // Set autoplay to true
  audioElement.autoplay = true;
}

// #This function will create a reset button when word bank is empty
function restart() {
  // Grab reference to html
  var restartDiv = document.getElementById('restart');
  // Manipulate DOM to create restart button
  var restartButton = document.createElement('h1');
  restartButton.setAttribute('id', 'restart');
  restartButton.textContent = 'Play Again';
  restartButton.addEventListener('click', function() {
    restartDiv.removeChild(restartButton);
    reset();
    main();
  });
  // Append div to html
  restartDiv.appendChild(restartButton);
}

// #This function will reset the wordBank and set wins back to 0
function reset() {
  wordBank = [
    akuma,
    balrog,
    blanka,
    cammy,
    chunLi,
    deeJay,
    dhalsim,
    eHonda,
    feiLong,
    guile,
    ken,
    mBison,
    ryu,
    sagat,
    tHawk,
    vega,
    zangief
  ];

  wins = 0;
}

//*EVENT HANDLERS
//*===================================================================
// Onkeyup function will pass to letter input argument to compareUserInput parameter.
document.onkeyup = function(event) {
  // Only stores values from A to Z
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    compareUserInput(event.key);
  }
};

// Run main function
main();
