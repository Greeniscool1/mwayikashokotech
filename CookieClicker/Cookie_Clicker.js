var cookies = 0;
var CPS = 0;

var leftSection = document.getElementById("left_section");
var middleSection = document.getElementById("middle_section");
var rightSection = document.getElementById("right_section");

Game.title.onclick = function(newTitle) {
	var title = Game.title.innerHTML.replace(/'s bakery/gi, "");
	newTitle = prompt("What would you like the title of your bakery to be?", title);
	var test = newTitle.split('');
	
	if (test[test.length-1] == "s") {
		Game.title.innerHTML = newTitle + "' bakery";
	} else {
		Game.title.innerHTML = newTitle + "'s bakery";
	}
};

Game.cookie.onclick = function() {
	cookies += Game.increment;
};

var Cursor = new Building(0, Buildings.Cursor.name, Buildings.Cursor.cost, Buildings.Cursor.amount, Buildings.Cursor.increment, Buildings.Cursor);
var Grandma = new Building(1, Buildings.Grandma.name, Buildings.Grandma.cost, Buildings.Grandma.amount, Buildings.Grandma.increment, Buildings.Grandma);
var Farm = new Building(2, Buildings.Farm.name, Buildings.Farm.cost, Buildings.Farm.amount, Buildings.Farm.increment, Buildings.Farm);
var Mine = new Building(3, Buildings.Mine.name, Buildings.Mine.cost, Buildings.Mine.amount, Buildings.Mine.increment, Buildings.Mine);
var Factory = new Building(4, Buildings.Factory.name, Buildings.Factory.cost, Buildings.Factory.amount, Buildings.Factory.increment, Buildings.Factory);
var Bank = new Building(5, Buildings.Bank.name, Buildings.Bank.cost, Buildings.Bank.amount, Buildings.Bank.increment, Buildings.Bank);
var Temple = new Building(6, Buildings.Temple.name, Buildings.Temple.cost, Buildings.Temple.amount, Buildings.Temple.increment, Buildings.Temple);
var Wizard_Tower = new Building(7, Buildings["Wizard_Tower"].name, Buildings["Wizard_Tower"].cost, Buildings["Wizard_Tower"].amount, Buildings["Wizard_Tower"].increment, Buildings["Wizard_Tower"]);
var Shipment = new Building(8, Buildings.Shipment.name, Buildings.Shipment.cost, Buildings.Shipment.amount, Buildings.Shipment.increment, Buildings.Shipment, "Shipment");
var Alchemy_Lab = new Building(9, Buildings["Alchemy_Lab"].name, Buildings["Alchemy_Lab"].cost, Buildings["Alchemy_Lab"].amount, Buildings["Alchemy_Lab"].increment, Buildings["Alchemy_Lab"]);

for (let i = 0; i < buildingNames.length; i++) {
	var b = buildingObjects[i];
	
	rightSection.innerHTML += buildingButtons[i];
	
	buildingIds1.push(document.getElementById(buildingNames[i]));
	buildingIds2.push(document.getElementById(buildingNames[i] + "s"));
}

function handleElement(i, nam) {
	var b = eval(nam);
	
	if (cookies >= b.cost) {
		setInterval(function() {cookies += b.increment}, 1000);
	}

	eval(nam).buy(); 
	document.getElementById(buildingNames[i]).innerHTML = b.name.replace(/_/, " ") + "<br> Cost: " + b.cost + "<br> Amount of " + b.name.replace(/_/," ") + "s: " + b.amount;
}

function update() {
	if (cookies !== 1) {
		Game.cookies.innerHTML = floor(cookies) + " cookies";
	} else {
		Game.cookies.innerHTML = floor(cookies) + " cookie";
	}

	Game.CPS.innerHTML = "per second: " + CPS.toFixed(1);
	
	requestAnimationFrame(update);
}

update();
