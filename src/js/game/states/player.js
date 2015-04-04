var _ = require('lodash');

module.exports = function() {

  var logic = {};

  logic.movePlayer = function(game, player) {
    var cursors = game.input.keyboard.createCursorKeys();

    if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      // move west
      player.body.velocity.x = -150;
      player.facing = 'w';
    }
    else if (cursors.left.isDown && cursors.up.isDown && !cursors.down.isDown) {
      // move northwest
      player.body.velocity.x = -150;
      player.body.velocity.y = -150;
      player.facing = 'nw';
    }
    else if (cursors.left.isDown && !cursors.up.isDown && cursors.down.isDown) {
      // move southwest
      player.body.velocity.x = -150;
      player.body.velocity.y = 150;
      player.facing = 'sw';
    }
    else if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      // move east
      player.body.velocity.x = 150;
      player.facing = 'e';
    }
    else if (cursors.right.isDown && cursors.up.isDown && !cursors.down.isDown) {
      // move northeast
      player.body.velocity.x = 150;
      player.body.velocity.y = -150;
      player.facing = 'ne';
    }
    else if (cursors.right.isDown && !cursors.up.isDown && cursors.down.isDown) {
      // move southeast
      player.body.velocity.x = 150;
      player.body.velocity.y = 150;
      player.facing = 'se';
    }
    else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      // move north
      player.body.velocity.y = -150;
      player.facing = 'n';
    }
    else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      // move south
      player.body.velocity.y = 150;
      player.facing = 's';
    }
  }

  return logic;
}