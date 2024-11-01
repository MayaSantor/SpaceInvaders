import { PATH_INVADER } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Invader {
    constructor (position, velocity) {
        this.width = 50 * 0.8;
        this.height = 37 * 0.8;
        this.velocity = velocity;
        this.position = position;
        this.image = this.getImage(PATH_INVADER);
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



    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }


    shoot(projetiles) {
        const p = new Projectile({
            x: this.position.x + this.width / 2 - 1,
            y: this.position.y + 2,
        },
            10
        );
        projetiles.push(p)
    }

}

export default Invader