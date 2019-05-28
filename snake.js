const SQUARE_WIDTH = 10;
const SQUARE_FILL_COLOR = "black";
const SQUARE_STROKE_COLOR = "gray";

const SPEED = 10;

const canvas = document.getElementById("gameCanvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.width;

let dy = 0;
let dx = SPEED;
let y = 10;
let x = 10;

let snakeGrowth = 4;
let score = 0;

let snake = [];

let food = {
    x: 50,
    y: 90
};

const ctx = gameCanvas.getContext("2d");
document.addEventListener("keydown", changeDirection);

drawSquare(20,20);

main();

function moveSnake() {
  //fjerne bakerste elementet, lage nytt i front
  snake.unshift({
      x: x + dx,
      y: y + dy
  });
  x += dx,
  y += dy

  if(snakeGrowth > 0){
    snakeGrowth--;
  }else {
      snake.pop()
  }

}

function collisionDetection(){
    //walls
    if(x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT){
        gameOver()
    }

    //itself
    for (let i = 4; i < snake.length; i++){
        if(snake[i].x === x && snake[i].y === y){
            gameOver()
        }
    }
}

function gameOver(){
    window.alert(`Game over! Score: ${snake.length}`)
    snake = []
    x = 10;
    y = 10;
    snakeGrowth = 5;
    dx = SPEED;
    dy = 0;

}

function foodCollision(){
    if(food.x === x && food.y ===y){
        snakeGrowth++;
        generateRandomFoodPlacement();
    }
}

function drawSnake(){
    for (const square of snake){
        drawSquare(square.x, square.y);
    }

}

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  foodCollision();
  collisionDetection();
  drawSnake();
  drawFood();
  moveSnake();
  setTimeout(main, 100);
}


function drawSquare(x, y) {
    ctx.font = "10px verdana"
    ctx.fillText(`Score: ${snake.length}`, 340, 25);
  ctx.fillStyle = SQUARE_FILL_COLOR;
  ctx.strokeStyle = SQUARE_STROKE_COLOR;
  ctx.fillRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
  ctx.strokeRect(x, y, SQUARE_WIDTH, SQUARE_WIDTH);
}

function drawFood(){
    drawSquare(food.x, food.y);
}

function generateRandomFoodPlacement(){
    const x = Math.round((Math.random() * canvas.width) / 10) * 10;
    const y = Math.round((Math.random() * canvas.width) / 10) * 10;
    food = { x, y};
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  if (keyPressed === LEFT_KEY) {
    dx = -SPEED;
    dy = 0;
  }

  if (keyPressed === UP_KEY) {
    dx = 0;
    dy = -SPEED;
  }

  if (keyPressed === RIGHT_KEY) {
    dx = SPEED;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY) {
    dx = 0;
    dy = SPEED;
  }
}