var _ = require('lodash'),
    zombieLogic = require('./zombie')(),
    playerLogic = require('./player')(),
    weapon = require('./weapon')();

module.exports = function(game) {

  var gameState = {},
      staticObjects,
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
      _.extend(zombie.body, {intrinsicWalkSpeed: _.random(0, 30)});
      _.extend(zombie.body, {intrinsicRunSpeed: _.random(50, 100)});
    }
  }

  function killZombie(bullet, zombie) {
    bullet.kill();
    zombie.kill();
  }

  gameState.create = function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    staticObjects = game.add.group();
    staticObjects.enableBody = true;

    zombies = game.add.group();
    zombies.enableBody = true;

    //Create a car
    for (var i = 0; i < 30; i++) {
      var car1 = staticObjects.create(game.world.randomX, game.world.randomY, 'car');
      car1.body.immovable = true;
    };

    for (var i = 0; i < 30; i++) {
      var tree1 = staticObjects.create(game.world.randomX, game.world.randomY, 'tree');
      tree1.body.immovable = true;
    };

    //Create player in same area
    player = game.add.sprite(0, 0, 'hero');
    player.pivot.setTo(25, 25);

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

    game.camera.follow(player);

    game.physics.arcade.collide(player, staticObjects);
    game.physics.arcade.collide(player, zombies);
    game.physics.arcade.collide(zombies, staticObjects);
    game.physics.arcade.collide(zombies, zombies);

    game.physics.arcade.overlap(bullets, zombies, killZombie, null, this);

    playerLogic.movePlayer(game, player);
    playerLogic.rotatePlayer(game, player);

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        weapon.shoot(game, player, bullets);
    }

    _.each(zombies.children, function(zombie){
      zombieLogic.moveZombie(player, zombie);
    });
  }

  return gameState;
};