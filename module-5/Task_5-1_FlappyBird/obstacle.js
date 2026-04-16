"use strict";
import {TSprite} from "libSprite";
import {hero, EGameStatus, menu} from "./FlappyBird.mjs";

export class TObstacle{
  #spUp;
  #spDown;
  #screen;
  #point;
  constructor(aSpcvs,aSPI){
    this.#screen=aSPI.background;
    this.kill=false;

    this.#spDown=new TSprite(aSpcvs,aSPI.obstacle,aSPI.background.width,250);
    this.#spDown.index=2;
    this.#spUp=new TSprite(aSpcvs,aSPI.obstacle,aSPI.background.width,-175);
    this.#spUp.index=3;

    const randomY=Math.random()*(this.#screen.height-300)+100;
    const randomOpenSize=Math.random()*(25)+40;
    this.#spDown.y=randomY+randomOpenSize;
    this.#spUp.y=randomY-randomOpenSize-this.#spUp.height;

    this.#point=1;
  }
  draw(){
    this.#spDown.draw();
    this.#spUp.draw();
  }
  set nightPipes(boolean){
    if(boolean){
      this.#spDown.index=0;
      this.#spUp.index=1;
    }else{
      this.#spDown.index=2;
      this.#spUp.index=3;
    }
  }
  animate(){

    this.#spDown.x-=1;
    this.#spUp.x-=1;
    if(this.#spDown.x<-this.#spDown.width){
      this.kill=true;
    }

    let xCollision=(hero.x+hero.width>this.#spDown.x) && (hero.x<this.#spDown.x+this.#spDown.width);
    let yCollision=(hero.y<this.#spUp.y+this.#spUp.height) || ((hero.y+hero.height)>this.#spDown.y);
    let alive=EGameStatus.state===EGameStatus.playing;
    if(xCollision && yCollision && alive){
      console.log("Collision");
      hero.flap();
      hero.deathSound();
      menu.stopSound();
      EGameStatus.state=EGameStatus.dead;
      hero.animationSpeed=0;
    }else if(hero.x>(this.#spDown.x+this.#spDown.width) && (this.#point>0)){
      EGameStatus.score+=this.#point;
      console.log(`Pipe +${this.#point} (${EGameStatus.score})`);
      this.#point=0;
    }
  }
}