class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.wid = paddleWidth
    this.len = paddleHeight

    this.points = 0
    this.vel = 0
    this.speed = paddleSpeed
  }

  update() {
    this.updatePos()
    this.checkBounderies()
    // this.updateAI()
  }

  updateAI() {
    this.y = ball.y - this.len / 2
  }

  updatePos() {
    this.y += this.vel
  }

  draw() {
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x, this.y, this.wid, this.len)
    this.drawScore()
  }

  drawScore() {
    ctx.fillStyle = 'white'
    // if (font[this.points]) font[this.points](this.x / 2 + width / 4, 36)
    ctx.font = `bold ${fontSize}px serif`
    ctx.fillText(this.points, this.x / 2 + width / 4, fontSize)
  }

  checkBounderies() {
    if (this.y + this.len >= height) this.y = height - this.len 
    if (this.y <= 0) this.y = 0
  }
}