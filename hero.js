class Weapon {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 30
    this.height = 30
    this.speed = 604
    this.imageReady = false
    this.direction = null
    this.weaponImage = new Image()
    this.weaponImage.onload = () => {
        this.imageReady = true
    }
    this.weaponImage.src = "images/banana.png"
  }

  isCloseTo(monster, range = 20) {
    if(
      this.x <= (monster.x + range)
      && monster.x <= (this.x + range)
      && this.y <= (monster.y + range)
      && monster.y <= (this.y + range)
    ) {
      return true
    } else {
      return false
    }
  }

  draw(x, y) {
    if(this.imageReady && this.direction) {
      // if(x && y){
      //   this.y = y
      //   this.x = x
      // }
      this.weaponImage.src = "images/banana.png"
      ctx.drawImage(this.weaponImage, this.x + 50, this.y , this.width, this.height)
    }
  }
}

class Hero extends Monkey{
  constructor() {
    super("images/monkey_left.png")
    this.status = 'normal'
    this.maxHP = canvas.width/3
    this.hp = canvas.width/3
    this.direction = "right"
  }

  injuried() {
    if(this.status!='injuried'){
      this.status = 'injuried'
      this.hp = this.hp - (0.2 * this.maxHP)

      if(this.hp <= 0.1 * this.maxHP){
        this.die()
      }

      setTimeout(()=>{
        this.status = 'normal'
      }, 1 * 1000)
    }
  }

  updateHpBar(){
    ctx.fillStyle = "red"
    ctx.fillRect(10, 10, this.hp, 25)
  }

  attack(monster){
    if(this.status=="normal"){
      this.weapon = new Weapon(this.x, this.y)
      this.weapon.direction = this.direction
      this.status="attacking"

      setTimeout(()=>{
        this.status = 'normal'
      }, 1 * 1000)
    }
    // if(this.isCloseTo(monster, 64)){
    //   monster.die()
    // }
  }

  die() {
    this.status = 'dead'
  }

  isCloseTo(monster, range = 32){
    let hero = this
    if(
      hero.x <= (monster.x + range)
  		&& monster.x <= (hero.x + range)
  		&& hero.y <= (monster.y + range)
  		&& monster.y <= (hero.y + range)
    ) {
      return true
    } else {
      return false
    }
  }

  draw() {
    if(this.imageReady) {
      if(this.direction == 'right') {
        this.heroImage.src = "images/monkey_left.png"
      } else {
        this.heroImage.src = "images/monkey_right.png"
      }
      ctx.drawImage(this.heroImage, this.x, this.y, this.width, this.height)
    }
    if(this.weapon)
      this.weapon.draw(this.x, this.y)
  }
}
