import { StaticGameObject } from "./gameObject.js";
export class DataDisk extends StaticGameObject {
    constructor(g) {
        super("datadisk");
        this.game = g;
        if (this.game.newWolfDisk == true) {
            this.x = this.game.wolfDiskX;
            this.y = this.game.wolfDiskY;
            this.game.newWolfDisk = false;
        }
        if (this.game.newDeerDisk == true) {
            this.x = this.game.deerDiskX;
            this.y = this.game.deerDiskY;
            this.game.newDeerDisk = false;
        }
        if (this.game.newRandomDisk == true) {
            this.x = Math.floor(Math.random() * (window.innerWidth - this.div.clientWidth * 1.2));
            this.y = Math.floor(Math.random() * (window.innerHeight - this.div.clientHeight * 1.2));
            this.game.newRandomDisk = false;
        }
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=dataDisk.js.map