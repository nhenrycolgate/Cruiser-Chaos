function Sky(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "Sky");

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }

    this.Update = function() {
        this.render.mesh.rotation.z += this.speed;
    }


}

function SkyRender() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "SKY";

    var lightGeometry = new THREE.OctahedronGeometry( 10 , 3 );
    var lightMaterial = new THREE.MeshLambertMaterial( {color: COLORS.red} );
    var light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.x = 200;

    this.mesh.add(light);

}