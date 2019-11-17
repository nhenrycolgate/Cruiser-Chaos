//TODO: Add to this the camera render and scene handling

function Engine() {

    this.objects = new Map();
    this.typeMap = new Map();
    this.buttons = new Map(); //TODO: should be a map with button enum for key and booleans for values
    this.enabled = true;

    this.Add = function(object) {
        this.objects.set(object.id, object);
        if (this.typeMap.has(object.type)) {
            var typeIDMap = typeMap.get(object.type);
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
        this.objects.delete(object.id);
        if (this.typeMap.has(object.type)) {
            var typeIDMap = this.typeMap.get(object.type);
            typeIDMap.delete(object.id);
        }
    }

    this.GetInput = function() {
        return buttons;
    }

    this.HandleInput = function() {
        //get input from the user for one frame, setting the buttons map
    }

    this.Update = function() {
        if (this.enabled) {
            this.HandleInput();
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
        this.Add(object);
        scene.add(object.render.mesh);
    }

    this.enable = function() {
        this.enabled = true;
    }

    this.disable = function() {
        this.enabled = false;
    }


}