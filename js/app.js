// AUTHOR: ANDREW LIM
// GITHUB: https://github.com/git-andrewjlim/fend-nanodegree-memory-game


// ===============
// GLOBAL VARIABLES
// ===============

const CARD_PAIRS = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
const CARDS = CARD_PAIRS.length * 2;
const STAR_REDUCTION = CARD_PAIRS.length *2;
const DOCUMENT_FRAGMENT = document.createDocumentFragment();
const FONTAWESOME_PREFIX = 'fa-';
const STARS = 3;

let stars = STARS;
let turns = 0; // track how many guesses the user has made.
let cardsMatched = 0; // track how many cards have been matched - if it equals CARDS then the game is over
let cardSelected = false; // track how many cards the user has chosen per turn (max: 2)
let timer = 0; // timer in seconds
let deck = []; // initialise the deck
let card1, card2; // intitialise cards
let timerStart; //initialise timer

// Get DOM elements
let $timer = document.querySelector('.timer'),
    $modal = document.querySelector('.modal'),
    $deck = document.querySelector('.deck'),
    $stars = document.querySelector('.stars'),
    $moves = document.querySelector('.moves'),
    $startBtn = document.querySelector('.start-button'),
    $restartBtn = document.querySelector('.restart-button'),
    $replayBtn = document.querySelector('.replay-button'),
    $modalStartContent = document.querySelector('.modal-inner-start'),
    $modalEndContent = document.querySelector('.modal-inner-end');




// ===============
// INITIALISE
// ===============


initialise();




// ===============
// FUNCTIONS
// ===============


// INITIALISE THE PROGRAM
function initialise() {
    // fill out text for introduction popup
    $modalStartContent.querySelector('.stars-text').innerHTML = `${STAR_REDUCTION}`;
    deck = fillDeck();
    deck = shuffle(deck);
    buildBoard();
}


// BUILD THE BOARD
function buildBoard() {
    clearBoard();
    dealCards(deck);
}


// RESET THE GAME
function clearBoard() {
    let cardDeck = $deck;

    // reset board elements
    cardsMatched = 0;
    clearInterval(timerStart);
    resetTimer();
    resetTurns();
    resetStars();

    // clear the cards so it can be rebuilt
    while(cardDeck.firstChild) {
        cardDeck.removeChild(cardDeck.firstChild);
    }
}


// START THE GAME
function startGame() {
    advanceTimer();
    deck = shuffle(deck);
    dealCards(deck);
}

// SET THE NUMBER OF STARS
function setStars() {
        let starList = $stars;
        let starItem = '<li><i class="fa fa-star"></i></li>';

        // determine whether stars need to be added or reset
        if (starList.childNodes.length == 0) {

            // add the stars to the board
            for(let i=0; i<stars; i++) {
                let starItem = document.createElement('li');
                starItem.innerHTML = '<i class="fa fa-star"></i>';
                starList.appendChild(starItem);
            }
        } else {
            // reset stars that alredy exist
            for(let i=0;i<stars; i++){
                starList.childNodes[i].innerHTML = '<i class="fa fa-star"></i>';
            }
        }
}


// POPULATE THE DECK
function fillDeck() {
    let arr_fillDeck = [];

    // Create an array and put in each value twice
    for(let i=0; i<CARD_PAIRS.length; i++) {
        arr_fillDeck.push(CARD_PAIRS[i]);
        arr_fillDeck.push(CARD_PAIRS[i]);
    }
    return arr_fillDeck;
}


// SHUFFLE CARDS (http://stackoverflow.com/a/2450976)
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


// ADD THE CARDS TO THE DOM
function dealCards(deck) {
    let cardDeck = $deck;

    // build the cards within the deck
    if (cardDeck.childNodes.length == 0) {
        for(let card of deck) {
            let cardItem = document.createElement('li');
            cardItem.setAttribute('class', 'card');
            cardItem.innerHTML = `<i class="fa fa-${card}"></i>`;
            DOCUMENT_FRAGMENT.appendChild(cardItem);
        }

        // add the cards to the DOM
        cardDeck.appendChild(DOCUMENT_FRAGMENT);
        cardDeck.addEventListener('click', selectCard);
    } 
}


// RESET THE TIMER
function resetTimer() {
    timer = 0;
}


// RESET TURNS
function resetTurns() {
    turns = 0;
    updateTurns(turns);
}


//RESET STARS
function resetStars() {
    stars = STARS;
    setStars();
}


// INCREMENT OR RESET TURNS
function updateTurns(turnNumber) {
    let moves = $moves;
    moves.textContent = `${turnNumber}`;
}


// START TIMER
function advanceTimer() {
    timerStart = window.setInterval(function(){
        timer++;
        $timer.textContent = `${timer}`;
    }, 1000);
}


// CHANGE STARS TO BLANKS STARS
function reduceStars() {
    let starList = document.querySelectorAll('.fa-star');

    // determine whether star should be removed
    if(turns % STAR_REDUCTION === 0 && stars!== 1) {
        // change the rightmost star to an empty star
        let starLost = starList[starList.length-1];
        starLost.setAttribute('class', 'fa fa-star-o');
        stars--;
    }
}


// DISPLAY ENDING MESSAGE AND ALLOW FOR REPLAY
function endGame() {
    // prevent timer from advancing
    clearInterval(timerStart);

    // display the end message
    $modalEndContent.querySelector('.completion-text').innerHTML = 
        `<p>Your time was ${timer} seconds</p>
        <p>You completed the game in ${turns} moves and earned ${stars} star${stars==1? '':'s'}</p>`;
    $modal.style.cssText = 'display: block';
    $modalStartContent.style.cssText = 'display: none';
    $modalEndContent.style.cssText = 'display: block';

    //activate the replay button
    $replayBtn.addEventListener('click', function() {
        $modal.style.cssText = 'display: none';
        buildBoard();
        startGame();
    });
}


// FLIP THE SELECTED CARD
function flipCard(card, flipDirection) {
    if(flipDirection != 'reverse') {
        card.setAttribute('class', 'card open show');
    } else {
        card.setAttribute('class', 'card');
    }
}


// RETURN ICON OF CARD
function getIcon(cardIcon) {
    cardIcon = cardIcon.querySelector('.fa');

    //extract the icon from the card
    let cardIconClasses = cardIcon.getAttribute('class').split(' ');
    for(cardIconClass of cardIconClasses) {
        if(cardIconClass.match(FONTAWESOME_PREFIX)) {
            return cardIconClass;
        }
    }
}


// CHECK WHETHER CARDS ARE A MATCH
function checkMatch(card1, card2) {
    let card1Icon, card2Icon;
    let match;

    // get the icons
    card1Icon = getIcon(card1);
    card2Icon = getIcon(card2);

    // compare the icons
    if(card1Icon === card2Icon) {
        match = true;
    } else {
        match = false;
    }

    return match;
}


// CONTROL CARD EVENT HANDLER
function selectCard(e) {
    let cardNode = e.target;
    let match;

    // only activate if card is clicked (not the deck)
    if (cardNode.getAttribute('class') === 'card') {

        // determin whether this is the first card selected
        if (cardSelected === false) {
            // show icon of card
            card1 = cardNode;
            flipCard(card1);

            // indicate that the first card has been selected
            cardSelected = true;
        } else {
            // show icon of card
            card2 = cardNode;
            flipCard(card2);

            // update the turn counter
            turns++;
            updateTurns(turns);

            // check whether the star need to be reduced
            reduceStars();

            // prevent other cards from being selected
            cardNode.parentNode.removeEventListener('click', selectCard);

            // check if selected cards are a match
            match = checkMatch(card1, card2);
            if (match) {
                // reinstate ability to select cards
                cardNode.parentNode.addEventListener('click', selectCard);

                // indicate that a pair has been found
                cardsMatched=cardsMatched+2;

                // determine if cards
                if (cardsMatched == CARDS) {
                    // show congratulations panel and end game
                    endGame();
                }
            } else {
                window.setTimeout(function(){
                    flipCard(card1, 'reverse');
                    flipCard(card2, 'reverse');
                    // reinstate ability to select cards (after cards have been flipped)
                    cardNode.parentNode.addEventListener('click', selectCard);
                }, 500);
            }

            // reset so that new card pairs can be selected
            cardSelected = false;
        }
    }
}




// ===============
// EVENT LISTENERS
// ===============


// START BUTTON
$startBtn.addEventListener('click', function(){
    // hide instructions
    $modal.style.cssText = 'display: none;';
    startGame();
});


// RESET BUTTON
$restartBtn.addEventListener('click', function(){
    buildBoard();
    startGame();
});