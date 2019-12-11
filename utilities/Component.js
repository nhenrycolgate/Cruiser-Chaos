function Component(type) {

    this.type = type;
    this.gameObject = null;
    this.id = null;
    this.callbackHandler = null;
    this.enabled = true;
    this.tag = "COMPONENT";

    this.PinToGameObject = function(gameObject) {
        this.gameObject = gameObject;
        this.id = gameObject.GetNextComponentID();
        this.callbackHandler = new CallbackHandler(this);
        this.callbackHandler.FixedInit();
        this.Init();
    }

    this.Init = function() {}
    this.Enable = function() { this.enabled = true; }
    this.Disable = function() { this.enabled = false; }
    this.Update = function() {}
    this.Init = function() {}
    this.ToString = function() { return "[Component type " + this.type + "][Component id " + this.id + "]"; }
    this.GetCallbackLabel = function() { return "[GameObjectID:" + this.id + "]{ComponentID" + this.id + "}" }
}