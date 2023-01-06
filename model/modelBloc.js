class Block {
	constructor(locX, locY, ctx, color) {
		this.locX = locX;
		this.locY = locY;
		this.ctx = ctx;
		this.color = color;
		this.draw();
	}

	draw(){

        ctx.beginPath();
		ctx.rect(this.locX+1, this.locX+1, 28, 28);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		
	}
}