function GameObject(engine, transform = DefaultTransform(), render = new GameObjectRender(), type = "GAME_OBJECT") {

    this.id = -1;
    this.render = render;
    this.transform = transform;
    this.type = type;
    this.enabled = true;
    this.tag = "GAME_OBJECT";
    this.callbackHandler = new CallbackHandler(this);

    this.componentsByName = new Map(); //grab component by name
    this.componentsByType = new Map(); //grab component(s) by type
    this.componentUsedID = new Set(); //set of used IDs
    this.toBeAdded = new Map();

    this.AddComponent = function(name, component) {
        //throw new Exception();
        if (this.id == -1) {
            //console.log("cannot add, sending to temp set");
            this.toBeAdded.set(name, component);
            return;
        }

        component.AttachToGameObject(this);
        this.componentsByName.set(name, component);
        this.componentUsedID.add(component.id);

        if (this.componentsByType.has(component.type)) {
            var typeIDMap = this.componentsByType.get(component.type);
            typeIDMap.set(component.id, component);
            this.componentsByType.set(component.type, typeIDMap);
        }
        else {
            var typeIDMap = new Map();
            typeIDMap.set(component.id, component);
            this.componentsByType.set(component.type, typeIDMap);
        }

    }

    this.SetComponents = function() {

        for (var name of this.toBeAdded.keys()) {
            this.AddComponent(name, this.toBeAdded.get(name));
        }

        this.toBeAdded = new Map();
    }

    this.GetNextComponentID = function() {
        var id = 0;
        while (this.componentUsedID.has(id)) {
            id++;
        }
        return id++;
    }

    this.HasComponent = function(name) { return this.componentsByName.has(name); }

    this.GetComponent = function(name) {
        if (this.componentsByName.has(name)) {
            return this.componentsByName.get(name);
        }
        else {
            return null;
        }
    }

    this.Unregister = function() {} //should unregister to anything this subscribed

    this.GetComponentsByType = function(type) {

        if (this.componentsByType.has(type)) {
            var typeIDMap = this.componentsByType.get(type);
            var components = [];
            for (var object of typeIDMap.values()) {
                components.push(object);
            }
            return components;
        }
        else {
            console.log("No components of type " + type);
            var array = [];
            return array;
        }
    }

    this.SetRender = function(render) { this.render = render; }
    this.SetTransform = function(transform) { this.transform = transform; }
    this.SetType = function(type) { this.type = type; }

    this.Render = function(engine) {
        if (this.render == null) {
            return;
        }
        this.render.mesh.position.x = this.transform.x;
        this.render.mesh.position.y = this.transform.y;
        this.render.mesh.position.z = this.transform.z;

        if (this.transform.render == null) {
            return;
        }
        this.transform.Render(engine);
    }

    this.GlobalTranslate = function(engine, x, y, z) {
        var children = this.render.mesh.children;
        for (var child of children) {
            this.TranslateChild(child, x, y, z);
        }
    }

    this.TranslateChild = function(child, x, y, z) {
        child.position.x = x;
        child.position.y = y;
        child.position.z = z;
    }

    this.GlobalMesh = function(x, y, z) {
        var children = this.render.mesh.children;
        for (var child of children) {
            this.RotateChild(child, x, y, z);
        }
    }

    this.RotateChild = function(child, x, y, z) {
        child.rotation.x += x;
        child.rotation.y += y;
        child.rotation.z += z;
    }

	this.RotateAbout = function(x, y, z, rx, ry, rz) {
		var prevTransform = new THREE.Vector3(this.transform.x, this.transform.y, this.transform.z);

		transformationMatrix = new THREE.Matrix4().makeTranslation(x, y, z);
		prevTransform.applyMatrix4(transformationMatrix);

		transformationMatrix = new THREE.Matrix4().makeRotationX(DegreesToRadians(rx));
		prevTransform.applyMatrix4(transformationMatrix);

		transformationMatrix = new THREE.Matrix4().makeRotationY(DegreesToRadians(ry));
		prevTransform.applyMatrix4(transformationMatrix);

		transformationMatrix = new THREE.Matrix4().makeRotationZ(DegreesToRadians(rz));
		prevTransform.applyMatrix4(transformationMatrix);

		transformationMatrix = new THREE.Matrix4().makeTranslation(-x, -y, -z);
		prevTransform.applyMatrix4(transformationMatrix);

		this.transform.SetPosition(prevTransform.x, prevTransform.y, prevTransform.z);
	}

    this.UpdateComponents = function(engine) {
        for (var component of this.componentsByName.values()) {
            if (component.enabled) {
                component.Update(engine);
                component.Render(engine);
            }
        }
    }

    this.Init = function(engine) {}
    this.Update = function(engine) {}

    this.Destroy = function(engine) {
        for (var component of this.componentsByName.values()) {
            component.Destroy(engine);
        }
        engine.Destroy(this);

    }
    this.Enable = function(engine) { this.enabled = true; }
    this.Disable = function(engine) { this.enabled = false; }

//Source from https://www.w3schools.com/js/js_object_prototypes.asp
    this.Copy = function() {

        var cloneObj = this;
        if(this.__isClone) {
          cloneObj = this.__clonedFrom;
        }

        var temp = function() { return cloneObj.apply(this, arguments); };

        for(var key in this) {
            if (this[key].hasOwnProperty("Copy") && key.toString() == "callbackHandler") {
                temp[key] = this[key].Copy(temp);
            }
            else if (this[key].hasOwnProperty("Copy")) {
                temp[key] = this[key].Copy();
            }
            else {
                temp[key] = this[key];
            }
        }

        temp.__isClone = true;
        temp.__clonedFrom = cloneObj;

        return temp;
    }

    this.ToString = function(engine) { return "[GameObject id:" + this.id + "][GameObject type:" + this.type + "]"; }

    this.RegisterOnLateUpdate = function(callback) { this.callbackHandler.AddCallback("LATE_UPDATE", callback); }

}

function GameObjectRender() {

    Render.call(this);
    this.mesh.name = "GAME_OBJECT";

}
