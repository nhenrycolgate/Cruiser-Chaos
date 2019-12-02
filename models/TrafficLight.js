function TrafficLight(engine,transform,render){	

	GameObject.call(this, engine, transform, render, "TrafficLight");
	
    this.Update = function(engine) {
		//this.signal.material.color= 0x000000;
    }

    this.Init = function() {
       this.signal= render.signal;
    }
	this.Destroy = function(){
		
	}
	
}

function TrafficLightRender(){
	this.mesh= new THREE.Object3D();
	this.mesh.name= "Traffic Light";
	
	var supportradius=10;
	var supportheight=10;
	var supportgeometry = new THREE.CylinderGeometry( supportradius,supportradius, supportheight, 32 );
	var supportmaterial = new THREE.MeshLambertMaterial( {color: 0x000000} );
	var support = new THREE.Mesh(supportgeometry, supportmaterial );
	support.position.set(0,5,0);
	this.mesh.add(support);
	
	var poleheight= 50;
	var polegeometry= new THREE.CylinderGeometry( 4,4, poleheight, 32 ); 
	var polematerial= new THREE.MeshLambertMaterial( {color: 0x000000} );
	var pole= new THREE.Mesh(polegeometry, polematerial );
	pole.position.set(0,supportheight+poleheight/2,0);
	this.mesh.add(pole);
	
	var boxsize=15;
	var boxheight=boxsize*2;
	var boxgeometry= new THREE.CubeGeometry(boxsize,boxheight,boxsize);
	var boxmaterial= new THREE.MeshLambertMaterial(( { color:0xaeb5b8 } ));
	var box= new THREE.Mesh(boxgeometry, boxmaterial );
	box.position.set(0,supportheight+poleheight+(boxheight/2),0);
	this.mesh.add(box);
	
	var signalgeometry= new THREE.CubeGeometry( boxsize+1, boxheight/2, boxsize+1); 
	var signalmaterial= new THREE.MeshLambertMaterial(( { color:0xff3602} ));
	this.signal= new THREE.Mesh(signalgeometry, signalmaterial );
	this.signal.position.set(0,supportheight+poleheight+(boxheight/2),0);
	
	this.mesh.add(this.signal);
}
