import { GameObject } from "./gameobject.js"
import { GameScreen } from "./gamescreen.js"

export class Robot extends GameObject {

    private speed : number = Math.random() * 3 + 2
    private screen : GameScreen

    constructor(screen : GameScreen){
        super("robot")
        this.screen = screen
        this.x = Math.random() * 600
        this.y = Math.random() * 450 + 100
        this.element.addEventListener("click", ()=>this.removeMe())
    }

    private removeMe(){
        this.remove()
        this.screen.removeRobot(this)
    }

    public update(): void{
        this.x += this.speed
        if(this.x > window.innerWidth) {
            this.x = -100
            this.y = Math.random() * 450 + 100
        }
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}