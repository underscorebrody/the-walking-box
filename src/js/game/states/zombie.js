var _ = require('lodash');

module.exports = function() {

  var logic = {},
      ZOMBIE_SEEING_DISTANCE = 300;

  function seePlayer(p, z) {
    var playerX = p.position.x,
        playerY = p.position.y,
        zombieX = z.position.x,
        zombieY = z.position.y,
        diffX = Math.abs(playerX - zombieX),
        diffY = Math.abs(playerY - zombieY),
        distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    return distance < ZOMBIE_SEEING_DISTANCE;
  }

  logic.moveZombie = function(p, z) {
    var walkSpeed = z.body.intrinsicWalkSpeed,
        runSpeed = z.body.intrinsicRunSpeed;

    if(seePlayer(p,z)) {
      if(p.position.x < z.position.x) {
        z.body.velocity.x = -1*runSpeed;
      }
      else if(p.position.x > z.position.x){
        z.body.velocity.x = runSpeed;
      }
      else {
        z.body.velocity.x = 0;
      }

      if(p.position.y < z.position.y) {
        z.body.velocity.y = -1*runSpeed;
      }
      else if(p.position.y > z.position.y){
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
  logic.spawnZombies = function (game, zombieGroup, xPosition, yPosition, collisionGroup) {
    for(var i = 0; i < 8; i++) {
      var zombie = zombieGroup.create(xPosition + _.random(0,100),
                                      yPosition + _.random(0,100),
                                      'zombie');
      game.physics.enable(zombie, Phaser.Physics.ARCADE);
      zombie.body.collideWorldBounds = true;
      zombie.pivot.setTo(12,12)
      _.extend(zombie.body, {intrinsicWalkSpeed: _.random(0, 30)});
      _.extend(zombie.body, {intrinsicRunSpeed: _.random(50, 100)});
    }
  }

  return logic;
};
