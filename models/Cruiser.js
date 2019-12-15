//Cruiser logic
function Cruiser(engine, transform, render = new CruiserRender(), invTimer) {

    GameObject.call(this, engine, transform, render, "Cruiser");

    this.maxHp = 3;
    this.hp = this.maxHp;

    this.lane = 1;
    this.invTimer = invTimer; //invulnerability timer

    this.width = 0;
    this.height = 0;
    this.depth = 0;
    this.laneWidth = 0;

    this.wheels = []; //contains the mesh information for the wheels

    this.SetLaneWidth = function(laneWidth) { this.laneWidth = laneWidth; }

    this.Init = function(engine) {
        this.render.EarlyLoad();

        this.width = this.render.width;
        this.height = this.render.height;
        this.depth = this.render.depth;

        this.InitWheels();

        var _cruiser = this;

        //for damage + pickup power ups
        this.AddComponent( "HURT_BOX", new BoxCollider(this.width, this.height, this.depth) );

        //for student pickup
        this.AddComponent( "GRAB_BOX_L", new BoxCollider(this.width, this.height, this.depth,
            new Transform(-this.laneWidth, 0, 0), COLORS.yellow) );
        this.AddComponent( "GRAB_BOX_R", new BoxCollider(this.width, this.height, this.depth,
            new Transform(this.laneWidth, 0, 0), COLORS.blue) );

        //Invulnerability Timer
        this.AddComponent("INV_TIMER", this.invTimer);
        this.GetComponent("INV_TIMER").RegisterOnClockExpired( (_timer) =>  _cruiser.GetComponent("HURT_BOX").Enable() );

        this.RegisterOnHit( (_this) => _this.hp-- );
        this.RegisterOnDeath( (_this) => engine.GetController("GAME_CONTROLLER").GameOver() );

        //todo, grab reference to student for amount???
        this.RegisterOnExtraStudent( (_this) => engine.GetController("GAME_CONTROLLER").UpdateScore(1000) );


        var _UpdateCruiserPosition = this.UpdateCruiserPosition;

        window.addEventListener('keydown', function(keyEvent) {
            _UpdateCruiserPosition(keyEvent, _cruiser);
        });
    }

    this.TakeDamage = function(engine) {
        this.callbackHandler.Invoke("HIT");
        if (this.hp == 0) {
            this.callbackHandler.Invoke("DEATH");
        }
    }

    this.PickupStudent = function(engine) {
        if (this.hp < this.maxHP) {
            this.hp++;
        }
        else {
            this.callbackHandler.Invoke("ON_EXTRA_STUDENT");
        }
    }

    //TryChangingLanes
    this.TryChangingLane = function(input) {
        var oldLane = this.lane;
        var newLane = this.lane + input;

        if (this.CanMove(newLane) && oldLane != newLane) {
            this.lane = newLane;
            this.callbackHandler.Invoke("CHANGE_LANE");
            return true;
        }

        return false;
    }

    this.CanMove = function(newLane) { return newLane >= 0 && newLane < 3; }

    this.Update = function(engine) {
        this.UpdateWheels(engine);

        //if ( ! this.GetComponent("HURT_BOX").enabled ) {
        // this.FlashAnimation();
        //}

		/*var obstacleTypes= ["Goose","Roadblock"];
		for (var i=0;i<obstacleTypes.length;i=i+1){
			var boxCollider= this.GetComponent("BOX_COLLIDER")
			boxCollider.CheckCollision(obstacleTypes[i]);
		}*/
    }

    this.UpdateWheels = function(engine) {
        for (var wheel of this.wheels) {
            this.WheelUpdate(engine, wheel);
        }
    }

    this.WheelUpdate = function(engine, wheel) {
        //wheel.rotateX( this.speed );
        this.render.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), multiplier * this.speed);
    }
    this.SetSpeed = function(speed) { this.speed = speed; }
    this.InitWheels = function() { this.wheels = this.render.wheels; }

    this.RegisterOnDeath = function(callback) { this.callbackHandler.AddCallback("DEATH", callback); }
    this.RegisterOnHit = function(callback) { this.callbackHandler.AddCallback("HIT", callback); }
    this.RegisterOnExtraStudent = function(callback) { this.callbackHandler.AddCallback("ON_EXTRA_STUDENT", callback); }

    this.UpdateCruiserPosition = function(keyEvent, cruiser) {

        var offset = 0;
        var check = false;
        var input = 0;

        if ( keyEvent.keyCode === 65) { //left 'a'
          input = -1;
          offset = -cruiser.laneWidth;
          //todo switch to be worldController.roadWidth
        }
        else if (keyEvent.keyCode === 68) { //right 'd'
          input = 1;
          offset = cruiser.laneWidth;
        }

        check = cruiser.TryChangingLane(input);

        if (check) {
            var newPosition = cruiser.transform.x + offset;
          cruiser.transform.UpdatePosition(offset, 0 ,0);
        }
    }
}

//Create the model for the cruiser.
function CruiserRender(width, height, depth) {
  Render.call(this);

  this.Init = function() {

    this.mesh.name = "CRUISER";
    this.wheels = [];

    this.width = depth;
    this.height = height;
    this.depth = width;

    //Body--------------------------------------------------------------------------------------------------------------

    var bodyWidth = width;
    var bodyHeight = height;
    var bodyDepth = depth;

    var bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth, 1, 1, 1);
    var bodyMaterial = new THREE.MeshLambertMaterial({color:COLORS.red, transparent: true, opacity: .2});
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
    //this.mesh.add(window);


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
