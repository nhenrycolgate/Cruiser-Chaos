function BuildingSpawnController() {

    Controller.call(this, "BUILDINGSPAWN_CONTROLLER");

    this.coolDownTimer = null;

    this.Init = function() {
        this.coolDownTimer = new Timer(200);
        this.coolDownTimer.Restart();
        this.coolDownTimer.RegisterOnClockExpired( () => this.coolDownTimer.Restart() )
        this.coolDownTimer.RegisterOnClockExpired( () => this.callbackHandler.Invoke("GENERATED") );
    }


    this.Update = function(engine) {
      this.coolDownTimer.Update(engine);
    }

    this.RegisterOnGenerated = function(callback) { this.callbackHandler.AddCallback("GENERATED", callback);}
}
