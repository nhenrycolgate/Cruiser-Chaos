function CallbackHandler(parent) {

    this.parent = parent;
    this.label = null;
    this.callbacks = new Map();

    this.FixedInit = function() {
        this.label = this.GetCallbackLabel(parent);
    }

    this.RemoveAllCallbacks = function() {
        for (var name of callbacks.keys()) {
            //window.removeEventListener(name, callback.func);
        }
    }

    this.AddCallback = function (event, cb) {
        var _event = this.InvocationTag(event);

        if (this.callbacks.has(_event)) {
            var callbackEventSet = this.callbacks.get(_event);
            callbackEventSet.add(cb);
            this.callbacks.set(_event, callbackEventSet);
        }
        else {
            var callbackEventSet = new Set();
            callbackEventSet.add(cb);
            this.callbacks.set(_event, callbackEventSet);
        }

        window.addEventListener(_event, cb);
    }

    this.RemoveCallback = function (event, cb) {
        var _event = this.InvocationTag(event);

        if (this.callbacks.has(_event)) {
            var callback = callbacks.get(_event);
            //window.removeEventListener(tag, callback.cb);
        }
    }

    this.Invoke = function(event) {
        var _event = this.InvocationTag(event);

        if (this.callbacks.has(_event)) {
            for (var callback of this.callbacks.get(_event)) {
                callback(parent);
            }
            //window.DispatchEvent(tag);
        }
    }

    //FIXME: Need to remove getCallbackLabel from objects, so that this can be created dynamically rather than via a FixedInit()
    this.GetCallbackLabel = function(parent) { return parent.GetCallbackLabel(); }
    this.InvocationTag = function(event) { return "CBHandler:" + this.label + "." + event; }

}

//each game object and component have a callback handler.
//callback handler=>
//callback.add("EVENT", func1);
//callback.add("EVENT", func2);
//label.EVENT => {func1, func2}