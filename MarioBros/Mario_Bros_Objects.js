"use strict";
function Obj(x, y, w, h, fill, enemy) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.fill = fill;
	this.enemy = enemy;
	this.gravity = 0.3;
	this.friction = 0.8;
	this.velX = 0;
	this.velY = 0;
}

//draws the object to the screen
Obj.prototype.draw = function() {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
};

//gravity;
Obj.prototype.update = function() {
	this.x += this.velX;
	
	if (!this.enemy) {
		this.velX *= this.friction;
	}
	
	this.velY += this.gravity;
	this.y += this.velY;
};

//collision
Obj.prototype.hits = function(obj) {
	if (this.x+this.w > obj.x && this.x < obj.x+obj.w && this.y+this.h > obj.y && this.y < obj.y+obj.h) {
		return true;
	} else {
		return false;
	}
};
