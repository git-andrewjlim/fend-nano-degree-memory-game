/* --- GLOBAL VARIABLES --- */
const CARDS = 16;
const CARD_PAIRS = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
const STARS = 3;
const STAR_REDUCTION = CARD_PAIRS.length + 1;

let firstGame = true; // determines whether instructions need to be shown at beginning of game.
let turns = 0; // track how many guesses the user has made.
let cardsMatched = 0; // track how many cards have been matched - if it equals CARDS then the game is over.
let cardSelected = false; // track how many cards the user has chosen per turn (max: 2).
let timer = 0; // timer in seconds
let resetButtonActive = false; // sets state of reset button eventListener
let starCount = STARS; // tracks how many stars the user has.
let checkEndGame = false; // track if the game should end.

// Set up board and initialise values
function initialise() {
    setStars();
    deck();
    //shuffle(deck); // uncomment when ready
    dealCards();
    resetTimer();
    resetTurns();
    if (firstGame) {
        showInstructions();
    }
}

// Build the star value based upon constant STARS value
function setStars() {
    // if firstGame = true
        // grab the ul with .stars
        // for the numer of STARS value add <li><i class="fa fa-star"></i></li>
    // else 
        // reset stars to fa-star (they would of been turned over)
    console.log('your in the stars');
}

// build the deck and return the deck
let deck = () => {
    // check that CARD_PAIRS is half of CARDS (if not then throw error)
    // Create an array and put in each value twice // can use CARDS as the count
    // return deck array
    console.log('your in the deck');
}

// Shuffle function from http://stackoverflow.com/a/2450976
// may need to change this to let shuffledCards = (array) = > {}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// build the deck of cards depending up on how many cards there are
function dealCards(deck) {
    // check if cards exist in DOM
        // if they do - clean board (remove items
    // build board
        // get the ul with .deck
        // for each value within the deck add the following:
        /*
            <li class="card">
                <i class="fa"></i>
            </li>
        */
        // add eventListener for ul .cards
        // add a value to each class by getting the deck and adding 'fa-' to the front of it.
}

// reset the timer to 0
function resetTimer() {
    timer = 0;
}

// reset the turns
function resetTurns() {
    turns = 0;
}

// popup instructions with start game button.
function showInstructions() {
    //show popup
    //activate event lister on start
    firstGame = false; 
}

function startTimer() {
    // use set time out to increment by 1 every second
}

// reduce stars depending on how many turns the player had
function reduceStars() {
    // get the last child of ul.stars
    // if STARS % cardsMatched ==0 change the next fa-star to fa-star-o
    // reduce starCount by one until it reaches zero.
}

// show Congratulations pop up and ask if they would like to play again.
function endGame() {
    //show popup with time, stars and congratulations!
    //disable restart button
    //show play again button
}

//flip card and nominate direction (optional)
function flipCard(card, direction) {
    // direction it can be forwards (blank) or reverse
    // get card selected
    // check direction
        //if reverse
            //add close to class
                // in css this:
                    //minimises card face
                    //changes opacity to 0
                    //changes card back opacity to 100
                    //expands card back
                    //NOTE: Want to do it this way because in future may want to use an image instead of a card
        //if no direction (default)
            //add open to class
                // in css this:
                    //minimises card back
                    //changes opacity to 0
                    //changes card face opacity to 100
                    //expands card face
}


initialise();


/* --- EVENT LISTENERS --- */
// start button
    // hide instructions
    // delete start button (you wont use it again)
    // startTimer();
    // enable reset button

// reset button
    // initialise
    //startTimer();
    // enable reset button

// play again (same as reset button)
    // initialise
    // remove endGame panel
    // checkEndGame = false;
    // startTimer();
    // enable reset button

// cards (on cards click - put on parent)
    // check if cardSelected = false;
        // if cardSelected = false;(1st choice) - allow another card to be flipped
            // flipcard(this)
            // set show on card (this is what you will search against)
            // set cardSelected = true
        // if cardSelected = true; (2nd choice)
            //disable eventListeners on cards
            // check classes for show (this should be the other)
            // get its icon class
            //check if icon class is a match
                //if it is a match
                    //change card class of other card from show to match
                    //add match to this cards class
                    // add 1 to cardsMatched
                    // check if cardsMatched = CARDS
                        // checkEndGame = true
                //if it is not a match        
                    //remove show on other card
                    // flipCards(this, 'reverse')
                    // reinstate eventListeners on cards
    // check if STAR_REDUCTION === turns
        // if true - reduceStars()
    // check if checkEndGame = true;
        // if true - endGame() 
    
    







/* --- INSTRUCTIONS GIVEN BY UDACITY --- */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
