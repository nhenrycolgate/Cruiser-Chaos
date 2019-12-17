function Character(engine, transform = DefaultTransform(), render= new CharacterRender()) {

    GameObject.call(this, engine, transform, render, "CHARACTER");
    this.arms = []; //contains the mesh information for the character arms
    this.legs = []; //contains the mesh information for the characters legs

    this.Init = function(engine) {
        this.arms = this.render.arms;
        this.speed = DegreesToRadians(1);
    }

    this.Update = function(engine) {

        this.render.mesh.position.x += 1;

        //this.Destroy(engine);

        for (var i = 0; i < this.arms.length; i++) {
            var arm = this.arms[i];
            this.ArmUpdate(engine, arm);
        }
    }

    this.ArmUpdate = function(engine, arm) {
        arm.rotation.x += this.speed;
    }

}

function CharacterRender() {

	Render.call(this);

	this.Init = function(){
		this.mesh.name = "CHARACTER";
		this.arms = [];

		var bodyWidth = 20;
		var bodyHeight = 30;
		var bodyDepth = 10;
		var bodyColor = COLORS.red;

		var bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth, 1, 1, 1);
		var bodyMaterial = new THREE.MeshLambertMaterial({color: bodyColor});
		var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

		this.mesh.add(body);

		var shoulderWidth = 5;
		var shoulderHeight = 5;
		var shoulderDepth = 5;
		var shoulderColor = COLORS.red;

		var shoulderGeometry = new THREE.BoxGeometry(shoulderWidth, shoulderHeight, shoulderDepth, 1, 1, 1);
		var shoulderMaterial = new THREE.MeshLambertMaterial({color: shoulderColor});
		var shoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);

		shoulder.position.x = bodyWidth / 2 + shoulderWidth / 2;
		shoulder.position.y = bodyHeight / 2 - shoulderHeight / 2;

		var armWidth = 4;
		var armHeight = 5 + 15;
		var armDepth = 4;
		var armColor = COLORS.yellow;

		var armGeometry = new THREE.BoxGeometry(armWidth, armHeight, armDepth, 1, 1, 1);
		var armMaterial = new THREE.MeshLambertMaterial({color: armColor});
		var arm = new THREE.Mesh(armGeometry, armMaterial);

		arm.position.x = 0;
		arm.position.y = 0 - (shoulderHeight / 2) - (armHeight / 2);

		shoulder.add(arm);

		//right arm
		var completedArm = shoulder.clone();
		this.mesh.add(completedArm);
		this.arms.push(completedArm);

		//left arm
		var completedArm = shoulder.clone();
		completedArm.position.x -= (bodyWidth / 2 + shoulderWidth / 2) * 2;
		this.mesh.add(completedArm);
		this.arms.push(completedArm);

    var headSize = 15;
    var headColor = COLORS.yellow;

    var headGeometry = new THREE.BoxGeometry(headSize, headSize, headSize, 1, 1, 1);
		var headMaterial = new THREE.MeshLambertMaterial({color: headColor });
		var head = new THREE.Mesh(headGeometry, headMaterial);

    head.position.y = bodyHeight/2 + headSize/2;
    this.mesh.add(head);

    var legGeometry = new THREE.BoxGeometry(armWidth, armHeight, armDepth, 1, 1, 1);
    var legMaterial = new THREE.MeshLambertMaterial({color: armColor});
    var leg = new THREE.Mesh(legGeometry, legMaterial);

    //right leg
    var completedLeg = leg.clone();
    completedLeg.position.x = -bodyWidth/2 + armWidth/2;
    completedLeg.position.y = -armHeight;
    this.mesh.add(completedLeg);

    //left leg
    var completedLeg = leg.clone();
    completedLeg.position.x = bodyWidth/2 - armWidth/2;
    completedLeg.position.y = -armHeight;
    this.mesh.add(completedLeg);

	}
}
