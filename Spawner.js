function Spawner(render, transform, type, enemy, timer) {

    this.type = "SPAWNER";
    this.enemy = enemy;
    this.timer = timer;
    this.enabled = false;

    GameObject.call(this, render, transform, type);

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