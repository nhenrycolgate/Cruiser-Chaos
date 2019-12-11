var engine,
    scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    cameraController,
    debugGUI,
    stats,
    renderer,
    container,
    controls;
var timer;

var world, road, cruiser, sky;

var HEIGHT, WIDTH;

var ambientLight, hemisphereLight, shadowLight;

var worldRadius = 500;
var roadRadius = worldRadius + 5;
var roadWidth = 210;

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function init(event) {

    CreateScene();
    CreateLights();
    CreateStats();

    //Variable Initialization//

    engine = new Engine();

    world = new RollingWorld(engine, new Transform(0, 0, 0), new RollingWorldRender(worldRadius));
    world.SetSpeed(DegreesToRadians(1));
    engine.CreateInstance(world);

    road = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, false));
    road.SetSpeed(DegreesToRadians(1));
    engine.CreateInstance(road);

    oppositeRoad = new Road(engine, new Transform(0, 0, 0), new RoadRender(roadRadius, roadWidth, true));
    oppositeRoad.SetSpeed(DegreesToRadians(1));
    engine.CreateInstance(oppositeRoad);


    // var cruiser = new Cruiser(engine, new Transform(0, 0, 0), new CruiserRender());
    // cruiser.InitWheels();
    // cruiser.SetSpeed(DegreesToRadians(1));
    // engine.CreateInstance(cruiser);

    cruiser = new Cruiser(engine, new Transform(0, worldRadius/3, worldRadius + 15), new CruiserRender());
    //cruiser.InitWheels();
    cruiser.SetSpeed(DegreesToRadians(1));
    engine.CreateInstance(cruiser);

    sky = new Sky(engine, new Transform(0, 0, 0), new SkyRender(worldRadius*3));
    sky.SetSpeed(DegreesToRadians(2));
    engine.CreateInstance(sky);

    /*var shapeGeometry = new THREE.CubeGeometry(25, 25, 25, 1, 1, 1);
    var shapeMaterial = new THREE.MeshPhongMaterial( { color:0xff0000, transparent:true, opacity:1 } );
    var shape = new THREE.Mesh( shapeGeometry, shapeMaterial );
    shape.position.set(0, 0, 0);
    scene.add(shape);*/

    //var sphereGeometry = new THREE.OctahedronGeometry( 50, 2 );
    //var sphereMaterial = new THREE.MeshPhongMaterial( { color:0xff0000, transparent:true, opacity:1 } );


    //var rolling_world_render = new THREE.Mesh( sphereGeometry, sphereMaterial );
    //scene.add(rolling_world_render);
    loop();
}

function CreateScene() {

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

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
    camera.position.z = 900;
    camera.position.y = 100;
    camera.lookAt(new THREE.Vector3(0, 400, 0));

    cameraController = new CameraController(camera, 1000);
    cameraController.Init();

    gui = DebugGUI();
    debugGUIController = new DebugGUIController(gui, ShowStats, HideStats);
    debugGUIController.Init();

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
