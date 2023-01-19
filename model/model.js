

class Model {
    constructor(ctx) {

        // init du contexte
        this.ctx = ctx;

        // init du score
        this.score = new Score(this.ctx, 0);

        // init de la vairable définissant si on a perdu la partie
        this.gameLose = false;

        // init de la grille
        this.grille = new Grille();

        // init du bot
        this.bot = new Bot(this.ctx);

        // init teer
        this.teer = this.createTetromino();

        // init next tetromino
        this.next = this.createTetrominext();


        //this.addScore(1);
    }
    
    createTetrominext(){
        //create a tetromino with random X
        var next = genTet();
        
        return next;
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
        this.draw(this.getScore(), this.getBotActive(), this.grille, this.next);
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
        this.gameLose = this.grille.isLose(teer);
        return teer;
    }

    doTheMoveDown(){
        if(!this.gameLose){
            if (this.teer.doMoveDown(this.grille, this.score, this.next)) {
                this.gameLose = true;
            }
        }
    }

    doTheMoveDownInfinity(){
        if(!this.gameLose){
            if (this.teer.doMoveDownInfinity(this.grille, this.score, this.next)) {
                this.gameLose = true;
            }
        }
    }

    
}