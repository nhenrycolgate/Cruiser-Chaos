function GameObject(engine, transform, render, type) {

    this.id = engine.GetNextID();
    this.render = render;
    this.transform = transform;
    this.type = type;

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
        //should be the object function used to flush it to the buffer
    }

    this.Update = function(engine) {
        //handle logic of the object
    }

    this.Destroy = function(engine) {
        engine.Destroy(this);
    }

}