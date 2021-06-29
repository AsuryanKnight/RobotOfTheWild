import { TurnableGameObject } from "./turnableGameObject.js";
export class Stag extends TurnableGameObject {
    constructor() {
        super("deer");
        this.HP = 3;
        this.dead = false;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.genderRNG = Math.floor(Math.random() * (2 - 0) + 0);
        this.posRNG = Math.floor(Math.random() * (3 - 0) + 0);
        if (this.genderRNG == 0) {
            this.div.classList.add('male');
        }
        if (this.genderRNG == 1) {
            this.div.classList.add();
        }
        if (this.posRNG == 0) {
            this.x = window.innerWidth + Math.random() * 200;
            this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight));
            this.xSpeed = -5;
            this.angle = 90;
        }
        if (this.posRNG == 1) {
            this.y = window.innerHeight + Math.random() * 200;
            this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth));
            this.ySpeed = -5;
            this.angle = 180;
        }
        if (this.posRNG == 2) {
            this.y = 0 - this.div.clientHeight;
            this.x = this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth));
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
            super.update();
        }
    }
}
//# sourceMappingURL=stag.js.map