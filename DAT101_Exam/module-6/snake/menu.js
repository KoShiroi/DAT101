"use strict";

import { TSprite, TSpriteNumber, TSpriteButton } from "libSprite";
import { TPoint } from "lib2d";
import { GameProps, SheetData, baitIsEaten, center, newGame, returnHome } from "./game.mjs"
import { TBoardCell, EBoardCellInfoType } from "./gameBoard.js";

/* Use this file to create the menu for the snake game. */
export class TMenu{
  #score;
  #appleScore;
  #appleIcon;
  #play;
  #gameOver;
  #gameOverScore;
  #retry;
  #home;
  constructor(aSpriteCanvas, aSpriteInfo){
    this.#score=new TSpriteNumber(aSpriteCanvas,aSpriteInfo.Number,10,10,undefined,0);
    this.#score.alpha=0.5;
    this.#appleScore=new TSpriteNumber(aSpriteCanvas,aSpriteInfo.Number,10+aSpriteInfo.Bait.width,15+aSpriteInfo.Number.height,5,0);
    this.#appleScore.alpha=0.5;
    this.#appleScore.scale=0.5;
    this.#appleScore.value=5;
    this.#appleIcon=new TSprite(aSpriteCanvas,aSpriteInfo.Bait,10,15+aSpriteInfo.Number.height*1.25-aSpriteInfo.Bait.height/2)
    this.#appleIcon.alpha=0.5;
    this.#play=new TSpriteButton(aSpriteCanvas,aSpriteInfo.Play,center.x-aSpriteInfo.Play.width/2,center.y-aSpriteInfo.Play.height/2)
    this.#play.addEventListener("click",this.playClick.bind(this));
    this.#gameOver=new TSprite(aSpriteCanvas,aSpriteInfo.GameOver,center.x-aSpriteInfo.GameOver.width/2,center.y-aSpriteInfo.GameOver.height/2)
    this.#gameOver.hidden=true;
    this.#gameOverScore=new TSpriteNumber(aSpriteCanvas,aSpriteInfo.Number,660,260,undefined,0,1)
    this.#gameOverScore.visible=false;
    this.#retry=new TSpriteButton(aSpriteCanvas,aSpriteInfo.Retry,642,400);
    this.#retry.addEventListener("click",this.restartBtn.bind(this));
    this.#retry.hidden=true;
    this.#home=new TSpriteButton(aSpriteCanvas,aSpriteInfo.Home,262-aSpriteInfo.Home.width,400);
    this.#home.addEventListener("click",this.homeBtn.bind(this));
    this.#home.hidden=true;
  }
  draw(){
    this.#score.draw();
    this.#appleScore.draw();
    this.#appleIcon.draw();
    this.#play.draw();
    this.#gameOver.draw();
    this.#gameOverScore.draw();
    this.#retry.draw();
    this.#home.draw();
  }
  playClick(){
    this.#play.animationSpeed=60;
    setTimeout(()=>{
      newGame();
      this.#play.hidden=true;
      this.#play.animationSpeed=0;
    }, 60*4);
  }
  gameOver(){
    this.#gameOver.hidden=false;
    this.#retry.hidden=false;
    this.#home.hidden=false;
    this.#gameOverScore.visible=true;
    this.#gameOverScore.value=this.#score.value;
  }
  restartBtn(){
    newGame();
    this.resetMenu();
  }
  homeBtn(){
    returnHome();
    this.resetMenu();
    this.#play.hidden=false;
  }
  resetMenu(){
    this.#gameOver.hidden=true;
    this.#gameOverScore.visible=false;
    this.#retry.hidden=true;
    this.#home.hidden=true;
    this.#score.value=0;
    this.#appleScore.value=5;
  }
  set score(val){
    this.#score.value=val;
  }
  get score(){
    return this.#score.value;
  }
  set appleScore(val){
    this.#appleScore.value=val;
  }
  get appleScore(){
    return this.#appleScore.value;
  }
}
