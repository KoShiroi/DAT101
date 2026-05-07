"use strict";

import {board, EGameState, setGameTimeout} from "./main.mjs"

export class TSnake{
  #ctx;
  #direction;
  #baseState;
  #snake;
  #snakeColor;
  #snakeEyes;
  #oldPos;
  #intervalsIDs;
  constructor(ctx){
    this.#ctx=ctx;
    this.#direction="right";
    this.#baseState="normal";
    this.#snake=[{pos:{x:8,y:6},direction:this.#direction,state:this.#baseState}];
    this.#snakeColor={base:"rgba(0,127.5,0,1)",stripe:null,gradient:null,intestity:null,offset:null}
    this.#snakeEyes={size:8,spacing:8,color:"black"};
    this.#oldPos=null;
    this.#intervalsIDs={ghostID:null};
  }

  draw(){
    for(let i=0;i<this.#snake.length;i++){
      switch(this.#snake[i].state){
        case "normal":
          this.#ctx.fillStyle=this.#snakeColor.base;
          if(this.#snakeColor.gradient){
            this.#ctx.fillStyle=this.colorGradient(this.#snakeColor.base,this.#snakeColor.gradient,i/this.#snake.length);
          }
          if(this.#snakeColor.stripe && (i+this.#snakeColor.offset)%this.#snakeColor.intestity==0){
            this.#ctx.fillStyle=this.#snakeColor.stripe;
          }
          break;
        case "ghost":
          this.#ctx.fillStyle=this.colorGradient("rgba(0,0,85,0.5)","rgba(0,0,85,0.1)",i/this.#snake.length);
          break;
        case "dead":
          this.#ctx.fillStyle="rgba(0,0,0,0)";
          break;
        default:
          break;
      }
      const size=((board.cellSize/1.3-4)/this.#snake.length) * i + 4;
      this.#ctx.fillRect(board.cellSize*this.#snake[i].pos.x+size/2,board.cellSize*this.#snake[i].pos.y+size/2,board.cellSize-size,board.cellSize-size)
    }
    if(EGameState.state!=EGameState.gameOver){
      this.#ctx.fillStyle=this.#snakeEyes.color;
      const eye={
        x:board.cellSize*(this.pos.x+0.5)-this.#snakeEyes.size/2,
        y:board.cellSize*(this.pos.y+0.5)-this.#snakeEyes.size/2,
        offset:{x:0,y:this.#snakeEyes.spacing,}
      }
      if(this.direction=="up"||this.direction=="down"){eye.offset={x:eye.offset.y,y:0}}
      this.#ctx.fillRect(eye.x-eye.offset.x,eye.y-eye.offset.y,this.#snakeEyes.size,this.#snakeEyes.size);
      this.#ctx.fillRect(eye.x+eye.offset.x,eye.y+eye.offset.y,this.#snakeEyes.size,this.#snakeEyes.size);
    }
  }
  animate(){
    this.passDown();
    if(this.#baseState=="ghost"&&!this.#intervalsIDs.ghostID){
      this.#intervalsIDs.ghostID=setGameTimeout(()=>{
        if(EGameState.state!=EGameState.gameOver){
          this.setState("normal");
          this.#intervalsIDs.ghostID=null;
        }
      },5000)
    }
    this.#snake.forEach(e=>{
      this.#oldPos={pos:{x:e.pos.x,y:e.pos.y},direction:e.direction,state:e.state};
      switch(e.direction){
        case "up":
          e.pos.y--
          break;
        case "right":
          e.pos.x++
          break;
        case "down":
          e.pos.y++
          break;
        case "left":
          e.pos.x--
          break;
        default:
          break;
      }
    });
  }

  passDown(){
    for(let i=this.#snake.length-1;i>=0;i--){
      if(i-1>=0){
        if(EGameState.state==EGameState.playing){
          this.#snake[i].direction=this.#snake[i-1].direction;
          this.#snake[i].state=this.#snake[i-1].state;
        }else if(this.#snake[i-1].state=="dead"){
          this.#snake[i].state=this.#snake[i-1].state;
        }
        
      }else{
        if(EGameState.state==EGameState.playing){
          this.#snake[i].direction=this.#direction;
          this.#snake[i].state=this.#baseState;
        }else if(this.#baseState=="dead"){
          this.#snake[i].state=this.#baseState;
        }
      }
    }
  }

  increaseLength(){
    if(this.#baseState=="ghost"){
      this.#oldPos.state=this.#baseState;
    }
    this.#snake.push(this.#oldPos)
  }

  onSnake(pos){
    let bool=false;
    this.#snake.forEach(e=>{
      if(e.pos.x==pos.x && e.pos.y==pos.y){bool=true};
    });
    return bool;
  }
  checkCollision(){
    let bool=false;
    this.#snake.slice(1).forEach(e=>{
      if(this.pos.x==e.pos.x && this.pos.y==e.pos.y && !(this.#snake[0].state=="ghost"||e.state=="ghost")){bool=true};
    });
    if(this.pos.x<0||this.pos.y<0||this.pos.x>=board.cols||this.pos.y>=board.rows){bool=true};
    return bool;
  }
  setState(state,all=false){
    this.#baseState=state;
    if(all){
      this.#snake.forEach(e=>{
        e.state=state;
      });
    }
  }
  resetGhostTimer(){
    if(this.#intervalsIDs.ghostID){
      this.#intervalsIDs.ghostID.clear();
      this.#intervalsIDs.ghostID=null;
    }
  }
  grabColor(color){
    let splitColor=color.split(/[,()]/);
    return{
      r:Number(splitColor[1]),
      g:Number(splitColor[2]),
      b:Number(splitColor[3]),
      a:Number(splitColor[4])
    }
  }
  colorGradient(start, end, t){
    const splitStart=this.grabColor(start);
    const splitEnd=this.grabColor(end);
    return `rgba(
    ${splitStart.r+(splitEnd.r-splitStart.r)*t},
    ${splitStart.g+(splitEnd.g-splitStart.g)*t},
    ${splitStart.b+(splitEnd.b-splitStart.b)*t},
    ${splitStart.a+(splitEnd.a-splitStart.a)*t}
    )`
  }
  pause(){
    if(EGameState.state==EGameState.pause && this.#intervalsIDs.ghostID){
      this.#intervalsIDs.ghostID.pause();
    }
    if(EGameState.state==EGameState.playing && this.#intervalsIDs.ghostID){
      this.#intervalsIDs.ghostID.resume();
    }
  }

  set newDirection(direction){
    this.#direction=direction;
  }
  set snakeSkin(skin){
    switch(skin){
      case 1:
      case "default":
        this.#snakeColor={
          base:"rgba(0,127.5,0,1)",
          stripe:null,
          gradient:null,
          intestity:null,
          offset:null
        }
        this.#snakeEyes={
          size:8,
          spacing:8,
          color:"rgba(51,51,51,1)"
        };
        break;
      
      case 2:
      case "black&yellow":
        this.#snakeColor={
          base:"rgba(51,51,51,1)",
          stripe:"rgba(170, 170, 0, 1)",
          gradient:null,
          intestity:3,
          offset:0
        }
        this.#snakeEyes={
          size:8,
          spacing:8,
          color:"rgba(51,51,51,1)"
        };
        break;
      
      case 3:
      case "murasaki":
        this.#snakeColor={
          base:"rgba(51,51,51,1)",
          stripe:null,
          gradient:"rgba(170,0,170,1)",
          intestity:3,
          offset:0
        }
        this.#snakeEyes={
          size:8,
          spacing:8,
          color:"rgba(170,0,170,1)"
        };
        break;
      
      default:
        console.log(`skin by name ${skin} not found`);
        this.snakeSkin="default";
        break;
    }
  }
  get upToDate(){
  }
  get direction(){
    return this.#snake[0].direction;
  }
  get pos(){
    return this.#snake[0].pos;
  }
  get length(){
    return this.#snake.length;
  }
  get state(){
    return this.#baseState;
  }
}