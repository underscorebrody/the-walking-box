var _ = require('lodash');

module.exports = function(game) {

  var gameState = {},
      player, cursors, zombie;

  function moveZombie(p, z) {
    var areWeMoving = _.random(0, 1);

    if(!!areWeMoving) {
      if(p.body.position.x < z.body.position.x) {
        z.body.velocity.x = -10;
      }
      else if(p.body.position.x > z.body.position.x){
        z.body.velocity.x = 10;
      }
      else {
        z.body.velocity.x = 0;
      }

      if(p.body.position.y < z.body.position.y) {
        z.body.velocity.y = -10;
      }
      else if(p.body.position.y > z.body.position.y){
        z.body.velocity.y = 10;
      }
      else {
        z.body.velocity.y = 0;
      }
    }
  }

  function resetEntity(entity) {
    entity.body.velocity.x = 0;
    entity.body.velocity.y = 0;
  }


  gameState.create = function () {
    player = game.add.sprite(0, 0, 'hero');
    zombie = game.add.sprite(100, 0, 'zombie');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(zombie);
  };

  gameState.update = function() {
    cursors = game.input.keyboard.createCursorKeys();

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

    moveZombie(player, zombie);
  }

  return gameState;
};