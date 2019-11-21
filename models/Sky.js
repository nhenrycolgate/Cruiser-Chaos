var skyColorIncrement = -0.005

function Sky(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "Sky");

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }

    this.Update = function() {
        this.render.mesh.rotation.z += this.speed;

        // make this a function of speed;
        this.render.mesh.material.opacity = getNewSkyColor(this.render.mesh.material.opacity);
    }

}

function getNewSkyColor(currentOpacity) {
  if (currentOpacity > 1 || currentOpacity < 0) skyColorIncrement *= -1;
  return currentOpacity + skyColorIncrement;
}

function SkyRender() {
    var skyGeometry = new THREE.OctahedronGeometry( 1000 , 3 );
    var skyMaterial = new THREE.MeshBasicMaterial({ color: COLORS.blue , side: THREE.BackSide, opacity: 1 });

    this.mesh = new THREE.Mesh(skyGeometry, skyMaterial);
    this.mesh.name = "SKY";


    // LIGHT
    var sunGeometry = new THREE.OctahedronGeometry( 10 , 3 );
    var sunMaterial = new THREE.MeshLambertMaterial({ color: COLORS.yellow });
    var sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.x = 100;

    var sunlight = new THREE.PointLight(COLORS.yellow, 1);
    sunlight.position.set(100, 0, 0);

    this.mesh.add(sunlight);
    this.mesh.add(sun);

    var moonGeometry = new THREE.OctahedronGeometry( 8 , 3 );
    var moonMaterial = new THREE.MeshLambertMaterial({ color: COLORS.blue });
    var moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.x = -100;

    var moonlight = new THREE.PointLight(COLORS.yellow, 1);
    moonlight.position.set(-100, 0, 0);

    this.mesh.add(moonlight);
    this.mesh.add(moon);

}
