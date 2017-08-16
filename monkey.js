class Monkey {
	constructor(params) {
		if(!params.src){
			console.log("src is missing")
		}
		this.speed = params.speed || 256
		this.x = params.x || 0
		this.y = params.y || 0
		this.width = 70
		this.height = 80
	    this.imageReady = false
	    this.heroImage = new Image()
	    this.heroImage.onload = () => {
	        this.imageReady = true
	    }
	    this.heroImage.src = params.src
	}
}