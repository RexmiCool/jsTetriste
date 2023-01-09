let colors = {
    1 : "#00ccff",
    2 : "#ffff00",
    3 : "#8c1aff",
    4 : "#0000ff",
    5 : "#ff9999",
    6 : "#009933",
    7 : "#cc0066",
}


let blocChain = [];
for (let i = 0; i < 24; i++) {
    blocChain[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

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
    if (e.code === "ArrowUp"){rotateRight()}
    else if (e.code === "ArrowDown"){rotateLeft()}
    else if (e.code === "ArrowRight"){moveRight()}
    else if (e.code === "ArrowLeft"){moveLeft()}
    else if (e.code === "Space"){moveDown()}
});

// fonction de déplacement du tetromino (peut etre les mettre dans model)
function rotateRight(){
    if (teer.getMatrixRotateRight()[0].length+teer.getLocX()>10) {
        return 0;
    }

    for (let i = 0; i < teer.getMatrixRotateRight().length; i++) {
        for (let j = 0; j < teer.getMatrixRotateRight()[i].length; j++) {
            if (teer.getMatrixRotateRight()[i][j]==1) {
                if (blocChain[teer.getLocY()+i][teer.getLocX()+j] != 0) {
                    if(matrix.length>i+1){
                        if (matrix[i][j]!=1) {
                            return 0;
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = 0;
            }
        }
    }	
    teer.rotateRight();
    matrix = teer.getMatrix();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = teer.getColor();
            }
        }
    }	
}

function rotateLeft(){
    if (teer.getMatrixRotateLeft()[0].length+teer.getLocX()>10) {
        return 0;
    }

    for (let i = 0; i < teer.getMatrixRotateLeft().length; i++) {
        for (let j = 0; j < teer.getMatrixRotateLeft()[i].length; j++) {
            if (teer.getMatrixRotateLeft()[i][j]==1) {
                if (blocChain[teer.getLocY()+i][teer.getLocX()+j] != 0) {
                    if(matrix.length>i+1){
                        if (matrix[i][j]!=1) {
                            return 0;
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = 0;
            }
        }
    }	
    teer.rotateLeft();
    matrix = teer.getMatrix();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = teer.getColor();
            }
        }
    }	
}

function moveRight(){
    if (matrix[0].length+teer.getLocX()>=10) {
        return 0;
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                if (blocChain[teer.getLocY()+i][teer.getLocX()+j+1] != 0) {
                    if(matrix[0].length>j+1){
                        if(matrix[i][j] != matrix[i][j+1]){
                            return 0;
                        }
                    }
                    else{
                        return 0;
                    }
                }
            }
        }
    }



    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = 0;
            }
        }
    }	
    teer.moveRight();
    matrix = teer.getMatrix();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = teer.getColor();
            }
        }
    }	
}

function moveLeft(){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                if (blocChain[teer.getLocY()+i][teer.getLocX()+j-1] != 0) {
                    if(matrix[0].length>j-1){
                        if(matrix[i][j] != matrix[i][j-1]){
                            return 0;
                        }
                    }
                    else{
                        return 0;
                    }
                }
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = 0;
            }
        }
    }	
    teer.moveLeft();
    matrix = teer.getMatrix();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = teer.getColor();
            }
        }
    }	
}

function moveDown(){
    var ok = true;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                if (teer.getLocY()+i >= 23) {
                    checkFullLine();
                    teer = createTetromino();
                    ok = false;
                    break;
                }
                else if (blocChain[teer.getLocY()+i+1][teer.getLocX()+j] != 0) {
                    if(matrix.length>i+1){
                        if(matrix[i][j] != matrix[i+1][j]){
                            checkFullLine();
                            teer = createTetromino();
                            ok = false;
                            break;
                        }
                    }
                    else{
                        checkFullLine();
                        teer = createTetromino();
                        ok = false;
                        break;
                    }
                }
            }
        }
    }
    if (ok) {
        makeMoveDown();
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                if (teer.getLocY()+i >= 23) {
                    checkFullLine();
                    teer = createTetromino();
                    break;
                }
                else if (blocChain[teer.getLocY()+i+1][teer.getLocX()+j] != 0) {
                    if(matrix.length>i+1){
                        if(matrix[i][j] != matrix[i+1][j]){
                            checkFullLine();
                            teer = createTetromino();
                            ok = false;
                            break;
                        }
                    }
                    else{
                        checkFullLine();
                        teer = createTetromino();
                        break;
                    }
                }
            }
        }
    }
}

function makeMoveDown(){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = 0;
            }
        }
    }	
    teer.moveDown();
    matrix = teer.getMatrix();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = teer.getColor();
            }
        }
    }	
}

function createTetromino(){
    let teer;
    do {
        teer = new Tetromino(Math.floor(Math.random() * (Math.floor(9) - Math.ceil(0))), 0, ctx, Math.floor(Math.random() * (Math.floor(7) - Math.ceil(1))) +  Math.ceil(1), Math.floor(Math.random() * (Math.floor(8) - Math.ceil(1))) +  Math.ceil(1));
        matrix = teer.getMatrix();
    } while (matrix[0].length + teer.getLocX() - 1 >= 10);
    
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                blocChain[teer.getLocY()+i][teer.getLocX()+j] = teer.getColor();
            }
        }
    }	

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]==1) {
                if (blocChain[teer.getLocY()+i+1][teer.getLocX()+j] != 0) {
                    if(matrix.length>i+1){
                        if(matrix[i][j] != matrix[i+1][j]){
                            alert("lose");
                        }
                    }
                    else{
                        alert("lose");
                    }
                }
            }
        }
    }

    return teer;
}
teer = createTetromino();

// verifie si une ligne est complete (a mettre dans model, de la grille je pense)
function checkFullLine(){
    for (let i = 0; i < blocChain.length; i++) {
        var lineFull = true;
        for (let j = 0; j < blocChain[i].length; j++) {
            if (blocChain[i][j]==0) {
                lineFull = false;
            }
        }
        if (lineFull) {
            cleanLine(i);
        }
    }	
}

// clean la ligne complete (a mettre dans model, de la grille je pense)
function cleanLine(numLine){
    let copy = [];
    for (let i = 0; i < 24; i++) {
        copy[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    for (let i = 0; i <= numLine; i++) {
        for (let j = 0; j < 10; j++) {
            copy[i][j] = blocChain[i][j];
            blocChain[i][j] = 0;
        }
    }

    for (let i = numLine; i > 0; i--) {
        blocChain[i] = copy[i-1];
    }

    score.add(1);

}

// fonction de dessin
function draw(){

    // nettoyage du canva
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	// mis a jour des dessins
    bg.draw();
    score.draw();
    bot.drawBtn();

    for (let i = 0; i < blocChain.length; i++) {
        for (let j = 0; j < blocChain[i].length; j++) {
            if (blocChain[i][j]!=0) {
                new Block(60+j*30, 90+i*30, ctx, colors[blocChain[i][j]]);
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
setInterval(moveDown, 1000);

