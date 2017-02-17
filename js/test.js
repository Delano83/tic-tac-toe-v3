for (i = 0; i < squares.length; i++) {
    squares[i].setAttribute("ID", parseFloat(1) + parseFloat([i]));

    if (event.type === "mouseenter") {

        squares[i].addEventListener("mouseenter", function() {
            if (this.getAttribute("class").indexOf('box-filled-') === -1) {
                this.style.backgroundImage = 'url(img/' + game.getPlayer(true) + '.svg)';
            }
        }, false);


    } else if (event.type === "mouseleave") {

        squares[i].addEventListener("mouseleave", function() {
            if (this.getAttribute("class").indexOf('box-filled-') === -1) {
                this.style.backgroundImage = '';
            }
        }, false);

    } else { //this is the "click" event

        // reference to the player's score array for win checking
        var playerScore = game.getPlayer() === 1 ? game.array1 : game.array2;
        //var playerScore = eval('game.array' + game.getPlayer());
                    // reference to the player's score array for win checking

        squares[i].addEventListener("click", function() {
            if (this.getAttribute("class").indexOf('box-filled-') === -1) {
                // add class for claimed space
                this.classList.add('box-filled-' + game.getPlayer());

                // push index of claimed box into player's score array
                playerScore.push(this.getAttribute('ID'));

                // check for win
                // loops through each win set
                for (var i = 0; i < game.winSets.length; i++) {
                    var winSet = game.winSets[i];

                    // loops through each space in a win set and checks if that space is located in the player's score
                    for (var j = 0; j < winSet.length; j++) {
                        var space = winSet[j];
                        var inScore = playerScore.indexOf(space);

                        if (inScore === -1) {
                            break;
                        }

                        // if the loop runs for the full length of a win set, a player possesses a win
                        if (j === winSet.length - 1) {
                            return game.over();
                        }
                    }
                }
            }
        }, false)

    }
}

var screenDiv = document.createElement('DIV');
screenDiv.setAttribute("class", "screen screen-win-tie");
screenDiv.setAttribute("id", "finish");
var header = document.createElement('HEADER');
screenDiv.appendChild(header);
var HOne = document.createElement("H1");
HOne.textContent = 'Tic Tac Toe';
screenDiv.appendChild(HOne);
var p = document.createElement("p");
p.setAttribute("class", "message");
header.appendChild(p);
var startLink = document.createElement("A");
startLink.setAttribute('href', '#');
startLink.setAttribute('class', 'button');
startLink.textContent = 'New game';
screenDiv.appendChild(startLink);

/*  var tieScreen = document.createElement('DIV');
tieScreen.setAttribute("class", "screen screen-win-tie");
tieScreen.setAttribute("id", "finish");
var header = document.createElement('HEADER');
tieScreen.appendChild(header);
var h1 = document.createElement('H1');
h1.textContent("Tic Tac Toe");
header.appendChild(h1);
var p = document.createElement("p");
p.setAttribute("class", "message");
header.appendChild(p);
var link = document.createElement('A');
link.setAttribute("class", "button");
link.setAttribute("href", "#");
link.textContent("New game");
header.appendChild(link);*/
