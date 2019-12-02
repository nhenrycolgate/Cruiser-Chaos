function Roadblock(engine,transform,render){
	
	GameObject.call(this, engine, transform, render, "Roadblock");

    this.Update = function(engine) {

    }

    this.Init = function() {
       
    }
	this.Destroy = function(){
		
	}
	
	
	
}

//model for roadblock
function RoadblockRender(){	
	this.mesh= new THREE.Object3D();
	this.mesh.name= "Roadblock";
	
	var support1geometry= new THREE.CubeGeometry(40,8,20);
	var support1material=  new THREE.MeshLambertMaterial(( { color:0xaeb5b8 } ));
	var support1= new THREE.Mesh(support1geometry,support1material );
	support1.position.set(0,4,0);
	this.mesh.add(support1);

	var support2geometry= new THREE.CubeGeometry(40,8,20);
	var support2material=  new THREE.MeshLambertMaterial(( { color:0xaeb5b8} ));
	var support2= new THREE.Mesh(support1geometry,support1material );
	support2.position.set(0,4,-100);
	this.mesh.add(support2);
	
	var leg1geometry = new THREE.CylinderGeometry( 5,5 ,40, 10 );
	var leg1material = new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
	var leg1 = new THREE.Mesh( leg1geometry, leg1material );
	leg1.position.set(0,24,0);
	this.mesh.add(leg1 );

	var leg2geometry = new THREE.CylinderGeometry( 5,5 ,40, 10 );
	var leg2material = new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
	var leg2 = new THREE.Mesh( leg2geometry, leg2material);
	leg2.position.set(0,24,-100);
	this.mesh.add(leg2);
	
	var signgeometry1 = new THREE.CubeGeometry(20,20,65);
	var signmaterial1 =  new THREE.MeshLambertMaterial(( { color:0xff0000} ));
	var sign1 = new THREE.Mesh(signgeometry1,signmaterial1);
	sign1.position.set(0,54,-82.5);
	this.mesh.add(sign1);
	
	var signgeometry2 = new THREE.CubeGeometry( 20,20,65);
	var signmaterial2 =  new THREE.MeshLambertMaterial(( { color:0xff0000} ));
	var sign2 = new THREE.Mesh(signgeometry2,signmaterial2);
	sign2.position.set(0,54,-17.5);
	this.mesh.add(sign2);
}