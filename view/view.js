

class View {
    
    constructor(ctx) {
        this.ctx = ctx;
    }

    // fonction de dessin
    draw(scoreNb, etat, grille, next, lose){

        // nettoyage du canva
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // mis a jour des dessins
        this.drawBg(600, 900);
        this.drawScore(scoreNb);
		if(etat == true){
			this.drawBtnBot("#00FF00");
		}
		else{
			this.drawBtnBot("#FF0000");
		}

		for (let i = 0; i < grille.blocChain.length; i++) {
			for (let j = 0; j < grille.blocChain[i].length; j++) {
				if (grille.blocChain[i][j]!=0) {
					new Block(60+j*30, 90+i*30, ctx, colors[grille.blocChain[i][j]]);
				}
			}
		}	
	
	
		for (let i = 0; i < next.getMatrixOriginal().length; i++) {
			for (let j = 0; j < next.getMatrixOriginal()[i].length; j++) {
				if (next.getMatrixOriginal()[i][j]==1) {
					new Block(405+j*30, 135+i*30, ctx, colors[next.getColor()]);
				}
			}
		}

		if (lose) {
			this.drawGameOver(scoreNb);
		}
		
    }

    // dessin bg
	drawBg(sizeX, sizeY)
    {
		// arriere plan
		this.ctx.beginPath();
		this.ctx.rect(0, 0, sizeX, sizeY);
		this.ctx.fillStyle = "#000000";
		this.ctx.fill();
		this.ctx.closePath();

		// grille bg
		for (let i = 0; i < 25; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(60,90+i*30);
			this.ctx.lineTo(360,90+i*30);
			this.ctx.shadowBlur = 0;
			this.ctx.shadowColor = "#FF000000";
			this.ctx.strokeStyle = "#50505055"
			this.ctx.stroke()
		}
		for (let i = 0; i < 11; i++) {
			this.ctx.beginPath();
			this.ctx.moveTo(60+i*30,90);
			this.ctx.lineTo(60+i*30,810);
			this.ctx.shadowBlur = 0;
			this.ctx.shadowColor = "#FF000000";
			this.ctx.strokeStyle = "#50505055"
			this.ctx.stroke()
		}

		// grille bg border
		this.ctx.beginPath();
		this.ctx.rect(55, 85, 310, 730);
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

    // dessin score
    drawScore(nb)
    {
        // score
        this.ctx.font = 'bold 30px Verdana, Arial, serif';
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = "#FFFFFF";
        this.ctx.strokeText(nb, 465, 360);
    }

	// dessin btn bot
	drawBtnBot(color){
        // arriere plan btn
		this.ctx.beginPath();
		this.ctx.rect(405, 420, 120, 60);
		this.ctx.strokeStyle = color;
        this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = color;
		this.ctx.stroke();
		this.ctx.closePath();

        // text btn
        this.ctx.font = 'bold 30px Verdana, Arial, serif';
		this.ctx.strokeStyle = color;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = color;
		this.ctx.strokeText('BOT', 465, 450);
    }

	
    // dessine le GAME OVER
	drawGameOver(scoreNb){
		// arriere plan
		this.ctx.beginPath();
		this.ctx.rect(40, 200, 520, 400);
		this.ctx.fillStyle = "#000000";
		this.ctx.fill();
		this.ctx.closePath();

		
		// border
		this.ctx.beginPath();
		this.ctx.rect(40, 200, 520, 400);
		this.ctx.strokeStyle = "#ff8000";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#ff8000";
		this.ctx.stroke();
		this.ctx.closePath();


		// titre
		this.ctx.font = 'bold 60px Verdana, Arial, serif';
		this.ctx.strokeStyle = "#ff8000";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#ff8000";
		this.ctx.strokeText('GAME OVER', 300, 280);


		// score
		this.ctx.font = 'bold 30px Verdana, Arial, serif';
		this.ctx.strokeStyle = "#ff8000";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#ff8000";
		this.ctx.strokeText('You reach : '+scoreNb, 300, 400);

		// arriere plan btn
		this.ctx.beginPath();
		this.ctx.rect(160, 460, 300, 100);
		this.ctx.strokeStyle = "#ff8000";
        this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#ff8000";
		this.ctx.stroke();
		this.ctx.closePath();

        // text btn
        this.ctx.font = 'bold 40px Verdana, Arial, serif';
		this.ctx.strokeStyle = "#ffffff";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = "#ffffff";
		this.ctx.strokeText('PLAY AGAIN', 310, 510);
	}

}