module.exports = function(game) {

  var preloader = {};

  preloader.preload = function () {
    game.load.image('hero', 'images/hero.png#grunt-cache-bust');
    game.load.image('zombie', 'images/zombie.png#grunt-cache-bust');
    game.load.image('car', 'images/car.png#grunt-cache-bust');
    game.load.image('bullet1', 'images/bullet1.png#grunt-cache-bust');
    };

  preloader.create = function () {
    game.state.start('game');
  };

  return preloader;
};
