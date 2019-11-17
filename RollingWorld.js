function RollingWorld(engine, render, transform, speed, direction, hp, enemyType) {

    this.type = "WORLD";
    this.speed = speed;

    //TODO: set up pooling system, which will destroy unloaded assets and allocate created assets.
    this.assets = [];

    GameObject.call(this, engine, render, transform, type);

    this.Update = function() {
        render.rotation.x += speed; //have the world spinning around the x axis

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

    var sphereGeometry = new THREE.SphereGeometry( worldRadius, sides, tiers);
    var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xfffafa ,shading:THREE.FlatShading} )

    var rolling_world_render = new THREE.Mesh( sphereGeometry, sphereMaterial );

    this.mesh.add(rolling_world_render);
}
