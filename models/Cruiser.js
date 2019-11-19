function Cruiser(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "Cruiser");
    this.wheels = []; //contains the mesh information for the wheels

    //defines the lane the cruiser is currently occupying.  Set to the middle lane by default.
    //lane = 0 => leftmost lane
    //lane = 1 => middle lane
    //lane = 2 => rightmost lane

    //TODO: Set this up with an enum.
    this.lane = 1;

    this.Update = function(engine) {
        for (var i = 0; i < this.wheels.length; i++) {
            var wheel = wheels[i];
            WheelUpdate(engine, wheel);
        }
    }

    this.WheelUpdate = function(engine, mesh) {
        //TODO: figure out the rotational speed relative to the speed of the game, and in terms of radians.
        //wheel.rotation.x += speed;
    }

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }

    this.InitWheels = function() {
        this.wheels = render.wheels;
    }

}


//Create the model for the cruiser.
function CruiserRender() {

    this.mesh = new THREE.Object3D();
    this.mesh.name = "Cruiser";
    //this.wheels = [];

    //Body

    var bodyGeometry = new THREE.BoxGeometry(100,50,50,1,1,1);
    var bodyMaterial = new THREE.MeshLambertMaterial({color:Colors.red});
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    this.mesh.add(body);

    //Front ??? Is it necessary to have a sloped front or can it also be a box?

    //Window

    var windowGeometry = new THREE.BoxGeometry(10,10,2,1,1,1);
    var windowMaterial = new THREE.MeshLambertMaterial({color:Colors.white});
    var window = new THREE.Mesh(windowGeometry, windowMaterial);

    //TODO; set up the proper space for the window copies.
    var x = 0;
    var y = 0;
    var z = 0;

    for (var i = 0; i < 4; i++) {
        //TODO: place the window at the correct x,y,z with offset and using both the positive and negative z value.
        //var windowCopy = window.clone();
        //windowCopy.name = "near_z_window_" + i;
        //this.mesh.add(windowCopy);

        //var windowCopy = window.clone();
        //windowCopy.name = "far_z_window_" + i;
        //this.mesh.add(windowCopy);
    }

    //Wheel

    //TODO: rotation the entire mesh so the default orientation is facing in the z axis.

}