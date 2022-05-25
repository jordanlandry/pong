const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const width = window.innerWidth * 0.9
const height = width / 2

canvas.width = width;
canvas.height = height

const paddleHeight = height / 5
const paddleWidth = height / 50
const ballRadius = height / 50

const ballSpeed = height / 200;
const paddleSpeed = height / 200;

let goUp = false;
let goDown = false;

const handleKeyDown = (e) => {
  doUpdate = true
  if (e.key === 'ArrowDown') goDown = true
  if (e.key === 'ArrowUp') goUp = true
}

const handleKeyUp = (e) => {
  if (e.key === 'ArrowDown') goDown = false
  if (e.key === 'ArrowUp') goUp = false
}

let doUpdate = true

document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)
const start = () => {
  drawAll()
  doUpdate = false;
}

const update = () => {
  if (!doUpdate) return

  if (goUp) player.vel = -player.speed
  else if (goDown) player.vel = player.speed
  else player.vel = 0

  ball.update()
  player.update()
  enemy.update()
  drawAll()
}

const drawAll = () => {
  fillBackground()
  ball.draw();
  player.draw()
  enemy.draw()
}

const fillBackground = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height)
}

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
    ai()
    aiPerson()
  }

  draw() {
    ctx.strokeStyle = 'white'
    ctx.fillStyle = 'white'
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI)
    ctx.fill()
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
    if (this.x <= (player.x + player.wid + this.rad / 2)) {
      if (this.y <= (player.y + player.len) && this.y >= player.y) {
      // Check if the ball's y position matches the paddle's y position
      // if (this.y >= (player.y - player.len) && this.y <= (player.y - player.len)) {
        this.x = player.x + player.wid + this.rad
        this.vel.x *= -1
        return
      } else {
        enemy.points += 1
        doUpdate = false;
        this.reset()
        return
      }
    }
    
    // Enemy
    if (this.x >= (enemy.x - enemy.wid)) {
      if (this.y <= (enemy.y + enemy.len) && this.y >= enemy.y) {
        this.x = enemy.x - enemy.wid - this.rad
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
    ctx.font = '36px serif'
    ctx.fillText(this.points, this.x / 2 + width / 4, 36)
  }

  checkBounderies() {
    if (this.y + this.len >= height) this.y = height - this.len 
    if (this.y <= 0) this.y = 0
  }
}

const ai = () => {
  enemy.y = ball.y - enemy.len / 2
  // enemy.y = height - ball.y
}

const aiPerson = () => {
  // player.y = ball.y - player.len / 2
}

const player = new Paddle(1, height / 2 - paddleHeight / 2)
const enemy = new Paddle(width - 1 - paddleWidth, height / 2 - paddleHeight / 2)
const ball = new Ball() 

const balls = []
for (let i = 0; i < 100; i++) {
  balls.push(new Ball())
  balls[i].speed = Math.floor(Math.random() * 3);
  balls[i].generateRandomVel()
}

start()
setInterval(update, 5)