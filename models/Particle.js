function Particle(engine, transform, render, timer) {

    GameObject.call(this, engine, transform, render, "PARTICLE");
    this.timer = timer;

    this.Init = function(engine) {
        var _particles = this;

        this.AddComponent("DESPAWN_TIMER", this.timer);
        var despawnTimer = this.GetComponent("DESPAWN_TIMER");

        despawnTimer.Restart();
        despawnTimer.RegisterOnClockExpired( (_timer) => _particles.Destroy(engine) );
    }

    this.Update = function() {
        this.transform.UpdatePosition(10 * Math.random() - 5, 10 * Math.random() - 5, 10 * Math.random() - 5);
        this.render.particle.material.transparent = true;
        this.render.particle.material.opacity -= .01;
    }

    this.Copy = function(engine) {
        console.log("this.render.mesh.name = " + this.render.mesh.name);
        var renderCopy = {};
        renderCopy.mesh = this.render.mesh.clone();
        return new Particle(engine, this.transform.Copy(), new ParticleRender(), this.timer.Copy());
    }
}

function ParticleRender() {

    this.mesh = new THREE.Object3D();
    this.mesh.name = "PARTICLE";

    var particleWidth = 10;
    var particleHeight = 10;
    var particleDepth = 10;

    var particleGeometry = new THREE.BoxGeometry(particleWidth, particleHeight, particleDepth, 1, 1, 1);
    var particleMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
    particleMaterial.opacity = 1;
    this.particle = new THREE.Mesh(particleGeometry, particleMaterial);

    this.mesh.add(this.particle);

}

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
