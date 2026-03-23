"use strict";

import {TSpriteButton,TSpriteNumber} from "libSprite";
import {gameLevel, newGame} from "./Minesweeper.mjs";
import {TPoint} from "lib2d";
import {gameOver} from "./tile.js";

export class TGameInfo{
  #mines;
  #time;
  #smiley;
  #hndTimer;
  constructor(aSpcvs,aSPI){
    const pos=new TPoint();
    pos.x=aSpcvs.width-aSPI.Board.LeftMiddle.width-4;

    this.#mines=new TSpriteNumber(aSpcvs,aSPI.Numbers,159,22,undefined,3,2);
    this.#time=new TSpriteNumber(aSpcvs,aSPI.Numbers,pos.x,22,undefined,3,2);//470
    this.#smiley=new TSpriteButton(aSpcvs,aSPI.ButtonSmiley,270-(aSPI.ButtonSmiley.width)/2,22);

    this.#mines.value=gameLevel.Mines;
    this.#hndTimer=setInterval(() => {
      if(this.#time.value==999||gameOver){
        clearInterval(this.#hndTimer);
        this.#hndTimer=null;
        return;
      }
      this.#time.value+=1;
    }, 1000);
    this.#smiley.addEventListener("mousedown", this.#smileyMouseDown.bind(this))
    this.#smiley.addEventListener("mouseup", this.#smileyMouseUp.bind(this))
  }

  #smileyMouseDown(){
    this.#smiley.index++;
    this.#smiley.addEventListener("mouseleave", this.#smileyMouseLeave.bind(this),{once: true})
  }
  #smileyMouseUp(){
    this.#smiley.index--;
    newGame();
  }
  #smileyMouseLeave(){
    this.#smiley.index--;
  }

  set smileyIndex(aValue){
    this.#smiley.index=aValue;
  }

  get mineCounter(){
    return this.#mines.value;
  }
  set mineCounter(aValue){
    this.#mines.value=aValue;
  }

  draw(){
    this.#mines.draw();
    this.#time.draw();
    this.#smiley.draw();
  }
}
