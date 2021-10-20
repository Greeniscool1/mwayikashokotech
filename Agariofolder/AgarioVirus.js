function Virus(x, y, r, fill) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.fill = fill;
	
	this.draw = function() {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.fill;
		ctx.translate(this.pos.x, this.pos.y);
		ctx.arc(0, 0, this.r, 0, Math.PI*2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	};
}
