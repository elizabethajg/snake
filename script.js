document.addEventListener("DOMContentLoaded", function () {
  pTag = document.querySelector("div");
  newVal = document.createElement("p");
  newVal.innerHTML = "";
  pTag.appendChild(newVal);
});

//Get canvas object and render 2d
const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
// let gameFont = new FontFace('Press Start 2P', 'url(PressStart2P-Regular.ttf)');
// gameFont.load().then(function(loaded){
//     document.fonts.add(gameFont);
//     document.body.style.fontFamily = 'Press Start 2P';
// });

  
//Set colours for snake and canvas
const board_border = "white";
const board_background = "black";
const snake_col = "darkseagreen";
const snake_border = "darkolivegreen";

const replay = document.getElementById("replay");
replay.style.display = '';

//Create initial snake size + position
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 0;
let dy = 0;
let game_started = false;
document.getElementById("score").innerHTML = 0;

clearCanvas();
drawSnake();
main();
genFood();

document.addEventListener("keydown", changeDirection);

function main() {
  if (hasGameEnded()) {
    gameOverMessage();
    return;
  }

  changing_direction = false;
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 40);
}

function defaultValues(){
    score = 0;
    changing_direction = false;
    dx = 0;
    dy = 0;
    game_started = false;
    hasGameEnded = false;
}

//Function to draw a rectangle for each body segment
function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokeStyle = snake_border;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

//Draw canvas
function clearCanvas() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokeStyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
//Function that prints snake segments
function drawSnake() {
  snake.forEach(drawSnakePart);
}

function moveSnake() {
  if (!game_started) {
    return;
  }
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const has_eaten = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    genFood();
  } else {
    snake.pop();
  }
}

//Function that allows change of direction with arrow keys
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (!game_started) {
    changing_direction = true;
    game_started = true;
    switch (keyPressed) {
      case UP_KEY:
        dx = 0;
        dy = -10;
        break;
      case RIGHT_KEY:
        dx = 10;
        dy = 0;
        break;
      case DOWN_KEY:
        dx = 0;
        dy = 10;
        break;
      case LEFT_KEY:
        snake = snake.reverse();
        dx = -10
        dy = 0;
        break;
      default:
        dx = 10;
        dy = 0;
        break;
    }
  }

  if (changing_direction) return;

  changing_direction = true;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
        dy = -10; 
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}
function gameOverMessage() {
    snakeboard_ctx.font = "50px PressStart2P";
    snakeboard_ctx.textAlign = 'center';
    snakeboard_ctx.fillStyle = 'white';
    snakeboard_ctx.fillText(
    "GAME OVER", 200, 200, 350
    )
}
//Function determines when game is over
function hasGameEnded() {
  for (let i = 4; i < snake.length; i++) {
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (has_collided) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function genFood() {
  food_x = randomFood(0, snakeboard.width - 10);
  food_y = randomFood(0, snakeboard.height - 10);
  snake.forEach(function hasSnakeEaten(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) genFood();
  });
}

function drawFood() {
  snakeboard_ctx.fillStyle = "gold";
  snakeboard_ctx.strokeStyle = "goldenRod";
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}
// const board_border = 'black';
// const board_background = "white";
// const snake_col = 'lightblue';
// const snake_border = 'darkblue';

// let snake = [
//   {x: 200, y: 200},
//   {x: 190, y: 200},
//   {x: 180, y: 200},
//   {x: 170, y: 200},
//   {x: 160, y: 200}
// ]

// // Get the canvas element
// const snakeboard = document.getElementById("snakeboard");
// // Return a two dimensional drawing context
// const snakeboard_ctx = snakeboard.getContext("2d");
// // Start game
// main();

// // main function called repeatedly to keep the game running
// function main() {
//     clearCanvas();
//     drawSnake();
// }

// // draw a border around the canvas
// function clearCanvas() {
//   //  Select the colour to fill the drawing
//   snakeboard_ctx.fillStyle = board_background;
//   //  Select the colour for the border of the canvas
//   snakeboard_ctx.strokestyle = board_border;
//   // Draw a "filled" rectangle to cover the entire canvas
//   snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
//   // Draw a "border" around the entire canvas
//   snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
// }

// // Draw the snake on the canvas
// function drawSnake() {
//   // Draw each part
//   snake.forEach(drawSnakePart)
// }

// // Draw one snake part
// function drawSnakePart(snakePart) {

//   // Set the colour of the snake part
//   snakeboard_ctx.fillStyle = snake_col;
//   // Set the border colour of the snake part
//   snakeboard_ctx.strokestyle = snake_border;
//   // Draw a "filled" rectangle to represent the snake part at the coordinates
//   // the part is located
//   snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
//   // Draw a border around the snake part
//   snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
// }
