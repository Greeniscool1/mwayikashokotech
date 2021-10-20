var html_ans = document.getElementById("ans");
var rad = document.getElementById("button_rad");
var deg = document.getElementById("button_deg");
var button_cover = document.getElementById("button_cover")
var input = document.getElementById("input");

var s = "";

var radCheck = false;
var ans = 0;

var sin = Math.sin;
var ln = Math.log;
var cos = Math.cos;
var log = Math.log10;
var tan = Math.tan;
var Exp = Math.exp;

function factorial(num) {
	num = Math.round(num);

	if (num == 1 || num == 0) {
		return 1;
	}

	return num * factorial(num-1);
}

function check() {
	input.innerText = input.innerText.replace(/π/gi, Math.PI);
	input.innerText = input.innerText.replace(/e/g, Math.E);
	input.innerText = input.innerText.replace(/√/gi, "Math.sqrt");
	input.innerText = input.innerText.replace(/Ans/gi, ans);
	input.innerText = input.innerText.replace(/\^/gi, '**');

	if (Number.isInteger(eval(input.innerText))) {
		input.innerText = eval(input.innerText)
	} else if (!Number.isInteger(eval(input.innerText))) {
		input.innerText = eval(input.innerText).toFixed(11);

		while (input.innerText.endsWith("0")) {
			s = input.innerText.split("");
			s.splice(s.length-1, 1);		
			s = s.join("");
			input.innerText = s;
		}
	}

	ans = input.innerText;
	html_ans.innerText = "ans = " + ans;
}
