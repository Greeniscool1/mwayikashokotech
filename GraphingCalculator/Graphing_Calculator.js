"use strict";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const graphWidth = width/20;
const graphHeight = height/20;

ctx.scale(20, 20);

var func = document.getElementById("function");

function drawLines() {
	for (let i = 0; i < graphWidth; i++) {
		ctx.beginPath();
		ctx.lineWidth = 1/20;
		ctx.strokeStyle = "black";
		ctx.moveTo(0, i);
		ctx.lineTo(graphWidth, i);
		ctx.moveTo(i, 0);
		ctx.lineTo(i, graphHeight);
		ctx.stroke();
		ctx.closePath();
	}
	
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2.5/20;
	ctx.moveTo(0, graphHeight/2);
	ctx.lineTo(graphWidth, graphHeight/2);
	ctx.moveTo(graphWidth/2, 0);
	ctx.lineTo(graphWidth/2, graphHeight);
	ctx.stroke();
	ctx.closePath();
}

drawLines();

function graph() {
	ctx.fillStyle = "blue";
	ctx.clearRect(0, 0, graphWidth, graphHeight);
	
	drawLines();

	ctx.save();
	ctx.translate(graphWidth/2, graphHeight/2);
	
	for (let x = -20; x < graphHeight; x+=1/20) {
		if (x > -10 && x < graphWidth) {
			ctx.fillRect(x, eval(func.value) * -1, 2/20, 2/20);
		}
	}
	
	ctx.restore();
}
