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
        return left == 0;
    }

    this.Tick = function() {
        if (!enabled) {
            return;
        }
        this.time--;
    }

    this.toString = function(){
        return Math.floor(time/60)+":" + (time%60);
    }
}
