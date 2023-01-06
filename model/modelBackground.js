class Background {
	
	constructor(sizeX, sizeY, ctx) {
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.ctx = ctx;
		this.draw();
	}

	draw(){

		// arriere plan
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.sizeX, this.sizeY);
		this.ctx.fillStyle = "#000000";
		this.ctx.fill();
		this.ctx.closePath();

		// grille bg
		for (let i = 1; i < 24; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(60,90+i*30);
			this.ctx.lineTo(360,90+i*30);
			this.ctx.strokeStyle = "#50505055"
			this.ctx.stroke()
		}
		for (let i = 1; i < 10; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(60+i*30,90);
			this.ctx.lineTo(60+i*30,810);
			this.ctx.strokeStyle = "#50505055"
			this.ctx.stroke()
		}

		// grille bg border
		this.ctx.beginPath();
		this.ctx.rect(60, 90, 300, 720);
		this.ctx.strokeStyle = "#FF0000";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#FF0000";
		this.ctx.stroke();
		this.ctx.closePath();

		// preview bg
		this.ctx.beginPath();
		this.ctx.rect(390, 120, 150, 90);
		this.ctx.strokeStyle = "#FF0000";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#FF0000";
		this.ctx.stroke();
		this.ctx.closePath();

		// titre
		this.ctx.font = 'bold 30px Verdana, Arial, serif';
		this.ctx.strokeStyle = "#FF0000";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#FF0000";
		this.ctx.strokeText('NEON TETRIS', 300, 45);
		
		// titre score
		this.ctx.strokeText('SCORE', 465, 300);

		
		
	}
}