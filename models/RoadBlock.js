function RoadBlock(engine,transform,render){
	
	GameObject.call(this, engine, transform, render, "Roadblock");

    this.Update = function(engine) {
		/*if (collision){
			render.sign1.rotation.y-= DegreesToRadians(5);
			render.sign2.rotation.y+= DegreesToRadians(5);
			
			render.sign1.position.x+= RandomNumberBtwn(-2,-1);
			render.sign1.position.y+= RandomNumberBtwn(-2,-1);
			render.sign2.position.x+= RandomNumberBtwn(-2,-1);
			render.sign2.position.y+= RandomNumberBtwn(-2,-1);
			
			
			//console.log(render.sign1.rotation.y);
			
		} */
    }

    this.Init = function() {
		//TODO: create collisionbox
		
		var collisionX= 100;
		var collisionY= 80;
		var collisionZ= 120;
		
		this.collisionBox= new CollisionBox(transform,collisionX,collisionY,collisionZ,[0,0,0]);
		
		//collisionbox drawn out for debugging
		var geometry = new THREE.CubeGeometry(collisionX,30,collisionZ);
		var colors= [0xffffff,0x000000];
		var material = new THREE.MeshLambertMaterial({color: colors[Math.round(Math.random())], wireframe: true});
		var obj = new THREE.Mesh(geometry,material);
		render.mesh.add(obj);
    }
	this.Destroy = function(){
		
	}
	
	
	
}

//model for roadblock
function RoadBlockRender(){

    Render.call(this);

    this.Init = function() {

        this.mesh.name= "Roadblock";

        this.height = 20;

        /////////////////
        var legHeight = 40;
        var leg1geometry = new THREE.CylinderGeometry( 5,5 ,legHeight, 10 );
        var leg1material = new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
        var leg1 = new THREE.Mesh( leg1geometry, leg1material );
        leg1.position.set(0,0,50);
        this.mesh.add(leg1 );

        var leg2geometry = new THREE.CylinderGeometry( 5,5 ,legHeight, 10 );
        var leg2material = new THREE.MeshLambertMaterial( {color: 0xaeb5b8} );
        var leg2 = new THREE.Mesh( leg2geometry, leg2material);
        leg2.position.set(0,0,-50);
        this.mesh.add(leg2);
        ////////////////////
        var supportHeight=8;
        var supportPosY= 0-(legHeight/2);

        var support1geometry= new THREE.CubeGeometry(40,supportHeight,20);
        var support1material=  new THREE.MeshLambertMaterial(( { color:0xaeb5b8 } ));
        var support1= new THREE.Mesh(support1geometry,support1material );
        support1.position.set(0,supportPosY-(supportHeight/2),50);
        this.mesh.add(support1);

        var support2geometry= new THREE.CubeGeometry(40,supportHeight,20);
        var support2material=  new THREE.MeshLambertMaterial(( { color:0xaeb5b8} ));
        var support2= new THREE.Mesh(support1geometry,support1material );
        support2.position.set(0,supportPosY-(supportHeight/2),-50);
        this.mesh.add(support2);
        ////////////////////
        var signHeight=20;
        var signZSize=65;
        var signPosY= 0+(legHeight/2)+(signHeight/2);
        var zDist= (leg1.position.z-(signZSize/2))-(leg2.position.z+(signZSize/2));
        var signPosZ= leg1.position.z-(zDist/2);




        var signgeometry1 = new THREE.CubeGeometry(20,signHeight,signZSize);
        var signmaterial1 =  new THREE.MeshLambertMaterial(( { color:0xff0000} ));
        this.sign1 = new THREE.Mesh(signgeometry1,signmaterial1);
        this.sign1.position.set(0,signPosY,signPosZ);
        this.mesh.add(this.sign1);

        var signgeometry2 = new THREE.CubeGeometry( 20,signHeight,signZSize);
        var signmaterial2 =  new THREE.MeshLambertMaterial(( { color:0xff0000} ));
        this.sign2 = new THREE.Mesh(signgeometry2,signmaterial2);
        this.sign2.position.set(0,signPosY,-signPosZ);
        this.mesh.add(this.sign2);

        this.mesh.rotation.y+=DegreesToRadians(90);
        this.mesh.scale.set(0.5, 0.5, 0.5);
	}
}
