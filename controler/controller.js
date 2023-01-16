let colors = {
    1 : "#00ccff",
    2 : "#ffff00",
    3 : "#8c1aff",
    4 : "#0000ff",
    5 : "#ff9999",
    6 : "#009933",
    7 : "#cc0066",
}

class Controller {

    constructor(model, view)
    {
        // initialisation de la vue et du model
        this.model = model;
        this.view = view;

        // bind du dessins du canva présent dans le model a la fonction similaire dans la vue
        this.bindDrawCanva = this.bindDrawCanva.bind(this);
        this.model.bindDrawCanva(this.bindDrawCanva);

        // appel toutes les 100 ms
        setInterval(this.jeu.bind(this), 100);
        setInterval(this.model.doTheMoveDown.bind(this.model), 1000);

        // init colors
    }

    // fonction jeu
    jeu(){

        this.model.drawCanva();

        
    }

    

    // fonction bind
    bindDrawCanva(score, etatBot, grille, teer)
    {
        this.view.draw(score, etatBot, grille, teer);
    }
}


var canvas = document.getElementById('tetris');
var ctx = canvas.getContext('2d');
const app = new Controller(new Model(ctx), new View(ctx));

// event clavier
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp"){app.model.teer.doRotateRight(app.model.grille)}
    else if (e.code === "ArrowDown"){app.model.teer.doRotateLeft(app.model.grille)}
    else if (e.code === "ArrowRight"){app.model.teer.doMoveRight(app.model.grille)}
    else if (e.code === "ArrowLeft"){app.model.teer.doMoveLeft(app.model.grille)}
    else if (e.code === "Space"){app.model.teer.doMoveDown(app.model.grille, app.model.score)}
});

// event click
canvas.onclick = function(event) {
    app.model.bot.click(event, canvas);
}