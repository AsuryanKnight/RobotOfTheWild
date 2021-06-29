import { GameObject } from "./gameobject.js";
export class EndScreen extends GameObject {
    constructor(game) {
        super("endscreen");
        this.game = game;
        const text = document.createElement("div");
        const btn = document.createElement("button");
        this.element.appendChild(text);
        this.element.appendChild(btn);
        text.innerText = "Game Over";
        btn.innerText = "Back to start";
        btn.addEventListener("click", () => this.gotoStartScreen());
    }
    gotoStartScreen() {
        this.remove();
        this.game.showStartScreen();
    }
}
//# sourceMappingURL=endscreen.js.map