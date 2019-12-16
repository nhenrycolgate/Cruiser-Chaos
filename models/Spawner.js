function Spawner(engine, transform = DefaultTransform(), render = new GameObjectRender(), prefab) {

    GameObject.call(this, engine, transform, render, "SPAWNER");
    this.prefab = prefab;

    this.UseCode = function(engine, code) {
        //console.log(spawnCode);

        var message = "";
        for (var c of code) {
            message +=  c + ".";
        }
        //console.log("code = " + message);
        this.Spawn(engine, this.prefab);
    }

    this.Spawn = function(engine, prefab) {
        //var spawnObject = spawnTarget[Math.floor(Math.random() * spawnTarget.length)];
        var copy = prefab.Copy();
        console.log("copy_id before = " + copy.id);
        engine.CreateInstance(copy);
        console.log("copy_id after = " + copy.id);
    }
}