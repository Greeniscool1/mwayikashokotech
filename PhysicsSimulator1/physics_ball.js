"use strict";
function Ball(x, y, r, gravity, bounce, color) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.gravity = gravity;
	this.vel = new Vector(0, 0);
	
	if (random(1, 10) < 5) {
		this.vel.x = random(-5, -1);
	} else {
		this.vel.x = random(1, 5);
	}
	
	this.bounce = bounce;
	this.color = color;
}

Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
};

Ball.prototype.update = function() {
	this.vel.y+=this.gravity;
	
	if (this.gravity === 0) {
		this.vel.y = 0;
	}
	
	this.pos.y+=this.vel.y;
	
	this.pos.x+=this.vel.x;
};

Ball.prototype.hits = function(obj) {
	var d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
	
	if (d < obj.r+this.r) {
		return true;
	} else {
		return false;
	}
};

Ball.prototype.lines = function() {
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(width/2, height/2);
	ctx.lineTo(this.pos.x, this.pos.y);
	ctx.stroke();
	ctx.closePath();
};
