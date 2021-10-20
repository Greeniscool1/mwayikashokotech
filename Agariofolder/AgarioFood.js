function Food(x, y, r, fill) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.fill = fill;
	
	this.draw = function() {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.fill;
		ctx.translate(this.pos.x, this.pos.y);
		pentagon(-this.r, 0, 0, -this.r*0.75, this.r, 0, this.r/2, this.r, -this.r/2, this.r, -this.r, 0);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	};
}
