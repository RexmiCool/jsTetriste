class Bot {

    constructor(ctx) {
        this.ctx = ctx;
		this.active = false;
        this.color = "#FF0000";
		this.drawBtn();
	}

    // dessin du btn
    drawBtn(){
        // arriere plan btn
		this.ctx.beginPath();
		this.ctx.rect(405, 420, 120, 60);
		this.ctx.strokeStyle = this.color;
        this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = this.color;
		this.ctx.stroke();
		this.ctx.closePath();

        // text btn
        this.ctx.font = 'bold 30px Verdana, Arial, serif';
		this.ctx.strokeStyle = this.color;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.shadowBlur = 10;
		this.ctx.shadowColor = this.color;
		this.ctx.strokeText('BOT', 465, 450);
    }

    // activation / desactivation du bot
    changeEtat(){
        if (this.active){
            this.active = false;
            this.color = "#FF0000";
        }
        else {
            this.active = true;
            this.color = "#00FF00";
        }
    }

    // gestion du click sur le btn
    click(e, canvas){
        var canvasPosition = canvas.getBoundingClientRect();
        var inputX = e.pageX - canvasPosition.left;
        var inputY = e.pageY - canvasPosition.top;

        if (inputX > 405 && inputX < 525 && inputY > 420 && inputY < 480){
            this.changeEtat();
        }
    }
}