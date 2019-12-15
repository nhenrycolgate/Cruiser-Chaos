function Spawner(engine, transform = DefaultTransform(), render = new GameObjectRender(), prefab) {

    GameObject.call(this, engine, transform, render, "SPAWNER");
    this.prefab = prefab;

    this.Init = function(engine) {}

    this.SetAsDefaultSpawner = function(engine) {

    }

    this.UseCode = function(code) {
        //console.log(spawnCode);

        var message = "";
        for (var c of code) {
            message +=  c + ".";
        }
        console.log("code = " + message);
    }

    this.Spawn = function(engine) {
        //var spawnObject = spawnTarget[Math.floor(Math.random() * spawnTarget.length)];
        engine.CreateInstance(prefab.Copy());
    }
}