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
    $modalStartContent.querySelector('.stars-text').innerHTML = `You lose a <i class="fa fa-star"></i> for every ${STAR_REDUCTION} turns taken.`
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

    cardsMatched = 0;
    clearInterval(timerStart);
    resetTimer();
    resetTurns();
    resetStars();

    // clear the cards   
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

        if (starList.childNodes.length == 0) {
            // for the numer of stars value add <li><i class="fa fa-star"></i></li>            
            for(let i=0; i<stars; i++) {
                let starItem = document.createElement('li');
                starItem.innerHTML = '<i class="fa fa-star"></i>';
                starList.appendChild(starItem);
            }
        } else {
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

    if (cardDeck.childNodes.length == 0) {
        for(let card of deck) {
            let cardItem = document.createElement('li');
            cardItem.setAttribute('class', 'card');
            cardItem.innerHTML = `<i class="fa fa-${card}"></i>`;
            DOCUMENT_FRAGMENT.appendChild(cardItem);
        }

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

    if(turns % STAR_REDUCTION === 0 && stars!== 0) {
        if (stars !== 0){ 
            let starLost = starList[starList.length-1];
            starLost.setAttribute('class', 'fa fa-star-o');
            stars--;           
        }
    }
}


// DISPLAY ENDING MESSAGE AND ALLOW FOR REPLAY
function endGame() {
    clearInterval(timerStart);
    window.setTimeout(function(){
        $modalEndContent.querySelector('.completion-text').innerHTML = 
        `<p>Your time was ${timer} seconds</p>
        <p>You completed the game in ${turns} moves and earned ${stars} star${stars==1? '':'s'}</p>`;
        $modal.style.cssText = 'display: block';
        $modalStartContent.style.cssText = 'display: none';
        $modalEndContent.style.cssText = 'display: block';
        $replayBtn.addEventListener('click', function(){
            $modal.style.cssText = 'display: none';
            buildBoard();
            startGame();
        });
    }, 1000);
}


// FLIP THE SELECTED CARD
function flipCard(card, flipDirection) {
    if(flipDirection != 'reverse') {
        card.setAttribute('class', 'card open show');
    } else {
        card.setAttribute('class', 'card');
    }

    // @TODO FLIPPING MECHANICS
        //minimises card face
        //changes opacity to 0
        //changes card back opacity to 100
        //expands card back
        //NOTE: Want to do it this way because in future may want to use an image instead of a card
}


// RETURN ICON OF CARD
function getIcon(cardIcon) {
    cardIcon = cardIcon.querySelector('.fa');
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

    card1Icon = getIcon(card1);
    card2Icon = getIcon(card2);
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
}




// ===============
// EVENT LISTENERS
// ===============


// START BUTTON
$startBtn.addEventListener('click', function(){
    // hide instructions
    $modal.style.cssText = 'display: none;';
    startGame();
    // delete start button (you wont use it again)
    // startTimer();
    // enable reset button
});


// RESET BUTTON
$restartBtn.addEventListener('click', function(){
    buildBoard();
    startGame();
    // initialise
    // startTimer();
    // enable reset button
});