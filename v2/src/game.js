// ;(function() {
    // Initial setup
    var alienX = 50;
    var alienY = 1;
    var alienSpeed = 600;
    var xStep = 80;
    var xRangeMin = 20;
    var xRangeMax = 80
    var yStep = 10;
    var intervalId = 0;
    var planetPosition = 90;
    var killedPerOneLanding = 1;

    var boardEl = document.getElementById('board');
    var startBtn = document.getElementById('startBtn');
    var gameStatsEl = document.getElementById('gameStats');
    var gameStats = {
        aliensShot: 0,
        planetPopulation: 7,
        level: 1
    };
    var aliens = [];

    // Game objects
    var Alien = function() {
        this.x = 0;
        this.y = 0;
        this.isAlive = true;
        return this;
    };

    Alien.prototype.add = function() {
        this.el = document.createElement('div');
        this.el.className = 'js-alien';
        this.el.style.left = randXCoord() + '%';
        this.el.style.top = randYCoord() + '%';

        board.appendChild(this.el);
        return this;
    };

    Alien.prototype.remove = function() {
        board.removeChild(this.el);
        return this;
    };

    Alien.prototype.move = function() {
        this.x = randXCoord();
        this.y += randYCoord();
        this.el.style.left = this.x + '%';
        this.el.style.top = this.y + '%';
    };

    Alien.prototype.isLanded = function() {
        return (parseInt(this.el.style.top, 10) >= planetPosition);
    };

    Alien.prototype.isShot = function() {
        this.isAlive = false;
        return this;
    };

    var randXCoord = function() {
        return Math.floor(Math.random() * (xRangeMax - xRangeMin + 1)) + xRangeMin;
    };

    var randYCoord = function() {
        return Math.floor(Math.random() * yStep);
    };


    var upateStats = function() {
        gameStatsEl.innerHTML = 'Level: ' + gameStats.level + '</br>' +
                                'Aliens shot: ' + gameStats.aliensShot + '</br>' + 
                                'Planet population: ' + gameStats.planetPopulation + ' billions';
    }

    var startGame = function() {
        aliens.push(new Alien().add());

        // set initial alien height
        // alien.y = alienY;
        startBtn.disabled = true;
        intervalId = setInterval(function() {

            aliens = aliens.filter(function(alien) {
                var isLanded = alien.isLanded();
                if (!isLanded) {
                    alien.move();
                } else {
                    gameStats.planetPopulation -= killedPerOneLanding;
                    upateStats();
                }
                return !isLanded;
            });

            if (gameStats.planetPopulation <= 0) {
                gameOver();
            }
            
            if (!aliens.length) {
                gameStats.level += 1;
                upateStats();
                aliens.push(new Alien().add());
            }

            console.log('tick');
        }, alienSpeed);
    };

    var gameOver = function() {
        clearInterval(intervalId);
        startBtn.disabled = false;
        // alien.draw();
    };

    document.addEventListener('click', function(e) {
        if (e.target === startBtn) {
            gameOver();
            startGame();
        }

        aliens = aliens.filter(function(alien) {
            var isShot = e.target === alien.el;

            if (isShot) {
                alien.isShot();
                alien.remove();
                gameStats.aliensShot += 1;
                upateStats();
            }

            return !isShot;
        });


    }, false);

// })();