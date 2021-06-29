import { StaticGameObject } from "./gameobject.js";
export class GearBox extends StaticGameObject {
    constructor() {
        super("gearbox");
        this.healthCount = Math.floor(Math.random() * (15 - 7) + 7);
        this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth * 1.2));
        this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight * 1.2));
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=gearbox.js.map