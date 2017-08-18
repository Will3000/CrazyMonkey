# crazyMonkey

This is a canvas HTML5 game implemented with ES6 JavaScript following OOP design. Feel free to start the game by opening index.html in your browser. If you are new to these technologies, the following links may help. 
- [HTML5 Canvas Game Tutorial](http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/)
- [ECMAScript 6](https://github.com/lukehoban/es6features)

## Player Control
W: Move Up, A: Move Left, S: Move Down, D: Move Right,  J: Attack

## main.js
main.js contains all the game logics including creation of game objects, states update, rendering etc.

#### `main()`

It runs game flow recursively for each frame. 

#### `update(modifier)`

This function updates the attributes like position, direction of game objects. Movement attributes changes are scale with modifier

#### `render()`

Draw all game objects

## monkey.js
Monkey is the parent class of both monster and hero. Its constructor initializes the basic attributes.

## hero.js
#### `isCloseTo(monster, range = 20)`
Check if hero is close to the target monster.

#### `injuried()`
When hero is being attacked, it updates the status and hp of hero.

#### `updateHpBar()`
Draw HP bar

#### `attack()`
Initiates a weapon object and updates the status.


