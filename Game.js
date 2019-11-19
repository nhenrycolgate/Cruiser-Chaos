var engine,
    scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer,
    container,
    controls;
	var timer;

var HEIGHT, WIDTH;

var ambientLight, hemisphereLight, shadowLight;

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

    //Variable Initialization//
	
    engine = new Engine();

    var world = new RollingWorld(engine, new Transform(0, 0, 0), new RollingWorldRender());
    world.SetSpeed(DegreesToRadians(1));
    engine.CreateInstance(world);

    //var cruiser = new Cruiser(engine, new Transform(0, 0, 0), new CruiserRender(), 1);
    //engine.CreateInstance(cruiser);

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
    camera.position.z = 200;
    camera.position.y = 0;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);

    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);
}

function CreateLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

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

  //scene.add(ch);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);

}

function loop() { //game loop, game engine updates which updates scene 

    engine.Update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

window.addEventListener('load', init, false);