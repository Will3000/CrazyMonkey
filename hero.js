class Hero {
  constructor() {
    this.speed = 256
    this.x = 50
    this.y = 250
    this.width = 70
    this.height = 80
    this.imageReady = false
    this.status = 'normal'
    this.maxHP = canvas.width/3
    this.hp = canvas.width/3
  }

  injuried() {
    if(this.status=='normal'){
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
    if(this.isCloseTo(monster, 64)){
      monster.die()
    }
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
      ctx.drawImage(heroImage, this.x, this.y, this.width, this.height)
    }
  }
}
