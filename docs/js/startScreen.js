import { GameObject } from "./gameobject.js";
export class StartScreen extends GameObject {
    constructor(game) {
        super("startscreen");
        this.game = game;
        const text = document.createElement("div");
        const btn = document.createElement("button");
        this.element.appendChild(text);
        this.element.appendChild(btn);
        text.innerText = "Robot Clicker";
        btn.innerText = "START GAME";
        btn.addEventListener("click", () => this.gotoGameScreen());
    }
    gotoGameScreen() {
        this.remove();
        this.game.showGameScreen();
    }
}
//# sourceMappingURL=startscreen.js.map