function GameObject(engine, transform, render, type) {

    this.id = engine.GetNextID();
    this.render = render;
    this.transform = transform;
    this.type = type;
    this.enabled = true;

    this.SetRender = function(render) {
        this.render = render;
    }

    this.SetTransform = function(transform) {
        this.transform = transform;
    }

    this.SetType = function(type) {
        this.type = type;
    }

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
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            this.Translate(child, x, y, z);
        }
    }

    this.Translate = function(child, x, y, z) {
        child.position.x = x;
        child.position.y = y;
        child.position.z = z;
    }

    this.RotateMesh = function(x, y, z) {
        this.render.mesh.rotation.x += x;
        this.render.mesh.rotation.y += y;
        this.render.mesh.rotation.z += z;
    }

    //TODO: add a child rotation function

    this.Init = function(engine) {}

    this.Update = function(engine) {}

    this.Destroy = function(engine) {
        engine.Destroy(this);
    }

    this.DisplayTransform = function(engine) {

    }

    this.Enable = function(engine) { this.enabled = true; }

    this.Disable = function(engine) { this.enabled = false; }

    this.toString = function(engine) {
        return "[object id:" + this.id + "][object type:" + this.type + "]";
    }

}