function GameObject(engine, transform, render, type) {

    this.id = engine.GetNextGameObjectID();
    this.render = render;
    this.transform = transform;
    this.type = type;
    this.enabled = true;
    this.tag = "GAME_OBJECT";
    this.callbackHandler = new CallbackHandler(this);

    this.componentsByName = new Map();
    this.componentNameByID = new Map();

    this.AddComponent = function(name, component) {
        component.AttachToGameObject(this);
        this.componentsByName.set(name, component);
        this.componentNameByID.set(component.id, name);
    }

    this.RemoveComponent = function(name) {

    }

    this.GetNextComponentID = function() {
        var id = 0;
        while (this.componentNameByID.has(id)) {
            id++;
        }
        return id++;
    }

    this.GetComponent = function(name) {
        if (this.componentsByName.has(name)) {
            return this.componentsByName.get(name);
        }
        else {
            return null;
        }
    }

    this.SetRender = function(render) { this.render = render; }
    this.SetTransform = function(transform) { this.transform = transform; }
    this.SetType = function(type) { this.type = type; }

    this.Render = function(engine) {
        if (render == null) {
            return;
        }
        this.render.mesh.position.x = transform.x;
        this.render.mesh.position.y = transform.y;
        this.render.mesh.position.z = transform.z;
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

    this.UpdateComponents = function(engine) {
        for (var component of this.componentsByName.values()) {
            component.Update();
        }
    }

    this.Init = function(engine) {}
    this.Update = function(engine) {}
    this.Destroy = function(engine) { engine.Destroy(this); }
    this.Enable = function(engine) { this.enabled = true; }
    this.Disable = function(engine) { this.enabled = false; }

//Source from https://www.w3schools.com/js/js_object_prototypes.asp
//todo: see if this works and makes deep copies
/*
    this.Copy = function() {
        var cloneObj = this;
        if(this.__isClone) {
          cloneObj = this.__clonedFrom;
        }

        var temp = function() { return cloneObj.apply(this, arguments); };

        for(var key in this) {
            if (this[key].hasOwnProperty("Copy")) {
                temp[key] = key.Copy();
            }
            else {
                temp[key] = this[key];
            }
        }

        temp.__isClone = true;
        temp.__clonedFrom = cloneObj;

        return temp;
    }
*/

    this.ToString = function(engine) { return "[GameObject id:" + this.id + "][GameObject type:" + this.type + "]"; }

}

function GameObjectRender() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "GAME_OBJECT";
}