var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

var bullets = [];

var asteroids = [];

var wait = 0;

var lives = 3;
var score = 0;

var time = 0;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var spacePressed = false;

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 38) {
		upPressed = true;
	} else if (e.keyCode == 32) {
		spacePressed = true;
	}
});

document.addEventListener("keyup", function(e) {
    if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 38) {
		upPressed = false;
	} else if (e.keyCode == 32) {
		spacePressed = false;
	}
});

var ship = new Ship(width / 2, height / 2, 20);

for (let i = 0; i < 6; i++) {
	asteroids.push(new Asteroid(random(0, width), random(0, height), random(30, 35)));
}

function draw() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height);
	
	ctx.font = "30px VT323";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + score, 10, 30);
	ctx.fillText("Lives: " + lives, width-105, 30);
	
	for (let i = 0; i < asteroids.length; i++) {
		var b = asteroids[i];
		
		asteroids[i].draw();
		asteroids[i].update();
		asteroids[i].wrap();
		
		if (asteroids[i].collides(ship)) {
			asteroids.splice(i, 1);
			lives--;
		}
	}
	
	if (lives <= 0) {
		alert("You Lose");
		return;
	}
	
	if (time%900 === 0) {
		asteroids.push(new Asteroid(random(0, 0), random(height), random(30, 35)));
	}

	for (let i = 0; i < bullets.length; i++) {
		var b = bullets[i];
		
		bullets[i].draw();
		bullets[i].update();
		bullets[i].wrap();
		
		if (bullets[i].timeUntilDisapear > 50) {
			bullets.splice(i, 1);
		}
		
		for (let j = 0; j < asteroids.length; j++) {
			if (bullets[i] != undefined && bullets[i].hits(asteroids[j])) {
				if (asteroids[j].r > 19.8) {
					asteroids.push(new newAsteroid(asteroids[j].pos.x - 10, asteroids[j].pos.y - 10, asteroids[j].r * 0.66, asteroids[j].sides, asteroids[j].offsetX, asteroids[j].offsetY));
					asteroids.push(new newAsteroid(asteroids[j].pos.x + 10, asteroids[j].pos.y - 10, asteroids[j].r * 0.66, asteroids[j].sides, asteroids[j].offsetX, asteroids[j].offsetY));
				}
				
				score += 10;
				bullets.splice(i, 1);
				asteroids.splice(j, 1);
			}
		}
	}
	
    ship.draw();
	ship.move();
	ship.wrap();
	
	if (upPressed) {
		ship.vel.x += sin(ship.angle) * 0.9;
		ship.vel.y -= cos(ship.angle) * 0.9;
	}
	
	if (spacePressed && wait === 0) {
		bullets.push(new Bullet(ship.pos.x, ship.pos.y, sin(ship.angle) * 7, -cos(ship.angle) * 7));
		
		wait = 20;
	}
	
	if (leftPressed) {
		ship.angle -= 0.1;
	} else if (rightPressed) {
		ship.angle += 0.1;
	}
}

function update() {
    draw();
	
	if (wait > 0) {
		wait--;
	}
	
	time++;

    requestAnimationFrame(update);
}

update();
