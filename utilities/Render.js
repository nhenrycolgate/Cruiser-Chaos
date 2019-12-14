function Render(Init) {

    this.mesh = new THREE.Object3D();
    this.loaded = false;

    this.Init = function() {}

    //Source from https://www.w3schools.com/js/js_object_prototypes.asp
    this.Copy = function() {

        var cloneObj = this;
        if(this.__isClone) {
          cloneObj = this.__clonedFrom;
        }

        var temp = function() { return cloneObj.apply(this, arguments); };

        for(var key in this) {
            if (this[key].hasOwnProperty("Copy")) {
                temp[key] = this[key].Copy();
            }
            else {
                temp[key] = this[key];
            }
        }

        temp.mesh = this.mesh.clone();

        temp.__isClone = true;
        temp.__clonedFrom = cloneObj;

        return temp;
    }
}