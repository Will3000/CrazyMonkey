class Monster extends Monkey{
  constructor() {
    super("images/monkey_right.png", 100)
    this.direction = "left"
  }

  die() {
    this.x = 0
    this.y = 0
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
  }
}
