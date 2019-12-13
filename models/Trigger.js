function Trigger(engine,transform,render){
	
	GameObject.call(this, engine, transform, render, "Trigger");

    this.Update = function(engine) {
		render.mesh.rotation.x+=DegreesToRadians(90);
		var vector = new THREE.Vector3();
vector.setFromMatrixPosition( render.trigger.matrixWorld );
		//console.log(render.trigger.position.x + " " + render.trigger.position.y+ " " + render.trigger.position.z);
		console.log(vector);
    }

    this.Init = function() {
		var collisionX= render.size;
		var collisionY= render.size;
		var collisionZ= render.size;
		
		this.collisionBox= new CollisionBox(transform,collisionX,collisionY,collisionZ,[0,0,0]);
		
		//collisionbox drawn out for debugging
		var geometry = new THREE.CubeGeometry(collisionX,collisionY,collisionZ);
		var colors= [0xffffff,0x000000];
		var material = new THREE.MeshLambertMaterial({color: colors[Math.round(Math.random())], wireframe: true});
		var obj = new THREE.Mesh(geometry,material);
		//render.mesh.add(obj);
		

    }
	this.Destroy = function(){
		
	}
	
	
	
}

//model for roadblock
function TriggerRender(size){	
	this.size=size;
	this.mesh= new THREE.Object3D();
	this.mesh.name= "Trigger";
	
	var triggerGeometry = new THREE.CubeGeometry(size,size,size);
	var triggerMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0});
	//triggerMaterial.opacity=0;
	this.trigger = new THREE.Mesh(triggerGeometry,triggerMaterial);
	this.trigger.position.x=50;
	this.trigger.position.y=20;
	//console.log(trigger.position.x + " " + trigger.position.y+ " " + trigger.position.z);
	this.mesh.add(this.trigger);

	console.log(this.trigger.position.x + " " + this.trigger.position.y+ " " + this.trigger.position.z);
}
