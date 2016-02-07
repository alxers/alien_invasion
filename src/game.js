;(function() {
    // Initial setup
    var alienWidth = 20;
    var alienHeight = 20;
    var alienX = 80;
    var alienY = 20;
    var alienXStep = 280;
    var alienYStep = 30;

    var guessX = 0;
    var guessY = 0;
    var shotsRemaining = 8;
    var shotsMade = 0;
    var gameState = "";
    var gameWon = false;

    var cannon = document.getElementById('cannon');
    var alien = document.getElementById('alien');
    var missle = document.getElementById('missle');

    var inputX = document.getElementById('inputX');
    var inputY = document.getElementById('inputY');
    var output = document.getElementById('output');

    var fireBtn = document.getElementById('fireBtn');
    fireBtn.addEventListener('click', function() { playGame() }, false);

    function render() {
        alien.style.left = alienX + 'px';
        alien.style.top = alienY + 'px';

        cannon.style.left = guessX + 'px';

        missle.style.left = guessX + 'px';
        missle.style.top = guessY + 'px';
    }

    function playGame() {
        shotsRemaining -= 1;
        shotsMade += 1;
        gameState = " Shots: " + shotsMade + ", remaining: " + shotsRemaining;

        isAlienShot();
        isGameWon();
        console.log(alienX, alienY)
        render();
    }

    function isAlienShot() {    
        guessX = parseInt(inputX.value, 10);
        guessY = parseInt(inputY.value, 10);

        if (guessX >= alienX && guessX <= alienX + alienWidth) {
            if (guessY >= alienY && guessY <= alienY + alienHeight) {
                gameWon = true;
                endGame();
            }
        } else {
            output.innerHTML = "Miss!" + gameState;
        }
    }

    function isGameWon() {
        if (!gameWon) {
            alienX = Math.floor(Math.random() * alienXStep);
            alienY += alienYStep;
        }
    }

    function endGame() {
        if (gameWon) {
            output.innerHTML = "Hit! You won, it took " + shotsMade + " shots.";
        } else {
            output.innerHTML = "You lost! The earth has been invaded!";
        }
    }

})();