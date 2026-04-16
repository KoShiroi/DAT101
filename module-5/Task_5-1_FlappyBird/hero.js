"use strict";
import {TSprite} from "libSprite";
import {EGameStatus, menu} from "./FlappyBird.mjs";
import {TSoundFileImproved} from "./menu.js"

const fnEat="./Media/food.mp3";
const fnCollison="./Media/heroIsDead.mp3";
const fnGameOver="./Media/gameOver.mp3";


export class THero extends TSprite{
  #gravity;
  #speed;
  #eatSound;
  #sfCollision;
  #sfGameOver;
  constructor(aSpcvs,aSPI){
    super(aSpcvs,aSPI,100,200);
    this.animationSpeed=20;
    this.#gravity=0.0981;
    this.#speed=0;
    this.#eatSound=null;
    this.#sfCollision=null;
    this.#sfGameOver=null;
  }
  resetHero(){
    this.y=200;
    this.animationSpeed=20;
    this.#speed=0;
  }
  animate(){
    if(EGameStatus.state==EGameStatus.idle){return;}
    this.#speed+=this.#gravity;
    if(this.y<400-this.height){
      this.y+=this.#gravity*this.#speed;
      if(this.rotation<60){
        this.rotation=this.#speed*5
      }
    }else{
      this.rotation=0;
      this.animationSpeed=0;
      if(EGameStatus.state!=EGameStatus.gameOver){
        this.#sfGameOver=new TSoundFileImproved(fnGameOver);
        this.#sfGameOver.muted=menu.audioMute;
        this.#sfGameOver.volume=1;
        this.#sfGameOver.play();
        menu.stopSound();
      }
      EGameStatus.state=EGameStatus.gameOver;
      menu.gameOverMenu();
      menu.saveBest();
    }
  }
  deathSound(){
    this.#sfCollision=new TSoundFileImproved(fnCollison);
    this.#sfCollision.muted=menu.audioMute;
    this.#sfCollision.volume=0.8;
    this.#sfCollision.play();
  }
  flap(){
    if(EGameStatus.state!=EGameStatus.playing){return;}
    this.#speed=-12
    if(this.rotation>60){
        this.rotation=59;
    }
  }
  muteHero(){
    if(this.#sfGameOver){
      this.#sfGameOver.muted=!this.#sfGameOver.muted
    }
    if(this.#sfCollision){
      this.#sfCollision.muted=!this.#sfCollision.muted
    }
  }
  eat(){
    if(this.#eatSound==null){
      this.#eatSound=new TSoundFileImproved(fnEat)
      this.#eatSound.muted=menu.audioMute
    }//else{this.#eatSound.stop()}
    this.#eatSound.play()
  }
}