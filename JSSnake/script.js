var border = document.getElementById('border');
var snake = [];
var direction = null;
var count = 0;
var food = null;
var changeDirectionCount = 0;
var interval = null;
var keyType = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

function addSquare(x, y) {
  // called to grow snake
  var smallSquare = document.createElement('div');
  smallSquare.id = 'smallSquare' + snake.length;
  smallSquare.style.position = 'absolute';
  smallSquare.style.width = '18px';
  smallSquare.style.height = '18px';
  smallSquare.style.background = '#00FFFF';
  smallSquare.style.left = x + 'px';
  smallSquare.style.top = y + 'px';
  border.appendChild(smallSquare);
  snake.push(smallSquare);
}

function run() {
  let last = snake[snake.length-1];
  posX = Number(last.style.left.slice(0,-2));
  posY = Number(last.style.top.slice(0,-2));
  if (isGameOver(posX, posY, snake, direction) == true) {
    clearInterval(interval);
    interval = null;
    document.getElementById('score').innerHTML = 'GAME OVER FINAL SCORE: ' + 5*Math.floor(snake.length/3);
    return;
  } else {
    foodX = Number(food.style.left.slice(0,-2));
    foodY = Number(food.style.top.slice(0,-2));
    //need to check intersection of food with snake head
    //snake square slightly smaller than food thats why (posX - 1) needed
    if ((posX-1) == foodX && (posY-1) == foodY) {
      let foodArr = generateFood(snake);
      food.style.left = foodArr[0] + 'px';
      food.style.top = foodArr[1] + 'px';
      count += 3;
    }
  }

  if (count > 0) {
    //keep growing snake
    count--;
  } else {
    border.removeChild(snake.shift())
  }

  let newSquare = nextSquare(posX, posY, direction);
  addSquare(newSquare[0], newSquare[1]);

  changeDirectionCount = 0;

  document.getElementById('score').innerHTML = 'Score: ' + 5*Math.floor(snake.length/3);

}

function changeDirection(e) {
  if (interval == null) {
    //logic necessary for starting game up
    if (direction == null && keyType.includes(e.code)) {
      start();
    } else {
      return;
    }
  }
  if (changeDirectionCount == 0) {
    //checks if changeDirection and run are synchronized
    //needs extra condition to prevent going in opposite direction
    if (e.code == "KeyW" && direction != 'down') {
      direction = "up";
    } else if (e.code == "KeyA" && direction != 'right') {
      direction = "left";
    } else if (e.code == "KeyS" && direction != 'up') {
      direction = "down";
    } else if (e.code == "KeyD" && direction != 'left') {
      direction = "right";
    } else {
      return;
    }
  }
  changeDirectionCount++;
}

function reset() {
  //Sets all global variables to inital state and adds snake to center
  if (food != null) {
    border.removeChild(food)
  }
  while (snake.length > 0) {
    border.removeChild(snake.pop())
  }
  if (interval != null) {
    //Condition needed for when reseting while playing
    clearInterval(interval);
    interval = null;
  }
  snake = [];
  direction = null;
  count = 0;
  food = null;
  changeDirectionCount = 0;
  interval = null;
  document.getElementById('score').innerHTML = 'Score: 0';
  addSquare(241,241);
}

function start() {
  //Places food and starts running application
  food = document.createElement('div');
  food.id = 'food';
  food.style.position = 'absolute';
  food.style.width = '20px';
  food.style.height = '20px';
  food.style.background = '#FFFF00';
  let foodArr = generateFood(snake);
  food.style.left = foodArr[0] + 'px';
  food.style.top = foodArr[1] + 'px';
  border.appendChild(food);
  interval = setInterval(run, 100);
}
reset();
document.addEventListener("keypress", changeDirection);
document.getElementById("button").addEventListener("click", reset);
