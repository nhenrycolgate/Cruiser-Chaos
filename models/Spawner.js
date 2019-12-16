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
        //var empty = new GameObject(engine, new Transform(0, 0, -worldRadius));
        //empty.AddComponent("COLLISION", new BoxCollider(100, 100, 100));
        //empty.RegisterOnLateUpdate( (_this) => _worldRadius.RotateAbout(0, 0, 0, worldSpeed, 0, 0) );
        //engine.CreateInstance(empty);

        //console.log("copy_id after = " + copy.id);
        //prefab.AddComponent("SHIT_BOX", new BoxCollider(300, 300, 300, new Transform(-100, 0, 0)));
    }
}