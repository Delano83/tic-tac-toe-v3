'use strict';
//Using the module pattern so my variables are not available in the global scope
(function() {
    //Initial variables
    var game;
    var i;
    var board = document.getElementById('board');
    var players = document.getElementsByClassName('players');
    var boxes = document.getElementsByClassName('boxes')[0];
    var player1 = document.getElementById('player1');
    var player2 = document.getElementById('player2');
    var squares = document.getElementsByClassName('box');
    var click = [];
    
    //This is the game constructor that contains the intial variables I will be using in my methods.
    function Game() {
        //Array that contains my players
        this.players = {};
        this.name = null;
        this.winner = null;
        this.score = [];
        //This count keeps track of whose turn it is by incrementing by one at every turn.
        this.turn = 0;
        //winSets contains all the winning combinations
        this.winSets = [
            [1, 5, 9],
            [3, 5, 7],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ];
        //Array1 keeps track of player 1 score
        this.array1 = [];
        //Array2 keeps track of player 2 score.
        this.array2 = [];
    }


//This method will take care of the different screens, Start, Winning and Tie. 
//I'm passing four arguments for each screen.
    Game.prototype.UI = function(screen, linkText, buttonLink, text) {
        //This is the main DIV
        var screenDiv = document.createElement('DIV');
        screenDiv.setAttribute("class", screen);
        screenDiv.setAttribute("id", "start");
        var header = document.createElement('HEADER');
        screenDiv.appendChild(header);
        //The main H1 title
        var HOne = document.createElement("H1");
        HOne.textContent = 'Tic Tac Toe';
        header.appendChild(HOne);
        //This paragraph is added conditionnally if we have a win screen.
        if (screen.indexOf("screen screen-win") !== -1) {
        var p = document.createElement("p");
        p.setAttribute("class", "message");
        p.textContent = text;
        header.appendChild(p);
        }
        //The link button
        var startLink = document.createElement("A");
        if (buttonLink === "reload") {
        startLink.setAttribute('onClick', 'window.location.reload()');
        } else {
            startLink.addEventListener("click", function() { board.removeChild(screenDiv); game.getPlayersName(); game.refreshBoard();}, false);
            startLink.setAttribute('href', buttonLink);

        }
        startLink.setAttribute('class', 'button');
        startLink.textContent = linkText;
        header.appendChild(startLink);

        //Append the main DIV to the body
        board.appendChild(screenDiv);
        //On button click, remove the screen
       
      }

    //Update the board at every move
    Game.prototype.refreshBoard = function(event) {     
           //Incrementing the turn counter by one.
            this.turn++;
        //Getting the current player's indicator
        var playerIndicator = document.getElementById('player' + this.currentPlayer());
        //Add and removes the classes on the indicator depending on whose turn it is.
             if (this.currentPlayer() === 1) {
            player2.classList.remove('active');
            playerIndicator.classList.add('active');
        } else if (this.currentPlayer() === 2) {
            player1.classList.remove('active');
            playerIndicator.classList.add('active');
         }    
             
         //If the second player is the computer than it's the computer's turn.
          if (game.players.player2 == "COMPUTER" && this.turn % 2 === 0 && game.turn <= 9){
            game.computer();
            }
              //If the turn counter is superior to 9 and there is no winner, the game is a draw so we return the 'It's a draw screen'
         if (game.turn > 9 && game.winner === null) {
            return game.UI("screen screen-win screen-win-tie", "New Game", "reload", "It's a draw");
         }
          console.log(game.turn);
    };


    //All box events are handled here.
    Game.prototype.play = function(event) {
        //Looping through the boxes and assigning an ID to each.
        for (i = 0; i < squares.length; i++) {
            squares[i].setAttribute("ID", parseFloat(1) + parseFloat([i]));
            //Converting the HTML collection returned by "square" and converts it to an array.
            squares = Array.prototype.slice.call(squares);
        }


        //Makes sure the box is empty 
        if (event.target.getAttribute("class").indexOf('box-filled-') === -1 && !event.target.classList.contains('box-filled-')) {
            //Get the current player's array.
            var playerScore = game.currentPlayer() === 1 ? game.array1 : game.array2;
            //Listen to the events on the boxes and assign a background-image property on mouseenter.
            if (event.type === "mouseenter") {
                event.target.style.backgroundImage = 'url(img/' + game.currentPlayer(true) + '.svg)';
            } else if (event.type === "mouseleave") {
                //Remove th ebackgorund image on mouseleave.
                event.target.style.backgroundImage = '';
            } else {    
                //Onclick, set the background-image to the square.
                event.target.style.backgroundImage = 'url(img/' + game.currentPlayer(true) + '.svg)';
                //Add the class to the space.
                event.target.classList.add('box-filled-' + game.currentPlayer());
                //Push the squares ID in the right array.
                playerScore.push(parseFloat(event.target.getAttribute('ID')));
                //On every move, check if a player holds a win.
                game.winCheck(playerScore);
                //Update the whole board on every time the user clicks a square.
                 game.refreshBoard();  
               
            }
          }
     

        };

        //Method that acts as a second player if "COMPUTER" is specified.
         Game.prototype.computer = function() {
        //Checks for empty spaces.
          var availableSpaces = document.querySelectorAll('.box:not(.box-filled-1):not(.box-filled-2)');
        //Creates a random index.
          var randomIndex = Math.round(Math.random() * ((availableSpaces.length - 1) - 0) + 0);
        //Assigns the random Index to the available square and stores it in the space variable.
          var space = availableSpaces[randomIndex];

          setTimeout(function(){
            //Trigger a click on the random space 
             space.click();     
          }, 0.01);
        }

        //This method loops through the arrays and determines if there's a win.
        Game.prototype.winCheck = function(playerScore) {

            //Loop through the winning combinations.
            for (var i = 0; i < game.winSets.length; i++) {
                var winSet = game.winSets[i];
            for (var j = 0; j < winSet.length; j++) {
            //Look for a match in the player's array
                var space = winSet[j];
            //Looks for a winning combination in the current player's array.
                var inScore = playerScore.indexOf(space);
                    if (inScore === -1) {
                        break;
                    }
                    //When the loops runs the full way, the current player holds a win.
                    if (j === winSet.length -1) {
                    //Testing
                     game.winner = 'Player ' + game.currentPlayer() + ' is the winner!';
                    //Display the win screen
                    return game.UI("screen screen-win screen-win-" + (game.currentPlayer() === 1? "one": "two"), "New Game", "reload", game.getCurrentPlayersName() + " wins!");
                     }
                 }
            }     
        };

    //Determine the current player
    Game.prototype.currentPlayer = function(myPlayer) {
        var player;
        //Determine current player number & letter based on the value of this.turn.
        this.turn % 2 !== 0? player = 1 : player = 2;
        if (myPlayer) {
            return (player === 1) ? 'o' : 'x';
        }
        //retun the current player.
        return player;
    };

    //Method to get the player's name at the beginning of the game.
     Game.prototype.getPlayersName = function() {
    //Prompt player 1 and player 2 for their name.
    //Prompt player one for his name. Can't be left blank.
     do {
      var playerName1 = prompt("What's player's one name?");
       game.players.player1 = playerName1;
     } while (!game.players.player1);

     //Prompt player 2 for his name. Can't be left blank. You can have the computer for opponent by typing "COMPUTER"
     do {
      var playerName2 = prompt("What's player's two name? Type 'COMPUTER' to play against the computer");
       game.players.player2 = playerName2;
     } while (!game.players.player2 && game.players.player1 === game.players.player2);
     //Add the players name to an object.
       player1.textContent = game.players.player1;
       player2.textContent = game.players.player2;
    }

    //Retrive the current player's name depending on current player.
    Game.prototype.getCurrentPlayersName = function() {
       return game.currentPlayer() == 1? game.players.player1 : game.players.player2;
    }

    //Instantiate a new game.
    game = new Game;

    //Add the events listeners to the squares.
     for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", game.play, false);
        squares[i].addEventListener("mouseenter", game.play, false);
        squares[i].addEventListener("mouseleave", game.play, false);
    }

   //Display start screen
    game.UI("screen screen-start", "Start Game", "#", "");
    
})();
