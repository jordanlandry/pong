const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const width = window.innerWidth * 0.99
const height = width / 2

canvas.width = width;
canvas.height = height

const fontSize = width / 25

const paddleHeight = height / 5
const paddleWidth = height / 50
const ballRadius = height / 25

const ballSpeed = height / 200;
const paddleSpeed = height / 200;

let goUp = false;
let goDown = false;