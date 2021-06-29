import { TurnableGameObject } from "./turnableGameObject.js";
export class Deer extends TurnableGameObject {
    constructor(g) {
        super("deer");
        this.diskCarrier = false;
        this.dead = false;
        this.game = g;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.genderRNG = Math.floor(Math.random() * (2 - 0) + 0);
        this.posRNG = Math.floor(Math.random() * (3 - 0) + 0);
        this.diskRNG = Math.floor(Math.random() * (5 - 0) + 0);
        if (this.diskRNG == 4 && this.game.survivalMode == false && this.game.deerDisk == false || this.game.lastDeer == true) {
            this.diskCarrier = true;
            this.game.deerDisk = true;
        }
        if (this.genderRNG == 0) {
            this.div.classList.add('male');
            this.HP = 2;
        }
        if (this.genderRNG == 1) {
            this.div.classList.add('female');
            this.HP = 1;
        }
        if (this.posRNG == 0) {
            this.x = window.innerWidth + Math.random() * 200;
            this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight * 1.3));
            this.xSpeed = -5;
            this.angle = 90;
        }
        if (this.posRNG == 1) {
            this.y = window.innerHeight + Math.random() * 200;
            this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth * 1.3));
            this.ySpeed = -5;
            this.angle = 180;
        }
        if (this.posRNG == 2) {
            this.y = 0 - this.div.clientHeight * 2;
            this.x = this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth * 1.3));
            this.ySpeed = 5;
        }
    }
    update() {
        if (this.dead == false) {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            if (this.x < (0 - this.div.clientWidth * 3)) {
                this.xSpeed = this.xSpeed * -1;
                this.angle = 270;
            }
            if (this.x > window.innerWidth + this.div.clientWidth * 3) {
                this.xSpeed = this.xSpeed * -1;
                this.angle = 90;
            }
            if (this.y < (0 - this.div.clientWidth * 3)) {
                this.ySpeed = this.ySpeed * -1;
                this.angle = 0;
            }
            if (this.y > window.innerHeight + this.div.clientWidth * 3) {
                this.ySpeed = this.ySpeed * -1;
                this.angle = 180;
            }
            if (this.diskCarrier) {
                this.dropX = this.x;
                this.dropY = this.y;
            }
            super.update();
        }
    }
}
//# sourceMappingURL=deer.js.map