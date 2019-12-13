function BoxCollider(width, height, depth, offsetTransform = DefaultTransform()) {

    Component.call(this, "BOX_COLLIDER");

    this.width = width;
    this.height = height;
    this.depth = depth;
    this.render = new BoxColliderRender(width, height, depth);
	this.offsetTransform = offsetTransform;
	this.mask = "GAME_OBJECT";

	this.GetInfo = function() {

        var info = {
			xMin: this.gameObject.transform.x + this.offsetTransform.x - (this.width / 2),
			xMax: this.gameObject.transform.x + this.offsetTransform.x + (this.width / 2),
			yMin: this.gameObject.transform.y + this.offsetTransform.y - (this.height / 2),
			yMax: this.gameObject.transform.y + this.offsetTransform.y + (this.height / 2),
			zMin: this.gameObject.transform.z - this.offsetTransform.z - (this.depth / 2),
			zMax: this.gameObject.transform.z + this.offsetTransform.z + (this.depth / 2),
		};

		return info;
    }

    this.CheckCollision = function(mask) {
       var targetGameObjects = engine.GetObjectsOfType(mask);

       for (var gameObject of targetGameObjects) {
           if (gameObject.id == this.gameObject.id) {
               continue;
           }
           var collider = gameObject.GetComponent("BOX_COLLIDER");
           if (collider != null) {
               if (this.Collision(collider)) {
                   this.callbackHandler.Invoke("COLLISION");
               }
           }
       }
    }

    this.Update = function(engine) {
        this.CheckCollision(this.mask);
    }

    this.Render = function(engine) {
        if (this.render == null) {
            return;
        }
        if (!this.inScene) {
            engine.scene.add(this.render.mesh);
            this.inScene = true;
        }
        this.render.mesh.position.x = this.gameObject.transform.x + this.offsetTransform.x;
        this.render.mesh.position.y = this.gameObject.transform.y + this.offsetTransform.y;
        this.render.mesh.position.z = this.gameObject.transform.z + this.offsetTransform.z;
    }

    this.Collision = function(otherBox) {
        return CheckCollision(this, otherBox);
    }

    this.RegisterOnCollision = function(callback) {
        this.callbackHandler.AddCallback("COLLISION", callback);
    }
}

//check to see if there is collision between two boxes
//https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection

function CheckCollision(box1, box2) {

	var box1_info = box1.GetInfo();
	var box2_info = box2.GetInfo();
	
	return 	(box1_info.xMin <= box2_info.xMax && box1_info.xMax >= box2_info.xMin) &&
			(box1_info.yMin <= box2_info.yMax && box1_info.yMax >= box2_info.yMin) &&
			(box1_info.zMin <= box2_info.zMax && box1_info.zMax >= box2_info.zMin);
}

function BoxColliderRender(width, height, depth) {

    Render.call(this);

    this.Init = function() {
        this.mesh.name = "BOX_COLLIDER";
        var geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
        var material = new THREE.MeshLambertMaterial({color:COLORS.red, transparent: true, opacity: .5, wireframe: true});
        var box = new THREE.Mesh(geometry, material);
        this.mesh.add(box);
    }
}