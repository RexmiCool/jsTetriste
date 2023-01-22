let dictForms = {
	1:{1:[[1, 1, 1, 1]], 2:[[1], [1], [1], [1]], 3:[[1, 1, 1, 1]], 4:[[1], [1], [1], [1]]},
	2:{1:[[1, 1],[1, 1]], 2:[[1, 1],[1, 1]], 3:[[1, 1], [1, 1]], 4:[[1, 1], [1, 1]]},
	3:{1:[[1, 1, 1], [0, 1, 0]], 2:[[1, 0], [1, 1], [1, 0]], 3:[[0 ,1, 0], [1, 1, 1]], 4:[[0, 1], [1, 1], [0, 1]]},
	4:{1:[[1, 1, 1], [1, 0, 0]], 2:[[1, 1], [0, 1], [0, 1]], 3:[[0 ,0, 1], [1, 1, 1]], 4:[[1, 0], [1, 0], [1, 1]]},
	5:{1:[[1, 1, 1], [0, 0, 1]], 2:[[0, 1], [0, 1], [1, 1]], 3:[[1 ,0, 0], [1, 1, 1]], 4:[[1, 1], [1, 0], [1, 0]]},
	6:{1:[[1, 1, 0], [0, 1, 1]], 2:[[0, 1], [1, 1], [1, 0]], 3:[[1, 1, 0], [0, 1, 1]], 4:[[0, 1], [1, 1], [1, 0]]},
	7:{1:[[0, 1, 1], [1, 1, 0]], 2:[[1, 0], [1, 1], [0, 1]], 3:[[0, 1, 1], [1, 1, 0]], 4:[[1, 0], [1, 1], [0, 1]]},
};

class Tetromino {
	constructor(locX, locY, type) {
		this.locX = locX;
		this.locY = locY;
		this.color = type;
		this.type = type;
		this.orientation = 1;
	}

	getMatrix(){
		return dictForms[this.type][this.orientation];
	}

	getMatrixByOrientation(orientation){
		return dictForms[this.type][orientation];
	}

	getMatrixOriginal(){
		return dictForms[this.type][1];
	}

	getLocX(){
		return this.locX;
	}

	getLocY(){
		return this.locY;
	}

	getColor(){
		return this.color;
	}

	rotateLeft(){
		this.orientation = (this.orientation == 4) ? 1 : this.orientation+1;
	}

	rotateRight(){
		this.orientation = (this.orientation == 1) ? 4 : this.orientation-1;
	}

	doRotateRight(grille){
		if (this.getMatrixRotateRight()[0].length+this.getLocX()>10 || this.getMatrixRotateRight().length+this.getLocY()>24) {
			return grille;
		}
	
		grille.deleteTetromino(this);

		for (let i = 0; i < this.getMatrixRotateRight().length; i++) { //4
			for (let j = 0; j < this.getMatrixRotateRight()[i].length; j++) { //1
				if (this.getMatrixRotateRight()[i][j]==1) {
					if (grille.getBlocChain()[this.getLocY()+i][this.getLocX()+j] != 0) {
						grille.insertTetromino(this);
						return grille;
					}
				}
			}
		}
	
		this.rotateRight();
	
		grille.insertTetromino(this);
		return grille;
	}

	
	doRotateLeft(grille){
		if (this.getMatrixRotateLeft()[0].length+this.getLocX()>10 || this.getMatrixRotateLeft().length+this.getLocY()>24) {
			return grille;
		}
		
		grille.deleteTetromino(this);

		for (let i = 0; i < this.getMatrixRotateLeft().length; i++) {
			for (let j = 0; j < this.getMatrixRotateLeft()[i].length; j++) {
				if (this.getMatrixRotateLeft()[i][j]==1) {
					if (grille.blocChain[this.getLocY()+i][this.getLocX()+j] != 0) {
						grille.insertTetromino(this);
						return grille;
					}
				}
			}
		}

	
		this.rotateLeft();
	
		grille.insertTetromino(this);
		return grille;
	}

	doMoveRight(grille){
		if (this.getMatrix()[0].length+this.getLocX()>=10) {
			return grille;
		}
		for (let i = 0; i < this.getMatrix().length; i++) {
			for (let j = 0; j < this.getMatrix()[i].length; j++) {
				if (this.getMatrix()[i][j]==1) {
					if (grille.blocChain[this.getLocY()+i][this.getLocX()+j+1] != 0) {
						if(this.getMatrix()[0].length>j+1){
							if(this.getMatrix()[i][j] != this.getMatrix()[i][j+1]){
								return grille;
							}
						}
						else{
							return grille;
						}
					}
				}
			}
		}
	
		grille.deleteTetromino(this);
	
		this.moveRight();
	
		grille.insertTetromino(this);
		return grille;
	}


	doMoveLeft(grille){
		for (let i = 0; i < this.getMatrix().length; i++) {
			for (let j = 0; j < this.getMatrix()[i].length; j++) {
				if (this.getMatrix()[i][j]==1) {
					if (grille.blocChain[this.getLocY()+i][this.getLocX()+j-1] != 0) {
						if(this.getMatrix()[0].length>j-1){
							if(this.getMatrix()[i][j] != this.getMatrix()[i][j-1]){
								return grille;
							}
						}
						else{
							return grille;
						}
					}
				}
			}
		}
	
		grille.deleteTetromino(this);
	
		this.moveLeft();
	
		grille.insertTetromino(this);
		return grille;	

	}

	doMoveDown(grille, score, next){
	
		var ok = true;
		for (let i = 0; i < this.getMatrix().length; i++) {
			for (let j = 0; j < this.getMatrix()[i].length; j++) {
				if (this.getMatrix()[i][j]==1) {
					//si le tetro touche le bas
					if (this.getLocY()+i >= 23) {
						score.add(grille.checkFullLine());
						if(this.rdmTet(grille, next)){
							return true;
						}
						ok = false;
						break;
					}
	
					else if (grille.blocChain[this.getLocY()+i+1][this.getLocX()+j] != 0) {
						if(this.getMatrix().length>i+1){
							if(this.getMatrix()[i][j] != this.getMatrix()[i+1][j]){
								score.add(grille.checkFullLine());
								if(this.rdmTet(grille, next)){
									return true;
								}
								ok = false;
								break;
							}
						}
						else{
							score.add(grille.checkFullLine());
							if(this.rdmTet(grille, next)){
								return true;
							}
							ok = false;
							break;
						}
					}
				}
			}
		}
		if (ok) {
			this.makeMoveDown(grille);
		}
		for (let i = 0; i < this.getMatrix().length; i++) {
			for (let j = 0; j < this.getMatrix()[i].length; j++) {
				if (this.getMatrix()[i][j]==1) {
					if (this.getLocY()+i >= 23) {
						score.add(grille.checkFullLine());
						if(this.rdmTet(grille, next)){
							return true;
						}
						break;
					}
					else if (grille.blocChain[this.getLocY()+i+1][this.getLocX()+j] != 0) {
						if(this.getMatrix().length>i+1){
							if(this.getMatrix()[i][j] != this.getMatrix()[i+1][j]){
								score.add(grille.checkFullLine());								
								if(this.rdmTet(grille, next)){
									return true;
								}
								break;
							}
						}
						else{
							score.add(grille.checkFullLine());
							if(this.rdmTet(grille, next)){
								return true;
							}
							break;
						}
					}
				}
			}
		}
		return false;
	}

	

	doMoveDownInfinity(grille, score, next){
		
		var ok = true;
	
		while(ok){
			for (let i = 0; i < this.getMatrix().length; i++) {
				for (let j = 0; j < this.getMatrix()[i].length; j++) {
					if (this.getMatrix()[i][j]==1) {
						if (this.getLocY()+i >= 23) {
							score.add(grille.checkFullLine());
							if(this.rdmTet(grille, next)){
								return true;
							}
							ok = false;
							break;
						}
		
						else if (grille.blocChain[this.getLocY()+i+1][this.getLocX()+j] != 0) {
							if(this.getMatrix().length>i+1){
								if(this.getMatrix()[i][j] != this.getMatrix()[i+1][j]){
									score.add(grille.checkFullLine());
									if(this.rdmTet(grille, next)){
										return true;
									}
									ok = false;
									break;
								}
							}
							else{
								score.add(grille.checkFullLine());
								if(this.rdmTet(grille, next)){
									return true;
								}								
								ok = false;
								break;
							}
						}
					}
				}
			}
			if (ok) {
				this.makeMoveDown(grille);
			}
			for (let i = 0; i < this.getMatrix().length; i++) {
				for (let j = 0; j < this.getMatrix()[i].length; j++) {
					if (this.getMatrix()[i][j]==1) {
						if (this.getLocY()+i >= 23) {
							score.add(grille.checkFullLine());
							if(this.rdmTet(grille, next)){
								return true;
							}							
							ok = false;
							break;
						}
						else if (grille.blocChain[this.getLocY()+i+1][this.getLocX()+j] != 0) {
							if(this.getMatrix().length>i+1){
								if(this.getMatrix()[i][j] != this.getMatrix()[i+1][j]){
									score.add(grille.checkFullLine());
									if(this.rdmTet(grille, next)){
										return true;
									}
									ok = false;
									break;
								}
							}
							else{
								score.add(grille.checkFullLine());
								if(this.rdmTet(grille, next)){
									return true;
								}
								ok = false;
								break;
							}
						}
					}
				}
			}
		}		
		return false;
	}
	
	makeMoveDown(grille){
		for (let i = 0; i < this.getMatrix().length; i++) {
			for (let j = 0; j < this.getMatrix()[i].length; j++) {
				if (this.getMatrix()[i][j]==1) {
					grille.blocChain[this.getLocY()+i][this.getLocX()+j] = 0;
				}
			}
		}	
		this.moveDown();
	
		for (let i = 0; i < this.getMatrix().length; i++) {
			for (let j = 0; j < this.getMatrix()[i].length; j++) {
				if (this.getMatrix()[i][j]==1) {
					grille.blocChain[this.getLocY()+i][this.getLocX()+j] = this.getColor();
				}
			}
		}	
	}

	rdmTet(grille, next){
		this.locX = next.locX;
		this.locY = next.locY;
		this.type = next.type;
		this.color = next.color;

		next.locX = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(0)));
		next.locY = 0;
		next.type = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(1))) +  Math.ceil(1);
		next.color = next.type;
		while (next.getMatrix()[0].length + next.getLocX() - 1 >= 10){
			next.locX = Math.floor(Math.random() * (Math.floor(9) - Math.ceil(0)));
			next.locY = 0;
			next.type = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(1))) +  Math.ceil(1);
			next.color = next.type;} 
		grille.insertTetromino(this);
		if(grille.isLose(this)){
			return true;
		}
		else{
			return false;
		}
	}


	getMatrixRotateLeft(){
		var futureOrientation = (this.orientation == 4) ? 1 : this.orientation+1;
		return dictForms[this.type][futureOrientation];
	}

	getMatrixRotateRight(){
		var futureOrientation = (this.orientation == 1) ? 4 : this.orientation-1;
		return dictForms[this.type][futureOrientation];
	}

	moveLeft(){
		this.locX = (this.locX == 0) ? 0 : this.locX-1;
	}

	moveRight(){
		this.locX = (this.locX == 9) ? 9 : this.locX+1;
	}

	moveDown(){
		if (this.locY+this.getMatrix().length-1 != 23) {
			this.locY = (this.locY+this.getMatrix().length-1 == 23) ? 20 : this.locY+1;
		}
	}

	

	draw(){

		for (let i = 0; i < dictForms[this.type][this.orientation].length; i++) {
			for (let j = 0; j < dictForms[this.type][this.orientation][i].length; j++) {
				if (dictForms[this.type][this.orientation][i][j]==1) {
					let ter = new Block(this.locX+j*30, this.locY+i*30, this.color);
				}
			}
		}		
	}
}


function genTet(){
	let teer = new Tetromino(Math.floor(Math.random() * (Math.floor(9) - Math.ceil(0))), 0, Math.floor(Math.random() * (Math.floor(7) - Math.ceil(1))) +  Math.ceil(1), Math.floor(Math.random() * (Math.floor(8) - Math.ceil(1))) +  Math.ceil(1));
	while (teer.getMatrix()[0].length + teer.getLocX() - 1 >= 10){
		teer = new Tetromino(Math.floor(Math.random() * (Math.floor(9) - Math.ceil(0))), 0, Math.floor(Math.random() * (Math.floor(7) - Math.ceil(1))) +  Math.ceil(1), Math.floor(Math.random() * (Math.floor(8) - Math.ceil(1))) +  Math.ceil(1));
	} 
	return teer;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }