var _ = require('lodash');
var Utilities = require('./utilities')();

module.exports = function() {

  var logic = {};

  logic.movePlayer = function(game, player) {
    var cursors = game.input.keyboard.createCursorKeys(),
        IS_W_DOWN = game.input.keyboard.isDown(Phaser.Keyboard.W),
        IS_A_DOWN = game.input.keyboard.isDown(Phaser.Keyboard.A),
        IS_S_DOWN = game.input.keyboard.isDown(Phaser.Keyboard.S),
        IS_D_DOWN = game.input.keyboard.isDown(Phaser.Keyboard.D),
        baseSpeed = 400,
        direction;

    if (IS_W_DOWN && !IS_A_DOWN && !IS_D_DOWN) {
      direction = 'n';
    }
    else if (IS_D_DOWN && IS_W_DOWN && !IS_S_DOWN) {
      direction = 'ne';
    }
    else if (IS_D_DOWN && !IS_W_DOWN && !IS_S_DOWN) {
      direction = 'e';
    }
    else if (IS_D_DOWN && !IS_W_DOWN && IS_S_DOWN) {
      direction = 'se';
    }
    else if (IS_S_DOWN && !IS_A_DOWN && !IS_D_DOWN) {
      direction = 's';
    }
    else if (IS_A_DOWN && !IS_W_DOWN && IS_S_DOWN) {
      direction = 'sw';
    }
    else if (IS_A_DOWN && !IS_W_DOWN && !IS_S_DOWN) {
      direction = 'w';
    }
    else if (IS_A_DOWN && IS_W_DOWN && !IS_S_DOWN) {
      direction = 'nw';
    }

    if(!!direction) {
      Utilities.setSpeed(player, direction, baseSpeed);
    }
  }

  logic.rotatePlayer = function(game, player) {
    var angleInRadians = Utilities.calculateRotation(game, player);

    player.rotation = angleInRadians;
  }

  return logic;
}