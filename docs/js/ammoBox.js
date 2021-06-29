import { StaticGameObject } from "./gameobject.js";
export class AmmoBox extends StaticGameObject {
    constructor() {
        super("ammobox");
        this.ammoCount = Math.floor(Math.random() * (15 - 7) + 7);
        this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth * 1.2));
        this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight * 1.2));
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=ammoBox.js.map