function Player(engine, render, transform, fire_speed, cool_down, direction, player_damage) {

    this.type = "PLAYER";
    this.fire_speed = fire_speed;
    this.cool_down_timer = new Timer(cool_down);
    this.direction = direction;
    this.player_damage = player_damage;

    GameObject.call(this, engine, render, transform, type);

    this.Fire = function(engine) {
        engine.CreateInstance(new Projectile(engine, this.render, this.transform, this.fire_speed, this.direction, this.player_damage));
    }

    this.Update = function(engine) {
        if (engine.buttonHit("FIRE")) {
            if (!cool_down_timer.enabled) {
                this.Fire(engine);
                cool_down_timer.Enable();
            }
            else {
                cool_down_timer.Tick();
                if (cool_down_timer.Expired()) {
                    cool_down_timer.Reset();
                }
            }

        }
    }

}