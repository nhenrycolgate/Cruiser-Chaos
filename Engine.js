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
        var objectsOfType = [];
        var typeIDMap = new Map();
        if (this.typeMap.has(type)) {
            typeIDMap = this.typeMap.get(type);
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

    this.GetNextGameObjectID = function() { //
        var id = 0;
        while (this.objects.has(id)) {
            id++;
        }
        return id++;
    }

    this.Destroy = function(object) { //
        this.scene.remove(object.render.mesh);
        this.scene.remove(object.transform.render.mesh);

        this.objects.delete(object.id);
        if (this.typeMap.has(object.type)) {
            var typeIDMap = this.typeMap.get(object.type);
            typeIDMap.delete(object.id);
        }
    }

    this.Update = function() { //
        var currentObjects = this.objects.values();
        var objects = [];
        for (var object of currentObjects) {
            objects.push(object);
        }
        // console.log("Current gameObjects = " + objects.length);
        if (this.enabled) {
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
        }
    }

    this.CreateInstance = function(object) { //
        if (object.id == -1) {
            object.id = engine.GetNextGameObjectID();
        }

        object.Init(this);
        this.AddGameObject(object);
        if ( !object.render.loaded) {
            object.render.Init();
        }
        this.scene.add(object.render.mesh);
        if ( !object.transform.render.loaded) {
            object.transform.render.Init();
        }
        this.scene.add(object.transform.render.mesh);

    }

    this.Enable = function() { this.enabled = true; } //Enable the engine
    this.Disable = function() { this.enabled = false; } //Disable the engine

    this.AddController = function(controller) { //Attach a controller to the game engine
        this.controllers.set(controller.type, controller);
        controller.Init();
    }

}
