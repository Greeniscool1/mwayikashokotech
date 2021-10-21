"use strict";
var abs = Math.abs;
var acos = Math.acos;
var asin = Math.asin;
var atan = Math.atan;
var cbrt = Math.cbrt;
var ceil = Math.ceil;
var cos = Math.cos;
var E = Math.E;
var floor = Math.floor;
var log = Math.log;
var log10 = Math.log10;
var PI = Math.PI;
var pow = Math.pow;
var rand = Math.random;
var round = Math.round;
var sin = Math.sin;
var sqrt = Math.sqrt;
var tan = Math.tan;
var toFixed = Number.toFixed;
var SPACE_KEY = 32;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;

//returns if a value is within a range or not
function constrain(value, min, max) {
	return value > max ? max : value < min ? min : value;
}

//collision with circles
function dist(x1, y1, x2, y2) {
	var a = x1-x2;
	var b = y1-y2;
	var c = sqrt(a*a + b*b);
	
	return c;
}

function map(e, t, n, r, i) {
    return r + (i - r) * ((e - t) / (n - t));
}

//Returns a random integer
function random(min, max) {
	return floor(rand() * (max-min+1))+min;
}

//For making new Vectors
function Vector(x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}
