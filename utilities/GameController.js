//have subscriptions for the game state as well as handle state changes
function GameController() {

    Controller.call(this, "GAME_CONTROLLER");

    this.direction = Direction.NORTH; //direction the world is rotating

    this.scoreElement = document.getElementById("score");
    this.score = 0;
    this.maxScore = 1000;
    this.speed = 1;
    this.multiplier = 0.1;

    this.Init = function() {}

    this.Update = function(engine) {

        if (this.score <= this.maxScore) {
            this.score += 1;
        }
        else {
            this.score = this.maxScore;
            this.callbackHandler.Invoke("TEST");
            this.Disable();
        }

        this.scoreElement.innerHTML = Math.floor(this.score);
    }

    this.SetSpeed = function(speed) { this.speed = speed; }
    this.UpdateSpeed = function(speed) {this.speed += speed; }

    this.GameOver = function() {
        var x = 1 / 0;
    }

    this.RegisterOnMaxScore = function(callback) { this.callbackHandler.AddCallback("TEST", callback); }
    this.RegisterOnDirectionChanged = function(callback) { this.callbackHandler.AddCallback("ON_DIRECTION_CHANGED", callback) }

}
