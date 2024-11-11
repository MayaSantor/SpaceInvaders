import Invader from "./classes/Invader.js";
import Player from "./classes/Player.js";
import Grid from "./classes/Grid.js";
import Particle from "./classes/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.imageSmoothingEnabled = false

const player = new Player (canvas.width, canvas.height);
const grid = new Grid(3, 6);
const playerProjectiles = [];
const invadersProjectiles = [];
const particles = [];


const keys = {
    left: false,
    right: false,
    shoot: {
        pressed: false,
        released: true
    }
};

const drawProjectiles = () => {
    const projectiles = [...playerProjectiles, ...invadersProjectiles];
    projectiles.forEach((projectile) => {    
        projectile.draw(ctx);
        projectile.update();
    })   
}

const drawParticles = () => {
    particles.forEach((particle) => {
        particle.draw(ctx);
        particle.update();
    }) 


}

const clearProjectiles = () => {
    playerProjectiles.forEach((projectile, index) => {
        if (projectile.position.y <= 0){
            playerProjectiles.splice(index, 1);
        }
    })
}

const creatExplosion = (position, size, color) => {
    for (let i = 0; i < size; i += 1) {
        const particle = new Particle (
            {
                x: position.x,
                y: position.y
            },
            {
                x:Math.random() -0.5 * 1.5,
                y:Math.random() -0.5 * 1.5
            },
            2,
            color
        );

        particles.push(particle)
        
    }
}

const checkShootInvaders = () => {
    grid.invaders.forEach((invader, invaderIndex) => {
        playerProjectiles.some((projectile, projectileIndex) => {
            if (invader.hit(projectile)) {
                creatExplosion(
                    {
                        x: invader.position.x + invader.width / 2,
                        y: invader.position.y + invader.height / 2
                    },
                    10,
                    "#941cff"
                );

                grid.invaders.splice(invaderIndex, 1);
                playerProjectiles.splice(projectileIndex, 1)
                
            }
        })
    })
}



const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawParticles();
    drawProjectiles();
    clearProjectiles();

    checkShootInvaders();

   grid.draw(ctx);
   grid.update();

    ctx.save();

    ctx.translate(
        player.position.x + player.width / 2,
        player.position.y + player.height / 2
    );

    if (keys.shoot.pressed && keys.shoot.released){
        player.shoot(playerProjectiles);
        keys.shoot.released = false;
    }
    
    if (keys.left && player.position.x >= 0) {
     player.moveLeft();
     ctx.rotate(-0.15)
    }

    if (keys.right && player.position.x <= canvas.width - player.width) {
        player.moveRight();
        ctx.rotate(0.15)
    }

    ctx.translate(
        -player.position.x - player.width / 2,
        -player.position.y - player.height / 2,
    )

    player.draw(ctx);



    ctx.restore();

    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === "a") keys.left = true;
    if (key === "d") keys.right = true;
    if (key === " ") keys.shoot.pressed = true
});

window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (key === "a") keys.left = false
    if (key === "d") keys.right = false
    if (key === " ") {
        keys.shoot.pressed = false;
        keys.shoot.released = true;        
    }
});

setInterval (() => {
    const invader = grid.getRandomInvader()
    if (invader) {
        invader.shoot(invadersProjectiles)        
    }
},
1000
)