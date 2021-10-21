"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//movement variables
var leftPressed = false; 
var rightPressed = false;
var upPressed = false;
var jumping = false;

//enemies in the game
var enemies = [];

document.addEventListener("keydown", function (e) { 
    if (e.keyCode == 37) { 
		leftPressed = true; 
    } else if (e.keyCode == 39) { 
		rightPressed = true; 
    } 
	
	if (e.keyCode == 38) {
		upPressed = true;
	}
}); 
 
document.addEventListener("keyup", function (e) { 
    if (e.keyCode == 37) { 
		leftPressed = false; 
    } else if (e.keyCode == 39) { 
		rightPressed = false; 
    } 
	
	if (e.keyCode == 38) {
		upPressed = false;
	}
}); 

//left floor
var floor1 = new Obj(-50, height-20, width/4+100, 20, "#333", false);
//right floor
var floor2 = new Obj(floor1.x+floor1.w+150, height-20, width/4+100, 20, "#333", false);
//The left platform located near the bottom
var platform1 = new Obj(-20, height-140, 170, 20, "#333", false);
//The right platform located near the bottom
var platform2 = new Obj(width-150, height-140, 170, 20, "#333", false);
//The center platform
var platform3 = new Obj(width/2-80, height/2, 180, 20, "#333", false);
//The player
var player = new Obj(width/4, height-40, 20, 20, "#00F", false);

enemies.push(new Obj(platform1.x+platform1.w/2, platform1.y-20, 20, 20, "#F00", true));
enemies.push(new Obj(platform2.x+platform2.w/2, platform2.y-20, 20, 20, "#F00", true));
enemies[0].velX = -2;
enemies[1].velX = 2;

function draw() { 
    ctx.fillStyle = "black"
    ctx.fillRect(-100, -100, width+200, height+200);
	
	floor1.draw();
	floor2.draw();
	platform1.draw();
	platform2.draw();
	platform3.draw();
	
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].draw();
		enemies[i].update();
		
		if (enemies[i].x < -enemies[i].w) {
			enemies[i].x = width+enemies[i].w;
		} else if (enemies[i].x > width+enemies[i].w) {
			enemies[i].x = -enemies[i].w;
		}
		
		//collision with enemies
		if (enemies[i].hits(floor1)) {
			enemies[i].velY = 0;
			enemies[i].y = floor1.y-enemies[i].h;
		} else if (enemies[i].hits(floor2)) {
			enemies[i].velY = 0;
			enemies[i].y = floor2.y-enemies[i].h;
		} else if (enemies[i].hits(platform1)) {
			if (enemies[i].y+enemies[i].h < platform1.y+platform1.h/2) {
				enemies[i].velY = 0;
				enemies[i].y = platform1.y-enemies[i].h;
			} else {
				enemies[i].velY += enemies[i].gravity;
				enemies[i].y = platform1.y+platform1.h;
			}
		} else if (enemies[i].hits(platform2)) {
			if (enemies[i].y+enemies[i].h < platform2.y+platform2.h/2) {
				enemies[i].velY = 0;
				enemies[i].y = platform2.y-enemies[i].h;
			} else {
				enemies[i].velY += enemies[i].gravity;
				enemies[i].y = platform2.y+platform2.h;
			}
		} else if (enemies[i].hits(platform3)) {
			if (enemies[i].y+enemies[i].h < platform3.y+platform3.h/2) {
				enemies[i].velY = 0;
				enemies[i].y = platform3.y-enemies[i].h;
			} else {
				enemies[i].velY += enemies[i].gravity;
				enemies[i].y = platform3.y+platform3.h;
			}
		}
		
		if (enemies[i].y+enemies[i].h > height) {
			enemies[i].y =  -enemies[i].h;
		}
		
		for (let j = 0; j < enemies.length; j++) {
			if (enemies[i].hits(enemies[j]) && enemies[i] !== enemies[j]) {
				enemies[j].velX *= -1;
			}
		}
	}
	
	player.draw();
	player.update();
	
	//collision
	if (player.hits(floor1)) {
		player.velY = 0;
		player.y = floor1.y-player.h;
		jumping = false;
	} else if (player.hits(floor1)) {
		player.velY = 0;
		player.y = floor2.y-player.h;
		jumping = false;
	} else if (player.hits(platform1)) {
		if (player.y+player.h < platform1.y+platform1.h/2) {
			player.velY = 0;
			player.y = platform1.y-player.h;
			jumping = false;
		} else {
			upPressed = false;
			player.velY += player.gravity;
			player.y = platform1.y+platform1.h;
		}
	} else if (player.hits(platform2)) {
		if (player.y+player.h < platform2.y+platform2.h/2) {
			player.velY = 0;
			player.y = platform2.y-player.h;
			jumping = false;
		} else {
			upPressed = false;
			player.velY += player.gravity;
			player.y = platform2.y+platform2.h;
		}
	} else if (player.hits(platform3)) {
		if (player.y+player.h < platform3.y+platform3.h/2) {
			player.velY = 0;
			player.y = platform3.y-player.h;
			jumping = false;
		} else {
			upPressed = false;
			player.velY += player.gravity;
			player.y = platform3.y+platform3.h;
		}
	} else {
		jumping = true;
	}
	
	if (player.y+player.h > height) {
		player.y =  -player.h;
	}
	
	//movement
	if (leftPressed) {
		player.velX = -4;
	} else if (rightPressed) {
		player.velX = 4;
	}
	
	//Like a mario jumping style
	if (!jumping) {
		if (upPressed) {
			player.velY = -10;
		}
	}
	
	//Also jumping
	if (jumping && !upPressed) {
		player.velY += player.gravity;
	}
	
	//Makes it so that the player wraps around the screen
	if (player.x < -player.w) {
		player.x = width;
	} else if (player.x > width+player.w) {
		player.x = -player.w;
	}
}

function update() { 
    draw();

    requestAnimationFrame(update);
}

update();
