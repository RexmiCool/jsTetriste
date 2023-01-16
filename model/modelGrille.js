class Grille {
    constructor() {
      this.blocChain = [];
      for (let i = 0; i < 24; i++) {
          this.blocChain[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }

    getBlocChain(){
      return this.blocChain;
    }

    deleteTetromino(teer){
      for (let i = 0; i < teer.getMatrix().length; i++) {
        for (let j = 0; j < teer.getMatrix()[i].length; j++) {
            if (teer.getMatrix()[i][j]==1) {
                this.blocChain[teer.getLocY()+i][teer.getLocX()+j] = 0;
            }
        }
      }
    }

    insertTetromino(teer){
      for (let i = 0; i < teer.getMatrix().length; i++) {
        for (let j = 0; j < teer.getMatrix()[i].length; j++) {
            if (teer.getMatrix()[i][j]==1) {
                this.blocChain[teer.getLocY()+i][teer.getLocX()+j] = teer.getColor();
            }
        }
      }
    }

    isLose(teer){
        for (let i = 0; i < teer.getMatrix().length; i++) {
            for (let j = 0; j < teer.getMatrix()[i].length; j++) {
                if (teer.getMatrix()[i][j]==1) {
                    if (this.blocChain[teer.getLocY()+i+1][teer.getLocX()+j] != 0) {
                        if(teer.getMatrix().length>i+1){
                            if(teer.getMatrix()[i][j] != teer.getMatrix()[i+1][j]){
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
    }

    // verifie si une ligne est complete (a mettre dans model, de la grille je pense)
    checkFullLine(){
      let nbFull = 0;
      for (let i = 0; i < 24; i++) {
          var lineFull = true;
          for (let j = 0; j < 10; j++) {
              if (this.blocChain[i][j]==0) {
                  lineFull = false;
              }
          }
          if (lineFull) {
              this.cleanLine(i);
              nbFull++;
          }
      }	
      return nbFull;
    }

    // clean la ligne complete (a mettre dans model, de la grille je pense)
    cleanLine(numLine){
      let copy = [];
      for (let i = 0; i < 24; i++) {
          copy[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      for (let i = 0; i <= numLine; i++) {
          for (let j = 0; j < 10; j++) {
              copy[i][j] = this.blocChain[i][j];
              this.blocChain[i][j] = 0;
          }
      }
      for (let i = numLine; i > 0; i--) {
        this.blocChain[i] = copy[i-1];
      }
    }
    
  }

