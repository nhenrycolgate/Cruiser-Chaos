function Component(type) {

    this.type = type;
    this.gameObject = null;
    this.id = null;
    this.callbackHandler = new CallbackHandler(this);
    this.enabled = true;
    this.tag = "COMPONENT";

    this.AttachToGameObject = function(gameObject) {
        this.gameObject = gameObject;
        this.id = gameObject.GetNextComponentID();
        this.Init();
    }

    this.Init = function() {}
    this.Enable = function() { this.enabled = true; }
    this.Disable = function() { this.enabled = false; }
    this.Update = function() {}
    this.ToString = function() { return "[Component type " + this.type + "][Component id " + this.id + "]"; }

//Source from https://www.w3schools.com/js/js_object_prototypes.asp
//todo: see if this works and makes deep copies
/*
    this.Copy = function() {
        var cloneObj = this;
        if(this.__isClone) {
          cloneObj = this.__clonedFrom;
        }

        var temp = function() { return cloneObj.apply(this, arguments); };

        for(var key in this) {
            if (this[key].hasOwnProperty("Copy")) {
                temp[key] = key.Copy();
            }
            else {
                temp[key] = this[key];
            }
        }

        temp.__isClone = true;
        temp.__clonedFrom = cloneObj;

        return temp;
    }
*/
}