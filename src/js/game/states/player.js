var _ = require('lodash');
var Utilities = require('./utilities')();

module.exports = function() {

  var logic = {};

  logic.movePlayer = function(game, player) {
    var cursors = game.input.keyboard.createCursorKeys(),
        baseSpeed = 150;        ;

    if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      player.facing = 'w';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
    else if (cursors.left.isDown && cursors.up.isDown && !cursors.down.isDown) {
      player.facing = 'nw';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
    else if (cursors.left.isDown && !cursors.up.isDown && cursors.down.isDown) {
      player.facing = 'sw';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
    else if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
      player.facing = 'e';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
    else if (cursors.right.isDown && cursors.up.isDown && !cursors.down.isDown) {
      player.facing = 'ne';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
    else if (cursors.right.isDown && !cursors.up.isDown && cursors.down.isDown) {
      player.facing = 'se';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
    else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      player.facing = 'n';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
    else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown) {
      player.facing = 's';
      Utilities.setSpeed(player, player.facing, baseSpeed);
    }
  }

  return logic;
}