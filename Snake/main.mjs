"use strict";
import {TSnake} from "./snake.js"

const cvs=document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const SpriteSheet=new Image()
SpriteSheet.src="apple.png";

export const EGameState={idle:0,playing:1,pause:2,gameOver:3,state:0}
const snake=new TSnake(ctx);
snake.snakeSkin="default";

SpriteSheet.onload=function(){
  newGame();
};

const setTimeoutID={animateGameID:null,snakeDeathID:null};

export const board={
  cellSize:32,
  cols:24,
  rows:18
};

const apple={
  pos:{x:0,y:0},
  size:board.cellSize/2,
  type:"normal",
  color:null
};

cvs.width=board.cellSize*board.cols;
cvs.height=board.cellSize*board.rows;

//functions--------------------------------------------------
function newGame(){
  snake.newGame();
  randomizeApple();
  if(setTimeoutID.animateGameID){
    clearTimeout(setTimeoutID.animateGameID);
  }if(setTimeoutID.snakeDeathID){
    clearInterval(setTimeoutID.snakeDeathID);
  }
  drawGame();
  animateGame();
}

function drawGame(){
  for(let i=0;i<(board.cols*board.rows);i++){
    ctx.fillStyle="lightgray";

    if((Math.floor(i/board.cols)+i)%2==0){
      ctx.fillStyle="white";
    }

    ctx.fillRect(board.cellSize*(i%board.cols),board.cellSize*(Math.floor(i/board.cols)),board.cellSize,board.cellSize);
  }

  ctx.fillStyle=apple.color;
  ctx.fillRect(board.cellSize*apple.pos.x+apple.size/2,board.cellSize*apple.pos.y+apple.size/2,apple.size,apple.size)

  snake.draw();
}

function animateGame(){
  if(EGameState.state==EGameState.playing){
    snake.animate();
    if(snake.checkCollision()){
      console.log("Collision");
      snake.setState("dead");
      EGameState.state=EGameState.gameOver;
      setTimeoutID.snakeDeathID=setInterval(()=>{snake.passDown();drawGame();},2000/snake.length);
    }
    if(snake.pos.x==apple.pos.x && snake.pos.y==apple.pos.y){
      if(apple.type=="ghost"){
        if(snake.state!="ghost"){
          console.log("Ability: ghost");
        }
        snake.setState("ghost",true);
        snake.resetGhostTimer()
      }
      randomizeApple();
      snake.increaseLength();
    }
  }
  drawGame();
  setTimeoutID.animateGameID=setTimeout(animateGame,500/snake.length**0.4);
}

function randomizeApple(){
  do{
    apple.pos.x=Math.floor(Math.random()*board.cols);
    apple.pos.y=Math.floor(Math.random()*board.rows);
  }while(snake.onSnake(apple.pos))
  apple.type="normal";
  apple.color="rgba(170,0,0,1)";
  if(Math.random()>0.8){
    apple.type="ghost";
    apple.color="rgba(0,0,85,0.5)";
  }
}

export function setGameTimeout(handeler, timeOut){
  let remaining=timeOut;
  let start=Date.now();
  let timerID;

  function pause(){
    clearTimeout(timerID);
    remaining-=Date.now()-start;
    console.log("Timeout: pause");
  }
  function resume(){
    start=Date.now();
    timerID=setTimeout(handeler,remaining);
    console.log("Timeout: resume");
  }
  function clear(){
    clearTimeout(timerID);
  }
  timerID=setTimeout(handeler,remaining);

  return {pause,resume,clear};
}

function onKeyDown(aEvent) {
  switch(aEvent.code){
    case "ArrowUp":
      if(snake.direction!="down"){
        snake.newDirection="up";
      };
      break;
    case "ArrowRight":
      if(snake.direction!="left"){
        snake.newDirection="right";
      }
      break;
    case "ArrowDown":
      if(snake.direction!="up"){
        snake.newDirection="down";
      }
      break;
    case "ArrowLeft":
      if(snake.direction!="right"){
        snake.newDirection="left";
      }
      break;

    case "Space":
      switch(EGameState.state){
        case EGameState.idle:
          EGameState.state=EGameState.playing;
          break;
        case EGameState.playing:
          EGameState.state=EGameState.pause;
          snake.pause();
          break;
        case EGameState.pause:
          EGameState.state=EGameState.playing;
          snake.pause();
          break;
        case EGameState.gameOver:
          EGameState.state=EGameState.playing;
          newGame();
          break;
      }
      break;

    case "Digit1":
      snake.snakeSkin=1;
      drawGame()
      break;
    case "Digit2":
      snake.snakeSkin=2;
      drawGame()
      break;
    case "Digit3":
      snake.snakeSkin=3;
      drawGame()
      break;

    default:
      console.log(aEvent.code);
      break;
  }
}

//event listener----------------------------------------------------------------------
document.addEventListener("keydown", onKeyDown);