var _ = require('lodash');

module.exports = function() {

  var logic = {};

  logic.moveZombie = function(p, z) {
    var areWeMoving = _.random(0, 1),
        speed = z.body.intrinsicSpeed || 30;

    if(!!areWeMoving) {
      if(p.body.position.x < z.body.position.x) {
        z.body.velocity.x = -1*speed;
      }
      else if(p.body.position.x > z.body.position.x){
        z.body.velocity.x = speed;
      }
      else {
        z.body.velocity.x = 0;
      }

      if(p.body.position.y < z.body.position.y) {
        z.body.velocity.y = -1*speed;
      }
      else if(p.body.position.y > z.body.position.y){
        z.body.velocity.y = speed;
      }
      else {
        z.body.velocity.y = 0;
      }
    }
  }

  return logic;
};
