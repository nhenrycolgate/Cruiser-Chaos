function Enemy(engine, transform, render, speed, direction, hp, enemyType) {

    this.type = "ENEMY";
    this.speed = speed;
    this.hp = hp;
    this.direction = direction;
    this.enemyType = enemyType;

    GameObject.call(this, engine, transform, render, type);

    this.Init = function(speed, direction, hp, enemyType) {
        this.speed = speed;
        this.hp = hp;
        this.direction = direction;
        this.enemyType = enemyType;
    }

    this.SetHP = function(hp) {
        this.hp = hp;
    }

    this.SetSpeed = function(speed) {
        this.speed = speed;
    }
    this.SetDirection = function(direction) {
        this.direction = direction;
    }

    this.SetEnemyType = function(enemyType) {
        this.SetEnemyType = enemyType;
    }

    this.Move = function(x, y, z) {
        this.transform.Update(x, y, z);
    }

    this.Copy = function() {
        return new Enemy(this.render, this.transform, this.type, this.speed, this.direction, this.hp);
    }

    this.Update = function(engine) {
        this.HandleCollisionProjectile(engine);
        if (this.IsDead()) {
            this.Destroy(engine);
        }
        var x = this.direction.x * this.speed;
        var y = this.direction.y * this.speed;
        this.Move(x, y, z);
    }

    this.TakeDamage = function(amount) {
        hp -= amount;
        if (hp < 0) {
            hp == 0;
        }
    }

    this.RecoverDamage = function(amount) {
        hp += amount; //need a max hp field if implemented to have healing enemies
    }

    this.IsDead = function() {
        return hp == 0;
    }

    this.HandleCollisionProjectile = function(engine) {
        var typeMap = engine.typeMap.get("PROJECTILE");
        for (var projectile of typeMap.values()) {
            var collision = false; //Collision.GetCollision(this, projectile); //to be implemented, need to add collision box code
            if (collision) {
                this.TakeDamage(projectile.damage);
                projectile.Destroy(engine);
            }
        }
    }

}