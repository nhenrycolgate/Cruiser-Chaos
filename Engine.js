function Engine() {

    this.objects = new Map();
    this.typeMap = new Map();
    this.buttons = new Map(); //should be a map with button enum for key and booleans for values
    this.enabled = true;

    this.Add = function(object) {
        objects.set(object.id, object);
        if (typeMap.has(object.type)) {
            var typeIDMap = typeMap.get(object.type);
            typeIDMap.set(object.id, object);
        }
        else {
            var typeIDMap = new Map();
            typeIDMap.set(object.id, object);
        }
    }

    this.GetNextID = function() {
        var id = 0;
        while (objects.has(id)) {
            id++;
        }
        return id++;
    }

    this.Destroy = function(object) {
        objects.delete(object.id);
        if (typeMap.has(object.type)) {
            var typeIDMap = typeMap.get(object.type);
            typeIDMap.delete(object.id);
        }
    }

    this.GetInput = function() {
        return buttons;
    }

    this.HandleInput = function {
        //get input from the user for one frame, setting the buttons map
    }

    this.Update = function() {
        if (enabled) {
            HandleInput();
            UpdateObjects();
            RenderObjects();
        }
    }

    this.UpdateObjects = function() {
        for (var object of objects.values()) {
            object.Update(this);
        }
    }

    this.RenderObjects = function() {
        for (var object of objects.values()) {
            objects.Render(this);
        }
    }

    this.CreateInstance = function(object) {
        engine.Add(object);
    }

    this.enable = function() {
        this.enabled = true;
    }

    this.disable = function() {
        this.enabled = false;
    }


}