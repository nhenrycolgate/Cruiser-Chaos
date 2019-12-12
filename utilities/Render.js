function Render() {

    this.Copy = function(engine) {
        var meshCopy = this.mesh.clone();
        var renderCopy = new Render(this.data);
        renderCopy.mesh = meshCopy;
        return renderCopy;
    }

//Source from https://www.w3schools.com/js/js_object_prototypes.asp
//todo: see if this works and makes deep copies

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


}

function TestRender() {

    this.mesh = new THREE.Object3D();
    this.mesh.name = "TEST_RENDER";

    var particleWidth = 10;
    var particleHeight = 10;
    var particleDepth = 10;

    var particleGeometry = new THREE.BoxGeometry(particleWidth, particleHeight, particleDepth, 1, 1, 1);
    var particleMaterial = new THREE.MeshLambertMaterial({color:COLORS.red});
    particleMaterial.opacity = 1;
    this.particle = new THREE.Mesh(particleGeometry, particleMaterial);

    this.mesh.add(this.particle);

}