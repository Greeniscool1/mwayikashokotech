function Vector(x, y) {
	this.x = x;
	this.y = y;
}

function dist(x1, y1, x2, y2) {
	let a = x1-x2;
	let b = y1-y2;
	let c = Math.sqrt(a*a + b*b);
	
	return c;
}

function random(min, max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}

function pentagon(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6) {
    ctx.moveTo(x1, y1, x2, y2);
    ctx.lineTo(x2, y2, x3, y3);
    ctx.lineTo(x3, y3, x4, y4);
    ctx.lineTo(x4, y4, x5, y5);
	ctx.lineTo(x5, y5, x6, y6);
};
