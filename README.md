# CMTTHE04-1 Week 7 - Werken met Classes

- Een Class maken voor de speech API
- Wisselen tussen schermen

<br>
<br>

## Een Class maken voor de speech API

De [Speech API](https://github.com/HR-CMGT/PRG08-2020-2021/blob/main/snippets/speech.md) heeft een eigenschap `synth` en een function `speak`, dit leent zich perfect om een `class` van te maken.

<br>
<br>

## Wisselen tussen schermen

We gebruiken **composition** om te kunnen wisselen tussen schermen. Elk scherm krijgt een eigen Class waarin game elementen geplaatst worden. Vanuit `game.ts` wordt alleen nog maar de `update` van het huidige scherm aangeroepen.

<img src="./classdiagram.png" width="600">

Het is belangrijk dat al deze classes een update en remove functie hebben.

<br>



## DOM Objecten verwijderen

Om zeker te weten dat alle DOM elementen verwijderd worden moet elk scherm een `remove` functie hebben. In gamescreen wordt dit gebruikt om alle robots te verwijderen. Roep ook `super.remove()` aan om de gamescreen div te verwijderen.

```typescript
public remove() {
    for (let o of this.robots) {
        o.remove()
    }
    super.remove()
}
```
