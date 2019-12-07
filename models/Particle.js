function Particle(engine,transform,render){	

	GameObject.call(this, engine, transform, render, "Particle");
	
    this.Update = function(engine) {
		var dx= this.direction[0];
		var dy= this.direction[1];
		var dz= this.direction[2];
		
		render.particle.position.x+=dx;
		render.particle.position.y+=dy;
		render.particle.position.z+=dz;
    }

    this.Init = function() {
       
    }
	this.Destroy = function(){
		
	}
	
	this.setDirection = function(direction){
		this.direction= direction;
	}
	
}

function ParticleRender(position,color){
	this.mesh= new THREE.Object3D();
	this.mesh.name= "Particle";
	
	var particleGeometry = new THREE.SphereBufferGeometry(2 );
    var particleMaterial = new THREE.MeshLambertMaterial( { color: color } );

    this.particle = new THREE.Mesh( particleGeometry, particleMaterial );
	this.particle.position.x=position[0];
	this.particle.position.y=position[1];
	this.particle.position.z=position[2];
	
	this.mesh.add(this.particle);
}
