![Image of memory game board](https://git-andrewjlim.github.io/fend-nanodegree-memory-game/img/nanodegree_memory_game.png "Memory Game Project")

# Memory Game Project

This Memory Game project is the second project for the <a target="_blank" href="https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001">Udacity Front-End Web Developer Nanodegree</a>.


## About the Game
The Memory game requires the player to select two cards. Once a card is selected it will display an image. The player will then have to select a second card to try and find the previously displayed image. Once all the cards have been found in pairs the game ends. 

The object of the game is to find all the pairs using the least number of moves in the shortest amount of time. Every sixteen moves a star will be removed. The least amount of stars is one.


## Project Files
This game requires the following (all included within the repository):
* HTML file (index.html)
* CSS file (app.css)
* JavaScript file (app.js)
* Images (img/geometry2.png)
* FontAwesome Icon pack (linked within index.html - see [Dependencies](#dependencies) section)


## Instructions
To work with the files:
1. Click on the 'Clone or download' button.
2. Press the 'Download ZIP' button
3. Unzip the files on your computer
4. Open the index.html file within an Internet browser

Alternatively, if you have GitHub installed:
1. Click on the 'Clone or download' button.
2. Copy the github .git URL file (e.g. https://github.com/git-andrewjlim/fend-nanodegree-memory-game.git)
2. Navigate to your GitHub repository location on your computer
3. In your console type 'git clone ' and paste the .git URL
```
git clone https://github.com/git-andrewjlim/fend-nanodegree-memory-game.git
```
4. Open the downloaded index.html file within an Internet browser


## Project Link
[Link to project](https://git-andrewjlim.github.io/fend-nanodegree-memory-game/)


## Topics Covered
The project encompases all the following topics of the 'JavaScript and the DOM' chapter:

* let & const
* Hoisting
* Template literals
* Iteration (For, For...of & while loops)
* Retrieving DOM elements (querySelector & querySelectorAll)
* Manipulating DOM elements (.innerHTML & .textContent)
* Adding and removing DOM elements (appendChild() & .removeChild())
* Streamlining DOM manipulation (.createDocumentFragment())
* Styling Page Content (.style, .cssText(), .getAttribute() & .setAttribute())
* Comparison (if, unary operators & type coercion)
* Working with Functions
* Event Listeners & and Event delegation (.addEventListener() & .removeEventListener())
* Timing Events (setTimeout() & setInterval())

## Dependencies
The icons for this game require the [FontAwesome Icon pack](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"), if the names for the icons changes this may fail in future. However, the icons could be reworked to use images if required.


## Acknowledgments
The original HTML and CSS templates were provided as a basis and was slightly manipulated to dynamically build the board.

The Shuffle function was provided to students for this project.
The reference of this is from; <a target="_blank" href="http://stackoverflow.com/a/2450976">http://stackoverflow.com/a/2450976</a>