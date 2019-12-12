function Road(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "ROAD");

    this.Init = function() {}

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }

    this.Update = function() {
        render.mesh.rotation.x += this.speed;
    }
}

function RoadRender(radius, width, oppositeDirection) {

    this.mesh = new THREE.Object3D();
    this.mesh.name = "Road";

    var cylinderGeometry = new THREE.CylinderGeometry( radius, radius, width, 50 );
    var cylinderMaterial = new THREE.MeshLambertMaterial( { color:COLORS.gray } );
    var road = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

    var laneGeometry = new THREE.CylinderGeometry( radius+5, radius+5, 5, 50 );
    var laneMaterial = new THREE.MeshLambertMaterial( { color:COLORS.yellow } );
    var roadLaneLeft = new THREE.Mesh( laneGeometry, laneMaterial );
    var roadLaneRight = new THREE.Mesh( laneGeometry, laneMaterial );

    if (oppositeDirection) {
      roadLaneLeft.position.z = -width/6;
      roadLaneRight.position.z = width/6;
    } else {
      roadLaneLeft.position.x = -width/6;
      roadLaneRight.position.x = width/6;
      roadLaneLeft.rotation.z = DegreesToRadians(90);
      roadLaneRight.rotation.z = DegreesToRadians(90);
      road.rotation.z = DegreesToRadians(90);
    }

    road.rotation.x = DegreesToRadians(90);
    roadLaneLeft.rotation.x = DegreesToRadians(90);
    roadLaneRight.rotation.x = DegreesToRadians(90);

    var roadParent = new THREE.Object3D();
    roadParent.add(road);
    roadParent.add(roadLaneLeft);
    roadParent.add(roadLaneRight);

    this.mesh.add(roadParent);
}
