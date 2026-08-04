class Text {
  constructor(x, y, size, font, colour) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.font = font;
    this.colour = colour;
  }

  // Draws text on screen
  draw() {
    ctx.font = `${this.size} ${this.font}`;
    ctx.textAlign = "center";
    ctx.fillStyle = this.colour;
    ctx.fillText(this.text, this.x, this.y);
  }
}
