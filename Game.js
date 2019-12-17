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

    // beginGameMenu = document.getElementById("beginGameMenu");
    // gameOverMenu = document.getElementById("gameOverMenu");

    //Global Initializer

    CreateScene(); //build scene
    CreateLights(); //build lighting
    CreateStats(); //build ui stats

    //Initialize engine and engine data

    //------------------------------------------------------------------------------------------------------------------

    var worldRadius = 1000;
    var roadHeight = 5;
    var roadRadius = worldRadius + roadHeight;
    var laneRadius = roadRadius + 5;
    var laneLineWidth = 5;
    var roadWidth = 210;
    var laneWidth = roadWidth / 3;
    var worldSpeed = 0.3;
    var worldSpeedDx = 0.2;

    var wheelHeight = 5;
    var cruiserWidth = 100;
    var cruiserHeight = 50;
    var cruiserDepth = 50;

    engine = new Engine(scene);
    //engine.AddController(new CameraController(camera, 1000));
    //engine.AddController( new DebugGUIController(gui, ShowStats, HideStats));
    engine.AddController( new GameController(DegreesToRadians(worldSpeed), DegreesToRadians(worldSpeedDx)) );
    engine.AddController( new MenuController() );
    engine.AddController( new SpawnController() );
    engine.AddController( new BuildingSpawnController() );

    //------------------------------------------------------------------------------------------------------------------

    world = new RollingWorld(engine, new Transform(0, 0, 0), new RollingWorldRender(worldRadius));
    world.SetSpeed(DegreesToRadians(worldSpeed));
    engine.GetController("GAME_CONTROLLER").RegisterOnSpeedChange( () => world.SetSpeed(engine.GetController("GAME_CONTROLLER").speed) );
    engine.CreateInstance(world);

    road = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, laneRadius, laneLineWidth, false));
    road.SetSpeed(DegreesToRadians(worldSpeed));
    engine.GetController("GAME_CONTROLLER").RegisterOnSpeedChange( () => road.SetSpeed(engine.GetController("GAME_CONTROLLER").speed) );
    engine.CreateInstance(road);

    var cruiser = new Cruiser(engine,
        new Transform(0, (cruiserHeight / 2) + roadRadius + wheelHeight, 0),
        new CruiserRender(cruiserWidth, cruiserHeight, cruiserDepth));

    cruiser.SetLaneWidth(laneWidth);

    cruiser.SetSpeed(DegreesToRadians(worldSpeed));
    cruiser.RegisterOnHit( (_cruiser) =>  _cruiser.GetComponent("INV_TIMER").Restart() );
    cruiser.RegisterOnHit( (_cruiser) =>  _cruiser.GetComponent("HURT_BOX").Disable() );
    cruiser.RegisterOnDeath( (_cruiser) =>  _cruiser.Destroy(engine) );
    engine.CreateInstance(cruiser);

    //Despawner---------------------------------------------------------------------------------------------------------

    var despawner = new GameObject(engine, new Transform(0, 0, worldRadius));
    despawner.AddComponent("DESPAWN_BOX", new BoxCollider(roadWidth * 4, 10, roadWidth));
    engine.CreateInstance(despawner);

    //Spawner-----------------------------------------------------------------------------------------------------------

    var spawner = new Spawner(engine, new Transform(0, 0, -worldRadius));

    spawner.ObjectSpawn = function(i) {

        var models = [new GooseNewRender(), new RoadBlockRender()];

        var render = models[GetRandomInt(0, models.length - 1)];
        render.EarlyLoad();

        var empty = new GameObject(engine,
            new Transform(-laneWidth + (i * laneWidth), 0, -worldRadius - render.height),
            render);
        var despawnBox = new BoxCollider(10, 10, 10, DefaultTransform(), COLORS.yellow);
        var hitBox = new BoxCollider(laneWidth, laneWidth, laneWidth / 2);

        despawnBox.RegisterOnCollision( (_this) => empty.Destroy(engine) );

        hitBox.RegisterOnCollision( (_this) => cruiser.TakeDamage(engine) );
        hitBox.RegisterOnCollision( (_this) => empty.Destroy(engine) );

        empty.AddComponent("DESPAWN_BOX", despawnBox);
        empty.AddComponent("HIT_BOX", hitBox);

        empty.SetSpeed = function(speed) {
            console.log("Speed = ", speed);
            empty.speed = speed;
        }
        empty.GetSpeed = function() { return empty.speed; }
        empty.SetSpeed(worldSpeed);

        engine.GetController("GAME_CONTROLLER").RegisterOnSpeedChange( () => empty.SetSpeed(engine.GetController("GAME_CONTROLLER").getSpeed()) );
        empty.RegisterOnLateUpdate( (_this) => _this.RotateAbout(0, 0, 0, _this.GetSpeed(), 0, 0) );

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

    //------------------------------------------------------------------------------------------------------------------

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

// function ShowBeginGameMenu(show) { beginGameMenu.className = show ? "show" : ""; }
// function ShowGameOverMenu(show) { gameOverMenu.className = show ? "show" : ""; }
function loop() { //game loop, game engine updates which updates scene
  if (gameInProgress) {
    engine.Update();
  }
    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(loop);
}
function handleKeyDown(keyEvent) {
  // if (gameInProgress) {
  //   ShowBeginGameMenu(false);
  //   ShowGameOverMenu(false);
  // }
  //
  // if (keyEvent.keyCode === 32) { //space
  //   ShowGameOverMenu(false);
  //   gameInProgress = true;
  // }
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
