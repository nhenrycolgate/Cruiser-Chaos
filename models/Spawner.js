function Spawner(engine, transform, render, gameObject, timer) {

    GameObject.call(this, engine, transform, render, "SPAWNER");
    this.gameObject = gameObject;
    this.timer = timer;
    this.enabled = false;

    this.Spawn = function(engine) {
        engine.Add(gameObject.Copy());
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