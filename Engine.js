function Engine(scene) {

    this.objects = new Map();
    this.typeMap = new Map();
    this.controllers = new Map();
    this.callbackHandlers = new Map();

    this.enabled = true;
    this.scene = scene;

    this.AddGameObject = function(object) {
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

    this.GetObjectsOfType = function(type) {
        var objectsOfType = [];
        var typeIDMap =new Map();
        if (this.typeMap.has(type)) {
            typeIDMap = this.typeMap.get(object.type);
        }
        return typeIDMap.values();
    }

    this.GetNextGameObjectID = function() {
        var id = 0;
        while (this.objects.has(id)) {
            id++;
        }
        return id++;
    }

    this.Destroy = function(object) {
        this.scene.remove(object.render.mesh);
        this.scene.remove(object.transform.render.mesh);

        this.objects.delete(object.id);
        if (this.typeMap.has(object.type)) {
            var typeIDMap = this.typeMap.get(object.type);
            typeIDMap.delete(object.id);
        }
    }

    this.Update = function() {
        if (this.enabled) {
            this.UpdateObjects();
            this.RenderObjects();
        }
    }

    this.UpdateObjects = function() {
        for (var object of this.objects.values()) {
            if (object.enabled) {
                object.Update(this);
                if (object.componentsByName.length != 0) {
                    object.UpdateComponents(this);
                }
            }
        }
    }

    this.RenderObjects = function() {
        for (var object of this.objects.values()) {
            object.Render(this);
        }
    }

    this.CreateInstance = function(object) {
        object.Init(this);
        this.AddGameObject(object);
        this.scene.add(object.render.mesh);
        //this.scene.add(object.transform.render.mesh);

        //TODO: make sure the collision is active
        if (object.collision != null) {
            this.scene.add(object.collision.render.mesh);
        }
    }

    this.enable = function() { this.enabled = true; }
    this.disable = function() { this.enabled = false; }

    this.AddController = function(controller) {
        this.controllers.set(controller.type, controller);
        controller.Init();
    }

}