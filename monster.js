class Monster extends Monkey{
  constructor(x, y) {
    let params = {
      x : x,
      y : y,
      src : "images/monkey_right.png",
      speed: 100
    }
    super(params)
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
