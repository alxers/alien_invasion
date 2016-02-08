;(function() {
    // Initial setup
    var alienWidth = 20;
    var alienHeight = 20;
    var alienX = 80;
    var alienY = 20;
    var alienXStep = 280;
    var alienYStep = 30;

    var cannon = document.getElementById('cannon');
    var alien = document.getElementById('alien');
    var missle = document.getElementById('missle');

    var inputX = document.getElementById('inputX');
    var inputY = document.getElementById('inputY');
    var output = document.getElementById('output');

    var init = {};

    var fireBtn = document.getElementById('fireBtn');
    fireBtn.addEventListener('click', function() { playGame() }, false);

    function setInitials(init) {
        init.guessX = 0;
        init.guessY = 0;
        init.shotsRemaining = 8;
        init.shotsMade = 0;
        init.gameState = '';
        init.gameWon = false;
    }

    function render() {
        alien.style.left = alienX + 'px';
        alien.style.top = alienY + 'px';

        cannon.style.left = init.guessX + 'px';

        missle.style.left = init.guessX + 'px';
        missle.style.top = init.guessY + 'px';
    }

    function playGame() {
        setInitials(init);
        init.shotsRemaining -= 1;
        init.shotsMade += 1;
        init.gameState = " Shots: " + init.shotsMade + ", remaining: " + init.shotsRemaining;

        isAlienShot();
        isGameWon();
        console.log(alienX, alienY)
        render();
    }

    function isAlienShot() {    
        init.guessX = parseInt(inputX.value, 10);
        init.guessY = parseInt(inputY.value, 10);

        if (init.guessX >= alienX && init.guessX <= alienX + alienWidth) {
            if (init.guessY >= alienY && init.guessY <= alienY + alienHeight) {
                init.gameWon = true;
                endGame();
            }
        } else {
            output.innerHTML = "Miss!" + init.gameState;
        }
    }

    function isGameWon() {
        if (!init.gameWon) {
            alienX = Math.floor(Math.random() * alienXStep);
            alienY += alienYStep;
        }
    }

    function endGame() {
        if (init.gameWon) {
            output.innerHTML = "Hit! You won, it took " + init.shotsMade + " shots.";
        } else {
            output.innerHTML = "You lost! The earth has been invaded!";
        }
    }

})();