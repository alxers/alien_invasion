// ;(function() {
    // Initial setup
    var alienX = 50;
    var alienY = 1;
    var alienSpeed = 600;
    var xStep = 80;
    var yStep = 1;
    var intervalId = 0;
    var earthCoord = 90;

    var boardEl = document.getElementById('board');
    var startBtn = document.getElementById('startBtn');
    var gameStatsEl = document.getElementById('gameStats');
    var gameStats = {
        aliensShot: 0
    };
    var aliens = [];

    // Game objects
    var Item = function(type) {
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.isAlive = true;
        return this;
    };

    // Item.prototype.draw = function() {
    //     this.el = document.getElementById(this.type);

    //     this.el.style.position = 'absolute';
    //     this.el.style.left = alienX + '%'; //this.x + '%';
    //     this.el.style.top = alienY + '%';  //this.y + '%';
    //     console.log(this.el);
    // };

    Item.prototype.add = function() {
        this.el = document.createElement('div');
        // this.el.src = '../images/alien.png';
        this.el.className = 'js-alien';
        this.el.style.left = randXCoord() + '%'; //this.x + '%';
        this.el.style.top = alienY + '%';  //this.y + '%';

        board.appendChild(this.el);
        return this;
    };

    Item.prototype.remove = function() {
        board.removeChild(this.el);
        return this;
    };

    Item.prototype.move = function() {
        this.x = randXCoord();
        this.y += yStep;
        this.el.style.left = this.x + '%';
        this.el.style.top = this.y + '%';
    };

    Item.prototype.isOnEarth = function() {
        return (parseInt(this.el.style.top, 10) >= earthCoord);
    };

    Item.prototype.isShot = function() {
        this.isAlive = false;
        return this;
    };

    var randXCoord = function() {
        return Math.floor(Math.random() * xStep);
    };


    var upateStats = function() {
        gameStats.aliensShot += 1;
        gameStatsEl.innerHTML = 'Aliens shot: ' + gameStats.aliensShot;
    }

    var startGame = function() {
        aliens.push(new Item('alien').add());

        // set initial alien height
        // alien.y = alienY;
        startBtn.disabled = true;
        intervalId = setInterval(function() {
            alien.move();
            if (alien.isOnEarth()) {
                gameOver();
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
        console.log(e.target === alien.el);
        if (e.target === alien.el) {
            alien.isShot();
            alien.remove();
            upateStats();
            gameOver();
        };

    }, false);

// })();