var _ = require('lodash');

module.exports = function() {

  var logic = {},
      ZOMBIE_SEEING_DISTANCE = 200;

  function seePlayer(p, z) {
    var playerX = p.body.position.x,
        playerY = p.body.position.y,
        zombieX = z.body.position.x,
        zombieY = z.body.position.y,
        diffX = Math.abs(playerX - zombieX),
        diffY = Math.abs(playerY - zombieY),
        distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    return distance < ZOMBIE_SEEING_DISTANCE;
  }

  logic.moveZombie = function(p, z) {
    var walkSpeed = z.body.intrinsicWalkSpeed,
        runSpeed = z.body.intrinsicRunSpeed;

    if(seePlayer(p,z)) {
      if(p.body.position.x < z.body.position.x) {
        z.body.velocity.x = -1*runSpeed;
      }
      else if(p.body.position.x > z.body.position.x){
        z.body.velocity.x = runSpeed;
      }
      else {
        z.body.velocity.x = 0;
      }

      if(p.body.position.y < z.body.position.y) {
        z.body.velocity.y = -1*runSpeed;
      }
      else if(p.body.position.y > z.body.position.y){
        z.body.velocity.y = runSpeed;
      }
      else {
        z.body.velocity.y = 0;
      }
    }
    else {
      var moveNorth = _.random(0, 1),
          moveEast = _.random(0,1);

      if(!!moveNorth) {
        z.body.velocity.y = walkSpeed;
      }
      else {
        z.body.velocity.y = -1*walkSpeed;
      }

      if(!!moveEast) {
        z.body.velocity.x = walkSpeed;
      }
      else {
        z.body.velocity.x = -1*walkSpeed;
      }

    }
  }

  return logic;
};
