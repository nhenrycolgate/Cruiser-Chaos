function SpawnController() {

    Controller.call(this, "SPAWN_CONTROLLER");

    this.coolDownTimer = new Timer(90);
    this.spawnCode = null;

    this.Init = function() {

        var _spawnController = this;

        this.coolDownTimer.Restart();
        this.coolDownTimer.RegisterOnClockExpired( (_timer) => _timer.Restart() );
        this.coolDownTimer.RegisterOnClockExpired( (_timer) => _spawnController.GenerateSpawn(_spawnController) );

        /*var _GetSpawn = this.GetSpawn;
        var _spawnController = this;
        window.addEventListener('keydown', function(keyEvent) {
            _GetSpawn(keyEvent, _spawnController);
        });*/
    }

    this.Update = function(engine) {
        this.coolDownTimer.Update(engine);
    }

    this.SetSpawnCode = function(spawnCode) { this.spawnCode = spawnCode; }

    this.GetSpawn = function(keyEvent, _spawnController) {
        if (keyEvent.key == "p") {
            GenerateSpawn(_spawnController);
        }
    }

    this.GenerateSpawn = function(_spawnController) {

        var spawnCode = _spawnController.GetSpawnCode();
        _spawnController.SetSpawnCode(spawnCode);
        _spawnController.callbackHandler.Invoke("GENERATED");
        spawnCode = null;

    }


    this.GetSpawnCode = function() {
        var result = [];
        var laneCount = 3;
        var freeLane = false;
        var occupied = false;

        for (var i = 0; i < laneCount; i++) {
            var code = GetRandomInt(0, 1);
            result.push(code);
            freeLane = freeLane || (code == 0);
            occupied = occupied || (code == 1);
        }

        if ( !freeLane) {
            target = GetRandomInt(0, 1);
            result[target] = 0;
        }

        if ( !occupied) {
            target = GetRandomInt(0, 1);
            result[target] = 1;
        }

        return result;
    }

    this.RegisterOnGenerated = function(callback) { this.callbackHandler.AddCallback("GENERATED", callback);}

}
