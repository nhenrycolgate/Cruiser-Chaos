function RollingWorld(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "WORLD");

    //TODO: set up pooling system, which will destroy unloaded assets and allocate created assets.
    this.assets = [];

    this.buildingSpawner = null;

    this.Init = function(engine) {
      if (!this.render.loaded) {
        this.render.Init();
      }
        //buildingSpawner = new Spawner(engine, new Transform(0, 0, 0), );
        this.SetSpeed(DegreesToRadians(1));

        //this.addCollider(Despawn collider)
    }

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }

    this.Update = function() {
        this.render.mesh.rotateX(this.speed);
    }

    this.Unload_assets = function() {
        //TODO: create functionality to add objects to the geometry of the rolling sphere in the far plane
    }

    this.Load_assets = function() {
        //TODO: create functionality to remove objects to the geometry of the rolling sphere in the far plane
    }
}

function RollingWorldRender(radius) {

  Render.call(this);

  this.Init = function() {

    this.mesh = new THREE.Object3D();
    this.mesh.name = "RollingWorld";

    var sphereGeometry = new THREE.OctahedronGeometry( radius, 3 );
    var sphereMaterial = new THREE.MeshLambertMaterial( { color:COLORS.green, transparent: true, opacity: 1 } );

    var world = new THREE.Mesh( sphereGeometry, sphereMaterial );

    this.mesh.add(world);
  }
}
