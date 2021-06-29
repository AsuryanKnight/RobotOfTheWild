export class TurnableGameObject {
    constructor(tag) {
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.angle = 0;
        this.div = document.createElement(tag);
        document.body.appendChild(this.div);
    }
    getBoundingRect() {
        return this.div.getBoundingClientRect();
    }
    update() {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)rotate(${this.angle}deg)`;
    }
    remove() {
        this.div.remove();
    }
}
//# sourceMappingURL=turnableGameObject.js.map