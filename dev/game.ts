import { Player } from "./player.js"
import { Bullet } from "./bullet.js"
import { AmmoBox } from "./ammoBox.js"
import { GearBox } from "./gearbox.js"
import { DataDisk } from "./dataDisk.js"
import { Wolf } from "./wolf.js"
import { Deer } from "./deer.js"
import { StartButton } from "./startScreen.js"

export class Game{
    private player : Player
    private bullets : Bullet[] = []
    public ePressed : boolean = false
    public direction : string = "down"
    public paused : boolean = false
    public survivalMode : boolean
    public currentGame : boolean = true
    public collectedDisks : number = 0

    private timeTick : number = 0
    private timeSeconds : number = 0
    private timeMinutes : number = 0

    private ammoBoxes : AmmoBox[] = []
    private ammoSpawnCounter : number = 0
    private activeAmmoBoxes : number = 0

    private gearBoxes : GearBox[] = []
    private gearBoxSpawnCounter : number = 0
    private activeGearBoxes : number = 0

    private dataDisks : DataDisk[] = []
    public deerDisk : boolean = false
    public deerDiskY : number
    public deerDiskX : number
    public newDeerDisk : boolean = false
    public wolfDisk : boolean = false
    public wolfDiskX : number 
    public wolfDiskY : number
    public newWolfDisk : boolean = false
    private diskCounter : number = 0
    private randomDisk : boolean = false
    public newRandomDisk : boolean = false

    private wolves : Wolf[] = []
    private attacked : boolean = false
    private attackedCounter : number = 0
    private wolfSpawnCounter : number = 0
    private totalWolfSpawns : number = 0
    private activeWolves : number = 0
    private maxWolves : number = 5
    private maxActiveWolves : number = 2
    public lastWolf : boolean = false

    private deer : Deer[] = []
    private deerSpawnCounter : number = 0
    private totalDeerSpawns : number = 0
    private activeDeer : number = 0
    public lastDeer : boolean = false

    private scoreElement : HTMLElement
    private healthElement : HTMLElement
    private diskElement : HTMLElement
    private killsElement : HTMLElement
    private timeElement : HTMLElement
    private returnToHomeBtn : HTMLElement
    private resumeGameBtn : HTMLElement
    private messageElement : HTMLElement
    
    

    constructor() {
        let startButton = new StartButton(this)
    }
    public startGame(){
        this.player = new Player(this)
        this.healthElement = document.createElement("health")
        document.body.appendChild(this.healthElement)
        this.healthElement.classList.add('info')
        this.healthElement.innerText=`${this.player.health}`

        this.scoreElement = document.createElement("score")
        document.body.appendChild(this.scoreElement)
        this.scoreElement.classList.add('info')
        this.scoreElement.innerText=`${this.player.ammo}`

        this.killsElement = document.createElement("kills")
        document.body.appendChild(this.killsElement)
        this.killsElement.classList.add('info')
        if (this.survivalMode == true){
            this.maxWolves = Infinity
            this.maxActiveWolves = Infinity
            this.timeElement = document.createElement("time")
            document.body.appendChild(this.timeElement)
            this.timeElement.classList.add('info')
            
        }
        if (this.survivalMode == false){
            this.diskElement = document.createElement("diskelement")
            document.body.appendChild(this.diskElement)
            this.diskElement.classList.add('info')
            this.diskElement.innerText = `Collected data disks: ${this.collectedDisks}/3`
        }


        this.gameLoop()
    }

    private gameLoop() {
        if (!this.paused){
        this.player.update()
        if (this.diskCounter !=600 && this.survivalMode == false){
            this.diskCounter ++
        }
        if (this.diskCounter == 600 && this.randomDisk == false && this.survivalMode == false) {
            this.newRandomDisk = true
            this.dataDisks.push(new DataDisk(this))
            this.randomDisk = true
        }
        if (this.activeWolves < this.maxActiveWolves && this.totalWolfSpawns < this.maxWolves){
            this.wolfSpawnCounter ++
            if (this.wolfSpawnCounter == 420){
                this.wolfSpawnCounter = 0
                this.totalWolfSpawns ++
                this.activeWolves ++
                if (this.totalWolfSpawns == this.maxWolves && this.survivalMode == false && this.wolfDisk == false){
                    this.lastWolf = true
                }
                this.wolves.push(new Wolf(this))
            }
            if (this.survivalMode == true){
                this.timeTick ++
                if (this.timeTick == 60){
                    this.timeTick = 0
                    this.timeSeconds ++
                    if (this.timeSeconds == 60){
                        this.timeSeconds = 0
                        this.timeMinutes ++
                    }
                }
                if (this.timeSeconds < 10){
                this.timeElement.innerText = `Time survived: ${this.timeMinutes}:0${this.timeSeconds}`
            } else {
                this.timeElement.innerText = `Time survived: ${this.timeMinutes}:${this.timeSeconds}`
            }
        }
        }
        if (this.activeDeer < 5 && this.totalDeerSpawns < 10 && this.survivalMode == false){
            this.deerSpawnCounter ++
            if (this.deerSpawnCounter == 380){
                this.deerSpawnCounter = 0
                this.totalDeerSpawns ++
                this.activeDeer ++
                if (this.totalDeerSpawns == 10 && this.survivalMode == false && this.deerDisk == false){
                    this.lastDeer = true
                }
                this.deer.push(new Deer(this))
            }
        }
        if (this.activeAmmoBoxes < 3){
            this.ammoSpawnCounter ++
            if (this.ammoSpawnCounter == 600){
                this.ammoBoxes.push(new AmmoBox())
                this.ammoSpawnCounter = 0
                this.activeAmmoBoxes ++
            }
        }
        if (this.activeGearBoxes < 3){
            this.gearBoxSpawnCounter ++
            if (this.gearBoxSpawnCounter == 600){
                this.gearBoxes.push(new GearBox())
                this.gearBoxSpawnCounter = 0
                this.activeGearBoxes ++
            }
        }


        for (let w of this.wolves){
            w.update()
        }
        for (let d of this.deer){
            d.update()
        }
        for (let a of this.ammoBoxes){
            a.update()
        }
        for (let g of this.gearBoxes){
            g.update()
        }
        for (let b of this.bullets) {
            b.update()
        }
        for (let l of this.dataDisks){
            l.update()
        }
        if (this.player.ammo > 0){
        this.scoreElement.innerText=`Ammo : ${this.player.ammo}`;
    } else {
        this.scoreElement.innerText="Out of ammo"
    }
    this.killsElement.innerText= `Kills : ${this.player.kills}`
        if (this.attacked == true){
            this.attackedCounter++
            if (this.attackedCounter == 120){
                this.attacked = false
                this.attackedCounter = 0
            }
        }
        this.checkBoxCollision()
        this.healthElement.innerText= `HP : ${this.player.health}`
        if (this.survivalMode == false){
            this.diskElement.innerText = `Collected data disks: ${this.collectedDisks}/3`
            }
        if (this.player.health < 1 || this.collectedDisks == 3){
            if (this.player.health < 1){
                this.player.health = 0
                this.healthElement.innerText= `HP : ${this.player.health}`
            }
            this.pauseScreen()
        }
        requestAnimationFrame(() => this.gameLoop())
    }
}
    public pauseScreen(){
        this.paused = !this.paused
        if (this.paused){
            if (this.player.health > 0 && this.collectedDisks !== 3 ){
                this.messageElement = document.createElement("paused")
                document.body.appendChild(this.messageElement)
                this.messageElement.classList.add('message')
                this.messageElement.innerText = "Game is paused"

                this.resumeGameBtn = document.createElement("resumebtn")
                document.body.appendChild(this.resumeGameBtn)
                this.resumeGameBtn.classList.add('btn')
                this.resumeGameBtn.innerText = "Resume game"
                this.resumeGameBtn.addEventListener("click", ()=>this.pauseScreen())
                }
            if (this.player.health < 1){
                this.messageElement = document.createElement("destoyed")
                document.body.appendChild(this.messageElement)
                this.messageElement.classList.add('message')
                this.messageElement.innerText = "You have been destroyed"
                }
            if (this.collectedDisks == 3){
                this.messageElement = document.createElement("collected")
                document.body.appendChild(this.messageElement)
                this.messageElement.classList.add('message')
                this.messageElement.innerText = "You have collected al disks (end of game for now)"
            }
            this.returnToHomeBtn = document.createElement("returnbtn")
            document.body.appendChild(this.returnToHomeBtn)
            this.returnToHomeBtn.classList.add('btn')
            this.returnToHomeBtn.innerText = "Return to menu"
            this.returnToHomeBtn.addEventListener("click", ()=>this.toStartScreen())
        } else {
            this.returnToHomeBtn.remove()
            this.resumeGameBtn.remove()
            this.messageElement.remove()
            this.gameLoop()
        }
    }


    private checkBoxCollision(){
        for (let a of this.ammoBoxes){
            if (this.checkCollision(a.getBoundingRect(), this.player.getBoundingRect()) && this.ePressed == true) {
                this.player.ammo = this.player.ammo + a.ammoCount
                a.remove()
                this.activeAmmoBoxes --
            }
        }
        for (let g of this.gearBoxes){
            if (this.player.health < 100){
            if (this.checkCollision(g.getBoundingRect(), this.player.getBoundingRect()) && this.ePressed == true) {
                this.player.health = this.player.health + g.healthCount
                if (this.player.health > 100){
                    this.player.health = 100
                }
                g.remove()
                this.activeGearBoxes --
            }
        }
    }
        for (let w of this.wolves){
            if (this.checkCollision(w.getBoundingRect(), this.player.getBoundingRect())){
                if (this.attacked == false && w.dead == false){
                    this.player.health = this.player.health - 10
                    this.attacked = true
                }

            }
        }
        for (let l of this.dataDisks){
            if (this.checkCollision(l.getBoundingRect(), this.player.getBoundingRect()) && this.ePressed == true){
                this.collectedDisks ++
                l.remove()
            }
        }
        for (let b of this.bullets){
            for (let w of this.wolves){
                if(this.checkCollision(b.getBoundingRect(), w.getBoundingRect()) && w.dead == false){
                    b.remove()
                    w.HP --
                    if (w.HP == 0){
                        w.dead = true
                        w.div.classList.add('dead')
                        this.activeWolves --
                        this.player.kills ++
                        if (w.diskCarrier == true){
                            this.wolfDiskX = w.dropX
                            this.wolfDiskY = w.dropY
                            this.newWolfDisk = true
                            this.dataDisks.push(new DataDisk(this))
                        }
                    }
                }
            }
            for (let d of this.deer){
                if(this.checkCollision(b.getBoundingRect(), d.getBoundingRect()) && d.dead == false){
                    b.remove()
                    d.HP --
                    if (d.HP == 0){
                        d.dead = true
                        d.div.classList.add('dead')
                        this.activeDeer --
                        this.player.kills ++
                        if (d.diskCarrier == true){
                            this.deerDiskX = d.dropX
                            this.deerDiskY = d.dropY
                            this.newDeerDisk = true
                            this.dataDisks.push(new DataDisk(this))
                        }
                    }
                }
            }
        }

    }

     public addBullet() {
        this.bullets.push(new Bullet(this.player, this))
    }

    public removeBullet(bullet:Bullet) {
        bullet.remove()
        this.bullets = this.bullets.filter(b => b !== bullet)
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

     public toStartScreen(){
        this.removeGame()
        new Game()
     }

     public removeGame(){
        for (let w of this.wolves){
            w.remove()
        }
        for (let d of this.deer){
            d.remove()
        }
        for (let b of this.ammoBoxes){
            b.remove()
        }
        for (let g of this.gearBoxes){
            g.remove()
        }
        for (let b of this.bullets){
            b.remove()
        }
        for (let l of this.dataDisks){
            l.remove()
        }
        this.player.remove()
        this.scoreElement.remove()
        this.killsElement.remove()
        this.healthElement.remove()
        this.returnToHomeBtn.remove()
        this.messageElement.remove()
        if (this.player.health > 0 && this.collectedDisks !== 3 ){
            this.resumeGameBtn.remove()
        }
        if(this.survivalMode == true){
            this.timeElement.remove()
        }
        if (this.survivalMode == false){
            this.diskElement.remove()
        }
        this.currentGame = false
        console.log("game has been deleted")
        
     }


     
}
new Game()