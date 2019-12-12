function CallbackHandler(entity) {

    this.entity = entity;
    this.callbacks = new Map();

    this.AddCallback = function (event, cb) {
        var callback = new Callback(cb);
        if (this.callbacks.has(event)) {
            var callbackEventSet = this.callbacks.get(event);
            if ( !callbackEventSet.has(callback) ) {
                callbackEventSet.add(callback);
                this.callbacks.set(event, callbackEventSet);
            }
            else {
                console.log("Callback:[" + cbObject + "] already subscribed to event {" + event + "}");
            }
        }
        else {
            var callbackEventSet = new Set();
            callbackEventSet.add(callback);
            this.callbacks.set(event, callbackEventSet);
        }
    }

    this.RemoveCallback = function (event, cb) {
        var callback = new Callback(cb);
        if (this.callbacks.has(event)) {
            var callbackEventSet = this.callbacks.get(event);
            callbackEventSet.remove(callback);
            this.callbacks.set(event, callbackEventSet);
        }
    }

    this.Invoke = function(event) {
        if (this.callbacks.has(event)) {
            for (var callback of this.callbacks.get(event)) {
                callback.func(entity);
            }
        }
    }

    this.Copy = function() {
        var callbackHandlerCopy = new CallbackHandler(this.entity);
        callbackHandlerCopy.callbacks = new Map();
        for (var event of this.callbacks.keys()) {

            var callbackEventSetCopy = new Set();
            var callbackEventSet = this.callbacks.get(event);
            for (var callback of callbackEventSet) {
                callbackEventSetCopy.add(callback.Copy());
            }

            callbackHandlerCopy.set(event, callbackEventSetCopy);
        }

        return callbackHandlerCopy;
    }
}