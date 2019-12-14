function Spawner(engine, transform, render, spawnTarget, timer) {

    GameObject.call(this, engine, transform, render, "SPAWNER");
    this.spawnTarget = spawnTarget;
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
        //console.log("Spawn");
        engine.CreateInstance(spawnTarget.Copy());
    }
}