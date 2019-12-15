function Controller(type) {

    this.enabled = true;
    this.type = type;
    this.callbackHandler = new CallbackHandler(this);

    this.Init = function() {}
    this.Update = function(engine) {}
    this.Enable = function() { this.enabled = true; }
    this.Disable = function() { this.enabled = false; }

}