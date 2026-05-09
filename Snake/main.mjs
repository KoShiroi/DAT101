"use strict";
import {TSnake} from "./snake.js"
import {TPortal} from "./portal.js"

const cvs=document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const SpriteSheet=new Image()
SpriteSheet.src="apple.png";

export const EGameState={idle:0,playing:1,pause:2,gameOver:3,state:0}
export const snake=new TSnake(ctx);
snake.snakeSkin="default";

SpriteSheet.onload=function(){
  newGame();
};

const setTimeoutID={animateGameID:null,snakeDeathID:null,portalRotationID:null};

export const board={
  cellSize:32,
  cols:24,
  rows:18
};

let apples=[{
  pos:{x:0,y:0},
  size:board.cellSize/2,
  type:"normal",
  color:null,
  destination:null
}];

export const portals=[];

cvs.width=board.cellSize*board.cols;
cvs.height=board.cellSize*board.rows;

//functions--------------------------------------------------
function newGame(){
  snake.newGame();
  apples=[{pos:{x:0,y:0},size:board.cellSize/2,type:"normal",color:null,destination:null}];
  randomizeApple(apples[0]);
  if(setTimeoutID.animateGameID){
    clearTimeout(setTimeoutID.animateGameID);
  }if(setTimeoutID.snakeDeathID){
    clearInterval(setTimeoutID.snakeDeathID);
  }
  drawGame();
  animateGame();
}

export function drawGame(){
  for(let i=0;i<(board.cols*board.rows);i++){

    ctx.fillStyle="lightgray";
    if((Math.floor(i/board.cols)+i)%2==0){
      ctx.fillStyle="white";
    }
    ctx.fillRect(board.cellSize*(i%board.cols),board.cellSize*(Math.floor(i/board.cols)),board.cellSize,board.cellSize);
  }

  portals.forEach(e=>{
    e.entrance.draw();
    e.exit.draw();
  });

  apples.forEach(e=>{
    ctx.fillStyle=e.color;
    ctx.fillRect(board.cellSize*e.pos.x+e.size/2,board.cellSize*e.pos.y+e.size/2,e.size,e.size);
    if(e.destination){
      fillOnAngle({x:e.destination.x+0.5,y:e.destination.y+0.5},{x:8,y:8},45,"rgba(170,0,170,0.5)");
    }
    /*ctx.fillStyle="rgba(51,51,51,1)"; //apple stem
    let size={x:4,y:6}
    ctx.fillRect(board.cellSize*e.pos.x+(board.cellSize/2-size.x/2),board.cellSize*e.pos.y+e.size/2-size.y/2,size.x,size.y);*/ //did not like it
  });

  snake.draw();

  if(EGameState.state==EGameState.pause){
    ctx.fillStyle="rgba(0,0,0,0.25)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
  }
}

function animateGame(){
  if(EGameState.state==EGameState.playing){
    portals.forEach(e=>{
      let short={
        entrance:snake.pos.x==e.entrance.pos.x&&snake.pos.y==e.entrance.pos.y,
        exit:snake.pos.x==e.exit.pos.x&&snake.pos.y==e.exit.pos.y
      }
      if(!snake.justTeleported&&short.entrance){
        snake.tp=e.entrance.destination;
      }else if(!snake.justTeleported&&short.exit){
        snake.tp=e.exit.destination;
      }
    })
    snake.animate();
    for(let i=0;i<portals.length;i++){
      if(snake.onSnake(portals[i].entrance.pos)){
        portals[i].entrance.open();
      }else{portals[i].entrance.close();}
      if(snake.onSnake(portals[i].exit.pos)){
        portals[i].exit.open();
      }else{portals[i].exit.close();}
      if(portals[i].entrance.isClosed&&portals[i].exit.isClosed){
        portals.splice(i,1);
        if(portals.length==0&&setTimeoutID.portalRotationID){
          clearInterval(setTimeoutID.portalRotationID);
          setTimeoutID.portalRotationID=null;
        }
      }
    }
    if(snake.checkCollision()){
      console.log("Collision");
      snake.setState("dead");
      EGameState.state=EGameState.gameOver;
      setTimeoutID.snakeDeathID=setInterval(()=>{snake.passDown();drawGame();},2000/snake.length);
      console.log(`Score: ${snake.length}`);
      if(!localStorage.getItem("score")||Number(localStorage.getItem("score"))<snake.length){
        localStorage.setItem('score',snake.length);
      }
      console.log(`HightScore: ${localStorage.getItem("score")}`);
      if(snake.length>=board.cols*board.rows){
        console.log("you win!")
      }
    }
    apples.forEach(e=>{
      let canDelete=true;
      if(snake.pos.x==e.pos.x && snake.pos.y==e.pos.y){

        if(e.type=="ghost"){
          if(snake.state!="ghost"){
            console.log("Ability: ghost");
          }
          snake.setState("ghost",true);
          snake.resetGhostTimer()

        }else if(e.type=="bonus"){
          console.log("Ability: bonus");
          let temp=apples.push({pos:{x:0,y:0},size:board.cellSize/2,type:"normal",color:null});
          randomizeApple(apples[temp-1],false);
          canDelete=false;

        }else if(e.type=="portal"&&!snake.onSnake(e.destination)){
          console.log("Ability: portal");
          portals.push({
            entrance:new TPortal(ctx,e.pos,true,e.destination),
            exit:new TPortal(ctx,e.destination,false,e.pos)
          });
          if(!setTimeoutID.portalRotationID){
            setTimeoutID.portalRotationID=setInterval(()=>{
              portals.forEach(e=>{
                e.entrance.portalRotation();
                e.exit.portalRotation();
              })
              drawGame();
            },100)
          }
        }
        randomizeApple(e,canDelete);
        snake.increaseLength();
      }
    })
  }
  drawGame();
  setTimeoutID.animateGameID=setTimeout(animateGame,500/snake.length**0.4);
}

function randomizeApple(apple,canDelete=true){
  if(canDelete&&apples.length>1&&Math.random()<apples.length*0.2){
    apple.type="delete";
    console.log("Deleted: apple")
    appleCleanUp();
    return;
  }
  apple.destination=null;
  do{
    apple.pos.x=Math.floor(Math.random()*board.cols);
    apple.pos.y=Math.floor(Math.random()*board.rows);
  }while(snake.onSnake(apple.pos)||onApple(apple))
  apple.type="normal";
  apple.color="rgba(170,0,0,1)";
  let rng=Math.random();
  if(rng<0.1){
    apple.type="portal";
    apple.color="rgba(170,0,170,1)";
    apple.destination=portalDestination(apple.pos)
  }else if(rng<0.3){
    apple.type="ghost";
    apple.color="rgba(0,0,85,0.5)";
  }else if(rng<0.6){
    apple.type="bonus";
    apple.color="rgba(170,170,0,0.5)";
  }
}
function portalDestination(entrance){
  let pos={x:0,y:0}
  do{
    pos.x=Math.floor(Math.random()*board.cols);
    pos.y=Math.floor(Math.random()*board.rows);
  }while(snake.onSnake(pos)||(pos.x==entrance.x&&pos.y==entrance.y))
  return pos;
}
function appleCleanUp(){
  apples=apples.filter(e=>e.type!="delete");
}
function onApple(apple){
  let bool=false;
  apples.forEach(e=>{
    if(e.pos.x==apple.pos.x && e.pos.y==apple.pos.y && e!=apple){bool=true};
  });
  return bool;
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

export function fillOnAngle(pos,dim,deg,color){
  ctx.save();
  ctx.translate(board.cellSize*(pos.x),board.cellSize*(pos.y))
  ctx.rotate(deg*Math.PI/180);
  ctx.fillStyle=color;
  ctx.fillRect(-dim.x/2,-dim.y/2,dim.x,dim.y);
  ctx.restore();
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
          drawGame();
          break;
        case EGameState.pause:
          EGameState.state=EGameState.playing;
          snake.pause();
          drawGame();
          break;
        case EGameState.gameOver:
          EGameState.state=EGameState.playing;
          newGame();
          break;
      }
      break;

    case "Digit1":
      snake.snakeSkin=1;
      drawGame();
      break;
    case "Digit2":
      snake.snakeSkin=2;
      drawGame();
      break;
    case "Digit3":
      snake.snakeSkin=3;
      drawGame();
      break;
    case "Digit4":
      snake.snakeSkin=4;
      drawGame();
      break;
    case "Digit5":
      snake.snakeSkin=5;
      drawGame();
      break;
    case "Digit6":
      snake.snakeSkin=6;
      drawGame();
      break;
    case "Digit7":
      snake.snakeSkin=7;
      drawGame();
      break;
    case "Digit8":
      snake.snakeSkin=8;
      drawGame();
      break;
    case "Digit9":
      snake.snakeSkin=9;
      drawGame();
      break;
    
    default:
      console.log(aEvent.code);
      break;
  }
}

//event listener----------------------------------------------------------------------
document.addEventListener("keydown", onKeyDown);
document.addEventListener("DOMContentLoaded", () => {
  window.clearLocalStorage = function () {
    if(!confirm("are you sure")){return}
    localStorage.clear();
    console.log("localStorage cleared");
  };
});