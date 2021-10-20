function Mass(x, y, r, fill, spedX, spedY) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.fill = fill;
	this.spedX = spedX;
	this.spedY = spedY;
	
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
	
	this.update() {
		
	};
	
	this.hits = function(obj) {
		let d = dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y);
		
		if (d < this.r+obj.r) {
			return true;
		}
	};
}
