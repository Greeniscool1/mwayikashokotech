"use strict"
function Platform(x, y, w, h, fill) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.fill = fill;
}

Platform.prototype.draw = function() {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
};

Platform.prototype.hits = function(obj) {
	if (obj.pos.x+obj.r > this.x && obj.pos.x-obj.r < this.x+this.w && obj.pos.y+obj.r > this.y && obj.pos.y-obj.r < this.y+this.h) {
		return true;
	} else {
		return false;
	}
};
