
var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

// creation du background
let bg = new Background(600, 900, ctx);

let ter = new Block(222, 222, ctx, "#FF0000");

function draw(){

	

}

setInterval(draw, 10);

