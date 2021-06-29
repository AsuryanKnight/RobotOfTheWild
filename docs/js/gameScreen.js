import { Background } from "./background.js";
import { GameObject } from "./gameobject.js";
import { Robot } from "./robot.js";
export class GameScreen extends GameObject {
    constructor(g) {
        super("gamescreen");
        this.robots = [];
        this.game = g;
        const text = document.createElement("instructions");
        this.element.appendChild(text);
        text.innerText = "Click the robots to remove them!";
        this.background = new Background();
        this.robots.push(new Robot(this), new Robot(this), new Robot(this), new Robot(this), new Robot(this));
    }
    removeRobot(robot) {
        this.robots = this.robots.filter(rob => rob != robot);
        if (this.robots.length == 0) {
            this.remove();
            this.game.showEndScreen();
        }
    }
    update() {
        this.background.update();
        for (let o of this.robots) {
            o.update();
        }
    }
    remove() {
        this.background.remove();
        super.remove();
    }
}
//# sourceMappingURL=gamescreen.js.map