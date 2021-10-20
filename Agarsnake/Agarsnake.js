var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var r = 20;
var x = canvas.width/2;
var y = canvas.height/2;
var hx = x-r;
var hy = y-r;
var speedX = r/10;
var speedY = 0;
var food = []; 
var colors = ["red", "blue", "purple", "green", "white", "orange", "brown", "cyan", "gold", "fuchsia", "crimson", "tomato", "coral", "orangered", "darkorange", "khaki", "tan", "wheat"];
var number = Math.floor(Math.random()*colors.length);
var foodAmount = 150;
var score = 0;
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", d);

function d(e) {

	if(e.keyCode == 37) {

		speedX=-r/10;

		speedY=0;

	} else if (e.keyCode == 39) {

		speedX=r/10;

		speedY=0;


	} else if (e.keyCode == 38) {

		speedY=-r/10;

		speedX=0;

	} else if (e.keyCode == 40) {

		speedY=r/10;

		speedX = 0;

	}

} 

function dist(x1, y1, x2, y2) {
	
	var a = x1-x2;
	var b = y1-y2;
	
	var c = Math.sqrt(a*a + b*b);
	
	return c;
	
}

function drawBall() {

	ctx.beginPath();
	ctx.fillStyle = colors[number];
	ctx.arc(x, y, r, 0, Math.PI*2);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();

}

function drawFood() {

	var fr = Math.floor(Math.random()*2)+4;
	var fx = Math.floor(Math.random() * (canvas.width-r)) + r;
	var fy = Math.floor(Math.random() * (canvas.height-r)) + r;
	var f = Math.floor(Math.random()*colors.length);
	var fi = colors[f];

	if (food.length <= foodAmount && fx > fr*4 && fx < canvas.width-fr*4 && fy > fr*4 && fy < canvas.height-fr*4) {

		food.push({"x": fx, "y": fy, "r": fr, "fill": fi});

	}

}

function trackFood() {

	drawFood();

	for (var i = 0; i < food.length; i++) {

		var b = food[i];

		ctx.beginPath();
		ctx.fillStyle = b.fill;
		ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();

		if (dist(x, y, b.x, b.y) < r+b.r) {

			food.splice(i, 1);
			r+=(b.r)/(r*2.5);
			score+=2;

		}

	}

}

function drawText() {

	var pi = 3.14;
	var diameter = Math.round(r*2);
	var area = Math.round(pi*Math.pow(r, 2))/100;
	var circumference = Math.round(pi*diameter)/10;

	ctx.font = "17px Arial";
	ctx.fillStyle = "rgba(0, 255, 0, 0.75)";
	ctx.fillText("Score: " + score, 10, 17);
	ctx.fillText("Area: " + area + "cm", 10, 39);
	ctx.fillText("Circumference: " + circumference + "cm", 10, 59);

}

function draw() {

	ctx.clearRect(-10, -10, canvas.width+10, canvas.height+10);

	trackFood();
	drawBall();
	drawText();

	x+=speedX;
	y+=speedY;

	if (x-r < 0 || x+r > canvas.width || y-r < 0 || y+r > canvas.height) {

		document.location.reload();

	}


}

function update() {

	draw();

	requestAnimationFrame(update);

}

update();
