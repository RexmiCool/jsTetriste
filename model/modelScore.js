class Score {

	constructor(ctx, scorebase) {
		this.ctx = ctx;
		this.scoreNb = scorebase;
	}

	// draw(){
	// 	// score
	// 	this.ctx.font = 'bold 30px Verdana, Arial, serif';
	// 	this.ctx.strokeStyle = "#FFFFFF";
	// 	this.ctx.textAlign = "center";
	// 	this.ctx.textBaseline = "middle";
	// 	this.ctx.shadowBlur = 10;
	// 	this.ctx.shadowColor = "#FFFFFF";
	// 	this.ctx.strokeText(this.getScore(), 465, 360);
		
	// }

	add(nb){
		this.scoreNb += nb; 
	}

	getScoreNb()
	{
		return this.scoreNb;
	}
}