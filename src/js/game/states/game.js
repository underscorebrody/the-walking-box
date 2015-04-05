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
      game.physics.p2.enable(zombie);
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
    game.physics.startSystem(Phaser.Physics.P2JS);

    staticObjects = game.add.group();
    staticObjects.enableBody = true;

    zombies = game.add.group();
    zombies.enableBody = true;

    //Create an array of coordinates that make a 3000px x 3000 grid
    var placementMatrix = [];
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        placementMatrix.push([i*500, j*500]);
      };
    };

    //Iterate through array to randomly drop cars or trees
    //Once a placement is determined in a grid box, it is randomly placed
    _.each(placementMatrix, function (coordinates) {
      rand = _.random(0, 100);
      randX = _.random(0, 500);
      randY = _.random(0, 500);
      if (rand < 50) {
        if (rand%2 == 0) {
          var car = staticObjects.create(coordinates[0]-randX, coordinates[1]-randY, 'car');
          car.body.immovable = true;
        } else {
          var tree = staticObjects.create(coordinates[0]-randX, coordinates[1]-randY, 'tree');
          tree.body.immovable = true;
        }
      }
    });

    //Create player in center area
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'hero');
    player.pivot.setTo(0,0);

    game.physics.p2.enable(player);
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