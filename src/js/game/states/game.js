module.exports = function(game) {

  var gameState = {},
      player;

  gameState.create = function () {
    player = game.add.sprite(0, 0, 'hero');
    game.physics.arcade.enable(player);
  };

  gameState.update = function() {
    var cursors = game.input.keyboard.createCursorKeys();

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

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
    else {

    }
  }

  return gameState;
};