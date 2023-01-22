

class Model {
    constructor() {

        // init du score
        this.score = new Score(0);

        // init de la vairable définissant si on a perdu la partie
        this.gameLose = false;

        // init de la grille
        this.grille = new Grille();

        // init du bot
        this.bot = new Bot();

        // init teer
        this.teer = this.createTetromino();

        // init next tetromino
        this.next = this.createTetrominext();


        //this.addScore(1);
    }

    
    // gestion du click sur le btn
    click(e, canvas){
        if (this.gameLose) {
            this.gameLose=false;
            this.score.scoreNb = 0;
            this.grille = new Grille();
            this.teer = this.createTetromino();
            this.next = this.createTetrominext();
        }
    }

    defTimeOut(){
        this.doTheMoveDown();
        setTimeout(this.defTimeOut.bind(this), this.score.scoreNb<200 ? 1000-this.score.scoreNb*3 : 400);
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
        this.draw(this.getScore(), this.getBotActive(), this.grille, this.next, this.gameLose);
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
            this.grille.deleteTetromino(this.teer);

            if (this.bot.active) {
                var hmaxpc = [24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
                var nbtrou = 0;
                for (let i = 0; i < this.grille.blocChain.length; i++) {
                    for (let j = 0; j < this.grille.blocChain[i].length; j++) {
                        if (this.grille.blocChain[i][j] != 0) {
                            hmaxpc[j] = hmaxpc[j] > i ? i : hmaxpc[j];
                        }
                        
                        if (this.grille.blocChain[i][j] == 0 && i > 0) {
                            if (this.grille.blocChain[i-1][j] != 0) {
                                nbtrou++;
                            }
                        }
                    }
                }

                var hmax = Math.min.apply(Math, hmaxpc);
                var hs = -100000;
                var hsX = 0;
                var hsOr = 0;

                for (let col = 0; col < 10; col++) {
                    for (let or = 1; or <= 4; or++) {
                        
                        var possible = false;
                        var posPoss = hmaxpc[col];
                        do {
                            posPoss--;
                            possible =this.grille.isTetrominoInserable(this.teer, col, posPoss, or);
                        } while (!possible && posPoss > 1);
                        
                        if(possible){
                            //console.log("posPossPass : "+posPoss+" col : "+col+" or : "+or);
                            this.grille.insertTetrominoCoOr(this.teer, posPoss, col, or);

                            var hmaxpcBis = [24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
                            for (let i = 0; i < 24; i++) {
                                for (let j = 0; j < 10; j++) {
                                    if (this.grille.blocChain[i][j] != 0) {
                                        hmaxpcBis[j] = hmaxpcBis[j] > i ? i : hmaxpcBis[j];
                                    }
                                }
                            }

                            var nbtrou = 0;
                            for (let i = 0; i < 10; i++) {
                                for (let j = 23; j > hmaxpcBis[i]; j--) {
                                    if (this.grille.blocChain[j][i] == 0) {
                                        nbtrou++;
                                    }
                                }
                            }

                            var hmax = Math.min.apply(Math, hmaxpcBis);

                            var newScore = this.grille.checkFullLineBot();
                            var varHautCol = 0;
                            for (let i = 0; i < 9; i++) {
                                varHautCol += Math.abs(hmaxpcBis[i] - hmaxpcBis[i+1]);
                            }

                            //var points = nbtrou * (-1) + varHautCol * (-0.1) + newScore * 1 + hmax * (1) ;
                            //var points = nbtrou * (-0.6763430639849509) + varHautCol * (-0.9030889001676913) + newScore * (0.2280655440523947) + hmax * (0.589612894116009 ) ;
                        //var points = hmax * (100);// + newScore * 1 ;
                        //var points = nbtrou * (-0.1516741306703968) + varHautCol * (-0.19087878312923057) + newScore * (0.4579172890221702) + hmax * (0.1247033950880867) ;
                        //var points = nbtrou * (-0.8968712822912144) + varHautCol * (-0.18286117353403528) + newScore * (0.3312266298460219) + hmax * (-0.0024466543577278893) ;
                        var points = nbtrou * (-0.9709277244380525) + varHautCol * (-0.14796513032511963) + newScore * (0.3715651379045553) + hmax * (0.14420987547345482) ;
                            if (points > hs) {
                                hs = points;
                                hsX = col;
                                hsOr = or;
                            }
                            this.grille.deleteTetrominoCoOr(this.teer, col, posPoss, or);
                        }
                    }
                }

                if (this.teer.locX != hsX || this.teer.orientation != hsOr) {
                    for (let index = 0; index < 10; index++) {
                        if (this.teer.orientation != hsOr) {
                            if (this.teer.orientation > hsOr) {
                                this.teer.doRotateRight(this.grille);
                            }
                            else{
                                this.teer.doRotateLeft(this.grille);
                            }
                        }

                        else if (this.teer.locX != hsX) {
                            if (this.teer.locX < hsX) {
                                this.teer.doMoveRight(this.grille);
                            }
                            else{
                                this.teer.doMoveLeft(this.grille);
                            }
                        }
                    }
                }
                else{
                    this.doTheMoveDownInfinity();
                }
            }

            this.grille.insertTetromino(this.teer);

        
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
