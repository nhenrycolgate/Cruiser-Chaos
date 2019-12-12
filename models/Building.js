function Building(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "BUILDING");

    this.Init = function() {
    }

    this.Update = function() {
    }

}

function BuildingRender() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "BUILDING";

    var bodyWidth = 20;
    var bodyHeight = 30;
    var bodyDepth = 10;
    var bodyColor = COLORS.red;

    var bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth, 1, 1, 1);
    var bodyMaterial = new THREE.MeshLambertMaterial({color: bodyColor});
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    this.mesh.add(body);
}