import { GameObject } from "./gameobject.js";
export class Robot extends GameObject {
    constructor(screen) {
        super("robot");
        this.speed = Math.random() * 3 + 2;
        this.screen = screen;
        this.x = Math.random() * 600;
        this.y = Math.random() * 450 + 100;
        this.element.addEventListener("click", () => this.removeMe());
    }
    removeMe() {
        this.remove();
        this.screen.removeRobot(this);
    }
    update() {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            this.x = -100;
            this.y = Math.random() * 450 + 100;
        }
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
//# sourceMappingURL=robot.js.map