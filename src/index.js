import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.imageSmoothingEnabled = false

const player = new Player (canvas.width, canvas.height);

const p = new Projectile({x: 300, y: 300}, 5)

const keys = {
    left: false,
    right: false
}

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    p.draw(ctx);

    ctx.save();

      ctx.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        );
    
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
});

window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (key === "a") keys.left = false
    if (key === "d") keys.right = false
});