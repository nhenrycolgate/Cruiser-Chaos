function ParticleSystem(engine, transform, render, particle, timer) {

    GameObject.call(this, engine, transform, render, "PARTICLE_SYSTEM");
    this.particle = particle;
    this.timer = timer;

    this.Init = function(engine) {
        var _particleSystem = this;

        this.AddComponent("PARTICLE_TIMER", this.timer);
        var particleTimer = this.GetComponent("PARTICLE_TIMER");

        particleTimer.Restart();
        particleTimer.RegisterOnClockExpired( (_timer) => _particleSystem.GenerateParticle(engine) );
        particleTimer.RegisterOnClockExpired( (_timer) => _timer.Restart() );
    }

    this.GenerateParticle = function(engine) {
        var copy = particle.Copy(engine);
        //console.log("particle = ", copy);
        engine.CreateInstance(copy);
    }

}
