;(function() {
    // Initial setup
    var alienX = 50;
    var alienY = 1;
    var alienSpeed = 1000;
    var xStep = 99;
    var yStep = 1;
    var intervalId = 0;

    var Item = function(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    };

    Item.prototype.draw = function() {
        this.el = document.getElementById(this.type);

        this.el.style.position = 'absolute';
        this.el.style.left =  alienX; //this.x + '%';
        this.el.style.top = alienY;  //this.y + '%';
        console.log(this.el);
    };

    Item.prototype.move = function() {
        this.x = Math.floor(Math.random() * xStep);
        this.y += yStep;
        this.el.style.left = this.x + '%';
        this.el.style.top = this.y + '%';
    };


    // Create alien
    var alien = new Item('alien', alienX, alienY);
    alien.draw();

    var startGame = function() {
        intervalId = setInterval(function() {
            alien.move();
        }, alienSpeed);
    }

    var gameOver = function() {
        clearInterval(intervalId);
        // TODO: element does not go back to the initial left and top values
        alien.draw();
    };

    document.addEventListener('click', function(e) {
        console.log(e.target === alien.el);
        if (e.target === alien.el) {
            gameOver();
        }
    }, false);

    startGame();

})();