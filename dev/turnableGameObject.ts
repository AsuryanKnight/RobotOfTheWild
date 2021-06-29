export class TurnableGameObject {
    protected x : number 
    protected y : number 
    protected ySpeed : number = 0
    protected xSpeed : number = 0
    protected angle : number = 0
    public div : HTMLElement
    


    constructor(tag : string) {
        this.div = document.createElement(tag)
        document.body.appendChild(this.div)
    }

    public getBoundingRect(): ClientRect {
        return this.div.getBoundingClientRect()
    }

    public update() {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)rotate(${this.angle}deg)`
    }

    public remove(){
        this.div.remove()
    }
}