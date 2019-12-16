function Callback(func) {
    this.func = func;
}

//Source from https://www.w3schools.com/js/js_object_prototypes.asp
Callback.prototype.Copy = function() {

    return new Callback(this.func.clone());

    /*var cloneObj = this;
    if(this.__isClone) {
      cloneObj = this.__clonedFrom;
    }

    var temp = function() { return cloneObj.apply(this, arguments); };
    for(var key in this) {
        temp[key] = this[key];
    }

    temp.__isClone = true;
    temp.__clonedFrom = cloneObj;

    return temp;*/
};