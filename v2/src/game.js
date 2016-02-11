;(function() {
    // Initial setup
    var alienWidth = 20;
    var alienHeight = 20;
    var alienXStep = 280;
    var alienYStep = 30;

    var cannon = document.getElementById('cannon');
    var alien = document.getElementById('alien');
    var missle = document.getElementById('missle');

    var Item = function(x, y) {
      this.x = x;
      this.y = y;
    };

    Item.prototype.draw = function(type) {
      this.el = document.getElementById(type);

      this.el.style.position = 'absolute';
      this.el.style.left = this.x + 'px';
      this.el.style.top = this.y + 'px';
    };

    var Item.new()

    // setInterval(function() {
    //     alien.style.left = Math.floor(Math.random() * alienXStep);
    //     alien.style.top += alienYStep + 'px';
    // }, 100);

})();