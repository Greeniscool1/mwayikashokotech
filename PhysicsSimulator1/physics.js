"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gravity = document.getElementById("gravity");
var stalk = document.getElementById("stalk");
var stats = document.getElementById("stats");
var bounce = document.getElementById("bounce");
var velX = document.getElementById("velocity-X");
var velY = document.getElementById("velocity-Y");
var wallCollision = document.getElementById("wall-collision");
var ballCollision = document.getElementById("ball-collision");
var positionVector = document.getElementById("position-vector");
var platformTrue = document.getElementById("platform");
var platX = document.getElementById("plat-x");
var platY = document.getElementById("plat-y");
var platW = document.getElementById("plat-w");
var platH = document.getElementById("plat-h");
const width = canvas.width;
const height = canvas.height;

var balls = [];
var ballVelX = [];
var colors = ["blue", "black", "red", "orange", "lime", "green", "yellow"];
var platform = [];

canvas.addEventListener("dragenter", d);

function d(e) {
	var mouseX = e.clientX;
	var mouseY = e.clientY;
	
	for (let i = 0; i < balls.length; i++) {
			balls[i].pos.x = mouseX;
	}
}

for (let i = 0; i < 10; i++) {
	balls.push(new Ball(random(0, width), random(0, height), random(10, 20), 0, 0, colors[random(0, colors.length-1)]));
	ballVelX.push(balls[i].vel.x);
}

function reset() {
	balls.length = 0;
	ballVelX.length = 0;
	
	for (let i = 0; i < 10; i++) {
		balls.push(new Ball(random(0, width), random(0, height), random(10, 20), 0, 0, 0, colors[random(0, colors.length-1)]));
		ballVelX.push(balls[i].vel.x);
	}
}

function draw() { 
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, width, height);
	
	for (let i = 0; i < balls.length; i++) {
		balls[i].gravity = gravity.value*1;
		balls[i].bounce = bounce.value*1;
		balls[i].draw();
		balls[i].update();
		
		if (wallCollision.checked) {			
			if (balls[i].pos.y+balls[i].r > height) {
				balls[i].pos.y = height-balls[i].r;
				balls[i].vel.y = -(balls[i].vel.y * balls[i].bounce);
			} else if (balls[i].pos.y-balls[i].r < 0) {
				balls[i].pos.y = balls[i].r;
				balls[i].vel.y = +(-balls[i].vel.y * balls[i].bounce);
			}
			
			if (balls[i].pos.x+balls[i].r > width) {
				balls[i].vel.x = -Math.abs(balls[i].vel.x);
			} else if (balls[i].pos.x-balls[i].r < 0) {
				balls[i].vel.x = Math.abs(balls[i].vel.x);
			}
		} else {
			if (balls[i].pos.y-balls[i].r > height) {
				balls[i].pos.y = -balls[i].r;
			} else if (balls[i].pos.y+balls[i].r < 0) {
				balls[i].pos.y = height+balls[i].r;
			}
			
			if (balls[i].pos.x-balls[i].r > width) {
				balls[i].pos.x = -balls[i].r;
			} else if (balls[i].pos.x+balls[i].r < 0) {
				balls[i].pos.x = width+balls[i].r;
			}
		}
		
		if (ballCollision.checked) {
			for (let j = 0; j < balls.length; j++) {
				if (balls[i].hits(balls[j]) && balls[i] !== balls[j]) {
					let a = balls[i].pos.x-balls[j].pos.x; 
					let b = balls[i].pos.y-balls[j].pos.y;
					
					let mouse = Math.atan2(b, a);
					
					balls[i].vel.x=-balls[i].vel.x;
					
					balls[i].vel.y = Math.sin(mouse);
				}
			}
		}
		
		if (positionVector.checked) {
			balls[i].lines();
		}
	
		if (platformTrue.checked) {
			platX.disabled = false;
			platY.disabled = false;
			platW.disabled = false;
			platH.disabled = false;
				
			platform = new Platform(platX.value*1, platY.value*1, platW.value*1, platH.value*1, "black");
			
			platform.draw();
		} else {
			platX.disabled = true;
			platY.disabled = true;
			platW.disabled = true;
			platH.disabled = true;
		}
	
		if (platformTrue.checked) {
			if (platform.hits(balls[i])) {
				if (balls[i].pos.y+balls[i].r > platform.y && balls[i].pos.y+balls[i].r < platform.y+platform.h/4) {
					balls[i].pos.y = platform.y-balls[i].r;
					balls[i].vel.y = -(balls[i].vel.y * balls[i].bounce);
				} else if (balls[i].pos.y-balls[i].r < platform.y+platform.h && balls[i].pos.y-balls[i].r > platform.y+platform.h-platform.h/4) {
					balls[i].pos.y = platform.y+platform.h+balls[i].r;
					balls[i].vel.y = -(balls[i].vel.y * balls[i].bounce);
				}
				
				if (balls[i].pos.x+balls[i].r > platform.x && balls[i].pos.x+balls[i].r < platform.x+platform.w/4) {
					balls[i].vel.x = -Math.abs(balls[i].vel.x);
				} else if (balls[i].pos.x-balls[i].r < platform.x+platform.w && balls[i].pos.x-balls[i].r > platform.x+platform.w-platform.w/4) {
					balls[i].vel.x = Math.abs(balls[i].vel.x);
				}
			}
		}
	}
	
	if (stalk.value > -1 && stalk.value < 10) {
		stats.innerHTML = "X: " + balls[stalk.value*1].pos.x + ", Y: " + balls[stalk.value*1].pos.y.toFixed(2) + ", VelX: " + balls[stalk.value*1].vel.x.toFixed(2) + ", VelY: " + balls[stalk.value*1].vel.y.toFixed(2) + ", Radius: " + balls[stalk.value*1].r;
	}
} 

function update() { 
    draw();
	
	requestAnimationFrame(update);
}

update();
