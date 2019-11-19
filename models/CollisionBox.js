function CollisionBox(transform, length, width, height) {

    this.transform = transform;
    this.length = length;
    this.width = width;
    this.height = height;

    this.UpdatePosition = function(x, y, z) {
        this.transform.UpdatePosition(x, y, z);
    }

}