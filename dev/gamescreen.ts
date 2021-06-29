import { Background } from "./background.js"
import { Game } from "./game.js"
import { GameObject } from "./gameobject.js"
import { Robot } from "./robot.js"

export class GameScreen extends GameObject {

    private robots:Robot[] = []
    private background: Background
    private game : Game

    constructor(g:Game) {
        super("gamescreen")
        this.game = g
        const text = document.createElement("instructions")
        this.element.appendChild(text)
        text.innerText = "Click the robots to remove them!"
        
        this.background = new Background()

        this.robots.push(new Robot(this), new Robot(this), new Robot(this), new Robot(this), new Robot(this))
    }

    public removeRobot(robot : Robot){
        this.robots = this.robots.filter(rob => rob != robot)
        // 
        if (this.robots.length == 0) {
            this.remove()
            this.game.showEndScreen()
        }
    }

    public update(){
        this.background.update()
        for (let o of this.robots) {
            o.update()
        }
    }

    public remove(){
        this.background.remove()
        super.remove()
    }

}