let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")
canvas.width = 512
canvas.height = 480
document.body.appendChild(canvas)

// Player control
let playerKeys = {
  up: 87,
  down: 83,
  left: 65,
  right: 68,
  attack: 74
}
// Background image
let bgReady = false
let bgImage = new Image()
bgImage.onload = () => {
  bgReady = true
}
bgImage.src = "images/background.png"

let heroReady = false
let heroImage = new Image()
heroImage.onload = () => {
    heroReady = true
}
heroImage.src = "images/monkey_left.png"


let monsterReady = false
let monsterImage = new Image()
monsterImage.onload = () => {
    monsterReady = true
}
monsterImage.src = "images/monkey_right.png"


let hero = new Hero()
let monster = new Monster()
let monstersCaught = 0
let keysDown = {}

addEventListener("keydown", (e) => {
  keysDown[e.keyCode] = true
}, false)

addEventListener("keyup", (e) => {
  delete keysDown[e.keyCode]
}, false)

function reset() {
    hero.x = canvas.width / 4
    hero.y = canvas.height * 3 / 4

    monster.x = canvas.width * 3 / 4
    monster.y = canvas.height * 3 / 4
    hero.updateHpBar()
}

function update(modifier) {
    if ( playerKeys.up in keysDown) {
      hero.y -= hero.speed * modifier
    }

    if ( playerKeys.down in keysDown) {
      hero.y += hero.speed * modifier
    }

    if (playerKeys.left in keysDown) {
      hero.x -= hero.speed * modifier
    }

    if (playerKeys.right in keysDown) {
      hero.x += hero.speed * modifier
    }

    if (playerKeys.attack in keysDown) {
      hero.attack(monster)
    }
    // monster movement
    if (hero.x < monster.x) {
      monster.x -= monster.speed * modifier
    }
    if (hero.x > monster.x) {
      monster.x += monster.speed * modifier
    }
    if (hero.y < monster.y) {
      monster.y -= monster.speed * modifier
    }
    if (hero.y > monster.y) {
      monster.y += monster.speed * modifier
    }
    // If they are touching

    if(hero.isCloseTo(monster)) {
      // -hp effect
      hero.injuried()
    }
}

function render() {
  if(bgReady){
    ctx.drawImage(bgImage, 0, 0)
  }
  if(heroReady){
    ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height)
  }
  if(monsterReady){
    // ctx.rotate(20 * Math.PI/180)
    ctx.drawImage(monsterImage, monster.x, monster.y, monster.width, monster.height)
  }
  hero.updateHpBar()
}

function gameOver() {
  ctx.fillStyle = "red"
  ctx.font="70px Arial Bold"
  ctx.textAlign="center"
  ctx.fillText("Game Over", canvas.width/2 , canvas.height/2)
}

function main() {
  if(hero.status == 'dead'){
    gameOver()
    return
  }

  let now = Date.now()
  let delta = now - then

  update(delta / 3000)
  render()

  then = now
  if (delta < 2000) {
    requestAnimationFrame(main)
  }
}

// Cross-browser support for requestAnimationFrame
let w = window
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame

let then = Date.now()
reset()
main()
