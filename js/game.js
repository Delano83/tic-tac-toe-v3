'use strict';

(function() {

  var game;
  var i;
  var body = document.getElementById('board');
  var board = document.getElementById('board');
  var players = document.getElementsByClassName('players');
  var boxes = document.getElementsByClassName('boxes');
  var player1 = document.getElementById('player1');
  var player2 = document.getElementById('player2');
  var squares = document.getElementsByClassName('box');
  var click = [];


 function Game() {
      this.players = [];
      this.turn = 0;
      this.winSets = [
        [0, 4, 8],
        [2, 4, 6],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ];
    }



//Get the li to console log their id
Game.prototype.counter = function(){
  this.turn++;
  }

  /*click.forEach(function (x) { console.log(x);
  })}, false);*/

  //Take this.turn and find whose turn it is. Return the right player.

  Game.prototype.getCurrentPlayer = function(playerMarker) {
      var player;

    if (this.turn % 2 !== 0) {
      player = 1;

    } else {
      player = 2;
    }

    if (playerMarker) {
      return(player === 1) ? 'o' : 'x';
    }
    return player;
  };

  /*Find the empty boxes
  On mouseenter, mouseover display the correct SVG for background-image. On mouseleave take it out
  On click, set the background-image to the correct SVG*/

/*  function play() {


}*/

/*DOM Stuff*/
  Game.prototype.start = function() {
      var screenDiv = document.createElement('DIV');
      screenDiv.setAttribute("class", "screen screen-start");
      screenDiv.setAttribute("id", "start");
      var header = document.createElement('HEADER');
      screenDiv.appendChild(header);
      var HOne = document.createElement("H1");
      HOne.textContent = 'Tic Tac Toe';
      screenDiv.appendChild(HOne);
      var startLink = document.createElement("A");
      startLink.setAttribute('href', '#');
      startLink.setAttribute('class', 'button');
      startLink.textContent = 'Start Game';
      screenDiv.appendChild(startLink);

      board.appendChild(screenDiv);
      startLink.addEventListener("click", function() { board.removeChild(screenDiv);}, false);
    }

    function UI() {
      for ( i = 0; i < els.length; i++) {
        els[i].setAttribute("ID", [i]);
        els[i].addEventListener("click", function() {
          click.push(this.getAttribute('ID'));
          game.counter();
          console.log(this.turn);
          console.log(this.getAttribute('ID'));
      });
    }

    }

    game = new Game;
    game.start();

    game.counter(squares);


//Onload, show the HTML content by appending the start HTML to the body

//Make two functions, one for each player that is called when it's the players turn.
//Push the index to a separate array for each
//Loop through the array to find any winning set. This should be checked on each click.
//Make a inheritance for each player





})();
