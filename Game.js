var engine,
    scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,

    gui,
    stats,

    renderer,
    container,
    controls;
var timer;

var world, road, oppositeRoad;

var gameInProgress = true; // Link to completing objectives

var HEIGHT, WIDTH;

var ambientLight, hemisphereLight, shadowLight;

var worldRadius = 1000;
var roadRadius = worldRadius + 5;
var roadWidth = 210;
var worldSpeed = 0.6;

function handleWindowResize() {
  HEIGHT = window.innerHeight-20;
  WIDTH = window.innerWidth-20;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function init(event) {

    beginGameMenu = document.getElementById("beginGameMenu");
    gameOverMenu = document.getElementById("gameOverMenu");

    CreateScene();
    CreateLights();
    CreateStats();
    //Variable Initialization//

    engine = new Engine(scene);
    engine.AddController(new CameraController(camera, 1000));
    engine.AddController(new DebugGUIController(gui, ShowStats, HideStats));

    //------------------------------------------------------------------------------------------------------------------

/*
    var emptyGameObject = new GameObject(engine, new Transform(0, 0, 0), new GameObjectRender());
    emptyGameObject.AddComponent("PRINT_TIMER", new Timer(30));
    var timer = emptyGameObject.GetComponent("PRINT_TIMER");
    timer.Enable();
    timer.RegisterOnClockExpired( () => console.log("This should loop!") );
    timer.RegisterOnClockExpired( (_timer) => _timer.Restart() );

    emptyGameObject.AddComponent("OTHER_TIMER", new Timer(30));
    var timer = emptyGameObject.GetComponent("OTHER_TIMER");
    timer.Enable();
    timer.RegisterOnClockExpired( () => console.log("This should also loop!") );
    timer.RegisterOnClockExpired( (_timer) => _timer.Restart() );
    //engine.CreateInstance(emptyGameObject);

    var spawner = new Spawner(engine, DefaultTransform(), new GameObjectRender(), new GameObjectRender(), new Timer(30));
    engine.CreateInstance(spawner);
*/
    world = new RollingWorld(engine, new Transform(0, 0, 0), new RollingWorldRender(worldRadius));
    world.SetSpeed(DegreesToRadians(worldSpeed));
    engine.CreateInstance(world);

    road = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, false));
    road.SetSpeed(DegreesToRadians(worldSpeed));
    engine.CreateInstance(road);

    oppositeRoad = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, true));
    oppositeRoad.SetSpeed(DegreesToRadians(worldSpeed));
    engine.CreateInstance(oppositeRoad);

    var cruiser = new Cruiser(engine, new Transform(0, worldRadius+50, 0), new CruiserRender(), new Timer(30));
    cruiser.SetSpeed(DegreesToRadians(1));

    cruiser.RegisterOnHit( (_cruiser) =>  _cruiser.GetComponent("INV_TIMER").Restart() );
    cruiser.RegisterOnHit( (_cruiser) =>  _cruiser.GetComponent("HURT_BOX").Disable() );

    cruiser.RegisterOnDeath( (_cruiser) =>  _cruiser.Destroy(engine) );
    engine.CreateInstance(cruiser);

    var empty = new GameObject();
    empty.AddComponent("TIMER", new Timer(200));
    empty.GetComponent("TIMER").RegisterOnClockExpired( (_timer) => cruiser.TakeDamage(engine) );
    empty.GetComponent("TIMER").RegisterOnClockExpired( (_timer) => _timer.Restart() );
    engine.CreateInstance(empty);

    var particle = new Particle(engine, DefaultTransform(), new ParticleRender(), new Timer(20));
    var particleSystem = new ParticleSystem(engine, DefaultTransform(), new GameObjectRender(), particle, new Timer(1));
    // engine.CreateInstance(particleSystem);

    //var emptyGameObject = new GameObject(engine, DefaultTransform(), new GameObjectRender());
    //emptyGameObject.RegisterOnLateUpdate( (_obj) => _obj.transform.UpdatePosition(5, 0, 0) );
    //emptyGameObject.AddComponent("BOX_COLLIDER", new BoxCollider(100, 100, 100) );
    //emptyGameObject.GetComponent("BOX_COLLIDER").RegisterOnCollision( (_collider) => emptyGameObject.Destroy(engine) );
    //engine.CreateInstance(emptyGameObject);

    //var target = new GameObject(engine, new Transform(1000, 0, 0), new GameObjectRender());
    //target.RegisterOnLateUpdate( (_obj) => _obj.transform.UpdatePosition(-1, 0, 0) );
    //target.AddComponent("BOX_COLLIDER", new BoxCollider(100, 100, 100, new Transform(+100, -100, 0)) );
    //engine.CreateInstance(target);

    //var spawn = new GameObject(engine, new Transform(10, 10, 10), new GameObjectRender());
    //var spawner = new Spawner(engine, DefaultTransform(), new GameObjectRender(), spawn, new Timer(30));
    //engine.CreateInstance(spawner);

    var sky = new Sky(engine, new Transform(0, 0, 0), new SkyRender(worldRadius*3));
    sky.SetSpeed(DegreesToRadians(worldSpeed/8));
    engine.CreateInstance(sky);

    THREEx.FullScreen.bindKey({ charCode : 'l'.charCodeAt(0)}); // Credit: Leo
    loop();
}

function CreateScene() {

    HEIGHT = window.innerHeight-20;
    WIDTH = window.innerWidth-20;

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

    window.addEventListener('resize', handleWindowResize, false);
}

function CreateStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';
}

function ShowStats() {
  document.body.appendChild(stats.domElement);
}

function HideStats() {
  document.body.removeChild(stats.domElement);
}

function CreateLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);

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

  var ch = new THREE.CameraHelper(shadowLight.shadow.camera);

  // scene.add(ch);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
  // scene.add(ambientLight);

}

function ShowBeginGameMenu(show) {
  beginGameMenu.className = show ? "show" : "";
  // cruiser.
}

function ShowGameOverMenu(show) {
  gameOverMenu.className = show ? "show" : "";
}

function loop() { //game loop, game engine updates which updates scene
  if (gameInProgress) {
    engine.Update();
  }
    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(loop);
}

window.addEventListener('load', init, false);

function handleKeyDown(keyEvent) {
  if (gameInProgress) {
    ShowBeginGameMenu(false);
    ShowGameOverMenu(false);
  }

  if (keyEvent.keyCode === 32) { //space
    ShowGameOverMenu(false);
    gameInProgress = true;
  } else if (keyEvent.keyCode === 188) { // Just for testing GameOverMenu
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
  }
}

document.onkeydown = handleKeyDown;
