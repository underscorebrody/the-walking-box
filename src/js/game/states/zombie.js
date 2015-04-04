var _ = require('lodash');

module.exports = function() {

  var logic = {};

  logic.moveZombie = function(p, z) {
    var areWeMoving = _.random(0, 1);

    if(!!areWeMoving) {
      if(p.body.position.x < z.body.position.x) {
        z.body.velocity.x = -10;
      }
      else if(p.body.position.x > z.body.position.x){
        z.body.velocity.x = 10;
      }
      else {
        z.body.velocity.x = 0;
      }

      if(p.body.position.y < z.body.position.y) {
        z.body.velocity.y = -10;
      }
      else if(p.body.position.y > z.body.position.y){
        z.body.velocity.y = 10;
      }
      else {
        z.body.velocity.y = 0;
      }
    }
  }

  return logic;
};
