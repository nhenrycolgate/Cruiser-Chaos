function Engine(scene) {

    this.objects = new Map(); //GameObjects in the current scene
    this.typeMap = new Map(); //Map from GameObject Type to GameObjects
    this.controllers = new Map(); //All the controllers that exist within the scene
    this.enabled = true; //Current state of the engine
    this.scene = scene; //current scene which the engine operates on

    this.AddGameObject = function(object) { //Add an object to the engine data set
        this.objects.set(object.id, object);
        if (this.typeMap.has(object.type)) {
            var typeIDMap = this.typeMap.get(object.type);
            typeIDMap.set(object.id, object);
            this.typeMap.set(object.type, typeIDMap);
        }
        else {
            var typeIDMap = new Map();
            typeIDMap.set(object.id, object);
            this.typeMap.set(object.type, typeIDMap);
        }
    }

    this.GetObjectsOfType = function(type) { //Returns a set of the objects within the engine of a specific type
        if (this.typeMap.has(type)) {
            var typeIDMap = this.typeMap.get(type);
            var objects = [];
            for (var object of typeIDMap.values()) {
                objects.push(object);
            }
            return objects;
        }
        else {
            console.log("No objects of type " + type);
            var array = [];
            return array;
        }
    }

    this.GetNextGameObjectID = function() {
        var id = 0;
        while (this.objects.has(id)) {
            id++;
        }
        //console.log("next free id = ", id);
        return id++;
    }

    this.Destroy = function(object) { //

        if ( !this.objects.has(object.id) ) {
            throw new Error("Trying to delete a non existent object");
        }

        this.scene.remove(object.render.mesh);
        this.scene.remove(object.transform.render.mesh);

        this.objects.delete(object.id);
        if (this.typeMap.has(object.type)) {
            var typeIDMap = this.typeMap.get(object.type);
            typeIDMap.delete(object.id);
            this.typeMap.get(object.type, typeIDMap);
        }
    }

    this.Update = function() { //
        if (this.enabled) {
            //console.log("objects in world" + this.objects.size);
            this.UpdateControllers();
            this.UpdateObjects();
            this.RenderObjects();
        }
    }

    this.UpdateObjects = function() { //
        for (var object of this.objects.values()) {
            if (object.enabled) {
                object.Update(this);
                object.callbackHandler.Invoke("LATE_UPDATE");
                if (object.componentsByName.length != 0) {
                    object.UpdateComponents(this);
                }
            }
        }
    }

    this.RenderObjects = function() { //
        for (var object of this.objects.values()) {
            object.Render(this);
            object.transform.Render(this);
        }
    }

    this.CreateInstance = function(object) { //
        if (object.id == -1) { //set id for gameObject
            object.id = engine.GetNextGameObjectID();
            if (object.toBeAdded.size != 0) {
                //console.log("object = ", object, "has unused components");
                object.SetComponents(); //set components on non invoked object
                //console.log("object = ", object.componentsByName );
            }

        }

        object.Init(this);
        this.AddGameObject(object);
        if ( !object.render.loaded ) {
            object.render.Init();
        }
        this.scene.add(object.render.mesh);
    }

    this.Enable = function() { this.enabled = true; } //Enable the engine
    this.Disable = function() { this.enabled = false; } //Disable the engine

    this.AddController = function(controller) { //Attach a controller to the game engine
        this.controllers.set(controller.type, controller);
        controller.Init(this);
    }

    this.GetController = function(type) {
        if (this.controllers.has(type)) {
            return this.controllers.get(type);
        }
        else {
            console.log("No controller of type :" + type);
            return null;
        }
    }

    this.UpdateControllers = function() {
        for (var controller of this.controllers.values()) {
            if (controller.enabled) {
                controller.Update(this);
            }
        }
    }

}
