function Road(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "ROAD");

    this.Init = function() {
        this.SetSpeed(DegreesToRadians(1));
    }

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }

    this.Update = function() {
        render.mesh.rotation.x += this.speed;
    }
}

function RoadRender(radius, width) {

    this.mesh = new THREE.Object3D();
    this.mesh.name = "Road";

    var cylinderGeometry = new THREE.CylinderGeometry( radius, radius, width, 50 );
    var cylinderMaterial = new THREE.MeshLambertMaterial( { color:COLORS.gray } );
    var road = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

    var laneGeometry = new THREE.CylinderGeometry( radius+5, radius+5, 5, 50 );
    var laneMaterial = new THREE.MeshLambertMaterial( { color:COLORS.yellow } );
    var roadLaneLeft = new THREE.Mesh( laneGeometry, laneMaterial );
    roadLaneLeft.position.x = -width/6;
    var roadLaneRight = new THREE.Mesh( laneGeometry, laneMaterial );
    roadLaneRight.position.x = width/6;

    road.rotation.x = DegreesToRadians(90);
    road.rotation.z = DegreesToRadians(90);
    roadLaneLeft.rotation.x = DegreesToRadians(90);
    roadLaneLeft.rotation.z = DegreesToRadians(90);
    roadLaneRight.rotation.x = DegreesToRadians(90);
    roadLaneRight.rotation.z = DegreesToRadians(90);

    var roadParent = new THREE.Object3D();
    roadParent.add(road);
    roadParent.add(roadLaneLeft);
    roadParent.add(roadLaneRight);

    this.mesh.add(roadParent);
}
