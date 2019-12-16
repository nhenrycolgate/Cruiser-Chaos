function PowerUpC(engine, transform = DefaultTransform(), render = new PowerUpCRender()){

	GameObject.call(this, engine, transform, render, "PowerUpC");
	
	
    this.Update = function(engine) {
		
    }

    this.Init = function() {
		this.render.EarlyLoad();
	
		
		
    }
	
	this.Destroy = function(){
		
	}
	
	
	
}

function PowerUpCRender(){
	Render.call(this);
	
	this.Init = function() {
		this.mesh.name = "PowerUpC";
		
		var outer= new THREE.Mesh(); 
		
		var largePartSize=100;
		var smallPartSize= largePartSize/4;
		var middleCgeometry = new THREE.BoxGeometry(smallPartSize,largePartSize,smallPartSize);
		var middleCmaterial = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var middleC = new THREE.Mesh(middleCgeometry, middleCmaterial );
		this.mesh.add(middleC);
		outer.add(middleC);
		
		var topCPosX= (smallPartSize/2)+(largePartSize/2);
		var topCPosY= (largePartSize/2)- (smallPartSize/2);
		var topCgeometry= new THREE.BoxGeometry(largePartSize,smallPartSize,smallPartSize);
		var topCmaterial = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var topC= new THREE.Mesh(topCgeometry, topCmaterial );
		topC.position.set(topCPosX,topCPosY,0);
		outer.add(topC);
		
		var bottomCPosY= -((largePartSize/2)- (smallPartSize/2));
		var bottomCgeometry= new THREE.BoxGeometry(largePartSize,smallPartSize,smallPartSize);
		var bottomCmaterial = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var bottomC= new THREE.Mesh(topCgeometry, topCmaterial );
		bottomC.position.set(topCPosX,bottomCPosY,0);
		outer.add(bottomC);
		
		this.mesh.add(outer);
		
		var inner= new THREE.Mesh();		
	}
}