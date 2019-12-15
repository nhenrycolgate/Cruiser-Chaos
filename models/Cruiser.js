function Cruiser(engine, transform, render, invTimer) {

    GameObject.call(this, engine, transform, render, "Cruiser");
    this.height = 50;
    this.distance = 0;
    this.hp = 3;
    this.lane = 1;
    this.invTimer = invTimer; //invulnerability timer

    this.wheels = []; //contains the mesh information for the wheels

    //todo: move outside
    var distanceElement = document.getElementById("distance");

    this.Init = function() {
        this.render.EarlyLoad();
        this.InitWheels();

        var _cruiser = this;

        //this.AddComponent( "HURT_BOX", new BoxCollider(...) );
        //this.AddComponent("INV_TIMER", this.timer);
        //this.GetComponent("INV_TIMER").RegisterOnClockExpired( (_timer) =>  _cruiser.GetComponent("HURT_BOX").Enable() );

        var _UpdateCruiserPosition = this.UpdateCruiserPosition;
        var cruiser = this;
        window.addEventListener('keydown', function(keyEvent) {
            _UpdateCruiserPosition(keyEvent, cruiser);
        });
    }

    this.TakeDamage = function() {
        this.hp--;

        invTimer.Restart();
        this.GetComponent("HURT_BOX").Disable();

        if (hp == 0) {
            this.callbackHandler.Invoke("DEATH");
        }
    }

    this.Heal = function() {
        this.hp++;
    }

    this.UpdateLane = function(input) {
      var newLane = this.lane + input;
      if (newLane < 3 && newLane > -1) {
        this.lane = newLane;
      }
    }

     this.UpdateCruiserPosition = function(keyEvent, cruiser) {

        var transform = 0;
        if ( keyEvent.keyCode === 65) { //left 'a'
          cruiser.UpdateLane(-1);
          transform = -70;
        } else if (keyEvent.keyCode === 68) { //right 'd'
          cruiser.UpdateLane(1);
          transform = 70;
        }

        var newPosition = cruiser.transform.x + transform;
        if (newPosition <= 70 && newPosition >= -70) {
          cruiser.transform.UpdatePosition(transform, 0 ,0);
        }

    }


    this.Update = function(engine) {

        //if ( ! this.GetComponent("HURT_BOX").enabled ) {
        // this.FlashAnimation();
        //}

        this.distance += 1;
        distanceElement.innerHTML = Math.floor(this.distance*this.speed*20);
        for (var i = 0; i < this.wheels.length; i++) {
            var wheel = this.wheels[i];
            this.WheelUpdate(engine, wheel);
        }

		/*var obstacleTypes= ["Goose","Roadblock"];
		for (var i=0;i<obstacleTypes.length;i=i+1){
			var boxCollider= this.GetComponent("BOX_COLLIDER")
			boxCollider.CheckCollision(obstacleTypes[i]);
		}*/
    }

    this.WheelUpdate = function(engine, wheel) { wheel.rotateX( this.speed ); }
    this.SetSpeed = function(speed) { this.speed = speed; }
    this.InitWheels = function() { this.wheels = this.render.wheels; }

    this.RegisterOnDeath = function(callback) { this.callbackHandler.AddCallback("DEATH", callback); }

}


//Create the model for the cruiser.
function CruiserRender() {

  Render.call(this);

  this.Init = function() {

    this.mesh.name = "Cruiser";
    this.wheels = [];

    //Body--------------------------------------------------------------------------------------------------------------

    var bodyWidth = 100;
    var bodyHeight = 50;
    var bodyDepth = 50;

    var bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth, 1, 1, 1);
    var bodyMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.mesh.add(body);

    //Front-------------------------------------------------------------------------------------------------------------

    var frontWidth = 20;
    var frontHeight = 30;
    var frontDepth = 45;

    var frontGeometry = new THREE.BoxGeometry(frontWidth, frontHeight, frontDepth, 1, 1, 1);
    var frontMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
    var front = new THREE.Mesh(frontGeometry, frontMaterial);
    front.position.x = -(bodyWidth / 2) - (frontWidth / 2);
    front.position.y = (frontHeight / 2) - (bodyHeight / 2);
    this.mesh.add(front);

    //Window------------------------------------------------------------------------------------------------------------

    var windowWidth = 15;
    var windowHeight = 30;
    var windowDepth = 2;

    var windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, windowDepth, 1, 1, 1);
    var windowMaterial = new THREE.MeshLambertMaterial({color:COLORS.white});
    var window = new THREE.Mesh(windowGeometry, windowMaterial);
    this.mesh.add(window);


    var windowCount = 4;
    var x = -(bodyWidth / 2) + (windowWidth / 1);
    var y = 0;
    var z = bodyDepth / 2;
    var padding = 5;

    for (var i = 0; i < windowCount; i++) {

        var xOffset = (windowWidth * i) + (padding * i);
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

    //Wheel-------------------------------------------------------------------------------------------------------------

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

    //spock-------------------------------------------------------------------------------------------------------------

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
    wheel.rotateX(DegreesToRadians(90));

//----------------------------------------------------------------------------------------------------------------------

    var wheelCopy_0 = wheel.clone();
    wheelCopy_0.position.x = (bodyWidth / 2) - 16;
    wheelCopy_0.position.y = -(bodyHeight / 2);
    wheelCopy_0.position.z = (bodyDepth / 2) - 8;
    this.mesh.add(wheelCopy_0);
    //this.wheels.push(wheelCopy);

//----------------------------------------------------------------------------------------------------------------------

    var wheelCopy_1 = wheel.clone();
    wheelCopy_1.position.x = (bodyWidth / 2) - 16;
    wheelCopy_1.position.y = -(bodyHeight / 2);
    wheelCopy_1.position.z = -(bodyDepth / 2) + 8;
    this.mesh.add(wheelCopy_1);
    //this.wheels.push(wheelCopy);

//----------------------------------------------------------------------------------------------------------------------

    var wheelCopy_2 = wheel.clone();
    wheelCopy_2.position.x = -(bodyWidth / 2) + 16;
    wheelCopy_2.position.y = -(bodyHeight / 2);
    wheelCopy_2.position.z = (bodyDepth / 2) - 8;
    this.mesh.add(wheelCopy_2);
    //this.wheels.push(wheelCopy);

//----------------------------------------------------------------------------------------------------------------------

    var wheelCopy_3 = wheel.clone();
    wheelCopy_3.position.x = -(bodyWidth / 2) + 16;
    wheelCopy_3.position.y = -(bodyHeight / 2);
    wheelCopy_3.position.z = -(bodyDepth / 2) + 8;
    this.mesh.add(wheelCopy_3);

    this.wheels.push( wheelCopy_0 );
    this.wheels.push( wheelCopy_1 );
    this.wheels.push( wheelCopy_2 );
    this.wheels.push( wheelCopy_3 );

    this.mesh.rotateY(DegreesToRadians(-90));
  }

}
