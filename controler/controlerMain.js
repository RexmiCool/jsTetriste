
var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

// creation du background
let bg = new Background(600, 900, ctx);

let ter = new Block(222, 222, ctx, "#FF0000");

// creation du score
let score = new Score(ctx, 0);

// creation du bat
let bot = new Bot(ctx);

// fonction de dessin
function draw(){

    // nettoyage du canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	// mis a jour des dessins
    bg.draw();
    score.draw();
    bot.drawBtn();
    
}

// gestion du click pour le btn du bot
canvas.onclick = function(event) {
    bot.click(event, canvas);
}

// appelle draw toutes les x millisecondes
setInterval(draw, 10);

