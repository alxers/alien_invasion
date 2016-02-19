// ;(function() {
    // Initial setup
    var alienX = 50;
    var alienY = 1;
    var alienSpeed = 700; // the smaller the number, the higher the speed
    var xStep = 80;
    var xRangeMin = 20;
    var xRangeMax = 80
    var yStep = 5;
    var intervalId = 0;
    var planetPosition = 90;
    var killedPerOneLanding = 1;

    var gameStats = {};

    var boardEl = document.getElementById('board');
    var startBtn = document.getElementById('startBtn');
    var gameStatsEl = document.getElementById('gameStats');
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

        boardEl.appendChild(this.el);
        return this;
    };

    Alien.prototype.remove = function() {
        boardEl.removeChild(this.el);
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

    var setDefaultStats = function(gameStats) {
        gameStats.aliensShot = 0;
        gameStats.planetPopulation = 7;
        gameStats.level = 1;
    };

    var upateStats = function() {
        gameStatsEl.innerHTML = 'Level: ' + gameStats.level + '</br>' +
                                'Aliens shot: ' + gameStats.aliensShot + '</br>' +
                                'Planet population: ' + gameStats.planetPopulation + ' billions';
    }

    var startGame = function() {
        boardEl.innerHTML = '';
        setDefaultStats(gameStats);
        upateStats();
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


            if (!aliens.length) {
                gameStats.level += 1;
                upateStats();
                for (var i = 0; i < gameStats.level; i++) {
                    aliens.push(new Alien().add());
                }
            }

            if (gameStats.planetPopulation <= 0) {
                gameOver();
            }

            console.log('tick');
        }, alienSpeed);
    };

    var gameOver = function() {
        clearInterval(intervalId);
        aliens = [];
        gameStats = {};
        setDefaultStats(gameStats);
        startBtn.disabled = false;
    };

    document.addEventListener('click', function(e) {
        if (e.target === startBtn) {
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
