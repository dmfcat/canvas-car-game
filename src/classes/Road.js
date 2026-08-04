class Road {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: 0,
    };
    this.width = roadWidth;
    this.height = roadHeight;
  }

  // Speed (road moves, to give the illusion of the car moving)
  set xVelocity(speed) {
    this.velocity.x = speed;
  }

  // Draws sprites
  draw() {
    this.img = new Image();
    this.img.src = "assets/sprites/road.png";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // Updates position
  update() {
    this.x -= this.velocity.x;
  }
}
