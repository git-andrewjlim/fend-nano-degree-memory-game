/* --- GLOBAL VARIABLES --- */
const CARDS = 16;
const CARD_PAIRS = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
let STARS = 3;
const STAR_REDUCTION = CARD_PAIRS.length + 1;
const docFragment = document.createDocumentFragment();
const fontawesomePrefix = 'fa-';

let firstGame = true; // determines whether instructions need to be shown at beginning of game.
let turns = 0; // track how many guesses the user has made.
let cardsMatched = 0; // track how many cards have been matched - if it equals CARDS then the game is over.
let cardSelected = false; // track how many cards the user has chosen per turn (max: 2).
let timer = 0; // timer in seconds
let resetButtonActive = false; // sets state of reset button eventListener
let starCount = STARS; // tracks how many stars the user has.
let checkEndGame = false; // track if the game should end.
let deck = [];
let card1, card2;
let timerStart;

let timerLocation = document.querySelector('.timer');
let modalPanel = document.querySelector('.modal');

// Set up board and initialise values
function initialise() {
    // check that CARD_PAIRS is half of CARDS (if not then throw error)
    if (CARD_PAIRS.length * 2 === CARDS){
        setStars();
        deck = fillDeck();
        deck = shuffle(deck);
        dealCards(deck);
        resetTimer();
        resetTurns();
        advanceTimer();
        if (firstGame) {
            showInstructions();
        }

    } else {
        console.error('The number of card pairs is incorrect. There must be two of each kind');
    }
}

// Build the star value based upon constant STARS value
function setStars() {
    // if firstGame = true
    if (firstGame) {
        // grab the ul with .stars
        let starList = document.querySelector('.stars');
        // for the numer of STARS value add <li><i class="fa fa-star"></i></li>
        let starItem = '<li><i class="fa fa-star"></i></li>';
        for(let i=0; i<STARS; i++) {
            let starItem = document.createElement('li');
            starItem.innerHTML = '<i class="fa fa-star"></i>';
            starList.appendChild(starItem);
        }
    }else{
        // @todo reset stars to fa-star (they would of been turned over)
    }  
}

// build the deck and return the deck
function fillDeck() {
    let arr_fillDeck = [];
    // Create an array and put in each value twice // can use CARDS as the count
    for(let i=0; i<CARD_PAIRS.length; i++) {
        arr_fillDeck.push(CARD_PAIRS[i]);
        arr_fillDeck.push(CARD_PAIRS[i]);
    }
    return arr_fillDeck;
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
    // @todo check if cards exist in DOM
        // @todo if they do - clean board (remove items)
    // build board
        
        // get the ul with .deck
        let cardDeck = document.querySelector('.deck');
        // for each value within the deck add the following:
        for(let card of deck) {
            let cardItem = document.createElement('li');
            cardItem.setAttribute('class', 'card');
            cardItem.innerHTML = `<i class="fa fa-${card}"></i>`;
            docFragment.appendChild(cardItem);
        }
        cardDeck.appendChild(docFragment);
        // add eventListener for ul .cards
        cardDeck.addEventListener('click', selectCard);
        // add a value to each class by getting the deck and adding 'fa-' to the front of it.
}

// reset the timer to 0
function resetTimer() {
    timer = 0;
}

// reset the turns
function resetTurns() {
    turns = 0;
    updateTurns(turns);
}

function updateTurns(turnNumber) {
    let moves = document.querySelector('.moves');
    moves.textContent = `${turnNumber}`;
}

// popup instructions with start game button.
function showInstructions() {
    //show popup
    //activate event lister on start
    firstGame = false; 
}

function advanceTimer() {
    // use set time out to increment by 1 every second
    timerStart = window.setInterval(function(){
        timer++;
        timerLocation.textContent = `${timer}`;
    }, 1000);
}

// reduce stars depending on how many turns the player had
function reduceStars() {
    // get the last child of ul.stars
    let starList = document.querySelectorAll('.fa-star');
    if(turns % STAR_REDUCTION === 0 && STARS!== 0) {
        
        
        if (STARS !== 0){ 
            let starLost = starList[starList.length-1];
            starLost.setAttribute('class', 'fa fa-star-o');
            STARS--;           
        }
        console.log('reduce stars');
        console.log(STARS);
        // let starList = document.querySelectorAll('.fa-star');
        // if (starList.length !== 0) {
        // let starLost = starList[starList.length-1];
        // starLost.setAttribute('class', 'fa fa-star-o');
        // }
    }
}

// show Congratulations pop up and ask if they would like to play again.
function endGame() {
    clearInterval(timerStart);
    window.setTimeout(function(){
        modalPanel.querySelector('.modal-inner').innerHTML = 
        `<h1>Congratulations!</h1>
        <p>You won the game</p>
        <p>Your time was ${timer} seconds</p>
        <p>You completed the game in ${turns} and earned ${STARS} star${STARS==1? '':'s'}</p>`;
    modalPanel.style.cssText = 'display: block;'
    }, 1000);
    
    //show popup with time, stars and congratulations!
    //disable restart button
    //show play again button
}

//flip card and nominate direction (optional)
function flipCard(card, flipDirection) {
    if(flipDirection != 'reverse') {
        card.setAttribute('class', 'card open show');
    } else {
        card.setAttribute('class', 'card');
    }

    
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

function getIcon(cardIcon) {
    cardIcon = cardIcon.querySelector('.fa');
    let cardIconClasses = cardIcon.getAttribute('class').split(' ');
    for(cardIconClass of cardIconClasses) {
        if(cardIconClass.match(fontawesomePrefix)) {
            return cardIconClass;
        }               
    }
}

function checkMatch(card1, card2) {
    let card1Icon, card2Icon;
    let match;

    card1Icon = getIcon(card1);
    card2Icon = getIcon(card2);
    if(card1Icon === card2Icon) {
        match = true;
    } else {
        match = false;
    }

    return match;
}


initialise();


/* --- EVENT LISTENERS --- */
// start button
document.querySelector('.start-button').addEventListener('click', function(){
    // hide instructions
    modalPanel.style.cssText = 'display: none;';
    // delete start button (you wont use it again)
    // startTimer();
    // enable reset button
});


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

function selectCard(e) {
    let cardNode = e.target;
    let match, gameEnded;

    // only activate if card is clicked (not the deck)
    if (cardNode.getAttribute('class') === 'card') {
        if (cardSelected === false) {
            card1 = cardNode;
            flipCard(card1);
            cardSelected = true;
        } else {
            card2 = cardNode;
            flipCard(card2);
            turns++;
            updateTurns(turns); 
            reduceStars();        
            cardNode.parentNode.removeEventListener('click', selectCard);
            match = checkMatch(card1, card2);
            if (match) {
                cardSelected = false;
                cardNode.parentNode.addEventListener('click', selectCard);
                cardsMatched=cardsMatched+2;
                if (cardsMatched == CARDS) {
                    endGame();
                }
            } else {
                window.setTimeout(function(){
                    flipCard(card1, 'reverse');
                    flipCard(card2, 'reverse');
                    cardSelected = false;
                cardNode.parentNode.addEventListener('click', selectCard);
                }, 500);
            }
            
            
        }
    }


    
    
    
    
    
    
    


    // console.log(cardIcon);

    // // if cardSelected = false;(1st choice) - allow another card to be flipped
    // if (cardSelected === false) {
    //         // flipcard(this)
    //         // set show on card (this is what you will search against)
    //         // set cardSelected = true
    // } else {
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
                    // reinstate eventListeners on card
//     }
//     // check if STAR_REDUCTION === turns
//         // if true - reduceStars()
//     // check if checkEndGame = true;
//         // if true - endGame() 
}  
    







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
