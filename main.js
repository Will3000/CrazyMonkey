let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")
let canvasStyle = canvas.style
canvas.width = 512
canvas.height = 480

canvasStyle.position = "relative"
canvasStyle.left = `${window.innerWidth/2 - canvas.width/2}px`
canvasStyle.top = `${window.innerHeight/2 - canvas.height/2}px`
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


let hero = new Hero()
let monsterList = [new Monster(20, 30)]
// let monsterList = [new Monster(20, 30), new Monster()]
// let monster = new Monster()
let monstersCaught = 0
let level = 1
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

    // monster.x = canvas.width * 3 / 4
    // monster.y = canvas.height * 3 / 4
    hero.updateHpBar()
}

let genStatus = "free"
function monsterGenerator() {
  if(genStatus == "free"){
    const originSpd = 5 // spawn one monster every 5 seconds
    let generateSpd = originSpd * ( 1 - level * 0.1 )
    let x = canvas.width * Math.random()
    let y = canvas.height * Math.random()
    monsterList.push( new Monster(x, y) )
    genStatus = "busy"
    setTimeout(()=>{
      genStatus = "free"
    }, generateSpd * 1000)    
  }
}

function update(modifier) {
  monsterGenerator()
  if ( playerKeys.up in keysDown) {
    hero.y -= hero.speed * modifier
  }

  if ( playerKeys.down in keysDown) {
    hero.y += hero.speed * modifier
  }

  if (playerKeys.left in keysDown) {
    hero.x -= hero.speed * modifier
    hero.direction = "left"
  }

  if (playerKeys.right in keysDown) {
    hero.x += hero.speed * modifier
    hero.direction = "right"
  }

  if (playerKeys.attack in keysDown) {
    // throwing banana
    hero.attack()
  }
  if(hero.weapon) {
    if(hero.weapon.direction == "left") {
      hero.weapon.x -= hero.weapon.speed * modifier
    }
    if(hero.weapon.direction == "right") {
      hero.weapon.x += hero.weapon.speed * modifier
    }
  }

  // monster movement
  for(let i in monsterList) {
    let monster = monsterList[i]
    if (hero.x < monster.x) {
      monster.direction = "left"
      monster.x -= monster.speed * modifier
    }
    if (hero.x > monster.x) {
      monster.direction = "right"
      monster.x += monster.speed * modifier
    }
    if (hero.y < monster.y) {
      monster.y -= monster.speed * modifier
    }
    if (hero.y > monster.y) {
      monster.y += monster.speed * modifier
    }
    // If they are touching
    if(hero.weapon && hero.weapon.isCloseTo(monster)){
      monsterList.splice(i, 1)
      hero.weapon = null
    }
    if(hero.isCloseTo(monster)) {
      hero.injuried()
    }
  }
}

function render() {
  if(bgReady){
    ctx.drawImage(bgImage, 0, 0)
  }
  hero.draw()
  for(let monster of monsterList){
    if(monster){
      monster.draw()    
    } 
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
