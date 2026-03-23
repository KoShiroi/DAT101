"use strict";

import {TSpriteButton} from "libSprite";
import {TPoint} from "lib2d";
import { gameLevel, gameInfo } from "./Minesweeper.mjs";

const MineInfoColors = ["blue", "green", "red", "darkblue", "brown", "cyan", "black", "grey"];
let tiles=[];
const ctx=document.getElementById("cvs").getContext("2d");
export let gameOver=false;
let uncoverdTiles=0;

function setGameOver(){
  gameOver=true;
  gameInfo.smileyIndex=2;
  tiles.forEach(element => {
    switch(true){
      case element.isMine&&element.index!=3:
        element.index=5;
        break;
      case !element.isMine&&element.index==3:
        element.index=6;
        break;
      case element.isMine&&element.index==3:
        element.index=7;
        break;
      default:
        //element.index=2;
        break;
    }
  });
}

export class TTile extends TSpriteButton{
  #mine;
  #neighbors;
  constructor(aSpcvs,aSPI,aX,aY,index){
    super(aSpcvs,aSPI,aX,aY);
    this.#mine=false;
    this.i=index;
    this.#neighbors=null;
    this.mineInfo=0
  }

  get isOpen(){
    return this.index==2||this.index==5;
  }

  get isMine(){
    return this.#mine;
  }
  set isMine(aValue){
    this.#mine=aValue;
    this.#getNeighbors();
    this.#neighbors.forEach(element => {
      tiles[element].mineInfo++;
    });
  }

  draw(){
    super.draw();
    if(this.isOpen&&!this.isMine&&this.mineInfo){
      ctx.font="48px Consolas";
      ctx.fillStyle=MineInfoColors[this.mineInfo-1]
      ctx.fillText(this.mineInfo,this.x+13,this.y+41)
    }
  }

  #getNeighbors(){
    if(this.#neighbors!=null){return}
    let row=this.i%gameLevel.Tiles.Col;
    let col=(this.i-row)/gameLevel.Tiles.Row;
    this.#neighbors=[]

    if(col>0){
      if(row>0){this.#neighbors.push(this.i-1-gameLevel.Tiles.Col)}
      this.#neighbors.push(this.i-gameLevel.Tiles.Col)
      if(row<(gameLevel.Tiles.Col-1)){this.#neighbors.push(this.i+1-gameLevel.Tiles.Col)}
    }
    if(row>0){this.#neighbors.push(this.i-1)}
    if(row<gameLevel.Tiles.Col-1){this.#neighbors.push(this.i+1)}
    
    if(col<gameLevel.Tiles.Row-1){
      if(row>0){this.#neighbors.push(this.i-1+gameLevel.Tiles.Col)}
      this.#neighbors.push(this.i+gameLevel.Tiles.Col)
      if(row<gameLevel.Tiles.Col-1){this.#neighbors.push(this.i+1+gameLevel.Tiles.Col)}
    }
  }

  onMouseDown(eEvent){
    console.log(eEvent)
    if(this.isOpen||gameOver){return}
    switch(eEvent.button){
      case 0:
        if(this.index==0){
          this.index=1;
          gameInfo.smileyIndex=1
        }
        super.onMouseDown(eEvent)
        break;
      case 2:
        if(this.index==3){
          this.index=0
          gameInfo.mineCounter++;
        }
        else if(this.index==0){
          if(gameInfo.mineCounter>0){
            this.index=3;
            gameInfo.mineCounter--;
          }
        }
        break;
      default:
        break;
    }
  }
  onMouseUp(eEvent){
    if(eEvent.button!=0||this.index==3||gameOver){return}
    gameInfo.smileyIndex=0
    console.log(eEvent.button)
    this.open()
    super.onMouseUp(eEvent)
  }
  onMouseLeave(eEvent){
    if(gameOver){return}
    if(this.index==1){
      this.index=0;
    }
    gameInfo.smileyIndex=0
    super.onMouseLeave(eEvent)
  }
  onMouseMove(aEvent){
    if(this.open||gameOver){return}
    super.onMouseMove(aEvent);
  }
  open(){
    if(this.index==3){return}
    switch(true){
      case this.isMine:
        setGameOver(true);
        this.index=4;
        break;
    
      default:
        this.index=2;
        uncoverdTiles++;
        if(uncoverdTiles>=(tiles.length-gameLevel.Mines)){
          gameOver=true;
          gameInfo.smileyIndex=4;
        }
        break;
    }
    if(this.mineInfo==0){
      this.#getNeighbors()
      this.#neighbors.forEach(element => {
        if(!tiles[element].isOpen){
          tiles[element].open();
        }
      });
    }
  }
}

export function createTiles(aSpcvs,aSPI){
  tiles=[];
  uncoverdTiles=0;
  gameOver=false;
  let index=0;
  for(let i=0;i<gameLevel.Tiles.Row;i++){
    for(let ii=0;ii<gameLevel.Tiles.Col;ii++){
      tiles.push(new TTile(aSpcvs,aSPI.ButtonTile,20+(aSPI.ButtonTile.width*ii),133+(aSPI.ButtonTile.height*i),index))
      index++
    }
  }
}

export function createMines(){
  let mineCount=0
  do{
    const rng=Math.floor(Math.random()*tiles.length)
    if(!tiles[rng].isMine){
      tiles[rng].isMine=true;
      mineCount++;
    }
  }while(mineCount<gameLevel.Mines)
}

export function drawTiles(){
  tiles.forEach(element => {
    element.draw();
  });
}