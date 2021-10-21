/*
	ToDo:

	1. Survival Mode âœ”
	2. Gravity Clone
	3. Add Options to have as many lists as you want (up to 4) âœ”
	4. Please comment code to explain
*/

"use strict";
//Getting the elements via DOM (Document Object Model)
var game1Container = document.getElementById("game1Container");
var game1 = document.getElementById("game1");
var firstIndexProvider;
var game1StemProvider = document.getElementById("game1StemProvider");
var game1Input = document.getElementById("game1Input");
var game1Button = document.getElementById("game1Button");

var game2 = document.getElementById("game2")
var canvas = document.getElementById("game2Canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

var game2Input = document.getElementById("game2Input");
var game2Button = document.getElementById("game2Button");

var game2Score = 0;
var game2Level = 1;
var asteroidSlipped = false;
var game2Interval = 0;

var backButton = document.getElementById("backButton");
var helpButton = document.getElementById("helpButton");

var list1CheckBox = document.getElementById("list1");
var list2CheckBox = document.getElementById("list2");
var list3CheckBox = document.getElementById("list3");
var list4CheckBox = document.getElementById("list4");
/* var list5CheckBox = document.getElementById("list5");
var list6CheckBox = document.getElementById("list6");
var list7CheckBox = document.getElementById("list7");
var list8CheckBox = document.getElementById("list8");
var list9CheckBox = document.getElementById("list9"); */
var check = document.getElementById("check");

//I'm using all nine lists even though it's not required

var lists = [];

//The first list out of 9
var list1 = {
	list: [["ante", "before"], ["anti", "against"], ["bi", "two"], ["circum", "around"], ["com", "together"], ["con", "together"], ["de", "down"], ["dis", "away"], ["equi", "equal"], ["extra", "beyond"], ["inter", "between"], ["intra", "within"], ["intro", "into"], ["mal", "bad"], ["mis", "bad"], ["non", "not"], ["post", "after"], ["pre", "before"], ["semi", "half"], ["sub", "under"], ["super", "over"], ["syn", "together"], ["sym", "together"], ["tri", "three"], ["un", "not"]]
};

var list2 = {
	list: [["archy", "government"], ["ard", "always"], ["cide", "kill"], ["ician", "specialist"], ["itis", "inflammation"], ["aqua", "water"], ["audi", "hear"], ["bell", "war"], ["cap", "take"], ["cise", "cut"], ["bio", "life"], ["auto", "self"], ["port", "carry"], ["scrib", "write"], ["logy", "science"], ["dict", "say"], ["cred", "believe"], ["cent", "one hundred"], ["neo", "new"], ["ad", "to"], ["cede", "go"], ["miss", "send"], ["centri", "center"], ["biblio", "book"], ["anthropo", "man"]]
};

var list3 = {
	list: [["homo", "same"], ["spec", "look"], ["duct", "lead"], ["fer", "carry"], ["pend", "hang"], ["micro", "small"], ["hydro", "water"], ["photo", "light"], ["pan", "all"], ["penta", "five"], ["tele", "far"], ["vid", "look"], ["omni", "all"], ["ex", "out"], ["poly", "many"], ["re", "again"], ["hypo", "under"], ["psuedo", "false"], ["neuro", "nerve"], ["tomy", "cut"], ["hema", "blood"], ["proto", "first"], ["phon", "sound"], ["mono", "one"], ["viv", "life"]]
};

var list4 = {
	list: [["morph", "shape"], ["vest", "clothes"], ["bene", "good"], ["pond", "weight"], ["corp", "body"], ["dorm", "sleep"], ["pater", "father"], ["nov", "new"], ["punct", "point"], ["ject", "throw"], ["tion", "act or state"], ["loco", "place"], ["dox", "opinion"], ["amphi", "both"], ["magn", "great"], ["eu", "good"], ["endo", "within"], ["phobia", "fear"], ["ortho", "straight"], ["put", "think"], ["ver", "true"], ["matri", "mother"], ["mega", "large"], ["pop", "people"], ["sangui", "blood"]]
};

/* var list5 = {
	list: [["vita", "life"], ["demo", "people"], ["stereo", "solid"], ["ism", "doctrine"], ["cogn", "know"], ["sur", "over"], ["alter", "other"], ["astr", "star"], ["dyna", "power"], ["chron", "time"], ["hyper", "over"], ["luna", "moon"], ["octa", "eight"], ["gyro", "turn"], ["contra", "against"], ["geo", "earth"], ["helio", "sun"], ["thermo", "heat"], ["tetra", "four"], ["meter", "measure"], ["scope", "look"], ["son", "sound"], ["dec", "ten"], ["stell", "star"], ["amat", "love"]]
};

var list6 = {
	list: [["germ", "vital or related"], ["greg", "group"], ["mar", "sea"], ["prim", "first"], ["pyro", "fire"], ["clam", "cry out"], ["plu", "more"], ["tang", "touch"], ["string", "bind"], ["liber", "free"], ["junct", "join"], ["clud", "close"], ["se", "apart"], ["trib", "pay"], ["dign", "worthy"], ["luc", "light"], ["rupt", "break"], ["grat", "pleasing"], ["medi", "middle"], ["soph", "wisdom"], ["curr", "run"], ["tempor", "time"], ["migr", "wander"], ["trans", "across"], ["gamy", "marriage"]]
};

var list7 = {
	list: [["numer", "number"], ["fort", "strong"], ["osteo", "bone"], ["ornith", "bird"], ["polis", "city"], ["fus", "pour"], ["ego", "I"], ["spir", "breathe"], ["dia", "across"], ["acr", "sharp"], ["acro", "high"], ["culp", "blame"], ["derm", "skin"], ["zo", "animal"], ["per", "through"], ["pac", "peace"], ["brev", "short"], ["necro", "death"], ["urb", "city"], ["pugn", "fight"], ["ecto", "outer"], ["plasto", "molded"], ["agog", "leader"], ["cle", "small"], ["il", "not"]]
};

var list8 = {
	list: [["sed", "sit"], ["leg", "read"], ["anim", "mind"], ["tort", "twist"], ["nym", "name"], ["sanct", "holy"], ["meta", "change"], ["petr", "rock"], ["mir", "wonder"], ["man", "hand"], ["rect", "right"], ["volv", "roll"], ["demi", "half"], ["retro", "backward"], ["sens", "feel"], ["fy", "make"], ["ocul", "eye"], ["cur", "care for"], ["ultra", "beyond"], ["oid", "appearance"], ["gest", "carry"], ["apt", "fit"], ["tact", "touch"], ["voc", "voice"], ["rid", "laugh"]]
};

var list9 = {
	list: [["a", "not"], ["ambul", "walk"], ["ar", "relating to"], ["caco", "bad"], ["co", "together"], ["fid", "faith"], ["fin", "end"], ["fract", "break"], ["graph", "write"], ["hedron", "sided object"], ["hetero", "different"], ["hexa", "six"], ["in", "in or not"], ["ine", "nature of"], ["lat", "side"], ["lith", "rock"], ["nomy", "law"], ["ous", "full of"], ["path", "feeling"], ["phile", "love"], ["platy", "flat"], ["sci", "know"], ["theo", "god"], ["topo", "place"], ["tract", "pull"]]
}; */

lists.push(list1);
lists.push(list2);
lists.push(list3);
lists.push(list4);
/* lists.push(list5);
lists.push(list6);
lists.push(list7);
lists.push(list8);
lists.push(list9); */

var gameType;

//Game 1 variables

var game1CurrentSet = "";
var game1PreviousSet = "";
var game1CurrentStem = "";
var game1CurrentDefinition = "";
var game1Interval;
var game1Time = 15;
var game1Score = 0;
var game1KeyFired = false;

var asteroids = [];

var background = new Image();

background.src = "data:image/jpeg;base64,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";

var game2KeyFired = false;

//Gets a random variable
function random(min, max) {
	return Math.floor(Math.random() * (max-min+1)) + min;
}

//Makes it so you can press enter and it allows you to enter teh answer
document.addEventListener("keydown", function(e) {
	if (e.keyCode == 13 && gameType == 1 && !game1KeyFired) {
		game1Button.click();
		game1KeyFired = true;
	} else if (e.keyCode == 13 && gameType == 2 && !game2KeyFired) {
		game2Button.click();
		game2KeyFired = true;
	}
});

//Makes sure you can't span the enter key
document.addEventListener("keyup", function(e) {
	if (e.keyCode == 13 && gameType == 1) {
		game1KeyFired = false;
	} else if (e.keyCode == 13 && gameType == 2) {
		game2KeyFired = false;
	}
});

//The thing that makees the input and the button appear
game1.onclick = function() {
	game1.style.display = "none";
	game2.style.display = "none";

	game1StemProvider.style.display = "block";
	game1Input.style.display = "block";
	game1Button.style.display = "block";

	check.style.display = "none";

	backButton.style.display = "inline";
	helpButton.style.display = "none";

	getStem();
	setGame1Stuff();
	game1Interval = setInterval(updateGame1Time, 1000);
	gameType = 1;
};

game2.onclick = function() {
	game1.style.display = "none";
	game2.style.display = "none";

	canvas.style.display = "block";
	game2Input.style.display = "inline";
	game2Button.style.display = "inline";

	check.style.display = "none";

	backButton.style.display = "inline";
	helpButton.style.display = "none";

	getStem();
	game2Update();
	gameType = 2;
}

//Fetches new stem, resets timer, updates score
game1Button.onclick = function() {
	if (gameType === 1) {
		if (!check.checked) {
			if (game1Input.value == game1CurrentDefinition) {
				game1Time += 3;
				game1Score++;
				game1Input.value = "";
				game1PreviousSet = game1CurrentSet;
				getStem();
			} else {
				game1Time -= 7;
				game1Input.value = "";
				game1PreviousSet = game1CurrentSet;
				getStem();
			}
		} else {
			if (game1Input.value = game1CurrentStem) {
				game1Time += 2;
				game1Score++;
				game1Input.value = "";
				game1PreviousSet = game1CurrentSet;
				getStem();
			} else {
				game1Time -= 8;
				game1Input.value = "";
				game1PreviousSet = game1CurrentSet;
				getStem();
			}
		}
	}
};

game2Button.onclick = function() {
	if (!check.checked) {
		for (let i = 0; i < asteroids.length; i++) {
			if (game2Input.value == asteroids[i].stem[1] && asteroids[i].pos.y > 0) {
				game2Input.value = "";
				game2Score += 20;
				game2Level += 0.125;
				asteroids.splice(i, 1);
			}
		}
	} else if (check.checked) {
		for (let i = 0; i < asteroids.length; i++) {
			if (game2Input.value == asteroids[i].stem[0] && asteroids[i].pos.y > 0) {
				game2Input.value = "";
				game2Score += 20;
				game2Level += 0.125;
				asteroids.splice(i, 1);
			}
		}
	}

	game2Input.value = "";
};

//Button to go back to the main screen
backButton.onclick = function() {
	game1.style.display = "inline";
	game2.style.display = "inline";

	game1StemProvider.style.display = "none";
	game1Input.style.display = "none";
	game1Button.style.display = "none";

	canvas.style.display = "none";
	game2Input.style.display = "none";
	game2Button.style.display = "none";

	check.style.display = "inline";

	backButton.style.display = "none";
	helpButton.style.display = "inline";

	game1Time = 15;
	game1Score = 0;
	gameType = null;
	clearInterval(game1Interval);
	cancelAnimationFrame(game2Update);
	asteroids.length = 0;
	game2Score = 0;
	game2Level = 1;
};

//For those who need help (Everyone)
helpButton.onclick = function() {
	alert(`Thanks for picking my program!!! Let me explain the rules

Survival: So the rules of this game are fairly simple. You just answer the stem/definition. You can press enter to submit your answer to make it easier. Each answer you get correct adds 2 seconds to the timer and 1 point to the score. Each answer you get wrong removes 8 seconds to the timer and you won't get any points. The goal of the game is to get as many points as possible while trying to avoid running out of time. If you run out of time you will lose and you get to play the game again.

Gravity Clone: It's just Quizlet's Gravity game but better. But seriously asteroids come down from the top of the screen and you have to type the stem/definition, and if you get it right then the asteroid goes away and you get points. If you get it wrong then the asteroid stays until you destroy it and you lose points. If an asteroid manages to reach the bottom of the screen and it's blue then you just type in the definition. If the asteroid is red then you type in the definition and lose the game.`);
};

//Gets the stem
function getStem() {
	//Long and inefficient way of checking which lists to use
	if (list1CheckBox.checked && list2CheckBox.checked && list3CheckBox.checked && list4CheckBox.checked) {
		firstIndexProvider = random(0, 3);
	} else if (list1CheckBox.checked && !list2CheckBox.checked && !list3CheckBox.checked && !list4CheckBox.checked) {
		firstIndexProvider = 0;
	} else if (!list1CheckBox.checked && list2CheckBox.checked && !list3CheckBox.checked && !list4CheckBox.checked) {
		firstIndexProvider = 1;
	} else if (!list1CheckBox.checked && !list2CheckBox.checked && list3CheckBox.checked && !list4CheckBox.checked) {
		firstIndexProvider = 2;
	} else if (!list1CheckBox.checked && !list2CheckBox.checked && !list3CheckBox.checked && list4CheckBox.checked) {
		firstIndexProvider = 3;
	} else if (list1CheckBox.checked && list2CheckBox.checked && !list3CheckBox.checked && !list4CheckBox.checked) {
		firstIndexProvider = random(0, 1);
	} else if (list1CheckBox.checked && !list2CheckBox.checked && list3CheckBox.checked && !list4CheckBox.checked) {
		if (random(1, 2) < 2) {
			firstIndexProvider = 0;
		} else {
			firstIndexProvider = 2;
		}
	} else if (list1CheckBox.checked && !list2CheckBox.checked && !list3CheckBox.checked && list4CheckBox.checked) {
		if (random(1, 2) < 2) {
			firstIndexProvider = 0;
		} else {
			firstIndexProvider = 3;
		}
	} else if (!list1CheckBox.checked && list2CheckBox.checked && list3CheckBox.checked && !list4CheckBox.checked) {
		firstIndexProvider = random(1, 2);
	} else if (!list1CheckBox.checked && list2CheckBox.checked && !list3CheckBox.checked && list4CheckBox.checked) {
		if (random(1, 2) < 2) {
			firstIndexProvider = 1;
		} else {
			firstIndexProvider = 3;
		}
	} else if (!list1CheckBox.checked && !list2CheckBox.checked && list3CheckBox.checked && list4CheckBox.checked) {
		firstIndexProvider = random(2, 3);
	} else if (list1CheckBox.checked && list2CheckBox.checked && list3CheckBox.checked && !list4CheckBox.checked) {
		firstIndexProvider = random(0, 2);
	} else if (list1CheckBox.checked && list2CheckBox.checked && !list3CheckBox.checked && list4CheckBox.checked) {
		if (random(1, 2) < 2) {
			firstIndexProvider = random(0, 1);
		} else {
			firstIndexProvider = 3;
		}
	} else if (list1CheckBox.checked && !list2CheckBox.checked && list3CheckBox.checked && list4CheckBox.checked) {
		if (random(1, 2) < 2) {
			firstIndexProvider = 0;
		} else {
			firstIndexProvider = random(2, 3);
		}
	} else if (!list1CheckBox.checked && list2CheckBox.checked && list3CheckBox.checked && list4CheckBox.checked) {
		firstIndexProvider = random(1, 3);
	}

	game1CurrentSet = lists[firstIndexProvider]["list"][random(0, 24)];

	//These three if statements make sure there is variation between the lists
	if (game1CurrentSet == game1PreviousSet) {
		game1CurrentSet = lists[firstIndexProvider]["list"][random(0, 24)];
	}

	if (lists[firstIndexProvider]["list"].indexOf(game1PreviousSet) < 12 && lists[firstIndexProvider]["list"].indexOf(game1CurrentSet) < 12) {
		game1CurrentSet = lists[firstIndexProvider]["list"][random(12, 24)];
	}

	if (lists[firstIndexProvider]["list"].indexOf(game1PreviousSet) > 13 && lists[firstIndexProvider]["list"].indexOf(game1CurrentSet) < 13) {
		game1CurrentSet = lists[firstIndexProvider]["list"][random(0, 12)];
	}

	game1CurrentStem = game1CurrentSet[0];
	game1CurrentDefinition = game1CurrentSet[1];
}

//Updating everything
function setGame1Stuff() {
	if (!check.checked) {
		game1StemProvider.innerHTML = "Stem: " + game1CurrentStem + "<br> Score: " + game1Score + "<br>Time: " + game1Time;
	} else {
		game1StemProvider.innerHTML = "Stem: " + game1CurrentDefinition + "<br> Score: " + game1Score + "<br>Time: " + game1Time;
	}

	if (game1Time <= 0) {
		alert("You have lost the game. Your Score: " + game1Score);
		backButton.click();
	}

	requestAnimationFrame(setGame1Stuff);
}

function updateGame1Time() {
	game1Time--;
}

function map(e,t,n,r,i) {
	return r+(i-r)*((e-t)/(n-t));
}

function Vector(x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

function Asteroid(x, y, r, stem) {
	this.pos = new Vector(x, y);
	this.r = r;
	this.stem = stem;
	this.sides = random(10, 15);
	this.angle = 0;

	this.offset = [];

	this.determine = random(1, 15);

	if (this.determine < 15) {
		this.fill = "blue";
		//this.speed = .5;
		this.speed = game2Level/10;
	} else {
		this.fill = "red";
		//this.speed = .75;
		this.speed = game2Level/10;
	}

	this.setSpeed = this.speed;

	for (let i = 0; i < this.sides; i++) {
		this.offset[i] = random(-10, 10);
	}
}

Asteroid.prototype.draw = function() {
	ctx.save();
	ctx.beginPath();
	ctx.translate(this.pos.x, this.pos.y);
	ctx.rotate(this.angle, this.angle);
	ctx.fillStyle = this.fill;

	for (let i = 0; i < this.sides; i++) {
		var angle = map(i, 0, this.sides, 0, Math.PI*2);
		var r = this.r+this.offset[i];

		var x = r*Math.cos(angle);
		var y = r*Math.sin(angle);

		ctx.lineTo(x, y);
	}

	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.save();
	ctx.font = "30px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.translate(this.pos.x, this.pos.y+15);

	if (!check.checked) {
		ctx.fillText(this.stem[0], 0, 0);
	} else if (check.checked) {
		ctx.fillText(this.stem[1], 0, 0);
	}

	ctx.restore();
};

Asteroid.prototype.update = function() {
	this.angle += 0.01;
	this.pos.y += this.speed;
};

function game2Draw() {
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, width, height);
	ctx.drawImage(background, 0, 0, width, height);

	if (game2Interval%400 === 0) {
		asteroids.push(new Asteroid(random(100, width-100), -85, random(65, 85), lists[random(0, 3)]["list"][random(0, 24)]));
	}

	for (let i = 0; i < asteroids.length; i++) {
		asteroids[i].draw();
		asteroids[i].update();

		if (asteroids[i].pos.y > height+asteroids[i].r && asteroids[i].fill == "blue") {
			game2Score -= 100;
			asteroids.splice(i, 1);
		} else if (asteroids[i].pos.y > height+asteroids[i].r && asteroids[i].fill == "red") {
			alert("Your score was " + game2Score + ". Try Again!!! Stem: " + asteroids[i].stem[0] + ", Definition: " + asteroids[i].stem[1]);
			backButton.click();
			asteroids.splice(i, 1);
		}
	}

	ctx.font = "30px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + Math.round(game2Score), 10, 30);
	ctx.fillText("Level: " + Math.floor(game2Level), width-150, 30);
}

function game2Update() {
	if (gameType == 2) {
		game2Draw();
	}

	game2Interval++;

	requestAnimationFrame(game2Update);
}

game2Update();
