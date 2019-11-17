function RollingWorld(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "WORLD");

    //TODO: set up pooling system, which will destroy unloaded assets and allocate created assets.
    this.assets = [];

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }

    this.Update = function() {
        console.log("speed" + this.speed);
        render.mesh.rotation.x += this.speed; //have the world spinning around the x axis

        //should have some function call when a branched path appears that rotation the sphere by the y axis at intersects
    }

    this.Unload_assets = function() {
        //TODO: create functionality to add objects to the geometry of the rolling sphere in the far plane
    }

    this.Load_assets = function() {
        //TODO: create functionality to remove objects to the geometry of the rolling sphere in the far plane
    }
}

function RollingWorldRender() {

    this.mesh = new THREE.Object3D();
    this.mesh.name = "RollingWorld";

    var worldRadius = 100;
    var sides = 40;
    var tiers = 40;

    var sphereGeometry = new THREE.OctahedronGeometry( 50, 3 );
    var sphereMaterial = new THREE.MeshLambertMaterial( { color:0xff0000 } );

    var world = new THREE.Mesh( sphereGeometry, sphereMaterial );

    this.mesh.add(world);
}
