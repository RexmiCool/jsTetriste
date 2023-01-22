class Score {

	constructor(scorebase) {
		this.scoreNb = scorebase;
	}

	add(nb){
		this.scoreNb += nb; 
	}

	getScoreNb()
	{
		return this.scoreNb;
	}
}