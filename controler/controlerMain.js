
var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

// creation du background
let bg = new Background(600, 900, ctx);

// creation du score
let score = new Score(ctx, 0);


function draw(){

    // nettoyage du canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	// mis a jour des dessins
    bg.draw();
    score.draw();
    
    // incrementation du score
    score.add(25);

}

// appelle draw toutes les x millisecondes
setInterval(draw, 1000);

