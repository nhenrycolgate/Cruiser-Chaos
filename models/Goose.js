function Goose(engine,transform,render){	

	GameObject.call(this, engine, transform, render, "Goose");
		
    this.Update = function(engine) {
		/*if (collision){  //everything dissapears and just shows particles where body used to be 
			var mesh= render.mesh;
			
			//clear everything in mesh
			for (var i = mesh.children.length - 1; i >= 0; i--) {
				mesh.remove(mesh.children[i]);
			}
			
			//display particles
			for (var i=0;i<particles.length;i=i+1){
				mesh.add(particles[i]);
			}
		}*/
    }

    this.Init = function() {
		var bodyPos= [render.body.position.x,render.body.position.y,render.body.position.z];
		var bodyRadius= render.bodyRadius;
		
		this.particles= [];
		for (var i=0;i<200;i=i+1){
			var coords= GetPointOnSphere(bodyPos,bodyRadius);
			var ptcl= new ParticleRender(coords,0xffffff);
			this.particles.push(ptcl.particle);
		}
    }
	
	this.Destroy = function(){
		
	}
	
}

function GooseRender(){
	this.mesh= new THREE.Object3D();
	this.mesh.name= "Goose";
	
	this.lowerbody= new THREE.Object3D();
		
	var footgeometry1 = new THREE.CylinderGeometry(8, 8, 5, 3, 3)
	var footmaterial1 = new THREE.MeshLambertMaterial({color: 0xe08c1d});
	var foot1 = new THREE.Mesh(footgeometry1, footmaterial1);
	foot1.position.set(-10,2.5,0);
	this.lowerbody.add(foot1);
	
	var footgeometry2 = new THREE.CylinderGeometry(8, 8, 5, 3, 3)
	var footmaterial2 = new THREE.MeshLambertMaterial({color: 0xe08c1d});
	var foot2 = new THREE.Mesh(footgeometry2, footmaterial2);
	foot2.position.set(10,2.5,0);
	this.lowerbody.add(foot2);
	
	var legLength= 15;
	
	var leg1geometry = new THREE.CylinderGeometry( 2,2 ,legLength, 10 );
	var leg1material = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
	var leg1 = new THREE.Mesh( leg1geometry, leg1material );
	leg1.position.set(-10,10,0);
	this.lowerbody.add(leg1);
	
	var leg2geometry = new THREE.CylinderGeometry( 2,2,legLength, 10 );
	var leg2material = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
	var leg2 = new THREE.Mesh( leg2geometry, leg2material);
	leg2.position.set(10,10,0);
	this.lowerbody.add(leg2);
	
	this.bodyRadius= 15;
	var bodygeometry= new THREE.SphereGeometry(this.bodyRadius);
	var bodymaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8 , wireframe:false} );
	this.body= new THREE.Mesh( bodygeometry, bodymaterial);
	this.body.position.set(0,25,0); 
	this.lowerbody.add(this.body);
	
	var winggeometry1 = new THREE.CylinderGeometry(10, 10, 5, 3, 3)
	var wingmaterial1 = new THREE.MeshLambertMaterial({color: 0x000000});
	var wing1 = new THREE.Mesh(winggeometry1, wingmaterial1);
	wing1.position.set(-12,32,0);
	wing1.rotation.x= Math.PI/2;
	wing1.rotation.y=-Math.PI/2;
	wing1.rotation.z=Math.PI/2;
	this.lowerbody.add(wing1);
	
	var winggeometry2 = new THREE.CylinderGeometry(10, 10, 5, 3, 3)
	var wingmaterial2 = new THREE.MeshLambertMaterial({color: 0x000000});
	var wing2 = new THREE.Mesh(winggeometry2, wingmaterial2);
	wing2.position.set(12,32,0);
	wing2.rotation.x= Math.PI/2;
	wing2.rotation.y= Math.PI/2;
	wing2.rotation.z=Math.PI/2;
	this.lowerbody.add(wing2);
	
	
	this.upperbody= new THREE.Object3D();
	
	var neckLength=20;
	var neckgeometry= new THREE.CylinderGeometry(3,3,neckLength,10);
	var neckmaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
	var neck= new THREE.Mesh( neckgeometry, neckmaterial);
	neck.position.set(0,42.5,0);
	this.upperbody.add(neck);
	
	var headgeometry= new THREE.SphereGeometry(8);
	var headmaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
	var head= new THREE.Mesh(headgeometry,headmaterial);
	head.position.set(0,56.5,0);
	this.upperbody.add(head);
	
	var beakgeometry = new THREE.CylinderGeometry(1, 3, 10 );
	var beakmaterial=  new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
	var beak= new THREE.Mesh(beakgeometry,beakmaterial);
	beak.position.set(0,55,10)
	beak.rotation.x = Math.PI/2;
	this.upperbody.add(beak);
	
	this.upperbody.rotation.x= Math.PI/9;
	
	
	
	this.mesh.add(this.lowerbody);
	this.mesh.add(this.upperbody);
}
