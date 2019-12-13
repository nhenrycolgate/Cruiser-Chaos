function GameObject(engine, transform, render, type = "GAME_OBJECT") {

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

    this.UpdateComponents = function(engine) {
        for (var component of this.componentsByName.values()) {
            component.Update(engine);
            component.Render(engine);
        }
    }

    this.Init = function(engine) {}
    this.Update = function(engine) {}
    this.Destroy = function(engine) {
        for (var component of this.componentsByName.values()) {
            console.log(component);
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

    this.ToString = function(engine) { return "[GameObject id:" + this.id + "][GameObject type:" + this.type + "]"; }

    this.RegisterOnLateUpdate = function(callback) {
        this.callbackHandler.AddCallback("LATE_UPDATE", callback);
    }

}

function GameObjectRender() {

    Render.call(this);
    this.mesh.name = "GAME_OBJECT";

}