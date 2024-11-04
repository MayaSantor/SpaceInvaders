import Invader from "./Invader.js";

class Grid {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;

        this.direction = "right"
        this.moveDown = false;

        this.invadersVelocity = 1;
        this.invaders = this.init();
    }

    init() {
        const array = [];

        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                const invader = new Invader(
                    {
                        x: col * 50 + 20,
                        y: row * 37 + 20,
                    },
                    this.invadersVelocity
                );

                array.push(invader);
            }
        }

        return array;
    }

    draw(ctx) {
        this.invaders.forEach((invader) => invader.draw(ctx));
    }

    update () {
 //       if (chegouNaBordaDireita) {
 //           direçao = "left";
 //           this.moveDown = true;
 //       }
 //       else if (chegouNaBordeEsquerda) {
 //           this.direction = "right"
 //           this.moveDown = true;
 //       }

        this.invaders.forEach((invader) => {
            
            if (this.moveDown) {
                invader.moveDown();
            }

            if (this.direction === "right") invader.moveRight();
            if (this.direction === "left") invader.moveLeft();
        })
    }
}

export default Grid;