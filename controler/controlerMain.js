let colors = {
    1 : "#00ccff",
    2 : "#ffff00",
    3 : "#8c1aff",
    4 : "#ff9999",
    5 : "#0000ff",
    6 : "#cc0066",
    7 : "#009933",
}

var teer;
var next;

let grille = new Grille();

var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');

// creation du background
let bg = new Background(600, 900, ctx);


// creation du score
let score = new Score(ctx, 0);

// creation du bat
let bot = new Bot(ctx);

// event clavier
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp"){teer.doRotateRight(grille)}
    else if (e.code === "ArrowDown"){teer.doRotateLeft(grille)}
    else if (e.code === "ArrowRight"){teer.doMoveRight(grille)}
    else if (e.code === "ArrowLeft"){teer.doMoveLeft(grille)}
    else if (e.code === "Space"){teer.doMoveDown(grille, score)}
});

// fonction de déplacement du tetromino (peut etre les mettre dans model)


function createTetromino(){
    //create a tetromino with random X
    var teer = genTet();
    //insert tetromini in the grid
    grille.insertTetromino(teer);
    //verify if lose
    grille.isLose(teer);
    return teer;
}

teer = createTetromino();

// fonction de dessin
function draw(){

    // nettoyage du canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	// mis a jour des dessins
    bg.draw();
    score.draw();
    bot.drawBtn();

    for (let i = 0; i < grille.blocChain.length; i++) {
        for (let j = 0; j < grille.blocChain[i].length; j++) {
            if (grille.blocChain[i][j]!=0) {
                new Block(60+j*30, 90+i*30, ctx, colors[grille.blocChain[i][j]]);
            }
        }
    }	


    for (let i = 0; i < teer.getMatrixOriginal().length; i++) {
        for (let j = 0; j < teer.getMatrixOriginal()[i].length; j++) {
            if (teer.getMatrixOriginal()[i][j]==1) {
                new Block(405+j*30, 135+i*30, ctx, colors[teer.getColor()]);
            }
        }
    }	

}

// gestion du click pour le btn du bot
canvas.onclick = function(event) {
    bot.click(event, canvas);
}

// appel a draw toutes les x millisecondes
setInterval(draw, 10);

// appel a moveDown toute les x milliseconde
//setInterval(teer.doMoveDown(grille, score), 1000);
setInterval(doTheMoveDown, 1000);

function doTheMoveDown(){
    teer.doMoveDown(grille, score);
}