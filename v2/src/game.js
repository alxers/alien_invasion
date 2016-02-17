// ;(function() {
    // Initial setup
    var alienX = 50;
    var alienY = 1;
    var alienSpeed = 600;
    var xStep = 80;
    var xRangeMin = 20;
    var xRangeMax = 80
    var yStep = 30;
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

    // Alien.prototype.draw = function() {
    //     this.el = document.getElementById(this.type);

    //     this.el.style.position = 'absolute';
    //     this.el.style.left = alienX + '%'; //this.x + '%';
    //     this.el.style.top = alienY + '%';  //this.y + '%';
    //     console.log(this.el);
    // };

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
            for (var i = 0; i < aliens.length; i++) {
                aliens[i].move()
                
                if (aliens[i].isLanded()) {
                    aliens.splice(i, 1);
                    gameStats.planetPopulation -= killedPerOneLanding;
                    upateStats();
                }
            }
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
        // console.log(e.target === alien.el);

        for (var i = 0; i < aliens.length; i++) {
     
            if (e.target === aliens[i].el) {
                aliens[i].isShot();
                aliens[i].remove();
                gameStats.aliensShot += 1;
                upateStats();
                // gameOver();
            };
        }


    }, false);

// })();