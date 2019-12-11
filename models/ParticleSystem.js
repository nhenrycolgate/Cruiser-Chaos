function ParticleSystem(engine, transform, render) {

    GameObject.call(this, engine, transform, render, "ParticleSystem");
    this.particles = [];
    this.spawner = new Spawner();

    this.Init = function(engine) {

    }


    this.Update = function(engine) {
        for (var i = 0; i < particles.length; i++) {
            var particle = this.particles[i];

        }
    }

    this.CreateParticle = function(engine) {
        var particle = new GameObject(engine, this.transform, this.render);
    }


}