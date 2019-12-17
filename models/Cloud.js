function Cloud(engine, transform, render, timer) {

    GameObject.call(this, engine, transform, render, "PARTICLE");
    this.timer = timer;

    this.Init = function(engine) {
        //var _particles = this;
        //this.x = 10 * Math.random() - 5;
        //this.y = 10 * Math.random() - 5;
        //this.z = 10 * Math.random() - 5;

        this.AddComponent("DESPAWN_TIMER", this.timer);
        var despawnTimer = this.GetComponent("DESPAWN_TIMER");

        despawnTimer.Restart();
        despawnTimer.RegisterOnClockExpired( (_timer) => _particles.Destroy(engine) );
    }

    this.Update = function(engine) {}

    this.Copy = function(engine) {
        return new Cloud(engine, this.transform.Copy(), this.render.Copy(), this.timer.Copy());
    }
}

function CloudRender() {

    Render.call(this);

    this.Init = function() {
        this.mesh.name = "CLOUD";

        var particleWidth = 10000;
        var particleHeight = 1000;
        var particleDepth = 100;

        var particleGeometry = new THREE.BoxGeometry(particleWidth, particleHeight, particleDepth, 1, 1, 1);
        var particleMaterial = new THREE.MeshBasicMaterial({color:COLORS.white, opacity: 1, transparent: true});
        this.particle = new THREE.Mesh(particleGeometry, particleMaterial);

        this.mesh.add(this.particle);
    }
}
