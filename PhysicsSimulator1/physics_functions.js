"use strict";
function random(min, max) {
	return Math.floor(Math.random() * (max-min+1))+min;
}

function dist(x1, y1, x2, y2) {
	var a = x1-x2;
	var b = y1-y2;
	
	return Math.sqrt(a*a + b*b);
}

function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}
