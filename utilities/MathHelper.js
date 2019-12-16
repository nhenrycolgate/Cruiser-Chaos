function DegreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

function Bound(value, min, max) {
    return value < min ? min : value > max ? max : value;
}

function RandomNumberBtwn(a, b){
	var min = a;
	var max = b;
	if (a > b){ min = b ; max = a;}
	return (Math.random()*(max - min)) + min;
}

function GetPointOnSphere(position, radius){
		var u= Math.random();
		var v= Math.random();
		var theta = u * 2.0 * Math.PI;
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

//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function GetRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//https://gist.github.com/demonixis/4202528/5f0ce3c2622fba580e78189cfe3ff0f9dd8aefcc
Math.lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};