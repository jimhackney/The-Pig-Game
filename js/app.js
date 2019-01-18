/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND scores get lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

//initialize game
init();

//Event listener for the "Roll Dice" button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1; /* Math.floor() rounds down a floating point number to an
                                                        integer since Math.random() only gives you a number
                                                        between 0 and 1 we multiply by 6 to give us a number
                                                        between 0 and 5 the add 1 to get between 1 and 6. */
        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; //Make the dice image visible
        diceDOM.src = 'images/dice-' + dice + '.png'; //change dice image to match dice number

        //3. Update the round score IF the rolled number was not a 1
        if(dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //create setter to set
                                                //the current score of
                                                //active player to equal
                                                //roundScore
        } else {
            nextPlayer();
        }
    }
});

//hold the number and add it to the global score
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if(scores[activePlayer] >= 20) {
            //set game state to false
            gamePlaying = false;
            //Change from "Player x" to Winner!
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            //hide dice image
            document.querySelector('.dice').style.display = 'none';

            //css effects for winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            //remove css effects for active class from active player
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            //declare buttons
            var rollButton = document.getElementById('roll-btn');
            var holdButton = document.getElementById('hold-btn');

            //remove hover effects from "roll dice" and "hold" buttons
            rollButton.classList.remove('hover-effects');
            holdButton.classList.remove('hover-effects');

            //grey out "roll dice" and "hold" buttons so users will know they are disabled
            rollButton.classList.add('winnerBtn');
            holdButton.classList.add('winnerBtn');

            //grey out "roll dice" and "hold" icons
            document.querySelector('.ion-ios-loop').classList.add('winnerIcon');
            document.querySelector('.ion-ios-download-outline').classList.add('winnerIcon');
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

//update game for next player
function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //set the current id's on the UI to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggles the active class between player 0 and 1 depending on whose turn it is
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //show the dice image
    document.querySelector('.dice').style.display = 'block';
}

//(re)initialize game
function init() {
    scores = [0, 0];
    roundScore = 0;

    //using 0 or 1 to determine active player instead of 1 and 2 so that it matches the index numbers of
    //the scores array.
    activePlayer = 0;

    //make game active
    gamePlaying = true;

    //Hide the dice image when the game is first opened
    document.querySelector('.dice').style.display = 'none';

    //set all scores to 0 when the game is first opened
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Set player namess
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //remove css and active plater effects for winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //add css effects for active player
    document.querySelector('.player-0-panel').classList.add('active');

    //declare buttons
    var rollButton = document.getElementById('roll-btn');
    var holdButton = document.getElementById('hold-btn');

    //enable buttons
    rollButton.disabled = false;
    holdButton.disabled = false;

    //add hover effects from "roll dice" and "hold" buttons
    rollButton.classList.add('hover-effects');
    holdButton.classList.add('hover-effects');

    //un-grey "roll dice" and "hold" buttons so users will know they are enabled
    rollButton.classList.remove('winnerBtn');
    holdButton.classList.remove('winnerBtn');

    //un-grey "roll dice" and "hold" icons
    document.querySelector('.ion-ios-loop').classList.remove('winnerIcon');
    document.querySelector('.ion-ios-download-outline').classList.remove('winnerIcon');
 }


