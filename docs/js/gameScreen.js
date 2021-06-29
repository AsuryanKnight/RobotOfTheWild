import { StaticGameObject } from "./gameObject.js";
import { Player } from "./player.js";
import { Bullet } from "./bullet.js";
import { AmmoBox } from "./ammoBox.js";
import { GearBox } from "./gearbox.js";
import { Wolf } from "./wolf.js";
import { Deer } from "./deer.js";
export class GameScreen extends StaticGameObject {
    constructor(g) {
        super("gamescreen");
        this.bullets = [];
        this.ePressed = false;
        this.direction = "right";
        this.paused = false;
        this.ammoBoxes = [];
        this.ammoSpawnCounter = 0;
        this.activeAmmoBoxes = 0;
        this.gearBoxes = [];
        this.gearBoxSpawnCounter = 0;
        this.activeGearBoxes = 0;
        this.wolves = [];
        this.attacked = false;
        this.attackedCounter = 0;
        this.wolfSpawnCounter = 0;
        this.totalWolfSpawns = 0;
        this.activeWolves = 0;
        this.deer = [];
        this.deerSpawnCounter = 0;
        this.totalDeerSpawns = 0;
        this.activeDeer = 0;
        this.game = g;
        if (this.survivalMode == false) {
            console.log("false");
        }
        if (this.survivalMode == true) {
            console.log("Survival game started!");
        }
        this.player = new Player(this);
        this.healthElement = document.createElement("health");
        document.body.appendChild(this.healthElement);
        this.healthElement.innerText = `${this.player.health}`;
        this.breakElement = document.createElement("br");
        document.body.appendChild(this.breakElement);
        this.scoreElement = document.createElement("score");
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerText = `${this.player.ammo}`;
        this.breakElement = document.createElement("br");
        document.body.appendChild(this.breakElement);
        this.killsElement = document.createElement("kills");
        document.body.appendChild(this.killsElement);
        this.gameLoop();
    }
    gameLoop() {
        if (!this.paused) {
            this.player.update();
            if (this.activeWolves < 2 && this.totalWolfSpawns < 5) {
                this.wolfSpawnCounter++;
                if (this.wolfSpawnCounter == 420) {
                    this.wolves.push(new Wolf());
                    this.wolfSpawnCounter = 0;
                    this.totalWolfSpawns++;
                    this.activeWolves++;
                }
            }
            if (this.activeDeer < 5 && this.totalDeerSpawns < 10) {
                this.deerSpawnCounter++;
                if (this.deerSpawnCounter == 380) {
                    this.deer.push(new Deer());
                    this.deerSpawnCounter = 0;
                    this.totalDeerSpawns++;
                    this.activeDeer++;
                }
            }
            if (this.activeAmmoBoxes < 3) {
                this.ammoSpawnCounter++;
                if (this.ammoSpawnCounter == 600) {
                    this.ammoBoxes.push(new AmmoBox());
                    this.ammoSpawnCounter = 0;
                    this.activeAmmoBoxes++;
                }
            }
            if (this.activeGearBoxes < 3) {
                this.gearBoxSpawnCounter++;
                if (this.gearBoxSpawnCounter == 600) {
                    this.gearBoxes.push(new GearBox());
                    this.gearBoxSpawnCounter = 0;
                    this.activeGearBoxes++;
                }
            }
            for (let w of this.wolves) {
                w.update();
            }
            for (let d of this.deer) {
                d.update();
            }
            for (let a of this.ammoBoxes) {
                a.update();
            }
            for (let g of this.gearBoxes) {
                g.update();
            }
            for (let b of this.bullets) {
                b.update();
            }
            if (this.player.ammo > 0) {
                this.scoreElement.innerText = `Ammo : ${this.player.ammo}`;
            }
            else {
                this.scoreElement.innerText = "Out of ammo";
            }
            this.killsElement.innerText = `Kills : ${this.player.kills}`;
            this.healthElement.innerText = `HP : ${this.player.health}`;
            if (this.attacked == true) {
                this.attackedCounter++;
                if (this.attackedCounter == 120) {
                    this.attacked = false;
                    this.attackedCounter = 0;
                }
            }
            this.checkBoxCollision();
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    checkBoxCollision() {
        for (let a of this.ammoBoxes) {
            if (this.checkCollision(a.getBoundingRect(), this.player.getBoundingRect()) && this.ePressed == true) {
                this.player.ammo = this.player.ammo + a.ammoCount;
                a.remove();
                this.activeAmmoBoxes--;
            }
        }
        for (let g of this.gearBoxes) {
            if (this.player.health < 100) {
                if (this.checkCollision(g.getBoundingRect(), this.player.getBoundingRect()) && this.ePressed == true) {
                    this.player.health = this.player.health + g.healthCount;
                    if (this.player.health > 100) {
                        this.player.health = 100;
                    }
                    g.remove();
                    this.activeGearBoxes--;
                }
            }
        }
        for (let w of this.wolves) {
            if (this.checkCollision(w.getBoundingRect(), this.player.getBoundingRect())) {
                if (this.attacked == false && w.dead == false) {
                    this.player.health = this.player.health - 10;
                    this.attacked = true;
                }
            }
        }
        for (let b of this.bullets) {
            for (let w of this.wolves) {
                if (this.checkCollision(b.getBoundingRect(), w.getBoundingRect()) && w.dead == false) {
                    b.remove();
                    w.HP--;
                    if (w.HP == 0) {
                        w.dead = true;
                        w.div.classList.add('dead');
                        this.activeWolves--;
                        this.player.kills++;
                    }
                }
            }
            for (let d of this.deer) {
                if (this.checkCollision(b.getBoundingRect(), d.getBoundingRect()) && d.dead == false) {
                    b.remove();
                    d.HP--;
                    if (d.HP == 0) {
                        d.dead = true;
                        d.div.classList.add('dead');
                        this.activeDeer--;
                        this.player.kills++;
                    }
                }
            }
        }
    }
    addBullet() {
        this.bullets.push(new Bullet(this.player, this));
    }
    removeBullet(bullet) {
        bullet.remove();
        this.bullets = this.bullets.filter(b => b !== bullet);
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
}
//# sourceMappingURL=gamescreen.js.map