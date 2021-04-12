//This file contains functions that don't change global variables
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function nextSquare(posX, posY, direction) {
  if (direction == 'right') {
    return [posX + 20, posY];
  } else if (direction == 'down') {
    return [posX, posY + 20];
  } else if (direction == 'left') {
    return [posX - 20, posY];
  } else if (direction == 'up') {
    return [posX, posY - 20]
  }
}

function isGameOver(posX, posY, snake, direction)  {
  // Checks if snake hit itself or if snake hit wall
  let newSquare = nextSquare(posX, posY, direction);
  for (square of snake.slice(0,-1)) {
    if (newSquare[0] + 'px' == square.style.left && newSquare[1] + 'px' == square.style.top) {
      return true;
    }
  }
  if (newSquare[0] < 0 || newSquare[0] > 500 || newSquare[1] < 0 || newSquare[1] > 500) {
    return true;
  }
  return false;
}

function doesFoodIntersect(foodX, foodY, snake) {
  for (square of snake) {
    posX = Number(square.style.left.slice(0,-2));
    posY = Number(square.style.top.slice(0,-2));
    if (posX - 1 == foodX && posY - 1 == foodY) {
      return true;
    }
  }
  return false;
}

function generateFood(snake) {
  // Function repeatedly generates location to valid location available
  // low probability of continually failing so thats why no count to stop after some iterations
  let a = false;
  while (a == false) {
    let newFoodX = 20*getRandomInteger(0,25);
    let newFoodY = 20*getRandomInteger(0,25);
    if (doesFoodIntersect(newFoodX, newFoodY, snake) == false) {
      //console.log(foodX);
      return [newFoodX, newFoodY];
    }
  }
}
