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
                if (teer.getMatrix()[i][j]==1) {
                    this.blocChain[teer.getLocY()+i][teer.getLocX()+j] = 0;
                }
            }
        }
    }
    
    deleteTetrominoCoOr(teer ,X ,Y, Or){
        for (let i = 0; i < teer.getMatrixByOrientation(Or).length; i++) {
          for (let j = 0; j < teer.getMatrixByOrientation(Or)[i].length; j++) {
              if (teer.getMatrixByOrientation(Or)[i][j]==1) {
                  this.blocChain[Y+i][X+j] = 0;
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

    insertTetrominoCoOr(teer ,Y ,X, Or){
        for (let i = 0; i < teer.getMatrixByOrientation(Or).length; i++) {
            for (let j = 0; j < teer.getMatrixByOrientation(Or)[i].length; j++) {
                if (teer.getMatrixByOrientation(Or)[i][j]==1) {
                    this.blocChain[Y+i][X+j] = teer.getColor();
                }
            }
        }
    }

    

    isTetrominoInserable(teer, X, Y, or){
        var possible = true;
        for (let i = 0; i < teer.getMatrixByOrientation(or).length; i++) {
            for (let j = 0; j < teer.getMatrixByOrientation(or)[i].length; j++) {
                if (teer.getMatrixByOrientation(or)[i][j]==1) {
                    if ((0 <= Y + i) && (Y + i < 24) && (X + j < 10) && (0 <= X + j)) {
                        if (this.blocChain[Y + i][X + j] != 0) {
                            possible = false;
                        }
                    } 
                    else {
                        possible = false;
                    }
                }
            }
        }
        return possible;
    }

    isLose(teer){
        var isLose = false;
        for (let i = 0; i < teer.getMatrix().length; i++) {
            for (let j = 0; j < teer.getMatrix()[i].length; j++) {
                if (teer.getMatrix()[i][j]==1) {
                    if (this.blocChain[teer.getLocY()+i+1][teer.getLocX()+j] != 0) {
                        if(teer.getMatrix().length>i+1){
                            if(teer.getMatrix()[i][j] != teer.getMatrix()[i+1][j]){
                                isLose = true;
                            }
                        }
                        else{
                            isLose = true;
                        }
                    }
                }
            }
        }
        return isLose;
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

    
    checkFullLineBot(){
        let nbFull = 0;
        for (let i = 0; i < 24; i++) {
            var lineFull = true;
            for (let j = 0; j < 10; j++) {
                if (this.blocChain[i][j]==0) {
                    lineFull = false;
                }
            }
            if (lineFull) {
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

