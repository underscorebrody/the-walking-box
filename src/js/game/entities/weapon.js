var Utilities = require('../utils/utilities')();

module.exports = function() {

  var Weapon = {

    shotTimer: 0,

    shoot: function (game, player, bullets) {
      var baseSpeed = 1000;

      if (Weapon.shotTimer < game.time.now) {
        Weapon.shotTimer = game.time.now + 275;
        var bullet,
            rotation = Utilities.calculateRotation(game, player),
            yModifier = Math.sin(rotation),
            xModifier = Math.cos(rotation);

        bullet = bullets.create(
                  player.position.x+(xModifier*25),
                  player.position.y+(yModifier*25),
                  'bullet');

        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.anchor.setTo(0.5, 0.5);

        Utilities.setBulletSpeed(bullet, rotation, baseSpeed);
      }
    }
  };

  return Weapon;

};