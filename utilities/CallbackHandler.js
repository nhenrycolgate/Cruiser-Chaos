function CallbackHandler(entity) {

    this.entity = entity;
    this.callbacks = new Map();

    this.AddCallback = function (event, cb) {
        var callback = new Callback(cb);
        if (this.callbacks.has(event)) {
            var callbackEventArray = this.callbacks.get(event);
            if ( !callbackEventArray.includes(callback) ) {
                callbackEventArray.push(callback);
                this.callbacks.set(event, callbackEventArray);
            }
            else {
                console.log("Callback:[" + cbObject + "] already subscribed to event {" + event + "}");
            }
        }
        else {
            var callbackEventArray = new Array();
            callbackEventArray.push(callback);
            this.callbacks.set(event, callbackEventArray);
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
            var toBeDeleted = [];

            var array = this.callbacks.get(event);

            for (var i = 0; i < array.length; i++) {
                var callback = array[i];
                try {
                    callback.func(entity); //tries to make the callback
                }
                catch (error) {
                    toBeDeleted.push(i); //add it to an array to be deleted
                }
            }

            if (toBeDeleted.length != 0) {

                var tempArray = [];
                var index = 0;

                for (var i = 0; i < array.length; i++) {

                    var target = toBeDeleted[index];
                    if (target == i) { //don't add this to the tempArray
                        index ++;
                    }
                    else {
                        tempArray.push(array[i]);
                    }
                }

                this.callbacks.set(event, tempArray);
            }
        }
    }

    this.Copy = function(copyEntity) {
        var callbackHandlerCopy = new CallbackHandler(copyEntity);
        for (var event of this.callbacks.keys()) {
            var callbackEventArray = this.callbacks.get(event);
            for (var callback of callbackEventArray) {
                callbackHandlerCopy.AddCallback(event, callback.func);
            }
        }
        return callbackHandlerCopy;
    }
}