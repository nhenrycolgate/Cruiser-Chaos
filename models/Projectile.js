function Projectile(engine, render, transform, speed, direction, damage) {

    this.type = "PROJECTILE"
    this.transform = transform;
    this.speed = speed;
    this.direction = direction;
    this.damage = damage;
    this.collisionBox = new CollisionBox();
    //this.animation;
    //this.particle;

    GameObject.call(this, engine, render, transform, type);

    this.UpdatePosition = function(x, y, z) {
        this.transform.UpdatePosition(x, y, z);
        this.collisionBox.transform = this.transform;
    }

    this.Update = function(engine) {
        var x = direction.x * speed;
        var y = direction.y * speed;
        var z = direction.z * speed;
        this.UpdatePosition(x, y, z);
        //animation.UpdateAnimation(engine, render); //animation the projectile as it is moving
        //particle.UpdateParticleEffect(engine, transform); //add particles to the environment
    }

}