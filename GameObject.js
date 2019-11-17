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

    this.Update = function(engine) {
    }

    this.Destroy = function(engine) {
        engine.Destroy(this);
    }

    this.Enable = function() {
        this.enabled = true;
    }

    this.Disable = function() {
        this.enabled = false;
    }

    this.toString = function() {
        return "[object id:" + this.id + "][object type:" + this.type + "]";
    }

}