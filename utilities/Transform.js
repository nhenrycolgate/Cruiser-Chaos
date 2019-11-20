//TO BE EDITED, SHOULD BE IN 3D AND BE REFACTORED AS A TRANSFORM
function Transform(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.SetPosition = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    this.UpdatePosition = function(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    this.Copy = function() {
        return new Transform(this.x, this.y, this.z);
    }

}