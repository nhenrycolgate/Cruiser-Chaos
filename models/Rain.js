function Rain(engine, transform, render, timer) {

    GameObject.call(this, engine, transform, render, "RAIN");
    this.timer = timer;

    this.Init = function(engine) {
        var _particles = this;

        this.transform.x = GetRandomInt(-500, 500);
        this.transform.z = GetRandomInt(-500, 500);

        if (!this.HasComponent("DESPAWN_TIMER")) {
            this.AddComponent("DESPAWN_TIMER", this.timer);
            var despawnTimer = this.GetComponent("DESPAWN_TIMER");
            despawnTimer.Restart();
            despawnTimer.RegisterOnClockExpired( (_timer) => _particles.Destroy(engine) );
        }
    }

    this.Update = function(engine) {
        this.transform.UpdatePosition(0, -20, 0);
    }

}

function RainRender() {

    Render.call(this);

    this.Init = function() {
        this.mesh.name = "RAIN";

        var particleWidth = 10;
        var particleHeight = 10;
        var particleDepth = 10;

        var particleGeometry = new THREE.BoxGeometry(particleWidth, particleHeight, particleDepth, 1, 1, 1);
        var particleMaterial = new THREE.MeshBasicMaterial({color:COLORS.blue});
        this.particle = new THREE.Mesh(particleGeometry, particleMaterial);

        this.mesh.add(this.particle);
    }
}
