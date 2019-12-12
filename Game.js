var engine,
    scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,

    debugGUI,
    stats,

    renderer,
    container,
    controls;
var timer;

var world, road, cruiser, sky;

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

    CreateScene();
    CreateLights();
    CreateStats();

    //Variable Initialization//

    engine = new Engine(scene);
    engine.AddController(new CameraController(camera, 1000));

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

    var particle = new Particle(engine, DefaultTransform(), new ParticleRender(), new Timer(200));
    var particleSystem = new ParticleSystem(engine, DefaultTransform(), new GameObjectRender(), particle, new Timer(10));

    engine.CreateInstance(particleSystem);

    //var character = new Character(engine, new Transform(0, 0, 0), new CharacterRender());
    //engine.CreateInstance(character);

    //var world = new RollingWorld(engine, new Transform(0, 0, 0), new RollingWorldRender(worldRadius));
    //world.SetSpeed(DegreesToRadians(1));
    //engine.CreateInstance(world);

    world = new RollingWorld(engine, new Transform(0, 0, 0), new RollingWorldRender(worldRadius));
    //world.SetSpeed(DegreesToRadians(1));
    //engine.CreateInstance(world);

    //road = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, false));
    //road.SetSpeed(DegreesToRadians(1));
    //engine.CreateInstance(road);

    //oppositeRoad = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, true));
    //oppositeRoad.SetSpeed(DegreesToRadians(1));
    //engine.CreateInstance(oppositeRoad);
    world.SetSpeed(DegreesToRadians(worldSpeed));
    //engine.CreateInstance(world);

    road = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, false));
    road.SetSpeed(DegreesToRadians(worldSpeed));
    //engine.CreateInstance(road);

    oppositeRoad = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, true));
    oppositeRoad.SetSpeed(DegreesToRadians(worldSpeed));
    //engine.CreateInstance(oppositeRoad);


    // var cruiser = new Cruiser(engine, new Transform(0, 0, 0), new CruiserRender());
    // cruiser.InitWheels();
    // cruiser.SetSpeed(DegreesToRadians(1));
    // engine.CreateInstance(cruiser);

    //var cruiser = new Cruiser(engine, new Transform(0, 0 + worldRadius + 50 / 2, 0), new CruiserRender());

    //cruiser = new Cruiser(engine, new Transform(0, worldRadius/3, worldRadius + 15), new CruiserRender());

    //cruiser.InitWheels();
    //cruiser.SetSpeed(DegreesToRadians(1));
    //engine.CreateInstance(cruiser);

    //var sky = new Sky(engine, new Transform(0, 0, 0), new SkyRender(worldRadius*3));
    //sky.SetSpeed(DegreesToRadians(2));
    //engine.CreateInstance(sky);

    sky = new Sky(engine, new Transform(0, 0, 0), new SkyRender(worldRadius*3));
    sky.SetSpeed(DegreesToRadians(worldSpeed/8));
    //engine.CreateInstance(sky);

    /*var shapeGeometry = new THREE.CubeGeometry(25, 25, 25, 1, 1, 1);
    var shapeMaterial = new THREE.MeshPhongMaterial( { color:0xff0000, transparent:true, opacity:1 } );
    var shape = new THREE.Mesh( shapeGeometry, shapeMaterial );
    shape.position.set(0, 0, 0);
    scene.add(shape);*/

    //var sphereGeometry = new THREE.OctahedronGeometry( 50, 2 );
    //var sphereMaterial = new THREE.MeshPhongMaterial( { color:0xff0000, transparent:true, opacity:1 } );


    //var rolling_world_render = new THREE.Mesh( sphereGeometry, sphereMaterial );
    //scene.add(rolling_world_render);

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
    camera.position.y = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //cameraController = new CameraController(camera, 1000);
    //cameraController.Init();

    //gui = DebugGUI();
    //debugGUIController = new DebugGUIController(gui, ShowStats, HideStats);
    //debugGUIController.Init();

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

function loop() { //game loop, game engine updates which updates scene

    engine.Update();
    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(loop);
}

window.addEventListener('load', init, false);

function handleKeyDown(keyEvent){
  if (keyEvent.keyCode === 32) { //space
    console.log("space");
  }
}

document.onkeydown = handleKeyDown;
