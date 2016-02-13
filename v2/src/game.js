;(function() {
    // Initial setup
    var alienX = 50;
    var alienY = 1;
    var alienSpeed = 600;
    var xStep = 80;
    var yStep = 1;
    var intervalId = 0;
    var earthCoord = 90;

    var startBtn = document.getElementById('startBtn');

    var Item = function(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    };

    Item.prototype.draw = function() {
        this.el = document.getElementById(this.type);

        this.el.style.position = 'absolute';
        this.el.style.left = alienX + '%'; //this.x + '%';
        this.el.style.top = alienY + '%';  //this.y + '%';
        console.log(this.el);
    };

    Item.prototype.move = function() {
        this.x = Math.floor(Math.random() * xStep);
        this.y += yStep;
        this.el.style.left = this.x + '%';
        this.el.style.top = this.y + '%';
    };

    Item.prototype.isOnEarth = function() {
        return (parseInt(this.el.style.top, 10) >= earthCoord);
    };


    // Create alien
    var alien = new Item('alien', alienX, alienY);
    alien.draw();

    var startGame = function() {
        // set initial alien height
        alien.y = alienY;
        intervalId = setInterval(function() {
            alien.move();
            if (alien.isOnEarth()) {
                gameOver();
            }
        }, alienSpeed);
    };

    var gameOver = function() {
        clearInterval(intervalId);
        // alien.draw();
    };

    document.addEventListener('click', function(e) {
        console.log(e.target === alien.el);
        if (e.target === alien.el) {
            gameOver();
        };

        if (e.target === startBtn) {
            gameOver();
            startGame();
        }
    }, false);

})();