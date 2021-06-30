import { Game } from "./game.js"
import { StaticGameObject } from "./gameObject.js"

export class StartButton extends StaticGameObject{

    private game : Game
    private regularModeElement : HTMLElement
    private survivalModeElement : HTMLElement
    private titelElement : HTMLElement
    private movement : HTMLElement
    private fireWeapon : HTMLElement
    private pickup : HTMLElement
    private pauseMenu : HTMLElement

    constructor(g:Game) {
        super("startscreen")
        this.game = g
        
        this.titelElement = document.createElement("titel")
        document.body.appendChild(this.titelElement)
        this.titelElement.classList.add('message')
        this.titelElement.innerText = "Robot of the Wild"

        this.regularModeElement = document.createElement("regularBtn")
        document.body.appendChild(this.regularModeElement)
        this.regularModeElement.classList.add('btn')
        this.regularModeElement.innerText = "START REGULAR MODE"
        this.regularModeElement.addEventListener("click", ()=>this.startRegularGame())

        this.survivalModeElement = document.createElement("regularBtn")
        document.body.appendChild(this.survivalModeElement)
        this.survivalModeElement.classList.add('btn')
        this.survivalModeElement.innerText = "START SURVIVAL MODE"
        this.survivalModeElement.addEventListener("click", ()=>this.startSurvivalGame())

        this.movement = document.createElement("movement")
        document.body.appendChild(this.movement)
        this.movement.innerText = "Movement : WASD / ArrowKeys"

        this.fireWeapon = document.createElement("fireWeapon")
        document.body.appendChild(this.fireWeapon)
        this.fireWeapon.innerText = "Fire weapon : Spacebar"

        this.pickup = document.createElement("pickup")
        document.body.appendChild(this.pickup)
        this.pickup.innerText = "Pickup items : 'e'"

        this.pauseMenu = document.createElement("pauseMenu")
        document.body.appendChild(this.pauseMenu)
        this.pauseMenu.innerText = "Pause game : Esc"

    }

    private startRegularGame(){
        this.removeElements()
        this.game.survivalMode = false
        this.game.startGame()
        
    }


    private startSurvivalGame(){
        this.removeElements()
        this.game.survivalMode = true
        this.game.startGame()
        
    }
    private removeElements(){
        this.regularModeElement.remove()
        this.survivalModeElement.remove()
        this.titelElement.remove()
        this.movement.remove()
        this.pickup.remove()
        this.fireWeapon.remove()
        this.pauseMenu.remove()
        this.remove()
    }
}