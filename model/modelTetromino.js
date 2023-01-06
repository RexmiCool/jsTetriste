forms{
    1 : [[1, 1, 1, 1]],
    2 : [[1, 1], [1, 1]],
    3 : [[1, 1, 1], [0, 1, 0]]
    
}

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