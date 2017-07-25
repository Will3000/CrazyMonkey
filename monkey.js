class Monkey {
	constructor(src, speed=256) {
		this.speed = speed
		this.x = 0
		this.y = 0
		this.width = 70
		this.height = 80
	    this.imageReady = false
	    this.heroImage = new Image()
	    this.heroImage.onload = () => {
	        this.imageReady = true
	    }
	    this.heroImage.src = src
	}
}