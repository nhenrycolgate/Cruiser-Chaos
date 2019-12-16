function Component(type) {

    this.type = type;
    this.gameObject = null;
    this.id = -1;
    this.callbackHandler = new CallbackHandler(this);
    this.enabled = true;
    this.tag = "COMPONENT";
    this.render = null;
    this.inScene = false;

    this.AttachToGameObject = function(gameObject) {
        this.gameObject = gameObject;
        //console.log("Attaching to gameObject", gameObject.id);
        this.id = gameObject.GetNextComponentID();
        this.Init();
        if (this.render != null) {
            this.render.Init();
        }
    }

    this.Render = function(engine) {
        if (this.render == null) {
            return;
        }
        if (!this.inScene) {
            engine.scene.add(this.render.mesh);
            this.inScene = true;
        }
        this.render.mesh.position.x = this.gameObject.transform.x;
        this.render.mesh.position.y = this.gameObject.transform.y;
        this.render.mesh.position.z = this.gameObject.transform.z;
    }

    this.Destroy = function(engine) {
        if (this.render != null && this.inScene) {
            engine.scene.remove(this.render.mesh);
        }
    }

    this.Init = function() {}
    this.Enable = function() { this.enabled = true; }
    this.Disable = function() { this.enabled = false; }
    this.Update = function() {}
    this.ToString = function() { return "[Component type " + this.type + "][Component id " + this.id + "]"; }

//Source from https://www.w3schools.com/js/js_object_prototypes.asp

    this.Copy = function() {
        var cloneObj = this;
        if(this.__isClone) {
          cloneObj = this.__clonedFrom;
        }

        var temp = function() { return cloneObj.apply(this, arguments); };

        for(var key in this) {
            if (this[key].hasOwnProperty("Copy")) {
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
}