function Particle(engine, transform, render, timer) {

    GameObject.call(this, engine, transform, render, "PARTICLE");
    this.timer = timer;

    this.Init = function(engine) {
        var _particles = this;
        this.x = 10 * Math.random() - 5;
        this.y = 10 * Math.random() - 5;
        this.z = 10 * Math.random() - 5;

        this.AddComponent("DESPAWN_TIMER", this.timer);
        var despawnTimer = this.GetComponent("DESPAWN_TIMER");

        despawnTimer.Restart();
        despawnTimer.RegisterOnClockExpired( (_timer) => _particles.Destroy(engine) );
    }

    this.Update = function() {
        this.transform.UpdatePosition(this.x, this.y, this.z);
        this.render.particle.material.transparent = true;
        this.render.particle.material.opacity -= 1 / this.timer.time;
    }

    this.Copy = function(engine) {
        //var renderCopy = {};
        //renderCopy.mesh = this.render.mesh.clone();
        return new Particle(engine, this.transform.Copy(), this.render.Copy(), this.timer.Copy());
    }
}

function ParticleRender() {

    Render.call(this);

    this.Init = function() {
        this.mesh.name = "PARTICLE";

        var particleWidth = 10;
        var particleHeight = 10;
        var particleDepth = 10;

        var particleGeometry = new THREE.BoxGeometry(particleWidth, particleHeight, particleDepth, 1, 1, 1);
        var particleMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
        particleMaterial.opacity = 1;
        this.particle = new THREE.Mesh(particleGeometry, particleMaterial);

        this.mesh.add(this.particle);
    }
}
