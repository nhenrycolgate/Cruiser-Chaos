function Building(engine, transform = DefaultTransform(), render = new BuildingRender()) {

    GameObject.call(this, engine, transform, render, "BUILDING");

    this.Init = function() {
    }

    this.Update = function() {
    }

}

function BuildingRender() {
	Render.call(this);

	this.Init = function() {
		this.mesh.name = "BUILDING";


		var bodyHeight = 500;
		var bodyWidth = bodyHeight/1.5;
		var bodyDepth = bodyWidth ;

		var properties= Object.keys(COLORS);
		var bodyColor= eval("COLORS." + properties[Math.floor(RandomNumberBtwn(0,properties.length))]);
		// console.log(bodyColor);

		var bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth, 1, 1, 1);
		var bodyMaterial = new THREE.MeshLambertMaterial({color: bodyColor});
		var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
		this.mesh.add(body);

		var roofHeight= bodyHeight/2;
		var roofGeometry=  new THREE.CylinderGeometry(bodyWidth/10,bodyDepth,bodyDepth,4);
		var roofMaterial= new THREE.MeshLambertMaterial({color: bodyColor});
		var roof= new THREE.Mesh(roofGeometry,roofMaterial);
		roof.position.set(0,bodyHeight/2+roofHeight/2,0);
		roof.rotateY(DegreesToRadians(45));


		//this.mesh.add(body);
		this.mesh.add(roof);
	}
}
