// =============================================
// -          PROBABILITY DICE GAME
// =============================================

var gameInSession, scores, roundScore, activePlayer;

// initialize game
function init() {

    // starting values
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameInSession = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-roll').style.display = 'inline-block';
    document.querySelector('.btn-hold').style.display = 'inline-block';
    document.querySelector('.winCondition').style.display = 'inline-block';

    // dice not visible at beginning of game
    hideDice();
}

init();

// =============================================
// -          ROLL DICE EVENT
// =============================================
// event listen on click with anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameInSession) {
        // get random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';

        // update score if 1 not rolled
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // switch player
            endTurn();
        }
    }
});

// =============================================
// -          HOLD BUTTON EVENT
// =============================================
// event listen on click with anonymous function
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gameInSession) {
        // add current results to main score
        scores[activePlayer] += roundScore;

        // display on ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // get input value from html input field
        var input = document.querySelector('.winCondition').value;
        if(input) {
            var winCondition = input;
        } else {
            winCondition = 100;
        }
        // check if winner
        if (scores[activePlayer] >= winCondition) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('score-' + activePlayer).textContent = 'WINNER!';
            gameInSession = false;

            // hide buttons & dice
            hideDice();
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';
            document.querySelector('.winCondition').style.display = 'none';
            

        } else {
            // switch player
            endTurn();
        }
    }

});

// =============================================
// -          END TURN FUNCTION
// =============================================
function endTurn() {

    // if-then-else
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // switch active class between players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // hide dice again for next player
    hideDice();
}

// =============================================
// -          NEW GAME EVENT
// =============================================
// event listen on click with anonymous function
document.querySelector('.btn-new').addEventListener('click', init);

// =============================================
// -          HIDE DICE FUNCTION
// =============================================
function hideDice() {
    document.getElementById('dice-1').style.display = ('none');
    document.getElementById('dice-2').style.display = ('none');
}