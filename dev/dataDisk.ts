import { Game } from "./game.js"
import { StaticGameObject } from "./gameobject.js"

export class DataDisk extends StaticGameObject{
    public game : Game

    constructor(g:Game){
        super("datadisk")
        this.game = g
        if (this.game.newWolfDisk == true){
            this.x = this.game.wolfDiskX
            this.y = this.game.wolfDiskY
            this.game.newWolfDisk = false
        }
        if (this.game.newDeerDisk == true){
            this.x = this.game.deerDiskX
            this.y = this.game.deerDiskY
            this.game.newDeerDisk = false
        }
        if (this.game.newRandomDisk == true) {
            this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth * 1.2))
            this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight * 1.2))
            this.game.newRandomDisk = false
        }
        
    }

    update(){
        super.update()
    }


}