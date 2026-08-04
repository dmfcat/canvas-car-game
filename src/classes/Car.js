class Car {
  constructor(x, y, sprite, type) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = carWidth;
    this.height = carHeight;
    this.sprite = sprite;
    this.crashed = false;
    if (type === "traffic") {
      this.x =
        Math.random() * (x + xVariance - (x - xVariance)) + (x - xVariance);
      this.y =
        Math.random() * (y + yVariance - (y - yVariance)) + (y - yVariance);
      this.sprite = carColours[Math.floor(Math.random() * carColours.length)];
      this.passed = false;
      this.xVelocity = -(Math.random() * (maxSpeed - minSpeed) + minSpeed);
    }
  }

  // Controls
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }

  // Speed
  set xVelocity(speed) {
    this.velocity.x = speed;
  }
  set yVelocity(speed) {
    this.velocity.y = speed;
  }

  // Handles passing (for scoring)
  pass() {
    this.passed = true;
  }
  isPassed() {
    return this.passed;
  }

  // Handles crashing (for game over)
  crash() {
    this.crashed = true;
    this.sprite = "wreck";
    // Car travels leftward at half speed
    this.velocity.x = -moveSpeed / 2;
    this.velocity.y = 0;
  }

  // Should only be called on the player object, not traffic[car] objects
  reset() {
    this.x = -carWidth;
    this.y = playerY;
    this.velocity.x = 0;
    this.sprite = "player";
  }

  // Draws sprites
  draw() {
    this.img = new Image();
    this.img.src = `assets/sprites/${this.sprite}.png`;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // Updates position
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
