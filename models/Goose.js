function Goose(engine, transform = DefaultTransform(), render = new GooseRender()){

	GameObject.call(this, engine, transform, render, "GOOSE");
	
	
    this.Update = function(engine) {
		var rotationSpeed = 1;

		//if passes cruiser position 
		if (this.transform.z<=(worldRadius)){
			this.RotateAbout(0,0,0,rotationSpeed,0,0);
		}
		else{
			//engine.Destroy(this);
		}		
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

function GooseRender(){
	Render.call(this);
	
	this.Init = function() {

		this.mesh.name = "Goose";
		
		this.lowerbody= new THREE.Object3D();
		this.middlebody= new THREE.Object3D();
		this.upperbody= new THREE.Object3D();
		
		////////////////
		this.bodyRadius= 15;
		var bodygeometry= new THREE.SphereGeometry(this.bodyRadius);
		var bodymaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8 , wireframe:false} );
		this.body= new THREE.Mesh( bodygeometry, bodymaterial);
		this.middlebody.add(this.body);
		////////////////////
		var wingHeight=5;
		var wingPosY= 0+this.bodyRadius-(this.bodyRadius/1.5);
		var winggeometry1 = new THREE.CylinderGeometry(10, 10, wingHeight, 3, 3)
		var wingmaterial1 = new THREE.MeshLambertMaterial({color: 0x000000});
		var wing1 = new THREE.Mesh(winggeometry1, wingmaterial1);
		wing1.position.set(-12,wingPosY,0);
		wing1.rotation.x= Math.PI/2;
		wing1.rotation.y=-Math.PI/2;
		wing1.rotation.z=Math.PI/2;
		this.middlebody.add(wing1);
		
		var winggeometry2 = new THREE.CylinderGeometry(10, 10, wingHeight, 3, 3)
		var wingmaterial2 = new THREE.MeshLambertMaterial({color: 0x000000});
		var wing2 = new THREE.Mesh(winggeometry2, wingmaterial2);
		wing2.position.set(12,wingPosY,0);
		wing2.rotation.x= Math.PI/2;
		wing2.rotation.y= Math.PI/2;
		wing2.rotation.z=Math.PI/2;
		this.middlebody.add(wing2);
		////////////////////////
		var legLength= 15;
		var legPosY= 0-(this.bodyRadius);
		
		var leg1geometry = new THREE.CylinderGeometry( 2,2 ,legLength, 10 );
		var leg1material = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var leg1 = new THREE.Mesh( leg1geometry, leg1material );
		leg1.position.set(-10,legPosY,0);
		this.lowerbody.add(leg1);
		
		var leg2geometry = new THREE.CylinderGeometry( 2,2,legLength, 10 );
		var leg2material = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var leg2 = new THREE.Mesh( leg2geometry, leg2material);
		leg2.position.set(10,legPosY,0);
		this.lowerbody.add(leg2);
		/////////////////////
		var footHeight=5;
		var footPosY= legPosY-(legLength/2)-(footHeight/2);
		var footgeometry1 = new THREE.CylinderGeometry(8, 8, 5, 3, 3)
		var footmaterial1 = new THREE.MeshLambertMaterial({color: 0xe08c1d});
		var foot1 = new THREE.Mesh(footgeometry1, footmaterial1);
		foot1.position.set(-10,footPosY,0);
		this.lowerbody.add(foot1);
		
		var footgeometry2 = new THREE.CylinderGeometry(8, 8, 5, 3, 3)
		var footmaterial2 = new THREE.MeshLambertMaterial({color: 0xe08c1d});
		var foot2 = new THREE.Mesh(footgeometry2, footmaterial2);
		foot2.position.set(10,footPosY,0);
		this.lowerbody.add(foot2);
		//////////////////////////
		var neckLength=20;
		var neckPosY= 0+this.bodyRadius;
		var neckgeometry= new THREE.CylinderGeometry(3,3,neckLength,10);
		var neckmaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
		var neck= new THREE.Mesh( neckgeometry, neckmaterial);
		neck.position.set(0,neckPosY,0);
		this.upperbody.add(neck);
		//////////////////////////
		var headRadius=8;
		var headPosY= neckPosY+(neckLength/2)+headRadius-1;
		var headgeometry= new THREE.SphereGeometry(headRadius);
		var headmaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
		var head= new THREE.Mesh(headgeometry,headmaterial);
		head.position.set(0,headPosY,0);
		this.upperbody.add(head);
		///////////////////////////
		var beakHeight=10;
		var beakgeometry = new THREE.CylinderGeometry(1, 3, beakHeight);
		var beakmaterial=  new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var beak= new THREE.Mesh(beakgeometry,beakmaterial);
		beak.position.set(0,headPosY,10)
		beak.rotation.x = Math.PI/2;
		this.upperbody.add(beak);
		///////////////////////////
		this.upperbody.rotation.x= Math.PI/9;
		
		this.mesh.add(this.lowerbody);
		this.mesh.add(this.middlebody);
		this.mesh.add(this.upperbody);
	}
}
