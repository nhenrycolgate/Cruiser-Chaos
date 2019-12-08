function DegreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

function Bound(value, min, max) {
    return value < min ? min : value > max ? max : value;
}

function randomNumberBtwn(a,b){
	var min= a; var max= b;
	if (a>b){ min=b;max=a;}
	return (Math.random()*(max-min))+min;
}

function getPointOnSphere(position, radius){
		var u= Math.random();
		var v= Math.random();
		var theta= u*2.0*Math.PI;
		var phi = Math.acos(2.0 * v - 1.0);
		//var r = Math.cbrt(Math.random());
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);
		var sinPhi = Math.sin(phi);
		var cosPhi = Math.cos(phi);
		var x = radius * sinPhi * cosTheta + position[0];
		var y = radius * sinPhi * sinTheta + position[1];
		var z = radius * cosPhi + position[2];
		return [x,y,z]
}