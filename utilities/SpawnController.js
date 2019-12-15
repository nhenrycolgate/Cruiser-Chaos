function SpawnController() {

    Controller.call(this, "SPAWN_CONTROLLER");

    this.spawnReference = null; //??
    this.coolDownTimer = null; //??

    this.spawnCode = null;

    this.Init = function() {
        var _GetSpawn = this.GetSpawn;
        var _spawnController = this;
        window.addEventListener('keydown', function(keyEvent) {
            _GetSpawn(keyEvent, _spawnController);
        });
    }

    this.SetSpawnCode = function(spawnCode) { this.spawnCode = spawnCode; }

    this.GetSpawn = function(keyEvent, _spawnController) {
        if (keyEvent.key == "p") {
            var spawnCode = _spawnController.GetSpawnCode();

            _spawnController.SetSpawnCode(spawnCode);
            _spawnController.callbackHandler.Invoke("GENERATED");
        }
    }

    this.GetSpawnCode = function() {
        var result = [];
        var laneCount = 3; //??
        var freeLane = false;

        for (var i = 0; i < laneCount; i++) {
            var code = GetRandomInt(0, 1);
            result.push(code);

            freeLane = freeLane || (code == 0);
        }

        /*
        var message = "";
        for (var code of result) {
            message +=  code + ".";
        }
        console.log("code = " + message);
        */

        if ( !freeLane) {
            target = GetRandomInt(0, 2);
            result[target] = 0;
        }

        return result;
    }

    this.RegisterOnGenerated = function(callback) { this.callbackHandler.AddCallback("GENERATED", callback);}

}
