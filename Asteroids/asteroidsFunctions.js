function Ship(x, y, r) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.angle = 0;
	this.vel = new Vector(0, 0);
	this.friction = 0.9;
}

Ship.prototype.draw = function() {
	ctx.beginPath();
	ctx.save();
	ctx.translate(this.pos.x, this.pos.y);
	ctx.rotate(this.angle);
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1.5;
	ctx.fillStyle = "black";
	ctx.moveTo(-this.r, this.r);
	ctx.lineTo(this.r, this.r);
	ctx.lineTo(0, -this.r);
	ctx.lineTo(-this.r, this.r);
	ctx.stroke();
	ctx.fill();
	ctx.restore();
	ctx.closePath();
};

Ship.prototype.move = function(forceX, forceY) {
	forceX = this.vel.x;
	forceY = this.vel.y;
	
	this.pos.x += forceX;
	this.pos.y += forceY;
	
	this.vel.x *= this.friction;
	this.vel.y *= this.friction;
};

Ship.prototype.wrap = function() {
	if (this.pos.x < -this.r) {
		this.pos.x = width+this.r;
	} else if (this.pos.x > width+this.r) {
		this.pos.x = -this.r;
	}
	
	if (this.pos.y < -this.r) {
		this.pos.y = height+this.r;
	} else if (this.pos.y > height+this.r) {
		this.pos.y = -this.r;
	}
};

function Bullet(x, y, velX, velY) {
	this.pos = new Vector(x, y);
	this.vel = new Vector(velX, velY);
	this.timeUntilDisapear = 0;
}

Bullet.prototype.draw = function() {
	ctx.beginPath();
	ctx.save();
	ctx.translate(this.pos.x, this.pos.y);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 1, 1);
	ctx.restore();
	ctx.closePath();
};

Bullet.prototype.update = function() {
	this.timeUntilDisapear++;
	
	this.pos.x += this.vel.x;
	this.pos.y += this.vel.y;
};

Bullet.prototype.wrap = function() {
	if (this.pos.x < 0) {
		this.pos.x = width;
	} else if (this.pos.x > width) {
		this.pos.x = 0;
	}
	
	if (this.pos.y < 0) {
		this.pos.y = height;
	} else if (this.pos.y > height) {
		this.pos.y = 0;
	}
};


Bullet.prototype.hits = function(other) {
	var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
	
	if (d < other.r) {
		return true;
	} else {
		return false;
	}
}

function Asteroid(x, y, r) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.vel = new Vector();
	this.sides = random(10, 15);
	this.offsetX = [];
	this.offsetY = [];
	
	if (random(1, 2) === 1) {
		this.vel.x = random(-2, -1);
	} else {
		this.vel.x = random(1, 2);
	}
	
	if (random(1, 2) === 1) {
		this.vel.y = random(-2, -1);
	} else {
		this.vel.y = random(1, 2);
	}
	
	for (let i = 0; i < this.sides; i++) {
		this.offsetX.push(random(-15, 15));
		this.offsetY.push(random(-15, 15));
	}
}

Asteroid.prototype.draw = function() {
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.translate(this.pos.x, this.pos.y);
	
	for (let i = 0; i < this.sides; i++) {
		var angle = map(i, 0, this.sides, 0, PI*2);
		
		var x = (this.offsetX[i] + this.r) * cos(angle);
		var y = (this.offsetY[i] + this.r) * sin(angle);
		
		ctx.lineTo(x, y);
	}
	
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
};

Asteroid.prototype.update = function() {
	this.pos.x += this.vel.x;
	this.pos.y += this.vel.y;
};

Asteroid.prototype.wrap = function() {
	if (this.pos.x < -this.r) {
		this.pos.x = width+this.r;
	} else if (this.pos.x > width+this.r) {
		this.pos.x = -this.r;
	}
	
	if (this.pos.y < -this.r) {
		this.pos.y = height+this.r;
	} else if (this.pos.y > width+this.r) {
		this.pos.y = -this.r;
	}
};

Asteroid.prototype.collides = function(other) {
	var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
	
	if (d < this.r+other.r) {
		return true;
	} else {
		return false;
	}
}

function newAsteroid(x, y, r, sides, offsetX, offsetY) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.sides = sides;
	this.vel = new Vector(this.velX, this.velY);
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	
	if (random(1, 2) === 1) {
		this.vel.x = random(-2, -1);
	} else {
		this.vel.x = random(1, 2);
	}
	
	if (random(1, 2) === 1) {
		this.vel.y = random(-0.5, 0.5);
	} else {
		this.vel.y = random(-0.5, 0.5);
	}
}

newAsteroid.prototype.draw = function() {
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.translate(this.pos.x, this.pos.y);
	
	for (let i = 0; i < this.sides; i++) {
		var angle = map(i, 0, this.sides, 0, PI*2);
		
		var x = (this.offsetX[i] + this.r) * cos(angle);
		var y = (this.offsetY[i] + this.r) * sin(angle);
		
		ctx.lineTo(x, y);
	}
	
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
};

newAsteroid.prototype.update = function() {
	this.pos.x += this.vel.x;
	this.pos.y += this.vel.y;
};

newAsteroid.prototype.wrap = function() {
	if (this.pos.x < -this.r) {
		this.pos.x = width+this.r;
	} else if (this.pos.x > width+this.r) {
		this.pos.x = -this.r;
	}
	
	if (this.pos.y < -this.r) {
		this.pos.y = height+this.r;
	} else if (this.pos.y > width+this.r) {
		this.pos.y = -this.r;
	}
};
