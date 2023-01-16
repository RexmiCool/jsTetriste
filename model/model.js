

class Model {
    constructor(ctx) {

        // init du contexte
        this.ctx = ctx;

        // init du score
        this.score = new Score(this.ctx, 0);

        // init de la grille
        this.grille = new Grille();

        // init du bot
        this.bot = new Bot(this.ctx);

        // init teer
        this.teer = this.createTetromino();
        console.log(this.teer);

        // init next tetromino
        

        this.addScore(1);
    }


    addScore (nb) {
        this.score.add(nb);
    }

    getScore(){
        return this.score.getScoreNb();
    }

    getBotActive(){
        return this.bot.getEtat();
    }

    drawCanva(){
        this.draw(this.getScore(), this.getBotActive(), this.grille, this.teer);
    }

    bindDrawCanva(callback){
        this.draw = callback;
    }


    createTetromino(){
        //create a tetromino with random X
        var teer = genTet();
        //insert tetromini in the grid
        this.grille.insertTetromino(teer);
        //verify if lose
        this.grille.isLose(teer);
        return teer;
    }

    doTheMoveDown(){
        console.log(this.teer);
        this.teer.doMoveDown(this.grille, this.score);
    }

    
}