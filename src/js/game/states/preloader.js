module.exports = function(game) {

  var preloader = {};

  preloader.preload = function () {
    game.load.image('logo', 'images/phaser.png#grunt-cache-bust');
    game.load.image('hero', 'images/hero.png#grunt-cache-bust');
    game.load.image('zombie', 'images/zombie.png#grunt-cache-bust');
  };

  preloader.create = function () {
    game.state.start('game');
  };

  return preloader;
};
