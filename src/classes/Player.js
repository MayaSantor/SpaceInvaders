import { INICIAL_FRAMES, PATH_ENGINE_IMAGE, PATH_ENGINESPRITES_IMAGE, PATH_SPACESHIP_IMAGE } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Player {
    constructor (canvasWidth, canvasHeight) {
        this.width = 48 * 2;
        this.height = 48 * 2;
        this.velocity = 8;
        this.position = {
            x: canvasWidth / 2 - this.width / 2,
            y: canvasHeight - this.height - 30,
        }
        this.image = this.getImage(PATH_SPACESHIP_IMAGE);
        this.engineImage = this.getImage(PATH_ENGINE_IMAGE);   
        this.engineSprits = this.getImage(PATH_ENGINESPRITES_IMAGE);

        this.sx = 0
        this.framesCounter = INICIAL_FRAMES;
    }

    getImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    }

    moveLeft () {
        this.position.x -= this.velocity;
    }

    moveRight () {
        this.position.x += this.velocity;
    }


    
    draw (ctx) {

        ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );

        ctx.drawImage(
            this.engineSprits, 
            this.sx,
            0,
            48,
            48,
            this.position.x,
            this.position.y + 10,
            this.width,
            this.height
        );

        ctx.drawImage(
            this.engineImage, 
            this.position.x, 
            this.position.y + 8 , 
            this.width, 
            this.height
        );
        
        this.update()
    }

    update () {
        if (this.framesCounter === 0) {
            this.sx = this.sx === 96 ? 0 : this.sx + 48;
            this.framesCounter = 8;
        }

        this.framesCounter --;        
    }

    shoot(projetiles) {
        const p = new Projectile({
            x: this.position.x + this.width / 2 - 1,
            y: this.position.y + 2,
        },
            - 10
        );
        projetiles.push(p)
    }

    hit(projectile) {
        return (
            projectile.position.x >= this.position.x + 20
            &&
            projectile.position.x <= this.position.x + 20 + this.width - 38
            &&
            projectile.position.y >= this.position.y + 22
            &&
            projectile.position.y <= this.position.y + 22 + this.height - 34
        )
    }

}

export default Player