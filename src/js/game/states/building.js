var _ = require('lodash'),
        zombieLogic = require('./zombie')();

module.exports = function() {

  var logic = {},
      SPAWNING_DISTANCE = 600,
      BUILDING_SIZE = 500;

  function checkSpawn(player, building) {
    var playerX = player.position.x,
        playerY = player.position.y,
        buildingX = building.position.x+BUILDING_SIZE/2,
        buildingY = building.position.y+BUILDING_SIZE/2,
        diffX = Math.abs(playerX - buildingX),
        diffY = Math.abs(playerY - buildingY),
        distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    return distance < SPAWNING_DISTANCE + BUILDING_SIZE/2;
  }

  logic.spawnZombiesFromBuilding = function (game, zombies, player, building) {
    if ( !building.hasSpawned && checkSpawn(player, building) ) {
      var playerX = player.position.x,
          playerY = player.position.y,
          buildingX = building.position.x+BUILDING_SIZE/2,
          buildingY = building.position.y+BUILDING_SIZE/2,
          x = playerX - buildingX,
          y = playerY - buildingY,
          AdjustX = 0,
          AdjustY = 0;

      //Zombies should spawn on the correct side of the building to swarm the player
      if (Math.abs(x) > Math.abs(y)) {
        if (x > 0) {
          AdjustX = 300;
        } else {
          AdjustX = -250;
        }
      } else {
        if (y > 0) {
          AdjustY = 250;
        } else {
          AdjustY = -300;
        }
      }

      zombieLogic.spawnZombies(game, zombies, buildingX+AdjustX, buildingY+AdjustY);
      building.hasSpawned = true;
    }
  }

  return logic;
};
