function TrafficLight(engine,transform,render){	

	GameObject.call(this, engine, transform, render, "TrafficLight");
	
    this.Update = function(engine) {
		var colors= [0x32a852,0xe62f17]  //0- green, 1- red
		render.signal.material.color.setHex(colors[Math.round(Math.random())]);
    }

    this.Init = function() {

		var collisionX= 30;
		var collisionY= 100;
		var collisionZ= 26;
		
		this.collisionBox= new BoxCollider(transform,collisionX,collisionY,collisionZ,[0,0,0]);
		
		//collisionbox drawn out for debugging
		var geometry = new THREE.CubeGeometry(collisionX,collisionY,collisionZ);
		var colors= [0xffffff,0x000000];
		var material = new THREE.MeshLambertMaterial({color: colors[Math.round(Math.random())], wireframe: true});
		var obj = new THREE.Mesh(geometry,material);
		render.mesh.add(obj);

    }
	this.Destroy = function(){
		
	}
	
}

function TrafficLightRender(){
	this.mesh= new THREE.Object3D();
	this.mesh.name= "Traffic Light";
	
	
	var poleheight = 50;
	var polegeometry = new THREE.CylinderGeometry( 4,4, poleheight, 32 );
	var polematerial = new THREE.MeshLambertMaterial( {color: 0x000000} );
	var pole = new THREE.Mesh(polegeometry, polematerial );
	this.mesh.add(pole);
	
	var supportradius = 10;
	var supportheight = 10;
	var supportPosY= 0- (poleheight / 2)-(supportheight / 2);
	var supportgeometry = new THREE.CylinderGeometry( supportradius, supportradius, supportheight, 32 );
	var supportmaterial = new THREE.MeshLambertMaterial( {color: 0x000000} );
	var support = new THREE.Mesh(supportgeometry, supportmaterial );
	support.position.set(0, supportPosY, 0);
	this.mesh.add(support);
	

	var boxsize = 15;
	var boxheight = boxsize * 2;
	var boxPosY = 0 + (poleheight / 2) + (boxheight / 2);
	var boxgeometry = new THREE.CubeGeometry(boxsize, boxheight, boxsize);
	var boxmaterial = new THREE.MeshLambertMaterial(( { color:0xaeb5b8 } ));
	var box= new THREE.Mesh(boxgeometry, boxmaterial );
	box.position.set(0, boxPosY, 0);
	this.mesh.add(box);

	var signalgeometry = new THREE.CubeGeometry( boxsize + 1, boxheight / 2, boxsize + 1);
	var signalmaterial = new THREE.MeshLambertMaterial(( { color:0xff3602} ));
	this.signal = new THREE.Mesh(signalgeometry, signalmaterial );
	this.signal.position.set(0,boxPosY,0);
	
	this.mesh.add(this.signal);
}
