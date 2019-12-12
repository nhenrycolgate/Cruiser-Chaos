function CollisionBox(transform, length, width, height,localPosition) {

    this.transform = transform;
    this.length = length;
    this.width = width;
    this.height = height;
    this.render = CollisionBoxRender(length, width, height);
	this.localPosition = localPosition;

    this.UpdatePosition = function(x, y, z) {
        this.transform.UpdatePosition(x, y, z);
    }	
	this.GetInfo = function() {
        var info={
			xmin: this.transform.x+this.localPosition[0]-(this.length/2),
			xmax: this.transform.x+this.localPosition[0]+(this.length/2),
			ymin: this.transform.y+this.localPosition[1]-(this.width/2),
			ymax: this.transform.y+this.localPosition[1]+(this.width/2),
			zmin: this.transform.z-this.localPosition[2]-(this.height/2),
			zmax: this.transform.z+this.localPosition[2]+(this.height/2),
		};
		return info;
    }
}

    this.Collision = function(otherBox) {
        return Collision(this, otherBox);
    }

}

function CollisionBoxRender(length, width, height) {}

//check to see if two collison boxes collide
function Collision(box1,box2){  //https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
	var box1_info= box1.GetInfo();
	var box2_info= box2.GetInfo();
	
	return 	(box1_info.xmin <= box2_info.xmax && box1_info.xmax >= box2_info.xmin) &&
			(box1_info.ymin <= box2_info.ymax && box1_info.ymax >= box2_info.ymin);
			(box1_info.zmin <= box2_info.zmax && box1_info.zmax >= box2_info.zmin);

}