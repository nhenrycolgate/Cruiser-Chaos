function Timer(time) {

    Component.call(this, "TIMER");

    this.time = time;
    this.left = time;
    this.enabled = false;

    this.Reset =   function() { this.Refresh(); this.Disable(); }
    this.Restart = function() { this.Refresh(); this.Enable(); }
    this.Refresh = function() { this.left = time; }
    this.Expired = function() { return this.left == 0; }
    this.GetPercent = function() { return (this.time - this.left) / this.time };

    this.Update = function() {
        if (!this.enabled) {
            return;
        }
        else {
            this.left--;
            if (this.left <= 0) {
                this.left = 0;
                this.enabled =! this.enabled;
                this.callbackHandler.Invoke("CLOCK_EXPIRED");
            }
		}
    }

    this.Copy = function(engine) {
        var timerCopy = new Timer(this.time);
        timerCopy.left = this.left;
        timerCopy.enabled = this.enabled;
        timerCopy.callbackHandler = this.callbackHandler.Copy();

        return timerCopy;
    }

    this.toString = function() { return "[Max time: " + this.time + "][Time left: " + this.left + "][enabled:" + this.enabled + "]"; }

    this.RegisterOnClockExpired = function(cb) { this.callbackHandler.AddCallback("CLOCK_EXPIRED", cb); }
    this.UnregisterOnClockExpired = function(cb) { }


}