function Cell(x, y, r, fill) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.fill = fill;
	
	this.draw = function() {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.fill;
		ctx.translate(this.pos.x, this.pos.y);
		ctx.arc(0, 0, this.r, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	};
	
	this.hits = function(food) {
		let d = dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y);
		
		if (d < this.r+food.r) {
			return true;
		}
	}
}
