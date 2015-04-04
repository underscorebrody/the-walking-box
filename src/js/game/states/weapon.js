var _ = require('lodash');

module.exports = function() {

  var Weapon = {
    
    shotTimer: 0,

    shoot: function (game, player, bullets) {
      if (Weapon.shotTimer < game.time.now) {
        Weapon.shotTimer = game.time.now + 275;
        var bullet;
        if (facing == 'right') {
          bullet = bullets.create(player.body.x + player.body.width / 2 + 20, player.body.y + player.body.height / 2 - 4, 'bullet');
        } else {
          bullet = bullets.create(player.body.x + player.body.width / 2 - 20, player.body.y + player.body.height / 2 - 4, 'bullet');
        }
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.anchor.setTo(0.5, 0.5);
        bullet.body.velocity.y = 0;
        if (facing == 'right') {
          bullet.body.velocity.x = 400;
        } else {
          bullet.body.velocity.x = -400;
        }
      }
    }
  }

  return Weapon;

};