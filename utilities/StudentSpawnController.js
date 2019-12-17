function StudentSpawnController() {

    Controller.call(this, "STUDENTSPAWN_CONTROLLER");

    this.coolDownTimer = null;

    this.Init = function() {
        this.coolDownTimer = new Timer(60 * 10);
        this.coolDownTimer.Restart();
        this.coolDownTimer.RegisterOnClockExpired( () => this.coolDownTimer.Restart() )
        this.coolDownTimer.RegisterOnClockExpired( () => this.callbackHandler.Invoke("GENERATED") );
    }


    this.Update = function(engine) {
      this.coolDownTimer.Update(engine);
    }

    this.RegisterOnGenerated = function(callback) { this.callbackHandler.AddCallback("GENERATED", callback);}
}
