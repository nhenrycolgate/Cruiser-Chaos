function Cruiser(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "Cruiser");
    this.wheels = []; //contains the mesh information for the wheels
    this.height = 50;

    this.Init = function() {
        this.InitWheels();
        this.render.mesh.rotation.y -= DegreesToRadians(90);
        var _UpdateCruiserPosition = this.UpdateCruiserPosition;
        var cruiser = this;
        window.addEventListener('keydown', function(keyEvent) {
            _UpdateCruiserPosition(keyEvent, cruiser);
        });
    }

    this.lane = 1;

    this.UpdateLane = function(input) {
      var newLane = this.lane + input;
      if (newLane < 3 && newLane > -1) {
        this.lane = newLane;
      }
    }

     this.UpdateCruiserPosition = function(keyEvent, cruiser) {
        // if(jumping)return;
        var transform = 0;
        if ( keyEvent.keyCode === 65) { //left 'a'
          cruiser.UpdateLane(-1);
          transform = -70;
        } else if (keyEvent.keyCode === 68) { //right 'd'
          cruiser.UpdateLane(1);
          transform = 70;
        } else if (keyEvent.keyCode === 87) {  //up/jump 'w'
          console.log("Up");
            //     bounceValue=0.1;
            //     jumping=true;
            // }
        }

        var newPosition = cruiser.transform.x + transform;
        if (newPosition <= 70 && newPosition >= -70) {
          cruiser.transform.UpdatePosition(transform, 0 ,0);
        }
        // }
        // if(validMove){
        //     jumping=true;
        //     bounceValue=0.06;
        // }
    }


    this.Update = function(engine) {

        for (var i = 0; i < this.wheels.length; i++) {
            var wheel = this.wheels[i];
            this.WheelUpdate(engine, wheel);
        }
    }

    this.WheelUpdate = function(engine, wheel) {
        //TODO: figure out the rotational speed relative to the speed of the game, and in terms of radians.
        wheel.rotation.y += this.speed;
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
    this.wheels = [];

    this.mesh.rotation.x = 20;

    //Body

    var bodyWidth = 100;
    var bodyHeight = 50;
    var bodyDepth = 50;

    var bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth, 1, 1, 1);
    var bodyMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    this.mesh.add(body);

    //Front

    var frontWidth = 20;
    var frontHeight = 30;
    var frontDepth = 45;

    var frontGeometry = new THREE.BoxGeometry(frontWidth, frontHeight, frontDepth, 1, 1, 1);
    var frontMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
    var front = new THREE.Mesh(frontGeometry, frontMaterial);
    front.position.x = -(bodyWidth / 2) - (frontWidth / 2);
    front.position.y = (frontHeight / 2) - (bodyHeight / 2);

    this.mesh.add(front);

    //Window

    var windowWidth = 15;
    var windowHeight = 30;
    var windowDepth = 2;

    var windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, windowDepth, 1, 1, 1);
    var windowMaterial = new THREE.MeshLambertMaterial({color:COLORS.white});
    var window = new THREE.Mesh(windowGeometry, windowMaterial);

    this.mesh.add(window);

    //TODO; set up the proper space for the window copies.

    var windowCount = 4;

    var x = -(bodyWidth / 2) + (windowWidth / 1);
    var y = 0;
    var z = bodyDepth / 2;

    var padding = 5;

    for (var i = 0; i < windowCount; i++) {

        var xOffset = (windowWidth * i) + (padding * i);

        //TODO: place the window at the correct x,y,z with offset and using both the positive and negative z value.
        var windowCopy = window.clone();
        windowCopy.name = "near_z_window_" + i;
        windowCopy.position.x = x + xOffset;
        windowCopy.position.y = y;
        windowCopy.position.z = z;
        this.mesh.add(windowCopy);

        var windowCopy = window.clone();
        windowCopy.name = "far_z_window_" + i;
        windowCopy.position.x = x + xOffset;
        windowCopy.position.y = y;
        windowCopy.position.z = -z;
        this.mesh.add(windowCopy);
    }

    //Wheel
    //TODO: rotation the entire mesh so the default orientation is facing in the z axis.

    var wheelWidth = 10;
    var wheelHeight = 10;
    var wheelDepth = 8;

    var wheelRadiusDetail = 10;

    var wheelGeometry = new THREE.CylinderGeometry(
                         							wheelWidth,
                         							wheelHeight,
                         							wheelDepth,
                         							wheelRadiusDetail,
                         							6,
                         						);
    var wheelMaterial = new THREE.MeshLambertMaterial({color:COLORS.brownDark});
    var wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);


    //spock

    var spockWidth = 3;
    var spockHeight = 3;
    var spockDepth = wheelDepth + 2;

    var spockRadiusDetail = 10;

    var spockGeometry = new THREE.CylinderGeometry(
                         							spockWidth,
                         							spockHeight,
                         							spockDepth,
                         							spockRadiusDetail,
                         							6,
                         						);
    var spockMaterial = new THREE.MeshLambertMaterial({color:COLORS.white});
    var spock = new THREE.Mesh(spockGeometry, spockMaterial);
    wheel.add(spock);
    wheel.rotation.x = DegreesToRadians(90);

//----------------------------------------------------------------------------------------------------------------------

    var wheelCopy = wheel.clone();
    wheelCopy.position.x = (bodyWidth / 2) - 16;
    wheelCopy.position.y = -(bodyHeight / 2);
    wheelCopy.position.z = (bodyDepth / 2) - 8;

    this.mesh.add(wheelCopy);
    this.wheels.push(wheelCopy);

    var spockMaterial = new THREE.MeshLambertMaterial({color:COLORS.white});
    var spock = new THREE.Mesh(spockGeometry, spockMaterial);
    wheel.add(spock);
    wheel.rotation.x = DegreesToRadians(90);

    var wheelCopy = wheel.clone();
    wheelCopy.position.x = (bodyWidth / 2) - 16;
    wheelCopy.position.y = -(bodyHeight / 2);
    wheelCopy.position.z = -(bodyDepth / 2) + 8;

    this.mesh.add(wheelCopy);
    this.wheels.push(wheelCopy);

//----------------------------------------------------------------------------------------------------------------------

    var wheelCopy = wheel.clone();
    wheelCopy.position.x = -(bodyWidth / 2) + 16;
    wheelCopy.position.y = -(bodyHeight / 2);
    wheelCopy.position.z = (bodyDepth / 2) - 8;

    this.mesh.add(wheelCopy);
    this.wheels.push(wheelCopy);

    var spockMaterial = new THREE.MeshLambertMaterial({color:COLORS.white});
    var spock = new THREE.Mesh(spockGeometry, spockMaterial);
    wheel.add(spock);
    wheel.rotation.x = DegreesToRadians(90);

    var wheelCopy = wheel.clone();
    wheelCopy.position.x = -(bodyWidth / 2) + 16;
    wheelCopy.position.y = -(bodyHeight / 2);
    wheelCopy.position.z = -(bodyDepth / 2) + 8;

    this.mesh.add(wheelCopy);
    this.wheels.push(wheelCopy);
}
