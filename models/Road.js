function Road(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "ROAD");

    var directions = {
      N:0,
      E:1,
      S:2,
      W:3,
    };

    var vector = new THREE.Vector3(1, 0, 0);
    var multiplier = 1;

    this.direction = directions.N;
    this.speed = 0;

    this.Init = function() {
      if (!this.render.loaded) {
        this.render.Init();
      }
    }

    this.SetSpeed = function(speed) { this.speed = speed; }

    this.GetSpeed = function() { return this.speed; }

    this.TurnLeft = function() {
      // render.mesh.rotation.y = DegreesToRadians(90);
      // this.oppositeRoad = !this.oppositeRoad;
      this.direction = (this.direction + 3) % 4;
      // render.mesh.rotation.z += DegreesToRadians(-90);
      console.log("left" + this.direction);
      // switch (this.direction) {
      //   case this.directions.N:
      //     this.direction = this.directions.W;
      //
      //     break;
      //   case this.directions.E:
      //     break;
      //   case this.directions.S:
      //     break;
      //   case this.directions.W:
      //     break;
      // }
    }

    this.TurnRight = function() {

      // this.oppositeRoad = !this.oppositeRoad;
      this.direction = (this.direction + 1) % 4;
      // render.mesh.rotation.z += DegreesToRadians(90);
      console.log("right" + this.direction);
      if (this.render.mesh.rotation.x != 0) {
        this.render.mesh.rotation.x = 0;
      }
      this.render.mesh.rotateY(DegreesToRadians(-90));
      //this.render.mesh.rotation.y += DegreesToRadians(-90);

      switch (this.direction) {
        case directions.N:
          vector = new THREE.Vector3(1,0,0);
          multiplier = 1;
          break;
        case directions.E:
          vector = new THREE.Vector3(0,0,1);
          multiplier = 1;
          break;
        case directions.S:
          vector = new THREE.Vector3(1,0,0);
          //multiplier = -1
          break;
        case directions.W:
          vector = new THREE.Vector3(0,0,1);
          //multiplier = -1
          break;
      }
    }

    this.Update = function() {

        this.render.mesh.rotateX(this.speed);

      //this.render.mesh.rotateOnAxis(new THREE.Vector3(1,0,0), multiplier * this.speed);

      //console.log("rot?" + this.render.mesh.rotation.x);

      // switch (this.direction) {
      //   case directions.N
      // }
      // console.log("x " + render.mesh.rotation.x);
      // console.log("y " + render.mesh.rotation.y);
      // console.log("z " + render.mesh.rotation.z);
      // if (this.oppositeRoad) {
      //   render.mesh.rotation.y += this.speed;
      // } else {
        // render.mesh.rotation.x += this.speed; //have the world spinning around the x axis
      // }
      //
      // switch (this.direction) {
      //   case directions.N:
      //     this.render.mesh.rotateX(this.speed);
      //     break;
      //   case directions.E:
      //     this.render.mesh.rotateY(this.speed);
      //     break;
      //   case directions.S:
      //     this.render.mesh.rotateX(-this.speed);
      //     break;
      //   case directions.W:
      //     this.render.mesh.rotateY(-this.speed);
      //     break;
      // }
    }
}

function RoadRender(radius, width, laneRadius, laneWidth, oppositeDirection) {

  Render.call(this);

  this.Init = function() {
    this.mesh.name = "ROAD";

    //build road
    var cylinderGeometry = new THREE.CylinderGeometry( radius, radius, width, 50 );
    var cylinderMaterial = new THREE.MeshLambertMaterial( { color:COLORS.gray } );
    var road = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

    //build lane
    var laneGeometry = new THREE.CylinderGeometry( laneRadius, laneRadius, laneWidth, 50 );
    var laneMaterial = new THREE.MeshLambertMaterial( { color:COLORS.yellow } );
    var roadLaneLeft = new THREE.Mesh( laneGeometry, laneMaterial );
    var roadLaneRight = new THREE.Mesh( laneGeometry, laneMaterial );

    /*
    if (oppositeDirection) {
      roadLaneLeft.position.z = -width/6;
      roadLaneRight.position.z = width/6;
      roadLaneLeft.rotateX(DegreesToRadians(90));
      roadLaneRight.rotateX(DegreesToRadians(90));
      road.rotateX(DegreesToRadians(90));
    }
    else {
      roadLaneLeft.position.x = -width/6;
      roadLaneRight.position.x = width/6;
      roadLaneLeft.rotateZ(DegreesToRadians(90));
      roadLaneRight.rotateZ(DegreesToRadians(90));
      road.rotateZ(DegreesToRadians(90));
    }*/


    //var roadParent = new THREE.Object3D();
    //roadParent.add(road);

    roadLaneLeft.position.y = -width / 6;
    roadLaneRight.position.y = width / 6;

    road.add(roadLaneLeft);
    road.add(roadLaneRight);

    road.rotateX(DegreesToRadians(90));
    road.rotateZ(DegreesToRadians(90));

    this.mesh.add(road);
  }
}
