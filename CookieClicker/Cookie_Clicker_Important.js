var buildingNames = [];
var buildingIds1 = [];
var buildingIds2 = [];
var buildingButtons = [];
var buildingObjects = [];

var Game = {
	cookie: document.getElementById("cookie"),
	cookies: document.getElementById("cookies"),
	CPS: document.getElementById("CPS"),
	increment: 1,
	title: document.getElementById("title"),
};

var Buildings = {
	Cursor: {
		name: "Cursor",
		cost: 15,
		amount: 0,
		increment: 0.1,
	},
	
	Grandma: {
		name: "Grandma",
		cost: 100,
		amount: 0,
		increment: 1,
	},
	
	Farm: {
		name: "Farm",
		cost: 1100,
		amount: 0,
		increment: 8,
	},
	
	Mine: {
		name: "Mine",
		cost: 12000,
		amount: 0,
		increment: 47,
	},
	
	Factory: {
		name: "Factory",
		cost: 130000,
		amount: 0,
		increment: 260,
	},
	
	Bank: {
		name: "Bank",
		cost: 1400000,
		amount: 0,
		increment: 1400,
	},
	
	Temple: {
		name: "Temple",
		cost: 20000000,
		amount: 0,
		increment: 7800,
	},
	
	Wizard_Tower: {
		name: "Wizard_Tower",
		cost: 330000000,
		amount: 0,
		increment: 44000,
	},
	
	Shipment: {
		name: "Shipment",
		cost: 5100000000,
		amount: 0,
		increment: 260000,
	},
	
	Alchemy_Lab: {
		name: "Alchemy_Lab",
		cost: 75000000000,
		amount: 0,
		increment: 1600000,
	},
};

function Building(place, name, cost, amount, increment, object) {
	this.place = place;
	this.name = name;
	this.cost = cost;
	this.amount = amount;
	this.increment = increment;
	this.object = object;
	
	buildingObjects.push(this.object);
	buildingNames.push(this.name);
	buildingButtons.push("<button onclick='handleElement(" + this.place + ", " + buildingNames[this.place] + ");' id=" + this.name + " style='float: right; margin-top: 5px; padding: auto; display: inline-block; width: 55%; border: solid black 1px; display: inline-block;'> <span id=" + this.name + "s>" + this.name.replace(/_/, " ") + "<br> Cost: " + this.cost + "<br> Amount of " + this.name.replace(/_/, " ") + "s: " + this.amount + "</span>" + "</span> </button>");
}

Building.prototype.buy = function() {
	if (cookies >= this.cost) {
		cookies -= this.cost;
		this.cost *= 1.15;
		this.cost = ceil(this.cost);
		CPS += this.increment;
		this.amount++;
	}
};
