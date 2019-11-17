function Spawner(engine, transform, render, type, enemy, timer) {

    GameObject.call(this, engine, transform, render, type);
    this.type = "SPAWNER";
    this.enemy = enemy;
    this.timer = timer;
    this.enabled = false;

    this.Spawn = function(engine) {
        engine.Add(enemy.Copy());
    }

    this.Update = function(engine) {
        if (timer.Expired()) {
            this.Spawn(engine);
            timer.Refresh();
        }
        else {
            timer.Tick();
        }
    }

    this.Enable = function(engine) {
        enabled = true;
        timer.Start();
    }

    this.Disable = function(engine) {
        enabled = false;
        timer.Stop();
    }


}