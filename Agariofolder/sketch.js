/************
TODO:

✓Player slowly loses mass when the radius is at least 100
Add spliting feature
Add viruses
✓Add mass at the center of the player
Add bots
Add eating bots
Add eating viruses
✓Add ejecting
Add merging
Add zoom out feature
************/

"use strict";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//defines grid width and height
const gridWidth = 1000;
const gridHeight = 1000;
//defines amount of food for the game to have
let foodAmount = 1000;
let food = [];
let colors = ["red", "green", "blue", "yellow", "cyan", "purple", "magenta", "lime", "#c4b789"];
let playerIncrement;

let mouseX = 0;
let mouseY = 0;
let mouse;

let cFont = ctx.font;
let fontArgs = cFont.split(' ');
let newSize = 10;

let speed = 0.3;

let mass = [];
let viruses = [];

let wPressed = false;

let player;

document.addEventListener("mousemove", m);
document.addEventListener("keydown", d);
document.addEventListener("keyup", u);

function d(e) {
	if (e.keyCode == 87) {
		wPressed = true;
	}
}

function u(e) {
	if (e.keyCode == 87) {
		wPressed = false;
	}
}

function m(e) {
	mouseX=e.clientX;
	mouseY=e.clientY;
	
	mouseX-=player.pos.x;
	mouseY-=player.pos.y;
	
	mouse=Math.atan2(mouseY, mouseX);
}

player = new Cell(random(15, width-15), random(15, height-15), 15, colors[random(0, colors.length-1)]);
ctx.translate(-player.pos.x+width/2, -player.pos.y+height/2);

for (let i = 0; i < foodAmount; i++) {
	food.push(new Food(random(0, gridWidth), random(0, gridHeight), random(2, 4), colors[random(0, colors.length-1)]));
}

for (let i = 0; i < 10; i++) {
	viruses[i] = new Virus(random(50, gridWidth-50), random(50, gridHeight-50), 30, "lime");
}

function draw() { 
    ctx.fillStyle = "black";
    ctx.fillRect(-1000, -1000, gridWidth+2000, gridHeight+2000);
	ctx.strokeStyle = "purple";
	ctx.strokeRect(0, 0, gridWidth, gridHeight);
	
	speed = player.r/200;
	
	if (speed >= 0.5) {
		speed = 0.5;
	}
	
	for (let i = 0; i < food.length; i++) {
		food[i].draw();
		
		if (player.hits(food[i])) {
			food.splice(i, 1);
			food.push(new Food(random(0, gridWidth), random(0, gridHeight), random(2, 4), colors[random(0, colors.length-1)]));
			player.r+=food[i].r/player.r;
		}
	}
	
	for (let i = 0; i < mass.length; i++) {
		let b = mass[i];
			
		mass[i].draw();
			
		if (player.hits(mass[i])) {
			player.r+=mass[i].r*0.6;
			mass.splice(i, 1);
		}
			
		if (b.pos.x < 0) {
			b.pos.x = 0;
		} else if (b.pos.x > width) {
			b.pos.x = width-b.r;
		}
			
		if (b.pos.y < 0) {
			b.pos.y = 0;
		} else if (b.pos.y > height) {
			b.pos.y = height-b.r;
		}
			
		for (let j = 0; j < viruses.length; j++) {
			if (mass[i].hits(viruses[j])) {
				viruses[j].r+=mass[i].r*0.8;
				mass.splice(i, 1);
			}
		}
	}
	
	if (wPressed /* && player.r > 30*/) {
		mass.push(new Mass(player.pos.x - player.r * 4 * (-Math.cos(mouse)), player.pos.y-player.r * 4 * (-Math.sin(mouse)), 5, player.fill, 2, 2));
		//player.r-=5;
	}
	
	player.draw();
	
	ctx.fillStyle = "black";
	ctx.font = newSize + 'px' + ' ' + fontArgs[fontArgs.length - 1];
	ctx.fillText(player.r.toFixed(0), player.pos.x-player.r*0.5, player.pos.y+player.r*0.25);
	
	for (let i = 0; i < viruses.length; i++) {
		viruses[i].draw();
	}
	
	newSize=player.r*0.75;
	
	if (player.pos.y < player.r) {
		player.pos.y = player.r;
	} else if (player.pos.y > gridHeight-player.r) {
		player.pos.y = gridHeight-player.r;
	}
	
	if (player.pos.x < player.r) {
		player.pos.x = player.r;
	} else if (player.pos.x > gridWidth-player.r) {
		player.pos.x = gridWidth-player.r;
	}
	
	if (player.r*1.25 > 100) {
		player.r-=0.05;
	}
	
	mouse = Math.atan2(mouseY, mouseX);
	
	player.pos.x+=Math.cos(mouse)/speed;
	player.pos.y+=Math.sin(mouse)/speed;
	
	if (player.pos.x > player.r && player.pos.x+player.r < gridWidth) {
		ctx.translate(-Math.cos(mouse)/speed, 0);
	} 
	
	if (player.pos.y > player.r && player.pos.y+player.r < gridHeight) {
		ctx.translate(0, -Math.sin(mouse)/speed);
	}
} 

function update() { 
    draw();

    requestAnimationFrame(update);
}

update();
