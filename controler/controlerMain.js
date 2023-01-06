
var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

// creation du background
let bg = new Background(600, 900, ctx);

function draw(){

	ctx.beginPath();
	ctx.rect(20, 40, 300, 720);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();

}

setInterval(draw, 10);

