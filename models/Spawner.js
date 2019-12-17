function Spawner(engine, transform = DefaultTransform(), render = new GameObjectRender()) {

    GameObject.call(this, engine, transform, render, "SPAWNER");

    this.UseCode = function(engine, code) {

        var message = "";
        for (var c of code) {
            message +=  c + ".";
        }
        //console.log("code = " + message);
        this.Spawn(engine, code);
    }

    this.Spawn = function(engine, code) {}
}