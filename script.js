const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "ground.png";
const foodImg = new Image();
foodImg.src = "food.png";

// create the score var

let score = 0;

// create the snake
let snake = [];
snake[0] = {
  x : 9 * box,
  y : 10 * box
};

// create the food
let food = {
  x : Math.floor(Math.random()*17+1) * box,
  y : Math.floor(Math.random()*15+3) * box
}

//control the snake
let d;
document.addEventListener("keydown",direction);

function direction(event){
  let key = event.keyCode;
  if( key === 37 && d !== "RIGHT"){

    d = "LEFT";
  }
  else if(key === 38 && d !== "DOWN"){
    d = "UP";

  }
  else if(key === 39 && d !== "LEFT"){
    d = "RIGHT";

  }
  else if(key === 40 && d !== "UP"){
    d = "DOWN";

  }
}

// draw everything to the canvas

function draw(){

  ctx.drawImage(ground,0,0);

  for( let i = 0; i < snake.length ; i++){
    if(i===0)
      ctx.fillStyle ="#204030";
    else
      ctx.fillStyle = "#8f1010";

    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    ctx.strokeStyle = "white";
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if( d === "LEFT") snakeX -= box;
  if( d === "UP") snakeY -= box;
  if( d === "RIGHT") snakeX += box;
  if( d === "DOWN") snakeY += box;

  // if the snake eats the food
  if(snakeX === food.x && snakeY === food.y){
    score++;

    food = {
      x : Math.floor(Math.random()*17+1) * box,
      y : Math.floor(Math.random()*15+3) * box
    }
    // we don't remove the tail
  }else{
    // remove the tail
    snake.pop();
  }


  // add new Head

  let newHead = {
    x : snakeX,
    y : snakeY
  }

  // game over

  if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
    clearInterval(game);

    ctx.fillStyle="#00203FFF";
    ctx.fillRect(5*box, 8*box, 9*box, 3*box);

    ctx.fillStyle="#ADEFD1FF";
    ctx.font="35px Changa one";
    ctx.fillText("Game over!",7*box,9.5*box);
    ctx.font="20px Changa one";
    ctx.fillText("Your score: "+ score,7.70*box,10.5*box);
  }

  snake.unshift(newHead);

  //show score
  ctx.fillStyle = "white";
  ctx.font = "40px Changa one";
  ctx.fillText(score,2*box,1.6*box);

}

// cheack collision function
function collision(head,array){
  for(let i = 0; i < array.length; i++){
    if(head.x === array[i].x && head.y === array[i].y){
      return true;
    }
  }
  return false;
}

// call draw function every 120 ms(how fast the snake is moving)

let game = setInterval(draw,120);


















