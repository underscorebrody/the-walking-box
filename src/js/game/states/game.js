var zombieLogic = require('./zombie')();

module.exports = function(game) {

  var gameState = {},
      cars,
      player,
      cursors,
      zombie;

  function resetEntity(entity) {
    entity.body.velocity.x = 0;
    entity.body.velocity.y = 0;
  }

  gameState.create = function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    cars = game.add.group();
    cars.enableBody = true;

    //Create a car
    var car1 = cars.create(80, 90, 'car');
    car1.body.immovable = true;

    //Create player in same area
    player = game.add.sprite(0, 0, 'hero');
    zombie = game.add.sprite(100, 0, 'zombie');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(zombie);
    player.body.collideWorldBounds = true;
    zombie.body.collideWorldBounds = true;
  };

  gameState.update = function() {
    cursors = game.input.keyboard.createCursorKeys();

    game.physics.arcade.collide(player, cars);
    game.physics.arcade.collide(zombie, cars);

    //  Reset the players velocity (movement)
    resetEntity(player);
    resetEntity(zombie);

    if (cursors.left.isDown) {
      // move west
      player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
      // move east
      player.body.velocity.x = 150;
    }
    else if (cursors.up.isDown) {
      // move north
      player.body.velocity.y = -150;
    }
    else if (cursors.down.isDown) {
      // move south
      player.body.velocity.y = 150;
    }

    zombieLogic.moveZombie(player, zombie);
  }

  return gameState;
};