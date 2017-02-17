'use strict';

(function() {

    var game;
    var i;
    var board = document.getElementById('board');
    var players = document.getElementsByClassName('players');
    var boxes = document.getElementsByClassName('boxes')[0];
    var player1 = document.getElementById('player1');
    var player2 = document.getElementById('player2');
    var squares = document.getElementsByClassName('box');
    var click = [];

    function Game() {
        this.players = [];
        this.turn = 0;
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
        this.array1 = [];
        this.array2 = [];
    }

    function Player(side) {
        this.name = null;
        this.side;
        this.score = [];
    }

    Game.prototype.UI = function(screen, linkText, buttonLink, text) {
        var screenDiv = document.createElement('DIV');
        screenDiv.setAttribute("class", screen);
        screenDiv.setAttribute("id", "start");
        var header = document.createElement('HEADER');
        screenDiv.appendChild(header);
        var HOne = document.createElement("H1");
        HOne.textContent = 'Tic Tac Toe';
        header.appendChild(HOne);
        if (screen.indexOf("screen screen-win") !== -1) {
        var p = document.createElement("p");
        p.setAttribute("class", "message");
        p.textContent = text;
        header.appendChild(p);
        }
        var startLink = document.createElement("A");
        startLink.setAttribute('href', buttonLink);
        startLink.setAttribute('class', 'button');
        startLink.textContent = linkText;
        header.appendChild(startLink);

        board.appendChild(screenDiv);
        startLink.addEventListener("click", function() { board.removeChild(screenDiv);}, false);
      }

    // updates the game object's turn property and turn indicator html elements after successful move
    Game.prototype.updateBoard = function() {
        this.turn++;
        var playerIndicator = document.getElementById('player' + this.getPlayer());

        if (this.getPlayer() === 1) {
            player2.classList.remove('active');
            playerIndicator.classList.add('active');
        } else if (this.getPlayer() === 2) {
            player1.classList.remove('active');
            playerIndicator.classList.add('active');
        }
    };


    // handles the all the events bound to the box elements
    Game.prototype.spaceAction = function(event) {
        for (i = 0; i < squares.length; i++) {
            squares[i].setAttribute("ID", parseFloat(1) + parseFloat([i]));
            squares = Array.prototype.slice.call(squares);
        }


        // checks if the space has been claimed by another player; after that, checks event type of handler
        if (event.target.getAttribute("class").indexOf('box-filled-') === -1 && !event.target.classList.contains('box-filled-')) {
            //find out why this does not work
            // push index of claimed box into player's score array
            var playerScore = game.getPlayer() === 1 ? game.array1 : game.array2;

            if (event.type === "mouseenter") {
                event.target.style.backgroundImage = 'url(img/' + game.getPlayer(true) + '.svg)';
            } else if (event.type === "mouseleave") {
                event.target.style.backgroundImage = '';
            } else {
                event.target.style.backgroundImage = 'url(img/' + game.getPlayer(true) + '.svg)';
                // add class for claimed space
                event.target.classList.add('box-filled-' + game.getPlayer());

                playerScore.push(parseFloat(event.target.getAttribute('ID')));

                game.winCheck(playerScore);
            }
          }
        };


        Game.prototype.winCheck = function(playerScore) {
            for (var i = 0; i < game.winSets.length; i++) {
                var winSet = game.winSets[i];

                for (var j = 0; j < winSet.length; j++) {
                    var space = winSet[j];
                    var inScore = playerScore.indexOf(space);

                    if (inScore === -1) {
                        break;
                    }

                    // if the loop runs for the full length of a win set, a player possesses a win
                    if (j === winSet.length -1) {
                  return game.UI("screen screen-win screen-win-" + (game.getPlayer() === 1? "one": "two"), "New Game", "#", "Winner");
                    }

                }
            }


        };

    // helper method for determining player turns
    Game.prototype.getPlayer = function(myPlayer) {
        var player;

        if (this.turn % 2 !== 0) {
            player = 1;

        } else {
            player = 2;
        }

        if (myPlayer) {
            return (player === 1) ? 'o' : 'x';
        }
        return player;
    };


    game = new Game;

    game.UI("screen screen-start", "Start Game", "#");


    board.addEventListener("click", function() {
        game.updateBoard()
        if (game.turn > 9) {
          game.UI("screen screen-win-tie", "New Game", "#", "It's a draw");
        }
    }, false);


    game.players.push(new Player('o'));
    game.players.push(new Player('x'));


    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", game.spaceAction, false);
        squares[i].addEventListener("mouseenter", game.spaceAction, false);
        squares[i].addEventListener("mouseleave", game.spaceAction, false);
    }
    /*  boxes.addEventListener("mouseenter", game.spaceAction, false);
      boxes.addEventListener("mouseleave", game.spaceAction, false);
      boxes.addEventListener("click", game.spaceAction, false);*/




})();
