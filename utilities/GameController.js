//have subscriptions for the game state as well as handle state changes
function GameController(speed, speedDx) {

    Controller.call(this, "GAME_CONTROLLER");

    this.direction = Direction.NORTH; //direction the world is rotating

    this.scoreElement = document.getElementById("score");
    this.healthElement = document.getElementById("health");

    this.health = 3;
    this.score = 0;
    this.multiplier = 0.1;

    this.speed = speed;
    this.speedDx = speedDx;

    this.Init = function() {}

    this.Update = function(engine) {

        this.score += 1;
        this.scoreElement.innerHTML = Math.floor(this.score);

        if (this.score % 500 == 0 && this.speed <= 1.0) {
            this.UpdateSpeed(this.speedDx);
        }

    }

    this.GetSpeed = function() { return this.speed; }

    this.SetSpeed = function(speed) {
        this.speed = speed;
        this.callbackHandler.Invoke("ON_SPEED_CHANGE");
    }

    this.UpdateSpeed = function(speed) {
        this.speed += speed;
        this.callbackHandler.Invoke("ON_SPEED_CHANGE");
    }

    this.GameOver = function() {

    }

    this.UpdateScore = function(score) {
        this.score += score;
        this.scoreElement.innerHTML = this.score;
    }

    this.SetHealth = function(health) {
        this.healthElement.innerHTML = health;
    }

    this.RegisterOnSpeedChange = function(callback) { this.callbackHandler.AddCallback("ON_SPEED_CHANGE", callback) }
    this.RegisterOnMaxScore = function(callback) { this.callbackHandler.AddCallback("TEST", callback) }
    this.RegisterOnDirectionChanged = function(callback) { this.callbackHandler.AddCallback("ON_DIRECTION_CHANGED", callback) }

}
