class Ball {
  constructor() {
    this.rad = ballRadius
    this.speed = ballSpeed
    this.reset()
  }
  
  update() {
    this.x += this.vel.x
    this.y += this.vel.y
    this.checkCollision()
  }

  draw() {
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x, this.y, this.rad, this.rad)
  }

  generateRandomVel() {
    const x = Math.random() <= 0.5 ? this.speed * -1 : this.speed
    const y = Math.random() <= 0.5 ? this.speed * -1 : this.speed

    this.vel = {x, y}
  }

  reset() {
    this.generateRandomVel()
    this.x = width / 2
    this.y = height / 2

    player.y = (height / 2 - paddleHeight / 2)
    enemy.y = (height / 2 - paddleHeight / 2)
  }  

  checkCollision() {
    // Player
    if (this.x <= (player.x + player.wid - this.rad)) {
      const playerBottom = player.y + player.len
      const playerTop = player.y
      const offset = this.rad

      if (this.y <= playerBottom && this.y >= playerTop - offset) {
        this.x = player.x + player.wid
        this.vel.x *= -1
        return
      } else {
        enemy.points += 1
        doUpdate = false;
        this.reset()
        return
      }
    }

    const enemyTop =  enemy.y + enemy.len
    const enemyBottom = enemy.y
    
    // Enemy
    if (this.x >= (enemy.x - enemy.wid)) {
      if (this.y <= enemyTop && this.y >= enemyBottom) {     // Only need offset on player side as the "ball" renders starting from top left and player is on the left side
        this.x = enemy.x - enemy.wid
        this.vel.x *= -1
        return
      } else {
        player.points += 1
        doUpdate = false;
        this.reset()
        return
      }
    }

    // Roof
    if (this.y <= 0) {
      this.y = 0
      this.vel.y *= -1
    }

    // Floor
    if (this.y >= height) {
      this.y = height
      this.vel.y *= -1
    }
  }
}
