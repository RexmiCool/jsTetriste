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
	constructor(locX, locY, ctx, type, color) {
		this.locX = locX;
		this.locY = locY;
		this.ctx = ctx;
		this.color = color;
		this.type = type;
		this.orientation = 1;
	}

	getMatrix(){
		return dictForms[this.type][this.orientation];
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
					let ter = new Block(this.locX+j*30, this.locY+i*30, ctx, this.color);
				}
			}
		}		
	}
}