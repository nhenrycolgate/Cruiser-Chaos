function GooseNew(engine, transform = DefaultTransform(), render = new GooseNewRender()){

	GameObject.call(this, engine, transform, render, "GOOSE_NEW");
	
	
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

function GooseNewRender(){
	Render.call(this);
	
	this.Init = function() {

		this.mesh.name = "Goose_NEW";
		
		/*this.lowerbody= new THREE.Object3D();
		this.middlebody= new THREE.Object3D();
		this.upperbody= new THREE.Object3D();*/

		this.height = 35;
		
		////////////////
		var bodySize= 25;
		var bodygeometry= new THREE.BoxGeometry(bodySize,bodySize,bodySize);
		var bodymaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8 , wireframe:false} );
		this.body= new THREE.Mesh( bodygeometry, bodymaterial);
		this.mesh.add(this.body);
		//this.middlebody.add(this.body);
		////////////////////
		var wingHeight=5;
		var wingPosY= 0+bodySize-(bodySize/1.5);
		var winggeometry1= new THREE.BoxGeometry(10,wingHeight,10);
		var wingmaterial1 = new THREE.MeshLambertMaterial({color: 0x000000});
		var wing1 = new THREE.Mesh(winggeometry1, wingmaterial1);
		wing1.position.set(-12,wingPosY,0);
		wing1.rotation.x= Math.PI/2;
		wing1.rotation.y=-Math.PI/2;
		wing1.rotation.z=Math.PI/2;
		this.mesh.add(wing1);
		
		var winggeometry2= new THREE.BoxGeometry(10,wingHeight,10);
		var wingmaterial2 = new THREE.MeshLambertMaterial({color: 0x000000});
		var wing2 = new THREE.Mesh(winggeometry2, wingmaterial2);
		wing2.position.set(12,wingPosY,0);
		wing2.rotation.x= Math.PI/2;
		wing2.rotation.y= Math.PI/2;
		wing2.rotation.z=Math.PI/2;
		
		this.mesh.add(wing2);
		////////////////////////
		var legLength= 15;
		var legPosY= 0-(bodySize);
		
		var leg1geometry= new THREE.BoxGeometry(4,legLength,4);
		//var leg1geometry = new THREE.CylinderGeometry( 2,2 ,legLength, 10 );
		var leg1material = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var leg1 = new THREE.Mesh( leg1geometry, leg1material );
		leg1.position.set(-10,legPosY,0);
		this.mesh.add(leg1);
		
		var leg2geometry= new THREE.BoxGeometry(4,legLength,4);
		var leg2material = new THREE.MeshLambertMaterial( {color: 0xe08c1d} );
		var leg2 = new THREE.Mesh( leg2geometry, leg2material);
		leg2.position.set(10,legPosY,0);
		this.mesh.add(leg2);
		
		/////////////////////
		var footHeight=5;
		var footPosY= legPosY-(legLength/2)-(footHeight/2);
		var footgeometry1 = new THREE.BoxGeometry(8, 5, 8, 3, 3)
		var footmaterial1 = new THREE.MeshLambertMaterial({color: 0xe08c1d});
		var foot1 = new THREE.Mesh(footgeometry1, footmaterial1);
		foot1.position.set(-10,footPosY,0);
		this.mesh.add(foot1);
		
		var footgeometry2= new THREE.BoxGeometry(8,5,8);
		//var footgeometry2 = new THREE.CylinderGeometry(8, 8, 5, 3, 3)
		var footmaterial2 = new THREE.MeshLambertMaterial({color: 0xe08c1d});
		var foot2 = new THREE.Mesh(footgeometry2, footmaterial2);
		foot2.position.set(10,footPosY,0);
		this.mesh.add(foot2);
		
		//////////////////////
		var neckHeight=20;
		var neckPosY= 0+(bodySize/2)+(neckHeight/2);
		var neckgeometry= new THREE.BoxGeometry(5,neckHeight,5);
		var neckmaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8 , wireframe:false} );
		var neck = new THREE.Mesh(neckgeometry, neckmaterial);
		neck.position.set(0,neckPosY,0);
		this.mesh.add(neck);
		
		/////////////////////
		var headSize= 10;
		var headPosY= neckPosY+(neckHeight/2)+(headSize/2);
		var headgeometry= new THREE.BoxGeometry(headSize,headSize,headSize);
		var headmaterial= new THREE.MeshLambertMaterial( {color: 0xaeb5b8 , wireframe:false} );
		var head= new THREE.Mesh(headgeometry, headmaterial);
		head.position.set(0,headPosY,0);
		this.mesh.add(head);
		
		////////////////////
		var beakSize= headSize/2;
		var beakPosY= headPosY;
		var beakgeometry= new THREE.BoxGeometry(beakSize,beakSize,beakSize);
		var beakmaterial= new THREE.MeshLambertMaterial({color: 0xe08c1d});
		var beak= new THREE.Mesh(beakgeometry, beakmaterial);
		beak.position.set(0,beakPosY,(headSize/2)+(beakSize/2));
		this.mesh.add(beak);
	}
}
