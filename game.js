

const handleKeyDown = (e) => {
  if (e.key === 'ArrowDown') goDown = true
  else if (e.key === 'ArrowUp') goUp = true
  else return 

  e.view.event.preventDefault();
  doUpdate = true
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
  enemy.updateAI()
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