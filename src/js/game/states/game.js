var _ = require('lodash'),
    zombieLogic = require('./zombie')(),
    playerLogic = require('./player')(),
    buildingLogic = require('./building')(),
    weapon = require('./weapon')();

module.exports = function(game) {

  var gameState = {},
      staticObjects,
      player,
      zombies,
      cursors,
      bullets,
      buildings;


  function resetEntity(entity) {
    entity.body.velocity.x = 0;
    entity.body.velocity.y = 0;
  };

  function repelEntity(entity) {
    entity.body.velocity.x = -1*entity.body.velocity.x;
    entity.body.velocity.y = -1*entity.body.velocity.x;
  }

  function killZombie(bullet, zombie) {
    bullet.kill();
    zombie.kill();
  }

  function getPowDistance(fromX, fromY, toX, toY){
    var a = Math.abs(fromX - toX);
    var b = Math.abs(fromY - toY);
    return (a * a) + (b * b);
  }

  function collidesRectCircle(rect, circle){
    var radius = circle.width * 0.5;
    var upperRectRadius = Math.max(rect.width, rect.height) * 0.75;

    // quick check, whether collision is actually possible:
    if(Math.abs(circle.x - rect.x) < radius + upperRectRadius &&
      Math.abs(circle.y - rect.y) < radius + upperRectRadius){

      // adjust radians:
      var rotation = rect.rotation > 0 ? -1 * rect.rotation : -1 * rect.rotation + Math.PI;

      // rotate circle around origin of the rectangle:
      var rotatedCircleX = Math.cos(rotation) * (circle.x - rect.x) -
          Math.sin(rotation) * (circle.y - rect.y) + rect.x;
      var rotatedCircleY  = Math.sin(rotation) * (circle.x - rect.x) +
          Math.cos(rotation) * (circle.y - rect.y) + rect.y;

      // get upper left position of the rectangle:
      var rectX = rect.x - (rect.width * 0.5);
      var rectY = rect.y - (rect.height * 0.5);

      // find closest point in the rectangle to the rotated circle's center:
      var closestX, closestY;

      if (rotatedCircleX  < rectX){
        closestX = rectX;
      } else if (rotatedCircleX  > rectX + rect.width){
        closestX = rectX + rect.width;
      } else {
        closestX = rotatedCircleX;
      }

      if (rotatedCircleY < rectY){
        closestY = rectY;
      } else if (rotatedCircleY > rectY + rect.height) {
        closestY = rectY + rect.height;
      } else {
        closestY = rotatedCircleY;
      }

      // check distance between closest point and rotated circle's center:
      var distance = getPowDistance(rotatedCircleX, rotatedCircleY, closestX, closestY);
      if (distance < radius * radius){
        return true; // collision detected!
      }
    }
    return false;
  }

  function detectCollisionOnPlayer() {
    _.each(staticObjects.children, function(staticObject) {
      if(collidesRectCircle(player, staticObject)) {
        repelEntity(player);
      }
    });
    _.each(buildings.children, function(building) {
      if(collidesRectCircle(building, player)) {
        repelEntity(player);
      }
    });
    _.each(zombies.children, function(zombie) {
      if(collidesRectCircle(zombie, player)) {
        repelEntity(player);
        repelEntity(zombie);
      }
    });
  }

  gameState.create = function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    staticObjects = game.add.group();
    buildings = game.add.group();
    zombies = game.add.group();

    //Create an array of coordinates that make a 3000px x 3000 grid
    var placementMatrix = [];
    for (var i = 0; i < 12; i++) {
      for (var j = 0; j < 12; j++) {
        placementMatrix.push([i*250, j*250]);
      };
    };

    //Iterate through array to randomly drop cars or trees
    //Once a placement is determined in a grid box, it is randomly placed
    _.each(placementMatrix, function (coordinates) {
      rand = _.random(0, 100);
      randX = _.random(0, 250);
      randY = _.random(0, 250);
      if (rand < 50) {
        if (rand%2 == 0) {
          var car = staticObjects.create(coordinates[0]-randX, coordinates[1]-randY, 'car-'+_.random(1,2));
          game.physics.enable(car, Phaser.Physics.ARCADE);
          car.body.immovable = true;
          car.pivot.setTo(75, 75);
        } else {
          var tree = staticObjects.create(coordinates[0]-randX, coordinates[1]-randY, 'tree');
          game.physics.enable(tree, Phaser.Physics.ARCADE);
          tree.body.immovable = true;
          tree.pivot.setTo(75, 75);
        }
      } else if (rand > 90) {
        var building = buildings.create(coordinates[0], coordinates[1], 'building');
        game.physics.enable(building, Phaser.Physics.ARCADE);
        building.body.immovable = true;
        building.hasSpawned = false;
        building.pivot.setTo(125, 125);
      }
    });

    //Create player in center area
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'hero');
    player.pivot.setTo(12,12);

    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    //Create bullets
    bullets = game.add.group();
    game.physics.enable(bullets, Phaser.Physics.ARCADE);
  };

  gameState.update = function() {
    //  Reset the players velocity (movement)
    resetEntity(player);

    game.camera.follow(player);

    game.physics.arcade.collide(zombies, staticObjects);
    game.physics.arcade.collide(zombies, zombies);
    game.physics.arcade.collide(zombies, buildings);

    game.physics.arcade.overlap(bullets, zombies, killZombie, null, this);

    playerLogic.movePlayer(game, player);
    playerLogic.rotatePlayer(game, player);

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.mousePointer.justPressed()) {
        weapon.shoot(game, player, bullets);
    }

    _.each(zombies.children, function(zombie){
      zombieLogic.moveZombie(player, zombie);
    });

    detectCollisionOnPlayer();

    _.each(buildings.children, function(building) {
      buildingLogic.spawnZombiesFromBuilding(game, zombies, player, building);
    });
  }

  return gameState;
};