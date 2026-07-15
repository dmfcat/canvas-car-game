class Road {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: 0,
        }
        this.width = roadWidth;
        this.height = roadHeight;
    }
    set xVelocity(speed) {
        this.velocity.x = speed;
    }
    draw() {
        this.img = new Image();
        this.img.src = "assets/sprites/road.png";
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    update() {
        this.x -= this.velocity.x;
    }
}
