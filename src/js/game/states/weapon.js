var Utilities = require('./utilities')();

module.exports = function() {

  var Weapon = {
    
    shotTimer: 0,

    shoot: function (game, player, bullets) {
      var baseSpeed = 1000;

      if (Weapon.shotTimer < game.time.now) {
        Weapon.shotTimer = game.time.now + 275;
        var bullet;
        bullet = bullets.create(
                  player.body.x+25,
                  player.body.y+25,
                  'bullet1');
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.anchor.setTo(0.5, 0.5);
        Utilities.setSpeed(bullet, player.facing, baseSpeed);
      }
    }
  }

  return Weapon;

};