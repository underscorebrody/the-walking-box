var _ = require('lodash'),
    Boid = require('./boid');

module.exports = function() {

  var logic = {};
  
  logic.spawnZombie = function (game, target, group, xPosition, yPosition) {
    var zombie = group.add(new Boid(game,
                                    xPosition + _.random(0,100),
                                    yPosition + _.random(0,100),
                                    group
                                      ));
    zombie.target = target;
  };  

  return logic;
};
