import { Game } from "./game.js";
import { TurnableGameObject } from "./turnableGameObject.js"
import { Player } from "./player.js";

export class Bullet extends TurnableGameObject {
    private game  :Game

    constructor(player:Player, g:Game) {
        super("bullet")
        this.game = g
        
        
        if (this.game.direction == "right"){
            this.x = player.getBoundingRect().left + 122
            this.y = player.getBoundingRect().top - 84
            this.xSpeed = 15
            this.angle = 0
        }
        if (this.game.direction == "left"){
            this.x = player.getBoundingRect().left - 17
            this.y = player.getBoundingRect().top - 131
            this.xSpeed = -15
            this.angle = 0
        }
        if (this.game.direction == "up"){
            this.x = player.getBoundingRect().left + 60
            this.y = player.getBoundingRect().top - 170
            this.ySpeed = -15
            this.angle = 90
        }
        if (this.game.direction == "down"){
            this.x = player.getBoundingRect().left + 11
            this.y = player.getBoundingRect().bottom - 155
            this.ySpeed = +15
            this.angle = 90
        }
        
    }
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        if (this.x < 0 || this.x > window.innerWidth - this.div.clientWidth || this.y < -150  || this.y > window.innerHeight - this.div.clientHeight) {
            this.game.removeBullet(this)
        }
        super.update()
        
    }
}