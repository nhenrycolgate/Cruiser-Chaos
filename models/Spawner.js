function Spawner(engine, transform, render, prefab, timer) {

    GameObject.call(this, engine, transform, render, "SPAWNER");
    this.prefab = prefab;
    this.timer = timer;

    this.Init = function(engine) {
        var _spawner = this;

        this.AddComponent("SPAWN_TIMER", this.timer);
        var spawnTimer = this.GetComponent("SPAWN_TIMER");

        spawnTimer.Restart();
        spawnTimer.RegisterOnClockExpired( (_timer) => _spawner.Spawn(engine) );
        spawnTimer.RegisterOnClockExpired( (_timer) => _timer.Restart() );
        spawnTimer.RegisterOnClockExpired( (_timer) => console.log("SPAWN") );
    }

    this.SetAsDefaultSpawner = function(engine) {

    }

    this.Spawn = function(engine) {
        //var spawnObject = spawnTarget[Math.floor(Math.random() * spawnTarget.length)];
        var copy = prefab.Copy();
        console.log("target" + copy);
        engine.CreateInstance(prefab.Copy());
    }
}

function TestGameObject(engine, transform = DefaultTransform(), render = new TestRender()) {

    GameObject.call(this, engine, transform, render, "TEST");

    this.Init = function() {
        this.render.EarlyLoad();
    }

    this.Update = function() {

        var body = render.mesh.body;

    }
}

function TestRender() {

    Render.call(this);

    this.Init = function() {
        this.mesh.name = "TEST";

        this.body = new THREE.Object3D();

        this.mesh.add(this.body);

    }

}