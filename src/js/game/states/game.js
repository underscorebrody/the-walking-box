var _ = require('lodash'),
    zombieLogic = require('./zombie')(),
    playerLogic = require('./player')(),
    weapon = require('./weapon')();

module.exports = function(game) {

  var gameState = {},
      cars,
      player,
      zombies,
      cursors,
      bullets;


  function resetEntity(entity) {
    entity.body.velocity.x = 0;
    entity.body.velocity.y = 0;
  };

  function populateZombies(zombieGroup) {
    for(var i = 0; i < 8; i++) {
      var yPosition = _.random(0, 600);
          xPosition = _.random(0, 800);

      var zombie = zombieGroup.create(xPosition, yPosition, 'zombie');
      game.physics.arcade.enable(zombie);
      zombie.body.collideWorldBounds = true;
      _.extend(zombie.body, {intrinsicSpeed: _.random(0, 100)});
    }
  }


  gameState.create = function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    cars = game.add.group();
    cars.enableBody = true;

    zombies = game.add.group();
    zombies.enableBody = true;

    //Create a car
    var car1 = cars.create(80, 90, 'car');
    car1.body.immovable = true;

    //Create player in same area
    player = game.add.sprite(0, 0, 'hero');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    populateZombies(zombies);

    //Create bullets
    bullets = game.add.group();
    game.physics.enable(bullets, Phaser.Physics.ARCADE);
  };

  gameState.update = function() {
    //  Reset the players velocity (movement)
    resetEntity(player);
    _.each(zombies.children, function(zombie){
      resetEntity(zombie);
    });

    game.physics.arcade.collide(player, cars);
    game.physics.arcade.collide(zombies, cars);


    playerLogic.movePlayer(game, player);

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        weapon.shoot(game, bullets);
    }

    _.each(zombies.children, function(zombie){
      zombieLogic.moveZombie(player, zombie);
    });
  }

  return gameState;
};