function Timer(time) {

    this.time = time;
    this.left = time;
    this.enabled = false;

    this.Enable = function() {
        this.enabled = true;
    }

    this.Disable = function() {
        this.enabled = false;
    }

    this.Reset = function() {
        this.Refresh();
        this.Disable();
    }

    this.Refresh = function() {
        this.left = time;
    }

    this.Expired = function() {
        return this.left == 0;
    }

    this.Tick = function() {
        if (!this.enabled) {
            return;
        }
        this.left--;
		if (this.left==0){
			this.enabled=!this.enabled;
		}
    }

    this.toString = function() {
		//second format
		return "[Max time: " + this.time + "][Time left: " + this.left + "][enabled:" + this.enabled + "]";

		//minute:second format
        //return "[Max time: " + Math.floor(this.time/60) +":" + this.time%60 + "][Time left: " + Math.floor(this.left/60) + ":" + this.left%60+ "][enabled:" + this.enabled + "]";
		
    }

}