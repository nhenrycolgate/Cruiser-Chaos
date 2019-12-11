function CollisionBox(transform, length, width, height) {

    this.transform = transform;
    this.length = length;
    this.width = width;
    this.height = height;
    this.render = CollisionBoxRender(length, width, height);

    this.UpdatePosition = function(x, y, z) {
        this.transform.UpdatePosition(x, y, z);
    }

    this.Collision = function(otherBox) {
        //TODO: do collision check between boxes
        return false;
    }

}

function CollisionBoxRender(length, width, height) {

}