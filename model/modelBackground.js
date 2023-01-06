class Background {
	constructor(sizeX, sizeY, ctx) {
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.ctx = ctx;
		this.draw();
	}

	draw(){

		// arriere plan
		ctx.beginPath();
		ctx.rect(0, 0, this.sizeX, this.sizeY);
		ctx.fillStyle = "#000000";
		ctx.fill();
		ctx.closePath();

		// grille bg
		
	}
}