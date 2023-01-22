class Bot {

    constructor() {
		this.active = false;
        this.color = "#FF0000";
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

    // guetteur de la cité qui crie le aha
    getEtat(){
        return this.active;
    }

    // gestion du click sur le btn
    click(e){
        this.changeEtat();
    }
}