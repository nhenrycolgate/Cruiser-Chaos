var engine, //reference to the engine
    scene, //reference to the scene
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, //cameraData

    gui, //Gui data
    stats, //gui fields

    renderer; //scene renderer

var gameInProgress = true; // Link to completing objectives

var HEIGHT, WIDTH; //display size

var ambientLight, hemisphereLight, shadowLight; //lighting

function init(event) { //initializer

    beginGameMenu = document.getElementById("beginGameMenu");
    gameOverMenu = document.getElementById("gameOverMenu");

    //Global Initializer

    CreateScene(); //build scene
    CreateLights(); //build lighting
    CreateStats(); //build ui stats

    //Initialize engine and engine data

    engine = new Engine(scene);
    //engine.AddController(new CameraController(camera, 1000));
    //engine.AddController( new DebugGUIController(gui, ShowStats, HideStats));
    engine.AddController( new GameController() );
    engine.AddController( new SpawnController() );
    engine.AddController( new BuildingSpawnController() );

    //------------------------------------------------------------------------------------------------------------------

    var worldRadius = 1000;
    var roadHeight = 5;
    var roadRadius = worldRadius + roadHeight;
    var laneRadius = roadRadius + 5;
    var laneLineWidth = 5;
    var roadWidth = 210;
    var laneWidth = roadWidth / 3;
    var worldSpeed = 0.6;

    var wheelHeight = 5;
    var cruiserWidth = 100;
    var cruiserHeight = 50;
    var cruiserDepth = 50;

    //------------------------------------------------------------------------------------------------------------------

    world = new RollingWorld(engine, new Transform(0, 0, 0), new RollingWorldRender(worldRadius));
    world.SetSpeed(DegreesToRadians(worldSpeed));
    engine.CreateInstance(world);

    road = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, laneRadius, laneLineWidth, false));
    road.SetSpeed(DegreesToRadians(worldSpeed));
    engine.CreateInstance(road);

    //oppositeRoad = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, true));
    //oppositeRoad.SetSpeed(DegreesToRadians(worldSpeed));
    //engine.CreateInstance(oppositeRoad);

    var cruiser = new Cruiser(engine,
        new Transform(0, (cruiserHeight / 2) + roadRadius + wheelHeight, 0),
        new CruiserRender(cruiserWidth, cruiserHeight, cruiserDepth));

    cruiser.SetLaneWidth(laneWidth);

    cruiser.SetSpeed(DegreesToRadians(worldSpeed));
    cruiser.RegisterOnHit( (_cruiser) =>  _cruiser.GetComponent("INV_TIMER").Restart() );
    cruiser.RegisterOnHit( (_cruiser) =>  _cruiser.GetComponent("HURT_BOX").Disable() );
    cruiser.RegisterOnDeath( (_cruiser) =>  _cruiser.Destroy(engine) );
    engine.CreateInstance(cruiser);

    //var empty = new GameObject();
    //empty.AddComponent("TIMER", new Timer(200));
    //empty.GetComponent("TIMER").RegisterOnClockExpired( (_timer) => cruiser.TakeDamage(engine) );
    //empty.GetComponent("TIMER").RegisterOnClockExpired( (_timer) => _timer.Restart() );
    //engine.CreateInstance(empty);

    //var particle = new Particle(engine, DefaultTransform(), new ParticleRender(), new Timer(20));
    //var particleSystem = new ParticleSystem(engine, DefaultTransform(), new GameObjectRender(), particle, new Timer(1));
    // engine.CreateInstance(particleSystem);

    //todo add NESW triggers at the trigger
    var trigger = new GameObject(engine, new Transform( 0, worldRadius, 0 ));
    var collider = new BoxCollider(roadWidth, 100, roadWidth);
    collider.render.EarlyLoad();
    collider.Disable();

    //trigger.AddComponent( "TRIGGER_0", collider );
    var timer = new Timer(200);
    //trigger.AddComponent( "REFRESH_TIMER", timer );
    timer.Reset();

    collider.RegisterOnCollision( (_collider) => road.TurnRight() );
    collider.RegisterOnCollision( (_collider) => _collider.Disable() );
    collider.RegisterOnCollision( (_collider) => timer.Restart() );
    timer.RegisterOnClockExpired( (_timer) => collider.Enable() );

    collider.Update = function(engine) {
        if ( collider.Collision(cruiser.GetComponent("HURT_BOX")) ) {
            collider.callbackHandler.Invoke("COLLISION");
        }
    }

    trigger.RegisterOnLateUpdate( (_this) => _this.RotateAbout(0, 0, 0, worldSpeed, 0, 0) );
    //engine.CreateInstance( trigger );

    var startTimer = new GameObject();
    var timer = new Timer(200);
    //startTimer.AddComponent("START_TIMER", timer );
    timer.RegisterOnClockExpired( (_timer) => collider.Enable() );
    timer.RegisterOnClockExpired( (_timer) => _timer.Destroy(engine) );
    //engine.CreateInstance( startTimer );

    //Despawner---------------------------------------------------------------------------------------------------------

    var despawner = new GameObject(engine, new Transform(0, 0, worldRadius));
    despawner.AddComponent("DESPAWN_BOX", new BoxCollider(roadWidth * 4, 10, roadWidth));
    engine.CreateInstance(despawner);

    //Spawner-----------------------------------------------------------------------------------------------------------

    //create the entity spawning unit
    //var spawn = new GameObject(engine, new Transform(0, 0, -worldRadius),
    //    new CruiserRender(cruiserWidth, cruiserHeight, cruiserDepth));
    //engine.CreateInstance(spawn);

    //spawn.AddComponent("DESPAWN_BOX", new BoxCollider(300, 300, 300, new Transform(0, 0, 0)));
    //spawn.GetComponent("DESPAWN_BOX").RegisterOnCollision( (_this) => _this.Destroy(engine) );
    //spawn.RegisterOnLateUpdate( (_spawn) => _spawn.RotateAbout(0, 0, 0, worldSpeed, 0, 0) );

    //spawn.Update = function(engine) {
        //if (this.GetComponent("DESPAWN_BOX").Collision(despawner.GetComponent("DESPAWN_BOX"))) {
        //    this.callbackHandler.Invoke("ON_COLLISION");
        //}

        //this.RotateAbout(0, 0, 0, worldSpeed, 0, 0);
    //}

    //console.log(spawn);


    var spawner = new Spawner(engine, new Transform(0, 0, -worldRadius), new BoxColliderRender(100, 100, 100));

    spawner.ObjectSpawn = function(i) {

        var models = [new GooseNewRender(), new RoadBlockRender()];

        var render = models[GetRandomInt(0, models.length - 1)];

        var empty = new GameObject(engine,
            new Transform(-laneWidth + (i * laneWidth), 0, -worldRadius - 20),
            render);
        var despawnBox = new BoxCollider(laneWidth, laneWidth, laneWidth);
        var hitBox = new BoxCollider(laneWidth, laneWidth, laneWidth);

        despawnBox.RegisterOnCollision( (_this) => empty.Destroy(engine) );

        hitBox.RegisterOnCollision( (_this) => cruiser.TakeDamage(engine) );
        hitBox.RegisterOnCollision( (_this) => empty.Destroy(engine) );

        empty.AddComponent("DESPAWN_BOX", despawnBox);
        empty.AddComponent("HIT_BOX", hitBox);

        empty.RegisterOnLateUpdate( (_this) => _this.RotateAbout(0, 0, 0, worldSpeed, 0, 0) );

        empty.Update = function() {
            if (empty.GetComponent("DESPAWN_BOX").Collision(despawner.GetComponent("DESPAWN_BOX"))) {
                empty.GetComponent("DESPAWN_BOX").callbackHandler.Invoke("COLLISION");
            }

            if (empty.GetComponent("HIT_BOX").Collision(cruiser.GetComponent("HURT_BOX"))) {
                empty.GetComponent("HIT_BOX").callbackHandler.Invoke("COLLISION");
            }
        }
        engine.CreateInstance(empty);
    }

    spawner.Spawn = function(engine, code) {
        for (var i = 0; i < code.length; i++) {
            if (code[i] == 0) { continue; }
            else { this.ObjectSpawn(i); }
        }
    }

    engine.CreateInstance(spawner);

    var spawnController = engine.GetController("SPAWN_CONTROLLER");
    spawnController.RegisterOnGenerated( (_this) => spawner.UseCode(engine, _this.spawnCode) );

    var buildingSpawner = new Spawner(engine, new Transform(0, 0, -worldRadius), new BoxColliderRender(100, 100, 100));
    buildingSpawner.Spawn = function (engine) {
      var side = GetRandomInt(0,1);
      if (side == 0) {
        side = -1;
      }
      var building = new Building(engine, new Transform(side * roadWidth * 2, 0, -worldRadius));

      building.Init = function() {
        building.AddComponent("DESPAWN_BOX", new BoxCollider(100, 100, 100));
        building.GetComponent("DESPAWN_BOX").RegisterOnCollision( (_this) => building.Destroy(engine) );
      }

      building.Update = function() {
          if (building.GetComponent("DESPAWN_BOX").Collision(despawner.GetComponent("DESPAWN_BOX"))) {
              building.GetComponent("DESPAWN_BOX").callbackHandler.Invoke("COLLISION");
          }
      }

      building.RegisterOnLateUpdate( ( _this ) => building.RotateAbout(0, 0, 0, worldSpeed, 0, 0));
      engine.CreateInstance(building);

    }
    var buildingSpawnController = engine.GetController("BUILDINGSPAWN_CONTROLLER");
    buildingSpawnController.RegisterOnGenerated( (_this) => buildingSpawner.Spawn(engine) );

    //var cloud = new Cloud(engine, new Transform(0, 1000, -worldRadius), new CloudRender(), new Timer(2000));
    //cloud.Update = function(engine) {
    //    cloud.RotateAbout(0, 1000, -worldRadius, 0, 0, worldSpeed);
    //}

    var rain = new Rain(engine, new Transform(0, worldRadius * 2, 0), new RainRender(), new Timer(20));
    rain.dim = worldRadius / 4;

    var rainSpawner = new ParticleSystem(engine, DefaultTransform(), new GameObjectRender(), rain, new Timer(1));
    rainSpawner.particle = rain;

    engine.CreateInstance(rainSpawner);

    var sky = new Sky(engine, new Transform(0, 0, 0), new SkyRender(worldRadius * 3));
    sky.SetSpeed(DegreesToRadians(worldSpeed / 8));
    engine.CreateInstance(sky);

    THREEx.FullScreen.bindKey({ charCode : 'l'.charCodeAt(0)}); // Credit: Leo

//----------------------------------------------------------------------------------------------------------------------

    loop();
}

function CreateScene() {

    HEIGHT = window.innerHeight - 20;
    WIDTH = window.innerWidth - 20;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 50;
    nearPlane = .1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );

    //DEBUG MODE

    camera.position.x = 0;
    camera.position.y = 2000 * 2;
    camera.position.z = 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //game position
    camera.position.x = 0;
    camera.position.y = 1300;
    camera.position.z = 300;
    camera.lookAt(new THREE.Vector3(0, 0, -1500));

    gui = DebugGUI();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(COLORS.black);

    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

function CreateStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';
}

function CreateLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

  ambientLight = new THREE.AmbientLight(0xdc8874, .5);

  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 4096;
  shadowLight.shadow.mapSize.height = 4096;

  //var ch = new THREE.CameraHelper(shadowLight.shadow.camera);

  // scene.add(ch);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
  // scene.add(ambientLight);
}
function ShowStats() { document.body.appendChild(stats.domElement); }
function HideStats() { document.body.removeChild(stats.domElement); }

function ShowBeginGameMenu(show) { beginGameMenu.className = show ? "show" : ""; }
function ShowGameOverMenu(show) { gameOverMenu.className = show ? "show" : ""; }
function loop() { //game loop, game engine updates which updates scene
  if (gameInProgress) {
    engine.Update();
  }
    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(loop);
}
function handleKeyDown(keyEvent) {
  if (gameInProgress) {
    ShowBeginGameMenu(false);
    ShowGameOverMenu(false);
  }

  if (keyEvent.keyCode === 32) { //space
    ShowGameOverMenu(false);
    gameInProgress = true;
  }
  /*
  else if (keyEvent.keyCode === 188) { // Just for testing GameOverMenu
    ShowBeginGameMenu(false);
    ShowGameOverMenu(true);
    gameInProgress = false;
  } else if (keyEvent.keyCode === 37) { //Left
    // world.TurnLeft();
    road.TurnLeft();
    oppositeRoad.TurnLeft();
  } else if (keyEvent.keyCode === 39) { //right
    // world.TurnRight();
    road.TurnRight();
    oppositeRoad.TurnRight();
  }*/
}
function handleWindowResize() {
  HEIGHT = window.innerHeight - 20;
  WIDTH = window.innerWidth - 20;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

window.addEventListener('load', init, false);
window.addEventListener('resize', handleWindowResize, false);
document.onkeydown = handleKeyDown;
