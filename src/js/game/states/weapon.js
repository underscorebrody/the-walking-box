var _ = require('lodash');

module.exports = function() {

  var Weapon = {
    
    shotTimer: 0,

    shoot: function (game, player, bullets) {
      var baseSpeed = 1000,
          trajectory = {
            'n' : [0,-1],
            'ne': [1,-1],
            'e' : [1,0],
            'se': [1,1],
            's' : [0,1],
            'sw': [-1,1],
            'w' : [-1,0],
            'nw': [-1,-1]
          };
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
        bullet.body.velocity.x = trajectory[player.facing][0]*baseSpeed;
        bullet.body.velocity.y = trajectory[player.facing][1]*baseSpeed;
      }
    }
  }

  return Weapon;

};