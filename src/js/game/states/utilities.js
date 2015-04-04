module.exports = function() {

  var Utilities = {};

  //Sets an objects speed based on the facing direction
  Utilities.setSpeed = function (object, facing, speed) {
    var direction = {
                      'n' : [0,-1],
                      'ne': [1,-1],
                      'e' : [1,0],
                      'se': [1,1],
                      's' : [0,1],
                      'sw': [-1,1],
                      'w' : [-1,0],
                      'nw': [-1,-1]
                    };
    object.body.velocity.x = direction[facing][0]*speed;
    object.body.velocity.y = direction[facing][1]*speed;
  }

  return Utilities;
}