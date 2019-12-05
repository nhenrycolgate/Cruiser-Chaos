function Engine(scene) {

    this.objects = new Map();
    this.typeMap = new Map();
    this.controllers = new Map();
    this.enabled = true;
    this.scene = scene;

    this.Add = function(object) {
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

    this.GetNextID = function() {
        var id = 0;
        while (this.objects.has(id)) {
            id++;
        }
        return id++;
    }

    this.Destroy = function(object) {
        this.scene.remove(object.render.mesh);

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
            }
        }
    }

    this.RenderObjects = function() {
        for (var object of this.objects.values()) {
            object.Render(this);
        }
    }

    this.CreateInstance = function(object) {
        object.Init(engine);
        this.Add(object);
        this.scene.add(object.render.mesh);
    }

    this.enable = function() { this.enabled = true; }
    this.disable = function() { this.enabled = false; }

    this.AddController = function(controller) {
        this.controllers.set(controller.type, controller);
        controller.Init();
    }

}