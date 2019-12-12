function DegreesToRadians(degrees) {
	return degrees * Math.PI / 180;
}

function Bound(value, min, max) {
    return value < min ? min : value > max ? max : value;
}