class Player {
    constructor (canvasWidth, canvasHeigth) {
        this.width = 100;
        this.heigth = 100;
        this.velocity = 6;
        this.position = {
            x: canvasWidth / 2 - this.width / 2,
            y: canvasHeigth - this.heigth - 30,
        }
    }

    moveLeft () {
        this.position.x -= this.velocity;
    }

    moveRight () {
        this.position.x += this.velocity;
    }


    
    draw (ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.heigth
        )
    }
}

export default Player