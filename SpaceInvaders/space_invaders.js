"use strict";
//Defines variables for drawing on
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Defines the canvas width and height
const width = canvas.width;
const height = canvas.height;

//Defining the spaceship image
var spaceship = new Image();
spaceship.src = "file:///C:/Users/John/Pictures/Spaceship.png";

//Movement
var leftPressed = false;
var upPressed = false;
var rightPressed = false;

//The bullets and the image for enemies
var bullet = new Image();
bullet.src = "file:///C:/Users/John/Pictures/Bullet.png";
var bullets = [];

//The enemies and the image for enemies
var enemy1 = new Image();
enemy1.src = "file:///C:/Users/John/Pictures/Invader.png";
var enemy2 = new Image();
enemy2.src = "file:///C:/Users/John/Pictures/Invader1.png";
var enemies = [];

//Enemy variables
var cols = 11;
var rows = 5;

/* Testing variables
var cols = 2;
var rows = 2; */

//Bullet increment timer
var wait = 0;

//Decides the state the enemy is in
var time = 1;

//Decides most important aspects
var amount = 50;
var moveAmount = 10;

//Other important variables
var track = 0;
var executed = 0;
var score = 0;
var lives = 3;

document.addEventListener("keydown", function(e) {
    if (e.keyCode == LEFT_ARROW) {
        leftPressed = true;
    } else if (e.keyCode == RIGHT_ARROW) {
        rightPressed = true;
    }

	if (e.keyCode == UP_ARROW) {
		upPressed = true;
    }
});

document.addEventListener("keyup", function(e) {
    if (e.keyCode == LEFT_ARROW) {
        leftPressed = false;
    } else if (e.keyCode == RIGHT_ARROW) {
        rightPressed = false;
    }
	
	if (e.keyCode == UP_ARROW) {
		upPressed = false;
	}
});

for (let i = 0; i < cols; i++) {
	enemies[i] = [];
	for (let j = 0; j < rows; j++) {
		enemies[i][j] = new Enemy(enemy1, i * 40 + 40, j * 45 + 50, 30, 30);
	}
}

function Obj(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Obj.prototype.draw = function() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};

Obj.prototype.hits = function(obj) {
	if (this.x+this.w > obj.x && this.x < obj.x+obj.w && this.y+this.h > obj.y && this.y < obj.y+obj.h) {
		return true;
	} else {
		return false;
	}
};

function Enemy(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
	this.status = 1;
}

Enemy.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};

function dropEnemy() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			enemies[i][j].y += 20;
		}
	}
}

function resetEnemies() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			enemies[i][j].status = 1;
			enemies[i][j].x = i * 40 + 40;
			enemies[i][j].y = j * 45 + 50;
		}
	}
	
	if (moveAmount < 0) {
		moveAmount -= 3;
	} else {
		moveAmount += 3;
	}
}

function placeEnemies(end) {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (enemies[i][j].status === 1) {
				if (end) {
					enemies[i][j].x = i*40+60;
				} else {
					enemies[i][j].x = i*40+5;
				}
			}
		}
	}
}

var player = new Obj(spaceship, width / 2 - 37.5, height - 60, 75, 60);

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
	
	ctx.font = "30px VT323";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + score, 15, 35);
	ctx.fillText("Lives: " + lives, width-110, 35);
	
	if (lives <= 0) {
		alert("You Lose");
		document.location.reload();
	}
	
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (enemies[i][j].status === 1) {
				enemies[i][j].draw();
			}
			
			if (time%amount === 0 && enemies[i][j].img === enemy1) {
				enemies[i][j].img = enemy2;
			} else if (time%amount === 0 && enemies[i][j].img === enemy2) {
				enemies[i][j].img = enemy1;
			}
			
			for (let k = 0; k < bullets.length; k++) {
				if (bullets[k].hits(enemies[i][j]) && enemies[i][j].status === 1) {
					enemies[i][j].status = 0;
					bullets.splice(k, 1);
					score+=10;
					track++;
				}
			}
			
			if (track === cols*rows) {
				resetEnemies();
				track = 0;
				lives++;
			}
			
			if (enemies[i][j].status === 1) {
				if (enemies[i][j].x < 0) {
					moveAmount = abs(moveAmount);
					placeEnemies(false);
					dropEnemy();
				} else if (enemies[i][j].x > canvas.width-enemies[i][j].w) {
					moveAmount = -abs(moveAmount);
					placeEnemies(true);
					dropEnemy();
				}
				
				if (enemies[i][j].y > height-enemies[i][j].h) {
					resetEnemies();
					track = 0;
					lives--;
				}
			}
			
			if (time%amount === 0) {
				enemies[i][j].x += moveAmount;
			}
		}
	}

	for (let i = 0; i < bullets.length; i++) {
		bullets[i].draw();
		bullets[i].y-=4;
		
		if (bullets[i].y < -bullets[i].h *2) {
			bullets.splice(i, 1);
		}
	}
	
    player.draw();

    if (leftPressed) {
        player.x = constrain(player.x, 4.5, width - 79.5) - 4;
    } else if (rightPressed) {
        player.x = constrain(player.x, 4.5, width - 79.5) + 4;
    }
	
	if (upPressed && wait === 0) {
		bullets.push(new Obj(bullet, player.x+32.5, height-40, 10, 20));
		
		wait = 25;
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
