function Pothole(engine, transform = DefaultTransform(), render = new PotholeRender()){

	GameObject.call(this, engine, transform, render, "Pothole");
	
	
    this.Update = function(engine) {
		var rotationSpeed = 1;
		//if (this.transform.z<=(worldRadius)){
			this.RotateAbout(0,0,0,rotationSpeed,0,0);
		//}
		//else{
			//engine.Destroy(this);
		//}
    }

    this.Init = function() {
		this.render.EarlyLoad();
	
		//console.log(this.transform.x + " " + this.transform.y + " " + this.transform.z);
		
		//this.bodyPos = [render.mesh.middlebody.body.position.x, render.mesh.middlebody.body.position.y, render.mesh.middlebody.body.position.z];
		//this.bodyRadius= render.bodyRadius;
		
		//this.collisionX= 53;
		//this.collisionY= 100;
		//this.collisionZ= 55;
		
		/*this.collisionBox= new BoxCollider(collisionX,collisionY,collisionZ,transform);
		this.AddComponent("BOX_COLLIDER",this.collisionBox);*/
	
		
		
		/*
		var bcRender= new BoxColliderRender(collisionX,collisionY,collisionZ);
		bcRender.Init();
		this.render.mesh.add(bcRender.mesh);
		console.log(this.render.mesh);*/
		
		
    }
	
	this.Destroy = function(){
		
	}
	
	
	
}

function PotholeRender(){

	Render.call(this);
	
	this.Init = function() {
		this.mesh.name = "Pothole";
		
		var holeSize = roadRadius;
		var holegeometry= new THREE.CylinderGeometry(holeSize, holeSize, 10);
		var holematerial = new THREE.MeshLambertMaterial( {color: 0x6b520d} );
		var hole = new THREE.Mesh(holegeometry, holematerial );
		this.mesh.add(hole);
		
	}
}
